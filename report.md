# PulseShield Project Report

## 1. Project Title

**PulseShield: E-Commerce Fraud Detection System**

## 2. Introduction

PulseShield is a full-stack web application created to detect suspicious e-commerce transactions in real time. The project combines a modern web interface, a backend API, a machine learning prediction service, and a MySQL database.

The main purpose of the project is to help identify whether a transaction is likely to be fraudulent or legitimate. Instead of checking transactions manually, the system accepts transaction details, analyzes them, predicts fraud probability, stores the result in a database, and shows the information on a dashboard.

This project is useful for understanding how frontend development, backend development, machine learning, authentication, real-time updates, and database connectivity work together in one complete software system.

## 3. Problem Statement

Online businesses face the challenge of fraudulent transactions. Fraud can cause financial loss, chargebacks, customer trust issues, and operational delays. A manual review process is slow and difficult to scale.

This project solves that problem by:

- Accepting transaction input from a user
- Running fraud analysis automatically
- Returning a fraud decision and probability score
- Saving each transaction in a database
- Displaying results in a dashboard for monitoring

## 4. Objectives

The main objectives of this project are:

- To build a complete fraud detection platform
- To provide secure user signup and login
- To analyze transactions using ML-based or fallback logic
- To store all users and transactions in MySQL
- To display transaction history and statistics
- To provide real-time dashboard updates using WebSocket communication
- To offer a clean and user-friendly interface for presentation and demo purposes

## 5. Project Overview

The project is divided into four main parts:

1. **Frontend**
   - Built with HTML, CSS, and JavaScript
   - Allows users to sign up, log in, submit transactions, and view dashboard data

2. **Backend**
   - Built with Node.js and Express
   - Handles API routes, authentication, database operations, static file serving, and WebSocket events

3. **ML Engine**
   - Built with Python and Flask
   - Predicts whether a transaction is fraud or not

4. **Database**
   - Uses MySQL
   - Stores user details and transaction records

## 6. Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js for graphs
- Socket.IO client for real-time updates

### Backend

- Node.js
- Express.js
- Axios
- CORS
- dotenv
- bcryptjs
- jsonwebtoken
- Socket.IO
- mysql2

### Machine Learning Layer

- Python
- Flask
- Flask-CORS
- pandas
- numpy
- scikit-learn

### Database

- MySQL 8.x

## 7. System Architecture

The project follows a multi-layer architecture:

```text
User
  |
  v
Frontend (HTML/CSS/JS)
  |
  v
Express Backend API
  |            |
  |            v
  |         MySQL Database
  |
  v
Flask ML API
```

### How the architecture works

- The user interacts with the frontend in the browser.
- The frontend sends requests to the backend.
- The backend handles authentication and transaction requests.
- When a prediction is needed, the backend sends transaction data to the Flask ML service.
- The Flask service returns fraud status and probability.
- The backend stores the result in MySQL.
- The backend emits a Socket.IO event for live dashboard updates.
- The frontend dashboard refreshes and shows updated statistics and history.

## 8. Project Folder Structure

Important files and folders:

```text
D:\E_Commerce
|
|-- frontend/
|   |-- index.html
|   |-- dashboard.html
|   |-- styles.css
|   |-- script.js
|
|-- backend/
|   |-- server.js
|   |-- package.json
|   |-- config/mysql.js
|   |-- controllers/authController.js
|   |-- controllers/transactionController.js
|   |-- middleware/auth.js
|   |-- routes/authRoutes.js
|   |-- routes/transactionRoutes.js
|   |-- storage/mysqlStorage.js
|
|-- mysql-local/
|   |-- project-local MySQL server files
|
|-- database/
|   |-- init.sql
|
|-- app.py
|-- requirements.txt
|-- Start-MySql.ps1
|-- Start-ML.ps1
|-- Start-Backend.ps1
|-- Start-All.ps1
|-- instructions.md
```

## 9. Frontend Explanation

The frontend is the user-facing part of the project. It is responsible for interaction, display, form handling, and showing live data.

### Main frontend pages

#### `index.html`

