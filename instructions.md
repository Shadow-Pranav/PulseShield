# PulseShield - E-Commerce Fraud Detection System

Complete setup and execution guide for the PulseShield project on Windows PowerShell.

## Prerequisites

Ensure these are installed and accessible:

- **Node.js** 16+ (check: `node --version`)
- **npm** (check: `npm --version`)
- **Python** 3.8+ (check: `python --version`)

## Quick Start (Run All Services)

From `D:\E_Commerce`, execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-All.ps1
```

This will automatically start all services in sequence:
1. MySQL Database
2. Database Initialization
3. ML Service
4. Backend Server

The app will be ready at `http://127.0.0.1:5000`

---

## Step-by-Step Setup (Manual)

### Step 1: Navigate to Project

```powershell
cd D:\E_Commerce
```

### Step 2: Install Python Dependencies

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Step 3: Install Backend Dependencies

```powershell
cd D:\E_Commerce\backend
npm install
cd D:\E_Commerce
```

### Step 4: Start Database

Open a new PowerShell terminal and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-MySql.ps1
```

**Expected Output:** "Starting project-local MySQL on 127.0.0.1:3307..."

### Step 5: Initialize Database

Open another PowerShell terminal and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\Init-Database.ps1
```

**Expected Output:** "Database schema applied."

### Step 6: Start ML Service

Open another PowerShell terminal and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-ML.ps1
```

**Expected Output:** "Starting Flask ML service on 127.0.0.1:5001..."

### Step 7: Start Backend Server

Open another PowerShell terminal and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Backend.ps1
```

**Expected Output:** "Starting backend on http://127.0.0.1:5000..."

### Step 8: Access the Application

Open your browser and visit:

- **Main App:** `http://127.0.0.1:5000`
- **Dashboard:** `http://127.0.0.1:5000/dashboard.html`
- **Health Check:** `http://127.0.0.1:5000/health`

---

## Running Services

Once all services are started, they run on:

| Service | URL | Status |
|---------|-----|--------|
| **MySQL Database** | 127.0.0.1:3307 | Running |
| **ML Service** | 127.0.0.1:5001 | Running |
| **Backend API** | 127.0.0.1:5000 | Running |
| **Frontend** | Served by backend | Running |

---

## Database Management

### Connect to MySQL

```powershell
& 'D:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3307 -u root -D fraud_detection
```

### Useful SQL Queries

Show all tables:
```sql
SHOW TABLES;
```

View users:
```sql
SELECT * FROM users;
```

View transactions:
```sql
SELECT * FROM transactions;
```

Exit MySQL:
```sql
exit
```

### Quick DB Check

```powershell
& 'D:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3307 -u root -D fraud_detection -e "SHOW TABLES;"
```

---

## Individual Service Commands

Start only MySQL:
```powershell
powershell -ExecutionPolicy Bypass -File .\Start-MySql.ps1
```

Initialize DB only:
```powershell
powershell -ExecutionPolicy Bypass -File .\Init-Database.ps1
```

Start only ML service:
```powershell
powershell -ExecutionPolicy Bypass -File .\Start-ML.ps1
```

Start only backend:
```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Backend.ps1
```

---

## First Time Test Workflow

1. Execute all services (Step 1-7 above or use `Start-All.ps1`)
2. Open `http://127.0.0.1:5000` in your browser
3. Click **Sign Up** and create a new user account
4. Log in with your credentials
5. Submit a test transaction
6. Navigate to **Dashboard** (`http://127.0.0.1:5000/dashboard.html`)
7. Verify the transaction appears with fraud detection status
8. (Optional) Check database: `SELECT * FROM transactions;`

---

## Important Notes

- **Keep terminals open** while services are running
- **MySQL runs on:** `127.0.0.1:3307`
- **ML Service runs on:** `127.0.0.1:5001`
- **Backend runs on:** `127.0.0.1:5000`
- **Frontend is served** by the backend on port `5000`
- Each service should run in its own terminal window
- Services output startup messages; verify they started before proceeding
