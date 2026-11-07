import { NextRequest, NextResponse } from 'next/server';
import { getLessonTheory } from '@/lib/student';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { topicId: string } }
) {
  try {
    const topicId = parseInt(params.topicId, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: 'Mã chuyên đề không hợp lệ' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const lessonIdParam = searchParams.get('lessonId');
    const lessonId = lessonIdParam ? parseInt(lessonIdParam, 10) : undefined;

    const lesson = getLessonTheory(topicId, lessonId);
    return NextResponse.json(lesson);
  } catch (error: any) {
    console.error('Error in /api/student/lesson/[topicId]:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi tải bài học' },
      { status: 500 }
    );
  }
}
