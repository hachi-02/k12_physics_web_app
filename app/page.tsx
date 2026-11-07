import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Compass, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-4xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          <Compass className="w-4 h-4" /> K-12 Physics Learning Platform
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Học Vật Lý K-12 Toàn Diện
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Nền tảng đồng hành cùng Phụ huynh và Học sinh từ Lớp 1 đến Lớp 12, phân tầng trực quan, tư duy logic và chuyên sâu định lượng theo chương trình GDPT 2018.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {/* Student Tier Card */}
          <Link
            href="/student"
            className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition text-left space-y-3 block group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold group-hover:scale-105 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">Không gian Học sinh</h3>
            <p className="text-sm text-slate-600">3 phân tầng trải nghiệm: Khám phá trực quan (1-5), Tư duy logic (6-9), và Luyện đề chuyên sâu (10-12).</p>
            <div className="pt-2 text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition">
              Sẵn sàng học tập &rarr;
            </div>
          </Link>

          {/* Parent Tier Card */}
          <Link
            href="/parents"
            className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-teal-300 transition text-left space-y-3 block group"
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-xl flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">Không gian Phụ huynh</h3>
            <p className="text-sm text-slate-600">Cẩm nang "Sư phạm tại gia", phát hiện lỗ hổng kiến thức, giao bài tập và đồng hành nhận thưởng.</p>
            <div className="pt-2 text-sm font-semibold text-teal-600 flex items-center gap-1 group-hover:translate-x-1 transition">
              Vào không gian Phụ huynh &rarr;
            </div>
          </Link>

          {/* CMS Admin Card */}
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition text-left space-y-3">
            <div className="w-12 h-12 bg-tier-high-light text-tier-high-dark rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Quản trị & CMS</h3>
            <p className="text-sm text-slate-600">Biên soạn cây chuyên đề 12 khối lớp, câu hỏi LaTeX công thức chuẩn xác và câu hỏi điền số.</p>
            <div className="pt-2 text-sm font-semibold text-indigo-600">Quản trị &rarr;</div>
          </div>
        </div>
      </div>
    </main>
  );
}
