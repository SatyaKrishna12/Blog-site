# MyBlog - Full-Stack Blog Platform

Welcome to **MyBlog**, a full-featured blogging platform built with the MERN stack and modern UI tools. This project supports user authentication, admin-only access, search functionality, and a clean responsive interface.

---
## Live Link -
https://blog-site-1-v49a.onrender.com/ 


## 🔥 Features

### 🔐 Authentication

* JWT-based secure login and registration
* Role-based access: Admin vs. User
* Protected admin routes
* Context-based authentication state

### 🧭 Navigation

* Dynamic navbar based on user role
* Responsive layout with mobile hamburger menu
* User dropdown menu with logout

### 🔍 Search Functionality

* Search bar in blog homepage
* Real-time filtering of blog posts by title/content
* Live match count and empty state handling

### 🛡️ Admin Features

* Admin Dashboard with protected access
* Create and edit blog posts
* Admin-only navigation items

### 🎨 UI/UX

* Tailwind CSS for styling
* Lucide icons for a modern look
* Loading spinners, animations, and error states
* Clean blog cards with excerpts and timestamps

---

## 📦 Tech Stack

### Frontend

* React + Vite
* React Router DOM
* Axios
* Lucide React
* Context API (Auth)

### Backend

* Node.js + Express
* MongoDB with Mongoose
* JWT Authentication
* CORS enabled for frontend communication

---

## 📁 Project Structure

### Frontend

```
/frontend
├── components
├── pages
├── context (AuthContext.js)
├── lib (auth utils)
├── App.jsx
└── main.jsx
```

### Backend

```
/backend
├── models
│   └── User.js
│   └── Post.js
├── routes
│   └── users.js
│   └── posts.js
├── middleware
│   └── auth.js
└── server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/blogforge.git
```

### 2. Install dependencies

#### Backend:

```
cd backend
npm install
```

#### Frontend:

```
cd frontend
npm install
```

### 3. Set up environment variables

#### Backend `.env`

```
JWT_SECRET="your-secret"
MONGO_URL=mongodb://localhost:27017/blog
```

#### Frontend `.env`

```
VITE_BASE_URL=http://localhost:5000/api
```

### 4. Start the servers

#### Backend:

```
npm run dev
```

#### Frontend:

```
npm run dev
```

---


