-- ============================================================================
-- K-12 Physics Web App - Complete SQLite DDL Schema
-- Tables: users, family_links, physics_topics, lessons, questions,
--         parent_assignments, quiz_submissions, student_gamification, study_sessions
-- ============================================================================

-- Enforce Foreign Key Constraints in SQLite
PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------------------------
-- 1. USERS TABLE
-- Stores administrative users, parents, and students
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('admin', 'parent', 'student')),
  grade INTEGER CHECK(grade IS NULL OR (grade >= 1 AND grade <= 12)),
  avatar TEXT,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_grade ON users(grade);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- ----------------------------------------------------------------------------
-- 2. FAMILY LINKS TABLE
-- Connects parent accounts with their student child accounts (M:N relationship)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS family_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT 'parent',
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  UNIQUE(parent_id, student_id),
  CHECK(parent_id != student_id)
);

CREATE INDEX IF NOT EXISTS idx_family_links_parent ON family_links(parent_id);
CREATE INDEX IF NOT EXISTS idx_family_links_student ON family_links(student_id);

-- ----------------------------------------------------------------------------
-- 3. PHYSICS TOPICS TABLE
-- Curriculum tree structure spanning 12 grades and 3 tiers:
--   - primary: Grades 1-5 (Everyday phenomena & visual science)
--   - middle / lower_secondary: Grades 6-9 (Inquiry, fundamental physics & logic)
--   - high / upper_secondary:   Grades 10-12 (Quantitative mechanics, electromagnetism & modern physics)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS physics_topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  grade INTEGER NOT NULL CHECK(grade >= 1 AND grade <= 12),
  tier TEXT NOT NULL CHECK(tier IN ('primary', 'middle', 'high', 'lower_secondary', 'upper_secondary')),
  order_num INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER DEFAULT 1,
  icon TEXT,
  parent_topic_id INTEGER REFERENCES physics_topics(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_topics_grade_tier ON physics_topics(grade, tier, order_num);
CREATE INDEX IF NOT EXISTS idx_topics_parent ON physics_topics(parent_topic_id);
CREATE INDEX IF NOT EXISTS idx_topics_slug ON physics_topics(slug);

-- ----------------------------------------------------------------------------
-- 4. LESSONS TABLE
-- Theoretical lesson units with rich Markdown/KaTeX and structured Parent Guides
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL REFERENCES physics_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  summary TEXT,
  parent_guide TEXT NOT NULL, -- JSON: { summary, misconceptions, guiding_questions, home_experiments }
  order_num INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER DEFAULT 1,
  estimated_duration_minutes INTEGER DEFAULT 15,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  UNIQUE(topic_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_lessons_topic_order ON lessons(topic_id, order_num);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);

-- ----------------------------------------------------------------------------
-- 5. QUESTIONS TABLE
-- Dual-mode questions: Multiple Choice (mcq) and Numeric Input (numeric)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL REFERENCES physics_topics(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  question_type TEXT NOT NULL CHECK(question_type IN ('mcq', 'numeric')),
  prompt TEXT NOT NULL, -- Question text with KaTeX formulas
  question_text TEXT,   -- Compatible alias with prompt
  latex_formula TEXT,   -- Optional formula string
  options TEXT,         -- JSON array of McqOption: [{"id":"A","text":"...","latex":"..."},...]
  options_json TEXT,    -- Compatible alias with options
  correct_answer TEXT NOT NULL, -- For MCQ: option key ('A'|'B'|'C'|'D'); For numeric: value string ('9.8')
  numeric_tolerance REAL DEFAULT 0.02, -- Relative tolerance (e.g., 0.02 = +/- 2%)
  numeric_unit TEXT,    -- Physical unit (e.g. 'm/s^2', 'N', 'J', 'W', 'V', 'A', 'Hz')
  unit TEXT,            -- Compatible alias with numeric_unit
  hints TEXT,           -- JSON array of QuestionHint: [{"level":1,"hint":"...","penalty_stars":1},...]
  hints_json TEXT,      -- Compatible alias with hints
  explanation TEXT NOT NULL, -- Step-by-step solution with KaTeX equations
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK(difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL DEFAULT 10,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_lesson ON questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_questions_type ON questions(question_type);

-- ----------------------------------------------------------------------------
-- 6. PARENT ASSIGNMENTS TABLE
-- Homework assigned by parents, accompanied by real-world family reward goals
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS parent_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES physics_topics(id) ON DELETE SET NULL,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  due_date TEXT,
  reward_description TEXT,
  reward_text TEXT,
  reward_stars INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'assigned' CHECK(status IN ('assigned', 'completed', 'reward_approved', 'expired', 'submitted', 'graded', 'overdue')),
  completed_at TEXT,
  parent_feedback TEXT,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_assignments_student_status ON parent_assignments(student_id, status);
CREATE INDEX IF NOT EXISTS idx_assignments_parent ON parent_assignments(parent_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON parent_assignments(due_date);

-- ----------------------------------------------------------------------------
-- 7. QUIZ SUBMISSIONS TABLE
-- Historical records of student practice, exams, and homework evaluations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL CHECK(quiz_type IN ('practice', 'exam', 'assignment')),
  topic_id INTEGER REFERENCES physics_topics(id) ON DELETE SET NULL,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  assignment_id INTEGER REFERENCES parent_assignments(id) ON DELETE SET NULL,
  score REAL NOT NULL CHECK(score >= 0 AND score <= 100),
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  stars_earned INTEGER NOT NULL DEFAULT 0,
  answers_json TEXT NOT NULL, -- Detailed JSON payload of submitted responses
  submitted_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_type ON quiz_submissions(user_id, quiz_type, submitted_at);
CREATE INDEX IF NOT EXISTS idx_submissions_topic ON quiz_submissions(topic_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON quiz_submissions(assignment_id);

-- ----------------------------------------------------------------------------
-- 8. STUDENT GAMIFICATION TABLE
-- Tracks cumulative stars, continuous daily streaks, and unlocked badges
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS student_gamification (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  stars INTEGER NOT NULL DEFAULT 0 CHECK(stars >= 0),
  current_streak INTEGER NOT NULL DEFAULT 0 CHECK(current_streak >= 0),
  longest_streak INTEGER NOT NULL DEFAULT 0 CHECK(longest_streak >= 0),
  last_active_date TEXT, -- Stored as 'YYYY-MM-DD'
  badges_json TEXT NOT NULL DEFAULT '[]', -- JSON array of earned badge objects
  level INTEGER NOT NULL DEFAULT 1 CHECK(level >= 1),
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_gamification_student ON student_gamification(student_id);

-- ----------------------------------------------------------------------------
-- 9. STUDY SESSIONS TABLE
-- High-resolution time-on-task tracker powering Parent Dashboard metrics & heatmaps
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS study_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES physics_topics(id) ON DELETE SET NULL,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  session_type TEXT NOT NULL CHECK(session_type IN ('learn', 'practice', 'exam', 'simulation')),
  duration_seconds INTEGER NOT NULL DEFAULT 0 CHECK(duration_seconds >= 0),
  session_date TEXT NOT NULL DEFAULT (DATE('now')),
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_sessions_student_date ON study_sessions(student_id, session_date);
CREATE INDEX IF NOT EXISTS idx_sessions_topic ON study_sessions(student_id, topic_id);
