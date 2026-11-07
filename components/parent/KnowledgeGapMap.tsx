'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  PlusCircle, 
  Filter,
  BarChart2
} from 'lucide-react';
import type { TopicMasteryItem } from '@/lib/parent';

interface KnowledgeGapMapProps {
  knowledgeGaps: TopicMasteryItem[];
  studentName?: string;
}

export function KnowledgeGapMap({ knowledgeGaps, studentName }: KnowledgeGapMapProps) {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredTopics = useMemo(() => {
    return knowledgeGaps.filter((item) => {
      // Tier filter
      if (selectedTier === 'primary' && (item.grade < 1 || item.grade > 5)) return false;
      if (selectedTier === 'middle' && (item.grade < 6 || item.grade > 9)) return false;
      if (selectedTier === 'high' && (item.grade < 10 || item.grade > 12)) return false;

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      return true;
    });
  }, [knowledgeGaps, selectedTier, selectedStatus]);

  const stats = useMemo(() => {
    let critical = 0;
    let developing = 0;
    let mastered = 0;
    let unattempted = 0;

    for (const t of knowledgeGaps) {
      if (t.status === 'critical') critical++;
      else if (t.status === 'developing') developing++;
      else if (t.status === 'mastered') mastered++;
      else unattempted++;
    }

    return { critical, developing, mastered, unattempted, total: knowledgeGaps.length };
  }, [knowledgeGaps]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header and Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-600" />
            Bản đồ Lỗ hổng Kiến thức & Ma trận Nắm vững
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi mức độ thành thạo các chuyên đề Vật lý của {studentName || 'con'} theo thang điểm kiểm tra
          </p>
        </div>

        {/* Legend / Status Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedStatus(selectedStatus === 'critical' ? 'all' : 'critical')}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              selectedStatus === 'critical'
                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Lỗ hổng (&lt;60%): {stats.critical}
          </button>

          <button
            onClick={() => setSelectedStatus(selectedStatus === 'developing' ? 'all' : 'developing')}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              selectedStatus === 'developing'
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Đang củng cố (60-79%): {stats.developing}
          </button>

          <button
            onClick={() => setSelectedStatus(selectedStatus === 'mastered' ? 'all' : 'mastered')}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              selectedStatus === 'mastered'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Nắm vững (≥80%): {stats.mastered}
          </button>

          <button
            onClick={() => setSelectedStatus(selectedStatus === 'unattempted' ? 'all' : 'unattempted')}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              selectedStatus === 'unattempted'
                ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Chưa làm: {stats.unattempted}
          </button>
        </div>
      </div>

      {/* Filter Tabs by Grade Tier */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Phân tầng học tập:
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTier === 'all'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả 12 khối lớp
          </button>
          <button
            onClick={() => setSelectedTier('primary')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTier === 'primary'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tiểu học (Lớp 1-5)
          </button>
          <button
            onClick={() => setSelectedTier('middle')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTier === 'middle'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            THCS (Lớp 6-9)
          </button>
          <button
            onClick={() => setSelectedTier('high')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTier === 'high'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            THPT (Lớp 10-12)
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      {filteredTopics.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500">
            Không có chuyên đề nào phù hợp với bộ lọc hiện tại.
          </p>
          <button
            onClick={() => {
              setSelectedTier('all');
              setSelectedStatus('all');
            }}
            className="mt-2 text-xs font-semibold text-teal-600 hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => {
            const isCritical = topic.status === 'critical';
            const isDeveloping = topic.status === 'developing';
            const isMastered = topic.status === 'mastered';

            let cardBg = 'bg-white';
            let borderColor = 'border-slate-200';
            let badgeBg = 'bg-slate-100 text-slate-600';
            let progressBarColor = 'bg-slate-300';

            if (isCritical) {
              cardBg = 'bg-red-50/40';
              borderColor = 'border-red-200 hover:border-red-300';
              badgeBg = 'bg-red-100 text-red-700';
              progressBarColor = 'bg-red-500';
            } else if (isDeveloping) {
              cardBg = 'bg-amber-50/40';
              borderColor = 'border-amber-200 hover:border-amber-300';
              badgeBg = 'bg-amber-100 text-amber-800';
              progressBarColor = 'bg-amber-500';
            } else if (isMastered) {
              cardBg = 'bg-emerald-50/40';
              borderColor = 'border-emerald-200 hover:border-emerald-300';
              badgeBg = 'bg-emerald-100 text-emerald-800';
              progressBarColor = 'bg-emerald-500';
            }

            return (
              <div
                key={topic.topicId}
                className={`rounded-xl border p-4.5 transition-all shadow-2xs hover:shadow-sm ${cardBg} ${borderColor} flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                      Lớp {topic.grade}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeBg}`}>
                      {topic.statusLabel}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {topic.title}
                  </h3>

                  {/* Score Progress Bar */}
                  {topic.quizCount > 0 ? (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Điểm trung bình:</span>
                        <span className="font-bold text-slate-900">{topic.avgScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${progressBarColor} transition-all duration-500 rounded-full`}
                          style={{ width: `${Math.min(100, topic.avgScore)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>Đã làm: {topic.quizCount} bài</span>
                        {topic.lastStudiedAt && (
                          <span>
                            {new Date(topic.lastStudiedAt).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 text-xs text-slate-400 italic flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Chưa có bài kiểm tra nào
                    </div>
                  )}
                </div>

                {/* Quick Action Links */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/parents/guide?topicId=${topic.topicId}`}
                    className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-teal-700 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    Cẩm nang
                  </Link>

                  <Link
                    href={`/parents/assignments?topicId=${topic.topicId}&title=Ôn tập: ${encodeURIComponent(topic.title)}`}
                    className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Giao bài tập
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default KnowledgeGapMap;
