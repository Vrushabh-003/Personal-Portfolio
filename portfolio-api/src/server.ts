// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

// Import route files
import projectRoutes from './routes/projectRoutes'; 
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes'; 
import achievementRoutes from './routes/achievementRoutes'; 
import contactRoutes from './routes/contactRoutes'; 
import experienceRoutes from './routes/experienceRoutes';
import leadershipRoutes from './routes/leadershipRoutes';

dotenv.config();
connectDB();

const app = express();

// Use the cors middleware

const allowedOrigins = [
  'https://vrushabhshirke.netlify.app', // live frontend
  'http://localhost:5173'             // local development frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());

// Simple welcome route
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/leadership', leadershipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));