# Full-Stack JWT Authentication Module

A production-ready, isolated authentication system featuring a Python (FastAPI) backend and a React (Vite) frontend. This module implements strict single-tab session management using secure JSON Web Tokens (JWT) and PostgreSQL for data persistence.

---

## Tech Stack

### Frontend

* React 18 (via Vite)
* React Router v6 (for Protected Routes)
* Axios (with request interceptors)
* Context API (Global Auth State)

### Backend

* Python 3.9+
* FastAPI (REST API & Swagger Documentation)
* PostgreSQL (Relational Database)
* SQLAlchemy (ORM)
* Passlib (bcrypt password hashing)
* Python-JOSE (JWT Generation & Validation)

---

## Features

* **Secure Registration & Login:** One-way password hashing using bcrypt
* **JWT Authentication:** Bearer token generation and validation via FastAPI dependencies
* **Single-Tab Isolation:** Tokens stored in `sessionStorage`, restricting authentication to a single tab
* **Protected Routes:** React Router redirects unauthenticated users to login
* **Global Auth State:** Axios interceptors automatically inject tokens into requests

---

## Local Development Setup

### 1. Database Setup

Ensure PostgreSQL is running and create the database:

```sql
CREATE DATABASE jwt_auth_db;
```

---

### 2. Backend Environment

Navigate to the `/backend` directory:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install "fastapi[all]" sqlalchemy psycopg2-binary "passlib[bcrypt]" "python-jose[cryptography]" python-dotenv "bcrypt==3.2.2"
```

Create a `.env` file in `/backend`:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/jwt_auth_db
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Start the backend server:

```bash
uvicorn main:app --reload
```

API Documentation available at: `http://127.0.0.1:8000/docs`

---

### 3. IDE Setup (VS Code)

To ensure your editor recognizes dependencies:

1. Open Command Palette

   * `Ctrl + Shift + P` (Windows/Linux)
   * `Cmd + Shift + P` (Mac)

2. Search and select:
   `Python: Select Interpreter`

3. Choose your virtual environment:

   * Windows: `.\backend\venv\Scripts\python.exe`
   * Mac/Linux: `./backend/venv/bin/python`

---

### 4. Frontend Environment

Navigate to the `/frontend` directory:

```bash
npm install
npm run dev
```

Application runs at: `http://localhost:5173`

---

## API Contracts

| Method | Endpoint           | Description                        | Auth Required |
| ------ | ------------------ | ---------------------------------- | ------------- |
| POST   | /api/auth/register | Creates a new user                 | No            |
| POST   | /api/auth/login    | Authenticates user and returns JWT | No            |
| GET    | /api/profile       | Returns logged-in user details     | Yes           |

---

## Authentication Context

### Header Injection

All protected endpoints must include:

```
Authorization: Bearer <your_jwt_token>
```

### Token Lifecycle

* JWT is generated upon login
* Stored in `sessionStorage`
* Automatically used for authenticated requests

### State Management

* Axios interceptors append tokens automatically
* On `401 Unauthorized`:

  * Session is cleared
  * User is redirected to login

---

## Architecture

Built following **Clean Architecture** and **SOLID principles**.

---
