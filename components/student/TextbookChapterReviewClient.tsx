'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Check,
  ChevronRight,
  Layers,
  Award
} from 'lucide-react';
import type { TextbookChapterReview } from '@/lib/textbook';
import { PracticeRunner } from './PracticeRunner';

interface TextbookChapterReviewClientProps {
  review: TextbookChapterReview;
  studentId: number;
}

export default function TextbookChapterReviewClient({
  review,
  studentId,
}: TextbookChapterReviewClientProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'exam'>('summary');

  const handleCustomSubmit = async (
    answers: { questionId: number; userAnswer: string; hintsUsed: number }[]
  ) => {
    try {
      const res = await fetch('/api/textbook/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, answers }),
      });
      if (!res.ok) {
        throw new Error('Gửi bài ôn tập thất bại');
      }
    } catch (err) {
      console.error('Submit error:', err);
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
        <Link href="/student" className="hover:text-teal-700 transition">
          Trang chủ học sinh
        </Link>
        <span>/</span>
        <Link href={`/student?grade=${review.grade}`} className="hover:text-teal-700 transition">
          SGK Lớp {review.grade}
        </Link>
        <span>/</span>
        <span className="text-teal-700 font-bold">
          Ôn tập Chương {review.roman}
        </span>
      </nav>

      {/* Chapter Review Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-amber-100 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-amber-200" />
              Tổng kết & Ôn tập Chương
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Chương {review.roman}: {review.title}
            </h1>
            <p className="text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              Hệ thống hóa toàn bộ kiến thức cốt lõi của {review.lessons.length} bài học và thử sức với bộ {review.exercises.length} câu hỏi tự luyện tổng hợp.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0 text-center min-w-[180px]">
            <div className="text-xs uppercase font-bold tracking-wider text-amber-200 mb-1">
              Bộ câu hỏi ôn tập
            </div>
            <div className="text-3xl font-black text-white">
              {review.exercises.length} <span className="text-base font-normal text-amber-200">câu</span>
            </div>
            <div className="text-[11px] text-amber-200 mt-1">
              {review.lessons.length} bài học trong chương
            </div>
          </div>
        </div>

        {/* Tab navigation within Hero */}
        <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            1. Bảng Tổng Hợp Kiến Thức Trọng Tâm
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exam')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'exam'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            2. Phòng Luyện Tập Toàn Chương ({review.exercises.length} câu)
          </button>
        </div>
      </div>

      {/* Tab 1: Synthesis of Lessons */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {review.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-4 hover:border-amber-300 transition"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
                      {lesson.number}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      Bài {lesson.number}. {lesson.title}
                    </h3>
                  </div>

                  <Link
                    href={`/student/textbook/lesson/${lesson.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 py-1.5 px-3 rounded-xl transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Xem chi tiết bài học
                  </Link>
                </div>

                {lesson.keyPoints && lesson.keyPoints.length > 0 ? (
                  <div className="space-y-2">
                    {lesson.keyPoints.map((kp, kIdx) => (
                      <div
                        key={kIdx}
                        className="flex items-start gap-2.5 text-sm text-slate-800 bg-slate-50/80 p-3 rounded-xl border border-slate-100"
                      >
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{kp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Chưa có ghi chú tóm tắt cho bài này.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Action to Jump into Exam */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Sẵn sàng thử thách toàn chương?
              </h4>
              <p className="text-xs text-slate-500">
                Làm trọn vẹn bộ {review.exercises.length} câu hỏi tự luyện tổng hợp từ tất cả các bài trong Chương {review.roman}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab('exam');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bắt đầu luyện tập toàn chương</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Full Chapter Exam Room */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <PracticeRunner
            topicId={review.id}
            topicTitle={`Ôn tập tổng hợp: Chương ${review.roman} - ${review.title}`}
            grade={review.grade}
            questions={review.exercises}
            studentId={studentId}
            onSubmitAnswers={handleCustomSubmit}
            completionLink={{
              href: `/student?grade=${review.grade}`,
              label: `Trở về Danh mục SGK Lớp ${review.grade}`,
            }}
          />
        </div>
      )}

      {/* Back link */}
      <div className="pt-4">
        <Link
          href={`/student?grade=${review.grade}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Về Mục Lục Sách Giáo Khoa Lớp {review.grade}
        </Link>
      </div>
    </div>
  );
}
