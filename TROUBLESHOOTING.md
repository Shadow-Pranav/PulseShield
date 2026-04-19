# Comprehensive Troubleshooting Guide

**If you encounter any issues, use this guide to diagnose and fix them.**

---

## Table of Contents
1. Installation Issues
2. Connection Issues
3. Authentication Issues
4. API Issues
5. Database Issues
6. Frontend Issues
7. Performance Issues
8. Port Conflicts

---

## 1. Installation Issues

### Issue: Node.js not found

```
'node' is not recognized as an internal or external command
```

**Causes:**
- Node.js not installed
- Node.js path not in system PATH
- Terminal not restarted after installation

**Solutions:**

1. **Verify Installation:**
   ```bash
   node --version
   npm --version
   ```

2. **Reinstall Node.js:**
   - Windows: Download from https://nodejs.org/
   - macOS: `brew install node`
   - Linux: `sudo apt install nodejs npm`

3. **Restart Terminal:**
   - Close all terminal windows
   - Open new terminal window
   - Try again

4. **Check PATH (Windows):**
   - Right-click "This PC" → Properties
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Verify Node.js path is in PATH variable

### Issue: Python not found

```
'python' is not recognized as an internal or external command
```

**Solutions:**

1. **Verify Installation:**
   ```bash
   python --version
   pip --version
   ```

2. **Use python3 (macOS/Linux):**
   ```bash
   python3 --version
   pip3 --version
   ```

3. **Reinstall Python:**
   - Windows: Download from https://python.org/
   - **IMPORTANT:** Check "Add Python to PATH" during installation
   - macOS: `brew install python@3.10`
   - Linux: `sudo apt install python3 python3-pip`

4. **Windows Specific:**
   - Add Python to PATH manually
   - Search "Environment Variables"
   - Add Python installation folder to PATH

### Issue: npm install fails

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Use legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   rm -r node_modules package-lock.json
   npm install
   ```

4. **Use different Node version:**
   ```bash
   node --version  # Check current
   nvm install 18  # Install newer version
   nvm use 18      # Switch to newer
   npm install
   ```

### Issue: pip install fails

```
ERROR: Could not install packages due to an EnvironmentError
```

**Solutions:**

1. **Upgrade pip:**
   ```bash
   python -m pip install --upgrade pip
   ```

2. **Use --user flag:**
   ```bash
   pip install --user -r requirements.txt
   ```

3. **Clear pip cache:**
   ```bash
   pip cache purge
   pip install -r requirements.txt
   ```

4. **Install packages individually:**
   ```bash
   pip install Flask==3.1.0
   pip install Flask-Cors==5.0.0
   ```

---

## 2. Connection Issues

s### Important: MongoDB is Not Required

⚠️ **This system NO LONGER uses MongoDB!** Data is stored in RAM (in-memory).

If you see MongoDB-related errors, **ignore them** – they're from the old setup. The application now uses in-memory storage automatically.

### Issue: Flask API Connection Refused

```
Error: Failed to connect to Flask API
axios: Request failed with status code 502
```

**Causes:**
- Flask server not running
- Flask using wrong port
- Flask crashed
- Network issue between servers

**Solutions:**

1. **Verify Flask is running:**
   ```bash
   # In Flask terminal, look for:
   # "Running on http://127.0.0.1:5001"
   ```

2. **Check Flask port:**
   ```bash
   # Windows
   netstat -ano | findstr :5001
   
   # macOS/Linux
   lsof -i :5001
   ```

3. **Check Flask logs:**
   - Look at Flask terminal for error messages
   - Common: "Module not found", "Syntax error", "Port in use"

4. **Verify .env file:**
   ```bash
   cat backend/.env
   # Should show:
   # FLASK_API_URL=http://127.0.0.1:5001/predict
   ```

5. **Test Flask directly:**
   ```bash
   curl -X POST http://127.0.0.1:5001/predict \
     -H "Content-Type: application/json" \
     -d '{
       "userId": "test",
       "amount": 100,
       "location": "newyork",
       "device": "mobile",
       "time": "2024-04-18T10:30:00"
     }'
   ```

6. **Restart Flask:**
   - Go to Flask terminal
   - Press Ctrl+C to stop
   - Run `python app.py` again

### Issue: Express Server Port In Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Causes:**
- Express already running
- Another application using port 5000
- Previous Express process didn't fully stop

**Solutions:**

1. **Find process using port 5000:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   tasklist | findstr <PID>
   
   # macOS/Linux
   lsof -i :5000
   ```

