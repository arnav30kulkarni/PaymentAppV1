# 💳 Full Stack Payment Application

A simple full-stack payment application where users can authenticate, search other users, and send money securely.

---

## 🚀 Features

- 🔐 User Authentication (Signup / Signin)
- 🪪 JWT-based Token Management
- 🔒 Protected Routes
- 📊 Dashboard with User Search (by first name / last name)
- 👤 Profile Popup with Update Information Page
- 💸 Send Money Between Users
- 💰 Fetch & Display Current Balance
- 🚪 Logout Functionality

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- TailwindCSS
- Axios
- Vite

### Backend
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Zod (Validation)
- CORS
- Dotenv

---

## 🏗 Project Structure

> /frontend

> /backend


- `frontend` → React application (UI + Routing + API calls)
- `backend` → Express server (Auth, APIs, DB logic)

---

## 🔐 Authentication Flow

1. User signs up / signs in
2. Backend generates JWT token
3. Token is stored on frontend
4. Protected routes verify token before granting access

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

> Create a .env file

PORT=4500,

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

>Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash 
cd frontend
npm install
npm run dev
```

## 🔮 Future Improvements

- Transaction history
- Improved UI/UX
- Role-based access
- Payment gateway integration

---