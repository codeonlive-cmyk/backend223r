-- ============================================================
-- VLE - Roadmap System Schema
-- Complete career path roadmaps with phases, nodes, and resources
-- ============================================================

-- Career Roadmaps (AI/ML Engineer, Backend Dev, Full Stack, etc.)
CREATE TABLE IF NOT EXISTS roadmaps (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(255) UNIQUE NOT NULL,
    description         TEXT,
    icon                VARCHAR(50),
    category            VARCHAR(100),
    difficulty          VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_hours     INTEGER,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Phases within each roadmap (e.g., "PHASE 1 - Programming & CS Foundations")
CREATE TABLE IF NOT EXISTS roadmap_phases (
    id                  SERIAL PRIMARY KEY,
    roadmap_id          INTEGER NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
    phase_number        INTEGER NOT NULL,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    UNIQUE(roadmap_id, phase_number)
);

-- Nodes/Topics within each phase (e.g., "Python Basics", "NumPy")
CREATE TABLE IF NOT EXISTS roadmap_nodes (
    id                  SERIAL PRIMARY KEY,
    phase_id            INTEGER NOT NULL REFERENCES roadmap_phases(id) ON DELETE CASCADE,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    order_index         INTEGER NOT NULL,
    estimated_hours     INTEGER,
    is_prerequisite     BOOLEAN DEFAULT false
);

-- Learning resources for each node (YouTube videos, articles, docs)
CREATE TABLE IF NOT EXISTS node_resources (
    id                  SERIAL PRIMARY KEY,
    node_id             INTEGER NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
    resource_type       VARCHAR(50) CHECK (resource_type IN ('video', 'article', 'documentation', 'course', 'practice')),
    title               VARCHAR(500) NOT NULL,
    url                 TEXT NOT NULL,
    duration_minutes    INTEGER,
    provider            VARCHAR(100),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User progress tracking for roadmaps
CREATE TABLE IF NOT EXISTS user_roadmap_progress (
    id                  SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    roadmap_id          INTEGER NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
    started_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, roadmap_id)
);

-- User progress on individual nodes
CREATE TABLE IF NOT EXISTS user_node_progress (
    id                  SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    node_id             INTEGER NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
    status              VARCHAR(50) CHECK (status IN ('not_started', 'in_progress', 'completed', 'verified')) DEFAULT 'not_started',
    started_at          TIMESTAMP WITH TIME ZONE,
    completed_at        TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, node_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_roadmap_phases_roadmap_id ON roadmap_phases(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_nodes_phase_id ON roadmap_nodes(phase_id);
CREATE INDEX IF NOT EXISTS idx_node_resources_node_id ON node_resources(node_id);
CREATE INDEX IF NOT EXISTS idx_user_roadmap_progress_user_id ON user_roadmap_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_node_progress_user_id ON user_node_progress(user_id);