2. **Kill process:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # macOS/Linux
   kill -9 <PID>
   ```

3. **Use different port:**
   ```bash
   # Edit backend/.env
   PORT=5002
   
   # Restart Express
   npm run dev
   ```

4. **Close other applications:**
   - VS Code Server
   - Local development servers
   - Docker containers

---

## 3. Authentication Issues

### Issue: JWT Token Errors

```
Error: Invalid authentication token
JsonWebTokenError: jwt malformed
```

**Causes:**
- Token expired (7 days)
- JWT_SECRET mismatch
- Token corrupted
- Token not sent in header

**Solutions:**

1. **Verify JWT_SECRET:**
   ```bash
   # backend/.env should contain:
   JWT_SECRET=dev_secret_key
   
   # If empty or missing, add it
   ```

2. **Login again to get new token:**
   - Token expires after 7 days
   - User must logout and login

3. **Clear browser storage:**
   ```javascript
   // In browser console:
   localStorage.removeItem('pulse-token');
   localStorage.removeItem('pulse-user');
   location.reload();
   ```

4. **Verify token format:**
   - Token should be sent as: `Authorization: Bearer <token>`
   - Check Network tab in browser DevTools

### Issue: Cannot Create Account

```
Error: User already exists
Error: Email already in use
```

**Causes:**
- User email already registered in memory
- Trying to register duplicate email

**Solutions:**

1. **Use different email:**
   ```
   test@example.com → test2@example.com
   ```

2. **Clear all user data (restart server):**
   ```bash
   # In Terminal 2
   Ctrl+C (stop Express)
   npm run dev (restart Express)
   # All users cleared from memory - can register same email again
   ```

3. **Check existing users (only via browser):**
   - View registered accounts by checking login functionality
   - No database console available

### Issue: Cannot Login

```
Error: Invalid email or password
Error: Email not found
```

**Causes:**
- Email doesn't exist in memory
- Password incorrect
- Account was lost (server restarted)

**Solutions:**

1. **Create new account:**
   - If email not found, account doesn't exist
   - Click "Create Account" and register with email

2. **Check password:**
   - Passwords are case-sensitive
   - No spaces before/after

3. **If server was restarted:**
   - All accounts were cleared from memory
   - Create account again with same email

4. **Verify Express is running:**
   - Ensure Terminal 2 shows "Server running on http://localhost:5000"
   - Check browser console for errors (F12)

---

## 4. API Issues

### Issue: 400 Bad Request

```
Error: Missing fields: userId, amount, location, device, time
```

**Causes:**
- Missing required fields in request
- Wrong field names
- Empty values

**Solutions:**

1. **Check request body:**
   ```javascript
   // Must include ALL fields:
   {
     "userId": "user123",
     "amount": 5000,
     "location": "moscow",
     "device": "atm",
     "time": "2024-04-18T23:30:00"
   }
   ```

2. **Verify field types:**
   - `userId`: String
   - `amount`: Number
   - `location`: String
   - `device`: String
   - `time`: ISO datetime string

3. **Check browser form:**
   - Don't leave fields empty
   - Verify all fields have values

### Issue: 502 Bad Gateway

```
Error: ML API error: Prediction service unavailable
```

**Causes:**
- Flask server not running
- Flask crashed
- Wrong FLASK_API_URL in .env

**Solutions:**

1. **Check Flask is running:**
   ```
   Should see: "Running on http://127.0.0.1:5001"
   ```

2. **Verify FLASK_API_URL in .env:**
   ```env
   FLASK_API_URL=http://127.0.0.1:5001/predict
   ```

3. **Test Flask endpoint:**
   ```bash
   curl http://127.0.0.1:5001/predict
   ```

4. **Restart Flask:**
   - Ctrl+C in Flask terminal
   - Run `python app.py` again

### Issue: CORS Error

```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Causes:**
- Frontend and backend on different origins
- CORS not properly configured
- Browser security policy

