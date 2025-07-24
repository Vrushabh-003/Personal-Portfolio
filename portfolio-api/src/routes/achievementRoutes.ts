// src/routes/achievementRoutes.ts
import { Router } from 'express';
import { 
    getAchievements, 
    getAchievementById, 
    createAchievement, 
    updateAchievement, 
    deleteAchievement 
} from '../controllers/achievementController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(getAchievements).post(protect, createAchievement);
router.route('/:id').get(getAchievementById).put(protect, updateAchievement).delete(protect, deleteAchievement);

export default router;