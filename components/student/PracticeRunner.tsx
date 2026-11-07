'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Trophy, 
  Check, 
  AlertTriangle,
  Lightbulb,
  Timer
} from 'lucide-react';
import type { ClientQuestionItem } from '@/lib/student';
import { evaluateQuestionAnswer, GradingResult } from '@/lib/grading';
import KaTeXRenderer from '@/components/KaTeXRenderer';
import HintAccordion from './HintAccordion';

interface PracticeRunnerProps {
  topicId: number;
  topicTitle: string;
  grade: number;
  questions: ClientQuestionItem[];
  studentId?: number;
}

/**
 * Helper to render text containing possible $...$ LaTeX formulas
 */
function renderMathText(text: string) {
  if (!text.includes('$')) {
    return <span>{text}</span>;
  }

  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const formula = part.slice(1, -1);
          return <KaTeXRenderer key={index} math={formula} className="mx-1 font-serif text-teal-800" />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export function PracticeRunner({
  topicId,
  topicTitle,
  grade,
  questions,
  studentId,
}: PracticeRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [gradedResults, setGradedResults] = useState<Record<number, GradingResult>>({});
  const [hintsUsedRecord, setHintsUsedRecord] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
        <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-base font-bold text-slate-700">Chưa có câu hỏi luyện tập cho chủ đề này</h3>
        <Link
          href={`/student?grade=${grade}`}
          className="text-xs font-bold text-teal-600 hover:underline"
        >
          Quay lại danh sách bài học
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswer = userAnswers[currentQ.id] || '';
  const currentResult = gradedResults[currentQ.id];

  const handleSelectMcq = (optionId: string) => {
    if (currentResult) return; // Locked after grading
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleNumericInput = (val: string) => {
    if (currentResult) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleGradeCurrent = () => {
    if (!currentAnswer.trim()) return;

    const grading = evaluateQuestionAnswer(
      currentQ.questionType,
      currentAnswer,
      currentQ.correctAnswer || '',
      currentQ.numericTolerance || 0.02,
      currentQ.points || 10
    );

    setGradedResults((prev) => ({ ...prev, [currentQ.id]: grading }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishPractice();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishPractice = async () => {
    setIsCompleted(true);
    setIsSaving(true);

    try {
      const answersPayload = questions.map((q) => ({
        questionId: q.id,
        userAnswer: userAnswers[q.id] || '',
        hintsUsed: hintsUsedRecord[q.id] || 0,
      }));

      await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: studentId,
          topicId,
          quizType: 'practice',
          timeSpentSeconds: 180,
          answers: answersPayload,
        }),
      });
    } catch (err) {
      console.error('Lỗi lưu bài luyện tập:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const restartPractice = () => {
    setUserAnswers({});
    setGradedResults({});
    setHintsUsedRecord({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Completion Screen
  if (isCompleted) {
    const totalQuestions = questions.length;
    let correctCount = 0;
    for (const q of questions) {
      if (gradedResults[q.id]?.isCorrect) correctCount++;
    }
    const scorePct = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Hoàn Thành Bài Luyện Tập!</h2>
          <p className="text-sm text-slate-500">{topicTitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase">Điểm số</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{scorePct}%</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase">Số câu đúng</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">
              {correctCount} / {totalQuestions}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={restartPractice}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" /> Luyện tập lại
          </button>

          <Link
            href={`/student/exam/${topicId}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white transition shadow-sm"
          >
            <Timer className="w-4 h-4" /> Vào phòng thi thử
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
      {/* Top Header & Question Palette Indicator */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
            Câu hỏi {currentIndex + 1} / {questions.length}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">{topicTitle}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = Boolean(userAnswers[q.id]);
            const isGraded = Boolean(gradedResults[q.id]);
            const isCorrect = gradedResults[q.id]?.isCorrect;

            let circleBg = 'bg-slate-100 text-slate-500';
            if (isGraded) {
              circleBg = isCorrect
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-500 text-white';
            } else if (isAnswered) {
              circleBg = 'bg-teal-100 text-teal-800 font-bold';
            }
            if (idx === currentIndex) {
              circleBg += ' ring-2 ring-teal-500 ring-offset-2';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${circleBg}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-3">
        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {renderMathText(currentQ.prompt)}
        </div>

        {currentQ.latexFormula && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-center my-3">
            <KaTeXRenderer math={currentQ.latexFormula} block className="text-lg text-indigo-950" />
          </div>
        )}
      </div>

      {/* Answer Input Section */}
      {currentQ.questionType === 'mcq' ? (
        <div className="space-y-2.5">
          {currentQ.options?.map((opt) => {
            const isSelected = currentAnswer === opt.id;
            const isGraded = Boolean(currentResult);
            const isCorrectOption = opt.id === currentQ.correctAnswer;

            let optStyle =
              'border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 text-slate-800';
            let circleStyle = 'border-slate-300 text-slate-600 bg-white';

            if (isSelected) {
              optStyle = 'border-teal-600 bg-teal-50 text-teal-950 shadow-xs';
              circleStyle = 'border-teal-600 bg-teal-600 text-white';
            }

            if (isGraded) {
              if (isCorrectOption) {
                optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                circleStyle = 'border-emerald-600 bg-emerald-600 text-white';
              } else if (isSelected && !isCorrectOption) {
                optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                circleStyle = 'border-rose-600 bg-rose-600 text-white';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectMcq(opt.id)}
                disabled={isGraded}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 transition cursor-pointer ${optStyle}`}
              >
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition ${circleStyle}`}
                >
                  {opt.id}
                </span>

                <div className="text-sm font-medium leading-relaxed flex-1">
                  {renderMathText(opt.text)}
                  {opt.latex && (
                    <KaTeXRenderer math={opt.latex} className="ml-1 text-teal-900 font-serif" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Numeric Input Section */
        <div className="space-y-3 p-5 bg-slate-50/70 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-bold text-slate-700">Nhập kết quả tính toán:</label>
            <div className="relative flex items-center max-w-xs">
              <input
                type="text"
                placeholder="VD: 9.8 hoặc 1.5e-3"
                value={currentAnswer}
                onChange={(e) => handleNumericInput(e.target.value)}
                disabled={Boolean(currentResult)}
                className="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-xl text-base font-bold text-slate-900 focus:outline-hidden focus:border-teal-600 transition"
              />
              {currentQ.numericUnit && (
                <span className="ml-2 font-bold text-sm text-slate-600 bg-slate-200 px-2.5 py-1 rounded-lg">
                  {currentQ.numericUnit}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Hệ thống chấp nhận sai số tính toán trong khoảng ±{(Number(currentQ.numericTolerance || 0.02) * 100).toFixed(0)}%.
          </p>
        </div>
      )}

      {/* Progressive Hints Accordion */}
      {currentQ.hints && currentQ.hints.length > 0 && (
        <HintAccordion
          hints={currentQ.hints}
          onHintOpened={(level) =>
            setHintsUsedRecord((prev) => ({ ...prev, [currentQ.id]: level }))
          }
        />
      )}

      {/* Feedback Banner after grading */}
      {currentResult && (
        <div
          className={`p-4.5 rounded-2xl border space-y-2 animate-fade-in ${
            currentResult.isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            {currentResult.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Chính xác! (+{currentResult.scoreEarned} điểm)</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>{currentResult.feedback}</span>
              </>
            )}
          </div>

          {currentQ.explanation && (
            <div className="text-xs sm:text-sm pt-2 border-t border-slate-200/50 leading-relaxed text-slate-800">
              <span className="font-bold">Lời giải chi tiết: </span>
              {renderMathText(currentQ.explanation)}
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Câu trước
        </button>

        <div className="flex items-center gap-2">
          {!currentResult ? (
            <button
              onClick={handleGradeCurrent}
              disabled={!currentAnswer.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white transition shadow-xs"
            >
              <Check className="w-4 h-4" /> Kiểm tra đáp án
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white transition shadow-xs"
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  Câu tiếp theo <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Xem tổng kết <Trophy className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticeRunner;