**Solutions:**

1. **Ensure same origin:**
   - Frontend: `http://localhost:5000`
   - Backend: `http://localhost:5000`
   - ML: `http://127.0.0.1:5001`

2. **Check CORS configuration:**
   - Backend should have: `cors()` enabled
   - See server.js for CORS setup

3. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cache and cookies
   - Reload page

---

## 5. Database Issues

### Important: In-Memory Storage (No Database)

This system stores data in **RAM only**. Understand:
- ✅ Data persists while Express server is running
- ❌ Data is **LOST** when Express server restarts
- ❌ Data is **LOST** when computer reboots
- ✅ Perfect for development/testing
- ❌ NOT suitable for production

**This is intentional!** See MONGODB_REMOVAL_GUIDE.md to re-enable persistent MongoDB.

### Issue: Transactions Not Saving

```
Error: No transactions displayed
Dashboard shows 0 transactions
```

**Causes:**
- Prediction failed before saving
- Express server crashed
- Browser cache issue

**Solutions:**

1. **Verify Express is running:**
   ```
   Check Terminal 2: "Server running on http://localhost:5000"
   ```

2. **Submit transaction again:**
   - Ensure Flask (Terminal 1) is running
   - Ensure Express (Terminal 2) is running
   - Check browser console for errors (F12)

3. **Clear browser cache:**
   - Press F12
   - Right-click refresh → Empty cache and hard reload
   - Submit transaction again

4. **Restart servers (will lose all data):**
   ```bash
   # Terminal 1: Ctrl+C to stop Flask
   # Terminal 2: Ctrl+C to stop Express
   # Restart both terminals
   # Data will be fresh
   ```

### Issue: Express Server Crashed

```
Error: Cannot connect to http://localhost:5000
Page cannot be reached
```

**Causes:**
- Express crashed
- Port 5000 already in use
- Authentication middleware error

**Solutions:**

1. **Restart Express:**
   ```bash
   # In Terminal 2
   Ctrl+C (to stop)
   npm run dev (to restart)
   ```

