#  Dynamic Portfolio & Admin Dashboard

A full-stack dynamic portfolio application built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. It features a modern dark-themed UI and a secure Admin Dashboard to dynamically manage work experience, projects, and certifications.

---

## Features

- **Dynamic Content Management:** Add, update, and remove projects, work experience, and certifications in real-time.
- **Admin Authentication:** Secure JWT-based admin login with interactive modal overlay.
- **Responsive UI:** Fully responsive and styled using Tailwind CSS and Lucide React icons.
- **SPA Client Routing:** Configured for seamless navigation using React Router DOM.
- **Vercel & Render Ready:** Optimized deployment config for Vercel (Frontend) and Render (Backend).

---

##  Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Routing:** React Router DOM (v6+)
- **Hosting:** Vercel

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Hosting:** Render

---

##  Project Structure

```text
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── WhatsAppContact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vercel.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
