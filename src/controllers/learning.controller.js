import { query } from '../config/db.js';

/**
 * GET /learning/paths
 * Get all learning paths with optional filtering
 */
const getAllPaths = async (req, res, next) => {
    try {
        const { category, difficulty } = req.query;
        
        let sql = 'SELECT * FROM learning_paths WHERE 1=1';
        const params = [];
        
        if (category) {
            params.push(category);
            sql += ` AND category = $${params.length}`;
        }
        
        if (difficulty) {
            params.push(difficulty);
            sql += ` AND difficulty = $${params.length}`;
        }
        
        sql += ' ORDER BY name';
        
        const result = await query(sql, params);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /learning/paths/:id
 * Get a specific learning path with all topics
 */
const getPathById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const pathResult = await query(
            'SELECT * FROM learning_paths WHERE id = $1',
            [id]
        );
        
        if (pathResult.rows.length === 0) {
            return res.status(404).json({ error: 'Learning path not found' });
        }
        
        const topicsResult = await query(
            'SELECT * FROM topics WHERE path_id = $1 ORDER BY order_index',
            [id]
        );
        
        const path = pathResult.rows[0];
        path.topics = topicsResult.rows;
        
        res.json(path);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /learning/topics/:id/resources
 * Get all resources for a specific topic
 */
const getTopicResources = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await query(
            'SELECT * FROM learning_resources WHERE topic_id = $1 ORDER BY created_at',
            [id]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /learning/enroll
 * Enroll user in a learning path
 * Body: { pathId }
 */
const enrollInPath = async (req, res, next) => {
    try {
        const { pathId } = req.body;
        const userId = req.user.id;
        
        await query(
            `INSERT INTO user_learning_paths (user_id, path_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, path_id) DO NOTHING`,
            [userId, pathId]
        );
        
        res.json({ message: 'Successfully enrolled in learning path' });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /learning/my-paths
 * Get all learning paths user is enrolled in
 */
const getMyPaths = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            `SELECT lp.*, ulp.enrolled_at
             FROM learning_paths lp
             JOIN user_learning_paths ulp ON lp.id = ulp.path_id
             WHERE ulp.user_id = $1
             ORDER BY ulp.enrolled_at DESC`,
            [userId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /learning/progress
 * Update user progress on a topic
 * Body: { topicId, status, progressPercent }
 */
const updateProgress = async (req, res, next) => {
    try {
        const { topicId, status, progressPercent } = req.body;
        const userId = req.user.id;
        
        const now = new Date();
        const completedAt = status === 'completed' ? now : null;
        
        await query(
            `INSERT INTO user_progress (user_id, topic_id, status, progress_percent, started_at, completed_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (user_id, topic_id) DO UPDATE SET
                status = EXCLUDED.status,
                progress_percent = EXCLUDED.progress_percent,
                completed_at = EXCLUDED.completed_at,
                updated_at = EXCLUDED.updated_at`,
            [userId, topicId, status, progressPercent, now, completedAt, now]
        );
        
        res.json({ message: 'Progress updated successfully' });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /learning/progress/:pathId
 * Get user's progress for a specific learning path
 */
const getPathProgress = async (req, res, next) => {
    try {
        const { pathId } = req.params;
        const userId = req.user.id;
        
        const result = await query(
            `SELECT t.*, up.status, up.progress_percent, up.started_at, up.completed_at
             FROM topics t
             LEFT JOIN user_progress up ON t.id = up.topic_id AND up.user_id = $1
             WHERE t.path_id = $2
             ORDER BY t.order_index`,
            [userId, pathId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

export default {
    getAllPaths,
    getPathById,
    getTopicResources,
    enrollInPath,
    getMyPaths,
    updateProgress,
    getPathProgress
};
