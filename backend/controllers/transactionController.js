const axios = require("axios");

const { Transaction } = require("../storage/mysqlStorage.js");

async function predictTransaction(req, res, next) {
  try {
    const { userId, amount, location, device, time } = req.body;

    if (!userId || !amount || !location || !device || !time) {
      return next({
        statusCode: 400,
        message: "All transaction fields are required"
      });
    }

    const flaskApiUrl = process.env.FLASK_API_URL || "http://127.0.0.1:5001/predict";
    const response = await axios.post(flaskApiUrl, {
      userId,
      amount,
      location,
      device,
      time
    });

    const transaction = await Transaction.create({
      userId,
      amount,
      location,
      device,
      time,
      prediction: response.data.fraud,
      probability: response.data.probability
    });

    req.app.get("io").emit("transaction:new", transaction);

    return res.status(201).json({
      message: "Prediction completed",
      transaction
    });
  } catch (error) {
    if (error.response) {
      return next({
        statusCode: 502,
        message: `ML API error: ${error.response.data.message || "Prediction service unavailable"}`
      });
    }

    return next({
      statusCode: 500,
      message: error.message || "Unable to predict transaction"
    });
  }
}

async function getTransactions(req, res, next) {
  try {
    const fraudOnly = req.query.fraudOnly === "true";
    const limit = Number(req.query.limit || 50);
    const query = fraudOnly ? { prediction: true } : {};

    const transactions = await Transaction.find(query, { sort: { createdAt: -1 }, limit });
    return res.json({ transactions });
  } catch (error) {
    return next(error);
  }
}

async function getTransactionStats(_req, res, next) {
  try {
    const transactions = await Transaction.find({}, { sort: { createdAt: 1 } });

    const totalTransactions = transactions.length;
    const fraudDetected = transactions.filter((transaction) => transaction.prediction).length;
    const legitimateTransactions = totalTransactions - fraudDetected;
    const averageProbability = totalTransactions
      ? transactions.reduce((sum, transaction) => sum + transaction.probability, 0) / totalTransactions
      : 0;

    const chartData = {
      labels: transactions.slice(-10).map((transaction) => new Date(transaction.createdAt).toLocaleTimeString()),
      values: transactions.slice(-10).map((transaction) => transaction.probability)
    };

    return res.json({
      stats: {
        totalTransactions,
        fraudDetected,
        legitimateTransactions,
        averageProbability,
        chartData
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function exportTransactionsCsv(_req, res, next) {
  try {
    const transactions = await Transaction.find({}, { sort: { createdAt: -1 } });
    const header = "userId,amount,location,device,time,probability,prediction";
    const rows = transactions.map((transaction) =>
      [
        transaction.userId,
        transaction.amount,
        transaction.location,
        transaction.device,
        new Date(transaction.time).toISOString(),
        transaction.probability,
        transaction.prediction
      ].join(",")
    );

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
    return res.send([header, ...rows].join("\n"));
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  predictTransaction,
  getTransactions,
  getTransactionStats,
  exportTransactionsCsv
};
