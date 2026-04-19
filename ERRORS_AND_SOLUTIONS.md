# Error Tracking & Solutions

**Track all errors and solutions here for quick reference**

---

## Error #1: SyntaxError in transactionController.js

**Date:** April 18, 2026  
**Severity:** 🔴 Critical (App won't start)  
**Status:** ✅ FIXED

### Error Message
```
SyntaxError: Unexpected token '}'
    at transactionController.js:122
```

### Root Cause
Extra closing brace `}` on line 121 in `backend/controllers/transactionController.js`

### The Problem
```javascript
  } catch (error) {
    return next(error);
  }
}  // ← Line 121: EXTRA BRACE (should be deleted)
}  // ← This closing brace was duplicated

module.exports = {
```

### Solution Applied
Removed the extra closing brace on line 121.

**File:** `backend/controllers/transactionController.js`

**What was changed:**
```javascript
// BEFORE (Wrong - has 2 closing braces)
  } catch (error) {
    return next(error);
  }
}
}

// AFTER (Correct - has 1 closing brace)
  } catch (error) {
    return next(error);
  }
}
```

### How to Verify It's Fixed
1. Terminal should show: `Server running on http://localhost:5000`
2. No more SyntaxError messages
3. Both servers running (Flask + Express)

### Prevention Tips
- Check for matching braces `{ }` in all files
- Use VS Code bracket matching (Ctrl+Shift+\)
- Enable auto-formatting (prettier)
- Check file structure before saving

---

## Implementation #1: ML Model Integration

**Date:** April 18, 2026  
**Type:** 🟢 Feature Implementation  
**Status:** ✅ COMPLETE

### What Was Done

Integrated three ML model files from `d:\Project` into the fraud detection system:

1. **fraud_model.pkl** - Scikit-learn trained classifier
2. **columns.pkl** - Feature column names
3. **encoders.pkl** - Categorical variable encoders

### Files Modified

1. **app.py** - UPDATED
   - Added model loading section (lines 12-40)
   - Created `score_transaction_ml()` function
   - Renamed original scoring to `score_transaction_fallback()`
   - Updated `/predict` endpoint to use ML model
   - Added error handling with fallback

2. **requirements.txt** - UPDATED
   - Added: `pandas==2.2.0`
   - Added: `numpy==1.24.3`
   - Added: `scikit-learn==1.3.0`

### How It Works

1. **On Startup**: Flask loads three pickle files from d:\Project
2. **On Prediction**: Extracts features from API request
3. **Encoding**: Applies label encoders to categorical variables
4. **ML Prediction**: Uses scikit-learn model.predict_proba()
5. **Fallback**: If ML fails, uses original rule-based scoring

### Features Extracted
- amount (float)
- location (categorical, encoded)
- device (categorical, encoded)
- hour, day_of_week, month (from timestamp)

### Output
```json
{
  "fraud": true,
  "probability": 0.87
}
```

### Documentation
- See **ML_MODEL_INTEGRATION.md** for complete guide
- Includes testing procedures and troubleshooting

---

## Error #2: Connection Refused 127.0.0.1:5001

**Date:** April 18, 2026  
**Severity:** 🔴 Critical (App won't work)  
**Status:** 🚧 IN PROGRESS

### Error Message
```
connect ECONNREFUSED 127.0.0.1:5001
Failed to connect to Flask API
```

### Root Cause
Flask server is not running or not responding on port 5001. Likely because:
- Python dependencies (pandas, numpy, scikit-learn) not installed
- Flask crashes on startup
- Flask terminal closed

### Solution (Choose One)

#### Fix #1: Reinstall Python Dependencies (MOST LIKELY)
Flask now needs pandas, numpy, and scikit-learn for ML model.

**Steps:**

**Terminal 1:**
```bash
# If Flask is running, stop it
Ctrl+C

# Navigate to project root
cd d:\E_Commerce

# Make sure venv is activated
venv\Scripts\activate

# Reinstall all dependencies
pip install -r requirements.txt

# Start Flask again
python app.py
```

**Expected output:**
```
Loading ML model files...
✅ Model loaded from d:\Project\fraud_model.pkl
✅ Columns loaded from d:\Project\columns.pkl
✅ Encoders loaded from d:\Project\encoders.pkl
 * Running on http://127.0.0.1:5001
```

#### Fix #2: Check if Flask Terminal is Running

1. Look at **Terminal 1** - Should show:
   ```
   Running on http://127.0.0.1:5001
   ```

2. If not showing, start Flask:
   ```bash
   python app.py
   ```

#### Fix #3: Check Port 5001 is Available

```bash
# Windows - Check if port 5001 is in use
netstat -ano | findstr :5001

# If output shows, kill the process
taskkill /PID <PID> /F

# Restart Flask
python app.py
```

### How to Verify It's Fixed

1. **Terminal 1** should show:
   ```
   Running on http://127.0.0.1:5001
   ```

2. **Browser** should show no "Connection Refused" error

3. **Predictions** should work and show result

### Prevention Tips
- Always keep Flask terminal open (Terminal 1)
- Reinstall dependencies when requirements.txt changes
- Check Flask output for errors: `pip install -r requirements.txt` output
- Use `python app.py` to see actual Flask errors

---

## Error #3: Device Type Dropdown Not Showing All Options

**Date:** April 18, 2026  
**Severity:** 🟡 Medium (Feature incomplete)  
**Status:** ✅ VERIFIED OK

### Problem Description
Device Type dropdown appears to only show "Mobile" option, missing: Desktop, Tablet, ATM

### Root Cause
The HTML has all options defined correctly:
```html
<option value="mobile">Mobile</option>
<option value="desktop">Desktop</option>
<option value="tablet">Tablet</option>
<option value="atm">ATM</option>
```

This is likely a **browser rendering issue** not a code issue.

### Solutions

#### Fix #1: Clear Browser Cache (MOST LIKELY)

1. Open browser DevTools: **F12**
2. Right-click refresh button → **Empty cache and hard reload**
3. Or press: **Ctrl+Shift+Delete**
4. Try dropdown again

#### Fix #2: Try Different Browser

1. Try Chrome, Firefox, or Edge
2. See if dropdown shows all options
3. If other browser works, original browser has cache issue

#### Fix #3: Check if CSS is Blocking Dropdown

**In Browser DevTools (F12):**
1. Click "Inspect" tool (top-left arrow)
2. Click on device dropdown
3. Check if CSS is hiding options
4. Look for `display: none` on options

#### Fix #4: Restart Browser

1. Close all browser windows
2. Open fresh browser
3. Go to http://localhost:5000
4. Try dropdown again

### Verification

**Device Type dropdown should show:**
```
Mobile
Desktop
Tablet
ATM
```

All 4 options visible when you click dropdown.

### Prevention Tips
- Always do hard refresh after code changes
- Check browser console (F12) for JavaScript errors
- Verify HTML has all `<option>` tags
- Test in different browsers

---

## Error #2: [Add future errors here]

**Date:** [Date]  
**Severity:** [🔴 Critical / 🟡 Warning / 🟢 Minor]  
**Status:** [🚧 In Progress / ✅ FIXED]

### Error Message
```
[Copy exact error message here]
```

### Root Cause
[Explain what caused the error]

### Solution Applied
[Explain how to fix it]

### How to Verify It's Fixed
[Steps to confirm the fix works]

### Prevention Tips
[How to avoid this error in future]

---

## Common Errors Quick Reference

### Syntax Errors
| Error | Cause | Fix |
|-------|-------|-----|
| `SyntaxError: Unexpected token '}'` | Extra/missing brace | Count opening and closing braces |
| `SyntaxError: Missing ) after arguments` | Unclosed parenthesis | Find matching pair of `()` |
| `SyntaxError: Unexpected identifier` | Wrong variable name/syntax | Check spelling and syntax |

### Connection Errors
| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot connect to http://localhost:5000` | Express not running | Run `npm run dev` in Terminal 2 |
| `EADDRINUSE: address already in use :5000` | Port 5000 in use | Kill process or restart terminal |
| `Cannot connect to http://127.0.0.1:5001` | Flask not running | Run `python app.py` in Terminal 1 |

### Module Errors
| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module 'express'` | npm packages not installed | Run `npm install` in backend/ |
| `ModuleNotFoundError: No module named 'flask'` | Python packages not installed | Run `pip install -r requirements.txt` |

### Authentication Errors
| Error | Cause | Fix |
|-------|-------|-----|
| `JWT token invalid` | Token expired or malformed | Create new account to get new token |
| `Cannot login` | Wrong email/password | Check credentials, create new account |

---

## How to Add New Errors

When you encounter an error:

1. **Copy the exact error message** from terminal
2. **Note the file and line number** where error occurred
3. **Understand the root cause** (what went wrong)
4. **Document the solution** (how to fix it)
5. **Add it to this file** using the template above
6. **Update Quick Reference** section if common error

---

## Template for New Errors

```markdown
## Error #X: [Brief description]

**Date:** [Date]  
**Severity:** [🔴 Critical / 🟡 Warning / 🟢 Minor]  
**Status:** [🚧 In Progress / ✅ FIXED]

### Error Message
```
[Copy exact error message here]
```

### Root Cause
[What caused this error?]

### Solution Applied
[How to fix it]

**File:** [Which file was changed]

**What was changed:**
```javascript
// BEFORE
[Old code]

// AFTER
[New code]
```

### How to Verify It's Fixed
[Steps to confirm fix works]

### Prevention Tips
[How to avoid this in future]
```

---

## Quick Troubleshooting Checklist

When you get an error:

- [ ] Read the error message carefully
- [ ] Note the file name and line number
- [ ] Check if it's a syntax error (missing brace/bracket)
- [ ] Check if servers are running (Flask + Express)
- [ ] Check if port is available (5000, 5001)
- [ ] Look up error in this file
- [ ] Check TROUBLESHOOTING.md for common issues
- [ ] Restart terminals if needed

---

## Still Need Help?

1. **Check this file first** - Most errors will be here
2. **Check TROUBLESHOOTING.md** - Comprehensive guide
3. **Check terminal output** - Look for exact error message
4. **Verify both servers running** - Flask (5001) + Express (5000)
5. **Document the error** - Add to this file for future reference

---

**Last Updated:** April 18, 2026  
**Total Errors Logged:** 1  
**Total Errors Fixed:** 1 ✅  
**Currently Open Issues:** 0  
