import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  CheckCircle, 
  Target, 
  Flame, 
  Sparkles, 
  BookHeart, 
  PlusCircle, 
  History, 
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { getParentDashboardData } from '@/lib/parent';
import { getDb } from '@/lib/db';
import ParentNavbar from '@/components/parent/ParentNavbar';
import KnowledgeGapMap from '@/components/parent/KnowledgeGapMap';

interface ParentsPageProps {
  searchParams?: {
    parentId?: string;
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function ParentsPage({ searchParams }: ParentsPageProps) {
  const db = getDb();

  // Resolve default parent
  let parentId: number = 2; // phuhuynh1 default id
  if (searchParams?.parentId) {
    parentId = parseInt(searchParams.parentId, 10);
  } else {
    const parentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
    );
    if (parentUser) parentId = parentUser.id;
  }

  const studentId = searchParams?.studentId ? parseInt(searchParams.studentId, 10) : undefined;
  const dashboardData = getParentDashboardData(parentId, studentId);

  const { parent, children, selectedChild, stats, knowledgeGaps, recentSubmissions, activeAssignmentsCount } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Bar */}
      <ParentNavbar
        studentName={selectedChild?.name}
        studentGrade={selectedChild?.grade}
        totalStars={stats.totalStars}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Child Selector Banner (if multiple children) */}
        {children.length > 1 && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <span className="text-sm font-semibold text-slate-700">Đang theo dõi học sinh:</span>
            <div className="flex gap-2">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/parents?studentId=${child.id}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedChild?.id === child.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {child.name} (Lớp {child.grade})
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hero Welcome & Quick Actions */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600/60 text-teal-100 text-xs font-bold border border-teal-500/30">
              <UserCheck className="w-3.5 h-3.5" /> Bảng điều khiển dành cho Phụ huynh
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Xin chào, {parent.name}!
            </h1>
            <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
              Theo dõi toàn diện quá trình tự học môn Vật lý của{' '}
              <strong className="text-white font-bold">{selectedChild ? selectedChild.name : 'con'}</strong>, 
              kịp thời phát hiện các lỗ hổng nhận thức và đồng hành giao bài tập kèm phần thưởng khích lệ.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/parents/guide"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-teal-900 hover:bg-teal-50 transition shadow-sm"
              >
                <BookHeart className="w-4 h-4 text-teal-600" />
                Cẩm nang "Sư phạm tại gia"
              </Link>
              <Link
                href="/parents/assignments"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 text-white hover:bg-teal-500 border border-teal-400/40 transition shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Giao bài tập & Đặt phần thưởng
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Stats Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Study Time */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Tổng thời gian học</span>
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {stats.totalStudyTimeMinutes}{' '}
              <span className="text-sm font-semibold text-slate-500">phút</span>
            </div>
            <p className="text-[11px] text-slate-500">Tích lũy từ các bài học & thí nghiệm</p>
          </div>

          {/* Card 2: Accuracy Rate */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Tỷ lệ chính xác</span>
              <Target className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {stats.accuracyRate}%
            </div>
            <p className="text-[11px] text-slate-500">Trung bình qua {stats.totalQuizzes} bài kiểm tra</p>
          </div>

          {/* Card 3: Stars & Gamification */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Sao thưởng tích lũy</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-600 flex items-center gap-1">
              {stats.totalStars} <span className="text-sm">⭐</span>
            </div>
            <p className="text-[11px] text-slate-500">Sẵn sàng đổi các phần thưởng gia đình</p>
          </div>

          {/* Card 4: Streak */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Chuỗi ngày học liên tục</span>
              <Flame className="w-4 h-4 text-rose-500 fill-rose-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 flex items-center gap-1">
              {stats.currentStreak} <span className="text-sm font-semibold text-slate-500">ngày</span>
            </div>
            <p className="text-[11px] text-slate-500">Kỷ lục dài nhất: {stats.longestStreak} ngày</p>
          </div>
        </div>

        {/* Knowledge Gap Heatmap & Topic Mastery Matrix */}
        <KnowledgeGapMap
          knowledgeGaps={knowledgeGaps}
          studentName={selectedChild?.name}
        />

        {/* Recent Quiz Submissions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-teal-600" />
                Lịch sử Bài làm & Thi thử Gần đây của {selectedChild?.name || 'con'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chi tiết từng bài nộp, điểm số, thời gian làm bài và sao thưởng
              </p>
            </div>

            <Link
              href="/parents/assignments"
              className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              Xem bài tập phụ huynh giao <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 bg-slate-50 rounded-xl">
              Học sinh chưa có bài làm kiểm tra nào trong hệ thống.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 bg-slate-50/50">
                    <th className="py-3 px-4 font-semibold">Chủ đề bài kiểm tra</th>
                    <th className="py-3 px-4 font-semibold">Hình thức</th>
                    <th className="py-3 px-4 font-semibold text-center">Điểm số</th>
                    <th className="py-3 px-4 font-semibold text-center">Số câu đúng</th>
                    <th className="py-3 px-4 font-semibold text-center">Thời gian làm</th>
                    <th className="py-3 px-4 font-semibold text-center">Sao nhận</th>
                    <th className="py-3 px-4 font-semibold text-right">Thời gian nộp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentSubmissions.map((sub) => {
                    const isHigh = sub.score >= 80;
                    const isMedium = sub.score >= 60 && sub.score < 80;
                    const scoreBadge = isHigh
                      ? 'bg-emerald-100 text-emerald-800'
                      : isMedium
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800';

                    const typeLabel =
                      sub.quizType === 'exam'
                        ? 'Phòng thi thử'
                        : sub.quizType === 'assignment'
                        ? 'Bài tập giao'
                        : 'Luyện tập tự do';

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {sub.topicTitle || 'Bài kiểm tra tổng hợp'}
                        </td>
                        <td className="py-3 px-4 text-xs">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                            {typeLabel}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-black ${scoreBadge}`}>
                            {sub.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-xs font-semibold text-slate-700">
                          {sub.correctCount} / {sub.totalQuestions}
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-slate-600">
                          {Math.floor(sub.timeSpentSeconds / 60)}p {sub.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-4 text-center text-xs font-bold text-amber-600">
                          +{sub.starsEarned} ⭐
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-slate-500">
                          {new Date(sub.submittedAt).toLocaleString('vi-VN', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
