import { describe, it, expect, beforeEach } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import { submitQuiz } from '../../lib/student';

describe('Milestone 3: Quiz Submission, Exam Scoring & Gamification Updates', () => {
  let db: ReturnType<typeof getDb>;
  let studentId: number;

  beforeEach(async () => {
    db = getDb();
    await seedDatabase({ force: true });

    const student = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['hocsinh1']);
    expect(student).toBeDefined();
    studentId = student!.id;
  });

  describe('Server-Side Scoring & Answer Evaluation', () => {
    it('should score an exam submission with mixed MCQ and Numeric answers accurately', () => {
      // Find 1 MCQ and 1 Numeric question from database
      const mcq = db.get<{ id: number; correct_answer: string; topic_id: number }>(
        "SELECT id, correct_answer, topic_id FROM questions WHERE question_type = 'mcq' LIMIT 1"
      );
      const numeric = db.get<{ id: number; correct_answer: string; topic_id: number }>(
        "SELECT id, correct_answer, topic_id FROM questions WHERE question_type = 'numeric' LIMIT 1"
      );

      expect(mcq).toBeDefined();
      expect(numeric).toBeDefined();

      const answers = [
        { questionId: mcq!.id, userAnswer: mcq!.correct_answer },
        { questionId: numeric!.id, userAnswer: numeric!.correct_answer },
      ];

      const result = submitQuiz({
        userId: studentId,
        topicId: mcq!.topic_id,
        quizType: 'exam',
        timeSpentSeconds: 320,
        answers,
      });

      expect(result).toBeDefined();
      expect(result.submissionId).toBeGreaterThan(0);
      expect(result.score).toBe(100);
      expect(result.totalQuestions).toBe(2);
      expect(result.correctCount).toBe(2);
      expect(result.starsEarned).toBeGreaterThan(0);

      // Verify record is authentically stored in quiz_submissions
      const stored = db.get<{ id: number; score: number; quiz_type: string }>(
        'SELECT id, score, quiz_type FROM quiz_submissions WHERE id = ?',
        [result.submissionId]
      );
      expect(stored).toBeDefined();
      expect(stored!.score).toBe(100);
      expect(stored!.quiz_type).toBe('exam');
    });

    it('should compute partial score when some answers are incorrect', () => {
      const mcqs = db.query<{ id: number; correct_answer: string; topic_id: number }>(
        "SELECT id, correct_answer, topic_id FROM questions WHERE question_type = 'mcq' LIMIT 2"
      );
      expect(mcqs.length).toBe(2);

      const wrongAnswer = mcqs[1].correct_answer === 'A' ? 'B' : 'A';
      const answers = [
        { questionId: mcqs[0].id, userAnswer: mcqs[0].correct_answer }, // correct
        { questionId: mcqs[1].id, userAnswer: wrongAnswer },           // incorrect
      ];

      const result = submitQuiz({
        userId: studentId,
        topicId: mcqs[0].topic_id,
        quizType: 'practice',
        timeSpentSeconds: 120,
        answers,
      });

      expect(result.score).toBe(50);
      expect(result.correctCount).toBe(1);
      expect(result.totalQuestions).toBe(2);
    });

    it('should reject submission with empty answers array', () => {
      expect(() =>
        submitQuiz({
          userId: studentId,
          quizType: 'exam',
          timeSpentSeconds: 60,
          answers: [],
        })
      ).toThrow(/không được để trống/i);
    });
  });

  describe('Gamification Progression & Badge Awards', () => {
    it('should award stars, update streak and award perfect_score badge for 100% quiz', () => {
      const mcq = db.get<{ id: number; correct_answer: string; topic_id: number }>(
        "SELECT id, correct_answer, topic_id FROM questions WHERE question_type = 'mcq' LIMIT 1"
      );

      const preGamification = db.get<{ stars: number }>(
        'SELECT stars FROM student_gamification WHERE student_id = ?',
        [studentId]
      );
      const preStars = preGamification?.stars || 0;

      const result = submitQuiz({
        userId: studentId,
        topicId: mcq!.topic_id,
        quizType: 'exam',
        timeSpentSeconds: 150,
        answers: [{ questionId: mcq!.id, userAnswer: mcq!.correct_answer }],
      });

      expect(result.newBadges).toContain('perfect_score');

      const postGamification = db.get<{ stars: number; badges_json: string }>(
        'SELECT stars, badges_json FROM student_gamification WHERE student_id = ?',
        [studentId]
      );
      expect(postGamification!.stars).toBe(preStars + result.starsEarned);
      expect(postGamification!.badges_json).toContain('perfect_score');
    });

    it('should complete parent assignment when assignmentId is linked to quiz', () => {
      const assignment = db.get<{ id: number }>(
        "SELECT id FROM parent_assignments WHERE status = 'assigned' LIMIT 1"
      );
      expect(assignment).toBeDefined();

      const mcq = db.get<{ id: number; correct_answer: string; topic_id: number }>(
        "SELECT id, correct_answer, topic_id FROM questions WHERE question_type = 'mcq' LIMIT 1"
      );

      submitQuiz({
        userId: studentId,
        topicId: mcq!.topic_id,
        assignmentId: assignment!.id,
        quizType: 'assignment',
        timeSpentSeconds: 200,
        answers: [{ questionId: mcq!.id, userAnswer: mcq!.correct_answer }],
      });

      const updatedAssignment = db.get<{ status: string; completed_at: string }>(
        'SELECT status, completed_at FROM parent_assignments WHERE id = ?',
        [assignment!.id]
      );
      expect(updatedAssignment!.status).toBe('completed');
      expect(updatedAssignment!.completed_at).toBeTruthy();
    });
  });
});
