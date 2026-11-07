import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Timer, 
  Flame, 
  GraduationCap,
  PlayCircle
} from 'lucide-react';
import { getTopicsForGrade, getStudentProfile, getTierForGrade } from '@/lib/student';
import { getTextbookToc } from '@/lib/textbook';
import { getDb } from '@/lib/db';
import StudentNavbar from '@/components/student/StudentNavbar';
import TierThemeWrapper from '@/components/student/TierThemeWrapper';
import TextbookChapterAccordion from '@/components/student/TextbookChapterAccordion';

interface StudentPageProps {
  searchParams?: {
    grade?: string;
    studentId?: string;
    mode?: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function StudentPage({ searchParams }: StudentPageProps) {
  const db = getDb();

  // Resolve student
  let studentId = 3; // default seeded hocsinh1
  if (searchParams?.studentId) {
    studentId = parseInt(searchParams.studentId, 10);
  } else {
    const studentUser = db.get<{ id: number }>(
      "SELECT id FROM users WHERE role = 'student' ORDER BY id ASC LIMIT 1"
    );
    if (studentUser) studentId = studentUser.id;
  }

  const profile = getStudentProfile(studentId);
  const rawGrade = searchParams?.grade ? parseInt(searchParams.grade, 10) : profile.grade;
  const grade = rawGrade >= 6 && rawGrade <= 12 ? rawGrade : 6;
  const tier = getTierForGrade(grade);
  const topics = getTopicsForGrade(grade, studentId);
  const toc = getTextbookToc(grade, studentId);
  const currentMode = toc ? (searchParams?.mode === 'topics' ? 'topics' : 'textbook') : 'topics';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Student Top Navigation */}
      <StudentNavbar
        currentGrade={grade}
        stars={profile.stars}
        streak={profile.currentStreak}
        studentName={profile.name}
      />

      {/* Adaptive Theme Wrapper for 3 Tiers */}
      <TierThemeWrapper grade={grade} className="flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome Hero Banner with Tier Styling */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" /> Khối Lớp {grade}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Chào mừng bạn, {profile.name}!
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">
                {tier === 'primary' &&
                  'Cùng khám phá những hiện tượng khoa học kỳ thú quanh ta qua hình ảnh sinh động và các thí nghiệm vui nhộn!'}
                {tier === 'middle' &&
                  'Rèn luyện tư duy logic, hiểu rõ bản chất quy luật tự nhiên và giải thích các hiện tượng vật lý từng bước một.'}
                {tier === 'high' &&
                  'Chuyên sâu định lượng, làm chủ công thức và phương pháp tính toán để tự tin chinh phục các kỳ thi tốt nghiệp và ĐGNL.'}
              </p>
            </div>

            {/* Quick Stat Card */}
            <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
              <div className="text-center px-2">
                <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                  {profile.stars} <Sparkles className="w-4 h-4 fill-amber-400" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Sao thưởng</div>
              </div>

              <div className="w-px bg-slate-200" />

              <div className="text-center px-2">
                <div className="text-2xl font-black text-rose-600 flex items-center justify-center gap-1">
                  {profile.currentStreak} <Flame className="w-4 h-4 fill-rose-500" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Chuỗi ngày</div>
              </div>
            </div>
          </div>

          {/* Mode Switcher when Textbook data is available */}
          {toc && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Link
                  href={`/student?grade=${grade}&mode=textbook${searchParams?.studentId ? `&studentId=${searchParams.studentId}` : ''}`}
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
                    currentMode === 'textbook'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Học Theo Sách Giáo Khoa (Chương & Bài)
                </Link>

                <Link
                  href={`/student?grade=${grade}&mode=topics${searchParams?.studentId ? `&studentId=${searchParams.studentId}` : ''}`}
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
                    currentMode === 'topics'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Chuyên Đề Tổng Hợp ({topics.length})
                </Link>
              </div>

              <span className="text-xs font-medium text-slate-400 hidden md:inline">
                Chương trình chuẩn GDPT 2018
              </span>
            </div>
          )}

          {/* Content: Either Textbook Chapters or Topics Grid */}
          {currentMode === 'textbook' && toc ? (
            <TextbookChapterAccordion toc={toc} studentId={studentId} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-teal-600" />
                  Danh Mục Chuyên Đề Vật Lý Lớp {grade}
                </h2>
                <span className="text-xs font-semibold text-slate-500">
                  {topics.length} chuyên đề
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => {
                  const hasTested = topic.userBestScore !== null && topic.userBestScore !== undefined;

                  return (
                    <div
                      key={topic.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xs">
                            #{index + 1}
                          </span>

                          {hasTested ? (
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                topic.userBestScore! >= 80
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : topic.userBestScore! >= 60
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              Điểm cao nhất: {topic.userBestScore}%
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-400">
                              Chưa làm bài
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-700 transition leading-snug">
                          {topic.title}
                        </h3>

                        {topic.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {topic.description}
                          </p>
                        )}
                      </div>

                      {/* Action Links Grid */}
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        {/* Theory Learn Button */}
                        <Link
                          href={`/student/learn/${topic.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Học Lý Thuyết & Thí Nghiệm
                        </Link>

                        <div className="grid grid-cols-2 gap-2">
                          {/* Practice Button */}
                          <Link
                            href={`/student/practice/${topic.id}`}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                          >
                            <PlayCircle className="w-3.5 h-3.5 text-teal-600" /> Luyện tập
                          </Link>

                          {/* Exam Room Button */}
                          <Link
                            href={`/student/exam/${topic.id}`}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                          >
                            <Timer className="w-3.5 h-3.5 text-rose-600" /> Thi thử
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </TierThemeWrapper>
    </div>
  );
}
