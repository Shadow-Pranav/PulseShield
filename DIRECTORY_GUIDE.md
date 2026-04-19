# Directory Guide - Where to Run Everything

**Complete path reference for all commands in each terminal**

---

## Project Structure

```
D:\E_Commerce/                    ← ROOT DIRECTORY
├── app.py                        ← Flask file
├── requirements.txt              ← Python packages
├── QUICK_START.md
├── SETUP_GUIDE.md
├── TROUBLESHOOTING.md
├── DIRECTORY_GUIDE.md            ← This file
│
├── backend/                       ← EXPRESS DIRECTORY
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── storage/                  ← NEW: In-memory storage
│       ├── users.js
│       └── transactions.js
│
└── frontend/                      ← FRONTEND DIRECTORY
    ├── index.html
    ├── dashboard.html
    ├── script.js
    └── styles.css
```

---

## Terminal 1: Flask ML Server

### Starting Directory
```
D:\E_Commerce
```

### Commands (in order)

```bash
# STEP 1: Make sure you're in root
cd D:\E_Commerce
# OR if already there, just check:
pwd
# Should show: D:\E_Commerce

# STEP 2: Create virtual environment
python -m venv venv

# STEP 3: Activate virtual environment
venv\Scripts\activate
# You should see (venv) at start of prompt

# STEP 4: Install packages
pip install -r requirements.txt

# STEP 5: Start Flask server
python app.py
```

### Expected Output
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
 * Press CTRL+C to quit
```

### Keep This Terminal Open! ✅

---

## Terminal 2: Express API Server

### Starting Directory
```
D:\E_Commerce\backend
```

### Commands (in order)

```bash
# STEP 1: Navigate to backend directory
cd D:\E_Commerce\backend
# Verify location with:
pwd
# Should show: D:\E_Commerce\backend

# STEP 2: Install Node dependencies (first time only)
npm install
# This takes 2-5 minutes

# STEP 3: Start Express server
npm run dev
```

### Expected Output
```
Server running on http://localhost:5000
MongoDB connected
```

### Keep This Terminal Open! ✅

---

## Summary: Which Directory for What?

| Terminal | Directory | Commands |
|----------|-----------|----------|
| **1** | `D:\E_Commerce` | `python -m venv venv` + `pip install` + `python app.py` |
| **2** | `D:\E_Commerce\backend` | `npm install` + `npm run dev` |

---

## Step-by-Step Visual Guide

### ✅ TERMINAL 1 (Flask)

```
D:\E_Commerce> python -m venv venv
↓
D:\E_Commerce> venv\Scripts\activate
↓
(venv) D:\E_Commerce> pip install -r requirements.txt
↓
(venv) D:\E_Commerce> python app.py
↓
Running on http://127.0.0.1:5001
↓
KEEP THIS TERMINAL OPEN
```

### ✅ TERMINAL 2 (Express)

```
D:\E_Commerce> cd backend
↓
D:\E_Commerce\backend> npm install
↓
(npm packages installing...)
↓
D:\E_Commerce\backend> npm run dev
↓
Server running on http://localhost:5000
MongoDB connected
↓
KEEP THIS TERMINAL OPEN
```

---

## Important Notes

### 1. Current Working Directory Matters!

**WRONG:**
```bash
D:\E_Commerce> python app.py
# But you're in D:\E_Commerce\backend
# Result: FILE NOT FOUND ERROR
```

**RIGHT:**
```bash
D:\E_Commerce> python app.py
# You're in D:\E_Commerce
# Result: ✅ WORKS
```

### 2. Always Check Your Prompt!

**Flask Terminal should show:**
```
(venv) D:\E_Commerce>
           ↑ Virtual environment active
                        ↑ Correct directory
```

**Express Terminal should show:**
```
D:\E_Commerce\backend>
↑ backend directory
```

### 3. Files are Already There!

You don't need to create:
- ❌ `app.py` - Already exists
- ❌ `requirements.txt` - Already exists
- ❌ `server.js` - Already exists
- ❌ `package.json` - Already exists

Just run the commands!

---

## Quick Copy-Paste Guide

### Flask (Terminal 1)
```bash
cd D:\E_Commerce
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Express (Terminal 2)
```bash
cd D:\E_Commerce\backend
npm install
npm run dev
```

---

## Verification: Both Servers Running?

Once both terminals are running:

### Terminal 1 Status
```
✅ Flask running
Shows: "Running on http://127.0.0.1:5001"
```

### Terminal 2 Status
```
✅ Express running
Shows: "Server running on http://localhost:5000"
```

### Open Browser
```
http://localhost:5000
```

Should show the PulseShield application! 🎉

---

## Troubleshooting Directory Issues

### Issue: "File not found"

**Check your current directory:**
```bash
pwd
# Shows current location
```

**Make sure you're in right place:**
```bash
# For Flask: Must be D:\E_Commerce
cd D:\E_Commerce

# For Express: Must be D:\E_Commerce\backend
cd D:\E_Commerce\backend
```

### Issue: "Module not found" (Python)

**Flask must run from root:**
```bash
❌ WRONG: D:\E_Commerce\backend> python app.py
✅ RIGHT: D:\E_Commerce> python app.py
```

### Issue: "Cannot find module" (npm)

**Express must run from backend:**
```bash
❌ WRONG: D:\E_Commerce> npm install
✅ RIGHT: D:\E_Commerce\backend> npm install
```

---

## Directory Tree Reference

```
D:\E_Commerce
├── 📄 app.py                    ← Run: python app.py (FROM D:\E_Commerce)
├── 📄 requirements.txt          ← Install: pip install -r requirements.txt
├── 📁 backend
│   ├── 📄 server.js            ← Run: npm run dev (FROM D:\E_Commerce\backend)
│   └── 📄 package.json         ← Install: npm install (FROM D:\E_Commerce\backend)
└── 📁 frontend
    ├── 📄 index.html
    ├── 📄 dashboard.html
    ├── 📄 script.js
    └── 📄 styles.css
```

---

## Final Checklist

- [ ] Terminal 1: In `D:\E_Commerce` directory
- [ ] Terminal 1: Run `python -m venv venv`
- [ ] Terminal 1: Run `venv\Scripts\activate`
- [ ] Terminal 1: Run `pip install -r requirements.txt`
- [ ] Terminal 1: Run `python app.py` → Shows port 5001
- [ ] Terminal 2: In `D:\E_Commerce\backend` directory
- [ ] Terminal 2: Run `npm install`
- [ ] Terminal 2: Run `npm run dev` → Shows port 5000
- [ ] Open browser to `http://localhost:5000`

---

**All set! You now know exactly which directory to be in for each command!** ✅
