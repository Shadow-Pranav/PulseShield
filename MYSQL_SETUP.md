# MySQL Database Setup Guide

**PulseShield Fraud Detection System - MySQL Integration**

---

## 🗄️ Overview

This system now uses **MySQL** instead of in-memory storage. All user and transaction data is persisted in a MySQL database.

**What changed:**
- ❌ Removed: In-memory arrays (data lost on restart)
- ✅ Added: MySQL persistence (data survives restarts)
- ✅ Added: Database schema with proper relationships
- ✅ Added: Connection pooling for performance

---

## 📋 Prerequisites

Before starting, you need:

1. **MySQL Server** (Community Edition, free)
   - Download: https://dev.mysql.com/downloads/mysql/
   - Version: 5.7 or higher

2. **Node.js & npm** (already have it)

---

## ⚙️ Installation Steps

### Step 1: Install MySQL Server

**Windows:**

1. Download MySQL installer: https://dev.mysql.com/downloads/installer/
2. Run the installer
3. Choose "Server only" or "Developer Default"
4. Follow setup wizard (click Next multiple times)
5. Configure MySQL Server:
   - Port: 3306 (default)
   - Server type: Development Machine
   - Config type: Standalone MySQL Server
   - MySQL Server Instance Configuration: defaults fine
6. Set root password (remember this!)
7. Configure MySQL as Windows Service

**Verify installation:**
```bash
mysql --version
```

Should show version number like: `mysql  Ver 8.0.36 for Win64`

---

### Step 2: Create Database

Open MySQL Command Line Client or use terminal:

```bash
mysql -u root -p
```

Enter your root password when prompted.

**Then run:**

```sql
CREATE DATABASE fraud_detection;
```

Verify:
```sql
SHOW DATABASES;
```

Should list: fraud_detection

**Exit:**
```sql
EXIT;
```

---

### Step 3: Update Backend Configuration

Edit: `backend/.env`

```
PORT=5000
JWT_SECRET=fraud_detection_secret_key_2026
FLASK_API_URL=http://127.0.0.1:5001/predict

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_root_password
DB_NAME=fraud_detection
```

Replace `your_root_password` with your actual MySQL root password.

---

### Step 4: Install MySQL Driver

In Terminal 2 (Express backend):

```bash
cd d:\E_Commerce\backend
npm install mysql2
```

This installs the MySQL driver for Node.js.

---

### Step 5: Start the System

**Terminal 1 (Flask):**

```bash
cd d:\E_Commerce
python app.py
```

Should show: `Running on http://127.0.0.1:5001`

**Terminal 2 (Express):**

```bash
cd d:\E_Commerce\backend
npm run dev
```

Should show: `Server running on http://localhost:5000`

**And see MySQL initialization:**
```
Initializing MySQL database...
✅ Users table ready
✅ Transactions table ready
✅ MySQL database initialized successfully
```

---

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Fields:**
- `id` - User ID (auto-increment)
- `email` - Unique email address
- `name` - User's full name
- `password` - Hashed password (bcrypt)
- `createdAt` - Account creation timestamp
- `updatedAt` - Last modification timestamp

### Transactions Table

```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  device VARCHAR(50) NOT NULL,
  time DATETIME NOT NULL,
  prediction BOOLEAN NOT NULL,
  probability DECIMAL(5, 4) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
)
```

**Fields:**
- `id` - Transaction ID
- `userId` - Reference to users table
- `amount` - Transaction amount
- `location` - Transaction location
- `device` - Device type (atm, mobile, desktop, tablet)
- `time` - Transaction datetime
- `prediction` - Fraud prediction (0=safe, 1=fraud)
- `probability` - Fraud probability (0-1)
- `createdAt` - Record creation timestamp

---

## 🔧 Configuration Reference

### `backend/config/mysql.js`

Connection pool settings:

```javascript
const pool = mysql.createPool({
  host: "localhost",          // MySQL server address
  user: "root",               // MySQL username
  password: "",               // MySQL password
  database: "fraud_detection", // Database name
  waitForConnections: true,   // Wait if no connections available
  connectionLimit: 10,        // Max connections in pool
  queueLimit: 0               // Unlimited queue
});
```

**Adjust if needed:**
- Increase `connectionLimit` for high traffic
- Set `password` from .env

---

## 🧪 Testing the Database

### Via Terminal (MySQL Client)

```bash
mysql -u root -p fraud_detection
```

**View users:**
```sql
SELECT * FROM users;
```

**View transactions:**
```sql
SELECT * FROM transactions;
```

**View transaction stats:**
```sql
SELECT prediction, COUNT(*) as count FROM transactions GROUP BY prediction;
```

**Exit:**
```sql
EXIT;
```

### Via Web Interface

1. Open: http://localhost:5000
2. Create account
3. Submit transaction
4. Check MySQL Client to see data persisted

---

## ⚠️ Troubleshooting

### Error: "Can't connect to MySQL server"

**Solution:**
1. Verify MySQL is running
2. Check `DB_HOST` in `.env` (should be `localhost`)
3. Check `DB_USER` and `DB_PASSWORD` match MySQL setup
4. Run: `mysql -u root -p` to test access

### Error: "Unknown database 'fraud_detection'"

**Solution:**
```bash
mysql -u root -p
CREATE DATABASE fraud_detection;
EXIT;
```

### Error: "Access denied for user 'root'@'localhost'"

**Solution:**
1. Password incorrect in `.env`
2. Or root password not set during MySQL installation
3. Reset MySQL root password (see MySQL docs)

### Tables not being created

**Solution:**
1. Database exists but no tables
2. Check server.js console for errors
3. Manually create tables:
```bash
mysql -u root -p fraud_detection < schema.sql
```

---

## 📈 Performance Tips

1. **Connection Pooling** - Already enabled (10 connections)
2. **Indexes** - Automatically on primary keys
3. **Query Caching** - Enable in MySQL config for high traffic
4. **Backups** - Regularly backup database:
```bash
mysqldump -u root -p fraud_detection > backup.sql
```

---

## 🔄 Switching Back to In-Memory

To use in-memory storage again:

1. Comment out MySQL code in `server.js`
2. Revert `users.js` and `transactions.js` from git
3. Remove mysql2 from `package.json`
4. Run `npm install`

**But MySQL is recommended for production!**

---

## 📝 File Changes

**New Files:**
- `backend/config/mysql.js` - Database connection & initialization

**Modified Files:**
- `backend/server.js` - Added MySQL initialization
- `backend/storage/users.js` - MySQL queries
- `backend/storage/transactions.js` - MySQL queries
- `backend/package.json` - Added mysql2 dependency
- `backend/.env` - MySQL configuration
- `backend/.env.example` - MySQL template

**Removed/Deprecated:**
- In-memory storage logic (replaced with MySQL)

---

## ✅ Checklist

- [ ] MySQL Server installed and running
- [ ] Database `fraud_detection` created
- [ ] `.env` updated with DB_PASSWORD
- [ ] `npm install` completed (mysql2 installed)
- [ ] Server starts without DB connection errors
- [ ] Tables auto-created on startup
- [ ] Can create user account
- [ ] Can submit transaction
- [ ] Data visible in MySQL client
- [ ] Dashboard shows transactions

---

## 📞 Need Help?

1. Check error messages in server console
2. Verify MySQL is running: `mysql -u root -p`
3. Check `.env` configuration
4. Review `backend/config/mysql.js` connection settings
5. Check database exists: `mysql -u root -p -e "SHOW DATABASES;"`

---

**MySQL integration complete! Data now persists.** 🎉
