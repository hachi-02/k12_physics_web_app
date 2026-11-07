import { describe, it, expect, beforeEach } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import { getParentDashboardData, getParentChildren } from '../../lib/parent';

describe('Milestone 2: Parent Dashboard & Knowledge Gap Engine', () => {
  let db: ReturnType<typeof getDb>;
  let parentId: number;
  let studentId: number;

  beforeEach(async () => {
    db = getDb();
    await seedDatabase({ force: true });

    const parent = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['phuhuynh1']);
    const student = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['hocsinh1']);

    expect(parent).toBeDefined();
    expect(student).toBeDefined();

    parentId = parent!.id;
    studentId = student!.id;
  });

  describe('Family Linkage & Child Retrieval', () => {
    it('should retrieve all linked children for parent', () => {
      const children = getParentChildren(parentId);
      expect(Array.isArray(children)).toBe(true);
      expect(children.length).toBeGreaterThanOrEqual(1);

      const child = children[0];
      expect(child.id).toBe(studentId);
      expect(child.username).toBe('hocsinh1');
      expect(child.grade).toBe(7);
      expect(child.name).toBeTruthy();
    });

    it('should return empty array for parent without linked children', () => {
      // Create isolated parent
      const result = db.run(
        `INSERT INTO users (username, password_hash, role, name, email)
         VALUES ('parent_isolated', 'hash123', 'parent', 'Phụ huynh Độc lập', 'iso_parent@example.com')`
      );
      const isoParentId = Number(result.lastInsertRowid);

      const children = getParentChildren(isoParentId);
      expect(children).toEqual([]);

      const dashboard = getParentDashboardData(isoParentId);
      expect(dashboard.selectedChild).toBeNull();
      expect(dashboard.stats.totalQuizzes).toBe(0);
      expect(dashboard.stats.totalStudyTimeMinutes).toBe(0);
    });
  });

  describe('Parent Learning Progress Aggregations', () => {
    it('should aggregate total study time from study_sessions into minutes', () => {
      const data = getParentDashboardData(parentId, studentId);
      // Seed had 1200 + 1800 + 900 = 3900 seconds = 65 minutes
      expect(data.stats.totalStudyTimeMinutes).toBeGreaterThanOrEqual(60);
    });

    it('should calculate quiz count, average score and accuracy rate accurately', () => {
      const data = getParentDashboardData(parentId, studentId);
      // Seed has 3 submissions: 90%, 70%, 50%
      expect(data.stats.totalQuizzes).toBe(3);
      expect(data.stats.avgScore).toBeCloseTo(70.0, 1);
      // Total questions: 10 + 10 + 10 = 30. Correct: 9 + 7 + 5 = 21. Accuracy: 70.0%
      expect(data.stats.accuracyRate).toBeCloseTo(70.0, 1);
    });

    it('should retrieve student gamification stats (stars, streak)', () => {
      const data = getParentDashboardData(parentId, studentId);
      expect(data.stats.totalStars).toBeGreaterThanOrEqual(100);
      expect(data.stats.currentStreak).toBeGreaterThanOrEqual(1);
      expect(data.stats.longestStreak).toBeGreaterThanOrEqual(data.stats.currentStreak);
    });

    it('should list recent quiz submissions in chronological descending order', () => {
      const data = getParentDashboardData(parentId, studentId);
      expect(data.recentSubmissions.length).toBe(3);

      const firstSub = data.recentSubmissions[0];
      const secondSub = data.recentSubmissions[1];

      expect(new Date(firstSub.submittedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(secondSub.submittedAt).getTime()
      );
      expect(firstSub.score).toBeDefined();
      expect(firstSub.correctCount).toBeDefined();
    });
  });

  describe('Knowledge Gap Heatmap & Topic Mastery Categorization', () => {
    it('should classify topic with avg score < 60% as critical knowledge gap', () => {
      const data = getParentDashboardData(parentId, studentId);
      const criticalTopics = data.knowledgeGaps.filter((t) => t.status === 'critical');

      expect(criticalTopics.length).toBeGreaterThanOrEqual(1);
      const critical = criticalTopics[0];
      expect(critical.avgScore).toBeLessThan(60);
      expect(critical.statusLabel).toContain('< 60%');
    });

    it('should classify topic with avg score between 60% and 79% as developing', () => {
      const data = getParentDashboardData(parentId, studentId);
      const developingTopics = data.knowledgeGaps.filter((t) => t.status === 'developing');

      expect(developingTopics.length).toBeGreaterThanOrEqual(1);
      const dev = developingTopics[0];
      expect(dev.avgScore).toBeGreaterThanOrEqual(60);
      expect(dev.avgScore).toBeLessThan(80);
      expect(dev.statusLabel).toContain('60 - 79%');
    });

    it('should classify topic with avg score >= 80% as mastered', () => {
      const data = getParentDashboardData(parentId, studentId);
      const masteredTopics = data.knowledgeGaps.filter((t) => t.status === 'mastered');

      expect(masteredTopics.length).toBeGreaterThanOrEqual(1);
      const mastered = masteredTopics[0];
      expect(mastered.avgScore).toBeGreaterThanOrEqual(80);
      expect(mastered.statusLabel).toContain('≥ 80%');
    });

    it('should classify unattempted topics as unattempted', () => {
      const data = getParentDashboardData(parentId, studentId);
      const unattemptedTopics = data.knowledgeGaps.filter((t) => t.status === 'unattempted');

      expect(unattemptedTopics.length).toBeGreaterThan(0);
      const sample = unattemptedTopics[0];
      expect(sample.quizCount).toBe(0);
      expect(sample.avgScore).toBe(0);
      expect(sample.lastStudiedAt).toBeNull();
    });

    it('should preserve curriculum coverage of grades 6 to 12 in knowledge gap map', () => {
      const data = getParentDashboardData(parentId, studentId);
      const gradesPresent = new Set(data.knowledgeGaps.map((t) => t.grade));

      for (let g = 6; g <= 12; g++) {
        expect(gradesPresent.has(g)).toBe(true);
      }
    });
  });

  describe('Adversarial & Edge Cases', () => {
    it('should throw error when parentId does not exist', () => {
      expect(() => getParentDashboardData(999999)).toThrow(/not found/i);
    });

    it('should fallback to first child if requested studentId does not belong to parent', () => {
      const data = getParentDashboardData(parentId, 888888);
      expect(data.selectedChild).toBeDefined();
      expect(data.selectedChild!.id).toBe(studentId);
    });
  });
});
