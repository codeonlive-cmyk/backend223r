/**
 * Seed Complete Roadmap Data
 * All career paths with phases, nodes, and YouTube resources
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
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: (process.env.NODE_ENV === 'production' || (process.env.DB_HOST && process.env.DB_HOST.includes('amazonaws.com'))) 
        ? { rejectUnauthorized: false } 
        : false,
});

// Import roadmap data
import { ROADMAPS_DATA } from './roadmapsData.js';

async function seedRoadmaps() {
    const client = await pool.connect();

    try {
        console.log('🚀 Starting roadmap seeding...\n');

        // Apply schema
        const schemaPath = path.join(__dirname, '../../schema_roadmaps.sql');
        const schema = readFileSync(schemaPath, 'utf8');
        await client.query(schema);
        console.log('✅ Roadmap schema applied\n');

        // Seed each roadmap
        for (const roadmap of ROADMAPS_DATA) {
            console.log(`📚 Seeding: ${roadmap.name}`);

            // Insert roadmap
            const roadmapResult = await client.query(
                `INSERT INTO roadmaps (name, description, icon, category, difficulty, estimated_hours)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (name) DO UPDATE SET
                    description = EXCLUDED.description,
                    icon = EXCLUDED.icon,
                    category = EXCLUDED.category,
                    difficulty = EXCLUDED.difficulty,
                    estimated_hours = EXCLUDED.estimated_hours
                 RETURNING id`,
                [roadmap.name, roadmap.description, roadmap.icon, roadmap.category, roadmap.difficulty, roadmap.estimated_hours]
            );

            const roadmapId = roadmapResult.rows[0].id;

            // Insert phases
            for (const phase of roadmap.phases) {
                const phaseResult = await client.query(
                    `INSERT INTO roadmap_phases (roadmap_id, phase_number, title, description)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (roadmap_id, phase_number) DO UPDATE SET
                        title = EXCLUDED.title,
                        description = EXCLUDED.description
                     RETURNING id`,
                    [roadmapId, phase.phase_number, phase.title, phase.description]
                );

                const phaseId = phaseResult.rows[0].id;
                console.log(`  ├─ ${phase.title}`);

                // Insert nodes
                for (let i = 0; i < phase.nodes.length; i++) {
                    const node = phase.nodes[i];
                    const nodeResult = await client.query(
                        `INSERT INTO roadmap_nodes (phase_id, title, description, order_index, estimated_hours)
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING id`,
                        [phaseId, node.title, node.description, i + 1, node.estimated_hours]
                    );

                    const nodeId = nodeResult.rows[0].id;

                    // Insert resources
                    for (const resource of node.resources) {
                        await client.query(
                            `INSERT INTO node_resources (node_id, resource_type, title, url, duration_minutes, provider)
                             VALUES ($1, $2, $3, $4, $5, $6)`,
                            [nodeId, resource.type, resource.title, resource.url, resource.duration_minutes, resource.provider]
                        );
                    }
                }
            }
            console.log(`  └─ ✓ Complete\n`);
        }

        console.log('✅ All roadmaps seeded successfully!\n');
    } catch (err) {
        console.error('❌ Error seeding roadmaps:', err.message);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

seedRoadmaps();
