# PayFlow Demo

PayFlow is a full-stack payment simulation app built with React, Express, and MongoDB. It is designed as a modern wallet and transfer demo where users can sign up, configure a payment PIN, view balances, search contacts, and simulate transfers in a secure frontend flow.

This project is a demo/prototype intended for learning, UI exploration, and local development. It is not a production financial platform.

---

## Overview

- Secure user signup and sign-in flow
- JWT-based authenticated API access
- Dashboard with wallet balance and recent activity
- Search and pay experience for users
- Profile page with editable account details
- Payment PIN setup for transfer authorization
- Notification panel driven from recent transaction data
- Responsive UI with a refreshed dashboard and landing page

---

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT
- bcryptjs
- Zod validation
- dotenv
- CORS

---

## Project Structure

```text
PaytmfromCohort/
├── backend/
│   ├── config/
│   ├── middlware/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
├── CONTRIBUTING.md
├── .env.example
└── .gitignore
```

---

## Required Software

Before starting, make sure you have:

- Node.js 18+ and npm
- Docker Desktop or Docker Engine
- Git

---

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PaytmfromCohort
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Start MongoDB with Docker

If you do not already have a Mongo container running:

```bash
docker run -d --name mongo -p 27017:27017 mongo:latest
```

If it already exists:

```bash
docker start mongo
```

Confirm the database is listening:

```bash
docker ps --filter "name=^/mongo$"
```

### 4. Create environment variables

Copy the example environment file for the backend:

Windows:

```powershell
copy .env.example backend\.env
```

Linux/macOS:

```bash
cp .env.example backend/.env
```

Example contents:

```env
PORT=4500
MONGO_URI=mongodb://localhost:27017/payflow
JWT_SECRET=your_super_secret_key_here
```

If you want to keep the app config in a project-level env file, use the root `.env.example` as a template and copy it where needed for your local environment.

---

## Run the application

### Start the backend

```bash
cd backend
npm run dev
```

The API should start on:

```text
http://localhost:4500
```

### Start the frontend

```bash
cd ../frontend
npm run dev 
```

The app should open in the browser at:

```text
http://localhost:5173
```

---

## Route / Navigation Index

The app uses client-side navigation via React Router.

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/new-landing` | Landing page alias |
| `/newdashboard` | Main dashboard with balance and recent activity |
| `/users` | Search and view users to pay |
| `/send` | Payment flow and transfer page |
| `/profile` | User profile and settings |

### User flow

1. Open the landing page.
2. Sign up or sign in.
3. Complete the initial dashboard flow.
4. View wallet balance and recent activity.
5. Search recipients from `/users` and proceed to `/send`.
6. Update profile settings from `/profile`.

---

## Important Notes

- The app is a simulation/demo project.
- Payment and wallet behavior are intentionally local and demo-driven.
- Store secrets in environment variables and never commit real `.env` files.
- The backend expects a JWT secret and a MongoDB connection string.

---

## Build Verification

To validate the frontend build locally:

```bash
cd frontend
npm run build
```

To validate the backend syntax quickly:

```bash
cd backend
node --check server.js
```

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes.

---

## Future Improvements

- Add real payment gateway integration
- Improve transaction analytics and filtering
- Add unit and integration tests
- Expand profile and KYC controls
- Add stronger production security policies

---