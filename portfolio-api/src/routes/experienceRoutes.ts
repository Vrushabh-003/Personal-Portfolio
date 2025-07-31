// portfolio-api/src/routes/experienceRoutes.ts
import { Router } from 'express';
import { 
    getExperiences, 
    getExperienceById, 
    createExperience, 
    updateExperience, 
    deleteExperience, 
    reorderExperiences // <-- IMPORT ADDED
} from '../controllers/experienceController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/reorder').put(protect, reorderExperiences); // <-- ROUTE ADDED
router.route('/').get(getExperiences).post(protect, createExperience);
router.route('/:id').get(getExperienceById).put(protect, updateExperience).delete(protect, deleteExperience);

export default router;