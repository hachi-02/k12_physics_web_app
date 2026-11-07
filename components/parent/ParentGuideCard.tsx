'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookHeart, 
  AlertTriangle, 
  HelpCircle, 
  FlaskConical, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ShieldAlert, 
  PlusCircle,
  Clock,
  Layers
} from 'lucide-react';
import type { LessonWithParentGuide } from '@/lib/parent';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface ParentGuideCardProps {
  lesson: LessonWithParentGuide;
  defaultExpanded?: boolean;
}

/**
 * Helper to render text containing possible $...$ LaTeX inline formulas
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

export function ParentGuideCard({ lesson, defaultExpanded = true }: ParentGuideCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { parentGuide } = lesson;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Header */}
      <div
        className="p-5 bg-gradient-to-r from-teal-50/60 to-cyan-50/40 border-b border-slate-100 cursor-pointer flex items-start justify-between gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-teal-600 text-white shadow-2xs">
              Lớp {lesson.grade}
            </span>
            <span className="px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-500" />
              Chuyên đề: {lesson.topicTitle}
            </span>
            <span className="px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              ~{lesson.estimatedDurationMinutes} phút
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-teal-600 shrink-0" />
            {lesson.title}
          </h3>
        </div>

        <button
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-white/80 transition"
          aria-label="Toggle card details"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expandable Pedagogical Body */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Section 1: Hiện tượng & Nguyên lý cốt lõi */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-600" />
              Hiện tượng & Nguyên lý cốt lõi (Trọng tâm)
            </h4>
            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 text-slate-800 text-sm leading-relaxed">
              {renderMathText(parentGuide.summary)}
            </div>
          </div>

          {/* Section 2: Cảnh báo quan niệm sai lầm & Lỗi trực giác */}
          {parentGuide.misconceptions && parentGuide.misconceptions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Cảnh báo quan niệm sai lầm phổ biến & Lỗi trực giác của học sinh
              </h4>
              <div className="space-y-2">
                {parentGuide.misconceptions.map((misconception, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 flex items-start gap-3 text-sm text-rose-950"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div className="leading-relaxed">{renderMathText(misconception)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Câu hỏi gợi mở dẫn dắt */}
          {parentGuide.guiding_questions && parentGuide.guiding_questions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Câu hỏi gợi mở dẫn dắt (Phụ huynh hỏi - Con suy ngẫm)
              </h4>
              <div className="space-y-2">
                {parentGuide.guiding_questions.map((question, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-start gap-3 text-sm text-slate-800"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="leading-relaxed font-medium">{renderMathText(question)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Thí nghiệm đơn giản an toàn tại nhà */}
          {parentGuide.home_experiments && parentGuide.home_experiments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-indigo-600" />
                Thí nghiệm đơn giản & An toàn tại nhà (Đồng hành cùng con)
              </h4>

              <div className="space-y-3">
                {parentGuide.home_experiments.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 space-y-3 text-sm"
                  >
                    <div className="font-bold text-indigo-950 flex items-center gap-2 text-base">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        #{idx + 1}
                      </span>
                      {exp.title}
                    </div>

                    {/* Materials */}
                    {exp.materials && exp.materials.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Dụng cụ cần chuẩn bị:
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {exp.materials.map((mat, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2.5 py-1 bg-white rounded-md text-xs font-medium text-slate-700 border border-slate-200"
                            >
                              ✓ {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    {exp.steps && exp.steps.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Các bước thực hiện:
                        </span>
                        <ol className="list-decimal list-inside space-y-1 text-slate-700 pl-1">
                          {exp.steps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              {renderMathText(step)}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Expected Outcome */}
                    {exp.expected_outcome && (
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-950 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Hiện tượng quan sát được: </span>
                          {renderMathText(exp.expected_outcome)}
                        </div>
                      </div>
                    )}

                    {/* Safety notes if present */}
                    {exp.safety_notes && (
                      <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2 text-xs">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <strong className="font-semibold">Lưu ý an toàn: </strong>
                          {exp.safety_notes}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Chương trình GDPT 2018 • Khoa học & Vật lý K-12
            </span>

            <Link
              href={`/parents/assignments?topicId=${lesson.topicId}&lessonId=${lesson.id}&title=Bài học: ${encodeURIComponent(lesson.title)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              Giao bài học này cho con
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentGuideCard;
