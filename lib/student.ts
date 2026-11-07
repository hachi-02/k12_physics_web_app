import { getDb } from './db';
import { evaluateQuestionAnswer, GradingResult, getTierForGrade, EducationalTier } from './grading';
import type { McqOption, QuestionHint, EarnedBadge } from '../types/database';

export { getTierForGrade };
export type { EducationalTier };

export interface StudentProfile {
  id: number;
  username: string;
  name: string;
  fullName: string | null;
  grade: number;
  avatar: string | null;
  tier: 'primary' | 'middle' | 'high';
  stars: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  badges: EarnedBadge[];
}

export interface StudentTopicItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  grade: number;
  tier: 'primary' | 'middle' | 'high';
  orderNum: number;
  icon: string | null;
  lessonCount: number;
  questionCount: number;
  userBestScore?: number | null;
  userQuizCount?: number;
}

export function getStudentProfile(studentId: number): StudentProfile {
  const db = getDb();

  const user = db.get<{
    id: number;
    username: string;
    name: string;
    full_name: string | null;
    grade: number | null;
    avatar: string | null;
  }>("SELECT id, username, name, full_name, grade, avatar FROM users WHERE id = ? AND role = 'student'", [
    studentId,
  ]);

  if (!user) {
    throw new Error(`Không tìm thấy học sinh #${studentId}`);
  }

  const effectiveGrade = user.grade || 7;
  const tier = getTierForGrade(effectiveGrade);

  const gamification = db.get<{
    stars: number;
    current_streak: number;
    longest_streak: number;
    level: number;
    badges_json: string;
  }>('SELECT stars, current_streak, longest_streak, level, badges_json FROM student_gamification WHERE student_id = ?', [
    studentId,
  ]);

  let badges: EarnedBadge[] = [];
  if (gamification?.badges_json) {
    try {
      badges = JSON.parse(gamification.badges_json);
    } catch {
      badges = [];
    }
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    fullName: user.full_name,
    grade: effectiveGrade,
    avatar: user.avatar,
    tier,
    stars: gamification?.stars || 0,
    currentStreak: gamification?.current_streak || 0,
    longestStreak: gamification?.longest_streak || 0,
    level: gamification?.level || 1,
    badges,
  };
}

/**
 * Fetch curriculum topics for student grade
 */
export function getTopicsForGrade(grade: number, studentId?: number): StudentTopicItem[] {
  const db = getDb();
  const tier = getTierForGrade(grade);

  const topics = db.query<{
    id: number;
    title: string;
    slug: string;
    description: string | null;
    grade: number;
    order_num: number;
    icon: string | null;
  }>(
    `SELECT id, title, slug, description, grade, order_num, icon
     FROM physics_topics
     WHERE grade = ?
     ORDER BY order_num ASC`,
    [grade]
  );

  const lessonCounts = db.query<{ topic_id: number; count: number }>(
    `SELECT topic_id, COUNT(*) as count FROM lessons GROUP BY topic_id`
  );
  const lessonCountMap = new Map<number, number>(lessonCounts.map((l) => [l.topic_id, l.count]));

  const questionCounts = db.query<{ topic_id: number; count: number }>(
    `SELECT topic_id, COUNT(*) as count FROM questions GROUP BY topic_id`
  );
  const questionCountMap = new Map<number, number>(questionCounts.map((q) => [q.topic_id, q.count]));

  let userStatsMap = new Map<number, { bestScore: number; quizCount: number }>();
  if (studentId) {
    const stats = db.query<{ topic_id: number; best_score: number; quiz_count: number }>(
      `SELECT topic_id, MAX(score) as best_score, COUNT(*) as quiz_count
       FROM quiz_submissions
       WHERE user_id = ? AND topic_id IS NOT NULL
       GROUP BY topic_id`,
      [studentId]
    );
    userStatsMap = new Map(
      stats.map((s) => [s.topic_id, { bestScore: s.best_score, quizCount: s.quiz_count }])
    );
  }

  return topics.map((t) => {
    const userStat = userStatsMap.get(t.id);
    return {
      id: t.id,
      title: t.title,
      slug: t.slug,
      description: t.description,
      grade: t.grade,
      tier,
      orderNum: t.order_num,
      icon: t.icon,
      lessonCount: lessonCountMap.get(t.id) || 1,
      questionCount: questionCountMap.get(t.id) || 0,
      userBestScore: userStat ? userStat.bestScore : null,
      userQuizCount: userStat ? userStat.quizCount : 0,
    };
  });
}

