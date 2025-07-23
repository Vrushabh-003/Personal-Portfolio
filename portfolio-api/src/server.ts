// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

// Import route files
import projectRoutes from './routes/projectRoutes'; 
import authRoutes from './routes/authRoutes';
// Add imports for blogRoutes and achievementRoutes when you create them

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Simple welcome route
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/achievements', achievementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));