# PayFlow Demo

PayFlow is a full-stack payment simulation app built with React, Express, and MongoDB. Users can create an account, sign in, set a payment PIN, view a simulated wallet balance, search for recipients, and make demo transfers.

> **Demo only:** This project is for learning, UI exploration, and local development. It does not process real payments and is not intended for production financial use.

---

## Features

- User signup and sign-in with JWT-based API authentication
- Simulated wallet balance and recent transaction list
- Recipient search and demo transfers authorized by a payment PIN
- Profile page with account detail and profile picture controls
- Responsive React interface with landing and dashboard pages

## Technology Stack

Dependency versions below are the ranges declared in each `package.json`; the `^` prefix permits compatible later minor and patch releases.

### Frontend (`frontend/package.json`)

- React and React DOM `^19.2.0` - UI and rendering
- React Router DOM `^7.13.0` - Client-side routing
- Axios `^1.13.4` - HTTP requests to the API
- Vite `^7.2.4` with `@vitejs/plugin-react` - Development server and production build
- Tailwind CSS and `@tailwindcss/vite` `^4.1.18` - Utility-first styling
- ESLint `^9.39.1` with React plugins - Frontend linting

### Backend (`backend/package.json`)

- Node.js - JavaScript runtime; use Node.js `20.19+` or `22.12+` to satisfy the Vite 7 toolchain and Mongoose 9 requirements
- Express `^5.2.1` - HTTP API framework
- MongoDB with Mongoose `^9.1.5` - Database and object-document mapping
- `jsonwebtoken` `^9.0.3` - JWT signing and verification; tokens currently expire after seven days
- `bcryptjs` `^3.0.3` - Password and payment PIN hashing
- Zod `^4.3.6` - Validation of selected API request bodies
- `dotenv` `^17.2.3` - Loads backend environment variables
- `cors` `^2.8.6` - Allows the configured frontend origin, `http://localhost:5173`
- `nodemon` `^3.1.11` - Restarts the server during development

## Project Structure

```text
PaymentAppV1/
├── backend/
│   ├── .dockerignore
│   ├── config/          # MongoDB connection and Mongoose schemas
│   ├── middlware/       # Authentication middleware (directory spelling as in repo)
│   ├── routes/          # User and account API routes
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api.js       # Configurable API client
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf       # Static hosting and SPA route fallback
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── .env.example
├── docker-compose.yml
├── Makefile
├── openapi.yaml
├── CONTRIBUTING.md
└── README.md
```

## Prerequisites

- Node.js `20.19+` or `22.12+` and npm for local development and Makefile checks
- Docker Engine with Docker Compose v2 (or Docker Desktop with Compose) to run the full stack in containers
- MongoDB installed locally only if not using the Docker Compose stack
- Git

Check the tools needed for your chosen workflow:

```bash
node --version
npm --version
docker --version
docker compose version
```

## Run the Full Stack with Docker Compose

Docker Compose builds the frontend and backend images, starts MongoDB, and connects the services on a private Compose network. Docker Compose is included with current Docker Desktop installations; on Linux, install the Docker Compose plugin.

Create the backend environment file from the root example and replace the placeholder JWT secret with a private random value:

```bash
cp .env.example backend/.env
```

Then, from the repository root, build and start the services:

```bash
docker compose up --build
```

Open the frontend at `http://localhost:5173`. The backend API is published at `http://localhost:4500`; Compose sets its MongoDB connection to the `mongo` service and retains database files in the `mongo-data` named volume.

The frontend image defaults to `VITE_API_URL=http://localhost:4500`. This value is compiled into the frontend bundle; if you change it for deployment, the URL must be reachable from users' browsers, and the backend CORS configuration must allow the frontend origin.

Stop the services with `Ctrl+C`, then run `docker compose down`. This keeps the database volume. To discard the stored demo database as well, use `docker compose down --volumes`.

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PaymentAppV1
```

Replace `<your-repo-url>` with the repository's clone URL. Run the commands below from the repository root unless noted otherwise.

### 2. Install dependencies

The frontend and backend have separate package manifests, so install dependencies in both directories:

```bash
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 3. Start MongoDB

To run a local MongoDB container with a named volume for database persistence:

```bash
docker run -d --name payflow-mongo -p 27017:27017 -v payflow-mongo-data:/data/db mongo:8
```

Check that it is running:

```bash
docker ps --filter "name=^/payflow-mongo$"
```

On later runs, start the existing container with:

```bash
docker start payflow-mongo
```

