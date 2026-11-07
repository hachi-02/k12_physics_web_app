import { describe, it, expect, beforeEach } from 'vitest';
import {
  seedTextbook,
  getTextbookToc,
  getTextbookLesson,
  getTextbookChapterReview,
  markTheoryRead,
  submitTextbookExercises,
  isLessonCompleted,
} from '../../lib/textbook';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';

describe('Textbook Curriculum (KHTN 6 - GDPT 2018 - Kết nối tri thức)', () => {
  beforeEach(async () => {
    const db = getDb();
    await seedDatabase({ force: true });
    seedTextbook({ force: true }, db);
  });

  describe('Database Structure & Seeding', () => {
    it('should seed Grade 6 with 4 chapters, 20 lessons and 60 exercises', () => {
      const counts = seedTextbook({ force: true });
      expect(counts.chapters).toBe(4);
      expect(counts.lessons).toBe(20);
      expect(counts.exercises).toBe(60);
    });

    it('should return null TOC for unsupported grades (e.g. Grade 13)', () => {
      const toc = getTextbookToc(13);
      expect(toc).toBeNull();
    });
  });

  describe('Textbook Table of Contents (TOC)', () => {
    it('should retrieve Grade 6 TOC with 4 chapters in ascending order', () => {
      const toc = getTextbookToc(6);
      expect(toc).not.toBeNull();
      expect(toc!.grade).toBe(6);
      expect(toc!.subject).toBe('Vật lý (KHTN 6)');
      expect(toc!.bookSeries).toBe('Kết nối tri thức với cuộc sống');
      expect(toc!.chapters.length).toBe(4);

      const romans = toc!.chapters.map((c) => c.roman);
      expect(romans).toEqual(['I', 'VIII', 'IX', 'X']);
    });

    it('should contain all 20 lessons across the 4 chapters', () => {
      const toc = getTextbookToc(6);
      const allLessons = toc!.chapters.flatMap((c) => c.lessons);
      expect(allLessons.length).toBe(20);

      // Verify lesson numbers match the textbook structure
      const lessonNumbers = allLessons.map((l) => l.number);
      expect(lessonNumbers).toEqual([
        5, 6, 7, 8, // Chương I
        40, 41, 42, 43, 44, 45, // Chương VIII
        46, 47, 48, 49, 50, 51, // Chương IX
        52, 53, 54, 55, // Chương X
      ]);

      // Every lesson must have at least 3 exercises
      allLessons.forEach((l) => {
        expect(l.exerciseCount).toBe(3);
      });
    });
  });

  describe('Textbook Lesson Detail', () => {
    it('should retrieve complete lesson detail with objectives, markdown theory, key points, and exercises', () => {
      const toc = getTextbookToc(6)!;
      const firstLessonSummary = toc.chapters[0].lessons[0];
      const lesson = getTextbookLesson(firstLessonSummary.id);

      expect(lesson).not.toBeNull();
      expect(lesson!.number).toBe(5);
      expect(lesson!.title).toContain('Đo chiều dài');
      expect(lesson!.objectives.length).toBeGreaterThanOrEqual(2);
      expect(lesson!.content).toContain('## I.');
      expect(lesson!.content).toContain('## II.');
      expect(lesson!.keyPoints.length).toBeGreaterThanOrEqual(2);
      expect(lesson!.exercises.length).toBe(3);

      // Verify the 3 difficulty levels
      const levels = lesson!.exercises.map((e) => e.level);
      expect(levels).toEqual(['nhan_biet', 'thong_hieu', 'van_dung']);
    });

    it('should correctly link sibling prevLesson and nextLesson', () => {
      const toc = getTextbookToc(6)!;
      const lesson5 = getTextbookLesson(toc.chapters[0].lessons[0].id)!;
      expect(lesson5.prevLesson).toBeNull();
      expect(lesson5.nextLesson).not.toBeNull();
      expect(lesson5.nextLesson!.number).toBe(6);

      const lesson6 = getTextbookLesson(toc.chapters[0].lessons[1].id)!;
      expect(lesson6.prevLesson).not.toBeNull();
      expect(lesson6.prevLesson!.number).toBe(5);
      expect(lesson6.nextLesson).not.toBeNull();
      expect(lesson6.nextLesson!.number).toBe(7);
    });
  });

  describe('Textbook Chapter Review', () => {
    it('should retrieve chapter review with synthesized key points and exercises', () => {
      const toc = getTextbookToc(6)!;
      const ch1 = toc.chapters[0];
      const review = getTextbookChapterReview(ch1.id);

      expect(review).not.toBeNull();
      expect(review!.roman).toBe('I');
      expect(review!.lessons.length).toBe(4);
      expect(review!.exercises.length).toBe(12); // 4 lessons * 3 exercises

      // Each lesson in review should have key points
      review!.lessons.forEach((l) => {
        expect(l.keyPoints.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Progress Tracking & Exercise Evaluation', () => {
    it('should mark theory as read and reflect in TOC', () => {
      const db = getDb();
      const student = db.get<{ id: number }>('SELECT id FROM users WHERE role = ? LIMIT 1', ['student'])!;
      const studentId = student.id;

      const tocBefore = getTextbookToc(6, studentId)!;
      const firstLesson = tocBefore.chapters[0].lessons[0];
      expect(firstLesson.theoryRead).toBe(false);

      markTheoryRead(studentId, firstLesson.id);

      const tocAfter = getTextbookToc(6, studentId)!;
      const updatedLesson = tocAfter.chapters[0].lessons[0];
      expect(updatedLesson.theoryRead).toBe(true);
    });

    it('should evaluate answers correctly and update best score', () => {
      const db = getDb();
      const student = db.get<{ id: number }>('SELECT id FROM users WHERE role = ? LIMIT 1', ['student'])!;
      const studentId = student.id;

      const toc = getTextbookToc(6, studentId)!;
      const lesson = getTextbookLesson(toc.chapters[0].lessons[0].id)!;
      const ex1 = lesson.exercises[0];
      const ex2 = lesson.exercises[1];

      // Submit 1 correct answer and 1 incorrect answer
      const result = submitTextbookExercises(studentId, [
        { questionId: ex1.id, userAnswer: ex1.correctAnswer, hintsUsed: 0 },
        { questionId: ex2.id, userAnswer: 'wrong_answer_xyz', hintsUsed: 0 },
      ]);

      expect(result.total).toBe(2);
      expect(result.correct).toBe(1);
      expect(result.score).toBe(50);
      expect(result.starsEarned).toBeGreaterThan(0);

      // Verify TOC now shows the score
      const tocAfter = getTextbookToc(6, studentId)!;
      const updated = tocAfter.chapters[0].lessons[0];
      expect(updated.bestScore).toBe(50);
      expect(isLessonCompleted(updated)).toBe(true);
    });

    it('should award fewer stars when hints are used', () => {
      const db = getDb();
      const student = db.get<{ id: number }>('SELECT id FROM users WHERE role = ? LIMIT 1', ['student'])!;
      const studentId = student.id;

      const toc = getTextbookToc(6, studentId)!;
      const lesson = getTextbookLesson(toc.chapters[0].lessons[0].id)!;
      const ex1 = lesson.exercises[0];

      // Submit correct answer without hints
      const resNoHints = submitTextbookExercises(studentId, [
        { questionId: ex1.id, userAnswer: ex1.correctAnswer, hintsUsed: 0 },
      ]);

      // Submit correct answer with 2 hints used
      const resWithHints = submitTextbookExercises(studentId, [
        { questionId: ex1.id, userAnswer: ex1.correctAnswer, hintsUsed: 2 },
      ]);

      expect(resNoHints.correct).toBe(1);
      expect(resWithHints.correct).toBe(1);
      expect(resWithHints.starsEarned).toBeLessThan(resNoHints.starsEarned);
      expect(resWithHints.starsEarned).toBe(1); // clamped to min 1 star
      expect(resNoHints.starsEarned).toBe(2);
    });
  });
});
