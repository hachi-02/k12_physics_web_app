import { NextRequest, NextResponse } from 'next/server';
import { getTopicsForGrade } from '@/lib/student';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gradeParam = searchParams.get('grade');
    const studentIdParam = searchParams.get('studentId');

    const grade = gradeParam ? parseInt(gradeParam, 10) : 7;
    const studentId = studentIdParam ? parseInt(studentIdParam, 10) : undefined;

    const topics = getTopicsForGrade(grade, studentId);
    return NextResponse.json({
      grade,
      count: topics.length,
      topics,
    });
  } catch (error: any) {
    console.error('Error in /api/student/topics:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi lấy danh sách chuyên đề' },
      { status: 500 }
    );
  }
}
