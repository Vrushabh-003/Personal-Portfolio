// src/routes/blogRoutes.ts
import { Router } from 'express';
import { 
    getBlogs,
    getBlogBySlug,
    getBlogById, // Import new function
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.route('/').get(getBlogs);
router.route('/slug/:slug').get(getBlogBySlug);

// Protected Admin Routes
router.route('/').post(protect, createBlog);
router.route('/:id')
    .get(protect, getBlogById) // Add this protected GET route
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);

export default router;