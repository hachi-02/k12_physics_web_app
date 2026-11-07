import { NextRequest, NextResponse } from 'next/server';
import { getTextbookToc } from '@/lib/textbook';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gradeParam = searchParams.get('grade') || '6';
    const studentIdParam = searchParams.get('studentId');

    const grade = parseInt(gradeParam, 10);
    const studentId = studentIdParam ? parseInt(studentIdParam, 10) : undefined;

    const toc = getTextbookToc(grade, studentId);
    if (!toc) {
      return NextResponse.json({ error: `Chưa có dữ liệu SGK cho lớp ${grade}` }, { status: 404 });
    }

    return NextResponse.json(toc, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/textbook/toc:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi lấy mục lục SGK' }, { status: 500 });
  }
}
