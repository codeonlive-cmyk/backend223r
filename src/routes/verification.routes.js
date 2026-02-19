import { Router } from 'express';
import verificationController from '../controllers/verification.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// All verification routes require authentication
router.use(authenticate);

router.post('/:skillId', verificationController.submitAttempt);

export default router;
