import { NextRequest, NextResponse } from 'next/server';
import { getParentDashboardData } from '@/lib/parent';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentIdParam = searchParams.get('parentId');
    const studentIdParam = searchParams.get('studentId');

    const db = getDb();

    // Default to the first parent in db if parentId is not passed
    let parentId: number;
    if (parentIdParam) {
      parentId = parseInt(parentIdParam, 10);
    } else {
      const defaultParent = db.get<{ id: number }>(
        "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
      );
      if (!defaultParent) {
        return NextResponse.json(
          { error: 'Không tìm thấy tài khoản phụ huynh trong hệ thống' },
          { status: 404 }
        );
      }
      parentId = defaultParent.id;
    }

    if (isNaN(parentId)) {
      return NextResponse.json({ error: 'Mã phụ huynh không hợp lệ' }, { status: 400 });
    }

    const studentId = studentIdParam ? parseInt(studentIdParam, 10) : undefined;

    const data = getParentDashboardData(parentId, studentId);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/parent/dashboard:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi xử lý bảng điều khiển phụ huynh' },
      { status: 500 }
    );
  }
}
