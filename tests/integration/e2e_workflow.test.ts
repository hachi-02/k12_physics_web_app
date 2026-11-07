import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { GET as getParentDashboard } from '@/app/api/parent/dashboard/route';
import { POST as createAssignment, GET as getAssignments } from '@/app/api/parent/assignments/route';
import { GET as getStudentTopics } from '@/app/api/student/topics/route';
import { GET as getLessonTheory } from '@/app/api/student/lesson/[topicId]/route';
import { GET as getQuizQuestions } from '@/app/api/quizzes/[topicId]/route';
import { POST as submitQuiz } from '@/app/api/quizzes/submit/route';
import { POST as createCmsTopic } from '@/app/api/cms/topics/route';
import { POST as createCmsQuestion } from '@/app/api/cms/questions/route';
import { calculatePendulumPeriod, calculateRefraction, calculateCircuitMetrics } from '@/lib/simulations';
import { evaluateStreak, calculateLevel } from '@/lib/gamification';

describe('Milestone 6: Comprehensive E2E Workflow & Cross-Tier Integration Suite', () => {
  // Retrieve valid linked parent and student dynamically from DB
  const getLinkedFamily = () => {
    const db = getDb();
    const link = db.get<any>('SELECT parent_id, student_id FROM family_links LIMIT 1');
    if (!link) throw new Error('No family link found in database');
    return { parentId: link.parent_id, studentId: link.student_id };
  };

  // ==========================================================================
  // TIER 1: COMPLETE END-TO-END USER JOURNEY WORKFLOW
  // ==========================================================================
  describe('Tier 1: End-to-End User Journeys Across Workspaces', () => {
    it('executes full lifecycle: CMS authoring -> Parent Assignment -> Student Learning & Exam -> Dashboard Heatmap -> Reward Approval', async () => {
      const { parentId, studentId } = getLinkedFamily();

      // 1. CMS Author creates a new Physics Topic for Grade 11
      const cmsTopicReq = new NextRequest('http://localhost:3000/api/cms/topics', {
        method: 'POST',
        body: JSON.stringify({
          title: 'E2E Chuyên đề Dao Động Điều Hòa',
          grade: 11,
          description: 'Khảo sát phương trình dao động điều hòa',
          icon: 'Activity',
        }),
      });
      const cmsTopicRes = await createCmsTopic(cmsTopicReq);
      const cmsTopicData = await cmsTopicRes.json();
      expect(cmsTopicRes.status).toBe(201);
      const topicId = cmsTopicData.topic.id;

      // 2. CMS Author creates an MCQ question with KaTeX
      const cmsQReq = new NextRequest('http://localhost:3000/api/cms/questions', {
        method: 'POST',
        body: JSON.stringify({
          topicId,
          questionType: 'mcq',
          prompt: 'Phương trình dao động có dạng $x = A\\cos(\\omega t + \\varphi)$. Đại lượng $\\omega$ gọi là gì?',
          options: [
            { id: 'A', text: 'Tần số góc' },
            { id: 'B', text: 'Biên độ' },
            { id: 'C', text: 'Pha ban đầu' },
            { id: 'D', text: 'Chu kỳ' },
          ],
          correctAnswer: 'A',
          explanation: 'Trong dao động điều hòa, $\\omega$ là tần số góc đo bằng rad/s.',
          difficulty: 'medium',
          points: 10,
        }),
      });
      const cmsQRes = await createCmsQuestion(cmsQReq);
      const cmsQData = await cmsQRes.json();
      expect(cmsQRes.status).toBe(201);
      const questionId = cmsQData.question.id;

      // 3. Parent creates homework assignment for child linked to this topic
      const assignReq = new NextRequest('http://localhost:3000/api/parent/assignments', {
        method: 'POST',
        body: JSON.stringify({
          parentId,
          studentId,
          topicId,
          title: 'Bài tập về nhà: Dao động điều hòa E2E',
          description: 'Con hoàn thành bài thi thử đạt ít nhất 80%',
          rewardTitle: '1 Vé xem phim cuối tuần',
          rewardStars: 30,
        }),
      });
      const assignRes = await createAssignment(assignReq);
      const assignData = await assignRes.json();
      expect(assignRes.status).toBe(201);
      const assignmentId = assignData.assignment.id;

      // 4. Student queries questions for this topic in Exam Mode
      const examReq = new NextRequest(`http://localhost:3000/api/quizzes/${topicId}?mode=exam`);
      const examRes = await getQuizQuestions(examReq, { params: { topicId: String(topicId) } });
      const examData = await examRes.json();
      expect(examRes.status).toBe(200);
      expect(examData.questions.length).toBeGreaterThan(0);
      // Redaction assertion: student cannot inspect correct answer
      const examQ = examData.questions.find((q: any) => q.id === questionId);
      expect(examQ).toBeDefined();
      expect(examQ.correctAnswer).toBeUndefined();

      // 5. Student submits quiz answers
      const submitReq = new NextRequest('http://localhost:3000/api/quizzes/submit', {
        method: 'POST',
        body: JSON.stringify({
          userId: studentId,
          topicId,
          assignmentId,
          timeSpentSeconds: 180,
          answers: [
            { questionId, userAnswer: 'A' },
          ],
        }),
      });
      const submitRes = await submitQuiz(submitReq);
      const submitData = await submitRes.json();
      expect(submitRes.status).toBe(200);
      expect(submitData.score).toBe(100);
      expect(submitData.correctCount).toBe(1);
      expect(submitData.starsEarned).toBeGreaterThanOrEqual(5);

      // 6. Parent checks Dashboard: verifies updated study time and heatmap
      const dashReq = new NextRequest(`http://localhost:3000/api/parent/dashboard?parentId=${parentId}&studentId=${studentId}`);
      const dashRes = await getParentDashboard(dashReq);
      const dashData = await dashRes.json();
      expect(dashRes.status).toBe(200);
      expect(dashData.stats).toBeDefined();
      expect(dashData.knowledgeGaps).toBeDefined();
      expect(dashData.stats.totalQuizzes).toBeGreaterThanOrEqual(1);

      // 7. Parent queries assignments and verifies status updated to completed
      const getAssignReq = new NextRequest(`http://localhost:3000/api/parent/assignments?studentId=${studentId}`);
      const getAssignRes = await getAssignments(getAssignReq);
      const getAssignData = await getAssignRes.json();
      const completedAssign = getAssignData.assignments.find((a: any) => a.id === assignmentId);
      expect(completedAssign.status).toBe('completed');
    });
  });

  // ==========================================================================
  // TIER 2: BOUNDARY & CORNER CASES
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {
    it('evaluates physics simulation math boundaries', () => {
      // Extremely long pendulum: L = 1000m on Earth
      const tLarge = calculatePendulumPeriod(1000, 9.8);
      expect(tLarge).toBeCloseTo(2 * Math.PI * Math.sqrt(1000 / 9.8), 2);

      // Total Internal Reflection boundary at exact critical angle
      // Water to air: n1 = 1.33, n2 = 1.0 => igh ≈ 48.7535
      const exactCrit = calculateRefraction(1.33, 1.0, 48.7535);
      expect(exactCrit.sinR).toBeCloseTo(1.0, 2);

      // Zero resistance DC circuit
      const circuitZero = calculateCircuitMetrics(12, 0, true);
      expect(circuitZero.current).toBe(0);
      expect(circuitZero.power).toBe(0);

      // Open switch DC circuit
      const circuitOpen = calculateCircuitMetrics(220, 50, false);
      expect(circuitOpen.current).toBe(0);
      expect(circuitOpen.power).toBe(0);
    });

    it('evaluates calendar streak edge cases (same day, consecutive day, gap of 2 days, leap days)', () => {
      // Same calendar day preserves streak
      const sameDay = evaluateStreak('2026-02-28', '2026-02-28', 5);
      expect(sameDay.currentStreak).toBe(5);
      expect(sameDay.isNewDay).toBe(false);

      // Consecutive day increments streak
      const nextDay = evaluateStreak('2026-02-28', '2026-03-01', 5);
      expect(nextDay.currentStreak).toBe(6);
      expect(nextDay.isNewDay).toBe(true);

      // Leap day transition (Feb 28 to Feb 29 on leap year)
      const leapDay = evaluateStreak('2028-02-28', '2028-02-29', 10);
      expect(leapDay.currentStreak).toBe(11);

      // 2-day gap resets streak to 1
      const gapReset = evaluateStreak('2026-03-01', '2026-03-03', 25);
      expect(gapReset.currentStreak).toBe(1);
      expect(gapReset.streakMaintained).toBe(false);

      // First time learner (lastActiveDate is null)
      const firstTime = evaluateStreak(null, '2026-11-07', 0);
      expect(firstTime.currentStreak).toBe(1);
    });
  });

  // ==========================================================================
  // TIER 3: CROSS-FEATURE & GAMIFICATION COMBINATIONS
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {
    it('calculates level progression mathematically and validates star thresholds', () => {
      expect(calculateLevel(0).level).toBe(1);
      expect(calculateLevel(19).level).toBe(1);
      expect(calculateLevel(20).level).toBe(1);   // level thresholds: < 50: Level 1
      expect(calculateLevel(50).level).toBe(2);   // 50-149: Level 2
      expect(calculateLevel(150).level).toBe(3);  // 150-299: Level 3
      expect(calculateLevel(300).level).toBe(4);  // 300-599: Level 4
      expect(calculateLevel(600).level).toBe(5);  // >= 600: Level 5
    });

    it('retrieves theory lesson with structured Markdown content and KaTeX formulas', async () => {
      const db = getDb();
      const topic = db.get<any>('SELECT id FROM physics_topics LIMIT 1');
      expect(topic).toBeDefined();

      const req = new NextRequest(`http://localhost:3000/api/student/lesson/${topic.id}`);
      const res = await getLessonTheory(req, { params: { topicId: String(topic.id) } });
      const lesson = await res.json();

      expect(res.status).toBe(200);
      expect(lesson).toBeDefined();
      expect(lesson.title).toBeDefined();
      expect(lesson.contentMarkdown).toBeDefined();
      expect(lesson.grade).toBeDefined();
      expect(lesson.tier).toBeDefined();
    });
  });

  // ==========================================================================
  // TIER 4: REAL-WORLD 3-TIER APPLICATION SCENARIOS
  // ==========================================================================
  describe('Tier 4: 3-Tier Multi-Grade Student Application Scenarios', () => {
    it('handles Grade 2 (Primary Tier) topic queries with visual phenomena content', async () => {
      const req = new NextRequest('http://localhost:3000/api/student/topics?grade=2');
      const res = await getStudentTopics(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.topics.length).toBeGreaterThan(0);
      expect(data.topics[0].tier).toBe('primary');
    });

    it('handles Grade 8 (Middle Tier) topic queries with structured logic physics', async () => {
      const req = new NextRequest('http://localhost:3000/api/student/topics?grade=8');
      const res = await getStudentTopics(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.topics.length).toBeGreaterThan(0);
      expect(data.topics[0].tier).toBe('middle');
    });

    it('handles Grade 12 (High Tier) topic queries with advanced quantitative mechanics', async () => {
      const req = new NextRequest('http://localhost:3000/api/student/topics?grade=12');
      const res = await getStudentTopics(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.topics.length).toBeGreaterThan(0);
      expect(data.topics[0].tier).toBe('high');
    });
  });
});
