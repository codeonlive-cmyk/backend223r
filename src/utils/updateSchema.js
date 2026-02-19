import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: (process.env.NODE_ENV === 'production' || (process.env.DB_HOST && process.env.DB_HOST.includes('amazonaws.com'))) 
        ? { rejectUnauthorized: false } 
        : false,
});

async function updateSchema() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to PostgreSQL.');
        console.log('📝 Applying schema updates...\n');

        const schemaPath = path.join(__dirname, '../../schema_updates.sql');
        const schema = readFileSync(schemaPath, 'utf8');
        
        await client.query(schema);
        
        console.log('✅ Schema updates applied successfully!\n');
    } catch (err) {
        console.error('❌ Error updating schema:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

updateSchema();
