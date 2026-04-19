# E-Commerce Fraud Detection System - Complete Setup Guide

**PulseShield** - A full-stack real-time fraud detection web application

## Project Overview

This is a complete fraud detection system with three main components:

| Component | Technology | Port | Purpose |
|-----------|-----------|------|---------|
| **Frontend** | HTML/CSS/JavaScript | 5000 | User interface & dashboard |
| **Backend API** | Node.js + Express | 5000 | API server & WebSocket |
| **ML Engine** | Python + Flask | 5001 | Fraud scoring algorithm |
| **Database** | In-Memory Storage (RAM) | — | User & transaction data (no external DB) |

### Key Features
✅ Real-time fraud detection with ML scoring  
✅ User authentication with JWT tokens  
✅ Live dashboard with WebSocket updates  
✅ Transaction analytics & CSV export  
✅ Dark/Light theme support  
✅ Responsive mobile-friendly design  

---

## System Requirements

### Minimum Requirements
- **OS**: Windows 7+, macOS 10.12+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 1GB free space
- **Internet**: Required for CDN libraries (Bootstrap, Tailwind, Chart.js)

### Software Prerequisites
- **Node.js**: v16.0.0 or higher (v18+ recommended)
- **npm**: v8.0.0 or higher (comes with Node.js)
- **Python**: v3.8 or higher
- **Git**: Optional (for version control)

**Note:** MongoDB is NOT required! This system uses in-memory storage.

### Browser Compatibility
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Part 1: Prerequisites Installation

### 1.1 Install Node.js

**Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS version (v18+)
3. Run installer and follow prompts
4. Select "Add to PATH" during installation
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**macOS (using Homebrew):**
```bash
brew install node
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

### 1.2 Install Python

**Windows:**
1. Visit [python.org](https://www.python.org/)
2. Download Python 3.10 or higher
3. Run installer
4. **IMPORTANT**: Check "Add Python to PATH"
5. Verify installation:
   ```bash
   python --version
   pip --version
   ```

**macOS:**
```bash
brew install python@3.10
python3 --version
pip3 --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version
pip3 --version
```

### 1.3 MongoDB (Not Required)

⚠️ **IMPORTANT:** MongoDB is NO LONGER needed for this system!

This application now uses **in-memory storage** (RAM) instead of MongoDB:
- ✅ No database installation
- ✅ Faster setup (2 minutes instead of 15)
- ✅ Simpler configuration
- ✅ Perfect for development & testing

**Note:** Data is stored in RAM and lost when the server restarts. This is intentional for development. See MONGODB_REMOVAL_GUIDE.md if you want to re-enable MongoDB for production.

### 1.4 Verify All Installations

```bash
# Check Node.js & npm
node -v          # Should be v16.0.0 or higher
npm -v            # Should be v8.0.0 or higher

# Check Python
python --version  # Should be 3.8 or higher
pip --version     # Should match Python version
```

**All prerequisites checked!** ✅

---

## Part 2: Backend Setup (Node.js/Express Server)

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

**What you'll see:**
- `server.js` - Main Express application
- `package.json` - Node.js dependencies
- `storage/` - In-memory data storage
- `controllers/` - Business logic
- `middleware/` - Authentication & validation
- `routes/` - API endpoint definitions

### 2.2 Install Node Dependencies

```bash
npm install
```

This installs packages from `package.json`:

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^4.21.2 | Web framework |
| **jsonwebtoken** | ^9.0.2 | JWT token creation/verification |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **cors** | ^2.8.5 | Cross-origin requests |
| **socket.io** | ^4.8.1 | Real-time WebSocket |
| **axios** | ^1.7.9 | HTTP client for Flask |
| **dotenv** | ^16.4.7 | Environment variables |
| **nodemon** (dev) | ^3.1.9 | Auto-reload during development |

**Note:** MongoDB/Mongoose has been removed. Data is stored in RAM instead.

**Installation time:** 2-5 minutes

### 2.3 Create Environment File

Create `.env` file in the `backend/` directory:

```bash
# Copy from example
cp ..\.env.example .env

# Or create manually:
# Windows (PowerShell)
New-Item -Name ".env" -ItemType "file"

# Linux/macOS
touch .env
```

**Edit `.env` with the following:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your_super_secret_key_change_this_in_production

# Flask ML Engine
FLASK_API_URL=http://127.0.0.1:5001/predict

# Database: In-memory storage (no external database required)
# Data is stored in RAM and lost when server restarts
```

