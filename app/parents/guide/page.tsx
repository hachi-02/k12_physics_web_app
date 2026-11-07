import React from 'react';
import Link from 'next/link';
import { BookHeart, Compass, ArrowLeft } from 'lucide-react';
import { getLessonsWithParentGuide, getParentDashboardData } from '@/lib/parent';
import { getDb } from '@/lib/db';
import ParentNavbar from '@/components/parent/ParentNavbar';
import ParentGuideClientView from '@/components/parent/ParentGuideClientView';

interface ParentGuidePageProps {
  searchParams?: {
    grade?: string;
    topicId?: string;
    lessonId?: string;
    parentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function ParentGuidePage({ searchParams }: ParentGuidePageProps) {
  const db = getDb();

  // Default parent id
  let parentId: number = 2;
  if (searchParams?.parentId) {
    parentId = parseInt(searchParams.parentId, 10);
  } else {
    const parentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
    );
    if (parentUser) parentId = parentUser.id;
  }

  const initialGrade = searchParams?.grade ? parseInt(searchParams.grade, 10) : undefined;
  const initialTopicId = searchParams?.topicId ? parseInt(searchParams.topicId, 10) : undefined;
  const initialLessonId = searchParams?.lessonId ? parseInt(searchParams.lessonId, 10) : undefined;

  // Query lessons
  const lessons = getLessonsWithParentGuide({
    grade: initialGrade,
    topicId: initialTopicId,
    lessonId: initialLessonId,
  });

  // Query dashboard metadata for navbar
  const dashboardData = getParentDashboardData(parentId);
  const { selectedChild, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ParentNavbar
        studentName={selectedChild?.name}
        studentGrade={selectedChild?.grade}
        totalStars={stats.totalStars}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" /> Sư phạm tại gia
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookHeart className="w-7 h-7 text-teal-600" />
            Cẩm Nang Sư Phạm Dành Cho Phụ Huynh
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Tài liệu cheat-sheet sư phạm cô đọng giúp cha mẹ nắm bắt bản chất hiện tượng vật lý,
            các cạm bẫy ngộ nhận thường gặp của học sinh, những câu hỏi gợi mở khơi dậy tính tò mò và
            các thí nghiệm an toàn thực hành ngay tại phòng khách gia đình.
          </p>
        </div>

        {/* Client Interactive Filter & List */}
        <ParentGuideClientView
          initialLessons={lessons}
          initialGrade={initialGrade}
          initialTopicId={initialTopicId}
        />
      </main>
    </div>
  );
}