This is the main page of the application. It includes:

- Signup and login form
- Transaction prediction form
- Recent transaction table
- Result display card
- Theme toggle

#### `dashboard.html`

This page shows analytical and monitoring information such as:

- Total transactions
- Fraud transactions
- Legitimate transactions
- Average fraud probability
- Transaction history table
- Fraud-only filter
- CSV export option
- Chart visualization

### Frontend logic in `frontend/script.js`

The frontend JavaScript performs these tasks:

- Initializes the page when loaded
- Handles login and signup
- Saves JWT token and user data in local storage
- Sends transaction data to backend API
- Loads recent transactions
- Loads dashboard statistics
- Connects to Socket.IO for real-time updates
- Updates charts and tables dynamically
- Displays notifications using toast messages

### Key frontend features

- User-friendly and interactive UI
- Real-time visual updates
- Responsive data presentation
- Easy form-based workflow

## 10. Backend Explanation

The backend is the core controller of the system. It connects the frontend, ML service, and database.

### `backend/server.js`

This is the main backend entry point. It:

- Loads environment variables
- Creates the Express app
- Creates the HTTP server
- Configures Socket.IO
- Parses JSON and URL-encoded request bodies
- Registers API routes
- Serves frontend static files
- Exposes a `/health` endpoint
- Starts the backend after database initialization

### Main backend responsibilities

- Route handling
- Authentication
- Calling the ML service
- Saving and retrieving database data
- Serving frontend files
- Real-time event broadcasting

## 11. Authentication Module

Authentication is implemented in `backend/controllers/authController.js`.

### Signup flow

When a new user signs up:

- The backend reads `name`, `email`, and `password`
- It validates that all fields are present
- It checks whether the email already exists
- It hashes the password using `bcryptjs`
- It stores the new user in MySQL
- It generates a JWT token valid for 7 days
- It sends the token and user details back to the frontend

### Login flow

When a user logs in:

- The backend reads `email` and `password`
- It validates the input
- It finds the user by email
- It compares the given password with the hashed password
- It creates a JWT token if the password is correct
- It returns the token and user data

### Why JWT is used

JWT helps the system identify a logged-in user without storing sessions on the server. The token is sent with later requests, which allows the backend to recognize the user securely.

## 12. Route Structure

### Authentication routes

Defined in `backend/routes/authRoutes.js`:

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Transaction routes

Defined in `backend/routes/transactionRoutes.js`:

- `POST /api/transactions/predict`
- `GET /api/transactions`
- `GET /api/transactions/stats/summary`
- `GET /api/transactions/export/csv`

### Middleware

`backend/middleware/auth.js` checks the token:

- Reads `Authorization` header or token from query string
- Verifies JWT token
- Attaches decoded user data to `req.user`
- Sends an error if token is invalid

## 13. Database Layer

The project uses MySQL as the main persistent storage system.

### Database initialization

The file `backend/config/mysql.js` handles database setup.

When the backend starts:

- It connects to MySQL
- Creates the `fraud_detection` database if it does not exist
- Creates required tables if they do not exist
- Creates a connection pool for later queries

### Tables used

#### `users`

Stores registered user information:

- `id`
- `name`
- `email`
- `password`
- `createdAt`
- `updatedAt`

#### `transactions`

Stores transaction and fraud prediction details:

- `id`
- `userId`
- `amount`
- `location`
- `device`
- `time`
- `prediction`
- `probability`
- `createdAt`
- `updatedAt`

### Storage abstraction

The file `backend/storage/mysqlStorage.js` acts as the data access layer.

It contains two main objects:

- `User`
- `Transaction`

These objects provide methods such as:

- `create()`
- `findOne()`
- `find()`

This approach is useful because it keeps SQL logic separate from controller logic.

## 14. Machine Learning Module

The ML service is implemented in `app.py`.

### Purpose of the ML service

It receives transaction data and returns:

- `fraud`: `true` or `false`
- `probability`: value between `0.01` and `0.99`

### How it works

The ML service tries to load:

