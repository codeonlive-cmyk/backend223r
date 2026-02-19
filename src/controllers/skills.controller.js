import { query } from '../config/db.js';
import skillEngine from '../services/skillEngine.service.js';

/**
 * GET /skills
 * Returns all skills in the catalog.
 */
const getAllSkills = async (req, res, next) => {
    try {
        const result = await query(
            'SELECT id, skill_name, definition, why_needed, career_relevance FROM skills ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /skills/:id
 * Returns a single skill by ID.
 */
const getSkillById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await query(
            'SELECT id, skill_name, definition, why_needed, career_relevance FROM skills WHERE id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /skills/:id/state
 * Returns the current user's state for a specific skill.
 * Requires auth.
 */
const getSkillState = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await query(
            'SELECT state FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
            [userId, id]
        );

        const state = result.rows.length > 0 ? result.rows[0].state : 'locked';
        res.json({ skillId: parseInt(id), state });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /skills/:id/attempts
 * Returns the current user's verification attempt history for a skill.
 * Requires auth.
 */
const getSkillAttempts = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await query(
            `SELECT id, status, created_at
             FROM verification_attempts
             WHERE user_id = $1 AND skill_id = $2
             ORDER BY created_at DESC`,
            [userId, id]
        );
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

export default { getAllSkills, getSkillById, getSkillState, getSkillAttempts };
