/**
 * Skill Engine Service
 * ─────────────────────────────────────────────────────────────────────────────
 * Core business logic for skill progression:
 *   - processSubmission: validate eligibility → grade → store → update state
 *   - verifySkill:       mark skill verified → unlock dependent skills
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { getClient } from '../config/db.js';
import verificationService from './verification.service.js';
import storageService from './storage.service.js';

/**
 * Process a user's verification submission for a skill.
 *
 * Flow:
 *  1. Check skill is 'available' or 'failed' (not locked/already verified)
 *  2. Grade the submission (local or Lambda)
 *  3. Store the submission (DB or S3)
 *  4. Record the attempt in verification_attempts
 *  5. If pass → call verifySkill() to update state + unlock dependents
 *  6. If fail → update state to 'failed'
 *
 * @param {number} userId
 * @param {number} skillId
 * @param {string} submission
 * @returns {Promise<{ status: 'pass'|'fail', message: string }>}
 */
const processSubmission = async (userId, skillId, submission) => {
    const client = await getClient();

    try {
        await client.query('BEGIN');

        // 1. Check current skill state
        const stateResult = await client.query(
            'SELECT state FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
            [userId, skillId]
        );

        const currentState = stateResult.rows.length > 0
            ? stateResult.rows[0].state
            : 'locked';

        if (currentState === 'locked') {
            throw Object.assign(new Error('Skill is locked. Complete prerequisites first.'), { status: 400 });
        }

        if (currentState === 'verified') {
            // Already verified — still allow re-submission but don't change state
            console.log(`[SkillEngine] Skill ${skillId} already verified for user ${userId}. Allowing re-attempt.`);
        }

        // 2. Fetch skill metadata for grading context
        const skillResult = await client.query(
            'SELECT skill_name FROM skills WHERE id = $1',
            [skillId]
        );
        const skillName = skillResult.rows[0]?.skill_name || '';

        // 3. Grade the submission
        const gradeResult = await verificationService.gradeSubmission(submission, skillId, skillName);
        const { status, feedback } = gradeResult;

        // 4. Store the submission (returns text or S3 URL)
        const storedRef = await storageService.saveSubmission(userId, skillId, submission);

        // 5. Record attempt in verification_attempts
        await client.query(
            `INSERT INTO verification_attempts (user_id, skill_id, submission, status)
             VALUES ($1, $2, $3, $4)`,
            [userId, skillId, storedRef, status]
        );

        // 6. Update state based on result
        if (status === 'pass') {
            await client.query('COMMIT');
            // verifySkill uses its own transaction
            await verifySkill(userId, skillId);
            return { status: 'pass', message: feedback };
        } else {
            // Only update to 'failed' if not already verified
            if (currentState !== 'verified') {
                const existingState = await client.query(
                    'SELECT id FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
                    [userId, skillId]
                );
                if (existingState.rows.length > 0) {
                    await client.query(
                        'UPDATE user_skill_state SET state = $1 WHERE user_id = $2 AND skill_id = $3',
                        ['failed', userId, skillId]
                    );
                } else {
                    await client.query(
                        'INSERT INTO user_skill_state (user_id, skill_id, state) VALUES ($1, $2, $3)',
                        [userId, skillId, 'failed']
                    );
                }
            }
            await client.query('COMMIT');
            return { status: 'fail', message: feedback };
        }

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

/**
 * Mark a skill as verified for a user, then unlock dependent skills
 * whose ALL prerequisites are now verified.
 *
 * @param {number} userId
 * @param {number} skillId
 */
const verifySkill = async (userId, skillId) => {
    const client = await getClient();

    try {
        await client.query('BEGIN');

        // 1. Upsert: mark this skill as 'verified'
        const existing = await client.query(
            'SELECT id FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
            [userId, skillId]
        );

        if (existing.rows.length > 0) {
            await client.query(
                'UPDATE user_skill_state SET state = $1 WHERE user_id = $2 AND skill_id = $3',
                ['verified', userId, skillId]
            );
        } else {
            await client.query(
                'INSERT INTO user_skill_state (user_id, skill_id, state) VALUES ($1, $2, $3)',
                [userId, skillId, 'verified']
            );
        }

        // 2. Find all skills that depend on this skill
        const dependentsResult = await client.query(
            'SELECT skill_id FROM skill_dependencies WHERE prerequisite_skill_id = $1',
            [skillId]
        );
        const dependentSkillIds = dependentsResult.rows.map(r => r.skill_id);

        // 3. For each dependent skill, check if ALL its prerequisites are now verified
        for (const depId of dependentSkillIds) {
            const prereqsResult = await client.query(
                'SELECT prerequisite_skill_id FROM skill_dependencies WHERE skill_id = $1',
                [depId]
            );
            const prereqIds = prereqsResult.rows.map(r => r.prerequisite_skill_id);

            if (prereqIds.length === 0) continue;

            // Count how many prerequisites are verified for this user
            const verifiedResult = await client.query(
                `SELECT COUNT(*) AS count
                 FROM user_skill_state
                 WHERE user_id = $1
                   AND skill_id = ANY($2::int[])
                   AND state = 'verified'`,
                [userId, prereqIds]
            );
            const verifiedCount = parseInt(verifiedResult.rows[0].count);

            if (verifiedCount === prereqIds.length) {
                // All prerequisites verified → unlock this skill
                const currentState = await client.query(
                    'SELECT state FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
                    [userId, depId]
                );

                if (currentState.rows.length === 0) {
                    await client.query(
                        'INSERT INTO user_skill_state (user_id, skill_id, state) VALUES ($1, $2, $3)',
                        [userId, depId, 'available']
                    );
                } else if (currentState.rows[0].state === 'locked') {
                    await client.query(
                        'UPDATE user_skill_state SET state = $1 WHERE user_id = $2 AND skill_id = $3',
                        ['available', userId, depId]
                    );
                }
                // Don't overwrite 'verified' or 'failed' states
            }
        }

        await client.query('COMMIT');
        console.log(`[SkillEngine] Skill ${skillId} verified for user ${userId}. Dependents updated.`);

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

/**
 * Initialise skill states for a user when they select a goal.
 * Skills with no prerequisites → 'available'
 * All others → 'locked'
 *
 * @param {number} userId
 * @param {number[]} skillIds - All skill IDs for the chosen goal/role
 */
const initialiseUserSkillStates = async (userId, skillIds) => {
    const client = await getClient();

    try {
        await client.query('BEGIN');

        for (const skillId of skillIds) {
            // Check if already has a state
            const existing = await client.query(
                'SELECT id FROM user_skill_state WHERE user_id = $1 AND skill_id = $2',
                [userId, skillId]
            );
            if (existing.rows.length > 0) continue; // Don't overwrite existing progress

            // Check if this skill has any prerequisites
            const prereqs = await client.query(
                'SELECT id FROM skill_dependencies WHERE skill_id = $1',
                [skillId]
            );

            const initialState = prereqs.rows.length === 0 ? 'available' : 'locked';

            await client.query(
                'INSERT INTO user_skill_state (user_id, skill_id, state) VALUES ($1, $2, $3)',
                [userId, skillId, initialState]
            );
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

export default { processSubmission, verifySkill, initialiseUserSkillStates };
