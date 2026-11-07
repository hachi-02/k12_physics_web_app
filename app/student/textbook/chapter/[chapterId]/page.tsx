import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getTextbookChapterReview } from '@/lib/textbook';
import { getStudentProfile } from '@/lib/student';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';
import TierThemeWrapper from '@/components/student/TierThemeWrapper';
import TextbookChapterReviewClient from '@/components/student/TextbookChapterReviewClient';

interface ChapterReviewPageProps {
  params: {
    chapterId: string;
  };
  searchParams?: {
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function TextbookChapterReviewPage({
  params,
  searchParams,
}: ChapterReviewPageProps) {
  const db = getDb();
  const chapterId = parseInt(params.chapterId, 10);

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
  const review = getTextbookChapterReview(chapterId);

  if (!review) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Không tìm thấy nội dung ôn tập</h2>
          <p className="text-xs text-slate-500">
            Chương bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật.
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
        currentGrade={review.grade}
        stars={profile.stars}
        streak={profile.currentStreak}
        studentName={profile.name}
      />

      <TierThemeWrapper grade={review.grade} className="flex-1">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TextbookChapterReviewClient review={review} studentId={studentId} />
        </main>
      </TierThemeWrapper>
    </div>
  );
}
