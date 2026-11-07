// tests/adversarial/curriculum_katex_edge_cases.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import katex from 'katex';
import { CURRICULUM_DATA, CurriculumTopicSeed, SeedQuestion } from '../../lib/curriculum-data';
import { getDb } from '../../lib/db';
import { seedDatabase } from '../../lib/seed';
import type { ParentGuide, McqOption, QuestionHint } from '../../types/database';

describe('Adversarial Verification: KaTeX Formulas, Seed Data, Parent Guides & Edge Cases (M1)', () => {
  let db: ReturnType<typeof getDb>;

  beforeAll(async () => {
    db = getDb();
    await seedDatabase({ force: true });
  });

  // ==========================================================================
  // AREA 1: KaTeX Formula Extraction & Strict Compilation
  // ==========================================================================
  describe('Area 1: KaTeX Formula Compilation & Syntax Hardening', () => {
    // Helper to extract LaTeX formulas matching $...$ and $$...$$
    function extractFormulas(text: string): { formula: string; displayMode: boolean; rawMatch: string }[] {
      const results: { formula: string; displayMode: boolean; rawMatch: string }[] = [];
      if (!text) return results;

      // Match block formulas $$...$$
      const blockRegex = /\$\$([\s\S]+?)\$\$/g;
      let match: RegExpExecArray | null;
      while ((match = blockRegex.exec(text)) !== null) {
        results.push({ formula: match[1].trim(), displayMode: true, rawMatch: match[0] });
      }

      // Remove block formulas temporarily to avoid nested match
      const textWithoutBlocks = text.replace(blockRegex, ' ');

      // Match inline formulas $...$ (not preceded or followed by $)
      const inlineRegex = /(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g;
      while ((match = inlineRegex.exec(textWithoutBlocks)) !== null) {
        results.push({ formula: match[1].trim(), displayMode: false, rawMatch: match[0] });
      }

      return results;
    }

    it('should compile all explicit latex_formula fields on questions without errors', () => {
      const explicitFormulas: { grade: number; topic: string; formula: string }[] = [];

      for (const topic of CURRICULUM_DATA) {
        for (const q of topic.questions) {
          if (q.latex_formula) {
            explicitFormulas.push({
              grade: topic.grade,
              topic: topic.topicTitle,
              formula: q.latex_formula,
            });
          }
        }
      }

      expect(explicitFormulas.length).toBeGreaterThan(0);

      const failures: { formula: string; error: string; topic: string }[] = [];

      for (const item of explicitFormulas) {
        try {
          const html = katex.renderToString(item.formula, {
            throwOnError: true,
            displayMode: true,
          });
          expect(html).toContain('katex');
        } catch (err: any) {
          failures.push({
            formula: item.formula,
            error: err.message || String(err),
            topic: item.topic,
          });
        }
      }

      expect(failures, `Explicit formulas failed KaTeX compilation: ${JSON.stringify(failures, null, 2)}`).toHaveLength(0);
    });

    it('should compile all LaTeX formulas extracted from markdown content, summaries, prompts, hints, and explanations', () => {
      const allExtracted: {
        source: string;
        grade: number;
        formula: string;
        displayMode: boolean;
      }[] = [];

      for (const topic of CURRICULUM_DATA) {
        // From contentMarkdown
        for (const f of extractFormulas(topic.contentMarkdown)) {
          allExtracted.push({ source: `Lesson Markdown (${topic.slug})`, grade: topic.grade, ...f });
        }
        // From summary
        for (const f of extractFormulas(topic.summary)) {
          allExtracted.push({ source: `Topic Summary (${topic.slug})`, grade: topic.grade, ...f });
        }
        // From parentGuide summary & guiding questions & experiments
        for (const f of extractFormulas(topic.parentGuide.summary)) {
          allExtracted.push({ source: `Parent Guide Summary (${topic.slug})`, grade: topic.grade, ...f });
        }
        for (const gq of topic.parentGuide.guiding_questions) {
          for (const f of extractFormulas(gq)) {
            allExtracted.push({ source: `Parent Guide Question (${topic.slug})`, grade: topic.grade, ...f });
          }
        }
        for (const exp of topic.parentGuide.home_experiments) {
          for (const mat of exp.materials) {
            for (const f of extractFormulas(mat)) {
              allExtracted.push({ source: `Experiment Material (${exp.title})`, grade: topic.grade, ...f });
            }
          }
          for (const step of exp.steps) {
            for (const f of extractFormulas(step)) {
              allExtracted.push({ source: `Experiment Step (${exp.title})`, grade: topic.grade, ...f });
            }
          }
          for (const f of extractFormulas(exp.expected_outcome)) {
            allExtracted.push({ source: `Experiment Outcome (${exp.title})`, grade: topic.grade, ...f });
          }
        }

        // From questions
        for (const q of topic.questions) {
          for (const f of extractFormulas(q.prompt)) {
            allExtracted.push({ source: `Question Prompt (${q.prompt.slice(0, 30)})`, grade: topic.grade, ...f });
          }
          for (const f of extractFormulas(q.explanation)) {
            allExtracted.push({ source: `Question Explanation (${q.prompt.slice(0, 30)})`, grade: topic.grade, ...f });
          }
          for (const hint of q.hints) {
            for (const f of extractFormulas(hint.hint)) {
              allExtracted.push({ source: `Question Hint L${hint.level} (${q.prompt.slice(0, 30)})`, grade: topic.grade, ...f });
            }
          }
          if (q.options) {
            for (const opt of q.options) {
              for (const f of extractFormulas(opt.text)) {
                allExtracted.push({ source: `Option Text ${opt.id} (${q.prompt.slice(0, 30)})`, grade: topic.grade, ...f });
              }
              if (opt.latex) {
                allExtracted.push({
                  source: `Option LaTeX ${opt.id} (${q.prompt.slice(0, 30)})`,
                  grade: topic.grade,
                  formula: opt.latex,
                  displayMode: false,
                });
              }
            }
          }
        }
      }

      console.log(`[KaTeX Stress Test] Extracted ${allExtracted.length} formulas across curriculum dataset.`);
      expect(allExtracted.length).toBeGreaterThanOrEqual(40);

      const renderFailures: { source: string; formula: string; error: string; grade: number }[] = [];

      for (const item of allExtracted) {
        try {
          const rendered = katex.renderToString(item.formula, {
            throwOnError: true,
            displayMode: item.displayMode,
          });
          expect(rendered).toContain('katex');
        } catch (err: any) {
          renderFailures.push({
            source: item.source,
            formula: item.formula,
            error: err.message || String(err),
            grade: item.grade,
          });
        }
      }

      expect(
        renderFailures,
        `KaTeX render errors encountered in curriculum:\n${JSON.stringify(renderFailures, null, 2)}`
      ).toHaveLength(0);
    });

    it('should gracefully handle malformed formulas without fatal unhandled exceptions when throwOnError=false', () => {
      const malformedCases = [
        '\\frac{1}{',
        '\\sqrt[',
        '\\unknownMacro{123}',
        '\\begin{matrix} 1 & 2',
        'x^',
        '_2',
        '\\left( x \\right',
      ];

      for (const badFormula of malformedCases) {
        expect(() => {
          const html = katex.renderToString(badFormula, { throwOnError: false });
          expect(html).toContain('katex');
        }).not.toThrow();
      }
    });
  });

  // ==========================================================================
  // AREA 2: Parent Guide JSON Completeness & Structural Parseability
  // ==========================================================================
  describe('Area 2: Parent Guide Pedagogical Completeness & Schema Validation', () => {
    it('should have 100% complete, parseable, and non-trivial parent guides for all 12 grades', () => {
      for (const topic of CURRICULUM_DATA) {
        const guide = topic.parentGuide;
        expect(guide, `Grade ${topic.grade} missing parentGuide`).toBeDefined();

        // 1. Summary
        expect(typeof guide.summary).toBe('string');
        expect(guide.summary.trim().length, `Grade ${topic.grade} summary too short`).toBeGreaterThanOrEqual(25);
        expect(guide.summary).not.toMatch(/TODO|TBD|Placeholder|lorem ipsum/i);

        // 2. Misconceptions
        expect(Array.isArray(guide.misconceptions), `Grade ${topic.grade} misconceptions is not array`).toBe(true);
        expect(guide.misconceptions.length, `Grade ${topic.grade} must have at least 1 misconception`).toBeGreaterThanOrEqual(1);
        for (const misc of guide.misconceptions) {
          expect(typeof misc).toBe('string');
          expect(misc.trim().length).toBeGreaterThanOrEqual(10);
        }

        // 3. Guiding Questions
        expect(Array.isArray(guide.guiding_questions), `Grade ${topic.grade} guiding_questions is not array`).toBe(true);
        expect(guide.guiding_questions.length, `Grade ${topic.grade} must have at least 1 guiding question`).toBeGreaterThanOrEqual(1);
        for (const gq of guide.guiding_questions) {
          expect(typeof gq).toBe('string');
          expect(gq.trim().length).toBeGreaterThanOrEqual(10);
          expect(gq).toMatch(/\?$/); // Must end with a question mark
        }

        // 4. Home Experiments
        expect(Array.isArray(guide.home_experiments), `Grade ${topic.grade} home_experiments is not array`).toBe(true);
        expect(guide.home_experiments.length, `Grade ${topic.grade} must have at least 1 home experiment`).toBeGreaterThanOrEqual(1);

        for (const exp of guide.home_experiments) {
          expect(typeof exp.title).toBe('string');
          expect(exp.title.trim().length).toBeGreaterThanOrEqual(5);

          expect(Array.isArray(exp.materials)).toBe(true);
          expect(exp.materials.length).toBeGreaterThanOrEqual(1);
          for (const mat of exp.materials) {
            expect(typeof mat).toBe('string');
            expect(mat.trim().length).toBeGreaterThanOrEqual(3);
          }

          expect(Array.isArray(exp.steps)).toBe(true);
          expect(exp.steps.length).toBeGreaterThanOrEqual(2);
          for (const step of exp.steps) {
            expect(typeof step).toBe('string');
            expect(step.trim().length).toBeGreaterThanOrEqual(5);
          }

          expect(typeof exp.expected_outcome).toBe('string');
          expect(exp.expected_outcome.trim().length).toBeGreaterThanOrEqual(15);

          if (exp.safety_notes) {
            expect(typeof exp.safety_notes).toBe('string');
            expect(exp.safety_notes.trim().length).toBeGreaterThanOrEqual(5);
          }
        }
      }
    });

    it('should verify database lessons.parent_guide JSON serialization roundtrip', () => {
      const dbLessons = db.query<{ id: number; title: string; parent_guide: string }>(
        'SELECT id, title, parent_guide FROM lessons'
      );
      expect(dbLessons.length).toBe(12);

      for (const row of dbLessons) {
        expect(() => {
          const parsed: ParentGuide = JSON.parse(row.parent_guide);
          expect(parsed.summary).toBeTruthy();
          expect(parsed.misconceptions.length).toBeGreaterThan(0);
          expect(parsed.guiding_questions.length).toBeGreaterThan(0);
          expect(parsed.home_experiments.length).toBeGreaterThan(0);
        }).not.toThrow();
      }
    });
  });

  // ==========================================================================
  // AREA 3: MCQ Options, Key Uniqueness & Answer Mapping
  // ==========================================================================
  describe('Area 3: MCQ Options, Key Uniqueness & Answer Integrity', () => {
    it('should verify every MCQ question has exactly 4 unique valid option IDs [A, B, C, D] matching correct_answer', () => {
      let mcqCount = 0;

      for (const topic of CURRICULUM_DATA) {
        for (const q of topic.questions) {
          if (q.question_type === 'mcq') {
            mcqCount++;
            expect(q.options, `MCQ in topic ${topic.slug} must have options`).toBeDefined();
            expect(Array.isArray(q.options)).toBe(true);
            expect(q.options!.length, `MCQ "${q.prompt.slice(0, 30)}" must have exactly 4 options`).toBe(4);

            const ids = q.options!.map((o) => o.id);
            // Verify unique IDs
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size, `Duplicate option IDs in question: ${q.prompt}`).toBe(4);

            // Verify standard [A, B, C, D]
            expect(ids).toEqual(['A', 'B', 'C', 'D']);

            // Verify correct_answer points to one of the options
            expect(ids, `correct_answer "${q.correct_answer}" not found in option IDs for question: ${q.prompt}`).toContain(q.correct_answer);

            // Verify each option text is non-empty
            const texts = new Set<string>();
            for (const opt of q.options!) {
              expect(opt.text.trim().length, `Empty option text for ID ${opt.id} in ${q.prompt}`).toBeGreaterThan(0);
              texts.add(opt.text.trim().toLowerCase());
            }
            // Verify no duplicate option texts within same question
            expect(texts.size, `Duplicate option text values in question: ${q.prompt}`).toBe(4);

            // Verify explanation is present and informative
            expect(q.explanation).toBeDefined();
            expect(q.explanation.trim().length).toBeGreaterThanOrEqual(15);
          }
        }
      }

      console.log(`[MCQ Stress Test] Verified ${mcqCount} MCQ questions across all tiers.`);
      expect(mcqCount).toBeGreaterThanOrEqual(10);
    });

    it('should verify database questions table contains valid options_json and matching correct_answer', () => {
      const dbMcqs = db.query<{
        id: number;
        prompt: string;
        options: string;
        options_json: string;
        correct_answer: string;
      }>("SELECT id, prompt, options, options_json, correct_answer FROM questions WHERE question_type = 'mcq'");

      for (const row of dbMcqs) {
        const rawJson = row.options_json || row.options;
        const options: McqOption[] = JSON.parse(rawJson);
        const validIds = options.map((o) => o.id);
        expect(validIds).toContain(row.correct_answer);
      }
    });
  });

  // ==========================================================================
  // AREA 4: Numeric Question Tolerances & User Input Edge Cases
  // ==========================================================================
  describe('Area 4: Numeric Question Tolerances & Adversarial Input Evaluation', () => {
    /**
     * Standard floating point tolerance evaluation matching PROJECT.md:
     * Float tolerance (+- 2% to 5%)
     * Supports Vietnamese decimal comma (e.g. "2,5" -> 2.5), whitespace trimming.
     */
    function evaluateNumericAnswer(
      rawInput: unknown,
      correctAnswerStr: string,
      tolerance: number = 0.02
    ): { isCorrect: boolean; parsedInput: number; target: number; deltaRel: number } {
      if (rawInput === null || rawInput === undefined) {
        return { isCorrect: false, parsedInput: NaN, target: parseFloat(correctAnswerStr), deltaRel: Infinity };
      }

      let sanitized = String(rawInput).trim();
      // Handle Vietnamese comma decimal separator
      sanitized = sanitized.replace(',', '.');

      // Strip trailing unit if user typed it (e.g. "20 N" -> "20")
      sanitized = sanitized.replace(/[a-zA-Z°Ω/s^]+$/, '').trim();

      const parsed = parseFloat(sanitized);
      const target = parseFloat(correctAnswerStr);

      if (isNaN(parsed) || !isFinite(parsed) || isNaN(target) || !isFinite(target)) {
        return { isCorrect: false, parsedInput: parsed, target, deltaRel: Infinity };
      }

      if (target === 0) {
        const isCorrect = Math.abs(parsed) <= tolerance;
        return { isCorrect, parsedInput: parsed, target, deltaRel: Math.abs(parsed) };
      }

      const deltaRel = Math.abs(parsed - target) / Math.abs(target);
      const isCorrect = deltaRel <= tolerance + 1e-9; // tiny epsilon for IEEE 754 precision

      return { isCorrect, parsedInput: parsed, target, deltaRel };
    }

    it('should verify all numeric questions have parseable correct_answer, valid tolerance and physical unit', () => {
      let numCount = 0;
      for (const topic of CURRICULUM_DATA) {
        for (const q of topic.questions) {
          if (q.question_type === 'numeric') {
            numCount++;
            const target = parseFloat(q.correct_answer);
            expect(isNaN(target), `Numeric question target is NaN: ${q.correct_answer}`).toBe(false);
            expect(isFinite(target), `Numeric question target is not finite: ${q.correct_answer}`).toBe(true);

            expect(q.numeric_tolerance, `Tolerance missing in question: ${q.prompt}`).toBeDefined();
            expect(q.numeric_tolerance!).toBeGreaterThan(0);
            expect(q.numeric_tolerance!).toBeLessThanOrEqual(0.1); // Between 1% and 10%

            expect(q.numeric_unit, `Unit missing in numeric question: ${q.prompt}`).toBeDefined();
            expect(q.numeric_unit!.trim().length).toBeGreaterThan(0);
          }
        }
      }
      console.log(`[Numeric Stress Test] Verified ${numCount} numeric questions.`);
      expect(numCount).toBeGreaterThanOrEqual(6);
    });

    it('should pass exact string, whitespace-padded, and trailing zero inputs', () => {
      const numericQuestions: SeedQuestion[] = [];
      for (const t of CURRICULUM_DATA) {
        for (const q of t.questions) {
          if (q.question_type === 'numeric') numericQuestions.push(q);
        }
      }

      for (const q of numericQuestions) {
        const tol = q.numeric_tolerance || 0.02;

        // 1. Exact answer
        const resExact = evaluateNumericAnswer(q.correct_answer, q.correct_answer, tol);
        expect(resExact.isCorrect, `Exact answer failed: ${q.correct_answer}`).toBe(true);

        // 2. Whitespace padding
        const resSpaces = evaluateNumericAnswer(`   ${q.correct_answer}   `, q.correct_answer, tol);
        expect(resSpaces.isCorrect, `Whitespace padded failed: ${q.correct_answer}`).toBe(true);

        // 3. Trailing zeros (e.g. 18 -> 18.000)
        const target = parseFloat(q.correct_answer);
        const resZeros = evaluateNumericAnswer(target.toFixed(4), q.correct_answer, tol);
        expect(resZeros.isCorrect, `Trailing zeros failed: ${target.toFixed(4)} for ${q.correct_answer}`).toBe(true);
      }
    });

    it('should correctly handle Vietnamese comma decimal separator (e.g. "0,314" for "0.314")', () => {
      // Find question with decimal (e.g. Grade 11: 0.314)
      const qDec = CURRICULUM_DATA.flatMap((t) => t.questions).find(
        (q) => q.question_type === 'numeric' && q.correct_answer.includes('.')
      );
      expect(qDec).toBeDefined();

      const commaInput = qDec!.correct_answer.replace('.', ',');
      const res = evaluateNumericAnswer(commaInput, qDec!.correct_answer, qDec!.numeric_tolerance);
      expect(res.isCorrect, `Vietnamese comma decimal input "${commaInput}" failed`).toBe(true);
    });

    it('should strictly test numeric tolerance boundary conditions (inside tolerance vs outside tolerance)', () => {
      const numericQuestions = CURRICULUM_DATA.flatMap((t) => t.questions).filter(
        (q) => q.question_type === 'numeric'
      );

      for (const q of numericQuestions) {
        const target = parseFloat(q.correct_answer);
        const tol = q.numeric_tolerance || 0.02;

        // Exactly at upper bound: target * (1 + tol)
        const upperExact = target * (1 + tol);
        const resUpperExact = evaluateNumericAnswer(upperExact.toString(), q.correct_answer, tol);
        expect(resUpperExact.isCorrect, `Exact upper bound failed for target ${target}`).toBe(true);

        // Exactly at lower bound: target * (1 - tol)
        const lowerExact = target * (1 - tol);
        const resLowerExact = evaluateNumericAnswer(lowerExact.toString(), q.correct_answer, tol);
        expect(resLowerExact.isCorrect, `Exact lower bound failed for target ${target}`).toBe(true);

        // Just inside upper bound: target * (1 + tol * 0.98)
        const insideUpper = target * (1 + tol * 0.98);
        const resInsideUpper = evaluateNumericAnswer(insideUpper.toString(), q.correct_answer, tol);
        expect(resInsideUpper.isCorrect).toBe(true);

        // Just inside lower bound: target * (1 - tol * 0.98)
        const insideLower = target * (1 - tol * 0.98);
        const resInsideLower = evaluateNumericAnswer(insideLower.toString(), q.correct_answer, tol);
        expect(resInsideLower.isCorrect).toBe(true);

        // Definitely outside upper bound: target * (1 + tol * 1.5)
        const outsideUpper = target * (1 + tol * 1.5);
        const resOutsideUpper = evaluateNumericAnswer(outsideUpper.toString(), q.correct_answer, tol);
        expect(resOutsideUpper.isCorrect, `Outside upper bound should fail for target ${target}`).toBe(false);

        // Definitely outside lower bound: target * (1 - tol * 1.5)
        const outsideLower = target * (1 - tol * 1.5);
        const resOutsideLower = evaluateNumericAnswer(outsideLower.toString(), q.correct_answer, tol);
        expect(resOutsideLower.isCorrect, `Outside lower bound should fail for target ${target}`).toBe(false);
      }
    });

    it('should reject adversarial, malformed, non-numeric, and extreme user inputs', () => {
      const targetStr = '20';
      const tol = 0.02;

      const adversarialInputs = [
        '-20',               // Opposite sign
        'abc',               // Random text
        'NaN',               // Literal NaN
        'Infinity',          // Literal Infinity
        '-Infinity',         // Literal -Infinity
        '',                  // Empty string
        '   ',               // Pure whitespace
        '20..0',             // Double dots
        '20 20',             // Space-separated numbers
        '1e10',              // Extreme exponential
        '1e-10',             // Tiny exponential
        '0',                 // Zero when target is 20
        '999999999999',      // Huge number
        null,                // Null input
        undefined,           // Undefined input
        '<script>alert(1)</script>', // XSS payload
      ];

      for (const badInput of adversarialInputs) {
        const res = evaluateNumericAnswer(badInput, targetStr, tol);
        expect(res.isCorrect, `Adversarial input "${badInput}" should have failed evaluation`).toBe(false);
      }
    });
  });
});
