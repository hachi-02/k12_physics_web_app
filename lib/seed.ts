import { getDb } from './db';
import { CURRICULUM_DATA } from './curriculum-data';
import crypto from 'node:crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export interface SeedResult {
  usersCount: number;
  topicsCount: number;
  lessonsCount: number;
  questionsCount: number;
  assignmentsCount: number;
  gamificationCount: number;
}

export async function seedDatabase(options: { force?: boolean } = {}): Promise<SeedResult> {
  const db = getDb();

  // Execute in transaction
  db.exec('BEGIN TRANSACTION;');

  try {
    if (options.force) {
      db.exec(`
        DELETE FROM study_sessions;
        DELETE FROM quiz_submissions;
        DELETE FROM parent_assignments;
        DELETE FROM student_gamification;
        DELETE FROM questions;
        DELETE FROM lessons;
        DELETE FROM physics_topics;
        DELETE FROM family_links;
        DELETE FROM users;
      `);
    }

    // Check if already seeded
    const existingUsers = db.get<{ count: number }>('SELECT COUNT(*) as count FROM users');
    if (existingUsers && existingUsers.count > 0 && !options.force) {
      db.exec('COMMIT;');
      return {
        usersCount: existingUsers.count,
        topicsCount: (db.get<{ count: number }>('SELECT COUNT(*) as count FROM physics_topics') || { count: 0 }).count,
        lessonsCount: (db.get<{ count: number }>('SELECT COUNT(*) as count FROM lessons') || { count: 0 }).count,
        questionsCount: (db.get<{ count: number }>('SELECT COUNT(*) as count FROM questions') || { count: 0 }).count,
        assignmentsCount: (db.get<{ count: number }>('SELECT COUNT(*) as count FROM parent_assignments') || { count: 0 }).count,
        gamificationCount: (db.get<{ count: number }>('SELECT COUNT(*) as count FROM student_gamification') || { count: 0 }).count,
      };
    }

    // 1. Seed Users
    const defaultPasswordHash = hashPassword('123456');

    const adminUser = db.run(
      `INSERT INTO users (username, password_hash, role, name, full_name, avatar)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['admin', defaultPasswordHash, 'admin', 'Quản trị viên Hệ thống', 'Quản trị viên Hệ thống', 'avatar-admin']
    );

    const parentUser = db.run(
      `INSERT INTO users (username, password_hash, role, name, full_name, avatar)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['phuhuynh1', defaultPasswordHash, 'parent', 'Nguyễn Văn Phụ Huynh', 'Nguyễn Văn Phụ Huynh', 'avatar-parent']
    );
    const parentId = Number(parentUser.lastInsertRowid);

    const studentUser = db.run(
      `INSERT INTO users (username, password_hash, role, name, full_name, avatar, grade)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['hocsinh1', defaultPasswordHash, 'student', 'Nguyễn Văn Học Sinh', 'Nguyễn Văn Học Sinh', 'avatar-student', 7]
    );
    const studentId = Number(studentUser.lastInsertRowid);

    // 2. Seed Family Linkage
    db.run(
      `INSERT INTO family_links (parent_id, student_id, relationship)
       VALUES (?, ?, ?)`,
      [parentId, studentId, 'parent']
    );

    // 3. Seed Gamification State for Student
    const initialBadges = [
      {
        badge_id: 'first_step',
        title: 'Bước Chân Đầu Tiên',
        description: 'Hoàn thành bài học vật lý đầu tiên',
        icon: 'footprints',
        tier: 'bronze',
        awarded_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        badge_id: 'streak_3',
        title: 'Chăm Chỉ 3 Ngày',
        description: 'Duy trì chuỗi 3 ngày học liên tiếp',
        icon: 'flame',
        tier: 'bronze',
        awarded_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    const todayStr = new Date().toISOString().slice(0, 10);
    db.run(
      `INSERT INTO student_gamification (student_id, stars, current_streak, longest_streak, last_active_date, badges_json, level)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [studentId, 120, 3, 5, todayStr, JSON.stringify(initialBadges), 2]
    );

    // 4. Seed Curriculum (Topics, Lessons, Questions) for all 12 Grades
    let seededTopicsCount = 0;
    let seededLessonsCount = 0;
    let seededQuestionsCount = 0;
    let firstTopicId = 0;
    let firstLessonId = 0;
    const topicByGrade = new Map<number, { topicId: number; lessonId: number }>();

    for (let i = 0; i < CURRICULUM_DATA.length; i++) {
      const curriculumItem = CURRICULUM_DATA[i];
      const topicResult = db.run(
        `INSERT INTO physics_topics (
          grade, tier, title, slug, description, order_num, order_index, icon
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          curriculumItem.grade,
          curriculumItem.tier,
          curriculumItem.topicTitle,
          curriculumItem.slug,
          curriculumItem.topicDescription,
          i + 1,
          i + 1,
          curriculumItem.icon,
        ]
      );
      const topicId = Number(topicResult.lastInsertRowid);
      if (firstTopicId === 0) firstTopicId = topicId;
      seededTopicsCount++;

      // Seed Lesson
      const lessonResult = db.run(
        `INSERT INTO lessons (
          topic_id, title, slug, content_markdown, summary, parent_guide, order_num, order_index, estimated_duration_minutes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          topicId,
          curriculumItem.lessonTitle,
          curriculumItem.lessonSlug,
          curriculumItem.contentMarkdown,
          curriculumItem.summary,
          JSON.stringify(curriculumItem.parentGuide),
          1,
          1,
          curriculumItem.durationMinutes || 20,
        ]
      );
      const lessonId = Number(lessonResult.lastInsertRowid);
      if (firstLessonId === 0) firstLessonId = lessonId;
      seededLessonsCount++;

      topicByGrade.set(curriculumItem.grade, { topicId, lessonId });

      // Seed Questions
      for (const q of curriculumItem.questions) {
        db.run(
          `INSERT INTO questions (
            topic_id, lesson_id, question_type, prompt, question_text, latex_formula,
            options, options_json, correct_answer, numeric_tolerance, numeric_unit, unit,
            hints, hints_json, explanation, difficulty, points
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            topicId,
            lessonId,
            q.question_type,
            q.prompt,
            q.prompt,
            q.latex_formula || null,
            JSON.stringify(q.options || []),
            JSON.stringify(q.options || []),
            q.correct_answer,
            q.numeric_tolerance !== undefined ? q.numeric_tolerance : 0.02,
            q.numeric_unit || null,
            q.numeric_unit || null,
            JSON.stringify(q.hints || []),
            JSON.stringify(q.hints || []),
            q.explanation,
            q.difficulty || 'medium',
            q.points || 10,
          ]
        );
        seededQuestionsCount++;
      }
    }

    // 5. Seed Sample Assignments for Parent Workspace
    const dueTomorrow = new Date(Date.now() + 86400000).toISOString();
    const g1 = topicByGrade.get(1) || { topicId: firstTopicId, lessonId: firstLessonId };
    const g7 = topicByGrade.get(7) || { topicId: firstTopicId, lessonId: firstLessonId };

    // Assignment 1: Active assigned
    db.run(
      `INSERT INTO parent_assignments (
        parent_id, student_id, topic_id, lesson_id, title, description, instructions, due_date, status, reward_description, reward_text, reward_stars
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parentId,
        studentId,
        g1.topicId,
        g1.lessonId,
        'Thực hành thí nghiệm Ánh sáng & Làm bài tập',
        'Con đọc kỹ bài học và làm 2 câu hỏi trắc nghiệm nhé!',
        'Con đọc kỹ bài học và làm 2 câu hỏi trắc nghiệm nhé!',
        dueTomorrow,
        'assigned',
        'Đi ăn kem Tràng Tiền cuối tuần',
        'Đi ăn kem Tràng Tiền cuối tuần',
        20,
      ]
    );

    // Assignment 2: Completed, ready for parent reward approval
    db.run(
      `INSERT INTO parent_assignments (
        parent_id, student_id, topic_id, lesson_id, title, description, instructions, due_date, status, reward_description, reward_text, reward_stars, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parentId,
        studentId,
        g7.topicId,
        g7.lessonId,
        'Khảo sát Tốc độ chuyển động & Đồ thị quãng đường',
        'Hoàn thành bài luyện tập để củng cố kiến thức đo tốc độ.',
        'Hoàn thành bài luyện tập để củng cố kiến thức đo tốc độ.',
        dueTomorrow,
        'completed',
        'Xem phim hoạt hình rạp cuối tuần',
        'Xem phim hoạt hình rạp cuối tuần',
        30,
        new Date().toISOString(),
      ]
    );

    // 6. Seed Sample Study Sessions for Dashboard Metrics
    db.run(
      `INSERT INTO study_sessions (student_id, topic_id, lesson_id, session_type, duration_seconds, session_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [studentId, g1.topicId, g1.lessonId, 'learn', 1200, todayStr]
    );
    db.run(
      `INSERT INTO study_sessions (student_id, topic_id, lesson_id, session_type, duration_seconds, session_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [studentId, g7.topicId, g7.lessonId, 'practice', 1800, todayStr]
    );
    db.run(
      `INSERT INTO study_sessions (student_id, topic_id, lesson_id, session_type, duration_seconds, session_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [studentId, (topicByGrade.get(2) || g1).topicId, (topicByGrade.get(2) || g1).lessonId, 'simulation', 900, todayStr]
    );

    // 7. Seed Sample Quiz Submissions (Mastered, Developing, Critical)
    const g2 = topicByGrade.get(2) || g1;

    // Submission 1: Grade 1 Topic -> 90% (Mastered)
    db.run(
      `INSERT INTO quiz_submissions (
        user_id, quiz_type, topic_id, lesson_id, score, total_questions, correct_count, time_spent_seconds, stars_earned, answers_json, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        'practice',
        g1.topicId,
        g1.lessonId,
        90.0,
        10,
        9,
        340,
        25,
        JSON.stringify([{ qId: 1, isCorrect: true }, { qId: 2, isCorrect: true }]),
        new Date(Date.now() - 3600000 * 5).toISOString(),
      ]
    );

    // Submission 2: Grade 2 Topic -> 70% (Developing)
    db.run(
      `INSERT INTO quiz_submissions (
        user_id, quiz_type, topic_id, lesson_id, score, total_questions, correct_count, time_spent_seconds, stars_earned, answers_json, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        'practice',
        g2.topicId,
        g2.lessonId,
        70.0,
        10,
        7,
        480,
        15,
        JSON.stringify([{ qId: 3, isCorrect: true }, { qId: 4, isCorrect: false }]),
        new Date(Date.now() - 3600000 * 2).toISOString(),
      ]
    );

    // Submission 3: Grade 7 Topic -> 50% (Critical Knowledge Gap)
    db.run(
      `INSERT INTO quiz_submissions (
        user_id, quiz_type, topic_id, lesson_id, score, total_questions, correct_count, time_spent_seconds, stars_earned, answers_json, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        'exam',
        g7.topicId,
        g7.lessonId,
        50.0,
        10,
        5,
        620,
        10,
        JSON.stringify([{ qId: 5, isCorrect: false }, { qId: 6, isCorrect: true }]),
        new Date(Date.now() - 3600000 * 1).toISOString(),
      ]
    );

    db.exec('COMMIT;');

    return {
      usersCount: 3,
      topicsCount: seededTopicsCount,
      lessonsCount: seededLessonsCount,
      questionsCount: seededQuestionsCount,
      assignmentsCount: 2,
      gamificationCount: 1,
    };
  } catch (error) {
    db.exec('ROLLBACK;');
    throw error;
  }
}

// Support CLI execution
if (process.argv[1]?.includes('seed')) {
  seedDatabase({ force: true })
    .then((res) => {
      console.log('✅ Database seeded successfully:', res);
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}
