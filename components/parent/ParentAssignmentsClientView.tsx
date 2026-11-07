'use client';

import React, { useState } from 'react';
import { 
  Award, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Gift, 
  Sparkles, 
  BookOpen, 
  Send,
  AlertCircle,
  ThumbsUp,
  User,
  Check
} from 'lucide-react';
import type { ParentAssignmentItem, ChildSummary } from '@/lib/parent';

interface TopicOption {
  id: number;
  title: string;
  grade: number;
}

interface LessonOption {
  id: number;
  topicId: number;
  title: string;
}

interface ParentAssignmentsClientViewProps {
  initialAssignments: ParentAssignmentItem[];
  children: ChildSummary[];
  topics: TopicOption[];
  lessons: LessonOption[];
  parentId: number;
  defaultTopicId?: number;
  defaultLessonId?: number;
  defaultTitle?: string;
}

export function ParentAssignmentsClientView({
  initialAssignments,
  children,
  topics,
  lessons,
  parentId,
  defaultTopicId,
  defaultLessonId,
  defaultTitle,
}: ParentAssignmentsClientViewProps) {
  const [assignments, setAssignments] = useState<ParentAssignmentItem[]>(initialAssignments);
  const [showCreateModal, setShowCreateModal] = useState(Boolean(defaultTopicId || defaultTitle));
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form states
  const [selectedStudentId, setSelectedStudentId] = useState<number>(
    children[0]?.id || 1
  );
  const [selectedTopicId, setSelectedTopicId] = useState<number | ''>(
    defaultTopicId || ''
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | ''>(
    defaultLessonId || ''
  );
  const [title, setTitle] = useState(defaultTitle || '');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rewardDescription, setRewardDescription] = useState('Đi ăn kem cuối tuần');
  const [rewardStars, setRewardStars] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter lessons based on selected topic
  const availableLessons = selectedTopicId
    ? lessons.filter((l) => l.topicId === Number(selectedTopicId))
    : lessons;

  // Handle Create Assignment
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Vui lòng nhập tiêu đề bài tập');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/parent/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId,
          studentId: selectedStudentId,
          topicId: selectedTopicId ? Number(selectedTopicId) : undefined,
          lessonId: selectedLessonId ? Number(selectedLessonId) : undefined,
          title: title.trim(),
          instructions: instructions.trim() || undefined,
          dueDate: dueDate || undefined,
          rewardDescription: rewardDescription.trim() || undefined,
          rewardStars: Number(rewardStars) || 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi khi tạo bài tập');
      }

      setAssignments([data.assignment, ...assignments]);
      setShowCreateModal(false);
      setTitle('');
      setInstructions('');
      setSuccessToast(`Đã giao bài tập "${data.assignment.title}" cho con thành công!`);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi gửi yêu cầu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Approve Reward
  const handleApproveReward = async (assignmentId: number) => {
    try {
      const res = await fetch('/api/parent/assignments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId,
          parentId,
          action: 'approve_reward',
          parentFeedback: 'Bố mẹ rất tự hào về con! Đã hoàn thành xuất sắc!',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi phê duyệt phần thưởng');
      }

      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentId ? data.assignment : a))
      );

      setSuccessToast(
        `🎉 Đã phê duyệt và trao thưởng cho con: "${data.assignment.rewardDescription}" (+${data.assignment.rewardStars} sao thưởng đã được cộng)!`
      );
      setTimeout(() => setSuccessToast(null), 6000);
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const filteredAssignments = assignments.filter((a) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'assigned') return a.status === 'assigned';
    if (filterStatus === 'completed') return a.status === 'completed';
    if (filterStatus === 'reward_approved') return a.status === 'reward_approved';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-md flex items-center justify-between text-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-white hover:text-emerald-200 text-xs font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400 mr-1 uppercase tracking-wide">Trạng thái:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterStatus === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({assignments.length})
          </button>
          <button
            onClick={() => setFilterStatus('assigned')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterStatus === 'assigned'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đang làm ({assignments.filter((a) => a.status === 'assigned').length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterStatus === 'completed'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Chờ duyệt thưởng ({assignments.filter((a) => a.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('reward_approved')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterStatus === 'reward_approved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đã nhận thưởng ({assignments.filter((a) => a.status === 'reward_approved').length})
          </button>
        </div>

        {/* Create Assignment Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Giao bài tập mới
        </button>
      </div>

      {/* Create Assignment Modal / Drawer */}
      {showCreateModal && (
        <div className="bg-white rounded-2xl border-2 border-teal-500/40 p-6 shadow-md space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-600" />
              Thiết lập Bài tập & Mục tiêu Phần thưởng Gia đình
            </h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1"
            >
              Đóng ✕
            </button>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateAssignment} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select Child */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Giao cho con:
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
                >
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Lớp {c.grade})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Chuyên đề Vật lý:
                </label>
                <select
                  value={selectedTopicId}
                  onChange={(e) => {
                    setSelectedTopicId(e.target.value ? Number(e.target.value) : '');
                    setSelectedLessonId('');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">-- Chọn chuyên đề cần ôn tập --</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      [Lớp {t.grade}] {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Tiêu đề nhiệm vụ bài tập: *
              </label>
              <input
                type="text"
                placeholder="VD: Ôn tập Định luật Ôm & Làm 5 câu trắc nghiệm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium"
                required
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Lời dặn dò / Hướng dẫn của bố mẹ:
              </label>
              <textarea
                rows={2}
                placeholder="VD: Con đọc lại phần thí nghiệm cẩm nang trước khi làm bài tập nhé!"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Reward & Stars Section */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Gift className="w-4 h-4 text-amber-600" />
                Mục tiêu Phần thưởng Gia đình khi hoàn thành
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Phần thưởng đời thực:
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Đi xem phim cuối tuần, Tặng cuốn sách khoa học, Ăn pizza"
                    value={rewardDescription}
                    onChange={(e) => setRewardDescription(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Sao thưởng cộng thêm:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={500}
                      step={5}
                      value={rewardStars}
                      onChange={(e) => setRewardStars(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 font-bold text-amber-700"
                    />
                    <span className="text-amber-600 font-bold">⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition shadow-xs"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Đang tạo...' : 'Giao bài tập'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assignment List Cards */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">
            Chưa có bài tập nào trong danh mục này
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Bố mẹ có thể tạo bài tập mới để đồng hành cùng con vượt qua các chuyên đề khó.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Tạo bài tập đầu tiên
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const isAssigned = assignment.status === 'assigned';
            const isCompleted = assignment.status === 'completed';
            const isApproved = assignment.status === 'reward_approved';

            let statusBadge = 'bg-slate-100 text-slate-700';
            let statusText = 'Đang làm';
            let cardBorder = 'border-slate-200';

            if (isAssigned) {
              statusBadge = 'bg-teal-50 text-teal-700 border border-teal-200';
              statusText = 'Đang làm';
            } else if (isCompleted) {
              statusBadge = 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse';
              statusText = 'Đã hoàn thành - Chờ duyệt';
              cardBorder = 'border-amber-300 shadow-sm';
            } else if (isApproved) {
              statusBadge = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
              statusText = 'Đã trao thưởng 🎉';
              cardBorder = 'border-emerald-200';
            }

            return (
              <div
                key={assignment.id}
                className={`bg-white rounded-2xl border p-5 transition space-y-4 ${cardBorder}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {assignment.studentName} {assignment.studentGrade && `(Lớp ${assignment.studentGrade})`}
                      </span>
                      {assignment.topicTitle && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          Chuyên đề: {assignment.topicTitle}
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusBadge}`}>
                        {statusText}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {assignment.title}
                    </h4>
                  </div>

                  {/* Due Date & Creation Time */}
                  <div className="text-xs text-slate-500 sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Giao ngày: {new Date(assignment.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                    {assignment.dueDate && (
                      <div className="text-amber-700 font-medium">
                        Hạn chót: {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Instructions / Description */}
                {(assignment.instructions || assignment.description) && (
                  <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong>Lời dặn:</strong> {assignment.instructions || assignment.description}
                  </p>
                )}

                {/* Reward Banner & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Phần thưởng cam kết:
                      </div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {assignment.rewardDescription || 'Phần thưởng gia đình'}
                        {assignment.rewardStars > 0 && (
                          <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                            +{assignment.rewardStars} ⭐
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Approve Reward Action Button */}
                  {isCompleted && (
                    <button
                      onClick={() => handleApproveReward(assignment.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shadow-sm animate-bounce"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Phê duyệt & Trao thưởng
                    </button>
                  )}

                  {isApproved && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Đã trao thưởng ({new Date(assignment.completedAt || assignment.createdAt).toLocaleDateString('vi-VN')})
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ParentAssignmentsClientView;
