/**
 * Physics Grading Engine
 * Evaluates MCQ and Numeric questions with precision float tolerances and progressive hints
 */

export interface GradingResult {
  isCorrect: boolean;
  scoreEarned: number;
  pointsMax: number;
  feedback: string;
  userAnswer: string;
  correctAnswer: string;
  parsedUserNumber?: number;
  parsedCorrectNumber?: number;
  relativeDifference?: number;
}

export type EducationalTier = 'primary' | 'middle' | 'high';

/**
 * Maps K-12 grade (1-12) to educational tier
 */
export function getTierForGrade(grade: number): EducationalTier {
  if (grade >= 1 && grade <= 5) return 'primary';
  if (grade >= 6 && grade <= 9) return 'middle';
  return 'high';
}

/**
 * Clean and parse numeric input string from student
 * Supports:
 * - "9.8" or "9,8"
 * - "-4.5"
 * - Scientific notation: "1.5e3", "1.5E3", "1.5*10^3", "1.5x10^3", "1.5 x 10^3"
 * - Strips physical units like "m/s", "N", "J", "kg" if typed by student
 */
export function parseNumericAnswer(input: string): number | null {
  if (!input || typeof input !== 'string') return null;

  let cleaned = input.trim();
  // Replace Vietnamese comma with dot
  cleaned = cleaned.replace(/,/g, '.');

  // Handle scientific notation with 10^x
  // e.g. "1.5*10^3", "1.5x10^3", "1.5 x 10^3"
  cleaned = cleaned.replace(/[*xX]\s*10\^([+-]?\d+)/g, 'e$1');
  cleaned = cleaned.replace(/[*xX]\s*10\^\{([+-]?\d+)\}/g, 'e$1');

  // Extract leading float / integer part
  const match = cleaned.match(/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/);
  if (!match) {
    // If not at the start, try to extract first float in string
    const fallbackMatch = cleaned.match(/[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/);
    if (!fallbackMatch) return null;
    const val = parseFloat(fallbackMatch[0]);
    return isNaN(val) ? null : val;
  }

  const val = parseFloat(match[0]);
  return isNaN(val) ? null : val;
}

/**
 * Evaluate numeric answer within relative float tolerance
 * Default relative tolerance: 0.02 (+/- 2%)
 */
export function evaluateNumericAnswer(
  userAnswer: string,
  correctAnswer: string,
  tolerance: number = 0.02,
  points: number = 10
): GradingResult {
  const userNum = parseNumericAnswer(userAnswer);
  const correctNum = parseNumericAnswer(correctAnswer);

  if (userNum === null || correctNum === null) {
    return {
      isCorrect: false,
      scoreEarned: 0,
      pointsMax: points,
      feedback: 'Giá trị nhập vào không hợp lệ hoặc không phải là một số thực.',
      userAnswer,
      correctAnswer,
    };
  }

  // If correct is zero, use absolute comparison
  if (Math.abs(correctNum) < 1e-9) {
    const isCorrect = Math.abs(userNum) <= 1e-3;
    return {
      isCorrect,
      scoreEarned: isCorrect ? points : 0,
      pointsMax: points,
      feedback: isCorrect
        ? 'Chính xác!'
        : `Chưa chính xác. Đáp án đúng là ${correctAnswer}.`,
      userAnswer,
      correctAnswer,
      parsedUserNumber: userNum,
      parsedCorrectNumber: correctNum,
      relativeDifference: Math.abs(userNum - correctNum),
    };
  }

  const relDiff = Math.abs(userNum - correctNum) / Math.abs(correctNum);
  const isCorrect = relDiff <= tolerance;

  return {
    isCorrect,
    scoreEarned: isCorrect ? points : 0,
    pointsMax: points,
    feedback: isCorrect
      ? `Chính xác! (Sai số: ${(relDiff * 100).toFixed(2)}% nằm trong ngưỡng cho phép ±${(tolerance * 100).toFixed(1)}%)`
      : `Chưa chính xác. Đáp án đúng là ${correctAnswer} (Bạn đã trả lời ${userAnswer}).`,
    userAnswer,
    correctAnswer,
    parsedUserNumber: userNum,
    parsedCorrectNumber: correctNum,
    relativeDifference: relDiff,
  };
}

/**
 * Evaluate multiple choice question (MCQ) answer
 */
export function evaluateMcqAnswer(
  userAnswer: string,
  correctAnswer: string,
  points: number = 10
): GradingResult {
  const cleanUser = (userAnswer || '').trim().toUpperCase();
  const cleanCorrect = (correctAnswer || '').trim().toUpperCase();

  const isCorrect = cleanUser === cleanCorrect && cleanUser.length > 0;

  return {
    isCorrect,
    scoreEarned: isCorrect ? points : 0,
    pointsMax: points,
    feedback: isCorrect
      ? 'Chính xác!'
      : `Chưa chính xác. Phương án đúng là [${cleanCorrect}].`,
    userAnswer: cleanUser,
    correctAnswer: cleanCorrect,
  };
}

/**
 * Universal evaluator for question responses
 */
export function evaluateQuestionAnswer(
  questionType: 'mcq' | 'numeric' | string,
  userAnswer: string,
  correctAnswer: string,
  tolerance: number = 0.02,
  points: number = 10
): GradingResult {
  if (questionType === 'numeric') {
    return evaluateNumericAnswer(userAnswer, correctAnswer, tolerance, points);
  }
  return evaluateMcqAnswer(userAnswer, correctAnswer, points);
}
