// portfolio-api/src/routes/leadershipRoutes.ts
import { Router } from 'express';
import {
    getLeadershipRoles,
    getLeadershipRoleById,
    createLeadershipRole,
    updateLeadershipRole,
    deleteLeadershipRole,
    reorderLeadershipRoles
} from '../controllers/leadershipController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .get(getLeadershipRoles)
    .post(protect, createLeadershipRole);

router.route('/:id')
    .get(getLeadershipRoleById)
    .put(protect, updateLeadershipRole)
    .delete(protect, deleteLeadershipRole);

router.route('/reorder')
    .put(protect, reorderLeadershipRoles);

export default router;