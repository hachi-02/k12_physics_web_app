import { NextRequest, NextResponse } from 'next/server';
import { getTextbookLesson } from '@/lib/textbook';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const lessonId = parseInt(params.lessonId, 10);
    if (isNaN(lessonId)) {
      return NextResponse.json({ error: 'Mã bài học không hợp lệ' }, { status: 400 });
    }

    const lesson = getTextbookLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ error: 'Không tìm thấy bài học SGK' }, { status: 404 });
    }

    return NextResponse.json(lesson, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/textbook/lesson/[lessonId]:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi tải bài học SGK' },
      { status: 500 }
    );
  }
}
