import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars first
dotenv.config();

import config from './config/config.js';
import pool from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import graphRoutes from './routes/graph.routes.js';
import verificationRoutes from './routes/verification.routes.js';
import learningRoutes from './routes/learning.routes.js';
import cvRoutes from './routes/cv.routes.js';
import roadmapRoutes from './routes/roadmap.routes.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

// ─── Global Middleware ─────────────────────────────────────────────────────────
app.use(cors({
    origin: config.app.frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'vle-backend',
        timestamp: new Date().toISOString(),
        environment: config.app.env,
    });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/skills', skillsRoutes);
app.use('/graph', graphRoutes);
app.use('/verify', verificationRoutes);
app.use('/learning', learningRoutes);
app.use('/cv', cvRoutes);
app.use('/roadmaps', roadmapRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ─── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = config.app.port;

app.listen(PORT, async () => {
    console.log(`\n🚀 VLE Backend running on port ${PORT}`);
    console.log(`   Environment : ${config.app.env}`);
    console.log(`   Frontend URL: ${config.app.frontendUrl}`);
    console.log(`   Health check: http://localhost:${PORT}/health\n`);

    // Test DB connection on startup
    try {
        const client = await pool.connect();
        console.log('✅ PostgreSQL connection pool ready.');
        client.release();
    } catch (err) {
        console.error('❌ PostgreSQL connection failed:', err.message);
        console.error('   Check your .env DB_* variables and ensure PostgreSQL is running.');
    }
});

export default app;
