import { NextRequest, NextResponse } from 'next/server';
import { submitTextbookExercises } from '@/lib/textbook';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, answers } = body;

    if (!studentId || typeof studentId !== 'number') {
      return NextResponse.json({ error: 'Thiếu mã học sinh (studentId)' }, { status: 400 });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'Danh sách câu trả lời không hợp lệ' }, { status: 400 });
    }

    const result = submitTextbookExercises(studentId, answers);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/textbook/submit:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi chấm bài tập SGK' },
      { status: 500 }
    );
  }
}
