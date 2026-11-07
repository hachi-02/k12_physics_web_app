import { getDb } from './db';
import type { ParentGuide } from '../types/database';

export interface ChildSummary {
  id: number;
  username: string;
  name: string;
  fullName: string | null;
  grade: number | null;
  avatar: string | null;
}

export interface TopicMasteryItem {
  topicId: number;
  title: string;
  slug: string;
  grade: number;
  tier: string;
  quizCount: number;
  avgScore: number;
  status: 'critical' | 'developing' | 'mastered' | 'unattempted';
  statusLabel: string;
  lastStudiedAt: string | null;
  lessonCount: number;
}

export interface QuizSubmissionSummary {
  id: number;
  topicId: number | null;
  topicTitle: string | null;
  lessonId: number | null;
  lessonTitle: string | null;
  quizType: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  starsEarned: number;
  submittedAt: string;
}

export interface ParentDashboardData {
  parent: {
    id: number;
    name: string;
    username: string;
  };
  children: ChildSummary[];
  selectedChild: ChildSummary | null;
  stats: {
    totalStudyTimeMinutes: number;
    totalQuizzes: number;
    avgScore: number;
    accuracyRate: number;
    masteredTopicsCount: number;
    developingTopicsCount: number;
    criticalTopicsCount: number;
    totalStars: number;
    currentStreak: number;
    longestStreak: number;
  };
  knowledgeGaps: TopicMasteryItem[];
  recentSubmissions: QuizSubmissionSummary[];
  activeAssignmentsCount: number;
}

/**
 * Fetch linked children for a parent
 */
export function getParentChildren(parentId: number): ChildSummary[] {
  const db = getDb();
  return db.query<ChildSummary>(
    `SELECT u.id, u.username, u.name, u.full_name as fullName, u.grade, u.avatar
     FROM users u
     JOIN family_links fl ON u.id = fl.student_id
     WHERE fl.parent_id = ? AND u.role = 'student'
     ORDER BY u.name ASC`,
    [parentId]
  );
}

/**
 * Fetch complete dashboard analytics for parent & selected child
 */
