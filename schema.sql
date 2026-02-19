-- ============================================================
-- VLE - Verified Learning Engine
-- PostgreSQL Schema (for AWS RDS)
-- ============================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills catalog table
CREATE TABLE IF NOT EXISTS skills (
    id                  SERIAL PRIMARY KEY,
    skill_name          VARCHAR(255) NOT NULL,
    definition          TEXT,
    why_needed          TEXT,
    career_relevance    TEXT,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill dependency graph (DAG edges)
-- skill_id depends on prerequisite_skill_id
CREATE TABLE IF NOT EXISTS skill_dependencies (
    id                      SERIAL PRIMARY KEY,
    skill_id                INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    prerequisite_skill_id   INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(skill_id, prerequisite_skill_id)
);

-- Per-user skill state
-- state: 'locked' | 'available' | 'verified' | 'failed'
CREATE TABLE IF NOT EXISTS user_skill_state (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id    INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    state       VARCHAR(50) NOT NULL CHECK (state IN ('locked', 'available', 'verified', 'failed')),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

-- Verification attempt history
-- submission: text content or S3 URL (when USE_S3=true)
CREATE TABLE IF NOT EXISTS verification_attempts (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id    INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    submission  TEXT,
    status      VARCHAR(50) NOT NULL CHECK (status IN ('pass', 'fail')),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast user-skill lookups
CREATE INDEX IF NOT EXISTS idx_user_skill_state_user_id ON user_skill_state(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_attempts_user_id ON verification_attempts(user_id);
