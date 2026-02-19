/**
 * Seed Learning Paths and Resources
 * Based on roadmap.sh structure with YouTube videos and PDFs
 */

import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

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

const LEARNING_PATHS = [
    {
        name: 'Frontend Developer',
        description: 'Master modern frontend development with React, TypeScript, and best practices',
        icon: '💻',
        category: 'Web Development',
        difficulty: 'beginner',
        estimated_hours: 200
    },
    {
        name: 'Backend Developer',
        description: 'Build scalable server-side applications with Node.js, databases, and APIs',
        icon: '⚙️',
        category: 'Web Development',
        difficulty: 'intermediate',
        estimated_hours: 250
    },
    {
        name: 'Full Stack Developer',
        description: 'Complete web development from frontend to backend and deployment',
        icon: '🚀',
        category: 'Web Development',
        difficulty: 'intermediate',
        estimated_hours: 400
    },
    {
        name: 'AI/ML Engineer',
        description: 'Build and deploy machine learning models and AI systems',
        icon: '🤖',
        category: 'AI & Data',
        difficulty: 'advanced',
        estimated_hours: 300
    },
    {
        name: 'Data Scientist',
        description: 'Extract insights from data using statistics, ML, and visualization',
        icon: '📊',
        category: 'AI & Data',
        difficulty: 'intermediate',
        estimated_hours: 280
    },
    {
        name: 'DevOps Engineer',
        description: 'Master CI/CD, cloud infrastructure, and automation',
        icon: '🔧',
        category: 'Infrastructure',
        difficulty: 'advanced',
        estimated_hours: 220
    }
];

const TOPICS_BY_PATH = {
    'Frontend Developer': [
        { title: 'HTML & CSS Fundamentals', description: 'Learn semantic HTML and modern CSS', estimated_hours: 20 },
        { title: 'JavaScript Basics', description: 'Master JavaScript fundamentals and ES6+', estimated_hours: 30 },
        { title: 'React Fundamentals', description: 'Build interactive UIs with React', estimated_hours: 40 },
        { title: 'TypeScript', description: 'Add type safety to your JavaScript', estimated_hours: 25 },
        { title: 'State Management', description: 'Redux, Context API, and Zustand', estimated_hours: 20 },
        { title: 'Next.js & SSR', description: 'Server-side rendering and static generation', estimated_hours: 30 },
        { title: 'Testing', description: 'Jest, React Testing Library, and E2E tests', estimated_hours: 20 },
        { title: 'Performance Optimization', description: 'Web vitals, lazy loading, and caching', estimated_hours: 15 }
    ],
    'Backend Developer': [
        { title: 'Node.js Fundamentals', description: 'Server-side JavaScript with Node.js', estimated_hours: 25 },
        { title: 'Express.js & APIs', description: 'Build RESTful APIs with Express', estimated_hours: 30 },
        { title: 'Database Design', description: 'SQL, PostgreSQL, and data modeling', estimated_hours: 35 },
        { title: 'Authentication & Security', description: 'JWT, OAuth, and security best practices', estimated_hours: 25 },
        { title: 'MongoDB & NoSQL', description: 'Document databases and Mongoose', estimated_hours: 20 },
        { title: 'GraphQL', description: 'Modern API design with GraphQL', estimated_hours: 25 },
        { title: 'Microservices', description: 'Distributed systems architecture', estimated_hours: 40 },
        { title: 'Testing & Documentation', description: 'API testing and Swagger/OpenAPI', estimated_hours: 20 }
    ],
    'AI/ML Engineer': [
        { title: 'Python for ML', description: 'Python fundamentals for data science', estimated_hours: 30 },
        { title: 'NumPy & Pandas', description: 'Data manipulation and analysis', estimated_hours: 25 },
        { title: 'Data Visualization', description: 'Matplotlib, Seaborn, and Plotly', estimated_hours: 15 },
        { title: 'Machine Learning Basics', description: 'Supervised and unsupervised learning', estimated_hours: 40 },
        { title: 'Deep Learning', description: 'Neural networks with TensorFlow/PyTorch', estimated_hours: 50 },
        { title: 'NLP', description: 'Natural language processing and transformers', estimated_hours: 40 },
        { title: 'Computer Vision', description: 'Image processing and CNNs', estimated_hours: 35 },
        { title: 'MLOps', description: 'Model deployment and monitoring', estimated_hours: 30 }
    ]
};

