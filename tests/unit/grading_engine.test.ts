import { describe, it, expect } from 'vitest';
import {
  parseNumericAnswer,
  evaluateNumericAnswer,
  evaluateMcqAnswer,
  evaluateQuestionAnswer,
} from '../../lib/grading';

describe('Milestone 3: Physics Grading Engine & Tolerance Evaluator', () => {
  describe('Numeric String Parsing & Sanitization', () => {
    it('should parse standard decimal numbers with period or comma', () => {
      expect(parseNumericAnswer('9.8')).toBe(9.8);
      expect(parseNumericAnswer('9,8')).toBe(9.8);
      expect(parseNumericAnswer('  120.45  ')).toBe(120.45);
      expect(parseNumericAnswer('-4.5')).toBe(-4.5);
      expect(parseNumericAnswer('-0,25')).toBe(-0.25);
    });

    it('should parse numbers with physical units attached by students', () => {
      expect(parseNumericAnswer('9.8 m/s^2')).toBe(9.8);
      expect(parseNumericAnswer('100 N')).toBe(100);
      expect(parseNumericAnswer('250,5 J')).toBe(250.5);
      expect(parseNumericAnswer('220V')).toBe(220);
    });

    it('should parse scientific notation in various standard formats', () => {
      expect(parseNumericAnswer('1.5e3')).toBe(1500);
      expect(parseNumericAnswer('1.5E-3')).toBe(0.0015);
      expect(parseNumericAnswer('3*10^8')).toBe(300000000);
      expect(parseNumericAnswer('3x10^8')).toBe(300000000);
      expect(parseNumericAnswer('1.6x10^-19')).toBeCloseTo(1.6e-19, 22);
    });

    it('should return null for non-numeric junk input', () => {
      expect(parseNumericAnswer('')).toBeNull();
      expect(parseNumericAnswer('abc')).toBeNull();
      expect(parseNumericAnswer('không biết')).toBeNull();
    });
  });

  describe('Relative Float Tolerance Verification (±2%)', () => {
    it('should accept exact numerical answers with 0% relative error', () => {
      const result = evaluateNumericAnswer('9.8', '9.8', 0.02, 10);
      expect(result.isCorrect).toBe(true);
      expect(result.scoreEarned).toBe(10);
      expect(result.relativeDifference).toBe(0);
    });

    it('should accept answers within ±2% tolerance', () => {
      // 9.9 vs 9.8 => diff = 0.1 / 9.8 ≈ 1.02% <= 2%
      const upper = evaluateNumericAnswer('9.9', '9.8', 0.02, 10);
      expect(upper.isCorrect).toBe(true);
      expect(upper.scoreEarned).toBe(10);
      expect(upper.relativeDifference).toBeLessThanOrEqual(0.02);

      // 9.7 vs 9.8 => diff = 0.1 / 9.8 ≈ 1.02% <= 2%
      const lower = evaluateNumericAnswer('9.7', '9.8', 0.02, 10);
      expect(lower.isCorrect).toBe(true);
      expect(lower.scoreEarned).toBe(10);
      expect(lower.relativeDifference).toBeLessThanOrEqual(0.02);
    });

    it('should reject answers exceeding ±2% tolerance', () => {
      // 10.5 vs 9.8 => diff = 0.7 / 9.8 ≈ 7.14% > 2%
      const result = evaluateNumericAnswer('10.5', '9.8', 0.02, 10);
      expect(result.isCorrect).toBe(false);
      expect(result.scoreEarned).toBe(0);
      expect(result.relativeDifference).toBeGreaterThan(0.02);
      expect(result.feedback).toContain('Chưa chính xác');
    });

    it('should evaluate zero values using absolute comparison', () => {
      const zeroCorrect = evaluateNumericAnswer('0.0001', '0', 0.02, 10);
      expect(zeroCorrect.isCorrect).toBe(true);

      const zeroWrong = evaluateNumericAnswer('0.5', '0', 0.02, 10);
      expect(zeroWrong.isCorrect).toBe(false);
    });
  });

  describe('Multiple Choice (MCQ) Answer Matching', () => {
    it('should match MCQ answers case-insensitively with trimming', () => {
      expect(evaluateMcqAnswer('a', 'A').isCorrect).toBe(true);
      expect(evaluateMcqAnswer(' B ', 'B').isCorrect).toBe(true);
      expect(evaluateMcqAnswer('c', 'C').isCorrect).toBe(true);
      expect(evaluateMcqAnswer('D', 'D').isCorrect).toBe(true);
    });

    it('should reject incorrect option keys', () => {
      expect(evaluateMcqAnswer('A', 'B').isCorrect).toBe(false);
      expect(evaluateMcqAnswer('C', 'D').isCorrect).toBe(false);
      expect(evaluateMcqAnswer('', 'A').isCorrect).toBe(false);
    });
  });

  describe('Universal Question Evaluator Interface', () => {
    it('should route mcq and numeric question types appropriately', () => {
      const mcq = evaluateQuestionAnswer('mcq', 'B', 'B', 0.02, 10);
      expect(mcq.isCorrect).toBe(true);

      const num = evaluateQuestionAnswer('numeric', '100', '101', 0.02, 10);
      expect(num.isCorrect).toBe(true);
    });
  });
});
