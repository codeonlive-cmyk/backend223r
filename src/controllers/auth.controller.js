import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import config from '../config/config.js';

/**
 * POST /auth/signup
 * Body: { name, email, password }
 */
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    try {
        // Check if user already exists
        const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert user
        const result = await query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, created_at`,
            [name, email, passwordHash]
        );

        const newUser = result.rows[0];

        // Generate JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        res.status(201).json({
            message: 'Account created successfully.',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.created_at,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /auth/login
 * Body: { email, password }
 */
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        // Fetch user
        const result = await query(
            'SELECT id, name, email, password_hash FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        res.json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /auth/me
 * Requires: Bearer token
 */
const getMe = async (req, res, next) => {
    try {
        const result = await query(
            'SELECT id, name, email, created_at FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = result.rows[0];
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.created_at,
        });
    } catch (err) {
        next(err);
    }
};

export default { signup, login, getMe };