- `fraud_model.pkl`
- `columns.pkl`
- `encoders.pkl`

If these files load successfully, the system uses the trained model. If they are missing or fail to load, the system switches to a fallback scoring method.

### ML prediction logic

The ML logic extracts features such as:

- transaction amount
- location
- device
- hour
- day of week
- month

It then:

- prepares the data in a DataFrame
- encodes categorical fields if encoders are available
- aligns the columns to match training-time features
- runs prediction and probability calculation

### Fallback rule-based logic

If the ML model is unavailable, the fallback logic calculates fraud probability using clear rules:

- Large amounts increase risk
- High-risk locations increase risk
- High-risk devices increase risk
- Odd transaction time increases risk

Example:

- Amount `>= 5000` adds high risk
- Location like `moscow` increases risk
- Device like `atm` increases risk
- Late night transactions increase risk

If the final fallback probability is `>= 0.60`, the transaction is marked as fraud.

### Why fallback logic is important

This makes the system more reliable. Even if the trained model is not available, the project still works and demonstrates fraud detection behavior.

## 15. Transaction Processing Flow

This is one of the most important parts of the project.

### Step-by-step transaction flow

1. User logs in to the frontend
2. User enters transaction details
3. Frontend sends data to `POST /api/transactions/predict`
4. Backend validates the fields
5. Backend sends transaction data to Flask ML API
6. Flask returns fraud decision and probability
7. Backend stores the transaction in MySQL
8. Backend emits a `transaction:new` event using Socket.IO
9. Frontend refreshes recent transactions and dashboard data
10. User sees result on the screen immediately

This flow shows full integration between browser, server, ML, and database.

## 16. Dashboard and Analytics

The dashboard gives a summarized view of the stored transactions.

### Dashboard features

- Total number of transactions
- Number of fraud transactions
- Number of safe transactions
- Average probability value
- Fraud probability line chart
- Transaction history table
- Fraud-only filtering
- CSV export

### How statistics are calculated

The backend function `getTransactionStats()`:

- fetches transactions from MySQL
- counts total transactions
- counts fraud transactions
- calculates legitimate transactions
- calculates average probability
- prepares chart labels and values

This makes the dashboard suitable for project demonstration and presentation.

## 17. Real-Time Communication

The project uses Socket.IO for live updates.

### Why real-time updates are useful

Without refreshing the page manually, the dashboard can react when a new transaction is saved.

### How it works

- Backend creates a Socket.IO server
- After a transaction is stored, backend emits `transaction:new`
- Dashboard page listens for that event
- Dashboard reloads metrics and history

This creates a more professional and modern application experience.

## 18. API Summary

### Authentication APIs

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Transaction APIs

- `POST /api/transactions/predict`
- `GET /api/transactions`
- `GET /api/transactions/stats/summary`
- `GET /api/transactions/export/csv`

### Utility API

- `GET /health`

### ML API

- `POST http://127.0.0.1:5001/predict`

## 19. Dependencies Summary

### Backend packages

- `express`: server framework
- `axios`: calls Flask API
- `bcryptjs`: password hashing
- `jsonwebtoken`: token generation and validation
- `cors`: cross-origin support
- `dotenv`: environment configuration
- `mysql2`: MySQL connectivity
- `socket.io`: real-time events
- `nodemon`: development auto-restart

### Python packages

- `Flask`: lightweight web server
- `Flask-Cors`: cross-origin communication
- `pandas`: data formatting and ML input preparation
- `numpy`: numerical operations
- `scikit-learn`: trained model support

## 20. Security Features

This project includes basic security features:

- Password hashing using bcrypt
- JWT-based authentication
- Route-level token verification
- SQL parameterized queries using prepared statements

### Why parameterized queries matter

Parameterized queries reduce the risk of SQL injection because user input is not directly concatenated into SQL strings.

## 21. Database Connectivity

Database connectivity is a key strength of this project because it moves beyond temporary storage and uses a real relational database.

### How connectivity is managed

- Backend reads DB settings from environment variables
- Connection is established using `mysql2/promise`
- A pool is created for efficiency
- Tables are auto-created during startup

