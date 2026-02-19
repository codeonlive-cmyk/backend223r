/**
 * Global error handling middleware.
 * Must be registered LAST in Express (after all routes).
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Handle known error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    if (err.code === '23505') {
        // PostgreSQL unique constraint violation
        return res.status(409).json({ error: 'Resource already exists.' });
    }

    if (err.code === '23503') {
        // PostgreSQL foreign key violation
        return res.status(400).json({ error: 'Referenced resource does not exist.' });
    }

    // Default: 500 Internal Server Error
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error.',
    });
};

export default errorHandler;
