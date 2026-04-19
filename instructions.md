# PulseShield Instructions

This file is the single setup and run guide for this project on Windows PowerShell.

## 1. Prerequisites

Install these first:

- Node.js 16 or newer
- npm
- Python 3.8 or newer

Check them in PowerShell:

```powershell
node --version
npm --version
python --version
```

## 2. Open The Project

```powershell
cd D:\E_Commerce
```

## 3. Install Dependencies

Python dependencies:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Backend dependencies:

```powershell
cd D:\E_Commerce\backend
npm install
cd D:\E_Commerce
```

## 4. Database Setup

Start the project-local MySQL server:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-MySql.ps1
```

Create the database and tables:

```powershell
powershell -ExecutionPolicy Bypass -File .\Init-Database.ps1
```

## 5. Run The Project

### Option A: Start Everything With One Command

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-All.ps1
```

### Option B: Start Each Part Separately

Database:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-MySql.ps1
powershell -ExecutionPolicy Bypass -File .\Init-Database.ps1
```

ML service:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-ML.ps1
```

Backend:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Backend.ps1
```

Frontend:

- There is no separate frontend server.
- The frontend is served by the backend on port `5000`.

## 6. Open The App

Browser URLs:

- App: `http://127.0.0.1:5000`
- Dashboard: `http://127.0.0.1:5000/dashboard.html`
- Health check: `http://127.0.0.1:5000/health`

## 7. Connect To SQL

Connect to MySQL:

```powershell
& 'D:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3307 -u root -D fraud_detection
```

Show tables:

```sql
SHOW TABLES;
```

See users:

```sql
SELECT * FROM users;
```

See transactions:

```sql
SELECT * FROM transactions;
```

Exit MySQL:

```sql
exit
```

## 8. Useful Commands

Start DB only:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-MySql.ps1
```

Initialize DB only:

```powershell
powershell -ExecutionPolicy Bypass -File .\Init-Database.ps1
```

Start ML only:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-ML.ps1
```

Start backend only:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Backend.ps1
```

Check DB quickly:

```powershell
& 'D:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3307 -u root -D fraud_detection -e "SHOW TABLES;"
```

## 9. First Test Flow

1. Start MySQL.
2. Initialize the database.
3. Start ML.
4. Start backend.
5. Open `http://127.0.0.1:5000`.
6. Sign up a user.
7. Log in.
8. Submit a transaction.
9. Open the dashboard.
10. Check SQL with `SELECT * FROM transactions;`.

## 10. Notes

- Keep the terminals open while the services are running.
- The backend uses MySQL on `127.0.0.1:3307`.
- The ML API runs on `127.0.0.1:5001`.
- The backend and frontend run on `127.0.0.1:5000`.
