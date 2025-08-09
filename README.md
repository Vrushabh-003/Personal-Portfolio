# Vrushabh Shirke - Full-Stack Developer Portfolio

![Portfolio Screenshot](https://via.placeholder.com/1200x600.png?text=Your+Portfolio+Screenshot+Here)

This repository contains the source code for my personal portfolio website. It is a full-stack application built from scratch, featuring a modern, animated frontend and a complete backend with its own Content Management System (CMS).

<!-- **Live Demo:** [**[YOUR LIVE DEMO URL HERE]**](https://your-portfolio-url.com) -->

---

## ✨ Features

- **Fully Dynamic Content:** All project, achievement, and blog data is managed via a custom-built backend and admin dashboard.
- **Secure Admin Panel:** A protected, password-only dashboard for all CRUD (Create, Read, Update, Delete) operations.
- **Advanced Animations:** Built with Framer Motion for a fluid and engaging user experience, including a 3D tilting project card effect, a shrinking "frosted glass" header, a custom trailing cursor, and an animated hero background.
- **Blog & Achievements:** A complete, functional blog and achievements system.
- **Responsive Design:** A beautiful and functional layout on all devices.
- **Dark/Light Mode:** A theme toggle for user preference.
- **Functional Contact Form:** An API endpoint that handles contact form submissions.
CRM

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or later)
- npm
- A MongoDB Atlas account

### 1. Backend Setup (`portfolio-api`)
```bash
  # Navigate to the backend folder
  cd portfolio-api
  
  # Install dependencies
  npm install
  
  # Create a .env file and add your MONGO_URI and JWT_SECRET
  
  # Run the seeder script to populate the database
  # (Remember to set your admin credentials in src/seeder.ts first)
  npm run seed
  
  # Start the backend server
  npm run dev
  
  The API will be running on http://localhost:5000.
```

### 2. Frontend Setup (portfolio-client)
```bash

# Open a new terminal and navigate to the frontend folder
cd portfolio-client

# Install dependencies
npm install

# Start the frontend development server
npm run dev

The application will be running on http://localhost:5173.
```
Contact
[Vrushabh Shirke](https://in.linkedin.com/in/vrushabhshirke)
