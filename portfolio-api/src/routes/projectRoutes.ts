// src/routes/projectRoutes.ts
import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.route('/').get(getProjects);
router.route('/:id').get(getProjectById); // <-- This is the new route

// Protected admin routes
router.route('/').post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

export default router;