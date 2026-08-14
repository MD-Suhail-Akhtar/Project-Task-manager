# Task Management System (MERN Stack)

## 🔗 Live Demo
   - **Frontend:** https://project-task-manager-frontend.onrender.com
   - **Backend API:** https://project-task-manager-backend-ap3c.onrender.com

   > Note: Hosted on Render's free tier — the backend may take 20–50 seconds to wake up on first load if it's been idle.

A full-stack task management app with authentication, CRUD operations, task categories, status tracking, and search/filter. Built for the Kinetrexa Software MERN Internship (Task 2).

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt

## Features
- User registration & login (JWT-based auth)
- Create, read, update, delete tasks
- Task categories: Work, Personal, Study, Health, Other
- Priority levels: Low, Medium, High
- Status tracking: Pending, In Progress, Completed
- Search (title/description) and filter by status/category
- Fully responsive UI

## Project Structure
```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── models/User.js, Task.js
│   ├── middleware/auth.js
│   ├── routes/authRoutes.js, taskRoutes.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── pages/Login.jsx, Register.jsx, Dashboard.jsx
    │   ├── components/Navbar.jsx, TaskForm.jsx, TaskItem.jsx
    │   ├── App.jsx, main.jsx, index.css
    └── .env.example
```

## Local Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI (from MongoDB Atlas) and JWT_SECRET (any random string)
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```
App runs on `http://localhost:5173`.

## Getting a MongoDB URI (free)
1. Go to https://www.mongodb.com/cloud/atlas/register and create a free cluster.
2. Click **Connect > Drivers**, copy the connection string.
3. Replace `<password>` with your database user's password, and add a database name, e.g.:
   `mongodb+srv://user:pass@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority`
4. In Atlas, under Network Access, add `0.0.0.0/0` (allow from anywhere) so your deployed backend can connect.

## Deployment

### Backend → Render
1. Push this repo to GitHub.
2. Go to https://render.com → New → Web Service → connect your repo.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel frontend URL once deployed).
7. Deploy — note the live backend URL, e.g. `https://your-app.onrender.com`.

### Frontend → Vercel
1. Go to https://vercel.com → New Project → import your repo.
2. Root directory: `frontend`
3. Framework preset: Vite
4. Add environment variable: `VITE_API_URL=https://your-app.onrender.com/api`
5. Deploy — Vercel gives you a live URL.

### After both are deployed
Go back to Render, update `CLIENT_URL` to your Vercel URL, and redeploy the backend so CORS allows requests from your frontend.

## API Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/tasks | List tasks (supports ?search=&status=&category=) | Yes |
| POST | /api/tasks | Create task | Yes |
| GET | /api/tasks/:id | Get single task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

## Database Schema

**User**: name, email (unique), password (hashed), timestamps

**Task**: user (ref), title, description, category (enum), priority (enum), status (enum), dueDate, timestamps

## 📸 Screenshots

### Login
![Login Page](./screenshots/login.png)

### Register
![Register Page](./screenshots/register.png)

### Dashboard
![Dashboard](./screenshots/dashboard1.png)
![Dashboard](./screenshots/dashboard2.png)
![Dashboard](./screenshots/dashboard3.png)


