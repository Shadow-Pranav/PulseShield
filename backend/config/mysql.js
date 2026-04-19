const mysql = require("mysql2/promise");

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "fraud_detection";

let pool;

async function initializeDatabase() {
  const bootstrap = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD
  });

  await bootstrap.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await bootstrap.end();

  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      amount DECIMAL(12, 2) NOT NULL,
      location VARCHAR(255) NOT NULL,
      device VARCHAR(50) NOT NULL,
      time DATETIME NOT NULL,
      prediction BOOLEAN NOT NULL,
      probability DECIMAL(6, 4) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

function getPool() {
  if (!pool) {
    throw new Error("MySQL pool has not been initialized");
  }

  return pool;
}

module.exports = {
  initializeDatabase,
  getPool
};
