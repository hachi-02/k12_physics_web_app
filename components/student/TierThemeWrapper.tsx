'use client';

import React from 'react';
import { getTierForGrade } from '@/lib/grading';

interface TierThemeWrapperProps {
  grade: number;
  children: React.ReactNode;
  className?: string;
}

export function TierThemeWrapper({ grade, children, className = '' }: TierThemeWrapperProps) {
  const tier = getTierForGrade(grade);

  let themeStyles = '';
  let badgeStyles = '';
  let tierLabel = '';

  if (tier === 'primary') {
    // Primary (Grades 1-5): Playful, colorful, visual cards, soft shadows
    themeStyles = 'theme-primary font-sans bg-amber-50/30';
    badgeStyles = 'bg-amber-100 text-amber-900 border-amber-200';
    tierLabel = 'Tiểu học (Lớp 1-5) • Khám phá khoa học trực quan';
  } else if (tier === 'middle') {
    // Middle (Grades 6-9): Structured, inquiry-focused, logical breakdown
    themeStyles = 'theme-middle font-sans bg-slate-50/50';
    badgeStyles = 'bg-teal-100 text-teal-900 border-teal-200';
    tierLabel = 'THCS (Lớp 6-9) • Khoa học tự nhiên & Tư duy logic';
  } else {
    // High (Grades 10-12): Academic, quantitative mechanics, precision exam layout
    themeStyles = 'theme-high font-sans bg-slate-100/40';
    badgeStyles = 'bg-indigo-100 text-indigo-900 border-indigo-200';
    tierLabel = 'THPT (Lớp 10-12) • Vật lý định lượng & Luyện thi';
  }

  return (
    <div className={`w-full transition-colors duration-300 ${themeStyles} ${className}`}>
      {/* Tier identification sub-banner */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xs py-1.5 px-4 text-xs font-semibold flex items-center justify-between">
        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${badgeStyles}`}>
          {tierLabel}
        </span>
        <span className="text-slate-500 text-[11px] hidden sm:inline">
          Chương trình GDPT 2018 chuẩn hóa
        </span>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}

export default TierThemeWrapper;
