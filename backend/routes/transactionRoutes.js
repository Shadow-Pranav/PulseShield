const express = require("express");

const authMiddleware = require("../middleware/auth");
const {
  predictTransaction,
  getTransactions,
  getTransactionStats,
  exportTransactionsCsv
} = require("../controllers/transactionController");

const router = express.Router();

router.use(authMiddleware);

router.post("/predict", predictTransaction);
router.get("/", getTransactions);
router.get("/stats/summary", getTransactionStats);
router.get("/export/csv", exportTransactionsCsv);

module.exports = router;