2. **Check for port conflicts:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # macOS/Linux
   lsof -i :5000
   ```
   Kill any process using port 5000 and restart

3. **Check browser console:**
   - Press F12
   - Look for error messages
   - Report error to developer

3. **Repair database:**
   ```bash
   mongosh admin
   db.repairDatabase()
   ```

4. **Reset database:**
   ```bash
   mongosh
   use fraud_detection
   db.dropDatabase()
   exit
   ```

---

## 6. Frontend Issues

### Issue: Page Doesn't Load

```
http://localhost:5000 shows blank page
Error: Cannot GET /
```

**Causes:**
- Express not running
- Port 5000 not listening
- Frontend files missing

**Solutions:**

1. **Verify Express running:**
   ```
   Check Express terminal: "Server running on http://localhost:5000"
   ```

2. **Check port:**
   ```bash
   netstat -ano | findstr :5000
   ```

3. **Check frontend files:**
   ```bash
   ls frontend/
   # Should show: index.html, dashboard.html, script.js, styles.css
   ```

4. **Restart Express:**
   ```bash
   cd backend
   npm run dev
   ```

### Issue: Form Not Working

```
Submit button doesn't work
Form validation errors
```

**Causes:**
- JavaScript errors
- Missing form fields
- Browser console errors

**Solutions:**

1. **Check browser console:**
   - Press F12 or Ctrl+Shift+I
   - Click "Console" tab
   - Look for red error messages

2. **Verify form fields:**
   - All fields must be filled
   - Don't use special characters in username

3. **Clear browser cache:**
   ```
   Ctrl+Shift+Delete
   Clear all cache
   Reload page
   ```

4. **Try different browser:**
   - Chrome/Firefox (most compatible)
   - Safari/Edge (should work)
   - IE (not supported)

### Issue: Theme Toggle Not Working

```
Dark/light theme doesn't change
```

**Causes:**
- JavaScript not loaded
- localStorage disabled
- Browser issue

**Solutions:**

1. **Check JavaScript console:**
   - F12 → Console
   - Look for errors

2. **Enable localStorage:**
   - Check browser settings
   - Ensure cookies/storage enabled

3. **Try incognito mode:**
   ```
   Ctrl+Shift+N (Chrome)
   Ctrl+Shift+P (Firefox)
   Cmd+Shift+N (macOS)
   ```

---

## 7. Performance Issues

### Issue: Slow Response Times

```
API calls take >5 seconds
Dashboard loading slow
```

**Causes:**
- High database load
- Network latency
- JavaScript performance
- Large dataset

**Solutions:**

1. **Check resource usage:**
   ```bash
   # Windows Task Manager
   # macOS Activity Monitor
   # Linux: top
   ```

2. **Limit transaction history:**
   - Edit GET /api/transactions limit parameter
   - Default: 50 transactions

3. **Restart services:**
   ```
   Restart all three services
   ```

4. **Clear old data:**
   ```bash
   mongosh
   use fraud_detection
   db.transactions.deleteMany({})
   ```

### Issue: Real-time Updates Not Working

```
Dashboard doesn't auto-refresh
Socket.io not connected
```

**Causes:**
- WebSocket connection failed
- Socket.io not initialized
- Network blocked

**Solutions:**

1. **Check WebSocket:**
   - Browser DevTools → Network
   - Look for WS (WebSocket) connection

2. **Check Socket.io:**
   - Console should show: "Socket.io connected"

3. **Enable WebSocket:**
   - Some firewalls block WebSocket
   - Try different network

4. **Manual refresh:**
   - Click "Refresh" button on dashboard
   - Or press F5 to reload

---

## 8. Port Conflicts

### Conflicting Ports

| Port | Service | Issue |
|------|---------|-------|
| 5000 | Express | `address already in use` |
| 5001 | Flask | `Address already in use` |

### Solutions

**Windows:**
```bash
# Find PID
netstat -ano | findstr :<port>

# Kill process
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find PID
lsof -i :<port>

# Kill process
kill -9 <PID>
```

**Or use different ports:**
```env
# backend/.env
PORT=5002              # Change from 5000
FLASK_API_URL=http://127.0.0.1:5001/predict
```

---

## 9. Getting Help

### System Info to Report

When asking for help, include:
```bash
node --version
npm --version
python --version
```

### Last Resort: Complete Reset

If nothing works, do a complete restart:

1. **Stop all services:**
   ```bash
   # Terminal 1: Ctrl+C
   # Terminal 2: Ctrl+C
   ```

2. **Clear Python environment:**
   ```bash
   cd D:\E_Commerce
   rm -r venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Clear Node environment:**
   ```bash
   cd D:\E_Commerce\backend
   rm -r node_modules package-lock.json
   npm install
   ```

4. **Restart servers:**
   ```bash
   # Terminal 1
   cd D:\E_Commerce
   venv\Scripts\activate
   python app.py
   
   # Terminal 2
   cd D:\E_Commerce\backend
   npm run dev
   ```

**Note:** All data (users, transactions) will be cleared. This is expected - data is in-memory!
  }'
