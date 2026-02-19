import { Router } from 'express';
import roadmapController from '../controllers/roadmap.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', roadmapController.getAllRoadmaps);
router.get('/:id', roadmapController.getRoadmapById);
router.get('/:roadmapId/nodes/:nodeId/resources', roadmapController.getNodeResources);

// Protected routes (require authentication)
router.post('/:roadmapId/start', authenticate, roadmapController.startRoadmap);
router.get('/my-progress', authenticate, roadmapController.getMyProgress);
router.put('/nodes/:nodeId/progress', authenticate, roadmapController.updateNodeProgress);

export default router;
