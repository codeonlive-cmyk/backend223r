import { Router } from 'express';
import learningController from '../controllers/learning.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/paths', learningController.getAllPaths);
router.get('/paths/:id', learningController.getPathById);
router.get('/topics/:id/resources', learningController.getTopicResources);

// Protected routes
router.post('/enroll', authenticate, learningController.enrollInPath);
router.get('/my-paths', authenticate, learningController.getMyPaths);
router.post('/progress', authenticate, learningController.updateProgress);
router.get('/progress/:pathId', authenticate, learningController.getPathProgress);

export default router;
