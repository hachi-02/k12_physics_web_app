import { NextRequest, NextResponse } from 'next/server';
import { getLessonsWithParentGuide } from '@/lib/parent';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gradeParam = searchParams.get('grade');
    const topicIdParam = searchParams.get('topicId');
    const lessonIdParam = searchParams.get('lessonId');

    const grade = gradeParam ? parseInt(gradeParam, 10) : undefined;
    const topicId = topicIdParam ? parseInt(topicIdParam, 10) : undefined;
    const lessonId = lessonIdParam ? parseInt(lessonIdParam, 10) : undefined;

    const lessons = getLessonsWithParentGuide({ grade, topicId, lessonId });
    return NextResponse.json({
      count: lessons.length,
      lessons,
    });
  } catch (error: any) {
    console.error('Error in /api/parent/guide:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi lấy cẩm nang sư phạm' },
      { status: 500 }
    );
  }
}