**That's it!** No MONGO_URI needed.

### 2.4 Start Express Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Expected output:**
```
Server running on http://localhost:5000
WebSocket server initialized
```

**What happens:**
- Express listens on port 5000
- Serves frontend files from `../frontend/`
- Uses in-memory storage (no database connection)
- WebSocket server initialized
- Routes API requests to controllers

---

## Part 3: Frontend Setup (Web Dashboard)

### 3.1 Frontend Structure

Frontend files are already included in the project:
- `index.html` - Landing page with prediction form
- `dashboard.html` - Analytics dashboard
- `script.js` - Frontend logic (2000+ lines)
- `styles.css` - Responsive styling

### 3.2 How Frontend is Served

The Express server automatically serves frontend files:

```javascript
// In server.js
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});
```

### 3.3 Access the Application

Once Express is running:

**Main Page:**
```
http://localhost:5000/index.html
```

**Dashboard Page:**
```
http://localhost:5000/dashboard.html
```

---

## Part 4: Python Flask Server (ML Engine)

### 4.1 Create Python Virtual Environment

**Windows (PowerShell):**
```bash
cd d:\E_Commerce
python -m venv venv
venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
cd d:\E_Commerce
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
cd ~/E_Commerce
python3 -m venv venv
source venv/bin/activate
```

**Verify activation:**
```bash
# You should see (venv) in your prompt
(venv) $ python --version
```

### 4.2 Install Python Packages

```bash
pip install -r requirements.txt
```

**packages.txt contents:**
```
Flask==3.1.0
Flask-Cors==5.0.0
```

**What these do:**
- **Flask** - Lightweight Python web framework
- **Flask-Cors** - Enable cross-origin requests from Express

### 4.3 Understand Flask Application

**app.py structure:**
```python
# Route: /predict (POST)
# Input: { userId, amount, location, device, time }
# Logic: Fraud probability calculation
# Output: { fraud: boolean, probability: float }
```

**Fraud scoring algorithm:**
1. Base probability: 0.12
2. Amount >= 5000: +0.35
3. Amount >= 2000: +0.18
4. Amount >= 1000: +0.10
5. High-risk location (moscow, lagos, etc.): +0.20
6. High-risk device (atm, tablet): +0.14
7. Mobile device: +0.06
8. Late night (23:00-05:00): +0.18
9. Early morning (05:00-07:00): +0.08

**Threshold:** Fraud if probability >= 0.60

### 4.4 Start Flask Server

```bash
python app.py
```

**Expected output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
```

**Port:** 5001 (different from Express)

---

## Part 5: Complete Project Architecture

### 5.1 Complete Directory Structure

```
E_Commerce/
├── README.md                              # Project overview
├── SETUP_GUIDE.md                         # This file
├── QUICK_START.md                         # Quick reference
├── TROUBLESHOOTING.md                     # Troubleshooting guide
├── .env.example                           # Environment template
├── app.py                                 # Flask ML server
├── requirements.txt                       # Python dependencies
│
├── frontend/                              # Web interface
│   ├── index.html                         # Landing page (1400+ lines)
│   ├── dashboard.html                     # Analytics (800+ lines)
│   ├── script.js                          # Frontend logic (2000+ lines)
│   └── styles.css                         # Styling (800+ lines)
│
└── backend/                               # Node.js API server
    ├── server.js                          # Express app (500+ lines)
    ├── package.json                       # Dependencies
    ├── package-lock.json                  # Dependency lock
    │
    ├── config/
    │   └── db.js                          # MongoDB connection
    │
    ├── controllers/
    │   ├── authController.js              # User auth logic
    │   └── transactionController.js       # Fraud prediction logic
    │
    ├── models/
    │   ├── User.js                        # User schema
    │   └── Transaction.js                 # Transaction schema
    │
    ├── middleware/
    │   └── auth.js                        # JWT verification
    │
    └── routes/
        ├── authRoutes.js                  # /api/auth/*
        └── transactionRoutes.js           # /api/transactions/*
