'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookHeart, 
  Award, 
  ArrowLeft, 
  UserCheck, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface ParentNavbarProps {
  studentName?: string;
  studentGrade?: number | null;
  totalStars?: number;
}

export function ParentNavbar({ studentName, studentGrade, totalStars }: ParentNavbarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/parents',
      label: 'Bảng tiến độ & Lỗ hổng kiến thức',
      shortLabel: 'Tiến độ & Lỗ hổng',
      icon: LayoutDashboard,
      active: pathname === '/parents',
    },
    {
      href: '/parents/guide',
      label: 'Cẩm nang "Sư phạm tại gia"',
      shortLabel: 'Cẩm nang sư phạm',
      icon: BookHeart,
      active: pathname.startsWith('/parents/guide'),
    },
    {
      href: '/parents/assignments',
      label: 'Giao bài tập & Quản lý phần thưởng',
      shortLabel: 'Bài tập & Phần thưởng',
      icon: Award,
      active: pathname.startsWith('/parents/assignments'),
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Branding, Back link, and Student Status */}
        <div className="flex items-center justify-between h-16 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition py-1 px-2.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                PH
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight block">
                  Không gian Phụ Huynh
                </span>
                <span className="text-xs text-slate-500 hidden sm:block">
                  Đồng hành & Kèm cặp môn Vật lý
                </span>
              </div>
            </div>
          </div>

          {/* Linked student quick badge */}
          <div className="flex items-center gap-3">
            {studentName ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-slate-900">{studentName}</span>
                {studentGrade && (
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full font-bold">
                    Lớp {studentGrade}
                  </span>
                )}
                {totalStars !== undefined && (
                  <span className="flex items-center gap-1 text-amber-600 font-bold ml-1">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {totalStars} ⭐
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Đã liên kết tài khoản con
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
                  item.active
                    ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.active ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default ParentNavbar;
