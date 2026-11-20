

```markdown
# Store Rating Platform

A full‑stack web application that lets customers rate retail stores, gives store owners insight into their performance, and provides administrators with complete oversight.  
The project is organized as a **monorepo** with a Node + Express API and a React + Vite UI.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Database & Seeding](#database--seeding)
- [API Reference](#api-reference)
- [Frontend Overview](#frontend-overview)
- [Authentication & Authorization](#authentication--authorization)
- [Security & Best Practices](#security--best-practices)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features
| Role | Capabilities |
|------|--------------|
| **Admin** | Dashboard cards (total users, stores, ratings), CRUD for users & stores, filterable & sortable tables, view store‑owner average rating, logout |
| **User** | Sign‑up / login, update password, browse stores, see overall rating & personal rating, submit or modify rating, search stores, logout |
| **Store Owner** | Dashboard showing store’s average rating, list of users who rated the store (name, email, rating, date), logout |

All listings support server‑side **sorting**, **filtering**, and **pagination** via query parameters.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| **Backend** | Node.js 18+, Express.js, Sequelize ORM, SQLite (development) / MySQL (production), JWT, bcrypt, express‑validator, helmet, cors, express‑rate‑limit |
| **Frontend** | React 18, Vite, React Router v6, Axios, Tailwind CSS |
| **Database** | SQLite (dev) – easy zero‑config, switch to MySQL for production |
| **Auth** | JWT (access token) + bcrypt password hashing |
| **Validation** | express‑validator on the server, mirrored client‑side validation (inline error messages) |

---

## Project Structure

```
/ (repo root)
├─ backend/
│   ├─ config/
│   │   └─ config.js                # DB configs (SQLite dev, MySQL prod)
│   ├─ migrations/
│   │   ├─ 20231119100000-create-users.js
│   │   ├─ 20231119101000-create-stores.js
│   │   └─ 20231119102000-create-ratings.js
│   ├─ src/
│   │   ├─ index.js                 # Express bootstrap
│   │   ├─ models/                  # Sequelize models (user, store, rating)
│   │   ├─ controllers/             # Business logic per resource
│   │   ├─ routes/                  # API route definitions
│   │   ├─ middleware/              # auth, role, validation, error handling
│   │   └─ validators/              # express‑validator schemas
│   ├─ seeders/
│   │   └─ seed.js                  # Creates admin, owners, users, stores, ratings
│   └─ .env.example                 # Example env variables
│
├─ frontend/
│   ├─ src/
│   │   ├─ main.jsx
│   │   ├─ App.jsx
│   │   ├─ router.jsx
│   │   ├─ api/
│   │   │   └─ axiosInstance.js
│   │   ├─ context/
│   │   │   └─ AuthContext.jsx
│   │   ├─ components/
│   │   │   ├─ Navbar.jsx
│   │   │   ├─ ProtectedRoute.jsx
│   │   │   ├─ DataTable.jsx
│   │   │   ├─ FormInput.jsx
│   │   │   ├─ RatingStars.jsx
│   │   │   └─ Toast.jsx
│   │   └─ pages/
│   │       ├─ Login.jsx
│   │       ├─ Signup.jsx
│   │       ├─ AdminDashboard.jsx
│   │       ├─ UserStores.jsx
│   │       ├─ OwnerDashboard.jsx
│   │       └─ NotFound.jsx
│   ├─ index.html
│   ├─ vite.config.js
│   ├─ tailwind.config.cjs
│   └─ postcss.config.cjs
│
├─ .gitignore
└─ README.md                       # ← THIS FILE
```

---

## Setup & Installation

### Prerequisites
- **Node.js** ≥ 20 (≥ 22 works fine)  
- **npm** (comes with Node)  
- **Git** (for cloning/pushing)  
- **SQLite** (bundled) – optional MySQL if you switch to production  
- (Optional) **Docker** if you prefer containerized dev

### 1️⃣ Clone the repo
```bash
git clone https://github.com/bhuvanmk/Rox.git
cd Rox
```

### 2️⃣ Backend setup
```bash
# copy env example and edit if needed
cp backend/.env.example backend/.env

# install dependencies
npm install --prefix backend

# run migrations (creates tables in SQLite)
npx sequelize-cli db:migrate --env development

# seed the database with demo data
node backend/src/seeders/seed.js
```

### 3️⃣ Frontend setup
```bash
cp frontend/.env.example frontend/.env   # (only needed if you change the API base URL)
npm install --prefix frontend
```

### 4️⃣ Environment variables (backend/.env)

| Variable | Description |
|----------|--------------|
| `DB_HOST` | Database host (`127.0.0.1` for SQLite dev) |
| `DB_USER` | DB user (unused for SQLite) |
| `DB_PASSWORD` | DB password (unused for SQLite) |
| `DB_NAME` | Database file name (`store_rating`) |
| `JWT_SECRET` | Secret used to sign JWTs (change to a strong random string) |
| `PORT` | Port Express listens on (default 5000) |

For production you would change `config/config.js` to use MySQL and update the `.env` accordingly.

---

## Running the Application

### Backend (API)
```bash
npm run dev --prefix backend   # nodemon watches src/
```
You should see:
```
Database connected
Server running on port 5000
```

### Frontend (React UI)
```bash
npm run dev --prefix frontend
```
Open **http://localhost:5173** in a browser.  
The UI will point to `http://localhost:5000/api/v1` (default from `frontend/.env`).

**Hot‑module reload** works for both sides – changes to the backend automatically restart via `nodemon`; Vite handles frontend HMR.

---

## Database & Seeding

The seed script creates:

