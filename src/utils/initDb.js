/**
 * Database Initialisation Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Run with: node src/utils/initDb.js
 *
 * This script:
 *  1. Creates all tables (using IF NOT EXISTS — safe to re-run)
 *  2. Seeds the skills catalog if empty
 *  3. Seeds skill dependencies
 * ─────────────────────────────────────────────────────────────────────────────
 */

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
    user: process.env.DB_USER || 'vle_admin',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'vle_db',
    ssl: (process.env.NODE_ENV === 'production' || (process.env.DB_HOST && process.env.DB_HOST.includes('amazonaws.com'))) ? { rejectUnauthorized: false } : false,
});

const SKILLS_SEED = [
    {
        skill_name: 'Python Basics',
        definition: 'The fundamental syntax and structures of Python required to write simple, correct programs.',
        why_needed: 'Without Python basics, you cannot preprocess data, write ML pipelines, or debug model code.',
        career_relevance: 'Required for 99% of data science and AI/ML jobs. Tested in almost every technical interview.',
    },
    {
        skill_name: 'Git & Version Control',
        definition: 'A system for tracking changes in code and collaborating with other developers.',
        why_needed: 'Without Git, you cannot safely collaborate on code, roll back mistakes, or contribute to open-source projects.',
        career_relevance: 'Essential for every software engineering role. Used daily in all professional development environments.',
    },
    {
        skill_name: 'Data Structures',
        definition: 'Ways of organising data in memory for efficient access and modification (arrays, lists, dicts, trees, graphs).',
        why_needed: 'Without data structures, you cannot write efficient algorithms or solve complex programming problems.',
        career_relevance: 'Core topic in every software engineering interview. Required for algorithm design and system performance.',
    },
    {
        skill_name: 'NumPy Fundamentals',
        definition: 'A Python library for numerical computing, providing support for arrays, matrices, and mathematical operations.',
        why_needed: 'Without NumPy, you cannot efficiently process numerical data, perform matrix operations, or work with ML frameworks.',
        career_relevance: 'Basis of most ML libraries (TensorFlow, PyTorch). Tested in AI/ML and data science interviews.',
    },
    {
        skill_name: 'Pandas Basics',
        definition: 'A Python library for data manipulation and analysis, built on top of NumPy.',
        why_needed: 'Without Pandas, you cannot clean, transform, or analyse tabular data — the most common data format in industry.',
        career_relevance: 'Standard tool for data analysis. Required for data science, ML engineering, and analytics roles.',
    },
    {
        skill_name: 'SQL Basics',
        definition: 'Structured Query Language for interacting with relational databases.',
        why_needed: 'Without SQL, you cannot fetch, filter, or aggregate data from databases — where most real-world data lives.',
        career_relevance: 'Required to fetch training data, build reports, and work with production databases in any data role.',
    },
    {
        skill_name: 'Machine Learning Basics',
        definition: 'Core concepts of supervised and unsupervised learning, model training, and evaluation.',
        why_needed: 'Without ML basics, you cannot build, train, or evaluate any machine learning model.',
        career_relevance: 'Foundation of all AI/ML engineering roles. Required for every ML interview and project.',
    },
    {
        skill_name: 'Statistics for ML',
        definition: 'Probability, distributions, hypothesis testing, and statistical inference applied to machine learning.',
        why_needed: 'Without statistics, you cannot understand model behaviour, evaluate results, or debug ML systems.',
        career_relevance: 'Tested in data science and ML interviews. Required for feature engineering and model evaluation.',
    },
];

// skill_name → skill_name (prerequisite)
const DEPENDENCY_SEED = [
    { skill: 'NumPy Fundamentals', requires: 'Python Basics' },
    { skill: 'Pandas Basics', requires: 'NumPy Fundamentals' },
    { skill: 'Machine Learning Basics', requires: 'NumPy Fundamentals' },
    { skill: 'Machine Learning Basics', requires: 'Pandas Basics' },
    { skill: 'Statistics for ML', requires: 'Python Basics' },
];

async function initDb() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to PostgreSQL.');

        // 1. Run schema
        const schemaPath = path.join(__dirname, '../../schema.sql');
        const schema = readFileSync(schemaPath, 'utf8');
        await client.query(schema);
        console.log('✅ Schema applied (tables created if not existing).');

        // 2. Seed skills if empty
        const countRes = await client.query('SELECT COUNT(*) AS count FROM skills');
        if (parseInt(countRes.rows[0].count) === 0) {
            console.log('🌱 Seeding skills...');
            for (const skill of SKILLS_SEED) {
                await client.query(
                    `INSERT INTO skills (skill_name, definition, why_needed, career_relevance)
                     VALUES ($1, $2, $3, $4)`,
                    [skill.skill_name, skill.definition, skill.why_needed, skill.career_relevance]
                );
            }
            console.log(`✅ Seeded ${SKILLS_SEED.length} skills.`);

            // 3. Seed dependencies
            console.log('🌱 Seeding skill dependencies...');
            for (const dep of DEPENDENCY_SEED) {
                const skillRes = await client.query('SELECT id FROM skills WHERE skill_name = $1', [dep.skill]);
                const prereqRes = await client.query('SELECT id FROM skills WHERE skill_name = $1', [dep.requires]);

                if (skillRes.rows.length > 0 && prereqRes.rows.length > 0) {
                    await client.query(
                        `INSERT INTO skill_dependencies (skill_id, prerequisite_skill_id)
                         VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                        [skillRes.rows[0].id, prereqRes.rows[0].id]
                    );
                }
            }
            console.log(`✅ Seeded ${DEPENDENCY_SEED.length} dependencies.`);
        } else {
            console.log('ℹ️  Skills already seeded. Skipping.');
        }

        console.log('\n🚀 Database initialisation complete!');
    } catch (err) {
        console.error('❌ Error during DB initialisation:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

initDb();
