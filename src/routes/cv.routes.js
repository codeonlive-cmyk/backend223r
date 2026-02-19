import { Router } from 'express';
import cvController from '../controllers/cv.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

// All CV routes require authentication
router.use(authenticate);

// Profile
router.get('/profile', cvController.getProfile);
router.put('/profile', cvController.updateProfile);

// Experience
router.get('/experience', cvController.getExperience);
router.post('/experience', cvController.addExperience);
router.put('/experience/:id', cvController.updateExperience);
router.delete('/experience/:id', cvController.deleteExperience);

// Education
router.get('/education', cvController.getEducation);
router.post('/education', cvController.addEducation);

// Projects
router.get('/projects', cvController.getProjects);
router.post('/projects', cvController.addProject);

// Skills & Generation
router.get('/verified-skills', cvController.getVerifiedSkills);
router.get('/generate', cvController.generateCV);

export default router;
