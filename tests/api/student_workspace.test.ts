import { describe, it, expect, beforeEach } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import {
  getStudentProfile,
  getTopicsForGrade,
  getLessonTheory,
  getQuestionsForTopic,
  getTierForGrade,
} from '../../lib/student';

describe('Milestone 3: Student Workspace, Theory & Questions Engine', () => {
  let db: ReturnType<typeof getDb>;
  let studentId: number;

  beforeEach(async () => {
    db = getDb();
    await seedDatabase({ force: true });

    const student = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['hocsinh1']);
    expect(student).toBeDefined();
    studentId = student!.id;
  });

  describe('3-Tier Adaptive Mapping & Student Profile', () => {
    it('should map grade numbers strictly to educational tiers', () => {
      // Primary: 1-5
      for (let g = 1; g <= 5; g++) {
        expect(getTierForGrade(g)).toBe('primary');
      }
      // Middle: 6-9
      for (let g = 6; g <= 9; g++) {
        expect(getTierForGrade(g)).toBe('middle');
      }
      // High: 10-12
      for (let g = 10; g <= 12; g++) {
        expect(getTierForGrade(g)).toBe('high');
      }
    });

    it('should retrieve student profile with grade, tier, stars, streak, and badges', () => {
      const profile = getStudentProfile(studentId);
      expect(profile).toBeDefined();
      expect(profile.id).toBe(studentId);
      expect(profile.grade).toBe(7);
      expect(profile.tier).toBe('middle');
      expect(profile.stars).toBeGreaterThanOrEqual(100);
      expect(profile.currentStreak).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(profile.badges)).toBe(true);
      expect(profile.badges.length).toBeGreaterThanOrEqual(1);
    });

    it('should throw error for non-existent student', () => {
      expect(() => getStudentProfile(999999)).toThrow(/Không tìm thấy/i);
    });
  });

  describe('Curriculum Topics per Grade', () => {
    it('should return curriculum topics for any grade between 6 and 12', () => {
      for (let g = 6; g <= 12; g++) {
        const topics = getTopicsForGrade(g, studentId);
        expect(topics.length).toBeGreaterThanOrEqual(1);
        expect(topics[0].grade).toBe(g);
        expect(topics[0].tier).toBe(getTierForGrade(g));
        expect(topics[0].lessonCount).toBeGreaterThanOrEqual(1);
        expect(topics[0].questionCount).toBeGreaterThanOrEqual(1);
      }
    });

    it('should include user best score and quiz count if student attempted topic', () => {
      const grade6Topics = getTopicsForGrade(6, studentId);
      expect(grade6Topics.length).toBeGreaterThanOrEqual(1);
      // Seed had a 90% score on Grade 6 topic
      expect(grade6Topics[0].userBestScore).toBe(90);
      expect(grade6Topics[0].userQuizCount).toBe(1);
    });
  });

  describe('Theory Lesson Content & KaTeX Formula Integrity', () => {
    it('should fetch theory lesson markdown and summary for a topic', () => {
      const topic = db.get<{ id: number }>('SELECT id FROM physics_topics LIMIT 1');
      const lesson = getLessonTheory(topic!.id);

      expect(lesson).toBeDefined();
      expect(lesson.topicId).toBe(topic!.id);
      expect(lesson.title.length).toBeGreaterThan(5);
      expect(lesson.contentMarkdown.length).toBeGreaterThan(50);
      expect(lesson.estimatedDurationMinutes).toBeGreaterThan(0);
    });

    it('should throw error when requesting theory for non-existent topic', () => {
      expect(() => getLessonTheory(999999)).toThrow(/Không tìm thấy/i);
    });
  });

  describe('Question Modes: Practice vs Exam Security Isolation', () => {
    it('should include hints, correct_answer, and explanation in practice mode', () => {
      const topic = db.get<{ id: number }>('SELECT id FROM physics_topics LIMIT 1');
      const practiceQuestions = getQuestionsForTopic(topic!.id, 'practice');

      expect(practiceQuestions.length).toBeGreaterThanOrEqual(1);
      const q = practiceQuestions[0];
      expect(q.correctAnswer).toBeDefined();
      expect(q.explanation).toBeDefined();
      expect(q.hints).toBeDefined();
      expect(Array.isArray(q.hints)).toBe(true);
    });

    it('should strictly redact correct_answer and explanation in exam mode to prevent client inspection', () => {
      const topic = db.get<{ id: number }>('SELECT id FROM physics_topics LIMIT 1');
      const examQuestions = getQuestionsForTopic(topic!.id, 'exam');

      expect(examQuestions.length).toBeGreaterThanOrEqual(1);
      for (const q of examQuestions) {
        expect(q.correctAnswer).toBeUndefined();
        expect(q.explanation).toBeUndefined();
        expect(q.hints).toBeUndefined();
        expect(q.prompt).toBeDefined();
        expect(q.questionType).toBeDefined();
      }
    });
  });
});
