// tests/unit/seed_data.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import type { ParentGuide, McqOption, QuestionHint } from '../../types/database';

describe('Curriculum Seed Data & Pedagogical Quality (M1)', () => {
  let db: ReturnType<typeof getDb>;

  beforeAll(async () => {
    // Reset and seed database
    db = getDb();
    await seedDatabase({ force: true });
  });

  describe('User Personas & Family Linking', () => {
    it('should seed admin, parent (phuhuynh1), and student (hocsinh1)', () => {
      const admin = db.get('SELECT * FROM users WHERE username = ?', ['admin']);
      const parent = db.get('SELECT * FROM users WHERE username = ?', ['phuhuynh1']);
      const student = db.get('SELECT * FROM users WHERE username = ?', ['hocsinh1']);

      expect(admin).toBeDefined();
      expect(admin.role).toBe('admin');

      expect(parent).toBeDefined();
      expect(parent.role).toBe('parent');

      expect(student).toBeDefined();
      expect(student.role).toBe('student');
      expect(student.grade).toBe(7);
    });

    it('should establish a family link connecting phuhuynh1 to hocsinh1', () => {
      const parent = db.get('SELECT id FROM users WHERE username = ?', ['phuhuynh1']);
      const student = db.get('SELECT id FROM users WHERE username = ?', ['hocsinh1']);

      const link = db.get(
        'SELECT * FROM family_links WHERE parent_id = ? AND student_id = ?',
        [parent.id, student.id]
      );

      expect(link).toBeDefined();
      expect(link.relationship).toBe('parent');
    });

    it('should seed initial gamification state for hocsinh1', () => {
      const student = db.get('SELECT id FROM users WHERE username = ?', ['hocsinh1']);
      const gamification = db.get(
        'SELECT * FROM student_gamification WHERE student_id = ?',
        [student.id]
      );

      expect(gamification).toBeDefined();
      expect(gamification.stars).toBeGreaterThanOrEqual(100);
      expect(gamification.current_streak).toBeGreaterThanOrEqual(1);

      const badges = JSON.parse(gamification.badges_json);
      expect(Array.isArray(badges)).toBe(true);
      expect(badges.length).toBeGreaterThan(0);
      expect(badges[0]).toHaveProperty('badge_id');
      expect(badges[0]).toHaveProperty('title');
    });
  });

  describe('12-Grade Curriculum & Tier Representation', () => {
    it('should contain topics for all 12 grades without gaps', () => {
      const topics = db.query<{ grade: number }>('SELECT DISTINCT grade FROM physics_topics ORDER BY grade ASC');
      const presentGrades = topics.map((t) => t.grade);

      for (let grade = 1; grade <= 12; grade++) {
        expect(presentGrades).toContain(grade);
      }
    });

    it('should strictly map grades to appropriate educational tiers', () => {
      const topics = db.query<{ grade: number; tier: string }>('SELECT grade, tier FROM physics_topics');

      for (const topic of topics) {
        if (topic.grade >= 1 && topic.grade <= 5) {
          expect(['primary']).toContain(topic.tier);
        } else if (topic.grade >= 6 && topic.grade <= 9) {
          expect(['middle', 'lower_secondary']).toContain(topic.tier);
        } else if (topic.grade >= 10 && topic.grade <= 12) {
          expect(['high', 'upper_secondary']).toContain(topic.tier);
        }
      }
    });

    it('should ensure every topic has at least one associated lesson', () => {
      const topics = db.query<{ id: number; title: string }>('SELECT id, title FROM physics_topics');

      for (const topic of topics) {
        const lessons = db.query<{ id: number; content_markdown: string }>(
          'SELECT id, content_markdown FROM lessons WHERE topic_id = ?',
          [topic.id]
        );
        expect(lessons.length).toBeGreaterThanOrEqual(1);
        expect(lessons[0].content_markdown.length).toBeGreaterThan(50);
      }
    });
  });

  describe('Parent Guide Pedagogical Schema Conformance', () => {
    it('should have valid Parent Guide JSON for every lesson', () => {
      const lessons = db.query<{ id: number; parent_guide: string }>('SELECT id, parent_guide FROM lessons');

      for (const lesson of lessons) {
        expect(lesson.parent_guide).toBeTruthy();
        let guide: ParentGuide;
        expect(() => {
          guide = JSON.parse(lesson.parent_guide);
        }).not.toThrow();

        // Check required fields
        expect(typeof guide!.summary).toBe('string');
        expect(guide!.summary.length).toBeGreaterThan(15);

        expect(Array.isArray(guide!.misconceptions)).toBe(true);
        expect(guide!.misconceptions.length).toBeGreaterThanOrEqual(1);

        expect(Array.isArray(guide!.guiding_questions)).toBe(true);
        expect(guide!.guiding_questions.length).toBeGreaterThanOrEqual(1);

        expect(Array.isArray(guide!.home_experiments)).toBe(true);
        expect(guide!.home_experiments.length).toBeGreaterThanOrEqual(1);

        const exp = guide!.home_experiments[0];
        expect(typeof exp.title).toBe('string');
        expect(Array.isArray(exp.materials)).toBe(true);
        expect(exp.materials.length).toBeGreaterThan(0);
        expect(Array.isArray(exp.steps)).toBe(true);
        expect(exp.steps.length).toBeGreaterThan(0);
        expect(typeof exp.expected_outcome).toBe('string');
      }
    });
  });

  describe('Assessment Questions: MCQ, Numeric & Progressive Hints', () => {
    it('should include both MCQ and Numeric question types across curriculum', () => {
      const mcqCount = db.get<{ count: number }>(
        "SELECT COUNT(*) as count FROM questions WHERE question_type = 'mcq'"
      )!.count;
      const numericCount = db.get<{ count: number }>(
        "SELECT COUNT(*) as count FROM questions WHERE question_type = 'numeric'"
      )!.count;

      expect(mcqCount).toBeGreaterThanOrEqual(8);
      expect(numericCount).toBeGreaterThanOrEqual(4);
    });

    it('should validate MCQ options and correct_answer conformity', () => {
      const mcqs = db.query<{
        id: number;
        options: string;
        options_json: string;
        correct_answer: string;
      }>("SELECT id, options, options_json, correct_answer FROM questions WHERE question_type = 'mcq'");

      for (const q of mcqs) {
        const rawOptions = q.options || q.options_json;
        const options: McqOption[] = JSON.parse(rawOptions);
        expect(Array.isArray(options)).toBe(true);
        expect(options.length).toBe(4);

        const optionIds = options.map((opt) => opt.id);
        expect(optionIds).toEqual(['A', 'B', 'C', 'D']);
        expect(optionIds).toContain(q.correct_answer);

        for (const opt of options) {
          expect(opt.text.length).toBeGreaterThan(0);
        }
      }
    });

    it('should validate Numeric question tolerance and units', () => {
      const numerics = db.query<{
        id: number;
        correct_answer: string;
        numeric_tolerance: number;
        numeric_unit: string;
      }>("SELECT id, correct_answer, numeric_tolerance, numeric_unit FROM questions WHERE question_type = 'numeric'");

      for (const q of numerics) {
        const parsedVal = parseFloat(q.correct_answer);
        expect(isNaN(parsedVal)).toBe(false);
        expect(isFinite(parsedVal)).toBe(true);

        expect(q.numeric_tolerance).toBeGreaterThan(0);
        expect(typeof q.numeric_unit).toBe('string');
        expect(q.numeric_unit.length).toBeGreaterThan(0);
      }
    });

    it('should validate 3-level progressive hints structure', () => {
      const questions = db.query<{ id: number; hints: string; hints_json: string }>(
        'SELECT id, hints, hints_json FROM questions'
      );

      for (const q of questions) {
        const rawHints = q.hints || q.hints_json;
        const hints: QuestionHint[] = JSON.parse(rawHints);
        expect(Array.isArray(hints)).toBe(true);
        if (hints.length > 0) {
          expect(hints[0].level).toBe(1);
          expect(typeof hints[0].hint).toBe('string');
          expect(hints[0].hint.length).toBeGreaterThan(5);
        }
      }
    });
  });
});
