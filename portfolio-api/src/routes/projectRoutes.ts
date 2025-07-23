// src/routes/projectRoutes.ts
import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.route('/').get(getProjects);

// Protected admin routes
router.route('/').post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

export default router;