```

### 5.2 Backend Controllers Details

**authController.js:**
- `signup(req, res, next)` - Create new user with hashed password
- `login(req, res, next)` - Authenticate and issue JWT token

**transactionController.js:**
- `predictTransaction(req, res, next)` - Call Flask, save result
- `getTransactions(req, res, next)` - List transactions with filtering
- `getTransactionStats(req, res, next)` - Calculate dashboard metrics
- `exportTransactionsCsv(req, res, next)` - Generate CSV export

### 5.3 Frontend Features

**index.html:**
- Responsive navigation bar
- Theme toggle (dark/light)
- Authentication form (signup/login)
- Transaction prediction form
- Recent transactions table
- Toast notifications

**dashboard.html:**
- Dashboard header
- 4 metric cards (total, fraud, safe, average risk)
- Transactions history table
- Probability chart (Chart.js)
- Fraud filter checkbox
- CSV export button
- Live updates via WebSocket

---

## Part 6: Complete API Reference

### 6.1 Authentication Endpoints

**POST /api/auth/signup**
```
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response (201):
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Error (409):
{ "message": "User already exists" }

Error (400):
{ "message": "Name, email, and password are required" }
```

**POST /api/auth/login**
```
Request:
{
  "email": "john@example.com",
  "password": "secure_password"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Error (401):
{ "message": "Invalid email or password" }

Error (400):
{ "message": "Email and password are required" }
```

### 6.2 Transaction Endpoints

**POST /api/transactions/predict**
```
Request (requires Authorization header):
{
  "userId": "user123",
  "amount": 5000,
  "location": "moscow",
  "device": "atm",
  "time": "2024-04-18T23:30:00"
}

Response (201):
{
  "message": "Prediction completed",
  "transaction": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user123",
    "amount": 5000,
    "location": "moscow",
    "device": "atm",
    "time": "2024-04-18T23:30:00",
    "prediction": true,
    "probability": 0.87,
    "createdAt": "2024-04-18T10:30:00Z",
    "updatedAt": "2024-04-18T10:30:00Z"
  }
}

Error (502):
{ "message": "ML API error: Prediction service unavailable" }

Error (400):
{ "message": "All transaction fields are required" }
```

**GET /api/transactions?limit=50&fraudOnly=false**
```
Response (200):
{
  "transactions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "user123",
      "amount": 5000,
      "location": "moscow",
      "device": "atm",
      "time": "2024-04-18T23:30:00",
      "prediction": true,
      "probability": 0.87,
      "createdAt": "2024-04-18T10:30:00Z"
    },
    ...
  ]
}
```

**GET /api/transactions/stats/summary**
```
Response (200):
{
  "stats": {
    "totalTransactions": 42,
    "fraudDetected": 8,
    "legitimateTransactions": 34,
    "averageProbability": 0.45,
    "chartData": {
      "labels": ["10:30:00 AM", "10:31:00 AM", ...],
      "values": [0.45, 0.67, 0.23, ...]
    }
  }
}
```

**GET /api/transactions/export/csv**
```
Response: CSV file download
Format: userId,amount,location,device,time,probability,prediction
```

### 6.3 Flask ML Endpoint

**POST /predict** (http://127.0.0.1:5001)
```
Request:
{
  "userId": "user123",
  "amount": 5000,
  "location": "moscow",
  "device": "atm",
  "time": "2024-04-18T23:30:00"
}

Response (200):
{
  "fraud": true,
  "probability": 0.87
}

