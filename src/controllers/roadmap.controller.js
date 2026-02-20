import { query } from '../config/db.js';

/**
 * GET /roadmaps
 * Get all available roadmaps
 */
export const getAllRoadmaps = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT id, name, description, icon, category, difficulty, estimated_hours
             FROM roadmaps
             ORDER BY name`
        );

        res.json({ roadmaps: result.rows });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /roadmaps/:id
 * Get a specific roadmap with all phases and nodes
 */
export const getRoadmapById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Get roadmap details
        const roadmapResult = await query(
            `SELECT * FROM roadmaps WHERE id = $1`,
            [id]
        );

        if (roadmapResult.rows.length === 0) {
            return res.status(404).json({ error: 'Roadmap not found' });
        }

        const roadmap = roadmapResult.rows[0];

        // Get phases
        const phasesResult = await query(
            `SELECT * FROM roadmap_phases 
             WHERE roadmap_id = $1 
             ORDER BY phase_number`,
            [id]
        );

        // Get nodes for each phase
        const phases = await Promise.all(phasesResult.rows.map(async (phase) => {
            const nodesResult = await query(
                `SELECT * FROM roadmap_nodes 
                 WHERE phase_id = $1 
                 ORDER BY order_index`,
                [phase.id]
            );

            return {
                ...phase,
                nodes: nodesResult.rows
            };
        }));

        res.json({
            ...roadmap,
            phases
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /roadmaps/:roadmapId/nodes/:nodeId/resources
 * Get learning resources for a specific node
 */
export const getNodeResources = async (req, res, next) => {
    const { nodeId } = req.params;

    try {
        const result = await query(
            `SELECT * FROM node_resources 
             WHERE node_id = $1 
             ORDER BY created_at`,
            [nodeId]
        );

        res.json({ resources: result.rows });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /roadmaps/:roadmapId/start
 * Start a roadmap (track user progress)
 */
export const startRoadmap = async (req, res, next) => {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    try {
        const result = await query(
            `INSERT INTO user_roadmap_progress (user_id, roadmap_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, roadmap_id) 
             DO UPDATE SET last_accessed = CURRENT_TIMESTAMP
             RETURNING *`,
            [userId, roadmapId]
        );

        res.json({ 
            message: 'Roadmap started successfully',
            progress: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /roadmaps/my-progress
 * Get user's progress across all roadmaps
 */
export const getMyProgress = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const result = await query(
            `SELECT 
                r.id, r.name, r.description, r.icon, r.category,
                urp.started_at, urp.last_accessed,
                COUNT(DISTINCT rn.id)::integer as total_nodes,
                COUNT(DISTINCT CASE WHEN unp.status = 'completed' THEN unp.node_id END)::integer as completed_nodes
             FROM user_roadmap_progress urp
             JOIN roadmaps r ON r.id = urp.roadmap_id
             LEFT JOIN roadmap_phases rp ON rp.roadmap_id = r.id
             LEFT JOIN roadmap_nodes rn ON rn.phase_id = rp.id
             LEFT JOIN user_node_progress unp ON unp.node_id = rn.id AND unp.user_id = urp.user_id
             WHERE urp.user_id = $1
             GROUP BY r.id, r.name, r.description, r.icon, r.category, urp.started_at, urp.last_accessed
             ORDER BY urp.last_accessed DESC`,
            [userId]
        );

        res.json({ roadmaps: result.rows });
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /roadmaps/nodes/:nodeId/progress
 * Update progress on a specific node
 */
export const updateNodeProgress = async (req, res, next) => {
    const { nodeId } = req.params;
    const { status } = req.body; // 'not_started', 'in_progress', 'completed', 'verified'
    const userId = req.user.id;

    if (!['not_started', 'in_progress', 'completed', 'verified'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        // Determine timestamps based on status
        const now = new Date();
        const startedAt = ['in_progress', 'completed', 'verified'].includes(status) ? now : null;
        const completedAt = ['completed', 'verified'].includes(status) ? now : null;

        // First check if record exists
        const existing = await query(
            `SELECT * FROM user_node_progress WHERE user_id = $1 AND node_id = $2`,
            [userId, nodeId]
        );

        let result;
        if (existing.rows.length > 0) {
            // Update existing record
            result = await query(
                `UPDATE user_node_progress 
                 SET status = $1,
                     started_at = COALESCE(started_at, $2),
                     completed_at = $3
                 WHERE user_id = $4 AND node_id = $5
                 RETURNING *`,
                [status, startedAt, completedAt, userId, nodeId]
            );
        } else {
            // Insert new record
            result = await query(
                `INSERT INTO user_node_progress (user_id, node_id, status, started_at, completed_at)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [userId, nodeId, status, startedAt, completedAt]
            );
        }

        res.json({ 
            message: 'Progress updated successfully',
            progress: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /roadmaps/:roadmapId/progress
 * Get user's progress for a specific roadmap
 */
export const getRoadmapProgress = async (req, res, next) => {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    try {
        const result = await query(
            `SELECT 
                unp.node_id,
                unp.status,
                unp.started_at,
                unp.completed_at
             FROM user_node_progress unp
             JOIN roadmap_nodes rn ON rn.id = unp.node_id
             JOIN roadmap_phases rp ON rp.id = rn.phase_id
             WHERE rp.roadmap_id = $1 AND unp.user_id = $2`,
            [roadmapId, userId]
        );

        res.json({ nodes: result.rows });
    } catch (err) {
        next(err);
    }
};

export default {
    getAllRoadmaps,
    getRoadmapById,
    getNodeResources,
    startRoadmap,
    getMyProgress,
    getRoadmapProgress,
    updateNodeProgress
};
