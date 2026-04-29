# Student Management System

Full-stack CRUD app — **React + Vite + TypeScript** (frontend) · **Node.js + Express + MongoDB + TypeScript** (backend).

---

## Project Structure

```
student-management/
├── backend/
│   ├── src/
│   │   ├── index.ts            # Server entry
│   │   ├── db.ts               # MongoDB connection
│   │   ├── routes.ts           # CRUD routes
│   │   ├── seed.ts             # Seed 5 sample students
│   │   ├── types.ts            # Shared interfaces
│   │   └── models/Student.ts   # Mongoose schema
│   ├── .env                    # Set your MONGO_URI here
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── index.html              # Vite entry point (root level)
    ├── vite.config.ts          # Vite + proxy config
    ├── tsconfig.json
    ├── package.json
    └── src/
        ├── index.tsx
        ├── App.tsx
        ├── types/index.ts
        ├── services/api.ts
        ├── hooks/useStudents.ts
        └── components/
            ├── StatsBar.tsx
            ├── SearchBar.tsx
            ├── StudentTable.tsx
            ├── StudentForm.tsx
            ├── DeleteConfirm.tsx
            └── Toast.tsx
```

---

## Quick Start

### 1. Backend

```bash
cd backend
npm install

# Edit .env — set your MongoDB URI:
# MONGO_URI=mongodb://localhost:27017/student_management

npm run seed    # optional: load 5 sample students
npm run dev     # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:3000
```

No `--legacy-peer-deps` needed. Vite works with TypeScript 5 out of the box.

---

## API Endpoints

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | /api/students               | Get all (search/filter) |
| GET    | /api/students/:id           | Get by ID               |
| POST   | /api/students               | Create student          |
| PUT    | /api/students/:id           | Update student          |
| DELETE | /api/students/:id           | Delete student          |
| GET    | /api/students/stats/summary | Dashboard stats         |
| GET    | /api/health                 | Health check            |

---

## Tech Stack

| Layer    | Technology                             |
|----------|----------------------------------------|
| Frontend | React 18, TypeScript 5, Vite, Axios   |
| Backend  | Node.js, Express, TypeScript           |
| Database | MongoDB + Mongoose                     |
