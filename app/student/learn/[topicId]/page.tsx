import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ArrowLeft, 
  PlayCircle, 
  Timer, 
  Clock, 
  Sparkles, 
  Compass,
  Layers
} from 'lucide-react';
import { getLessonTheory, getStudentProfile } from '@/lib/student';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';
import TierThemeWrapper from '@/components/student/TierThemeWrapper';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface LearnPageProps {
  params: {
    topicId: string;
  };
  searchParams?: {
    lessonId?: string;
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

/**
 * Render Markdown content with inline and display KaTeX support
 */
function renderMarkdownWithKaTeX(content: string) {
  const lines = content.split('\n');

  return (
    <div className="space-y-4 text-slate-800 leading-relaxed text-sm sm:text-base">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-2xl sm:text-3xl font-black text-slate-900 pt-4 pb-2 border-b border-slate-200">
              {trimmed.slice(2)}
            </h1>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 pt-3 pb-1 text-teal-900">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-lg font-bold text-slate-900 pt-2 text-indigo-900">
              {trimmed.slice(4)}
            </h3>
          );
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <li key={idx} className="ml-5 list-disc pl-1 text-slate-700">
              {renderMathInline(trimmed.slice(2))}
            </li>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <li key={idx} className="ml-5 list-decimal pl-1 text-slate-700 font-medium">
              {renderMathInline(trimmed.replace(/^\d+\.\s/, ''))}
            </li>
          );
        }
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
          const formula = trimmed.slice(2, -2).trim();
          return (
            <div key={idx} className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center overflow-x-auto">
              <KaTeXRenderer math={formula} block className="text-lg text-indigo-950" />
            </div>
          );
        }
        if (trimmed.length === 0) {
          return <div key={idx} className="h-2" />;
        }

        return (
          <p key={idx} className="leading-relaxed">
            {renderMathInline(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderMathInline(text: string) {
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

export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const db = getDb();
  const topicId = parseInt(params.topicId, 10);
  const lessonId = searchParams?.lessonId ? parseInt(searchParams.lessonId, 10) : undefined;

  // Resolve student
  let studentId = 3;
  if (searchParams?.studentId) {
    studentId = parseInt(searchParams.studentId, 10);
  } else {
    const studentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'student' ORDER BY id ASC LIMIT 1"
    );
    if (studentUser) studentId = studentUser.id;
  }

  const profile = getStudentProfile(studentId);
  const lesson = getLessonTheory(topicId, lessonId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StudentNavbar
        currentGrade={lesson.grade}
        stars={profile.stars}
        streak={profile.currentStreak}
        studentName={profile.name}
      />

      <TierThemeWrapper grade={lesson.grade} className="flex-1">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <Link
              href={`/student?grade=${lesson.grade}`}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh mục chuyên đề
            </Link>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Thời gian học: ~{lesson.estimatedDurationMinutes} phút
            </span>
          </div>

          {/* Lesson Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-bold">
                  Lớp {lesson.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Chuyên đề: {lesson.topicTitle}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {lesson.title}
              </h1>
            </div>

            {lesson.summary && (
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 text-sm leading-relaxed text-teal-950 font-medium">
                <span className="font-bold">Tóm tắt trọng tâm: </span>
                {renderMathInline(lesson.summary)}
              </div>
            )}
          </div>

          {/* Theory Markdown & KaTeX Viewer */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {renderMarkdownWithKaTeX(lesson.contentMarkdown)}
          </div>

          {/* CTA Footer: Proceed to Practice or Exam */}
          <div className="bg-gradient-to-r from-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">Bạn đã nắm vững lý thuyết bài học này?</h3>
              <p className="text-xs sm:text-sm text-teal-100">
                Thử sức ngay với các câu hỏi trắc nghiệm và câu hỏi điền số có gợi ý nhiều tầng!
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link
                href={`/student/practice/${topicId}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-teal-900 hover:bg-teal-50 transition shadow-sm"
              >
                <PlayCircle className="w-4 h-4 text-teal-600" /> Bắt đầu luyện tập
              </Link>
              <Link
                href={`/student/exam/${topicId}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white border border-teal-400/30 transition shadow-sm"
              >
                <Timer className="w-4 h-4" /> Thi thử
              </Link>
            </div>
          </div>
        </main>
      </TierThemeWrapper>
    </div>
  );
}
