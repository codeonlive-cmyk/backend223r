/**
 * AWS Lambda Function for VLE Course Verification
 * 
 * This function evaluates user submissions for course topics
 * and provides intelligent feedback based on the content.
 */

export const handler = async (event) => {
    try {
        const { submission, skillId, skillName, topicTitle, topicDescription } = event;

        // Validate input
        if (!submission || typeof submission !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    status: 'fail',
                    feedback: 'Invalid submission format'
                })
            };
        }

        // Evaluation criteria
        const minLength = 50;
        const submissionLength = submission.trim().length;
        const wordCount = submission.trim().split(/\s+/).length;
        
        // Check for code patterns (for programming topics)
        const hasCodePatterns = /```|function|class|def |import |const |let |var |=>/.test(submission);
        
        // Check for explanation patterns
        const hasExplanation = /because|therefore|thus|however|example|such as|for instance/i.test(submission);
        
        // Scoring system
        let score = 0;
        let feedback = [];
        
        // Length check
        if (submissionLength >= minLength) {
            score += 30;
        } else {
            feedback.push(`Your submission is too short (${submissionLength} characters). Aim for at least ${minLength} characters.`);
        }
        
        // Word count check
        if (wordCount >= 20) {
            score += 20;
        } else {
            feedback.push(`Provide more detail. Current word count: ${wordCount}, recommended: 20+`);
        }
        
        // Code demonstration (for technical topics)
        if (skillName && (skillName.toLowerCase().includes('python') || 
            skillName.toLowerCase().includes('programming') ||
            skillName.toLowerCase().includes('code'))) {
            if (hasCodePatterns) {
                score += 30;
                feedback.push('✓ Good code demonstration');
            } else {
                feedback.push('Include code examples to demonstrate your understanding');
            }
        } else {
            score += 30; // Not a coding topic, give points anyway
        }
        
        // Explanation quality
        if (hasExplanation) {
            score += 20;
            feedback.push('✓ Clear explanation provided');
        } else {
            feedback.push('Add more explanation about the concepts');
        }
        
        // Determine pass/fail (70% threshold)
        const passed = score >= 70;
        
        // Generate final feedback
        let finalFeedback;
        if (passed) {
            finalFeedback = `Verification Passed! (Score: ${score}/100)\n\n` +
                `Great work on "${topicTitle}"! Your submission demonstrates understanding of the topic.\n\n` +
                (feedback.length > 0 ? `Strengths:\n${feedback.filter(f => f.startsWith('✓')).join('\n')}` : '');
        } else {
            finalFeedback = ` Verification Failed (Score: ${score}/100)\n\n` +
                `Your submission for "${topicTitle}" needs improvement.\n\n` +
                `Areas to improve:\n${feedback.filter(f => !f.startsWith('✓')).join('\n')}\n\n` +
                `Please review the learning resources and try again.`;
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: passed ? 'pass' : 'fail',
                feedback: finalFeedback,
                score: score,
                details: {
                    submissionLength,
                    wordCount,
                    hasCodePatterns,
                    hasExplanation
                }
            })
        };
        
    } catch (error) {
        console.error('Verification error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                feedback: 'An error occurred during verification. Please try again.'
            })
        };
    }
};
