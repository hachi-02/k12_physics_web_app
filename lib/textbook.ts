/**
 * Textbook-structured curriculum (Lớp → Chương → Bài → Kiến thức + Bài tập)
 * Mirrors the chapter/lesson layout of the GDPT 2018 textbooks (bộ "Kết nối tri thức với cuộc sống").
 * Content is originally written for this app — not copied from the textbook.
 */
import { getDb, type DatabaseClient } from './db';
import { evaluateQuestionAnswer } from './grading';
import type { McqOption, QuestionHint } from '../types/database';
import type { ClientQuestionItem } from './student';
import { TEXTBOOK_GRADE_6 } from './textbook-data/grade6';

export type ExerciseLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung';

export const LEVEL_LABELS: Record<ExerciseLevel, string> = {
  nhan_biet: 'Nhận biết',
  thong_hieu: 'Thông hiểu',
  van_dung: 'Vận dụng',
};

// ---------------------------------------------------------------------------
// Seed data types
// ---------------------------------------------------------------------------
export interface TextbookExerciseSeed {
  level: ExerciseLevel;
  type: 'mcq' | 'numeric';
  prompt: string;
  options?: McqOption[];
  answer: string;
  tolerance?: number;
  unit?: string;
  hints: string[];
  explanation: string;
}

export interface TextbookLessonSeed {
  number: number;
  title: string;
  objectives: string[];
  content: string; // Markdown + KaTeX, sections "## I. ...", "## II. ..."
  keyPoints: string[]; // "Em cần nhớ"
  exercises: TextbookExerciseSeed[];
}

export interface TextbookChapterSeed {
  number: number;
  roman: string;
  title: string;
  description: string;
  lessons: TextbookLessonSeed[];
}

export interface TextbookGradeSeed {
  grade: number;
  subject: string;
  bookSeries: string;
  chapters: TextbookChapterSeed[];
}

// ---------------------------------------------------------------------------
// Schema (idempotent – safe on existing databases)
// ---------------------------------------------------------------------------
export const TEXTBOOK_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS textbook_chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grade INTEGER NOT NULL CHECK(grade >= 1 AND grade <= 12),
  subject TEXT NOT NULL,
  book_series TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  roman TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  UNIQUE(grade, book_series, chapter_number)
);

CREATE TABLE IF NOT EXISTS textbook_lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id INTEGER NOT NULL REFERENCES textbook_chapters(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  objectives_json TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  key_points_json TEXT NOT NULL,
  UNIQUE(chapter_id, lesson_number)
);
CREATE INDEX IF NOT EXISTS idx_textbook_lessons_chapter ON textbook_lessons(chapter_id, lesson_number);

CREATE TABLE IF NOT EXISTS textbook_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER NOT NULL REFERENCES textbook_lessons(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,
  level TEXT NOT NULL CHECK(level IN ('nhan_biet', 'thong_hieu', 'van_dung')),
  question_type TEXT NOT NULL CHECK(question_type IN ('mcq', 'numeric')),
  prompt TEXT NOT NULL,
  options_json TEXT,
  correct_answer TEXT NOT NULL,
  numeric_tolerance REAL DEFAULT 0.02,
  numeric_unit TEXT,
  hints_json TEXT NOT NULL,
  explanation TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 10
);
CREATE INDEX IF NOT EXISTS idx_textbook_exercises_lesson ON textbook_exercises(lesson_id, order_num);

