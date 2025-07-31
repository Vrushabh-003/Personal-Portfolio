// portfolio-api/src/routes/blogRoutes.ts
import { Router } from 'express';
import { 
    getBlogs,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    reorderBlogs // <-- IMPORT ADDED
} from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/reorder').put(protect, reorderBlogs); // <-- ROUTE ADDED
router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/slug/:slug').get(getBlogBySlug);
router.route('/:id').get(protect, getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;