/**
 * Verification Service
 * ─────────────────────────────────────────────────────────────────────────────
 * Abstraction layer for grading user skill submissions.
 *
 * Current implementation: Local logic (length check).
 * Production target:      AWS Lambda invocation.
 *
 * To switch to Lambda, set USE_LAMBDA=true in .env and ensure
 * LAMBDA_FUNCTION_NAME and AWS credentials are configured.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import config from '../config/config.js';

const USE_LAMBDA = process.env.USE_LAMBDA === 'true';

// Lazy-initialise Lambda client only when needed
let lambdaClient = null;
const getLambdaClient = () => {
    if (!lambdaClient) {
        lambdaClient = new LambdaClient({
            region: config.aws.region,
            credentials: config.aws.accessKeyId
                ? {
                    accessKeyId: config.aws.accessKeyId,
                    secretAccessKey: config.aws.secretAccessKey,
                }
                : undefined, // Use IAM role on EC2 if no explicit keys
        });
    }
    return lambdaClient;
};

/**
 * Grade a user submission for a given skill.
 *
 * @param {string} submission  - The user's submitted text / code
 * @param {number} skillId     - The skill being verified
 * @param {string} skillName   - Human-readable skill name (sent to Lambda)
 * @returns {Promise<{ status: 'pass'|'fail', feedback: string }>}
 */
const gradeSubmission = async (submission, skillId, skillName = '') => {
    if (USE_LAMBDA) {
        return await gradeWithLambda(submission, skillId, skillName);
    }
    return gradeLocally(submission);
};

// ─── Local Grader (Development / Fallback) ────────────────────────────────────
const gradeLocally = (submission) => {
    // Simple heuristic: submission must be at least 20 chars
    // Replace this with real logic or proper test cases per skill
    const passed = submission && submission.trim().length >= 20;
    return {
        status: passed ? 'pass' : 'fail',
        feedback: passed
            ? 'Verification passed! Your submission demonstrates understanding of the skill.'
            : 'Verification failed. Your submission is too short or incomplete. Please provide a more detailed answer.',
    };
};

// ─── AWS Lambda Grader (Production) ───────────────────────────────────────────
const gradeWithLambda = async (submission, skillId, skillName) => {
    const client = getLambdaClient();

    const payload = JSON.stringify({
        submission,
        skillId,
        skillName,
    });

    const command = new InvokeCommand({
        FunctionName: config.aws.lambda.functionName,
        Payload: Buffer.from(payload),
    });

    try {
        const response = await client.send(command);
        const resultPayload = JSON.parse(Buffer.from(response.Payload).toString());

        // Lambda is expected to return: { status: 'pass'|'fail', feedback: string }
        if (resultPayload.errorMessage) {
            throw new Error(`Lambda error: ${resultPayload.errorMessage}`);
        }

        return {
            status: resultPayload.status,
            feedback: resultPayload.feedback,
        };
    } catch (err) {
        console.error('[VerificationService] Lambda invocation failed:', err.message);
        // Fallback to local grader if Lambda fails
        console.warn('[VerificationService] Falling back to local grader.');
        return gradeLocally(submission);
    }
};

export default { gradeSubmission };
