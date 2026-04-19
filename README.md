# PulseShield Fraud Detection App

PulseShield is a full-stack e-commerce fraud detection project with:

- A frontend served by Express
- A Node.js backend API
- A Flask ML prediction service
- A project-local MySQL database

## Main Guide

Use [instructions.md](/d:/E_Commerce/instructions.md) for the complete Windows PowerShell setup, database connection, and run commands.

## Quick Start

From `D:\E_Commerce`:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-All.ps1
```

Open:

- `http://127.0.0.1:5000`
- `http://127.0.0.1:5000/dashboard.html`

## Database

To connect to MySQL:

```powershell
& 'D:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3307 -u root -D fraud_detection
```
