import { query } from '../config/db.js';
import skillEngine from '../services/skillEngine.service.js';

/**
 * GET /graph/:roleId
 * Returns the full skill graph for a role, with the current user's states.
 * Requires auth.
 *
 * Response shape:
 * {
 *   skills: [...],
 *   dependencies: [...],
 *   userStates: { [skillId]: 'locked'|'available'|'verified'|'failed' }
 * }
 */
const getGraphData = async (req, res, next) => {
    const { roleId } = req.params;
    const userId = req.user.id;

    try {
        // Fetch all skills (roleId is a placeholder for future role-based filtering)
        const skillsResult = await query(
            'SELECT id, skill_name, definition, why_needed, career_relevance FROM skills ORDER BY id ASC'
        );

        // Fetch all dependency edges
        const depsResult = await query(
            'SELECT skill_id, prerequisite_skill_id FROM skill_dependencies'
        );

        // Fetch this user's skill states
        const statesResult = await query(
            'SELECT skill_id, state FROM user_skill_state WHERE user_id = $1',
            [userId]
        );

        // Build a map: skillId → state
        const userStates = {};
        statesResult.rows.forEach(row => {
            userStates[row.skill_id] = row.state;
        });

        // For skills with no state recorded yet, default to 'locked'
        skillsResult.rows.forEach(skill => {
            if (!userStates[skill.id]) {
                userStates[skill.id] = 'locked';
            }
        });

        res.json({
            skills: skillsResult.rows,
            dependencies: depsResult.rows,
            userStates,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /graph/:roleId/init
 * Initialise skill states for the authenticated user for a given role.
 * Call this when a user selects a goal/role for the first time.
 * Requires auth.
 */
const initUserGraph = async (req, res, next) => {
    const userId = req.user.id;

    try {
        // Get all skill IDs (for now, all skills — later filter by roleId)
        const skillsResult = await query('SELECT id FROM skills');
        const skillIds = skillsResult.rows.map(r => r.id);

        await skillEngine.initialiseUserSkillStates(userId, skillIds);

        res.json({ message: 'Skill graph initialised for user.' });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /graph/progress
 * Returns summary progress stats for the authenticated user.
 * Requires auth.
 */
const getUserProgress = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const result = await query(
            `SELECT state, COUNT(*) AS count
             FROM user_skill_state
             WHERE user_id = $1
             GROUP BY state`,
            [userId]
        );

        const stats = { verified: 0, available: 0, locked: 0, failed: 0 };
        result.rows.forEach(row => {
            stats[row.state] = parseInt(row.count);
        });

        const total = await query('SELECT COUNT(*) AS count FROM skills');
        stats.total = parseInt(total.rows[0].count);

        res.json(stats);
    } catch (err) {
        next(err);
    }
};

export default { getGraphData, initUserGraph, getUserProgress };