const RESOURCES_BY_TOPIC = {
    'HTML & CSS Fundamentals': [
        { type: 'video', title: 'HTML Full Course', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', duration: 240 },
        { type: 'video', title: 'CSS Complete Guide', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', duration: 180 },
        { type: 'pdf', title: 'HTML5 & CSS3 Cheat Sheet', url: 'https://websitesetup.org/wp-content/uploads/2019/10/WSU-HTML-Cheat-Sheet.pdf' }
    ],
    'JavaScript Basics': [
        { type: 'video', title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration: 480 },
        { type: 'video', title: 'Modern JavaScript ES6+', url: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc', duration: 120 },
        { type: 'pdf', title: 'JavaScript ES6 Guide', url: 'https://eloquentjavascript.net/Eloquent_JavaScript.pdf' }
    ],
    'React Fundamentals': [
        { type: 'video', title: 'React Course for Beginners', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: 720 },
        { type: 'video', title: 'React Hooks Tutorial', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0', duration: 90 },
        { type: 'pdf', title: 'React Documentation', url: 'https://react.dev' }
    ],
    'Node.js Fundamentals': [
        { type: 'video', title: 'Node.js Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', duration: 480 },
        { type: 'video', title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', duration: 90 },
        { type: 'pdf', title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' }
    ],
    'Python for ML': [
        { type: 'video', title: 'Python for Beginners', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', duration: 270 },
        { type: 'video', title: 'Python for Data Science', url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', duration: 720 },
        { type: 'pdf', title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' }
    ],
    'Machine Learning Basics': [
        { type: 'video', title: 'Machine Learning Course', url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU', duration: 600 },
        { type: 'video', title: 'ML Algorithms Explained', url: 'https://www.youtube.com/watch?v=7eh4d6sabA0', duration: 180 },
        { type: 'pdf', title: 'Introduction to ML', url: 'https://www.statlearning.com' }
    ]
};

async function seedLearningData() {
    const client = await pool.connect();

    try {
        console.log('🌱 Seeding learning paths and resources...\n');

        // Insert learning paths
        for (const path of LEARNING_PATHS) {
            const result = await client.query(
                `INSERT INTO learning_paths (name, description, icon, category, difficulty, estimated_hours)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (name) DO UPDATE SET
                    description = EXCLUDED.description,
                    icon = EXCLUDED.icon,
                    category = EXCLUDED.category,
                    difficulty = EXCLUDED.difficulty,
                    estimated_hours = EXCLUDED.estimated_hours
                 RETURNING id`,
                [path.name, path.description, path.icon, path.category, path.difficulty, path.estimated_hours]
            );

            const pathId = result.rows[0].id;
            console.log(`✓ ${path.name}`);

            // Insert topics for this path
            const topics = TOPICS_BY_PATH[path.name] || [];
            for (let i = 0; i < topics.length; i++) {
                const topic = topics[i];
                const topicResult = await client.query(
                    `INSERT INTO topics (path_id, title, description, order_index, estimated_hours)
                     VALUES ($1, $2, $3, $4, $5)
                     ON CONFLICT DO NOTHING
                     RETURNING id`,
                    [pathId, topic.title, topic.description, i + 1, topic.estimated_hours]
                );

                if (topicResult.rows.length > 0) {
                    const topicId = topicResult.rows[0].id;
                    console.log(`  → ${topic.title}`);

                    // Insert resources for this topic
                    const resources = RESOURCES_BY_TOPIC[topic.title] || [];
                    for (const resource of resources) {
                        await client.query(
                            `INSERT INTO learning_resources (topic_id, resource_type, title, url, duration)
                             VALUES ($1, $2, $3, $4, $5)
                             ON CONFLICT DO NOTHING`,
                            [topicId, resource.type, resource.title, resource.url, resource.duration || null]
                        );
                        console.log(`    • ${resource.title} (${resource.type})`);
                    }
                }
            }
            console.log('');
        }

        console.log('✅ Learning data seeded successfully!\n');
    } catch (err) {
        console.error('❌ Error seeding learning data:', err.message);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

seedLearningData();