### Benefits of MySQL in this project

- Persistent storage
- Structured schema
- Easier reporting
- Easier query-based analysis
- Better for presentation and demonstration than in-memory storage

## 22. How To Run The Project

The project is designed for Windows PowerShell.

### Main startup scripts

- `Start-MySql.ps1`
- `Init-Database.ps1`
- `Start-ML.ps1`
- `Start-Backend.ps1`
- `Start-All.ps1`

### Simplest command

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-All.ps1
```

### URLs

- App: `http://127.0.0.1:5000`
- Dashboard: `http://127.0.0.1:5000/dashboard.html`
- ML: `http://127.0.0.1:5001`

## 23. Advantages of the Project

- Full-stack architecture
- Real-time fraud prediction
- Secure login system
- MySQL database connectivity
- Real-time dashboard updates
- CSV export support
- Clean separation of frontend, backend, ML, and DB layers
- Practical and presentation-friendly use case

## 24. Limitations

Every project has limitations. This project currently has some areas that can still be improved:

- The fraud model is basic and depends on available model files
- The fallback logic is rule-based and simplified
- No role-based access control
- No advanced input validation library
- No automated test suite included in the current codebase
- The UI is designed for demo and educational use, not production at enterprise scale

## 25. Future Enhancements

The project can be improved further with:

- Better trained ML models
- More transaction features
- Admin panel for investigators
- User activity logs
- Email or SMS fraud alerts
- Role-based access control
- Better analytics and reporting
- Docker-based deployment
- Cloud database and production deployment
- Unit tests and integration tests

## 26. Learning Outcomes

This project demonstrates understanding of:

- Full-stack application design
- REST API development
- Machine learning integration in web apps
- Database design and SQL storage
- Authentication using JWT
- Password hashing
- Real-time communication using Socket.IO
- Data visualization in dashboards
- PowerShell-based project setup and execution

## 27. Conclusion

PulseShield is a complete fraud detection application that successfully integrates frontend, backend, machine learning, and database components into one working system.

The project is strong from a presentation point of view because it does not only show static pages or isolated code modules. Instead, it demonstrates a real transaction flow:

- a user signs up
- a transaction is submitted
- the ML layer predicts fraud
- the backend stores data
- the dashboard updates in real time

This makes the project meaningful, practical, and technically complete.

## 28. Short Presentation Script

This section can be used while presenting the project verbally.

### Intro

"Our project is PulseShield, an e-commerce fraud detection system. It is a full-stack web application that takes transaction details, predicts whether the transaction is fraudulent, stores the result in MySQL, and shows it on a live dashboard."

### Problem

"Online fraud is a major issue in e-commerce. Manual checking is slow and inefficient, so this system automates fraud analysis and monitoring."

### Working

"The frontend collects user and transaction input. The backend handles authentication and APIs. The Flask ML engine predicts fraud probability. The backend stores the transaction in MySQL and updates the dashboard in real time using Socket.IO."

### Database

"We use MySQL to store users and transactions. This gives us permanent and structured data storage, which is much better for reporting and analysis."

### Conclusion

"This project shows how web development, machine learning, authentication, and SQL database connectivity can be combined into one practical real-world application."

## 29. Viva Questions and Sample Answers

### What is the purpose of this project?

To detect fraudulent transactions automatically and display results in a user-friendly dashboard.

### Why did you use MySQL?

Because MySQL gives structured, persistent, relational storage for users and transactions.

### Why is Flask used?

Flask is used to host the ML prediction API separately from the Node.js backend.

### Why is Node.js used?

Node.js handles the API layer, authentication, database operations, and frontend serving efficiently.

### What is the role of Socket.IO?

Socket.IO sends live updates to the dashboard when new transactions are added.

### How are passwords stored?

Passwords are not stored in plain text. They are hashed using bcrypt.

### How is fraud decided?

Either by a trained ML model if available, or by fallback rule-based logic if the model is not available.

### What happens after prediction?

The transaction result is stored in MySQL and shown in the dashboard and recent transaction list.
