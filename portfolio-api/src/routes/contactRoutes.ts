// src/routes/contactRoutes.ts
import { Router } from 'express';
import { sendContactMessage } from '../controllers/contactController';

const router = Router();

router.route('/').post(sendContactMessage);

export default router;