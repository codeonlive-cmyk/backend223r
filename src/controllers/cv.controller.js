import { query } from '../config/db.js';

/**
 * GET /cv/profile
 * Get user's CV profile data
 */
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            'SELECT * FROM user_cv_data WHERE user_id = $1',
            [userId]
        );
        
        if (result.rows.length === 0) {
            // Return empty profile structure
            return res.json({
                full_name: '',
                email: req.user.email,
                phone: '',
                location: '',
                summary: '',
                linkedin: '',
                github: '',
                portfolio: ''
            });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /cv/profile
 * Update user's CV profile data
 */
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { full_name, email, phone, location, summary, linkedin, github, portfolio } = req.body;
        
        await query(
            `INSERT INTO user_cv_data (user_id, full_name, email, phone, location, summary, linkedin, github, portfolio, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
             ON CONFLICT (user_id) DO UPDATE SET
                full_name = EXCLUDED.full_name,
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                location = EXCLUDED.location,
                summary = EXCLUDED.summary,
                linkedin = EXCLUDED.linkedin,
                github = EXCLUDED.github,
                portfolio = EXCLUDED.portfolio,
                updated_at = NOW()`,
            [userId, full_name, email, phone, location, summary, linkedin, github, portfolio]
        );
        
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /cv/experience
 * Get all work experience entries
 */
const getExperience = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            'SELECT * FROM cv_experience WHERE user_id = $1 ORDER BY order_index, start_date DESC',
            [userId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /cv/experience
 * Add work experience entry
 */
const addExperience = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { company, position, start_date, end_date, is_current, description, order_index } = req.body;
        
        const result = await query(
            `INSERT INTO cv_experience (user_id, company, position, start_date, end_date, is_current, description, order_index)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [userId, company, position, start_date, end_date || null, is_current, description, order_index || 0]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /cv/experience/:id
 * Update work experience entry
 */
const updateExperience = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { company, position, start_date, end_date, is_current, description, order_index } = req.body;
        
        const result = await query(
            `UPDATE cv_experience SET
                company = $1, position = $2, start_date = $3, end_date = $4,
                is_current = $5, description = $6, order_index = $7
             WHERE id = $8 AND user_id = $9
             RETURNING *`,
            [company, position, start_date, end_date, is_current, description, order_index, id, userId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Experience entry not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /cv/experience/:id
 * Delete work experience entry
 */
const deleteExperience = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const result = await query(
            'DELETE FROM cv_experience WHERE id = $1 AND user_id = $2 RETURNING id',
            [id, userId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Experience entry not found' });
        }
        
        res.json({ message: 'Experience deleted successfully' });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /cv/education
 * Get all education entries
 */
const getEducation = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            'SELECT * FROM cv_education WHERE user_id = $1 ORDER BY order_index, end_date DESC',
            [userId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /cv/education
 * Add education entry
 */
const addEducation = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { institution, degree, field, start_date, end_date, gpa, order_index } = req.body;
        
        const result = await query(
            `INSERT INTO cv_education (user_id, institution, degree, field, start_date, end_date, gpa, order_index)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [userId, institution, degree, field, start_date, end_date, gpa, order_index || 0]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /cv/projects
 * Get all project entries
 */
const getProjects = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            'SELECT * FROM cv_projects WHERE user_id = $1 ORDER BY order_index, created_at DESC',
            [userId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /cv/projects
 * Add project entry
 */
const addProject = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { title, description, technologies, url, github_url, order_index } = req.body;
        
        const result = await query(
            `INSERT INTO cv_projects (user_id, title, description, technologies, url, github_url, order_index)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [userId, title, description, technologies, url, github_url, order_index || 0]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /cv/verified-skills
 * Get user's verified skills for CV
 */
const getVerifiedSkills = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await query(
            `SELECT s.skill_name, s.definition, uss.updated_at as verified_at
             FROM user_skill_state uss
             JOIN skills s ON uss.skill_id = s.id
             WHERE uss.user_id = $1 AND uss.state = 'verified'
             ORDER BY uss.updated_at DESC`,
            [userId]
        );
        
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /cv/generate
 * Generate complete CV data for export
 */
const generateCV = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        // Get all CV data
        const [profile, experience, education, projects, skills] = await Promise.all([
            query('SELECT * FROM user_cv_data WHERE user_id = $1', [userId]),
            query('SELECT * FROM cv_experience WHERE user_id = $1 ORDER BY order_index, start_date DESC', [userId]),
            query('SELECT * FROM cv_education WHERE user_id = $1 ORDER BY order_index, end_date DESC', [userId]),
            query('SELECT * FROM cv_projects WHERE user_id = $1 ORDER BY order_index, created_at DESC', [userId]),
            query(`SELECT s.skill_name FROM user_skill_state uss
                   JOIN skills s ON uss.skill_id = s.id
                   WHERE uss.user_id = $1 AND uss.state = 'verified'`, [userId])
        ]);
        
        res.json({
            profile: profile.rows[0] || {},
            experience: experience.rows,
            education: education.rows,
            projects: projects.rows,
            skills: skills.rows.map(s => s.skill_name)
        });
    } catch (err) {
        next(err);
    }
};

export default {
    getProfile,
    updateProfile,
    getExperience,
    addExperience,
    updateExperience,
    deleteExperience,
    getEducation,
    addEducation,
    getProjects,
    addProject,
    getVerifiedSkills,
    generateCV
};
