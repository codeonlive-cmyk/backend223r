import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

const config = {
    app: {
        port: parseInt(process.env.PORT) || 3001,
        env: process.env.NODE_ENV || 'development',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'vle_admin',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'vle_db',
        ssl: (process.env.NODE_ENV === 'production' || (process.env.DB_HOST && process.env.DB_HOST.includes('amazonaws.com')))
            ? { rejectUnauthorized: false }  // Required for AWS RDS
            : false,
        max: 10,                // Max pool connections
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        s3: {
            bucketName: process.env.S3_BUCKET_NAME || 'vle-submissions',
        },
        lambda: {
            functionName: process.env.LAMBDA_FUNCTION_NAME || 'vle-code-grader',
        },
    },
};

export default config;
