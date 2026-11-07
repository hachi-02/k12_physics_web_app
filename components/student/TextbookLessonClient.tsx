'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Lightbulb,
  Award,
  Check,
  Layers,
  HelpCircle,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import type { TextbookLessonDetail, ExerciseLevel } from '@/lib/textbook';
import TextbookMarkdownRenderer from './TextbookMarkdownRenderer';
import { PracticeRunner } from './PracticeRunner';

interface TextbookLessonClientProps {
  lesson: TextbookLessonDetail;
  studentId: number;
}

export default function TextbookLessonClient({ lesson, studentId }: TextbookLessonClientProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');
  const [markedRead, setMarkedRead] = useState(false);
  const [marking, setMarking] = useState(false);
  const [filterLevel, setFilterLevel] = useState<ExerciseLevel | 'all'>('all');

  const filteredExercises =
    filterLevel === 'all'
      ? lesson.exercises
      : lesson.exercises.filter((ex) => ex.level === filterLevel);

  const handleMarkRead = async () => {
    try {
      setMarking(true);
      const res = await fetch('/api/textbook/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, lessonId: lesson.id }),
      });
      if (res.ok) {
        setMarkedRead(true);
      }
    } catch (err) {
      console.error('Error marking theory read:', err);
    } finally {
      setMarking(false);
    }
  };

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
        throw new Error('Gửi bài tập thất bại');
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
        <Link href={`/student?grade=${lesson.grade}`} className="hover:text-teal-700 transition">
          SGK Lớp {lesson.grade}
        </Link>
        <span>/</span>
        <span className="text-slate-700">
          Chương {lesson.chapter.roman}: {lesson.chapter.title}
        </span>
        <span>/</span>
        <span className="text-teal-700 font-bold">Bài {lesson.number}</span>
      </nav>

      {/* Lesson Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            Chương {lesson.chapter.roman} • Bài {lesson.number}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            {lesson.exercises.length} câu hỏi tự luyện
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
            KHTN 6 • Kết nối tri thức
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          Bài {lesson.number}. {lesson.title}
        </h1>

        {/* Tab Selection */}
        <div className="pt-2 flex items-center gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={`inline-flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'theory'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            1. Lý Thuyết & Khám Phá
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exercises')}
            className={`inline-flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'exercises'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            2. Bài Tập Tự Luyện ({lesson.exercises.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Theory View */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Objectives Card */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 sm:p-7 border border-teal-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-teal-900 font-bold text-base">
                <Target className="w-5 h-5 text-teal-700" />
                <span>Mục tiêu bài học</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {lesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-teal-950 font-medium">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Content Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <TextbookMarkdownRenderer content={lesson.content} />
          </div>

          {/* "Em cần nhớ" Highlight Box */}
          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50/80 via-yellow-50 to-orange-50/60 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-xs">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-amber-950 uppercase tracking-wide">
                    Em Cần Ghi Nhớ
                  </h3>
                  <p className="text-xs text-amber-800">
                    Kiến thức cốt lõi và định luật trọng tâm của Bài {lesson.number}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {lesson.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/90 p-4 rounded-2xl border border-amber-200/80 shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="text-sm text-slate-900 font-medium leading-relaxed">
                      {point}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion & Next Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Bạn đã nắm vững lý thuyết chưa?
              </h4>
              <p className="text-xs text-slate-500">
                Đánh dấu đã hiểu để lưu tiến trình và chuyển sang làm bài tập tự luyện.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleMarkRead}
                disabled={marking || markedRead}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-bold transition shadow-xs ${
                  markedRead
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                {markedRead ? 'Đã hiểu lý thuyết' : marking ? 'Đang lưu...' : 'Đánh dấu đã đọc'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('exercises');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow-xs"
              >
                <span>Làm bài tập ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Exercises View */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Cấp độ:</span>
            {(
              [
                { id: 'all', label: `Tất cả (${lesson.exercises.length})` },
                {
                  id: 'nhan_biet',
                  label: `Nhận biết (${lesson.exercises.filter((e) => e.level === 'nhan_biet').length})`,
                },
                {
                  id: 'thong_hieu',
                  label: `Thông hiểu (${lesson.exercises.filter((e) => e.level === 'thong_hieu').length})`,
                },
                {
                  id: 'van_dung',
                  label: `Vận dụng (${lesson.exercises.filter((e) => e.level === 'van_dung').length})`,
                },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setFilterLevel(filter.id)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition ${
                  filterLevel === filter.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Practice Runner */}
          <PracticeRunner
            topicId={lesson.chapter.id}
            topicTitle={`Bài ${lesson.number}: ${lesson.title}`}
            grade={lesson.grade}
            questions={filteredExercises}
            studentId={studentId}
            onSubmitAnswers={handleCustomSubmit}
            completionLink={
              lesson.nextLesson
                ? {
                    href: `/student/textbook/lesson/${lesson.nextLesson.id}`,
                    label: `Tiếp tục: Bài ${lesson.nextLesson.number} - ${lesson.nextLesson.title}`,
                  }
                : {
                    href: `/student/textbook/chapter/${lesson.chapter.id}`,
                    label: `Ôn tập Chương ${lesson.chapter.roman}`,
                  }
            }
          />
        </div>
      )}

      {/* Bottom Lesson Navigation Bar */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {lesson.prevLesson ? (
          <Link
            href={`/student/textbook/lesson/${lesson.prevLesson.id}`}
            className="w-full sm:w-auto inline-flex items-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-bold bg-white text-slate-700 hover:text-teal-700 border border-slate-200 hover:border-teal-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              Bài trước: <strong>Bài {lesson.prevLesson.number}</strong>
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/student/textbook/chapter/${lesson.chapter.id}`}
          className="text-xs font-bold text-slate-500 hover:text-teal-700 transition"
        >
          Mục lục Chương {lesson.chapter.roman}
        </Link>

        {lesson.nextLesson ? (
          <Link
            href={`/student/textbook/lesson/${lesson.nextLesson.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-end gap-2 py-2.5 px-4 rounded-2xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition shadow-xs"
          >
            <span>
              Bài tiếp: <strong>Bài {lesson.nextLesson.number}</strong>
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={`/student/textbook/chapter/${lesson.chapter.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-end gap-2 py-2.5 px-4 rounded-2xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow-xs"
          >
            <span>Ôn tập Chương {lesson.chapter.roman}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
