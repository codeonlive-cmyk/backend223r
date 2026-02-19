import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authenticate, authController.getMe);

export default router;