export function getParentDashboardData(parentId: number, studentId?: number): ParentDashboardData {
  const db = getDb();

  // 1. Verify parent
  const parent = db.get<{ id: number; name: string; username: string }>(
    `SELECT id, name, username FROM users WHERE id = ? AND role = 'parent'`,
    [parentId]
  );

  if (!parent) {
    throw new Error(`Parent with ID ${parentId} not found`);
  }

  // 2. Get children
  const children = getParentChildren(parentId);

  let selectedChild: ChildSummary | null = null;
  if (children.length > 0) {
    if (studentId) {
      selectedChild = children.find((c) => c.id === Number(studentId)) || children[0];
    } else {
      selectedChild = children[0];
    }
  }

  // If no linked child, return empty aggregate stats
  if (!selectedChild) {
    return {
      parent,
      children: [],
      selectedChild: null,
      stats: {
        totalStudyTimeMinutes: 0,
        totalQuizzes: 0,
        avgScore: 0,
        accuracyRate: 0,
        masteredTopicsCount: 0,
        developingTopicsCount: 0,
        criticalTopicsCount: 0,
        totalStars: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
      knowledgeGaps: [],
      recentSubmissions: [],
      activeAssignmentsCount: 0,
    };
  }

  const childId = selectedChild.id;

  // 3. Compute total study time (from study_sessions)
  const sessionStats = db.get<{ total_seconds: number | null }>(
    `SELECT SUM(duration_seconds) as total_seconds FROM study_sessions WHERE student_id = ?`,
    [childId]
  );
  const totalStudyTimeMinutes = Math.round((sessionStats?.total_seconds || 0) / 60);

  // 4. Compute quiz submission statistics
  const quizStats = db.get<{
    total_submissions: number;
    avg_score: number | null;
    total_questions: number | null;
    total_correct: number | null;
  }>(
    `SELECT 
       COUNT(*) as total_submissions,
       AVG(score) as avg_score,
       SUM(total_questions) as total_questions,
       SUM(correct_count) as total_correct
     FROM quiz_submissions
     WHERE user_id = ?`,
    [childId]
  );

  const totalQuizzes = quizStats?.total_submissions || 0;
  const avgScore = quizStats?.avg_score ? Math.round(quizStats.avg_score * 10) / 10 : 0;
  const totalQ = quizStats?.total_questions || 0;
  const totalC = quizStats?.total_correct || 0;
  const accuracyRate = totalQ > 0 ? Math.round((totalC / totalQ) * 1000) / 10 : 0;

  // 5. Get Gamification stats
  const gamification = db.get<{
    stars: number;
    current_streak: number;
    longest_streak: number;
  }>(
    `SELECT stars, current_streak, longest_streak FROM student_gamification WHERE student_id = ?`,
    [childId]
  );

  // 6. Topic Mastery & Knowledge Gap Heatmap calculation
  // Select all topics in the curriculum (or child's grade / all grades)
  const allTopics = db.query<{
    id: number;
    title: string;
    slug: string;
    grade: number;
    tier: string;
  }>(`SELECT id, title, slug, grade, tier FROM physics_topics ORDER BY grade ASC, order_num ASC`);

  // Submissions per topic
  const topicSubmissions = db.query<{
    topic_id: number;
    quiz_count: number;
    avg_score: number;
    last_submitted: string;
  }>(
    `SELECT 
       topic_id,
       COUNT(*) as quiz_count,
       AVG(score) as avg_score,
       MAX(submitted_at) as last_submitted
     FROM quiz_submissions
     WHERE user_id = ? AND topic_id IS NOT NULL
     GROUP BY topic_id`,
    [childId]
  );

  const topicSubMap = new Map<number, { quiz_count: number; avg_score: number; last_submitted: string }>();
  for (const s of topicSubmissions) {
    topicSubMap.set(s.topic_id, s);
  }

  // Get lesson counts per topic
  const lessonCounts = db.query<{ topic_id: number; count: number }>(
    `SELECT topic_id, COUNT(*) as count FROM lessons GROUP BY topic_id`
  );
  const lessonCountMap = new Map<number, number>();
  for (const lc of lessonCounts) {
    lessonCountMap.set(lc.topic_id, lc.count);
  }

  let masteredCount = 0;
  let developingCount = 0;
  let criticalCount = 0;

  const knowledgeGaps: TopicMasteryItem[] = allTopics.map((topic) => {
    const sub = topicSubMap.get(topic.id);
    let status: 'critical' | 'developing' | 'mastered' | 'unattempted' = 'unattempted';
    let statusLabel = 'Chưa kiểm tra';
    let score = 0;

    if (sub && sub.quiz_count > 0) {
      score = Math.round(sub.avg_score * 10) / 10;
      if (score < 60) {
        status = 'critical';
        statusLabel = 'Lỗ hổng kiến thức (< 60%)';
        criticalCount++;
      } else if (score < 80) {
        status = 'developing';
        statusLabel = 'Đang củng cố (60 - 79%)';
        developingCount++;
      } else {
        status = 'mastered';
        statusLabel = 'Đã nắm vững (≥ 80%)';
        masteredCount++;
      }
    }

    return {
      topicId: topic.id,
      title: topic.title,
      slug: topic.slug,
      grade: topic.grade,
      tier: topic.tier,
      quizCount: sub ? sub.quiz_count : 0,
      avgScore: score,
      status,
      statusLabel,
      lastStudiedAt: sub ? sub.last_submitted : null,
      lessonCount: lessonCountMap.get(topic.id) || 1,
    };
  });

  // 7. Recent Quiz Submissions (latest 10)
  const recentSubmissions = db.query<QuizSubmissionSummary>(
    `SELECT 
       qs.id,
       qs.topic_id as topicId,
       pt.title as topicTitle,
       qs.lesson_id as lessonId,
       ls.title as lessonTitle,
       qs.quiz_type as quizType,
       qs.score,
       qs.total_questions as totalQuestions,
       qs.correct_count as correctCount,
       qs.time_spent_seconds as timeSpentSeconds,
       qs.stars_earned as starsEarned,
       qs.submitted_at as submittedAt
     FROM quiz_submissions qs
     LEFT JOIN physics_topics pt ON qs.topic_id = pt.id
     LEFT JOIN lessons ls ON qs.lesson_id = ls.id
     WHERE qs.user_id = ?
     ORDER BY qs.submitted_at DESC
     LIMIT 10`,
    [childId]
  );

  // 8. Active Assignments count
  const assignmentsStats = db.get<{ count: number }>(
    `SELECT COUNT(*) as count FROM parent_assignments WHERE student_id = ? AND status IN ('assigned', 'submitted')`,
    [childId]
  );

  return {
    parent,
    children,
    selectedChild,
    stats: {
      totalStudyTimeMinutes,
      totalQuizzes,
      avgScore,
      accuracyRate,
      masteredTopicsCount: masteredCount,
      developingTopicsCount: developingCount,
      criticalTopicsCount: criticalCount,
      totalStars: gamification?.stars || 0,
      currentStreak: gamification?.current_streak || 0,
      longestStreak: gamification?.longest_streak || 0,
    },
    knowledgeGaps,
    recentSubmissions,
    activeAssignmentsCount: assignmentsStats?.count || 0,
  };
}

/**
 * Query lessons with parsed parent guide JSON
 */
export interface LessonWithParentGuide {
  id: number;
  topicId: number;
  topicTitle: string;
  topicSlug: string;
  grade: number;
  tier: string;
  title: string;
  slug: string;
  summary: string | null;
  parentGuide: ParentGuide;
  estimatedDurationMinutes: number;
}

export function getLessonsWithParentGuide(options: {
  grade?: number;
  topicId?: number;
  lessonId?: number;
}): LessonWithParentGuide[] {
  const db = getDb();
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (options.grade !== undefined && !isNaN(Number(options.grade))) {
    whereClauses.push('pt.grade = ?');
    params.push(Number(options.grade));
  }

  if (options.topicId !== undefined && !isNaN(Number(options.topicId))) {
    whereClauses.push('ls.topic_id = ?');
    params.push(Number(options.topicId));
  }

  if (options.lessonId !== undefined && !isNaN(Number(options.lessonId))) {
    whereClauses.push('ls.id = ?');
    params.push(Number(options.lessonId));
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const rows = db.query<{
    id: number;
    topic_id: number;
    topic_title: string;
    topic_slug: string;
    grade: number;
    tier: string;
    title: string;
    slug: string;
    summary: string | null;
    parent_guide: string;
    estimated_duration_minutes: number;
  }>(
    `SELECT 
       ls.id,
       ls.topic_id,
       pt.title as topic_title,
       pt.slug as topic_slug,
       pt.grade,
       pt.tier,
       ls.title,
       ls.slug,
       ls.summary,
       ls.parent_guide,
       ls.estimated_duration_minutes
     FROM lessons ls
     JOIN physics_topics pt ON ls.topic_id = pt.id
     ${whereSql}
     ORDER BY pt.grade ASC, pt.order_num ASC, ls.order_num ASC`,
    params
  );

  return rows.map((row) => {
    let parsedGuide: ParentGuide;
    try {
      parsedGuide = JSON.parse(row.parent_guide);
    } catch {
      parsedGuide = {
        summary: row.summary || row.title,
        misconceptions: [],
        guiding_questions: [],
        home_experiments: [],
      };
    }

    return {
      id: row.id,
      topicId: row.topic_id,
      topicTitle: row.topic_title,
      topicSlug: row.topic_slug,
      grade: row.grade,
      tier: row.tier,
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      parentGuide: parsedGuide,
      estimatedDurationMinutes: row.estimated_duration_minutes || 15,
    };
  });
}

/**
 * Parent Assignments Operations
 */
export interface ParentAssignmentItem {
  id: number;
  parentId: number;
  parentName: string;
  studentId: number;
  studentName: string;
  studentGrade: number | null;
  topicId: number | null;
  topicTitle: string | null;
  lessonId: number | null;
  lessonTitle: string | null;
  title: string;
  description: string | null;
  instructions: string | null;
  dueDate: string | null;
  rewardDescription: string | null;
  rewardStars: number;
  status: 'assigned' | 'completed' | 'reward_approved' | 'expired' | 'submitted' | 'graded' | 'overdue';
  completedAt: string | null;
  parentFeedback: string | null;
  createdAt: string;
}

export function getParentAssignments(options: {
  parentId?: number;
  studentId?: number;
  status?: string;
}): ParentAssignmentItem[] {
  const db = getDb();
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (options.parentId !== undefined) {
    whereClauses.push('pa.parent_id = ?');
    params.push(Number(options.parentId));
  }

  if (options.studentId !== undefined) {
    whereClauses.push('pa.student_id = ?');
    params.push(Number(options.studentId));
  }

  if (options.status) {
    whereClauses.push('pa.status = ?');
    params.push(options.status);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  return db.query<ParentAssignmentItem>(
    `SELECT 
       pa.id,
       pa.parent_id as parentId,
       pu.name as parentName,
       pa.student_id as studentId,
       su.name as studentName,
       su.grade as studentGrade,
       pa.topic_id as topicId,
       pt.title as topicTitle,
       pa.lesson_id as lessonId,
       ls.title as lessonTitle,
       pa.title,
       pa.description,
       pa.instructions,
       pa.due_date as dueDate,
       COALESCE(pa.reward_description, pa.reward_text) as rewardDescription,
       pa.reward_stars as rewardStars,
       pa.status,
       pa.completed_at as completedAt,
       pa.parent_feedback as parentFeedback,
       pa.created_at as createdAt
     FROM parent_assignments pa
     JOIN users pu ON pa.parent_id = pu.id
     JOIN users su ON pa.student_id = su.id
     LEFT JOIN physics_topics pt ON pa.topic_id = pt.id
     LEFT JOIN lessons ls ON pa.lesson_id = ls.id
     ${whereSql}
     ORDER BY pa.created_at DESC`,
    params
  );
}

export interface CreateAssignmentInput {
  parentId: number;
  studentId: number;
  title: string;
  description?: string;
  instructions?: string;
  topicId?: number;
  lessonId?: number;
  dueDate?: string;
  rewardDescription?: string;
  rewardStars?: number;
}

export function createParentAssignment(input: CreateAssignmentInput): ParentAssignmentItem {
  const db = getDb();

  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Tiêu đề bài tập không được để trống');
  }

  if (!input.parentId || !input.studentId) {
    throw new Error('Thông tin phụ huynh và học sinh là bắt buộc');
  }

  // Validate linkage
  const link = db.get(
    'SELECT * FROM family_links WHERE parent_id = ? AND student_id = ?',
    [input.parentId, input.studentId]
  );
  if (!link) {
    throw new Error('Phụ huynh không có quyền giao bài tập cho học sinh này');
  }

  const result = db.run(
    `INSERT INTO parent_assignments (
       parent_id, student_id, topic_id, lesson_id, title, description, instructions,
       due_date, reward_description, reward_text, reward_stars, status
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'assigned')`,
    [
      input.parentId,
      input.studentId,
      input.topicId || null,
      input.lessonId || null,
      input.title.trim(),
      input.description || input.instructions || null,
      input.instructions || input.description || null,
      input.dueDate || null,
      input.rewardDescription || null,
      input.rewardDescription || null,
      input.rewardStars || 0,
    ]
  );

  const insertedId = Number(result.lastInsertRowid);
  const created = db.get<ParentAssignmentItem>(
    `SELECT 
       pa.id,
       pa.parent_id as parentId,
       pu.name as parentName,
       pa.student_id as studentId,
       su.name as studentName,
       su.grade as studentGrade,
       pa.topic_id as topicId,
       pt.title as topicTitle,
       pa.lesson_id as lessonId,
       ls.title as lessonTitle,
       pa.title,
       pa.description,
       pa.instructions,
       pa.due_date as dueDate,
       COALESCE(pa.reward_description, pa.reward_text) as rewardDescription,
       pa.reward_stars as rewardStars,
       pa.status,
       pa.completed_at as completedAt,
       pa.parent_feedback as parentFeedback,
       pa.created_at as createdAt
     FROM parent_assignments pa
     JOIN users pu ON pa.parent_id = pu.id
     JOIN users su ON pa.student_id = su.id
     LEFT JOIN physics_topics pt ON pa.topic_id = pt.id
     LEFT JOIN lessons ls ON pa.lesson_id = ls.id
     WHERE pa.id = ?`,
    [insertedId]
  );
  if (!created) {
    throw new Error('Lỗi khi lấy thông tin bài tập vừa tạo');
  }
  return created;
}

export function approveParentReward(assignmentId: number, parentId: number, feedback?: string): ParentAssignmentItem {
  const db = getDb();

  const assignment = db.get<{
    id: number;
    parent_id: number;
    student_id: number;
    reward_stars: number;
    status: string;
  }>('SELECT id, parent_id, student_id, reward_stars, status FROM parent_assignments WHERE id = ?', [assignmentId]);

  if (!assignment) {
    throw new Error(`Không tìm thấy bài tập #${assignmentId}`);
  }

  if (assignment.parent_id !== parentId) {
    throw new Error('Chỉ phụ huynh giao bài mới có quyền phê duyệt phần thưởng');
  }

  db.exec('BEGIN TRANSACTION;');
  try {
    // Update assignment status
    db.run(
      `UPDATE parent_assignments
       SET status = 'reward_approved',
           parent_feedback = COALESCE(?, parent_feedback),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [feedback || 'Phụ huynh đã duyệt và trao thưởng thành công!', assignmentId]
    );

    // Award stars to student gamification
    if (assignment.reward_stars > 0) {
      db.run(
        `UPDATE student_gamification
         SET stars = stars + ?,
             updated_at = CURRENT_TIMESTAMP
         WHERE student_id = ?`,
        [assignment.reward_stars, assignment.student_id]
      );
    }

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }

  const updated = db.get<ParentAssignmentItem>(
    `SELECT 
       pa.id,
       pa.parent_id as parentId,
       pu.name as parentName,
       pa.student_id as studentId,
       su.name as studentName,
       su.grade as studentGrade,
       pa.topic_id as topicId,
       pt.title as topicTitle,
       pa.lesson_id as lessonId,
       ls.title as lessonTitle,
       pa.title,
       pa.description,
       pa.instructions,
       pa.due_date as dueDate,
       COALESCE(pa.reward_description, pa.reward_text) as rewardDescription,
       pa.reward_stars as rewardStars,
       pa.status,
       pa.completed_at as completedAt,
       pa.parent_feedback as parentFeedback,
       pa.created_at as createdAt
     FROM parent_assignments pa
     JOIN users pu ON pa.parent_id = pu.id
     JOIN users su ON pa.student_id = su.id
     LEFT JOIN physics_topics pt ON pa.topic_id = pt.id
     LEFT JOIN lessons ls ON pa.lesson_id = ls.id
     WHERE pa.id = ?`,
    [assignmentId]
  );
  if (!updated) {
    throw new Error('Lỗi khi lấy dữ liệu sau khi duyệt thưởng');
  }
  return updated;
}