| Role | Email | Password |
|------|-------|----------|
| **ADMIN** | `admin@example.com` | `Admin@123` |
| **OWNER** | `owner1@example.com` | `Owner1@123` |
| **OWNER** | `owner2@example.com` | `Owner2@123` |
| **USER** | `user1@example.com` | `User1@123` |
| **USER** | `user2@example.com` | `User2@123` |
| **USER** | `user3@example.com` | `User3@123` |

Three stores (two owned, one unassigned) and a few ratings are also inserted.

You can inspect `backend/src/seeders/seed.js` if you wish to modify or extend the data.

---

## API Reference

All routes are versioned under `/api/v1`.  
The API follows **REST** conventions and returns JSON:

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/auth/login` | Get JWT + basic user info | ❌ |
| `GET`  | `/auth/me`   | Return the authenticated user | ✅ |
| `GET`  | `/users` | Paginated, sortable, filterable list of all users (admin only) | ✅ (ADMIN) |
| `PUT`  | `/users/password` | Change own password | ✅ (any) |
| `GET`  | `/stores` | List stores with avg rating, searchable, sortable | ✅ (USER) |
| `POST` | `/stores` | Create a store (admin) | ✅ (ADMIN) |
| `PUT`  | `/ratings/store/:storeId` | Submit or update a rating (user) | ✅ (USER) |
| `GET`  | `/ratings/owner` | Owner view of all raters for their store | ✅ (OWNER) |
| `GET`  | `/dashboard/admin` | Totals for users, stores, ratings (admin) | ✅ (ADMIN) |
| `GET`  | `/dashboard/owner` | Owner’s store avg rating & stats | ✅ (OWNER) |

All list endpoints accept the common query parameters:

- `page` (default 1)  
- `limit` (default 20)  
- `sortBy` (any column name)  
- `order` (`asc` | `desc`)  
- Additional filters (`q` for free‑text, or specific fields like `name`, `address`)

---

## Frontend Overview

### Routing (React Router v6)

| Path | Component | Role |
|------|-----------|------|
| `/` | `Login.jsx` | All |
| `/signup` | `Signup.jsx` | All |
| `/admin/dashboard` | `AdminDashboard.jsx` | ADMIN |
| `/stores` | `UserStores.jsx` | USER |
| `/owner/dashboard` | `OwnerDashboard.jsx` | OWNER |
| `*` | `NotFound.jsx` | – |

### Core UI Pieces
- **`Navbar`** – shows user name, role, and a logout button.  
- **`ProtectedRoute`** – redirects unauthenticated users to `/`; enforces role‑based access.  
- **`DataTable`** – reusable sortable & paginated table component used across admin and user pages.  
- **`FormInput`** – input wrapper that displays inline validation errors.  
- **`RatingStars`** – 1‑5 star selector that calls the backend on click.  
- **`Toast`** – global notification system (success / error messages).  

### State Management
A simple **React context (`AuthContext`)** stores the JWT token in `localStorage` and provides `login`, `logout`, and `setUser` helpers.  
All API calls go through a central **Axios instance** with an interceptor that injects the `Authorization` header.

---

## Authentication & Authorization

1. **Login** → server validates credentials, signs a JWT (`expiresIn: 1d`) and returns `{ accessToken, user }`.  
2. **Client** stores the token in `localStorage` and sets it on every request via the Axios interceptor.  
3. **Backend middleware** (`authenticate`) verifies the token, attaches `req.user`.  
4. **Role middleware** (`authorize(...roles)`) ensures the user has the required role for the endpoint.

Passwords are never returned; they’re stored as a bcrypt hash (`password_hash`) in the DB.

---

## Security & Best Practices

| Concern | How we address it |
|---------|-------------------|
| **HTTP headers** | `helmet` adds secure defaults (CSP, HSTS, etc.) |
| **CORS** | Configured to allow only the frontend origin (`http://localhost:5173` or your production URL) |
| **Rate limiting** | `express-rate-limit` applied on `/auth/login` (5 req/min per IP) |
| **Password storage** | `bcrypt` with 10 salt rounds |
| **SQL injection** | All DB queries go through Sequelize (parameterized) |
| **Sensitive data leakage** | Never expose `password_hash` or JWT secret in responses |
| **Input validation** | `express-validator` on every mutating endpoint, mirrored on the client side |
| **Error handling** | Central `errorHandler` middleware returns consistent JSON with proper status codes |

---

## Future Improvements

- **Docker** compose file for dev/prod containers (Node + MySQL).  
- **CI/CD** pipeline (GitHub Actions) to run lint, tests, and automatic deployments.  
- **Unit / integration tests** (Jest + Supertest for backend, React Testing Library for UI).  
- **Production DB** – switch the Sequelize config back to MySQL, add migrations for production.  
- **Better UI** – pagination controls, search debounce, loading spinners, dark mode.  
- **Email verification / password reset** flow.  

---

## License

This project is released under the **MIT License** – feel free to fork, modify, and deploy.

---

### Quick start checklist

1. `git clone https://github.com/bhuvanmk/Rox.git && cd Rox`  
2. `npm install --prefix backend && npm install --prefix frontend`  
3. `cp backend/.env.example backend/.env && nano backend/.env` (set a strong `JWT_SECRET`)  
4. `npx sequelize-cli db:migrate --env development`  
5. `node backend/src/seeders/seed.js`  
6. `npm run dev --prefix backend` (keep it running)  
7. In a new terminal: `npm run dev --prefix frontend`  
8. Open **http://localhost:5173**, login with `admin@example.com / Admin@123` (or any seeded user)  

You now have a fully functional Store Rating Platform running locally! 🎉

--- 

