# Quick Start Guide - PulseShield Fraud Detection

**Get your fraud detection system running in 10 minutes! (No Database Required)**

---

## Prerequisites Check

Before you start, verify you have installed:

```bash
# Check Node.js
node --version          # Should be v16.0.0+

# Check npm
npm --version           # Should be v8.0.0+

# Check Python
python --version        # Should be 3.8+
```

If any are missing, follow the installation guide in SETUP_GUIDE.md

**📝 Note:** MongoDB is NO LONGER REQUIRED! This version uses in-memory storage.

---

## Step 1: Start Flask ML Server (Terminal 1)

Flask is the Python machine learning engine that scores transactions for fraud.

### Windows

```bash
cd d:\E_Commerce

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt

# Start Flask server
python app.py
```

### macOS/Linux

```bash
cd ~/E_Commerce

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt

# Start Flask server
python app.py
```

**Expected output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
 * Press CTRL+C to quit
```

**Keep this terminal open!** ✅

**Port:** 5001

---

## Step 2: Start Express API Server (Terminal 2)

Express is the main API server and serves the web frontend.

### All Platforms

```bash
cd d:\E_Commerce\backend

# Install Node dependencies (first time only)
npm install

# Start Express server (development mode)
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
```

**Keep this terminal open!** ✅

**Port:** 5000

---

## Step 3: Open Application in Browser

### Open Browser

Navigate to:
```
http://localhost:5000
```

You should see:
- **PulseShield** header
- Theme toggle button
- Sign up / Login form
- Transaction prediction form
- Link to Dashboard

---

## Step 4: Create Your Account

### Sign Up

1. Click "Switch to Signup" (if on login page)
2. Fill in the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** Test123!

3. Click "Create Account"

**Expected:** "Account created successfully" message

Your JWT token is now saved to browser storage.

---

## Step 5: Submit a Test Transaction

### Fill Prediction Form

1. **Amount:** 5000
2. **Location:** moscow
3. **Device:** atm
4. **Time:** (auto-filled with current time)

Click "Predict Fraud"

### Expected Result

```
FRAUD DETECTED ⚠️
Probability: 87%
Recommendation: Escalate for manual review and block fulfillment.
```

The transaction is now saved to in-memory storage and broadcasted to all connected dashboards!

---

## Step 6: View Dashboard

### Open Dashboard

1. Click "Dashboard" button in header
2. OR navigate to: `http://localhost:5000/dashboard.html`

### What You'll See

**Metric Cards:**
- Total transactions: 1
- Fraud detected: 1
- Safe transactions: 0
- Average risk: 87%

**Transactions Table:**
- Shows your submitted transaction
- Displays amount, location, device, probability, status

**Probability Chart:**
- Line chart showing fraud probability over time
- Live updates as new transactions come in

---

## Step 7: Test Different Scenarios

### Safe Transaction

```
Amount: 100
Location: new york
Device: mobile
Time: current (afternoon)
```

**Expected:** Safe Transaction (probability < 40%)

### Medium Risk

```
Amount: 2000
Location: london
Device: desktop
Time: current (morning)
```

**Expected:** Safe Transaction (probability 30-50%)

### High Risk (Late Night)

```
Amount: 3000
Location: bucharest
Device: tablet
Time: 11:30 PM
```

**Expected:** Fraud Detected (probability > 60%)

---

## Step 8: Export Data

### Export as CSV

1. Go to Dashboard
2. Click "Export CSV" button
3. File `transactions.csv` downloads

**CSV Format:**
```
userId,amount,location,device,time,probability,prediction
user123,5000,moscow,atm,2024-04-18T23:30:00Z,0.87,true
```

---

## Common Issues & Quick Fixes

### ❌ "Page cannot connect"

**Solution:**
1. Check both servers are running:
   - Terminal 1: Flask on port 5001
   - Terminal 2: Express on port 5000
2. Verify no errors in terminal output
3. Try `http://localhost:5000` in browser

### ❌ "Flask server not responding"

**Solution:**
1. Check Flask terminal is running
2. Verify port 5001 is available
3. Restart Flask server (Ctrl+C, then `python app.py`)

### ❌ "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it
taskkill /PID <PID> /F

# Restart Express
npm run dev
```

### ❌ "Cannot login / Cannot create account"

**Solution:**
1. Verify .env file exists in `backend/` directory
2. Check JWT_SECRET is set in .env
3. Restart Express server (Ctrl+C, then `npm run dev`)
4. Try in incognito mode (Ctrl+Shift+N)

### ❌ "No data in dashboard"

**Solution:**
1. Make sure you're logged in (check for username in top right)
2. Submit at least one transaction prediction
3. Refresh dashboard page (F5)
4. Check browser console for errors (F12)

---

## Environment File Check

### Verify .env Exists

**Windows:**
```bash
cd d:\E_Commerce\backend
dir /a | findstr ".env"
```

**macOS/Linux:**
```bash
cd ~/E_Commerce/backend
ls -la | grep .env
```

If missing, create `backend/.env`:

```env
PORT=5000
JWT_SECRET=dev_secret_key
FLASK_API_URL=http://127.0.0.1:5001/predict
```

**No MONGO_URI needed!** Data is stored in RAM.

---

## Performance Tips

1. **Enable Dark Theme** - Click theme toggle for better performance
2. **Use Chrome/Firefox** - Fastest browser compatibility
3. **Close Other Apps** - Free up RAM for smooth operation
4. **Check Network** - Ensure stable internet for CDN libraries

---

## Testing Checklist

- [ ] Flask running on 5001 (Terminal 1)
- [ ] Express running on 5000 (Terminal 2)
- [ ] Can load http://localhost:5000
- [ ] Can create account
- [ ] Can login
- [ ] Can submit transaction
- [ ] Fraud detection works
- [ ] Can view dashboard
- [ ] Can export CSV
- [ ] Real-time updates work (Socket.io)

---

## What's Next?

### Explore Features
- ✅ Try different transaction amounts
- ✅ Test various locations (moscow, lagos, etc.)
- ✅ Test different devices (atm, tablet, mobile, desktop)
- ✅ Submit transactions at different times

### Customize
- Edit fraud scoring in `app.py`
- Add more locations to HIGH_RISK_LOCATIONS
- Modify probability thresholds
- Customize styling in `styles.css`

### Deploy
- Set up on production server
- Use MongoDB Atlas for cloud database
- Configure HTTPS/SSL
- Set up monitoring and logging

---

## Need Help?

Refer to the detailed guides:
- **SETUP_GUIDE.md** - Comprehensive setup instructions
- **TROUBLESHOOTING.md** - Detailed troubleshooting guide
- **README.md** - Project overview

---

**🎉 You're all set! Enjoy using PulseShield!**

## Common Commands

### Stop Servers
```bash
# Kill Flask (Ctrl+C)
# Kill Express (Ctrl+C)
# Kill MongoDB (Ctrl+C)
```

### Restart Services
```bash
# Option 1: Restart all terminals
# Option 2: Kill processes and restart
```

### View Logs
```bash
# Express logs: Check Terminal 2
# Flask logs: Check Terminal 1
# MongoDB logs: Check Terminal 3
```

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or kill process using port |
| MongoDB not connecting | Ensure MongoDB is running (`net start MongoDB` or `sc query MongoDB`) |
| CORS errors | Check Flask/Express CORS configuration |
| JWT expired | User must login again |
| 502 Bad Gateway | Flask ML server not running |
| Blank dashboard | Ensure user is authenticated |

## Database Reset (if needed)
```bash
# Connect to MongoDB
mongosh

# Switch to fraud_detection database
use fraud_detection

# Delete collections
db.users.deleteMany({})
db.transactions.deleteMany({})

# Exit
exit
```

---

**Setup Completed!** 🎉 Your fraud detection system is ready to use.
