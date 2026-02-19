import { Router } from 'express';
import graphController from '../controllers/graph.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// All graph routes require authentication
router.use(authenticate);

router.get('/progress', graphController.getUserProgress);
router.get('/:roleId', graphController.getGraphData);
router.post('/:roleId/init', graphController.initUserGraph);

export default router;