CREATE TABLE IF NOT EXISTS textbook_progress (
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES textbook_lessons(id) ON DELETE CASCADE,
  theory_read INTEGER NOT NULL DEFAULT 0,
  best_score REAL,
  attempts INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  PRIMARY KEY (student_id, lesson_id)
);
`;

const ALL_GRADES: TextbookGradeSeed[] = [TEXTBOOK_GRADE_6];

export function ensureTextbookSchema(db: DatabaseClient = getDb()): void {
  db.exec(TEXTBOOK_SCHEMA_SQL);
}

/**
 * Inserts textbook data for every grade that is not yet present.
 * `force` wipes and reloads chapters/lessons/exercises (progress is cascaded).
 */
export function seedTextbook(options: { force?: boolean } = {}, db: DatabaseClient = getDb()) {
  ensureTextbookSchema(db);
  const counts = { chapters: 0, lessons: 0, exercises: 0 };

  for (const gradeSeed of ALL_GRADES) {
    const existing = db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM textbook_chapters WHERE grade = ? AND book_series = ?',
      [gradeSeed.grade, gradeSeed.bookSeries]
    );
    if (existing && existing.count > 0) {
      if (!options.force) continue;
      db.run('DELETE FROM textbook_chapters WHERE grade = ? AND book_series = ?', [
        gradeSeed.grade,
        gradeSeed.bookSeries,
      ]);
    }

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const ch of gradeSeed.chapters) {
        const chRes = db.run(
          `INSERT INTO textbook_chapters (grade, subject, book_series, chapter_number, roman, title, description)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [gradeSeed.grade, gradeSeed.subject, gradeSeed.bookSeries, ch.number, ch.roman, ch.title, ch.description]
        );
        const chapterId = Number(chRes.lastInsertRowid);
        counts.chapters++;

        for (const ls of ch.lessons) {
          const lsRes = db.run(
            `INSERT INTO textbook_lessons (chapter_id, lesson_number, title, objectives_json, content_markdown, key_points_json)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [chapterId, ls.number, ls.title, JSON.stringify(ls.objectives), ls.content, JSON.stringify(ls.keyPoints)]
          );
          const lessonId = Number(lsRes.lastInsertRowid);
          counts.lessons++;

          ls.exercises.forEach((ex, idx) => {
            const hints: QuestionHint[] = ex.hints.map((h, i) => ({ level: i + 1, hint: h }));
            db.run(
              `INSERT INTO textbook_exercises (lesson_id, order_num, level, question_type, prompt, options_json,
                 correct_answer, numeric_tolerance, numeric_unit, hints_json, explanation, points)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                lessonId,
                idx + 1,
                ex.level,
                ex.type,
                ex.prompt,
                ex.options ? JSON.stringify(ex.options) : null,
                ex.answer,
                ex.tolerance ?? 0.02,
                ex.unit ?? null,
                JSON.stringify(hints),
                ex.explanation,
                ex.level === 'van_dung' ? 15 : 10,
              ]
            );
            counts.exercises++;
          });
        }
      }
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }
  return counts;
}

/** Makes sure tables + data exist before any read (lazy, cheap after first call). */
function ready(): DatabaseClient {
  const db = getDb();
  ensureTextbookSchema(db);
  seedTextbook({}, db);
  return db;
}

// ---------------------------------------------------------------------------
// Read models
// ---------------------------------------------------------------------------
export interface TextbookLessonSummary {
  id: number;
  number: number;
  title: string;
  exerciseCount: number;
  theoryRead: boolean;
  bestScore: number | null;
}

export interface TextbookChapterSummary {
  id: number;
  number: number;
  roman: string;
  title: string;
  description: string;
  lessons: TextbookLessonSummary[];
  completedCount: number;
}

export interface TextbookToc {
  grade: number;
  subject: string;
  bookSeries: string;
  chapters: TextbookChapterSummary[];
}

/** A lesson counts as completed when its exercises were done with ≥ 50%. */
export function isLessonCompleted(l: Pick<TextbookLessonSummary, 'bestScore' | 'theoryRead' | 'exerciseCount'>) {
  if (l.exerciseCount === 0) return l.theoryRead;
  return l.bestScore !== null && l.bestScore >= 50;
}

export function getTextbookToc(grade: number, studentId?: number): TextbookToc | null {
  const db = ready();
  const chapters = db.query<{
    id: number; grade: number; subject: string; book_series: string;
    chapter_number: number; roman: string; title: string; description: string;
  }>('SELECT * FROM textbook_chapters WHERE grade = ? ORDER BY chapter_number ASC', [grade]);
  if (chapters.length === 0) return null;

  const lessons = db.query<{
    id: number; chapter_id: number; lesson_number: number; title: string;
    exercise_count: number; theory_read: number | null; best_score: number | null;
  }>(
    `SELECT l.id, l.chapter_id, l.lesson_number, l.title,
            (SELECT COUNT(*) FROM textbook_exercises e WHERE e.lesson_id = l.id) AS exercise_count,
            p.theory_read, p.best_score
       FROM textbook_lessons l
       JOIN textbook_chapters c ON c.id = l.chapter_id
       LEFT JOIN textbook_progress p ON p.lesson_id = l.id AND p.student_id = ?
      WHERE c.grade = ?
      ORDER BY l.lesson_number ASC`,
    [studentId ?? -1, grade]
  );

  return {
    grade,
    subject: chapters[0].subject,
    bookSeries: chapters[0].book_series,
    chapters: chapters.map((c) => {
      const ls: TextbookLessonSummary[] = lessons
        .filter((l) => l.chapter_id === c.id)
        .map((l) => ({
          id: l.id,
          number: l.lesson_number,
          title: l.title,
          exerciseCount: l.exercise_count,
          theoryRead: Boolean(l.theory_read),
          bestScore: l.best_score,
        }));
      return {
        id: c.id,
        number: c.chapter_number,
        roman: c.roman,
        title: c.title,
        description: c.description,
        lessons: ls,
        completedCount: ls.filter(isLessonCompleted).length,
      };
    }),
  };
}

