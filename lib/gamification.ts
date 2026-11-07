import { getDb } from './db';
import type { EarnedBadge, GamificationState } from '../types/database';

export interface BadgeDefinition {
  badgeId: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  category: 'streak' | 'stars' | 'accuracy' | 'exploration';
  requirementText: string;
}

export const BADGE_CATALOG: BadgeDefinition[] = [
  {
    badgeId: 'first_step',
    title: 'Bước Chân Đầu Tiên',
    description: 'Hoàn thành bài học hoặc bài luyện tập vật lý đầu tiên',
    icon: 'footprints',
    tier: 'bronze',
    category: 'exploration',
    requirementText: 'Hoàn thành 1 bài học',
  },
  {
    badgeId: 'streak_3',
    title: 'Chăm Chỉ 3 Ngày',
    description: 'Duy trì chuỗi học tập 3 ngày liên tiếp',
    icon: 'flame',
    tier: 'bronze',
    category: 'streak',
    requirementText: 'Học 3 ngày liên tiếp',
  },
  {
    badgeId: 'streak_7',
    title: 'Ý Chí Sắt Đá 7 Ngày',
    description: 'Duy trì chuỗi học tập 7 ngày liên tiếp',
    icon: 'zap',
    tier: 'silver',
    category: 'streak',
    requirementText: 'Học 7 ngày liên tiếp',
  },
  {
    badgeId: 'streak_30',
    title: 'Bậc Thầy Bền Bỉ 30 Ngày',
    description: 'Duy trì chuỗi học tập suốt 30 ngày liên tục',
    icon: 'shield-check',
    tier: 'diamond',
    category: 'streak',
    requirementText: 'Học 30 ngày liên tiếp',
  },
  {
    badgeId: 'perfect_score',
    title: 'Điểm Số Hoàn Hảo',
    description: 'Đạt điểm tuyệt đối 100% trong bài kiểm tra hoặc thi thử',
    icon: 'trophy',
    tier: 'gold',
    category: 'accuracy',
    requirementText: 'Đạt 100% điểm bài thi',
  },
  {
    badgeId: 'star_collector_50',
    title: 'Nhà Thu Thập Sao',
    description: 'Tích lũy được 50 ngôi sao học tập',
    icon: 'sparkles',
    tier: 'bronze',
    category: 'stars',
    requirementText: 'Tích lũy 50 ⭐',
  },
  {
    badgeId: 'star_collector_200',
    title: 'Kho Tàng Tinh Tú',
    description: 'Tích lũy được 200 ngôi sao học tập',
    icon: 'star',
    tier: 'silver',
    category: 'stars',
    requirementText: 'Tích lũy 200 ⭐',
  },
  {
    badgeId: 'star_collector_500',
    title: 'Đại Sứ Thiên Hà',
    description: 'Tích lũy được 500 ngôi sao học tập xuất sắc',
    icon: 'crown',
    tier: 'gold',
    category: 'stars',
    requirementText: 'Tích lũy 500 ⭐',
  },
  {
    badgeId: 'physicist_junior',
    title: 'Nhà Vật Lý Trẻ Tuổi',
    description: 'Trải nghiệm đầy đủ 3 mô phỏng thí nghiệm vật lý tương tác',
    icon: 'atom',
    tier: 'gold',
    category: 'exploration',
    requirementText: 'Thực hành cả 3 mô phỏng vật lý',
  },
];

/**
 * Calculate user level based on cumulative stars
 */
export function calculateLevel(stars: number): { level: number; title: string; nextLevelStars: number } {
  if (stars < 50) {
    return { level: 1, title: 'Tân Binh Khám Phá', nextLevelStars: 50 };
  } else if (stars < 150) {
    return { level: 2, title: 'Học Viên Tập Sự', nextLevelStars: 150 };
  } else if (stars < 300) {
    return { level: 3, title: 'Nhà Thám Hiểm Vật Lý', nextLevelStars: 300 };
  } else if (stars < 600) {
    return { level: 4, title: 'Nhà Vật Lý Tiềm Năng', nextLevelStars: 600 };
  } else {
    return { level: 5, title: 'Bậc Thầy Vật Lý K-12', nextLevelStars: 1000 };
  }
}

/**
 * Pure calendar streak calculation comparing date strings (YYYY-MM-DD)
 */
export function evaluateStreak(
  lastActiveDate: string | null,
  currentDate: string,
  existingStreak: number
): { currentStreak: number; streakMaintained: boolean; isNewDay: boolean } {
  if (!lastActiveDate) {
    return { currentStreak: 1, streakMaintained: true, isNewDay: true };
  }

  // Parse YYYY-MM-DD
  const lastParts = lastActiveDate.split('-').map(Number);
  const curParts = currentDate.split('-').map(Number);

  const lastUtc = Date.UTC(lastParts[0], lastParts[1] - 1, lastParts[2]);
  const curUtc = Date.UTC(curParts[0], curParts[1] - 1, curParts[2]);

  const diffMs = curUtc - lastUtc;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day activity, streak preserved
    return { currentStreak: Math.max(1, existingStreak), streakMaintained: true, isNewDay: false };
  } else if (diffDays === 1) {
    // Consecutive day, increment streak
    return { currentStreak: existingStreak + 1, streakMaintained: true, isNewDay: true };
  } else {
    // Missed at least one day, reset to 1
    return { currentStreak: 1, streakMaintained: false, isNewDay: true };
  }
}

