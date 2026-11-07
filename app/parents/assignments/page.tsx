import React from 'react';
import { Award, PlusCircle, BookCheck } from 'lucide-react';
import { getParentAssignments, getParentChildren, getParentDashboardData } from '@/lib/parent';
import { getDb } from '@/lib/db';
import ParentNavbar from '@/components/parent/ParentNavbar';
import ParentAssignmentsClientView from '@/components/parent/ParentAssignmentsClientView';

interface ParentAssignmentsPageProps {
  searchParams?: {
    parentId?: string;
    studentId?: string;
    topicId?: string;
    lessonId?: string;
    title?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function ParentAssignmentsPage({ searchParams }: ParentAssignmentsPageProps) {
  const db = getDb();

  let parentId: number = 2;
  if (searchParams?.parentId) {
    parentId = parseInt(searchParams.parentId, 10);
  } else {
    const parentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
    );
    if (parentUser) parentId = parentUser.id;
  }

  const studentId = searchParams?.studentId ? parseInt(searchParams.studentId, 10) : undefined;
  const defaultTopicId = searchParams?.topicId ? parseInt(searchParams.topicId, 10) : undefined;
  const defaultLessonId = searchParams?.lessonId ? parseInt(searchParams.lessonId, 10) : undefined;
  const defaultTitle = searchParams?.title ? decodeURIComponent(searchParams.title) : undefined;

  // Query assignments
  const assignments = getParentAssignments({ parentId, studentId });
  const children = getParentChildren(parentId);

  // Query topics for assignment dropdown
  const topics = db.query<{ id: number; title: string; grade: number }>(
    `SELECT id, title, grade FROM physics_topics ORDER BY grade ASC, order_num ASC`
  );

  // Query lessons for assignment dropdown
  const lessons = db.query<{ id: number; topicId: number; title: string }>(
    `SELECT id, topic_id as topicId, title FROM lessons ORDER BY order_num ASC`
  );

  // Dashboard stats for navbar
  const dashboardData = getParentDashboardData(parentId, studentId);
  const { selectedChild, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ParentNavbar
        studentName={selectedChild?.name}
        studentGrade={selectedChild?.grade}
        totalStars={stats.totalStars}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-600" /> Đồng hành & Động viên
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookCheck className="w-7 h-7 text-teal-600" />
            Giao Bài Tập & Quản Lý Phần Thưởng Gia Đình
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Thiết lập các nhiệm vụ học tập theo từng chuyên đề, kết hợp các mục tiêu phần thưởng đời thực
            (như đi chơi công viên, xem phim, ăn kem hay mua quà) để tạo động lực hứng khởi cho con học Vật lý.
          </p>
        </div>

        {/* Client Interactive Workspace */}
        <ParentAssignmentsClientView
          initialAssignments={assignments}
          children={children}
          topics={topics}
          lessons={lessons}
          parentId={parentId}
          defaultTopicId={defaultTopicId}
          defaultLessonId={defaultLessonId}
          defaultTitle={defaultTitle}
        />
      </main>
    </div>
  );
}
