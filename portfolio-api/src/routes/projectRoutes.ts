// portfolio-api/src/routes/projectRoutes.ts
import { Router } from 'express';
import { 
    getProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject,
    reorderProjects,
    getAllProjectsForAdmin
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// --- Public & Admin GET Routes ---
// The specific '/all' route must come BEFORE the general '/:id' route.
router.route('/all').get(protect, getAllProjectsForAdmin); 
router.route('/').get(getProjects);
router.route('/:id').get(getProjectById);

// --- Protected Admin POST/PUT Routes ---
router.route('/reorder').put(protect, reorderProjects);
router.route('/').post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

export default router;
