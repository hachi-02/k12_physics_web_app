import { NextRequest, NextResponse } from 'next/server';
import { submitQuiz, SubmitQuizInput } from '@/lib/student';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitQuizInput;
    const { userId, topicId, lessonId, assignmentId, quizType, timeSpentSeconds, answers } = body;

    const db = getDb();

    // Default to student user if not passed
    let effectiveUserId = userId ? Number(userId) : undefined;
    if (!effectiveUserId) {
      const defaultStudent = db.get<{ id: number }>(
        "SELECT id FROM users WHERE role = 'student' ORDER BY id ASC LIMIT 1"
      );
      if (defaultStudent) {
        effectiveUserId = defaultStudent.id;
      } else {
        return NextResponse.json({ error: 'Không tìm thấy tài khoản học sinh' }, { status: 400 });
      }
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp danh sách câu trả lời' },
        { status: 400 }
      );
    }

    const result = submitQuiz({
      userId: effectiveUserId,
      topicId: topicId ? Number(topicId) : undefined,
      lessonId: lessonId ? Number(lessonId) : undefined,
      assignmentId: assignmentId ? Number(assignmentId) : undefined,
      quizType: quizType || 'practice',
      timeSpentSeconds: timeSpentSeconds || 0,
      answers,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/quizzes/submit:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi chấm điểm và lưu kết quả bài làm' },
      { status: 400 }
    );
  }
}
