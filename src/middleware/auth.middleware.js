import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * Middleware: Verify JWT token from Authorization header.
 * Sets req.user = { id, email } on success.
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded; // { id, email, iat, exp }
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

export default authenticate;
