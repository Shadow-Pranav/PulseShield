# Complete PulseShield Setup & Run Guide

## ✅ Project Analysis Complete

All files have been analyzed and the following issues were fixed:

### Bugs Fixed:
1. ✅ **Created ml_assets directory** - Flask ML engine now has proper directory for model files
2. ✅ **Fixed transaction stats sort order** - Changed from ascending to descending (most recent first)
3. ✅ **Updated .env.example** - Now includes all MySQL configuration variables

---

## 📋 Prerequisites

Before starting, ensure you have installed:

- **Node.js 14+** - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://www.python.org/)
- **MySQL Server 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **npm** - Comes with Node.js

### Verify Installation

```bash
node --version      # Should be v14 or higher
npm --version       # Should be v6 or higher
python --version    # Should be 3.8 or higher
mysql --version     # Should be 8.0 or higher
```

---

## 🗄️ Step 1: MySQL Database Setup

### 1.1 Start MySQL Server

**Windows:**
```bash
# Option 1: If MySQL is installed as a service
net start MySQL80

# Option 2: Using MySQL installed folder
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysqld --console
```

**Mac/Linux:**
```bash
brew services start mysql
# or
sudo systemctl start mysql
```

### 1.2 Create Database and User

```bash
mysql -u root -p
# Enter your MySQL root password (leave empty if no password)

# Create database
CREATE DATABASE fraud_detection;

# Verify
SHOW DATABASES;
```

### 1.3 Configure Backend .env

Edit `backend/.env`:

```env
# MySQL Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fraud_detection

# Flask ML Engine URL
FLASK_API_URL=http://127.0.0.1:5001/predict

# Express Server
PORT=5000

# JWT Secret (change in production)
JWT_SECRET=dev_secret_change_in_production

# Flask Debug Mode
FLASK_DEBUG=false
```

---

## 🐍 Step 2: Python & Flask Setup

### 2.1 Create Virtual Environment

```bash
cd d:\E_Commerce

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 2.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Expected packages:**
- Flask 3.1.0
- Flask-Cors 5.0.0
- pandas 2.3.3
- numpy 2.4.4
- scikit-learn 1.3.2

### 2.3 Note on ML Models

The ML model files should be placed in the `ml_assets/` directory:
- `fraud_model.pkl` - Trained scikit-learn classifier
- `columns.pkl` - Feature column names
- `encoders.pkl` - Categorical label encoders

**If ML model files are missing:** The app will use a fallback rule-based scoring system. This is intentional and fully functional for testing.

---

## 📦 Step 3: Node.js & Express Setup

### 3.1 Install Backend Dependencies

```bash
cd d:\E_Commerce\backend
npm install
```

**Expected packages:**
- express 4.21.2
- mysql2 3.22.1
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- socket.io 4.8.1
- cors 2.8.5
- dotenv 16.4.7
- nodemon 3.1.9 (dev)

### 3.2 Verify Installation

```bash
npm list
```

---

## 🚀 Step 4: Run the Application

### Option A: Run in Separate Terminals (Recommended)

**Terminal 1 - Flask ML Engine:**

```bash
cd d:\E_Commerce

# Activate Python virtual environment
venv\Scripts\activate

# Start Flask server
python app.py
```

**Expected output:**
```
Loading ML model files...
Columns file not found... Using fallback scoring.
Encoders file not found... Using fallback scoring.
Running on http://127.0.0.1:5001
```

**Terminal 2 - Express Backend API:**

```bash
cd d:\E_Commerce\backend

