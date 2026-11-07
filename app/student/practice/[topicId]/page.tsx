import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { getQuestionsForTopic, getStudentProfile } from '@/lib/student';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';
import TierThemeWrapper from '@/components/student/TierThemeWrapper';
import PracticeRunner from '@/components/student/PracticeRunner';

interface PracticePageProps {
  params: {
    topicId: string;
  };
  searchParams?: {
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function PracticePage({ params, searchParams }: PracticePageProps) {
  const db = getDb();
  const topicId = parseInt(params.topicId, 10);

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

  const topic = db.get<{
    id: number;
    title: string;
    grade: number;
  }>('SELECT id, title, grade FROM physics_topics WHERE id = ?', [topicId]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <h2 className="text-lg font-bold text-slate-800">Không tìm thấy chuyên đề</h2>
          <Link href="/student" className="text-sm font-semibold text-teal-600 hover:underline">
            Về danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  const questions = getQuestionsForTopic(topicId, 'practice');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StudentNavbar
        currentGrade={topic.grade}
        stars={profile.stars}
        streak={profile.currentStreak}
        studentName={profile.name}
      />

      <TierThemeWrapper grade={topic.grade} className="flex-1">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <Link
              href={`/student?grade=${topic.grade}`}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh mục chuyên đề
            </Link>

            <Link
              href={`/student/learn/${topicId}`}
              className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-800 transition"
            >
              <BookOpen className="w-4 h-4" /> Đọc lại lý thuyết
            </Link>
          </div>

          <PracticeRunner
            topicId={topic.id}
            topicTitle={topic.title}
            grade={topic.grade}
            questions={questions}
            studentId={studentId}
          />
        </main>
      </TierThemeWrapper>
    </div>
  );
}
