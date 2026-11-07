import React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Star,
  Zap,
  Footprints,
  Crown,
  Atom,
  ShieldCheck
} from 'lucide-react';
import { getStudentGamificationState } from '@/lib/gamification';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';

interface GamificationPageProps {
  searchParams?: {
    studentId?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

function getBadgeIcon(iconName: string) {
  switch (iconName) {
    case 'footprints':
      return <Footprints className="w-6 h-6" />;
    case 'flame':
      return <Flame className="w-6 h-6" />;
    case 'zap':
      return <Zap className="w-6 h-6" />;
    case 'shield-check':
      return <ShieldCheck className="w-6 h-6" />;
    case 'trophy':
      return <Trophy className="w-6 h-6" />;
    case 'sparkles':
      return <Sparkles className="w-6 h-6" />;
    case 'star':
      return <Star className="w-6 h-6" />;
    case 'crown':
      return <Crown className="w-6 h-6" />;
    case 'atom':
    default:
      return <Atom className="w-6 h-6" />;
  }
}

export default async function GamificationPage({ searchParams }: GamificationPageProps) {
  const db = getDb();

  let studentId = 3;
  if (searchParams?.studentId) {
    studentId = parseInt(searchParams.studentId, 10);
  } else {
    const studentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'student' ORDER BY id ASC LIMIT 1"
    );
    if (studentUser) studentId = studentUser.id;
  }

  const data = getStudentGamificationState(studentId);
  const { profile, state, levelInfo, catalog, recentActivities } = data;

  const unlockedCount = catalog.filter((b) => b.isUnlocked).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StudentNavbar
        currentGrade={profile.grade}
        stars={state.stars}
        streak={state.currentStreak}
        studentName={profile.name}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh mục chuyên đề
          </Link>
          <span>Hệ thống Thành tích & Phần thưởng</span>
        </div>

        {/* Hero Level & Stars Summary Card */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Award className="w-3.5 h-3.5" /> Cấp độ {levelInfo.level}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{levelInfo.title}</h1>
            <p className="text-sm text-amber-100 max-w-xl">
              Tích lũy sao thưởng khi học bài, giải bài tập và làm bài thi thử để mở khóa thêm các danh hiệu và phần thưởng gia đình!
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0">
            <div className="px-3">
              <div className="text-3xl font-black flex items-center justify-center gap-1">
                {state.stars} <Sparkles className="w-5 h-5 fill-amber-300" />
              </div>
              <div className="text-xs font-semibold text-amber-100 mt-0.5">Tổng số sao</div>
            </div>

            <div className="w-px bg-white/20" />

            <div className="px-3">
              <div className="text-3xl font-black flex items-center justify-center gap-1">
                {state.currentStreak} <Flame className="w-5 h-5 fill-rose-300" />
              </div>
              <div className="text-xs font-semibold text-amber-100 mt-0.5">Chuỗi ngày liên tiếp</div>
            </div>
          </div>
        </div>

        {/* Badges Shelf Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Kệ Huy Hiệu Thành Tích Học Tập
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Đã mở khóa {unlockedCount} / {catalog.length} huy hiệu danh giá
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.map((badge) => {
              const isUnlocked = badge.isUnlocked;

              let tierBadgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
              let iconBg = 'bg-amber-100 text-amber-600';

              if (badge.tier === 'silver') {
                tierBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
                iconBg = 'bg-slate-100 text-slate-600';
              } else if (badge.tier === 'diamond') {
                tierBadgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200';
                iconBg = 'bg-cyan-100 text-cyan-600';
              } else if (badge.tier === 'gold') {
                tierBadgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                iconBg = 'bg-yellow-100 text-yellow-600';
              }

              return (
                <div
                  key={badge.badgeId}
                  className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                    isUnlocked
                      ? 'bg-white border-slate-200 shadow-2xs hover:shadow-sm'
                      : 'bg-slate-50/60 border-dashed border-slate-200 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                          isUnlocked ? iconBg : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {getBadgeIcon(badge.icon)}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wide ${tierBadgeColor}`}
                      >
                        {badge.tier}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{badge.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{badge.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {isUnlocked ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã mở khóa
                      </span>
                    ) : (
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> {badge.requirementText}
                      </span>
                    )}

                    {badge.awardedAt && (
                      <span className="text-[11px] text-slate-400">
                        {new Date(badge.awardedAt).toLocaleDateString('vi-VN')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Star Activities */}
        {recentActivities.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Hoạt Động Tích Sao Gần Đây:</h3>
            <div className="divide-y divide-slate-100 text-sm">
              {recentActivities.map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{act.type}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-bold text-amber-600">+{act.stars} ⭐</span>
                    <span className="text-slate-400">
                      {new Date(act.date).toLocaleString('vi-VN', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
