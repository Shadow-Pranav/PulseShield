# PulseShield Fraud Detection App

PulseShield is a full-stack e-commerce fraud detection web app with:

- A responsive frontend built with HTML, CSS, Bootstrap 5, Tailwind CSS, and vanilla JavaScript
- A Node.js + Express backend with **MySQL database persistence**
- A Flask prediction API that returns fraud decisions and probabilities
- Live dashboard updates with Socket.IO
- Signup/login endpoints with JWT authentication
- Transaction history and fraud analytics

## 🚀 Quick Start

**Read START.md for the fastest setup!** (5 minutes)

Requires Node.js, npm, Python 3.8+, and **MySQL Server**

```bash
# Terminal 1: Start Flask ML Engine
cd d:\E_Commerce
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

# Terminal 2: Start Express API Server
cd d:\E_Commerce\backend
npm install
npm run dev

# Browser
Open: http://localhost:5000
```

---

## 📊 Database Setup

**MySQL is required!** See [MYSQL_SETUP.md](MYSQL_SETUP.md) for detailed instructions.

Quick setup:
```bash
mysql -u root -p
CREATE DATABASE fraud_detection;
```

Update `backend/.env` with your MySQL credentials.

---

## Project Structure

```text
D:\E_Commerce/
├── app.py                    ← Flask ML engine
├── requirements.txt          ← Python packages
│
├── backend/                  ← Express API
│   ├── server.js
│   ├── package.json
│   ├── .env                  ← MySQL configuration
│   ├── config/
│   │   ├── mysql.js          ← Database connection
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── storage/              ← MySQL queries
│   │   ├── users.js
│   │   └── transactions.js
│   └── ...
│
└── frontend/                 ← Web interface
    ├── index.html
    ├── dashboard.html
    ├── styles.css
    └── script.js
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **START.md** | Quick start (2 terminals, 5 minutes) ⭐ START HERE |
| **QUICK_START.md** | Detailed step-by-step setup |
| **SETUP_GUIDE.md** | Complete installation guide |
| **TROUBLESHOOTING.md** | Problem solutions |
| **DIRECTORY_GUIDE.md** | Which directory for each command |

---

## 💾 Data Storage

This system uses **in-memory storage** (RAM):
- ✅ No database installation needed
- ✅ Faster setup and testing
- ❌ Data lost when servers restart (intentional)
- ❌ Not suitable for production

**To use MongoDB:** See MONGODB_REMOVAL_GUIDE.md

---

## 🎯 How to Run

### Terminal 1: Flask ML Engine (Port 5001)

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on: `http://127.0.0.1:5001`

### Terminal 2: Express API Server (Port 5000)

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:5000`

### Browser

Open your browser to:

```
http://localhost:5000
```

---

## 🧪 Test It

1. **Create Account** - Sign up with test credentials
2. **Submit Transaction** - Amount: 5000, Location: moscow, Device: atm
3. **View Dashboard** - Check fraud detection results
4. **Export CSV** - Download transaction data

---

## 🔌 API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login user |
| POST | `/api/transactions/predict` | Predict transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions?fraudOnly=true` | Get fraud only |
| GET | `/api/transactions/stats/summary` | Get statistics |
| GET | `/api/transactions/export/csv` | Export CSV |

---

## 📝 Sample Request

```json
{
  "userId": "USR-2048",
  "amount": 4999,
  "location": "Mumbai",
  "device": "mobile",
  "time": "2026-04-18T12:00"
}
```

---

## ⚙️ Environment Setup

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
FLASK_API_URL=http://127.0.0.1:5001/predict
```

No MongoDB URI needed!

---

## 🛠️ Troubleshooting

### "Cannot connect"
- Check both terminals are running (Flask on 5001, Express on 5000)
- Try `http://localhost:5000` in your browser

### "Port already in use"
- Kill the process: `netstat -ano | findstr :5000`
- Then: `taskkill /PID <PID> /F`

### "Data disappeared"
- Data is in RAM - it's lost when servers restart (intentional)
- Restart both terminals for fresh data

**Full troubleshooting:** See TROUBLESHOOTING.md

---

## 📖 Prerequisites

- **Node.js** v16.0.0+ (check: `node --version`)
- **npm** v8.0.0+ (check: `npm --version`)
- **Python** 3.8+ (check: `python --version`)

---

## 🎓 Features

- ✅ User authentication with JWT tokens
- ✅ Real-time fraud detection with ML scoring
- ✅ Live dashboard with WebSocket updates
- ✅ Transaction analytics and statistics
- ✅ CSV export functionality
- ✅ Dark/Light theme toggle
- ✅ Responsive mobile-friendly design
- ✅ No database installation required

---

## 📄 License

This is a sample e-commerce fraud detection application.

---

**Start with START.md for the quickest setup!**
