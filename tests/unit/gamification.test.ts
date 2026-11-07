import { describe, it, expect, beforeEach } from 'vitest';
import {
  evaluateStreak,
  calculateLevel,
  evaluateBadgeUnlocks,
  BADGE_CATALOG,
  getStudentGamificationState,
} from '../../lib/gamification';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import type { EarnedBadge } from '../../types/database';

describe('Milestone 4: Gamification Engine, Streak Calendar & Badge Catalog', () => {
  beforeEach(async () => {
    const db = getDb();
    await seedDatabase({ force: true });
  });

  describe('Streak Calendar Evaluation Logic', () => {
    it('should initialize streak to 1 for new student with null lastActiveDate', () => {
      const res = evaluateStreak(null, '2026-11-07', 0);
      expect(res.currentStreak).toBe(1);
      expect(res.streakMaintained).toBe(true);
      expect(res.isNewDay).toBe(true);
    });

    it('should maintain streak and not double-increment for same-day activity', () => {
      const res = evaluateStreak('2026-11-07', '2026-11-07', 5);
      expect(res.currentStreak).toBe(5);
      expect(res.streakMaintained).toBe(true);
      expect(res.isNewDay).toBe(false);
    });

    it('should increment streak by 1 for consecutive day activity', () => {
      const res = evaluateStreak('2026-11-06', '2026-11-07', 5);
      expect(res.currentStreak).toBe(6);
      expect(res.streakMaintained).toBe(true);
      expect(res.isNewDay).toBe(true);
    });

    it('should correctly handle month boundaries for consecutive day streaks', () => {
      // Oct 31 -> Nov 01
      const res = evaluateStreak('2026-10-31', '2026-11-01', 9);
      expect(res.currentStreak).toBe(10);
      expect(res.streakMaintained).toBe(true);
    });

    it('should reset streak to 1 when gap is greater than 1 calendar day', () => {
      const res = evaluateStreak('2026-11-04', '2026-11-07', 12);
      expect(res.currentStreak).toBe(1);
      expect(res.streakMaintained).toBe(false);
      expect(res.isNewDay).toBe(true);
    });
  });

  describe('Level Progression & Star Thresholds', () => {
    it('should calculate student level based on star milestones', () => {
      expect(calculateLevel(20).level).toBe(1);
      expect(calculateLevel(50).level).toBe(2);
      expect(calculateLevel(149).level).toBe(2);
      expect(calculateLevel(150).level).toBe(3);
      expect(calculateLevel(300).level).toBe(4);
      expect(calculateLevel(600).level).toBe(5);
    });
  });

  describe('9-Badge Catalog & Automatic Unlock Checks', () => {
    it('should contain exactly 9 predefined badges across 4 tiers', () => {
      expect(BADGE_CATALOG.length).toBe(9);
      const tiers = new Set(BADGE_CATALOG.map((b) => b.tier));
      expect(tiers.has('bronze')).toBe(true);
      expect(tiers.has('silver')).toBe(true);
      expect(tiers.has('gold')).toBe(true);
      expect(tiers.has('diamond')).toBe(true);

      const uniqueIds = new Set(BADGE_CATALOG.map((b) => b.badgeId));
      expect(uniqueIds.size).toBe(9);
    });

    it('should unlock streak badges when streak thresholds are reached', () => {
      const existing: EarnedBadge[] = [];

      // Streak 3
      const res3 = evaluateBadgeUnlocks(existing, { totalStars: 0, currentStreak: 3 });
      expect(res3.newlyUnlocked.map((b) => b.badge_id)).toContain('streak_3');

      // Streak 7
      const res7 = evaluateBadgeUnlocks(res3.allBadges, { totalStars: 0, currentStreak: 7 });
      expect(res7.newlyUnlocked.map((b) => b.badge_id)).toContain('streak_7');

      // Streak 30 (Diamond)
      const res30 = evaluateBadgeUnlocks(res7.allBadges, { totalStars: 0, currentStreak: 30 });
      expect(res30.newlyUnlocked.map((b) => b.badge_id)).toContain('streak_30');
    });

    it('should unlock star collector badges when star thresholds are reached', () => {
      const existing: EarnedBadge[] = [];

      const res50 = evaluateBadgeUnlocks(existing, { totalStars: 50, currentStreak: 1 });
      expect(res50.newlyUnlocked.map((b) => b.badge_id)).toContain('star_collector_50');

      const res200 = evaluateBadgeUnlocks(res50.allBadges, { totalStars: 200, currentStreak: 1 });
      expect(res200.newlyUnlocked.map((b) => b.badge_id)).toContain('star_collector_200');

      const res500 = evaluateBadgeUnlocks(res200.allBadges, { totalStars: 500, currentStreak: 1 });
      expect(res500.newlyUnlocked.map((b) => b.badge_id)).toContain('star_collector_500');
    });

    it('should unlock physicist_junior when all 3 simulations are explored', () => {
      const res = evaluateBadgeUnlocks([], {
        totalStars: 10,
        currentStreak: 1,
        simulationsExploredCount: 3,
      });
      expect(res.newlyUnlocked.map((b) => b.badge_id)).toContain('physicist_junior');
    });

    it('should not re-award already unlocked badges', () => {
      const alreadyEarned: EarnedBadge[] = [
        {
          badge_id: 'first_step',
          title: 'Bước Chân Đầu Tiên',
          description: '',
          icon: 'footprints',
          tier: 'bronze',
          awarded_at: '2026-11-01T00:00:00Z',
        },
      ];

      const res = evaluateBadgeUnlocks(alreadyEarned, {
        totalStars: 10,
        currentStreak: 1,
        hasCompletedQuiz: true,
      });

      expect(res.newlyUnlocked.length).toBe(0);
      expect(res.allBadges.length).toBe(1);
    });
  });

  describe('Database State Retrieval', () => {
    it('should query complete gamification dashboard state for student', () => {
      const db = getDb();
      const student = db.get<{ id: number }>('SELECT id FROM users WHERE username = ?', ['hocsinh1']);

      const dashboard = getStudentGamificationState(student!.id);
      expect(dashboard.profile.name).toBeTruthy();
      expect(dashboard.state.stars).toBeGreaterThanOrEqual(100);
      expect(dashboard.catalog.length).toBe(9);
      expect(dashboard.catalog.some((b) => b.isUnlocked)).toBe(true);
    });
  });
});
