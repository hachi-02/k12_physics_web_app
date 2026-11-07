'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Send,
  Flame,
  Award,
  PenTool
} from 'lucide-react';
import type { ClientQuestionItem, QuizSubmissionResult } from '@/lib/student';
import KaTeXRenderer from '@/components/KaTeXRenderer';
import Scratchpad from '@/components/Scratchpad';

interface ExamRoomRunnerProps {
  topicId: number;
  topicTitle: string;
  grade: number;
  durationMinutes?: number;
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

export function ExamRoomRunner({
  topicId,
  topicTitle,
  grade,
  durationMinutes = 15,
  questions,
  studentId,
}: ExamRoomRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuizSubmissionResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown hook
  useEffect(() => {
    if (isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      executeSubmission(true);
    }
  };

  const handleManualSubmit = () => {
    setShowConfirmModal(true);
  };

  const executeSubmission = async (isTimeout = false) => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    const timeSpent = Math.max(1, durationMinutes * 60 - timeLeftSeconds);

    const answersPayload = questions.map((q) => ({
      questionId: q.id,
      userAnswer: userAnswers[q.id] || '',
      timeSpentSeconds: Math.round(timeSpent / questions.length),
    }));

    try {
      const res = await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: studentId,
          topicId,
          quizType: 'exam',
          timeSpentSeconds: timeSpent,
          answers: answersPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi nộp bài');
      }

      setSubmissionResult(data);
      setIsSubmitted(true);
    } catch (err: any) {
      alert(`Lỗi khi nộp bài: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeftSeconds < 120 && timeLeftSeconds > 0;

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-700">Chưa có đề thi thử cho chuyên đề này</h3>
        <Link href={`/student?grade=${grade}`} className="text-xs font-bold text-teal-600 hover:underline">
          Quay lại danh sách bài học
        </Link>
      </div>
    );
  }

  // Final Results Screen
  if (isSubmitted && submissionResult) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-8 animate-fade-in">
        {/* Header Banner */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-2xs">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kết Quả Bài Thi Thử
          </h2>
          <p className="text-sm text-slate-500">{topicTitle} • Khối Lớp {grade}</p>
        </div>

        {/* Score & Rewards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Điểm số</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              {submissionResult.score}%
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Số câu đúng</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5">
              {submissionResult.correctCount} / {submissionResult.totalQuestions}
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
            <span className="text-[11px] font-bold text-amber-700 uppercase">Sao nhận</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-0.5 flex items-center justify-center gap-1">
              +{submissionResult.starsEarned} <Sparkles className="w-4 h-4 fill-amber-400" />
            </div>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center">
            <span className="text-[11px] font-bold text-rose-700 uppercase">Chuỗi ngày</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-0.5 flex items-center justify-center gap-1">
              {submissionResult.currentStreak} <Flame className="w-4 h-4 fill-rose-500" />
            </div>
          </div>
        </div>

        {/* New Badges Celebration (if any) */}
        {submissionResult.newBadges && submissionResult.newBadges.length > 0 && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <Award className="w-4 h-4 text-indigo-600" /> Chúc mừng! Bạn vừa mở khóa huy hiệu mới:
            </div>
            <div className="text-sm font-black text-indigo-800">
              {submissionResult.newBadges.join(', ')}
            </div>
          </div>
        )}

        {/* Detailed Review Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg">Xem Lại Lời Giải Chi Tiết Từng Câu:</h3>

          <div className="space-y-4">
            {submissionResult.results.map((res, idx) => {
              const matchedQ = questions.find((q) => q.id === res.questionId);

              return (
                <div
                  key={res.questionId}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    res.isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Câu {idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                        res.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {res.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {res.isCorrect ? 'Chính xác' : 'Sai'}
                    </span>
                  </div>

                  {matchedQ && (
                    <div className="text-sm font-semibold text-slate-900">
                      {renderMathText(matchedQ.prompt)}
                    </div>
                  )}

                  <div className="text-xs space-y-1">
                    <div>
                      <span className="font-semibold text-slate-600">Bạn đã chọn: </span>
                      <strong className="text-slate-900">{res.userAnswer || '(Bỏ trống)'}</strong>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-600">Đáp án chính xác: </span>
                      <strong className="text-emerald-700">{res.correctAnswer}</strong>
                    </div>
                  </div>

                  {res.explanation && (
                    <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                      <strong>Lời giải: </strong>
                      {renderMathText(res.explanation)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
          <Link
            href={`/student?grade=${grade}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Quay lại bài học
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setTimeLeftSeconds(durationMinutes * 60);
              setUserAnswers({});
              setCurrentIndex(0);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Thi lại đề này
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswer = userAnswers[currentQ.id] || '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
      {/* Top Countdown Bar & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
            Phòng Thi Thử • Thời Gian Làm Bài
          </span>
          <h3 className="text-base font-bold text-slate-900">{topicTitle}</h3>
        </div>

        {/* Countdown Clock */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-black transition ${
            isTimeCritical
              ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
              : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}
        >
          <Timer className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-slate-500'}`} />
          <span>Thời gian còn lại:</span>
          <span className="text-base font-mono tracking-wider">{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      {/* Question Palette Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(userAnswers[q.id]);
          const isCurrent = idx === currentIndex;

          let btnBg = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
          if (isAnswered) {
            btnBg = 'bg-teal-600 text-white font-bold';
          }
          if (isCurrent) {
            btnBg += ' ring-2 ring-teal-500 ring-offset-2';
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${btnBg}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Content */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Câu hỏi {currentIndex + 1} / {questions.length} ({currentQ.points || 10} điểm)
        </div>

        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {renderMathText(currentQ.prompt)}
        </div>

        {currentQ.latexFormula && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center my-3">
            <KaTeXRenderer math={currentQ.latexFormula} block className="text-lg text-indigo-950" />
          </div>
        )}
      </div>

      {/* Answer Options */}
      {currentQ.questionType === 'mcq' ? (
        <div className="space-y-2.5">
          {currentQ.options?.map((opt) => {
            const isSelected = currentAnswer === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt.id }))}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 transition cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/60 text-teal-950 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 text-slate-600'
                  }`}
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
        <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-bold text-slate-700">Điền số đáp án của bạn:</label>
            <div className="relative flex items-center max-w-xs">
              <input
                type="text"
                placeholder="VD: 9.8"
                value={currentAnswer}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                }
                className="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-xl text-base font-bold text-slate-900 focus:outline-hidden focus:border-teal-600"
              />
              {currentQ.numericUnit && (
                <span className="ml-2 font-bold text-sm text-slate-600 bg-slate-200 px-2.5 py-1 rounded-lg">
                  {currentQ.numericUnit}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation & Submit Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Câu trước
        </button>

        <div className="flex items-center gap-3">
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white transition shadow-xs"
            >
              Câu tiếp theo <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}

          <button
            onClick={handleManualSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-xs"
          >
            <Send className="w-4 h-4" /> Nộp bài thi
          </button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-scale-up">
            <h4 className="text-lg font-bold text-slate-900">Xác nhận nộp bài thi?</h4>
            <p className="text-sm text-slate-600">
              Bạn đã trả lời {Object.keys(userAnswers).length} / {questions.length} câu hỏi.
              Thời gian còn lại {formatTime(timeLeftSeconds)}. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => executeSubmission(false)}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                {isSubmitting ? 'Đang nộp...' : 'Xác nhận nộp bài'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Floating Scratchpad Overlay Toggle */}
      <button
        type="button"
        onClick={() => setShowScratchpad(!showScratchpad)}
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xl transition"
        title="Bảng nháp tính toán"
      >
        <PenTool className="w-4 h-4" />
        {showScratchpad ? 'Thu gọn nháp' : 'Mở bảng nháp'}
      </button>

      <Scratchpad
        isOpen={showScratchpad}
        onClose={() => setShowScratchpad(false)}
        isFloating={true}
      />
    </div>
  );
}

export default ExamRoomRunner;
