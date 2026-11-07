import { NextRequest, NextResponse } from 'next/server';
import { getQuestionsForTopic } from '@/lib/student';

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
    const mode = (searchParams.get('mode') || 'practice') as 'practice' | 'exam';

    const questions = getQuestionsForTopic(topicId, mode);
    return NextResponse.json({
      topicId,
      mode,
      count: questions.length,
      questions,
    });
  } catch (error: any) {
    console.error('Error in /api/quizzes/[topicId]:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi tải câu hỏi kiểm tra' },
      { status: 500 }
    );
  }
}
