import skillEngine from '../services/skillEngine.service.js';

/**
 * POST /verify/:skillId
 * Submit a verification attempt for a skill.
 * Requires auth.
 *
 * Body: { submission: string }
 */
const submitAttempt = async (req, res, next) => {
    const { skillId } = req.params;
    const { submission } = req.body;
    const userId = req.user.id; // From JWT via auth middleware

    if (!submission || submission.trim() === '') {
        return res.status(400).json({ error: 'Submission content is required.' });
    }

    try {
        const result = await skillEngine.processSubmission(userId, parseInt(skillId), submission);
        res.json(result);
    } catch (err) {
        if (err.status === 400) {
            return res.status(400).json({ error: err.message });
        }
        next(err);
    }
};

export default { submitAttempt };
