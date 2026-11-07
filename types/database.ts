// types/database.ts

export type UserRole = 'admin' | 'parent' | 'student';
export type GradeTier = 'primary' | 'middle' | 'high' | 'lower_secondary' | 'upper_secondary';
export type QuestionType = 'mcq' | 'numeric';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type AssignmentStatus = 'assigned' | 'completed' | 'reward_approved' | 'expired' | 'submitted' | 'graded' | 'overdue';
export type QuizType = 'practice' | 'exam' | 'assignment';

/**
 * Pedagogical cheat-sheet stored as JSON in lessons.parent_guide
 */
export interface ParentGuideHomeExperiment {
  title: string;
  materials: string[];
  steps: string[];
  expected_outcome: string;
  safety_notes?: string;
}

export interface ParentGuide {
  summary: string;
  misconceptions: string[];
  guiding_questions: string[];
  home_experiments: ParentGuideHomeExperiment[];
}

/**
 * MCQ Options stored as JSON in questions.options
 */
export interface McqOption {
  id: 'A' | 'B' | 'C' | 'D' | string;
  text: string;
  latex?: string;
}

/**
 * 3-tier progressive hints stored as JSON in questions.hints
 */
export interface QuestionHint {
  level: number; // 1, 2, 3
  hint: string;
  penalty_stars?: number;
}

/**
 * Gamification state and badges stored as JSON in student_gamification.badges_json
 */
export interface EarnedBadge {
  badge_id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  awarded_at: string;
}

export interface GamificationState {
  stars: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  level: number;
  badges: EarnedBadge[];
}
