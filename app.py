from datetime import datetime
from pathlib import Path
import os
import pickle

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = Path(os.getenv("MODEL_DIR", BASE_DIR / "ml_assets"))
MODEL_PATH = Path(os.getenv("MODEL_PATH", MODEL_DIR / "fraud_model.pkl"))
COLUMNS_PATH = Path(os.getenv("COLUMNS_PATH", MODEL_DIR / "columns.pkl"))
ENCODERS_PATH = Path(os.getenv("ENCODERS_PATH", MODEL_DIR / "encoders.pkl"))


def load_pickle(path: Path, label: str):
    if not path.exists():
        print(f"{label} file not found at {path}. Using fallback scoring.")
        return None

    try:
        with path.open("rb") as file_handle:
            value = pickle.load(file_handle)
        print(f"{label} loaded from {path}")
        return value
    except Exception as error:
        print(f"Unable to load {label.lower()} from {path}: {error}")
        return None


print("Loading ML model files...")
model = load_pickle(MODEL_PATH, "Model")
columns = load_pickle(COLUMNS_PATH, "Columns")
encoders = load_pickle(ENCODERS_PATH, "Encoders")

if columns:
    print(f"Feature columns: {columns}")

if encoders:
    print(f"Categorical features: {list(encoders.keys())}")

HIGH_RISK_LOCATIONS = {"moscow", "lagos", "bucharest", "unknown", "remote"}
HIGH_RISK_DEVICES = {"atm", "tablet"}


def clamp(value: float, minimum: float = 0.01, maximum: float = 0.99) -> float:
    return max(minimum, min(maximum, value))


def score_transaction_ml(payload: dict) -> tuple[bool, float]:
    if model is None or columns is None:
        print("Warning: ML model not available, using fallback scoring")
        return score_transaction_fallback(payload)

    try:
        features = {
            "amount": float(payload.get("amount", 0)),
            "location": str(payload.get("location", "")).strip().lower(),
            "device": str(payload.get("device", "")).strip().lower(),
        }

        try:
            transaction_time = datetime.fromisoformat(str(payload.get("time", "")))
            features["hour"] = transaction_time.hour
            features["day_of_week"] = transaction_time.weekday()
            features["month"] = transaction_time.month
        except (ValueError, AttributeError):
            features["hour"] = 12
            features["day_of_week"] = 0
            features["month"] = 1

        df = pd.DataFrame([features])

        if encoders:
            for column_name, encoder in encoders.items():
                if column_name in df.columns:
                    try:
                        df[column_name] = encoder.transform(df[column_name])
                    except Exception as error:
                        print(f"Could not encode {column_name}: {error}")

        for column_name in columns:
            if column_name not in df.columns:
                df[column_name] = 0

        df = df[columns]

        prediction = model.predict(df)[0]
        probability = float(model.predict_proba(df)[0][1]) if hasattr(model, "predict_proba") else float(prediction)

        fraud = probability >= 0.5
        probability = round(clamp(probability, 0.01, 0.99), 2)

        print(f"ML prediction complete: fraud={fraud}, probability={probability}")
        return fraud, probability
    except Exception as error:
        print(f"Error in ML prediction: {error}")
        print("Falling back to rule-based scoring")
        return score_transaction_fallback(payload)


def score_transaction_fallback(payload: dict) -> tuple[bool, float]:
    amount = float(payload.get("amount", 0))
    location = str(payload.get("location", "")).strip().lower()
    device = str(payload.get("device", "")).strip().lower()
    raw_time = payload.get("time")

    probability = 0.12

    if amount >= 5000:
        probability += 0.35
    elif amount >= 2000:
        probability += 0.18
    elif amount >= 1000:
        probability += 0.1

    if location in HIGH_RISK_LOCATIONS:
        probability += 0.2

    if device in HIGH_RISK_DEVICES:
        probability += 0.14
    elif device == "mobile":
        probability += 0.06

    try:
        transaction_time = datetime.fromisoformat(str(raw_time))
        if transaction_time.hour < 5 or transaction_time.hour >= 23:
            probability += 0.18
        elif 5 <= transaction_time.hour <= 7:
            probability += 0.08
    except ValueError:
        probability += 0.05

    fraud = probability >= 0.6
    return fraud, round(clamp(probability), 2)


@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(silent=True) or {}

    required_fields = {"userId", "amount", "location", "device", "time"}
    missing = [field for field in required_fields if field not in payload or payload[field] in ("", None)]

    if missing:
        return jsonify({"message": f"Missing fields: {', '.join(missing)}"}), 400

    fraud, probability = score_transaction_ml(payload)
    return jsonify({"fraud": fraud, "probability": probability})


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(port=5001, debug=debug_mode, use_reloader=debug_mode)
