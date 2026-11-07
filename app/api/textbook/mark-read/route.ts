import { NextRequest, NextResponse } from 'next/server';
import { markTheoryRead } from '@/lib/textbook';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, lessonId } = body;

    if (!studentId || typeof studentId !== 'number') {
      return NextResponse.json({ error: 'Thiếu mã học sinh (studentId)' }, { status: 400 });
    }

    if (!lessonId || typeof lessonId !== 'number') {
      return NextResponse.json({ error: 'Thiếu mã bài học (lessonId)' }, { status: 400 });
    }

    markTheoryRead(studentId, lessonId);
    return NextResponse.json({ success: true, message: 'Đã đánh dấu hoàn thành lý thuyết' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/textbook/mark-read:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi cập nhật trạng thái đã đọc' },
      { status: 500 }
    );
  }
}
