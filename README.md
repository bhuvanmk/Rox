Store Rating Platform – Quick Overview

The Store Rating Platform is a web‑based application that lets ADMIN, OWNER, and USER roles rate and review retail stores.

Backend: Node.js / Express API with Sequelize (SQLite for development, MySQL for production), JWT‑based authentication, role‑based routing, request validation, and security middle‑wares (CORS, rate‑limiting, helmet).
Frontend: React + Vite UI styled with Tailwind CSS, using an Axios interceptor to attach JWTs, a React context for auth state, protected routes, and reusable components (data tables, rating stars, forms).
Key Requirements:
Secure login/signup with JWTs.
Role‑specific dashboards and permission checks.
CRUD operations for stores and ratings, with server‑side validation.
Sorting, filtering, and pagination of store listings.
Basic security hardening (Helmet, CORS, rate limiting) and input sanitisation.
