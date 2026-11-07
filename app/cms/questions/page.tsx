'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  FolderTree, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowLeft,
  Lightbulb,
  Check,
  Hash,
  ListOrdered
} from 'lucide-react';
import LiveLaTeXPreview from '@/components/cms/LiveLaTeXPreview';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface CMSTopic {
  id: number;
  title: string;
  grade: number;
  tier: string;
  questionCount: number;
}

interface McqOptionItem {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  latex?: string;
}

interface HintItem {
  level: number;
  hint: string;
  penalty_stars?: number;
}

interface CMSQuestion {
  id: number;
  topicId: number;
  lessonId: number | null;
  questionType: 'mcq' | 'numeric';
  prompt: string;
  latexFormula: string | null;
  options: McqOptionItem[] | null;
  correctAnswer: string;
  numericTolerance: number;
  numericUnit: string | null;
  hints: HintItem[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const DEFAULT_MCQ_OPTIONS: McqOptionItem[] = [
  { id: 'A', text: '', latex: '' },
  { id: 'B', text: '', latex: '' },
  { id: 'C', text: '', latex: '' },
  { id: 'D', text: '', latex: '' },
];

const DEFAULT_HINTS: HintItem[] = [
  { level: 1, hint: '', penalty_stars: 1 },
  { level: 2, hint: '', penalty_stars: 2 },
  { level: 3, hint: '', penalty_stars: 3 },
];

function CMSQuestionAuthoringContent() {
  const searchParams = useSearchParams();
  const initialTopicId = searchParams.get('topicId') ? parseInt(searchParams.get('topicId')!, 10) : null;

  const [topics, setTopics] = useState<CMSTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(initialTopicId);
  const [questions, setQuestions] = useState<CMSQuestion[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Question Form State
  const [questionType, setQuestionType] = useState<'mcq' | 'numeric'>('mcq');
  const [prompt, setPrompt] = useState('');
  const [mcqOptions, setMcqOptions] = useState<McqOptionItem[]>(DEFAULT_MCQ_OPTIONS);
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [numericAnswer, setNumericAnswer] = useState('');
  const [numericTolerance, setNumericTolerance] = useState(0.02);
  const [numericUnit, setNumericUnit] = useState('m/s^2');
  const [hints, setHints] = useState<HintItem[]>(DEFAULT_HINTS);
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [points, setPoints] = useState(10);

  // Load Topics list
  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoadingTopics(true);
        const res = await fetch('/api/cms/topics');
        const data = await res.json();
        if (data.success && data.topics.length > 0) {
          setTopics(data.topics);
          if (!selectedTopicId) {
            setSelectedTopicId(data.topics[0].id);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingTopics(false);
      }
    }
    fetchTopics();
  }, []);

  // Load Questions when selected topic changes
  const loadQuestions = async (topicId: number) => {
    try {
      setLoadingQuestions(true);
      setError(null);
      const res = await fetch(`/api/cms/questions?topicId=${topicId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setQuestions(data.questions || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (selectedTopicId) {
      loadQuestions(selectedTopicId);
    }
  }, [selectedTopicId]);

  const resetForm = () => {
    setEditingQuestionId(null);
    setQuestionType('mcq');
    setPrompt('');
    setMcqOptions([
      { id: 'A', text: '', latex: '' },
      { id: 'B', text: '', latex: '' },
      { id: 'C', text: '', latex: '' },
      { id: 'D', text: '', latex: '' },
    ]);
    setCorrectAnswer('A');
    setNumericAnswer('');
    setNumericTolerance(0.02);
    setNumericUnit('m/s^2');
    setHints([
      { level: 1, hint: '', penalty_stars: 1 },
      { level: 2, hint: '', penalty_stars: 2 },
      { level: 3, hint: '', penalty_stars: 3 },
    ]);
    setExplanation('');
    setDifficulty('medium');
    setPoints(10);
  };

  const handleEditQuestion = (q: CMSQuestion) => {
    setEditingQuestionId(q.id);
    setQuestionType(q.questionType);
    setPrompt(q.prompt);
    if (q.questionType === 'mcq' && q.options && q.options.length >= 2) {
      setMcqOptions(q.options);
      setCorrectAnswer(q.correctAnswer);
    } else {
      setNumericAnswer(q.correctAnswer);
      setNumericTolerance(q.numericTolerance ?? 0.02);
      setNumericUnit(q.numericUnit || '');
    }
    setHints(q.hints && q.hints.length >= 3 ? q.hints : DEFAULT_HINTS);
    setExplanation(q.explanation);
    setDifficulty(q.difficulty);
    setPoints(q.points);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteQuestion = async (q: CMSQuestion) => {
    if (!window.confirm(`Xác nhận xóa câu hỏi #${q.id}?`)) return;
    try {
      const res = await fetch(`/api/cms/questions?id=${q.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSuccessMsg('Đã xóa câu hỏi thành công');
      if (selectedTopicId) loadQuestions(selectedTopicId);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) {
      setError('Vui lòng chọn một chuyên đề');
      return;
    }

    try {
      setError(null);
      const payload: any = {
        topicId: selectedTopicId,
        questionType,
        prompt: prompt.trim(),
        explanation: explanation.trim(),
        difficulty,
        points,
        hints: hints.filter((h) => h.hint && h.hint.trim().length > 0),
      };

      if (questionType === 'mcq') {
        payload.options = mcqOptions;
        payload.correctAnswer = correctAnswer;
      } else {
        payload.correctAnswer = numericAnswer.trim();
        payload.numericTolerance = numericTolerance;
        payload.numericUnit = numericUnit.trim() || null;
      }

      if (editingQuestionId) {
        // Update
        const res = await fetch('/api/cms/questions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingQuestionId, ...payload }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setSuccessMsg(`Đã cập nhật câu hỏi #${editingQuestionId} thành công!`);
      } else {
        // Create
        const res = await fetch('/api/cms/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setSuccessMsg(`Đã tạo câu hỏi mới thành công!`);
      }

      resetForm();
      loadQuestions(selectedTopicId);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/cms"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Quay lại Cây chuyên đề"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Biên Soạn Câu Hỏi & Live LaTeX Preview
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  CMS Authoring
                </span>
              </h1>
              <p className="text-xs text-slate-500">Soạn thảo trắc nghiệm MCQ & điền số kèm xem trước công thức KaTeX</p>
            </div>
          </div>

          <Link
            href="/cms"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <FolderTree className="w-4 h-4" />
            <span>Quản lý chuyên đề</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Alerts */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Topic Selector Ribbon */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Chuyên đề đang chọn:
              </span>
              <span className="text-sm font-bold text-slate-900">
                {selectedTopic ? `Lớp ${selectedTopic.grade}: ${selectedTopic.title}` : 'Đang tải...'}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <select
              value={selectedTopicId || ''}
              onChange={(e) => setSelectedTopicId(parseInt(e.target.value, 10))}
              className="w-full sm:w-72 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  Lớp {t.grade} - {t.title} ({t.questionCount} câu)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Editor Form & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Authoring Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  {editingQuestionId ? `Chỉnh sửa câu hỏi #${editingQuestionId}` : 'Soạn câu hỏi mới'}
                </h2>
                <p className="text-xs text-slate-500">
                  Dùng ký hiệu <code className="text-indigo-600 font-bold">$...$</code> cho công thức nội dòng hoặc <code className="text-indigo-600 font-bold">$$...$$</code> cho công thức khối.
                </p>
              </div>

              {editingQuestionId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Hủy sửa
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-5">
              {/* Question Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Loại câu hỏi <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuestionType('mcq')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                      questionType === 'mcq'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span>Trắc nghiệm 4 lựa chọn (MCQ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionType('numeric')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                      questionType === 'numeric'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Hash className="w-4 h-4" />
                    <span>Điền số định lượng (Numeric)</span>
                  </button>
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đề bài / Câu hỏi <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập nội dung câu hỏi... Ví dụ: Một vật có khối lượng $m = 2\\text{ kg}$ rơi tự do từ độ cao $h = 20\\text{ m}$. Lấy $g = 9.8\\text{ m/s}^2$..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              {/* MCQ Options Builder */}
              {questionType === 'mcq' ? (
                <div className="space-y-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      4 Phương án đáp án & Chọn đáp án đúng:
                    </label>
                    <span className="text-[11px] text-slate-500">Tích chọn nút tròn cho đáp án đúng</span>
                  </div>

                  <div className="space-y-2.5">
                    {mcqOptions.map((opt, idx) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition ${
                          correctAnswer === opt.id
                            ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="correct_answer_radio"
                            value={opt.id}
                            checked={correctAnswer === opt.id}
                            onChange={() => setCorrectAnswer(opt.id)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                              correctAnswer === opt.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {opt.id}
                          </span>
                        </label>

                        <input
                          type="text"
                          required
                          placeholder={`Nội dung phương án ${opt.id} (hỗ trợ $formula$)`}
                          value={opt.text}
                          onChange={(e) => {
                            const next = [...mcqOptions];
                            next[idx] = { ...next[idx], text: e.target.value };
                            setMcqOptions(next);
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Numeric Inputs */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Đáp án số đúng <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 9.8 hoặc 1.5e-3"
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sai số tương đối (Tolerance)
                    </label>
                    <select
                      value={numericTolerance}
                      onChange={(e) => setNumericTolerance(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="0.01">± 1% (Chính xác cao)</option>
                      <option value="0.02">± 2% (Chuẩn tiêu chuẩn)</option>
                      <option value="0.05">± 5% (Linh hoạt)</option>
                      <option value="0.10">± 10% (Gần đúng)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Đơn vị vật lý (Unit)
                    </label>
                    <input
                      type="text"
                      placeholder="m/s^2, N, J, W, V..."
                      value={numericUnit}
                      onChange={(e) => setNumericUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* Progressive Hints Section */}
              <div className="space-y-2 p-4 bg-amber-50/40 rounded-2xl border border-amber-200/60">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Hệ thống 3 cấp độ gợi ý (Hint System):
                </span>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Gợi ý Cấp 1: Hiện tượng & Khái niệm then chốt..."
                    value={hints[0]?.hint || ''}
                    onChange={(e) => {
                      const next = [...hints];
                      next[0] = { ...next[0], level: 1, hint: e.target.value, penalty_stars: 1 };
                      setHints(next);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Gợi ý Cấp 2: Định luật & Công thức tính liên quan (hỗ trợ $...$)..."
                    value={hints[1]?.hint || ''}
                    onChange={(e) => {
                      const next = [...hints];
                      next[1] = { ...next[1], level: 2, hint: e.target.value, penalty_stars: 2 };
                      setHints(next);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Gợi ý Cấp 3: Hướng dẫn giải chi tiết từng bước..."
                    value={hints[2]?.hint || ''}
                    onChange={(e) => {
                      const next = [...hints];
                      next[2] = { ...next[2], level: 3, hint: e.target.value, penalty_stars: 3 };
                      setHints(next);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Explanation Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lời giải chi tiết (Step-by-step Explanation) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập các bước chứng minh, tính toán và kết luận với $công thức$..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              {/* Difficulty & Points */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Độ khó</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="easy">Dễ (Nhận biết)</option>
                    <option value="medium">Trung bình (Thông hiểu - Vận dụng)</option>
                    <option value="hard">Nâng cao (Vận dụng cao)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Điểm thưởng</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="5"
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition"
                >
                  {editingQuestionId ? 'Cập nhật câu hỏi' : 'Lưu câu hỏi vào ngân hàng'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live LaTeX Preview HUD */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4 sticky top-20">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  Xem Trước Trực Tiếp (Live KaTeX Preview)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Thời gian thực
                </span>
              </div>

              {/* Prompt Preview */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Đề bài hiển thị:
                </span>
                <LiveLaTeXPreview
                  content={prompt}
                  emptyPlaceholder="Đề bài với công thức LaTeX sẽ xuất hiện tại đây khi bạn nhập..."
                />
              </div>

              {/* Options / Numeric Preview */}
              {questionType === 'mcq' ? (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Các lựa chọn:
                  </span>
                  <div className="space-y-1">
                    {mcqOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className={`p-2 rounded-xl border text-xs flex items-center gap-2 ${
                          correctAnswer === opt.id
                            ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center font-black text-[11px]">
                          {opt.id}
                        </span>
                        <span className="flex-1">
                          {opt.text ? (
                            <LiveLaTeXPreview content={opt.text} className="p-0 bg-transparent border-0" />
                          ) : (
                            <span className="text-slate-400 italic">Chưa nhập phương án {opt.id}</span>
                          )}
                        </span>
                        {correctAnswer === opt.id && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block">Dạng câu hỏi điền số:</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-indigo-700 font-bold">
                      {numericAnswer || '[Chưa nhập số]'}
                    </span>
                    <span className="text-slate-600 font-semibold">{numericUnit}</span>
                    <span className="text-[10px] text-slate-400">
                      (sai số ±{(numericTolerance * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              )}

              {/* Explanation Preview */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Lời giải chi tiết:
                </span>
                <LiveLaTeXPreview
                  content={explanation}
                  emptyPlaceholder="Lời giải chi tiết kèm công thức sẽ hiển thị tại đây..."
                />
              </div>

              {/* KaTeX Quick Syntax Reference */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1 font-mono">
                <span className="font-bold text-slate-800 block font-sans">
                  Ký hiệu KaTeX thông dụng:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <span><code>$v = \frac&#123;s&#125;&#123;t&#125;$</code> : Phân số</span>
                  <span><code>$\sqrt&#123;x&#125;$</code> : Căn bậc 2</span>
                  <span><code>$10^&#123;8&#125;$</code> : Số mũ</span>
                  <span><code>$\Omega, \lambda, \pi$</code> : Ký hiệu Hy Lạp</span>
                  <span><code>$F_&#123;12&#125;$</code> : Chỉ số dưới</span>
                  <span><code>$\cdot, \times, \pm$</code> : Phép tính</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Questions List in Topic */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Ngân hàng câu hỏi của chuyên đề ({questions.length} câu)
            </h2>
            <span className="text-xs text-slate-500">
              {selectedTopic ? `Lớp ${selectedTopic.grade} - ${selectedTopic.title}` : ''}
            </span>
          </div>

          {loadingQuestions ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent" />
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs italic">
              Chưa có câu hỏi nào trong chuyên đề này. Hãy dùng biểu mẫu phía trên để tạo câu hỏi đầu tiên.
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition space-y-3 bg-slate-50/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 uppercase">
                        {q.questionType === 'mcq' ? 'Trắc nghiệm' : 'Điền số'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ID #{q.id} • {q.difficulty} • {q.points} điểm
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditQuestion(q)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        title="Chỉnh sửa câu hỏi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Prompt */}
                  <LiveLaTeXPreview content={q.prompt} className="p-2.5 bg-white border border-slate-200" />

                  {/* MCQ Options Display */}
                  {q.questionType === 'mcq' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-xl border flex items-center gap-2 ${
                            q.correctAnswer === opt.id
                              ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[11px] font-black">
                            {opt.id}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {q.correctAnswer === opt.id && (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Numeric Display */}
                  {q.questionType === 'numeric' && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2">
                      <span className="font-bold text-slate-500">Đáp án chuẩn:</span>
                      <span className="font-black text-indigo-700">{q.correctAnswer}</span>
                      <span className="text-slate-600">{q.numericUnit}</span>
                      <span className="text-[11px] text-slate-400">
                        (±{(q.numericTolerance * 100).toFixed(0)}%)
                      </span>
                    </div>
                  )}

                  {/* Explanation Preview */}
                  <div className="text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-bold text-slate-500 block mb-0.5">Lời giải:</span>
                    <LiveLaTeXPreview
                      content={q.explanation}
                      className="p-2 bg-white/70 border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CMSQuestionAuthoringPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent" />
            <p className="mt-2 text-xs text-slate-500 font-bold">Đang tải trình biên soạn câu hỏi...</p>
          </div>
        </div>
      }
    >
      <CMSQuestionAuthoringContent />
    </Suspense>
  );
}
