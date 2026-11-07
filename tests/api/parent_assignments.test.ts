import { describe, it, expect, beforeEach } from 'vitest';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import {
  getParentAssignments,
  createParentAssignment,
  approveParentReward,
} from '../../lib/parent';

describe('Milestone 2: Parent Assignments & Family Reward Lifecycle', () => {
  let db: ReturnType<typeof getDb>;
  let parentId: number;
  let studentId: number;

  beforeEach(async () => {
    db = getDb();
    await seedDatabase({ force: true });

    const parent = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['phuhuynh1']);
    const student = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['hocsinh1']);

    parentId = parent!.id;
    studentId = student!.id;
  });

  describe('Assignment Creation & Validation', () => {
    it('should create an assignment successfully with reward goals', () => {
      const topic = db.get<{ id: number }>('SELECT id FROM physics_topics LIMIT 1');

      const created = createParentAssignment({
        parentId,
        studentId,
        topicId: topic?.id,
        title: 'Thực hành thí nghiệm khúc xạ ánh sáng',
        instructions: 'Con chuẩn bị cốc nước và chiếc đũa theo cẩm nang nhé!',
        dueDate: '2026-12-31T23:59:59Z',
        rewardDescription: 'Một buổi xem phim hoạt hình rạp chiếu',
        rewardStars: 50,
      });

      expect(created).toBeDefined();
      expect(created.id).toBeGreaterThan(0);
      expect(created.title).toBe('Thực hành thí nghiệm khúc xạ ánh sáng');
      expect(created.rewardDescription).toBe('Một buổi xem phim hoạt hình rạp chiếu');
      expect(created.rewardStars).toBe(50);
      expect(created.status).toBe('assigned');
    });

    it('should reject assignment creation when title is empty', () => {
      expect(() =>
        createParentAssignment({
          parentId,
          studentId,
          title: '   ',
        })
      ).toThrow(/không được để trống/i);
    });

    it('should reject assignment creation if parent and student are not linked in family_links', () => {
      // Create unrelated student
      const unlinkedUser = db.run(
        `INSERT INTO users (username, password_hash, role, name, grade)
         VALUES ('hocsinh_la', 'hash123', 'student', 'Học Sinh Lạ', 5)`
      );
      const strangerId = Number(unlinkedUser.lastInsertRowid);

      expect(() =>
        createParentAssignment({
          parentId,
          studentId: strangerId,
          title: 'Bài tập không hợp lệ',
        })
      ).toThrow(/không có quyền/i);
    });
  });

  describe('Assignment Retrieval & Filtering', () => {
    it('should list all assignments for a parent', () => {
      const list = getParentAssignments({ parentId });
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThanOrEqual(2);
      expect(list[0]).toHaveProperty('parentName');
      expect(list[0]).toHaveProperty('studentName');
    });

    it('should filter assignments by status', () => {
      const completedList = getParentAssignments({ parentId, status: 'completed' });
      expect(completedList.length).toBeGreaterThanOrEqual(1);
      expect(completedList.every((a) => a.status === 'completed')).toBe(true);
    });
  });

  describe('Family Reward Approval & Star Credit Verification', () => {
    it('should approve reward, update status to reward_approved, and credit stars to student gamification', () => {
      // Find the completed assignment from seed
      const completedAssignment = db.get<{
        id: number;
        student_id: number;
        reward_stars: number;
      }>("SELECT id, student_id, reward_stars FROM parent_assignments WHERE status = 'completed' LIMIT 1");

      expect(completedAssignment).toBeDefined();
      const assignmentId = completedAssignment!.id;
      const starsToAward = completedAssignment!.reward_stars;

      // Get student's current stars before approval
      const preGamification = db.get<{ stars: number }>(
        'SELECT stars FROM student_gamification WHERE student_id = ?',
        [studentId]
      );
      const preStars = preGamification?.stars || 0;

      // Approve reward
      const approved = approveParentReward(
        assignmentId,
        parentId,
        'Bố mẹ rất tự hào về con! Đã hoàn thành xuất sắc!'
      );

      expect(approved.status).toBe('reward_approved');
      expect(approved.parentFeedback).toContain('tự hào');

      // Verify stars were genuinely credited in student_gamification
      const postGamification = db.get<{ stars: number }>(
        'SELECT stars FROM student_gamification WHERE student_id = ?',
        [studentId]
      );
      expect(postGamification?.stars).toBe(preStars + starsToAward);
    });

    it('should prevent non-author parent from approving reward', () => {
      // Create another parent
      const otherParentRes = db.run(
        `INSERT INTO users (username, password_hash, role, name)
         VALUES ('phuhuynh2', 'hash', 'parent', 'Phụ Huynh 2')`
      );
      const otherParentId = Number(otherParentRes.lastInsertRowid);

      const targetAssignment = db.get<{ id: number }>('SELECT id FROM parent_assignments LIMIT 1');

      expect(() =>
        approveParentReward(targetAssignment!.id, otherParentId)
      ).toThrow(/Chỉ phụ huynh giao bài/i);
    });

    it('should throw error when approving non-existent assignment', () => {
      expect(() => approveParentReward(999999, parentId)).toThrow(/Không tìm thấy bài tập/i);
    });
  });
});