Error (400):
{ "message": "Missing fields: ..." }
```

---

## Part 7: Database Schemas

### 7.1 User Collection

```javascript
{
  _id: ObjectId,
  name: String,              // User's full name
  email: String,             // Unique email address
  password: String,          // Bcrypt hashed password
  createdAt: Date,           // Account creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

**Indexes:**
```
{ email: 1, unique: true }  // Ensure unique emails
```

### 7.2 Transaction Collection

```javascript
{
  _id: ObjectId,
  userId: String,            // User ID from JWT
  amount: Number,            // Transaction amount
  location: String,          // Geographic location
  device: String,            // Device type (mobile, atm, etc.)
  time: Date,                // Transaction timestamp
  prediction: Boolean,       // true = fraud, false = safe
  probability: Number,       // Fraud probability (0-1)
  createdAt: Date,           // When recorded in DB
  updatedAt: Date            // Last update timestamp
}
```

**Indexes:**
```
{ userId: 1 }              // Query by user
{ createdAt: -1 }          // Sort by time
{ prediction: 1 }          // Filter fraud only
```

### 8.1 Three-Terminal Setup (Recommended)

You need **3 separate terminal windows** running simultaneously:

**TERMINAL 1 - MongoDB Database:**
```bash
net start MongoDB
```

Expected output:
```
The MongoDB service is starting.
The MongoDB service has been started successfully.
```

If Windows reports that the service is already running, leave it as-is and continue.

**TERMINAL 2 - Flask ML Server:**
```bash
cd d:\E_Commerce
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5001
 * Debug mode: on
```

**TERMINAL 3 - Express API Server:**
```bash
cd d:\E_Commerce\backend
npm install
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected
```

### 8.2 Access Application

Once all three services are running:

**Browser:** `http://localhost:5000`

You should see the landing page with:
- Theme toggle button
- Authentication form (signup/login)
- Transaction prediction form
- Dashboard link

---

## Part 9: Security Configuration

### 9.1 Environment Variables

**For Development:**
```env
JWT_SECRET=dev_secret_key
NODE_ENV=development
```

**For Production:**
```bash
# Generate strong secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Use result as JWT_SECRET
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
NODE_ENV=production
```

### 9.2 MongoDB Authentication (Production)

```env
MONGO_URI=mongodb://username:password@host:27017/fraud_detection?authSource=admin
```

### 9.3 CORS Configuration

Edit `backend/server.js`:
```javascript
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

---

## Part 10: Common Development Tasks

### 10.1 View MongoDB Data

```bash
# Connect to MongoDB
mongosh

# Switch database
use fraud_detection

# View users
db.users.find()

# View transactions
db.transactions.find().limit(5)

# Count fraud transactions
db.transactions.countDocuments({ prediction: true })

# Exit
exit
```

### 10.2 Clear Database (Development Only)

```bash
mongosh
use fraud_detection

# Delete all users
db.users.deleteMany({})

# Delete all transactions
db.transactions.deleteMany({})

exit
```

### 10.3 Restart All Services

```bash
# Kill all three terminals (Ctrl+C)

# Restart in order:
# 1. mongod
# 2. python app.py
# 3. npm run dev
```

---

## Part 11: Verifying Complete Setup

### 11.1 Checklist

- [ ] MongoDB running on port 27017
- [ ] Flask server running on port 5001
- [ ] Express server running on port 5000
- [ ] Frontend loads at http://localhost:5000
- [ ] Can create user account
- [ ] Can login
- [ ] Can submit transaction prediction
- [ ] Can view dashboard
- [ ] Can export CSV
- [ ] Real-time updates working

### 11.2 Test Prediction Flow

1. **Create Account:**
   - Email: test@example.com
   - Password: Test123!

2. **Login** with credentials

3. **Submit Transaction:**
   - Amount: 5000
   - Location: moscow
   - Device: atm
   - Time: Current time

4. **Expected Result:**
   - Fraud Detected ⚠️
   - Probability: ~87%

5. **View Dashboard:**
   - See transaction in table
   - Check statistics updated
   - Verify real-time notification

---

## Part 12: Next Steps

### After Setup
1. Explore the codebase
2. Customize fraud scoring algorithm (app.py)
3. Add more fraud indicators
4. Implement rate limiting
5. Set up logging/monitoring
6. Deploy to production

### Useful Resources
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Setup Complete!** 🎉 Your fraud detection system is ready to use.

### Python Server
```bash
python app.py                          # Start Flask server
```

---

## Part 11: Complete Startup Sequence

### Terminal 1 - Start MongoDB (if not running as service)
```bash
net start MongoDB
```

If you installed MongoDB manually instead of as a service, use `mongod` or the full path to `mongod.exe`.

### Terminal 2 - Start Flask ML Server
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Terminal 3 - Start Node.js Express Server
```bash
cd backend
npm install
npm run dev
```

### Step 4 - Access Application
Open browser and navigate to:
```
http://localhost:5000
```

---

## Errors Fixed

✅ **index.html (Line 128)**: Added title attribute to device select element
✅ **index.html (Line 137)**: Added placeholder to datetime-local input
✅ **styles.css (Lines 92, 467)**: Added `-webkit-backdrop-filter` for Safari compatibility

All accessibility and browser compatibility issues have been resolved!

---

## Support

For issues or questions:
1. Check MongoDB connection
2. Verify all environment variables are set
3. Ensure all ports (5000, 5001, 27017) are available
4. Check browser console for frontend errors
5. Review server logs for backend errors
