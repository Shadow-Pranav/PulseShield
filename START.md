# 🚀 START HERE - PulseShield Quick Reference

**Everything you need to start the fraud detection system in 2 terminals**

---

## ✅ Prerequisites (Do This First!)

Verify you have these installed:

```bash
node --version          # Should show v16.0.0 or higher
npm --version           # Should show v8.0.0 or higher
python --version        # Should show 3.8 or higher
```

If any are missing, follow SETUP_GUIDE.md

**Note:** MongoDB is NOT needed! ✅

---

## 📂 Project Structure

```
D:\E_Commerce/
├── app.py                  ← Flask ML engine
├── requirements.txt        ← Python packages
│
├── backend/                ← Express API
│   ├── server.js
│   ├── package.json
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── storage/           ← In-memory data storage
│
└── frontend/               ← Web interface
    ├── index.html
    ├── dashboard.html
    ├── script.js
    └── styles.css
```

---

## 🎯 Setup Instructions (5 Minutes)

### Terminal 1: Flask ML Server

Open your first terminal and run these commands:

```bash
cd d:\E_Commerce
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**You should see:**
```
Running on http://127.0.0.1:5001
```

✅ **Keep this terminal open!**

---

### Terminal 2: Express API Server

Open your second terminal and run these commands:

```bash
cd d:\E_Commerce\backend
npm install
npm run dev
```

**You should see:**
```
Server running on http://localhost:5000
```

✅ **Keep this terminal open!**

---

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:5000
```

You should see the PulseShield login page!

---

## 🧪 Quick Test (2 Minutes)

### 1. Create Account
- Click "Switch to Signup"
- Fill in: Name, Email, Password
- Click "Create Account"

### 2. Submit Transaction
1. Amount: 5000
2. Location: moscow
3. Device: atm
4. Click "Predict Fraud"

### 3. View Dashboard
- Click "Dashboard"
- See transactions and fraud predictions

---

## ❓ Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Page won't load | Check both terminals are running and showing correct ports |
| Can't create account | Email already registered - use different email |
| No predictions showing | Make sure Flask Terminal 1 is running |
| Port already in use | Kill process and restart (see TROUBLESHOOTING.md) |
| Data disappeared | Restarted server - data is in RAM (restart both to clear) |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **QUICK_START.md** | Step-by-step setup with details |
| **SETUP_GUIDE.md** | Complete installation & configuration guide |
| **TROUBLESHOOTING.md** | Detailed solutions for all common issues |
| **DIRECTORY_GUIDE.md** | Which directory for each command |
| **CHANGES_SUMMARY.md** | What changed from MongoDB removal |
| **MONGODB_REMOVAL_GUIDE.md** | How to re-enable MongoDB if needed |

---

## 🔑 Key Files to Know

### Configuration
- `backend/.env` - Server settings (create if missing)

### Python (Terminal 1)
- `app.py` - Flask fraud detection engine
- `requirements.txt` - Python packages

### Node (Terminal 2)
- `backend/server.js` - Express API server
- `backend/package.json` - Node packages
- `backend/storage/` - In-memory data storage

### Frontend
- `frontend/index.html` - Login & prediction form
- `frontend/dashboard.html` - Analytics dashboard
- `frontend/script.js` - Frontend logic

---

## 💾 Data Storage

⚠️ **Important to know:**

- Data is stored in **RAM only**
- Data is **LOST** when servers restart
- Perfect for **development/testing**
- NOT suitable for **production**

To use MongoDB:
1. Install MongoDB
2. See **MONGODB_REMOVAL_GUIDE.md**
3. Uncomment MongoDB code

---

## 🎓 How It Works

1. **User submits transaction** via browser form
2. **Express server receives** the prediction request
3. **Flask ML engine scores** the transaction (fraud probability)
4. **Express saves** transaction to RAM
5. **WebSocket broadcasts** update to dashboard
6. **Browser shows** fraud alert or safe transaction

---

## 🔧 Development Commands

```bash
# Terminal 1 (Flask)
python app.py           # Start Flask
Ctrl+C                  # Stop Flask

# Terminal 2 (Express)
npm run dev             # Start with auto-reload
npm start               # Start production mode
npm install             # Install dependencies
Ctrl+C                  # Stop Express
```

---

## 🆘 Still Need Help?

1. Check **TROUBLESHOOTING.md** (comprehensive guide)
2. Check **QUICK_START.md** (detailed setup)
3. Check **SETUP_GUIDE.md** (full installation guide)
4. Verify both terminals are running with correct output

---

## ✨ What's Next?

- ✅ Try different transaction scenarios
- ✅ Test fraud detection with various inputs
- ✅ Export transaction data as CSV
- ✅ Check dark/light theme toggle
- ✅ Review dashboard analytics

---

## 📋 Checklist

- [ ] Both terminals running (Flask & Express)
- [ ] Flask shows port 5001 ✅
- [ ] Express shows port 5000 ✅
- [ ] Browser loads http://localhost:5000 ✅
- [ ] Can create account ✅
- [ ] Can login ✅
- [ ] Can submit transaction ✅
- [ ] Fraud detection works ✅
- [ ] Dashboard loads ✅
- [ ] Can export CSV ✅

---

**Ready to start?** Go to Terminal 1 and run: `cd d:\E_Commerce && python -m venv venv`

Good luck! 🚀
