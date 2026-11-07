'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Flame, 
  Sparkles, 
  Trophy, 
  ArrowLeft, 
  GraduationCap,
  Layers,
  FileQuestion,
  Timer,
  Zap
} from 'lucide-react';
import { getTierForGrade } from '@/lib/grading';

interface StudentNavbarProps {
  currentGrade: number;
  stars?: number;
  streak?: number;
  studentName?: string;
}

export function StudentNavbar({
  currentGrade,
  stars = 0,
  streak = 0,
  studentName = 'Học sinh',
}: StudentNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const tier = getTierForGrade(currentGrade);

  let themeHeaderBg = 'bg-white';
  let badgeColor = 'bg-teal-600 text-white';
  if (tier === 'primary') {
    badgeColor = 'bg-amber-500 text-white';
  } else if (tier === 'high') {
    badgeColor = 'bg-indigo-600 text-white';
  }

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextGrade = e.target.value;
    router.push(`/student?grade=${nextGrade}`);
  };

  return (
    <header className={`${themeHeaderBg} border-b border-slate-200 sticky top-0 z-30 shadow-xs`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Home link & Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition py-1.5 px-2.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Trang chủ</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <Link href={`/student?grade=${currentGrade}`} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl ${badgeColor} flex items-center justify-center font-bold text-sm shadow-xs`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight block">
                  Không Gian Học Sinh
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:block">
                  Vật lý & Khoa học tự nhiên (Lớp 6 - 12)
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Grade Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <GraduationCap className="w-4 h-4 text-slate-500 ml-1.5 hidden sm:inline" />
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">Khối lớp:</span>
            <select
              value={currentGrade}
              onChange={handleGradeChange}
              className="text-xs font-bold bg-white text-slate-900 rounded-lg px-2.5 py-1 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g} {g <= 9 ? '(THCS)' : '(THPT)'}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Simulation link & Gamification HUD */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/student/simulations"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 transition"
              title="Phòng thí nghiệm mô phỏng"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden md:inline">Mô phỏng</span>
            </Link>

            {/* Stars Counter */}
            <Link
              href="/student/gamification"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full text-xs font-black text-amber-700 shadow-2xs transition"
              title="Xem kệ huy hiệu & phần thưởng"
            >
              <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{stars}</span>
              <span className="hidden sm:inline">sao</span>
            </Link>

            {/* Streak Counter */}
            <Link
              href="/student/gamification"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full text-xs font-black text-rose-700 shadow-2xs transition"
              title="Xem chuỗi ngày học"
            >
              <Flame className="w-4 h-4 fill-rose-500 text-rose-600 animate-pulse" />
              <span>{streak}</span>
              <span className="hidden sm:inline">ngày</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default StudentNavbar;
