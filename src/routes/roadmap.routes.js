import { Router } from 'express';
import roadmapController from '../controllers/roadmap.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// Protected routes MUST come BEFORE parameterized routes
router.get('/my-progress', authenticate, roadmapController.getMyProgress);
router.put('/nodes/:nodeId/progress', authenticate, roadmapController.updateNodeProgress);
router.post('/:roadmapId/start', authenticate, roadmapController.startRoadmap);
router.get('/:roadmapId/progress', authenticate, roadmapController.getRoadmapProgress);

// Public routes (parameterized routes come last)
router.get('/', roadmapController.getAllRoadmaps);
router.get('/:id', roadmapController.getRoadmapById);
router.get('/:roadmapId/nodes/:nodeId/resources', roadmapController.getNodeResources);

export default router;
