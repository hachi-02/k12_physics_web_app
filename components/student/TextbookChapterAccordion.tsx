'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  ArrowRight,
  Award,
  Layers,
  FileCheck,
  Eye,
  Check
} from 'lucide-react';
import type { TextbookToc, TextbookChapterSummary, TextbookLessonSummary } from '@/lib/textbook';

interface TextbookChapterAccordionProps {
  toc: TextbookToc;
  studentId?: number;
}

export default function TextbookChapterAccordion({ toc, studentId }: TextbookChapterAccordionProps) {
  // Expand all chapters by default so student can see the full road map
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    toc.chapters.forEach((ch, idx) => {
      initial[ch.id] = true; // all expanded
    });
    return initial;
  });

  const toggleChapter = (chapterId: number) => {
    setExpanded((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const totalLessons = toc.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalCompleted = toc.chapters.reduce((sum, ch) => sum + ch.completedCount, 0);
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600/50 backdrop-blur-sm text-xs font-bold text-teal-100 border border-teal-400/30">
              <BookOpen className="w-3.5 h-3.5 text-teal-200" />
              Sách Giáo Khoa GDPT 2018 • Bộ {toc.bookSeries}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Khoa Học Tự Nhiên Lớp {toc.grade} — Phân Môn Vật Lý
            </h2>
            <p className="text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Toàn bộ kiến thức chuẩn theo từng chương, từng bài học trong sách giáo khoa. Mỗi bài gồm: Lý thuyết trực quan với công thức KaTeX, mục &ldquo;Em cần nhớ&rdquo; và hệ thống bài tập 3 cấp độ (Nhận biết – Thông hiểu – Vận dụng).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0 min-w-[200px] text-center">
            <div className="text-xs uppercase font-bold tracking-wider text-teal-200 mb-1">
              Tiến độ lớp {toc.grade}
            </div>
            <div className="text-3xl font-black text-white flex items-center justify-center gap-1">
              {totalCompleted} <span className="text-lg font-medium text-teal-200">/ {totalLessons} bài</span>
            </div>
            <div className="mt-3 w-full bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-teal-200 font-semibold mt-1.5 text-right">
              {overallPercent}% hoàn thành
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Accordion */}
      <div className="space-y-4">
        {toc.chapters.map((chapter) => {
          const isExp = expanded[chapter.id] ?? true;
          const chapterPercent =
            chapter.lessons.length > 0
              ? Math.round((chapter.completedCount / chapter.lessons.length) * 100)
              : 0;

          return (
            <div
              key={chapter.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-teal-300"
            >
              {/* Chapter Header */}
              <div
                onClick={() => toggleChapter(chapter.id)}
                className="cursor-pointer p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r hover:bg-slate-50/70 transition"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-base shrink-0 shadow-sm shadow-teal-600/30">
                    {chapter.roman}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Chương {chapter.roman}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">
                        {chapter.lessons.length} bài học
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {chapter.title}
                    </h3>
                    {chapter.description && (
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {chapter.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Chapter Meta & Controls */}
                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-700">
                      {chapter.completedCount} / {chapter.lessons.length} bài
                    </div>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full transition-all"
                        style={{ width: `${chapterPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={isExp ? 'Thu gọn chương' : 'Mở rộng chương'}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-teal-100 text-slate-600 hover:text-teal-800 flex items-center justify-center transition"
                  >
                    {isExp ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Chapter Lessons List */}
              {isExp && (
                <div className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/30">
                  {chapter.lessons.map((lesson) => {
                    const hasTested = lesson.bestScore !== null && lesson.bestScore !== undefined;
                    const isCompleted = (hasTested && lesson.bestScore! >= 50) || (lesson.exerciseCount === 0 && lesson.theoryRead);

                    return (
                      <div
                        key={lesson.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-teal-50/30 transition group"
                      >
                        <div className="flex items-start gap-3.5 flex-1">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : lesson.theoryRead
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                            ) : (
                              lesson.number
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold text-slate-500">
                                Bài {lesson.number}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-500 font-medium">
                                {lesson.exerciseCount} câu hỏi tự luyện
                              </span>

                              {lesson.theoryRead && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                  <Eye className="w-3 h-3 text-blue-600" /> Đã đọc lý thuyết
                                </span>
                              )}

                              {hasTested && (
                                <span
                                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    lesson.bestScore! >= 80
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : lesson.bestScore! >= 50
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  <Award className="w-3 h-3" /> Điểm cao nhất: {lesson.bestScore}%
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/student/textbook/lesson/${lesson.id}`}
                              className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition block"
                            >
                              {lesson.title}
                            </Link>
                          </div>
                        </div>

                        {/* Direct Action Link */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto">
                          <Link
                            href={`/student/textbook/lesson/${lesson.id}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-600/20 transition"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Vào học bài
                            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}

                  {/* Chapter Review & Test Room link */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                        <Trophy className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                          Ôn tập cuối chương {chapter.roman}
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          Tổng kết kiến thức trọng tâm & Đề luyện tập Chương {chapter.roman}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/student/textbook/chapter/${chapter.id}`}
                      className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shrink-0 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Ôn tập toàn chương
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
