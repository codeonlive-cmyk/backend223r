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
 * @param {string} topicTitle  - Topic title for context
 * @param {string} topicDescription - Topic description for context
 * @returns {Promise<{ status: 'pass'|'fail', feedback: string }>}
 */
const gradeSubmission = async (submission, skillId, skillName = '', topicTitle = '', topicDescription = '') => {
    if (USE_LAMBDA) {
        return await gradeWithLambda(submission, skillId, skillName, topicTitle, topicDescription);
    }
    return gradeLocally(submission, skillName);
};

// ─── Local Grader (Development / Fallback) ────────────────────────────────────
const gradeLocally = (submission, skillName = '') => {
    // Enhanced local grading logic
    const submissionLength = submission.trim().length;
    const wordCount = submission.trim().split(/\s+/).length;
    const hasCodePatterns = /```|function|class|def |import |const |let |var |=>/.test(submission);
    
    let score = 0;
    let feedback = [];
    
    // Length check (30 points)
    if (submissionLength >= 50) {
        score += 30;
    } else {
        feedback.push(`Submission too short (${submissionLength} chars). Aim for 50+.`);
    }
    
    // Word count (20 points)
    if (wordCount >= 20) {
        score += 20;
    } else {
        feedback.push(`Add more detail (${wordCount} words). Aim for 20+.`);
    }
    
    // Code demonstration for programming topics (30 points)
    if (skillName && (skillName.toLowerCase().includes('python') || 
        skillName.toLowerCase().includes('programming'))) {
        if (hasCodePatterns) {
            score += 30;
        } else {
            feedback.push('Include code examples.');
        }
    } else {
        score += 30; // Not a coding topic
    }
    
    // Explanation quality (20 points)
    if (/because|therefore|example|such as/i.test(submission)) {
        score += 20;
    } else {
        feedback.push('Add more explanation.');
    }
    
    const passed = score >= 70;
    
    return {
        status: passed ? 'pass' : 'fail',
        feedback: passed
            ? ` Verification passed! (Score: ${score}/100)\n\nYour submission demonstrates understanding.`
            : ` Verification failed (Score: ${score}/100)\n\nImprove:\n${feedback.join('\n')}`,
    };
};

// ─── AWS Lambda Grader (Production) ───────────────────────────────────────────
const gradeWithLambda = async (submission, skillId, skillName, topicTitle, topicDescription) => {
    const client = getLambdaClient();

    const payload = JSON.stringify({
        submission,
        skillId,
        skillName,
        topicTitle,
        topicDescription,
    });

    const command = new InvokeCommand({
        FunctionName: config.aws.lambda.functionName,
        Payload: Buffer.from(payload),
    });

    try {
        const response = await client.send(command);
        const resultPayload = JSON.parse(Buffer.from(response.Payload).toString());

        // Lambda is expected to return: { statusCode, body: { status, feedback } }
        if (resultPayload.errorMessage) {
            throw new Error(`Lambda error: ${resultPayload.errorMessage}`);
        }

        const body = typeof resultPayload.body === 'string' 
            ? JSON.parse(resultPayload.body) 
            : resultPayload.body;

        return {
            status: body.status,
            feedback: body.feedback,
        };
    } catch (err) {
        console.error('[VerificationService] Lambda invocation failed:', err.message);
        // Fallback to local grader if Lambda fails
        console.warn('[VerificationService] Falling back to local grader.');
        return gradeLocally(submission, skillName);
    }
};

export default { gradeSubmission };
