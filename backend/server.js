require("dotenv").config();

const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const { initializeDatabase } = require("./config/mysql");
const { predictTransaction } = require("./controllers/transactionController");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/predict", predictTransaction);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    database: "mysql",
    message: "Server running with MySQL storage"
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initializeDatabase();
    console.log("MySQL database connected");
  } catch (error) {
    console.error("Database initialization warning:", error.message);
    console.log("Continuing without database... (fallback mode)");
  }

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
