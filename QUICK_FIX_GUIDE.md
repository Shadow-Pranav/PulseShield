# Quick Fix Guide - Connection & Dropdown Issues

**Solve both issues in 5 minutes**

---

## 🔴 Issue #1: Connection Refused 127.0.0.1:5001

### ⚡ Quick Fix (Do This First!)

**Terminal 1:**

```bash
# STOP Flask if running
Ctrl+C

# Reinstall Python packages (IMPORTANT - you added new ones!)
pip install -r requirements.txt

# Start Flask again
python app.py
```

**Wait for this output:**
```
Loading ML model files...
✅ Model loaded from d:\Project\fraud_model.pkl
✅ Columns loaded from d:\Project\columns.pkl
✅ Encoders loaded from d:\Project\encoders.pkl
 * Running on http://127.0.0.1:5001
```

### ✅ Verify It Works

Go to browser and refresh: `http://localhost:5000`

Should **NOT** show connection error anymore.

---

## 🟡 Issue #2: Device Type Dropdown Missing Options

### ⚡ Quick Fix

**Browser:**

```
Press: Ctrl+Shift+Delete
```

Select:
- ✅ Cookies and other site data
- ✅ Cached images and files

Click: **Delete now**

Then:
1. Close browser completely
2. Open fresh browser
3. Go to: http://localhost:5000
4. Try Device Type dropdown again

**Should see all 4 options:**
- Mobile ✅
- Desktop ✅
- Tablet ✅
- ATM ✅

---

## 📋 Why These Issues Happened

### Issue #1 Reason
You added 3 new Python packages for ML model:
- pandas
- numpy
- scikit-learn

Flask won't start without them. Need to install with `pip install -r requirements.txt`

### Issue #2 Reason
Browser cached old version of page. Hard refresh clears cache and loads fresh HTML with all 4 device options.

---

## ✅ Complete Checklist

- [ ] Terminal 1: Ran `pip install -r requirements.txt`
- [ ] Terminal 1: Shows "Running on http://127.0.0.1:5001"
- [ ] Closed and reopened browser
- [ ] Did Ctrl+Shift+Delete (cleared cache)
- [ ] Refreshed http://localhost:5000
- [ ] Device Type dropdown shows 4 options
- [ ] No "Connection Refused" error

---

## 🆘 Still Not Working?

### If Flask Still Shows Error After pip install

**Copy exact error message and check:**

1. Are all dependencies installed?
   ```bash
   pip list | findstr pandas numpy scikit-learn
   ```
   Should show: pandas, numpy, scikit-learn

2. Is venv activated?
   ```
   Should show (venv) at start of prompt
   ```

3. Try installing again:
   ```bash
   pip install --upgrade -r requirements.txt
   ```

### If Dropdown Still Shows Only "Mobile"

1. Try different browser (Chrome/Firefox)
2. Open browser DevTools: **F12**
3. Go to **Console** tab
4. Any error messages?
5. Right-click inspect the dropdown, check if HTML has all options

---

## 📝 Remember

Both issues have clear solutions:
- **Connection error** → Reinstall dependencies
- **Dropdown missing options** → Clear browser cache

Do the quick fixes above and you're done! ✅

---

**Need help?** Check ERRORS_AND_SOLUTIONS.md for detailed troubleshooting
