import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import { getLessonsWithParentGuide } from '../../lib/parent';
import katex from 'katex';

describe('Milestone 2: Parent Guide ("Sư phạm tại gia") Pedagogical Engine', () => {
  beforeAll(async () => {
    const db = getDb();
    await seedDatabase({ force: true });
  });

  describe('Lesson Query & Filter Capabilities', () => {
    it('should retrieve all lessons with valid parent guides across grades 6 to 12', () => {
      const allLessons = getLessonsWithParentGuide({});
      expect(allLessons.length).toBeGreaterThanOrEqual(7);

      const grades = new Set(allLessons.map((l) => l.grade));
      for (let g = 6; g <= 12; g++) {
        expect(grades.has(g)).toBe(true);
      }
    });

    it('should filter lessons by specific grade', () => {
      for (let g = 6; g <= 12; g++) {
        const gradeLessons = getLessonsWithParentGuide({ grade: g });
        expect(gradeLessons.length).toBeGreaterThanOrEqual(1);
        expect(gradeLessons.every((l) => l.grade === g)).toBe(true);
      }
    });

    it('should filter lessons by topicId', () => {
      const allLessons = getLessonsWithParentGuide({});
      const targetTopicId = allLessons[0].topicId;

      const filtered = getLessonsWithParentGuide({ topicId: targetTopicId });
      expect(filtered.length).toBeGreaterThanOrEqual(1);
      expect(filtered.every((l) => l.topicId === targetTopicId)).toBe(true);
    });
  });

  describe('Pedagogical Content Schema & Quality Audit', () => {
    it('should ensure every lesson has a rich summary, misconceptions, guiding questions, and home experiments', () => {
      const lessons = getLessonsWithParentGuide({});

      for (const lesson of lessons) {
        const guide = lesson.parentGuide;

        // 1. Summary
        expect(typeof guide.summary).toBe('string');
        expect(guide.summary.length).toBeGreaterThan(20);

        // 2. Misconceptions
        expect(Array.isArray(guide.misconceptions)).toBe(true);
        expect(guide.misconceptions.length).toBeGreaterThanOrEqual(1);
        for (const misc of guide.misconceptions) {
          expect(typeof misc).toBe('string');
          expect(misc.length).toBeGreaterThan(10);
        }

        // 3. Guiding Questions
        expect(Array.isArray(guide.guiding_questions)).toBe(true);
        expect(guide.guiding_questions.length).toBeGreaterThanOrEqual(1);
        for (const q of guide.guiding_questions) {
          expect(typeof q).toBe('string');
          expect(q.length).toBeGreaterThan(10);
        }

        // 4. Safe Home Experiments
        expect(Array.isArray(guide.home_experiments)).toBe(true);
        expect(guide.home_experiments.length).toBeGreaterThanOrEqual(1);
        for (const exp of guide.home_experiments) {
          expect(typeof exp.title).toBe('string');
          expect(exp.title.length).toBeGreaterThan(5);

          expect(Array.isArray(exp.materials)).toBe(true);
          expect(exp.materials.length).toBeGreaterThanOrEqual(1);

          expect(Array.isArray(exp.steps)).toBe(true);
          expect(exp.steps.length).toBeGreaterThanOrEqual(1);

          expect(typeof exp.expected_outcome).toBe('string');
          expect(exp.expected_outcome.length).toBeGreaterThan(10);
        }
      }
    });

    it('should verify all LaTeX formulas within Parent Guide texts compile with KaTeX', () => {
      const lessons = getLessonsWithParentGuide({});
      let formulaCount = 0;

      for (const lesson of lessons) {
        const textsToCheck = [
          lesson.parentGuide.summary,
          ...lesson.parentGuide.misconceptions,
          ...lesson.parentGuide.guiding_questions,
          ...lesson.parentGuide.home_experiments.flatMap((e) => [
            e.title,
            ...e.steps,
            e.expected_outcome,
          ]),
        ];

        for (const text of textsToCheck) {
          const matches = text.match(/\$([^$]+)\$/g);
          if (matches) {
            for (const match of matches) {
              const formula = match.slice(1, -1);
              formulaCount++;
              expect(() => {
                katex.renderToString(formula, { throwOnError: true });
              }).not.toThrow();
            }
          }
        }
      }

      expect(formulaCount).toBeGreaterThan(0);
    });
  });
});
