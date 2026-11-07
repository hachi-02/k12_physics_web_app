'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FolderTree, 
  Plus, 
  Trash2, 
  Edit3, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CMSTopic {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  grade: number;
  tier: string;
  orderNum: number;
  icon: string | null;
  lessonCount: number;
  questionCount: number;
}

export default function CMSDashboardPage() {
  const [topics, setTopics] = useState<CMSTopic[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal / Form state for Create / Edit Topic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<CMSTopic | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    grade: 10,
    description: '',
    icon: 'BookOpen',
  });

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = selectedGrade === 'all' ? '/api/cms/topics' : `/api/cms/topics?grade=${selectedGrade}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Lỗi khi tải danh sách chuyên đề');
      setTopics(data.topics || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [selectedGrade]);

  const handleOpenCreate = () => {
    setEditingTopic(null);
    setFormData({
      title: '',
      grade: typeof selectedGrade === 'number' ? selectedGrade : 10,
      description: '',
      icon: 'BookOpen',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (topic: CMSTopic) => {
    setEditingTopic(topic);
    setFormData({
      title: topic.title,
      grade: topic.grade,
      description: topic.description || '',
      icon: topic.icon || 'BookOpen',
    });
    setIsModalOpen(true);
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      if (editingTopic) {
        // Update
        const res = await fetch('/api/cms/topics', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingTopic.id,
            ...formData,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setSuccessMsg(`Đã cập nhật chuyên đề "${data.topic.title}" thành công!`);
      } else {
        // Create
        const res = await fetch('/api/cms/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setSuccessMsg(`Đã tạo chuyên đề mới "${data.topic.title}" thành công!`);
      }
      setIsModalOpen(false);
      loadTopics();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTopic = async (topic: CMSTopic) => {
    if (!window.confirm(`Bạn có chắc muốn xóa chuyên đề "${topic.title}"? Mọi bài học và câu hỏi liên quan sẽ bị xóa.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/cms/topics?id=${topic.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSuccessMsg(`Đã xóa chuyên đề "${topic.title}"`);
      loadTopics();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const tierColors: Record<string, string> = {
    primary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    middle: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    lower_secondary: 'bg-blue-100 text-blue-800 border-blue-200',
    upper_secondary: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Hệ Thống Quản Trị Nội Dung (CMS)
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  K-12 Physics
                </span>
              </h1>
              <p className="text-xs text-slate-500">Quản lý cây chuyên đề GDPT 2018 & Ngân hàng câu hỏi</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/cms/questions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Biên soạn câu hỏi</span>
            </Link>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm chuyên đề</span>
            </button>
            <Link
              href="/student"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <span>Xem Web</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Alerts */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Grade Filter Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 px-2 py-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Khối lớp:
          </span>
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedGrade === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả (6-12)
          </button>
          {[6, 7, 8, 9, 10, 11, 12].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedGrade === g
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent" />
            <p className="mt-3 text-xs text-slate-500 font-medium">Đang tải cấu trúc chuyên đề...</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Chưa có chuyên đề nào</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Không tìm thấy chuyên đề cho bộ lọc đã chọn. Hãy tạo chuyên đề mới bằng nút bên dưới.
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo chuyên đề mới</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between p-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Lớp {t.grade}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${
                          tierColors[t.tier] || 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {t.tier === 'primary' ? 'Tiểu học' : t.tier === 'middle' ? 'THCS' : 'THPT'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        title="Chỉnh sửa chuyên đề"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTopic(t)}
                        title="Xóa chuyên đề"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {t.description || 'Chưa có mô tả cho chuyên đề này.'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      {t.lessonCount} bài học
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      {t.questionCount} câu hỏi
                    </span>
                  </div>

                  <Link
                    href={`/cms/questions?topicId=${t.id}`}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition text-xs"
                  >
                    <span>Biên soạn</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal for Create/Edit Topic */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {editingTopic ? `Chỉnh sửa chuyên đề #${editingTopic.id}` : 'Thêm chuyên đề Vật lý mới'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề chuyên đề <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Định luật II Newton và Khái niệm Lực"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khối lớp GDPT 2018 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value, 10) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>
                      Lớp {g} (
                      {g <= 9 ? 'THCS - Tư duy logic' : 'THPT - Định lượng'}
                      )
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả chuyên đề
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả tóm tắt mục tiêu kiến thức và kỹ năng cần đạt..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition"
                >
                  {editingTopic ? 'Lưu thay đổi' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