export interface TextbookLessonDetail {
  id: number;
  number: number;
  title: string;
  grade: number;
  chapter: { id: number; number: number; roman: string; title: string };
  objectives: string[];
  content: string;
  keyPoints: string[];
  exercises: (ClientQuestionItem & { level: ExerciseLevel; levelLabel: string })[];
  prevLesson: { id: number; number: number; title: string } | null;
  nextLesson: { id: number; number: number; title: string } | null;
}

type ExerciseRow = {
  id: number; lesson_id: number; level: ExerciseLevel; question_type: 'mcq' | 'numeric';
  prompt: string; options_json: string | null; correct_answer: string; numeric_tolerance: number | null;
  numeric_unit: string | null; hints_json: string; explanation: string; points: number;
};

function toClientExercise(r: ExerciseRow, chapterId: number) {
  return {
    id: r.id,
    topicId: chapterId,
    lessonId: r.lesson_id,
    questionType: r.question_type,
    prompt: r.prompt,
    latexFormula: null,
    options: r.options_json ? (JSON.parse(r.options_json) as McqOption[]) : undefined,
    numericUnit: r.numeric_unit,
    numericTolerance: r.numeric_tolerance ?? 0.02,
    hints: JSON.parse(r.hints_json) as QuestionHint[],
    points: r.points,
    difficulty: LEVEL_LABELS[r.level],
    correctAnswer: r.correct_answer,
    explanation: r.explanation,
    level: r.level,
    levelLabel: LEVEL_LABELS[r.level],
  };
}

export function getTextbookLesson(lessonId: number): TextbookLessonDetail | null {
  const db = ready();
  const row = db.get<{
    id: number; lesson_number: number; title: string; objectives_json: string;
    content_markdown: string; key_points_json: string;
    chapter_id: number; chapter_number: number; roman: string; chapter_title: string; grade: number;
  }>(
    `SELECT l.*, c.id AS chapter_id, c.chapter_number, c.roman, c.title AS chapter_title, c.grade
       FROM textbook_lessons l JOIN textbook_chapters c ON c.id = l.chapter_id
      WHERE l.id = ?`,
    [lessonId]
  );
  if (!row) return null;

  const exercises = db
    .query<ExerciseRow>('SELECT * FROM textbook_exercises WHERE lesson_id = ? ORDER BY order_num ASC', [lessonId])
    .map((r) => toClientExercise(r, row.chapter_id));

  const siblings = db.query<{ id: number; lesson_number: number; title: string }>(
    `SELECT l.id, l.lesson_number, l.title FROM textbook_lessons l
       JOIN textbook_chapters c ON c.id = l.chapter_id
      WHERE c.grade = ? AND c.book_series = (SELECT book_series FROM textbook_chapters WHERE id = ?)
      ORDER BY l.lesson_number ASC`,
    [row.grade, row.chapter_id]
  );
  const idx = siblings.findIndex((s) => s.id === row.id);
  const map = (s?: { id: number; lesson_number: number; title: string }) =>
    s ? { id: s.id, number: s.lesson_number, title: s.title } : null;

  return {
    id: row.id,
    number: row.lesson_number,
    title: row.title,
    grade: row.grade,
    chapter: { id: row.chapter_id, number: row.chapter_number, roman: row.roman, title: row.chapter_title },
    objectives: JSON.parse(row.objectives_json),
    content: row.content_markdown,
    keyPoints: JSON.parse(row.key_points_json),
    exercises,
    prevLesson: map(siblings[idx - 1]),
    nextLesson: map(siblings[idx + 1]),
  };
}

export interface TextbookChapterReview {
  id: number;
  number: number;
  roman: string;
  title: string;
  description: string;
  grade: number;
  lessons: { id: number; number: number; title: string; keyPoints: string[] }[];
  exercises: (ClientQuestionItem & { level: ExerciseLevel; levelLabel: string })[];
}

