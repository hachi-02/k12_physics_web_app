import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getTextbookLesson } from '@/lib/textbook';
import { getStudentProfile } from '@/lib/student';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';
import TierThemeWrapper from '@/components/student/TierThemeWrapper';
import TextbookLessonClient from '@/components/student/TextbookLessonClient';

interface LessonPageProps {
  params: {
    lessonId: string;
  };
  searchParams?: {
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function TextbookLessonPage({ params, searchParams }: LessonPageProps) {
  const db = getDb();
  const lessonId = parseInt(params.lessonId, 10);

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
  const lesson = getTextbookLesson(lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Không tìm thấy bài học</h2>
          <p className="text-xs text-slate-500">
            Bài học không tồn tại hoặc đã được cập nhật lại mã bài. Vui lòng quay lại danh sách bài học SGK.
          </p>
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StudentNavbar
        currentGrade={lesson.grade}
        stars={profile.stars}
        streak={profile.currentStreak}
        studentName={profile.name}
      />

      <TierThemeWrapper grade={lesson.grade} className="flex-1">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TextbookLessonClient lesson={lesson} studentId={studentId} />
        </main>
      </TierThemeWrapper>
    </div>
  );
}