# Start Express server (with auto-reload)
npm run dev
```

**Expected output:**
```
Server running at http://localhost:5000
MySQL database connected
```

**Terminal 3 - Open Browser:**

```bash
# Open http://localhost:5000 in your browser
```

### Option B: Run with Batch Files

For Windows users, you can use the provided batch files:

```bash
# In Command Prompt or PowerShell
cd d:\E_Commerce
START_ALL.bat
```

---

## 🌐 Step 5: Using the Application

### 5.1 Home Page (Signup/Login)

1. Open [http://localhost:5000](http://localhost:5000)
2. Click on **"Create Account"** tab
3. Enter:
   - Name: Your name
   - Email: test@example.com
   - Password: anypassword123
4. Click **"Create Account"**
5. You'll get a JWT token stored in browser

### 5.2 Submit a Transaction

1. Fill in the prediction form:
   - **User ID**: Your email (from login)
   - **Amount**: 500 to 10000
   - **Location**: moscow, lagos, bucharest, new_york, etc.
   - **Device**: mobile, atm, desktop, tablet, etc.
   - **Time**: Defaults to current time (can change)
2. Click **"Scan Transaction"**
3. See fraud probability and prediction result

### 5.3 View Dashboard

1. Click **"Dashboard"** in navigation
2. View:
   - Total transactions
   - Fraud detected count
   - Average fraud probability
   - Live chart of recent transactions
   - Real-time updates via WebSockets
   - Export transactions as CSV

---

## 🧪 Testing the Application

### Test Case 1: Safe Transaction

```json
{
  "userId": "test@example.com",
  "amount": 100,
  "location": "new_york",
  "device": "mobile",
  "time": "2024-04-19T14:30:00"
}
```

**Expected:** Safe (low probability ~20%)

### Test Case 2: Suspicious Transaction

```json
{
  "userId": "test@example.com",
  "amount": 9500,
  "location": "moscow",
  "device": "atm",
  "time": "2024-04-19T03:15:00"
}
```

**Expected:** Fraud flagged (high probability ~70-80%)

### Test Case 3: Mixed Risk

```json
{
  "userId": "test@example.com",
  "amount": 2500,
  "location": "unknown",
  "device": "tablet",
  "time": "2024-04-19T22:45:00"
}
```

**Expected:** Medium risk (probability ~50%)

---

## 🔴 Troubleshooting

### Issue: "MySQL is not connected"

**Solution:**
1. Verify MySQL is running:
   ```bash
   mysql -u root -p
   ```
2. Check if database exists:
   ```sql
   SHOW DATABASES;
   ```
3. Verify credentials in `backend/.env`
4. Restart Express server

### Issue: "Cannot find module 'mysql2'"

**Solution:**
```bash
cd backend
npm install mysql2
```

### Issue: "Cannot find module 'flask'"

**Solution:**
```bash
# Activate virtual environment
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### Issue: "Port 5000 is already in use"

**Solution:**
1. Find and kill process:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -i :5000
   kill -9 <PID>
   ```
2. Or change PORT in `backend/.env` to 5001, 5002, etc.

### Issue: "ML API error: Prediction service unavailable"

**Solution:**
1. Ensure Flask server is running (Terminal 1)
2. Check Flask is on port 5001
3. Verify FLASK_API_URL in backend/.env is correct
4. Check browser console for more details

### Issue: "TypeError: Cannot read properties of undefined"

**Solution:**
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R
3. Check browser console for errors: F12

---

## 📊 Architecture Overview

```
User Browser (http://localhost:5000)
     ↓
Frontend (HTML/CSS/JavaScript)
     ↓
Express API (http://localhost:5000)
     ├→ /api/auth/signup
     ├→ /api/auth/login
     └→ /api/transactions/*
     ↓
MySQL Database
     ├→ users table
     └→ transactions table

Parallel Process:
Flask ML Engine (http://127.0.0.1:5001)
     └→ /predict endpoint
     ↓
Scikit-learn Model (or fallback rules)
     ↓
Returns fraud prediction & probability
```

---

## 🛑 Stopping the Application

**Terminal 1 (Flask):** Press `Ctrl+C`

**Terminal 2 (Express):** Press `Ctrl+C`

**MySQL (Windows):** 
```bash
net stop MySQL80
```

---

## 📝 Important Notes

1. **Default MySQL password is empty** - Set a password for security in production
2. **JWT_SECRET is dev_secret** - Change this in production
3. **Data persists in MySQL** - Restarting servers doesn't delete data
4. **Email must be unique** - Can't signup with same email twice
5. **ML models are optional** - Fallback rules work without trained models
6. **WebSocket requires same origin** - Frontend and backend must be on same host:port

---

## ✅ Verification Checklist

- [ ] MySQL Server is running
- [ ] `backend/.env` is configured correctly
- [ ] Python virtual environment is activated
- [ ] Flask server is running on http://127.0.0.1:5001
- [ ] Express server is running on http://localhost:5000
- [ ] Browser shows application at http://localhost:5000
- [ ] Can create an account
- [ ] Can submit a transaction
- [ ] Can view results
- [ ] Can access dashboard
- [ ] Real-time updates work

---

## 🎯 Next Steps

1. **Add ML models**: Place trained .pkl files in `ml_assets/` for ML-based predictions
2. **Configure MySQL**: Set proper DB_PASSWORD for production
3. **Change JWT_SECRET**: Update to a secure secret in production
4. **Add more features**: Custom fraud rules, webhooks, notifications
5. **Deploy**: Use PM2, Docker, or cloud platforms

---

## 📞 Support

For issues or questions:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review error messages in terminal
3. Check browser console (F12)
4. Review [ERRORS_AND_SOLUTIONS.md](ERRORS_AND_SOLUTIONS.md)

Good luck with PulseShield! 🛡️