export function getTextbookChapterReview(chapterId: number): TextbookChapterReview | null {
  const db = ready();
  const ch = db.get<{ id: number; chapter_number: number; roman: string; title: string; description: string; grade: number }>(
    'SELECT * FROM textbook_chapters WHERE id = ?',
    [chapterId]
  );
  if (!ch) return null;
  const lessons = db.query<{ id: number; lesson_number: number; title: string; key_points_json: string }>(
    'SELECT id, lesson_number, title, key_points_json FROM textbook_lessons WHERE chapter_id = ? ORDER BY lesson_number',
    [chapterId]
  );
  const exercises = db
    .query<ExerciseRow>(
      `SELECT e.* FROM textbook_exercises e JOIN textbook_lessons l ON l.id = e.lesson_id
        WHERE l.chapter_id = ? ORDER BY l.lesson_number, e.order_num`,
      [chapterId]
    )
    .map((r) => toClientExercise(r, chapterId));

  return {
    id: ch.id,
    number: ch.chapter_number,
    roman: ch.roman,
    title: ch.title,
    description: ch.description,
    grade: ch.grade,
    lessons: lessons.map((l) => ({
      id: l.id,
      number: l.lesson_number,
      title: l.title,
      keyPoints: JSON.parse(l.key_points_json),
    })),
    exercises,
  };
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export function markTheoryRead(studentId: number, lessonId: number): void {
  const db = ready();
  db.run(
    `INSERT INTO textbook_progress (student_id, lesson_id, theory_read) VALUES (?, ?, 1)
     ON CONFLICT(student_id, lesson_id) DO UPDATE SET theory_read = 1, updated_at = CURRENT_TIMESTAMP`,
    [studentId, lessonId]
  );
}

export interface TextbookSubmitResult {
  total: number;
  correct: number;
  score: number;
  starsEarned: number;
  perLesson: { lessonId: number; score: number }[];
}

/**
 * Grades answers server-side (never trusts client correctness) and stores the best score per lesson.
 */
export function submitTextbookExercises(
  studentId: number,
  answers: { questionId: number; userAnswer: string; hintsUsed?: number }[]
): TextbookSubmitResult {
  const db = ready();
  if (!answers.length) throw new Error('Không có câu trả lời nào để chấm');

  const ids = answers.map((a) => Number(a.questionId));
  const rows = db.query<ExerciseRow>(
    `SELECT * FROM textbook_exercises WHERE id IN (${ids.map(() => '?').join(',')})`,
    ids
  );
  const byId = new Map(rows.map((r) => [r.id, r]));

  const lessonStats = new Map<number, { total: number; correct: number }>();
  let correct = 0;
  let stars = 0;

  for (const a of answers) {
    const ex = byId.get(Number(a.questionId));
    if (!ex) continue;
    const result = evaluateQuestionAnswer(
      ex.question_type,
      String(a.userAnswer ?? ''),
      ex.correct_answer,
      ex.numeric_tolerance ?? 0.02,
      ex.points
    );
    const st = lessonStats.get(ex.lesson_id) ?? { total: 0, correct: 0 };
    st.total++;
    if (result.isCorrect) {
      st.correct++;
      correct++;
      stars += Math.max(1, (ex.level === 'van_dung' ? 3 : 2) - (a.hintsUsed ?? 0));
    }
    lessonStats.set(ex.lesson_id, st);
  }

  const total = Array.from(lessonStats.values()).reduce((s, v) => s + v.total, 0);
  if (total === 0) throw new Error('Không tìm thấy câu hỏi hợp lệ');

  const perLesson: { lessonId: number; score: number }[] = [];
  for (const [lessonId, st] of lessonStats) {
    const score = Math.round((st.correct / st.total) * 100);
    perLesson.push({ lessonId, score });
    db.run(
      `INSERT INTO textbook_progress (student_id, lesson_id, best_score, attempts) VALUES (?, ?, ?, 1)
       ON CONFLICT(student_id, lesson_id) DO UPDATE SET
         best_score = MAX(COALESCE(best_score, 0), excluded.best_score),
         attempts = attempts + 1,
         updated_at = CURRENT_TIMESTAMP`,
      [studentId, lessonId, score]
    );
  }

  if (stars > 0) {
    db.run('UPDATE student_gamification SET stars = stars + ? WHERE student_id = ?', [stars, studentId]);
  }

  return { total, correct, score: Math.round((correct / total) * 100), starsEarned: stars, perLesson };
}