/**
 * Fetch theory lesson content for a topic
 */
export interface TheoryLessonDetails {
  id: number;
  topicId: number;
  topicTitle: string;
  topicDescription: string | null;
  grade: number;
  tier: 'primary' | 'middle' | 'high';
  title: string;
  slug: string;
  contentMarkdown: string;
  summary: string | null;
  estimatedDurationMinutes: number;
  questionCount: number;
}

export function getLessonTheory(topicId: number, lessonId?: number): TheoryLessonDetails {
  const db = getDb();

  const topic = db.get<{
    id: number;
    title: string;
    description: string | null;
    grade: number;
  }>('SELECT id, title, description, grade FROM physics_topics WHERE id = ?', [topicId]);

  if (!topic) {
    throw new Error(`Không tìm thấy chuyên đề #${topicId}`);
  }

  let lesson: {
    id: number;
    title: string;
    slug: string;
    content_markdown: string;
    summary: string | null;
    estimated_duration_minutes: number;
  } | undefined;

  if (lessonId) {
    lesson = db.get(
      'SELECT id, title, slug, content_markdown, summary, estimated_duration_minutes FROM lessons WHERE id = ? AND topic_id = ?',
      [lessonId, topicId]
    );
  } else {
    lesson = db.get(
      'SELECT id, title, slug, content_markdown, summary, estimated_duration_minutes FROM lessons WHERE topic_id = ? ORDER BY order_num ASC LIMIT 1',
      [topicId]
    );
  }

  if (!lesson) {
    throw new Error(`Không tìm thấy bài học cho chuyên đề #${topicId}`);
  }

  const qCount = db.get<{ count: number }>('SELECT COUNT(*) as count FROM questions WHERE topic_id = ?', [
    topicId,
  ]);

  return {
    id: lesson.id,
    topicId: topic.id,
    topicTitle: topic.title,
    topicDescription: topic.description,
    grade: topic.grade,
    tier: getTierForGrade(topic.grade),
    title: lesson.title,
    slug: lesson.slug,
    contentMarkdown: lesson.content_markdown,
    summary: lesson.summary,
    estimatedDurationMinutes: lesson.estimated_duration_minutes || 15,
    questionCount: qCount?.count || 0,
  };
}

/**
 * Fetch questions for practice or exam
 */
export interface ClientQuestionItem {
  id: number;
  topicId: number;
  lessonId: number | null;
  questionType: 'mcq' | 'numeric';
  prompt: string;
  latexFormula: string | null;
  options?: McqOption[];
  numericUnit?: string | null;
  numericTolerance?: number;
  hints?: QuestionHint[];
  points: number;
  difficulty: string;
  // Included only in practice mode or after grading:
  correctAnswer?: string;
  explanation?: string;
}

export function getQuestionsForTopic(
  topicId: number,
  mode: 'practice' | 'exam' = 'practice'
): ClientQuestionItem[] {
  const db = getDb();

  const rows = db.query<{
    id: number;
    topic_id: number;
    lesson_id: number | null;
    question_type: 'mcq' | 'numeric';
    prompt: string;
    latex_formula: string | null;
    options: string | null;
    options_json: string | null;
    correct_answer: string;
    numeric_tolerance: number | null;
    numeric_unit: string | null;
    hints: string | null;
    hints_json: string | null;
    explanation: string;
    difficulty: string;
    points: number;
  }>(
    `SELECT 
       id, topic_id, lesson_id, question_type, prompt, latex_formula,
       options, options_json, correct_answer, numeric_tolerance, numeric_unit,
       hints, hints_json, explanation, difficulty, points
     FROM questions
     WHERE topic_id = ?
     ORDER BY difficulty ASC, id ASC`,
    [topicId]
  );

  return rows.map((r) => {
    let options: McqOption[] | undefined;
    const rawOptions = r.options || r.options_json;
    if (rawOptions) {
      try {
        options = JSON.parse(rawOptions);
      } catch {
        options = [];
      }
    }

    let hints: QuestionHint[] | undefined;
    const rawHints = r.hints || r.hints_json;
    if (rawHints) {
      try {
        hints = JSON.parse(rawHints);
      } catch {
        hints = [];
      }
    }

    const item: ClientQuestionItem = {
      id: r.id,
      topicId: r.topic_id,
      lessonId: r.lesson_id,
      questionType: r.question_type,
      prompt: r.prompt,
      latexFormula: r.latex_formula,
      options,
      numericUnit: r.numeric_unit,
      numericTolerance: r.numeric_tolerance || 0.02,
      points: r.points || 10,
      difficulty: r.difficulty || 'medium',
    };

    if (mode === 'practice') {
      item.hints = hints;
      item.correctAnswer = r.correct_answer;
      item.explanation = r.explanation;
    }

    return item;
  });
}

