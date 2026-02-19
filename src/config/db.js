import pg from 'pg';
import config from './config.js';

const { Pool } = pg;

// Create a connection pool to PostgreSQL (AWS RDS in production, local in dev)
const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl: config.db.ssl,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis,
    connectionTimeoutMillis: config.db.connectionTimeoutMillis,
});

// Log connection events
pool.on('connect', () => {
    console.log('[DB] New client connected to PostgreSQL pool');
});

pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client:', err.message);
});

/**
 * Execute a query using the pool.
 * @param {string} text - SQL query string with $1, $2 placeholders
 * @param {Array} params - Query parameters
 * @returns {Promise<pg.QueryResult>}
 */
export const query = async (text, params) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (config.app.env === 'development') {
        console.log(`[DB] Query executed in ${duration}ms | rows: ${result.rowCount}`);
    }
    return result;
};

/**
 * Get a dedicated client from the pool (for transactions).
 * Remember to call client.release() when done.
 * @returns {Promise<pg.PoolClient>}
 */
export const getClient = async () => {
    return await pool.connect();
};

export default pool;