```

Expected Response:
```json
{
  "fraud": true,
  "probability": 0.87
}
```

### Test Express Health Endpoint
```bash
curl http://localhost:5000/health
```

Expected Response:
```json
{
  "status": "ok",
  "mongoState": 1
}
```

### Test Authentication
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Performance Optimization Tips

### Frontend Optimization
- [ ] Enable gzip compression in Express
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for libraries (already using jsDelivr)
- [ ] Implement lazy loading for transactions table
- [ ] Cache API responses

### Backend Optimization
- [ ] Add database indexes on frequently queried fields
- [ ] Implement caching for stats endpoint
- [ ] Use connection pooling
- [ ] Add rate limiting to prevent abuse

### Database Optimization
```javascript
// Add indexes to MongoDB
db.users.createIndex({ email: 1 }, { unique: true })
db.transactions.createIndex({ userId: 1 })
db.transactions.createIndex({ createdAt: -1 })
db.transactions.createIndex({ prediction: 1 })
```

---

## Security Considerations

### In Development
- Using default JWT secret: "dev_secret"
- MongoDB with no authentication
- CORS enabled for all origins

### For Production
1. Change JWT_SECRET to strong random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Enable MongoDB authentication:
   ```javascript
   MONGO_URI=mongodb://username:password@127.0.0.1:27017/fraud_detection?authSource=admin
   ```

3. Restrict CORS origins:
   ```javascript
   cors({
     origin: process.env.FRONTEND_URL
   })
   ```

4. Use HTTPS/TLS certificates
5. Implement rate limiting
6. Add input validation
7. Use environment variables for sensitive data

---

## Database Maintenance

### View Connected Users
```javascript
db.users.find()
db.users.countDocuments()
```

### View Transactions
```javascript
db.transactions.find().sort({ createdAt: -1 }).limit(10)
db.transactions.countDocuments()
db.transactions.countDocuments({ prediction: true })
```

### Database Size
```javascript
db.stats()
```

### Backup Database
```bash
mongodump --db fraud_detection --out ./backup
```

### Restore Database
```bash
mongorestore --db fraud_detection ./backup/fraud_detection
```

---

## Code Structure Overview

```
E_Commerce/
├── app.py                      # Flask ML server
├── requirements.txt            # Python dependencies
├── backend/
│   ├── server.js              # Express main server
│   ├── package.json           # Node dependencies
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # User auth logic
│   │   └── transactionController.js # Fraud detection
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Transaction.js     # Transaction schema
│   └── routes/
│       ├── authRoutes.js      # Auth endpoints
│       └── transactionRoutes.js # Transaction endpoints
└── frontend/
    ├── index.html             # Main page
    ├── dashboard.html         # Analytics dashboard
    ├── script.js              # Frontend logic
    └── styles.css             # Styling
```

---

## Environment Variables Reference

### Backend (backend/.env)
```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/fraud_detection

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=dev_secret_key

# External APIs
FLASK_API_URL=http://127.0.0.1:5001/predict
```

### Frontend (served by Express)
```javascript
const API_BASE_URL = `${window.location.origin}/api`;
const SOCKET_URL = window.location.origin;
```

---

## Common Development Tasks

### Add New API Endpoint
1. Create controller function in `controllers/`
2. Add route in `routes/`
3. Mount route in `server.js`
4. Test with curl or Postman
5. Add frontend integration in `script.js`

### Add New Database Field
1. Update schema in `models/`
2. Update controller to handle new field
3. Create database migration
4. Update frontend form

### Add New Frontend Feature
1. Create HTML elements in `.html` file
2. Add JavaScript logic in `script.js`
3. Add CSS styling in `styles.css`
4. Test in both light and dark themes

---

## Testing Scenarios

### Test Case 1: High-Risk Transaction
```json
{
  "userId": "test_user",
  "amount": 7000,
  "location": "moscow",
  "device": "atm",
  "time": "2024-04-18T23:30:00"
}
```
Expected: Fraud detected (probability > 0.6)

### Test Case 2: Safe Transaction
```json
{
  "userId": "test_user",
  "amount": 100,
  "location": "new york",
  "device": "mobile",
  "time": "2024-04-18T14:30:00"
}
```
Expected: Safe transaction (probability < 0.6)

### Test Case 3: Missing Fields
```json
{
  "userId": "test_user",
  "amount": 500
}
```
Expected: 400 Bad Request - Missing required fields

---

## Version Information
- Node.js: v18+ recommended
- Python: 3.8+ required
- MongoDB: 4.0+ recommended
- Express: 4.21.2
- Flask: 3.1.0
- React: Not used (vanilla JS)

---

## Support Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated:** April 18, 2024
