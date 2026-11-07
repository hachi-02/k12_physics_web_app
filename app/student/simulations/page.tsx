'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Sun, 
  Zap, 
  ArrowLeft, 
  Layers, 
  Award, 
  Sparkles,
  Trophy
} from 'lucide-react';
import StudentNavbar from '@/components/student/StudentNavbar';
import PendulumSimulation from '@/components/simulations/PendulumSimulation';
import OpticsSimulation from '@/components/simulations/OpticsSimulation';
import CircuitSimulation from '@/components/simulations/CircuitSimulation';

export default function SimulationsPage() {
  const [activeTab, setActiveTab] = useState<'pendulum' | 'optics' | 'circuit'>('pendulum');
  const [exploredTabs, setExploredTabs] = useState<Set<string>>(new Set(['pendulum']));

  const handleTabChange = (tab: 'pendulum' | 'optics' | 'circuit') => {
    setActiveTab(tab);
    setExploredTabs((prev) => new Set([...Array.from(prev), tab]));
  };

  const isAllExplored = exploredTabs.size >= 3;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Student Navbar */}
      <StudentNavbar currentGrade={7} studentName="Học sinh" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh mục chuyên đề
          </Link>

          {isAllExplored ? (
            <span className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Trophy className="w-3.5 h-3.5" /> Đã khám phá trọn vẹn cả 3 mô phỏng!
            </span>
          ) : (
            <span className="text-slate-400">
              Đã khám phá: {exploredTabs.size} / 3 mô phỏng
            </span>
          )}
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => handleTabChange('pendulum')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'pendulum'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            1. Con Lắc Đơn & Cơ Năng
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('optics')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'optics'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sun className="w-4 h-4" />
            2. Khúc Xạ Ánh Sáng (Snell)
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('circuit')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'circuit'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            3. Mạch Điện Một Chiều & Ôm
          </button>
        </div>

        {/* Active Simulation Display */}
        {activeTab === 'pendulum' && <PendulumSimulation />}
        {activeTab === 'optics' && <OpticsSimulation />}
        {activeTab === 'circuit' && <CircuitSimulation />}
      </main>
    </div>
  );
}
