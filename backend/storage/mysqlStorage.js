const { getPool } = require("../config/mysql");

function mapUser(row) {
  if (!row) {
    return null;
  }

  return {
    _id: String(row.id),
    id: String(row.id),
    name: row.name,
    email: row.email,
    password: row.password,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function mapTransaction(row) {
  if (!row) {
    return null;
  }

  return {
    _id: String(row.id),
    id: String(row.id),
    userId: row.userId,
    amount: Number(row.amount),
    location: row.location,
    device: row.device,
    time: row.time,
    prediction: Boolean(row.prediction),
    probability: Number(row.probability),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

const User = {
  async create(userData) {
    const pool = getPool();
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [userData.name, userData.email, userData.password]
    );
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [result.insertId]);
    return mapUser(rows[0]);
  },

  async findOne(query) {
    const pool = getPool();

    if (query.email) {
      const [rows] = await pool.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [query.email]);
      return mapUser(rows[0]);
    }

    if (query.id || query._id) {
      const [rows] = await pool.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [query.id || query._id]);
      return mapUser(rows[0]);
    }

    return null;
  },

  async find() {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM users ORDER BY createdAt DESC");
    return rows.map(mapUser);
  }
};

const Transaction = {
  async create(transactionData) {
    const pool = getPool();
    const [result] = await pool.execute(
      `
        INSERT INTO transactions (userId, amount, location, device, time, prediction, probability)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        transactionData.userId,
        transactionData.amount,
        transactionData.location,
        transactionData.device,
        transactionData.time,
        transactionData.prediction ? 1 : 0,
        transactionData.probability
      ]
    );
    const [rows] = await pool.execute("SELECT * FROM transactions WHERE id = ?", [result.insertId]);
    return mapTransaction(rows[0]);
  },

  async find(query = {}, options = {}) {
    const pool = getPool();
    const clauses = [];
    const params = [];

    if (query.prediction !== undefined) {
      clauses.push("prediction = ?");
      params.push(query.prediction ? 1 : 0);
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const limit = Number(options.limit || 50);
    const sortDirection = options.sort && options.sort.createdAt === 1 ? "ASC" : "DESC";

    const [rows] = await pool.query(
      `
        SELECT * FROM transactions
        ${whereClause}
        ORDER BY createdAt ${sortDirection}
        LIMIT ?
      `,
      [...params, limit]
    );

    return rows.map(mapTransaction);
  }
};

module.exports = {
  User,
  Transaction
};