If you already have a MongoDB server or hosted database, skip the container commands and use its connection string in `MONGO_URI`.

### 4. Configure backend environment variables

The repository-root `.env.example` is the template. Copy it to `backend/.env`, which is loaded when the backend starts.

Linux/macOS:

```bash
cp .env.example backend/.env
```

Windows PowerShell:

```powershell
Copy-Item .env.example backend/.env
```

Set the values in `backend/.env` for your environment:

```env
PORT=4500
MONGO_URI=mongodb://localhost:27017/payflow
JWT_SECRET=replace_with_a_long_random_secret
```

`PORT` is optional in the server code and defaults to `3000`; the example selects port `4500`. `MONGO_URI` must point to a reachable MongoDB database. `JWT_SECRET` is used to sign and verify tokens. Keep the secret private and do not commit `backend/.env`.

## Run the Application

Start the backend and frontend in separate terminals from the project root.

### Backend API

```bash
cd backend
npm run dev
```

This runs `nodemon server.js`. With the example environment settings, the backend listens on `http://localhost:4500`. Without `PORT`, it listens on port `3000`. The server also needs MongoDB to be reachable at `MONGO_URI`.

### Frontend

```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The backend CORS configuration currently allows that local origin. The Vite configuration does not declare an API proxy.

### Run the frontend in Docker

Build the image from the frontend directory. `VITE_API_URL` is embedded in the static bundle during the image build and must be an API address reachable by the user's browser:

```bash
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:4500 -t payflow-frontend .
docker run --rm -p 5173:80 --name payflow-frontend payflow-frontend
```

Then open `http://localhost:5173`. Mapping the container to port `5173` matches the backend's current CORS allowlist. For deployment at a different frontend origin, update the backend CORS configuration as well as providing the deployed API URL when building the image.

## Frontend Routes

The app uses React Router for client-side navigation:

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/new-landing` | Landing page alias |
| `/newdashboard` | Dashboard |
| `/users` | User search/dashboard page |
| `/send` | Transfer page |
| `/profile` | Profile page |

## Backend API Routes

The API is mounted under `/api/v1`. Protected endpoints require an `Authorization: Bearer <token>` header. The OpenAPI 3.1 contract, including request and response schemas, is in [openapi.yaml](openapi.yaml); open it in an OpenAPI-compatible viewer to browse or try the API.

| Method | Endpoint | Access |
| --- | --- | --- |
| `POST` | `/api/v1/user/signup` | Public |
| `POST` | `/api/v1/user/signin` | Public |
| `GET` | `/api/v1/user/me` | Bearer token |
| `PUT` | `/api/v1/user/` | Bearer token |
| `PUT` | `/api/v1/user/pin` | Bearer token |
| `PUT` | `/api/v1/user/profile-picture` | Bearer token |
| `GET` | `/api/v1/user/bulk` | Bearer token |
| `GET` | `/api/v1/user/recipient/:id` | Bearer token |
| `GET` | `/api/v1/account/balance` | Bearer token |
| `GET` | `/api/v1/account/recent` | Bearer token |
| `POST` | `/api/v1/account/transfer` | Bearer token and payment PIN |

## Verification Commands

The root `Makefile` provides shortcuts for common checks (requires GNU Make and installed npm dependencies):

| Command | Action |
| --- | --- |
| `make lint` | Run the frontend ESLint script |
| `make audit` | Run `npm audit` for backend and frontend dependencies; fail on high or critical findings |
| `make build` | Build the frontend and syntax-check `backend/server.js` |
| `make check` | Run lint, audit, and build |

The backend does not currently have a separate lint script; `make build` checks its entry point's syntax.

Build the frontend production bundle:

```bash
cd frontend
npm run build
```

Lint the frontend:

```bash
cd frontend
npm run lint
```

Preview the latest frontend build locally:

```bash
cd frontend
npm run preview
```

Check the backend entry point for JavaScript syntax errors:

```bash
cd backend
node --check server.js
```

There is no automated test suite configured yet. The backend `npm test` script currently exits with a “no test specified” message.

## Security and Demo Limitations

- Balances and transfers are simulated; the app does not connect to a payment processor or move real funds.
- Do not use real payment credentials or sensitive personal data.
- Use a strong, private `JWT_SECRET` and keep environment files containing secrets out of version control.
- The backend currently allows CORS requests only from `http://localhost:5173`; change this deliberately if using a different frontend origin.
- The application has not been audited or designed for production financial use.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes.