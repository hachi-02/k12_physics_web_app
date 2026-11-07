'use client';

import React, { useState, useMemo } from 'react';
import { 
  BookHeart, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import type { LessonWithParentGuide } from '@/lib/parent';
import ParentGuideCard from './ParentGuideCard';

interface ParentGuideClientViewProps {
  initialLessons: LessonWithParentGuide[];
  initialGrade?: number;
  initialTopicId?: number;
}

export function ParentGuideClientView({
  initialLessons,
  initialGrade,
  initialTopicId,
}: ParentGuideClientViewProps) {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(
    initialGrade || 'all'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>(
    initialTopicId || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique topics for dropdown filter
  const topicsList = useMemo(() => {
    const map = new Map<number, { id: number; title: string; grade: number }>();
    for (const l of initialLessons) {
      if (!map.has(l.topicId)) {
        map.set(l.topicId, { id: l.topicId, title: l.topicTitle, grade: l.grade });
      }
    }
    return Array.from(map.values());
  }, [initialLessons]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return initialLessons.filter((lesson) => {
      // Grade filter
      if (selectedGrade !== 'all' && lesson.grade !== selectedGrade) {
        return false;
      }

      // Topic filter
      if (selectedTopicId !== 'all' && lesson.topicId !== selectedTopicId) {
        return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = lesson.title.toLowerCase().includes(query);
        const inTopic = lesson.topicTitle.toLowerCase().includes(query);
        const inSummary = lesson.parentGuide.summary.toLowerCase().includes(query);
        const inMisconceptions = lesson.parentGuide.misconceptions.some((m) =>
          m.toLowerCase().includes(query)
        );
        const inExperiments = lesson.parentGuide.home_experiments.some(
          (e) =>
            e.title.toLowerCase().includes(query) ||
            e.materials.some((mat) => mat.toLowerCase().includes(query))
        );

        if (!inTitle && !inTopic && !inSummary && !inMisconceptions && !inExperiments) {
          return false;
        }
      }

      return true;
    });
  }, [initialLessons, selectedGrade, selectedTopicId, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo hiện tượng, ngộ nhận, dụng cụ thí nghiệm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            Hiển thị <span className="text-teal-700 font-bold">{filteredLessons.length}</span> / {initialLessons.length} bài học có cẩm nang
          </div>
        </div>

        {/* Grade Pills Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Khối lớp:
          </span>

          <button
            onClick={() => {
              setSelectedGrade('all');
              setSelectedTopicId('all');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              selectedGrade === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setSelectedTopicId('all');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                selectedGrade === grade
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lớp {grade}
            </button>
          ))}
        </div>

        {/* Topic Dropdown Filter (if grade selected or general) */}
        {selectedGrade !== 'all' && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" /> Chủ đề Lớp {selectedGrade}:
            </span>
            <select
              value={selectedTopicId}
              onChange={(e) =>
                setSelectedTopicId(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">Tất cả chủ đề trong khối</option>
              {topicsList
                .filter((t) => t.grade === selectedGrade)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {/* Lesson Guide Cards */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
          <BookHeart className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">
            Không tìm thấy bài học nào phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc khối lớp.
          </p>
          <button
            onClick={() => {
              setSelectedGrade('all');
              setSelectedTopicId('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-teal-600 hover:underline pt-2"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredLessons.map((lesson) => (
            <ParentGuideCard key={lesson.id} lesson={lesson} defaultExpanded={filteredLessons.length <= 3} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ParentGuideClientView;
