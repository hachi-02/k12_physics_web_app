import { NextRequest, NextResponse } from 'next/server';
import { getParentChildren } from '@/lib/parent';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentIdParam = searchParams.get('parentId');

    const db = getDb();
    let parentId: number;

    if (parentIdParam) {
      parentId = parseInt(parentIdParam, 10);
    } else {
      const defaultParent = db.get<{ id: number }>(
        "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
      );
      if (!defaultParent) {
        return NextResponse.json(
          { error: 'Không tìm thấy tài khoản phụ huynh' },
          { status: 404 }
        );
      }
      parentId = defaultParent.id;
    }

    const children = getParentChildren(parentId);
    return NextResponse.json({
      parentId,
      count: children.length,
      children,
    });
  } catch (error: any) {
    console.error('Error in /api/parent/children:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi lấy danh sách con' },
      { status: 500 }
    );
  }
}