/**
 * Evaluate new badge unlocks given current student metrics
 */
export function evaluateBadgeUnlocks(
  existingBadges: EarnedBadge[],
  metrics: {
    totalStars: number;
    currentStreak: number;
    hasCompletedQuiz?: boolean;
    hasPerfectScore?: boolean;
    simulationsExploredCount?: number;
  }
): { newlyUnlocked: EarnedBadge[]; allBadges: EarnedBadge[] } {
  const earnedSet = new Set(existingBadges.map((b) => b.badge_id));
  const newlyUnlocked: EarnedBadge[] = [];
  const nowIso = new Date().toISOString();

  // Helper to add badge
  const unlock = (id: string) => {
    if (!earnedSet.has(id)) {
      const def = BADGE_CATALOG.find((b) => b.badgeId === id);
      if (def) {
        const newBadge: EarnedBadge = {
          badge_id: def.badgeId,
          title: def.title,
          description: def.description,
          icon: def.icon,
          tier: def.tier,
          awarded_at: nowIso,
        };
        newlyUnlocked.push(newBadge);
        earnedSet.add(id);
      }
    }
  };

  // 1. First step
  if (metrics.hasCompletedQuiz) {
    unlock('first_step');
  }

  // 2. Streaks
  if (metrics.currentStreak >= 3) unlock('streak_3');
  if (metrics.currentStreak >= 7) unlock('streak_7');
  if (metrics.currentStreak >= 30) unlock('streak_30');

  // 3. Perfect score
  if (metrics.hasPerfectScore) unlock('perfect_score');

  // 4. Stars
  if (metrics.totalStars >= 50) unlock('star_collector_50');
  if (metrics.totalStars >= 200) unlock('star_collector_200');
  if (metrics.totalStars >= 500) unlock('star_collector_500');

  // 5. Simulations explored
  if (metrics.simulationsExploredCount && metrics.simulationsExploredCount >= 3) {
    unlock('physicist_junior');
  }

  return {
    newlyUnlocked,
    allBadges: [...existingBadges, ...newlyUnlocked],
  };
}

/**
 * Fetch complete gamification dashboard state from database
 */
export function getStudentGamificationState(studentId: number): {
  profile: { id: number; name: string; grade: number };
  state: GamificationState;
  levelInfo: { level: number; title: string; nextLevelStars: number };
  catalog: (BadgeDefinition & { isUnlocked: boolean; awardedAt: string | null })[];
  recentActivities: { id: number; date: string; stars: number; type: string }[];
} {
  const db = getDb();

  const user = db.get<{ id: number; name: string; grade: number }>(
    'SELECT id, name, grade FROM users WHERE id = ?',
    [studentId]
  );
  if (!user) {
    throw new Error(`Học sinh #${studentId} không tồn tại`);
  }

  const row = db.get<{
    stars: number;
    current_streak: number;
    longest_streak: number;
    last_active_date: string | null;
    badges_json: string;
    level: number;
  }>('SELECT stars, current_streak, longest_streak, last_active_date, badges_json, level FROM student_gamification WHERE student_id = ?', [
    studentId,
  ]);

  let badges: EarnedBadge[] = [];
  if (row?.badges_json) {
    try {
      badges = JSON.parse(row.badges_json);
    } catch {
      badges = [];
    }
  }

  const stars = row?.stars || 0;
  const levelInfo = calculateLevel(stars);

  const earnedMap = new Map<string, string>(badges.map((b) => [b.badge_id, b.awarded_at]));

  const catalogWithStatus = BADGE_CATALOG.map((def) => ({
    ...def,
    isUnlocked: earnedMap.has(def.badgeId),
    awardedAt: earnedMap.get(def.badgeId) || null,
  }));

  // Fetch recent quiz submissions
  const recentSubmissions = db.query<{
    id: number;
    submitted_at: string;
    stars_earned: number;
    quiz_type: string;
  }>(
    `SELECT id, submitted_at, stars_earned, quiz_type
     FROM quiz_submissions
     WHERE user_id = ?
     ORDER BY submitted_at DESC
     LIMIT 7`,
    [studentId]
  );

  const recentActivities = recentSubmissions.map((s) => ({
    id: s.id,
    date: s.submitted_at,
    stars: s.stars_earned,
    type: s.quiz_type === 'exam' ? 'Thi thử' : s.quiz_type === 'assignment' ? 'Bài tập' : 'Luyện tập',
  }));

  return {
    profile: user,
    state: {
      stars,
      currentStreak: row?.current_streak || 0,
      longestStreak: row?.longest_streak || 0,
      lastActiveDate: row?.last_active_date || null,
      level: levelInfo.level,
      badges,
    },
    levelInfo,
    catalog: catalogWithStatus,
    recentActivities,
  };
}
