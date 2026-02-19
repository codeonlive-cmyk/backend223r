/**
 * Storage Service
 * ─────────────────────────────────────────────────────────────────────────────
 * Abstraction layer for persisting user submissions.
 *
 * Current implementation: Stores submission text directly in PostgreSQL.
 * Production target:      Upload to AWS S3, store the S3 URL in PostgreSQL.
 *
 * To switch to S3, set USE_S3=true in .env and ensure
 * S3_BUCKET_NAME and AWS credentials are configured.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../config/config.js';

const USE_S3 = process.env.USE_S3 === 'true';

// Lazy-initialise S3 client only when needed
let s3Client = null;
const getS3Client = () => {
    if (!s3Client) {
        s3Client = new S3Client({
            region: config.aws.region,
            credentials: config.aws.accessKeyId
                ? {
                    accessKeyId: config.aws.accessKeyId,
                    secretAccessKey: config.aws.secretAccessKey,
                }
                : undefined, // Use IAM role on EC2 if no explicit keys
        });
    }
    return s3Client;
};

/**
 * Save a user's submission.
 *
 * @param {number} userId     - The user's ID
 * @param {number} skillId    - The skill being verified
 * @param {string} submission - The raw submission text / code
 * @returns {Promise<string>} - The stored reference (text or S3 URL)
 */
const saveSubmission = async (userId, skillId, submission) => {
    if (USE_S3) {
        return await saveToS3(userId, skillId, submission);
    }
    return saveLocally(submission);
};

// ─── Local Storage (Development / Fallback) ───────────────────────────────────
const saveLocally = (submission) => {
    // Simply return the submission text to be stored in the DB column
    return submission;
};

// ─── AWS S3 Storage (Production) ──────────────────────────────────────────────
const saveToS3 = async (userId, skillId, submission) => {
    const client = getS3Client();
    const timestamp = Date.now();
    const key = `submissions/user-${userId}/skill-${skillId}/${timestamp}.txt`;

    const command = new PutObjectCommand({
        Bucket: config.aws.s3.bucketName,
        Key: key,
        Body: submission,
        ContentType: 'text/plain',
        Metadata: {
            userId: String(userId),
            skillId: String(skillId),
        },
    });

    try {
        await client.send(command);
        const s3Url = `s3://${config.aws.s3.bucketName}/${key}`;
        console.log(`[StorageService] Submission saved to S3: ${s3Url}`);
        return s3Url;
    } catch (err) {
        console.error('[StorageService] S3 upload failed:', err.message);
        // Fallback: store text in DB
        console.warn('[StorageService] Falling back to local storage.');
        return saveLocally(submission);
    }
};

export default { saveSubmission };
