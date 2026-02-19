-- ============================================================
-- VLE - Extended Schema for Learning Resources & CV Builder
-- ============================================================

-- Learning Paths (Roadmaps)
CREATE TABLE IF NOT EXISTS learning_paths (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL UNIQUE,
    description     TEXT,
    icon            VARCHAR(50),
    category        VARCHAR(100),
    difficulty      VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_hours INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Topics within learning paths
CREATE TABLE IF NOT EXISTS topics (
    id              SERIAL PRIMARY KEY,
    path_id         INTEGER NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    order_index     INTEGER NOT NULL,
    estimated_hours INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Learning Resources (Videos & PDFs)
CREATE TABLE IF NOT EXISTS learning_resources (
    id              SERIAL PRIMARY KEY,
    topic_id        INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    resource_type   VARCHAR(50) NOT NULL CHECK (resource_type IN ('video', 'pdf', 'article')),
    title           VARCHAR(255) NOT NULL,
    url             TEXT NOT NULL,
    duration        INTEGER, -- in minutes for videos
    thumbnail       TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Progress Tracking
CREATE TABLE IF NOT EXISTS user_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id        INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    status          VARCHAR(50) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    started_at      TIMESTAMP WITH TIME ZONE,
    completed_at    TIMESTAMP WITH TIME ZONE,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, topic_id)
);

-- User Selected Learning Paths
CREATE TABLE IF NOT EXISTS user_learning_paths (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path_id         INTEGER NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, path_id)
);

-- CV/Resume Data
CREATE TABLE IF NOT EXISTS user_cv_data (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name       VARCHAR(255),
    email           VARCHAR(255),
    phone           VARCHAR(50),
    location        VARCHAR(255),
    summary         TEXT,
    linkedin        VARCHAR(255),
    github          VARCHAR(255),
    portfolio       VARCHAR(255),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- CV Work Experience
CREATE TABLE IF NOT EXISTS cv_experience (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company         VARCHAR(255) NOT NULL,
    position        VARCHAR(255) NOT NULL,
    start_date      DATE NOT NULL,
    end_date        DATE,
    is_current      BOOLEAN DEFAULT false,
    description     TEXT,
    order_index     INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CV Education
CREATE TABLE IF NOT EXISTS cv_education (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution     VARCHAR(255) NOT NULL,
    degree          VARCHAR(255) NOT NULL,
    field           VARCHAR(255),
    start_date      DATE,
    end_date        DATE,
    gpa             VARCHAR(20),
    order_index     INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CV Projects
CREATE TABLE IF NOT EXISTS cv_projects (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    technologies    TEXT[], -- Array of tech stack
    url             VARCHAR(255),
    github_url      VARCHAR(255),
    order_index     INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_topics_path_id ON topics(path_id);
CREATE INDEX IF NOT EXISTS idx_learning_resources_topic_id ON learning_resources(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_topic_id ON user_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user_id ON user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_cv_experience_user_id ON cv_experience(user_id);
CREATE INDEX IF NOT EXISTS idx_cv_education_user_id ON cv_education(user_id);
CREATE INDEX IF NOT EXISTS idx_cv_projects_user_id ON cv_projects(user_id);
