import { Router } from 'express';
import { getProjects } from '../controllers/projectController';
// import { protect } from '../middleware/authMiddleware';

const router = Router();
router.route('/').get(getProjects);
// Add protected routes later: .post(protect, createProject);
export default router;