/**
 * Quiz Submission Processing & Grading Engine
 */
export interface UserSubmittedAnswer {
  questionId: number;
  userAnswer: string;
  hintsUsed?: number;
  timeSpentSeconds?: number;
}

export interface SubmitQuizInput {
  userId: number;
  topicId?: number;
  lessonId?: number;
  assignmentId?: number;
  quizType: 'practice' | 'exam' | 'assignment';
  timeSpentSeconds: number;
  answers: UserSubmittedAnswer[];
}

export interface EvaluatedQuestionResult {
  questionId: number;
  isCorrect: boolean;
  scoreEarned: number;
  pointsMax: number;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  feedback: string;
}

export interface QuizSubmissionResult {
  submissionId: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  starsEarned: number;
  currentStreak: number;
  longestStreak: number;
  newBadges: string[];
  results: EvaluatedQuestionResult[];
  timeSpentSeconds: number;
  quizType: string;
}

export function submitQuiz(input: SubmitQuizInput): QuizSubmissionResult {
  const db = getDb();
  const { userId, topicId, lessonId, assignmentId, quizType, timeSpentSeconds, answers } = input;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new Error('Danh sách câu trả lời không được để trống');
  }

  // 1. Fetch questions from database to evaluate securely on server
  const questionIds = answers.map((a) => a.questionId);
  const placeholders = questionIds.map(() => '?').join(',');
  const questionsInDb = db.query<{
    id: number;
    question_type: string;
    correct_answer: string;
    numeric_tolerance: number | null;
    points: number;
    explanation: string;
  }>(
    `SELECT id, question_type, correct_answer, numeric_tolerance, points, explanation
     FROM questions
     WHERE id IN (${placeholders})`,
    questionIds
  );

  const qMap = new Map(questionsInDb.map((q) => [q.id, q]));

  let totalScoreEarned = 0;
  let totalScoreMax = 0;
  let correctCount = 0;
  const results: EvaluatedQuestionResult[] = [];

  for (const ans of answers) {
    const q = qMap.get(ans.questionId);
    if (!q) continue;

    const grading = evaluateQuestionAnswer(
      q.question_type,
      ans.userAnswer,
      q.correct_answer,
      q.numeric_tolerance || 0.02,
      q.points || 10
    );

    if (grading.isCorrect) correctCount++;
    totalScoreEarned += grading.scoreEarned;
    totalScoreMax += grading.pointsMax;

    results.push({
      questionId: ans.questionId,
      isCorrect: grading.isCorrect,
      scoreEarned: grading.scoreEarned,
      pointsMax: grading.pointsMax,
      userAnswer: ans.userAnswer,
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
      feedback: grading.feedback,
    });
  }

  const finalPercentage =
    totalScoreMax > 0 ? Math.round((totalScoreEarned / totalScoreMax) * 1000) / 10 : 0;

  // Compute star rewards:
  // Base stars for completion: 5 stars
  // Bonus stars based on score: e.g. 90%+ = 15 stars, 70-89% = 10 stars, 50-69% = 5 stars
  let starsEarned = 5;
  if (finalPercentage >= 90) starsEarned += 15;
  else if (finalPercentage >= 70) starsEarned += 10;
  else if (finalPercentage >= 50) starsEarned += 5;

  db.exec('BEGIN TRANSACTION;');
  try {
    // 2. Insert into quiz_submissions
    const subResult = db.run(
      `INSERT INTO quiz_submissions (
         user_id, quiz_type, topic_id, lesson_id, assignment_id, score,
         total_questions, correct_count, time_spent_seconds, stars_earned, answers_json
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        quizType,
        topicId || null,
        lessonId || null,
        assignmentId || null,
        finalPercentage,
        results.length,
        correctCount,
        timeSpentSeconds || 0,
        starsEarned,
        JSON.stringify(answers),
      ]
    );
    const submissionId = Number(subResult.lastInsertRowid);

    // 3. Update Study Sessions
    const todayStr = new Date().toISOString().slice(0, 10);
    db.run(
      `INSERT INTO study_sessions (student_id, topic_id, lesson_id, session_type, duration_seconds, session_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, topicId || null, lessonId || null, quizType === 'exam' ? 'exam' : 'practice', timeSpentSeconds || 60, todayStr]
    );

    // 4. Update Student Gamification (Streak & Stars)
    const gamification = db.get<{
      stars: number;
      current_streak: number;
      longest_streak: number;
      last_active_date: string | null;
      badges_json: string;
    }>('SELECT stars, current_streak, longest_streak, last_active_date, badges_json FROM student_gamification WHERE student_id = ?', [
      userId,
    ]);

    let currentStreak = 1;
    let longestStreak = 1;
    let existingStars = 0;
    let badges: EarnedBadge[] = [];

    if (gamification) {
      existingStars = gamification.stars;
      currentStreak = gamification.current_streak;
      longestStreak = gamification.longest_streak;

      if (gamification.last_active_date) {
        const lastActive = new Date(gamification.last_active_date);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);

      try {
        badges = JSON.parse(gamification.badges_json || '[]');
      } catch {
        badges = [];
      }
    }

    const newBadges: string[] = [];

    // Check badge unlocks
    const badgeIds = new Set(badges.map((b) => b.badge_id));

    if (finalPercentage === 100 && !badgeIds.has('perfect_score')) {
      badges.push({
        badge_id: 'perfect_score',
        title: 'Điểm Số Hoàn Hảo',
        description: 'Đạt điểm tuyệt đối 100% trong bài kiểm tra',
        icon: 'trophy',
        tier: 'gold',
        awarded_at: new Date().toISOString(),
      });
      newBadges.push('perfect_score');
    }

    if (currentStreak >= 3 && !badgeIds.has('streak_3')) {
      badges.push({
        badge_id: 'streak_3',
        title: 'Chăm Chỉ 3 Ngày',
        description: 'Duy trì chuỗi 3 ngày học liên tiếp',
        icon: 'flame',
        tier: 'bronze',
        awarded_at: new Date().toISOString(),
      });
      newBadges.push('streak_3');
    }

    if (currentStreak >= 7 && !badgeIds.has('streak_7')) {
      badges.push({
        badge_id: 'streak_7',
        title: 'Ý Chí Sắt Đá 7 Ngày',
        description: 'Duy trì chuỗi 7 ngày học liên tiếp',
        icon: 'zap',
        tier: 'silver',
        awarded_at: new Date().toISOString(),
      });
      newBadges.push('streak_7');
    }

    // Upsert gamification state
    db.run(
      `INSERT INTO student_gamification (student_id, stars, current_streak, longest_streak, last_active_date, badges_json, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(student_id) DO UPDATE SET
         stars = stars + ?,
         current_streak = ?,
         longest_streak = ?,
         last_active_date = ?,
         badges_json = ?,
         updated_at = CURRENT_TIMESTAMP`,
      [
        userId,
        existingStars + starsEarned,
        currentStreak,
        longestStreak,
        todayStr,
        JSON.stringify(badges),
        starsEarned,
        currentStreak,
        longestStreak,
        todayStr,
        JSON.stringify(badges),
      ]
    );

    // 5. If this submission is linked to an assignment, complete it!
    if (assignmentId) {
      db.run(
        `UPDATE parent_assignments
         SET status = 'completed',
             completed_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [assignmentId]
      );
    }

    db.exec('COMMIT;');

    return {
      submissionId,
      score: finalPercentage,
      totalQuestions: results.length,
      correctCount,
      starsEarned,
      currentStreak,
      longestStreak,
      newBadges,
      results,
      timeSpentSeconds,
      quizType,
    };
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}
