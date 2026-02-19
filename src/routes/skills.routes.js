import { Router } from 'express';
import skillsController from '../controllers/skills.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// Public: get skill catalog
router.get('/', skillsController.getAllSkills);
router.get('/:id', skillsController.getSkillById);

// Protected: user-specific skill data
router.get('/:id/state', authenticate, skillsController.getSkillState);
router.get('/:id/attempts', authenticate, skillsController.getSkillAttempts);

export default router;
