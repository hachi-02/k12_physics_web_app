import { NextRequest, NextResponse } from 'next/server';
import {
  getParentAssignments,
  createParentAssignment,
  approveParentReward,
} from '@/lib/parent';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentIdParam = searchParams.get('parentId');
    const studentIdParam = searchParams.get('studentId');
    const statusParam = searchParams.get('status');

    const db = getDb();

    let parentId: number | undefined;
    if (parentIdParam) {
      parentId = parseInt(parentIdParam, 10);
    } else {
      const defaultParent = db.get<{ id: number }>(
        "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
      );
      if (defaultParent) {
        parentId = defaultParent.id;
      }
    }

    const studentId = studentIdParam ? parseInt(studentIdParam, 10) : undefined;
    const status = statusParam || undefined;

    const assignments = getParentAssignments({ parentId, studentId, status });
    return NextResponse.json({
      count: assignments.length,
      assignments,
    });
  } catch (error: any) {
    console.error('Error in GET /api/parent/assignments:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi lấy danh sách bài tập' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      parentId,
      studentId,
      title,
      description,
      instructions,
      topicId,
      lessonId,
      dueDate,
      rewardDescription,
      rewardStars,
    } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tiêu đề bài tập không được để trống' },
        { status: 400 }
      );
    }

    if (!parentId || !studentId) {
      return NextResponse.json(
        { error: 'Thiếu mã phụ huynh (parentId) hoặc học sinh (studentId)' },
        { status: 400 }
      );
    }

    const created = createParentAssignment({
      parentId: Number(parentId),
      studentId: Number(studentId),
      title: title.trim(),
      description,
      instructions,
      topicId: topicId ? Number(topicId) : undefined,
      lessonId: lessonId ? Number(lessonId) : undefined,
      dueDate,
      rewardDescription,
      rewardStars: rewardStars ? Number(rewardStars) : 0,
    });

    return NextResponse.json(
      { message: 'Giao bài tập thành công', assignment: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/parent/assignments:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi tạo bài tập' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { assignmentId, parentId, action, status, parentFeedback } = body;

    if (!assignmentId) {
      return NextResponse.json(
        { error: 'Thiếu mã bài tập (assignmentId)' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Default parentId if omitted
    let effectiveParentId = parentId ? Number(parentId) : undefined;
    if (!effectiveParentId) {
      const defaultParent = db.get<{ id: number }>(
        "SELECT id FROM users WHERE role = 'parent' ORDER BY id ASC LIMIT 1"
      );
      if (defaultParent) {
        effectiveParentId = defaultParent.id;
      } else {
        return NextResponse.json({ error: 'Không tìm thấy phụ huynh' }, { status: 400 });
      }
    }

    if (action === 'approve_reward') {
      const updated = approveParentReward(
        Number(assignmentId),
        effectiveParentId,
        parentFeedback
      );
      return NextResponse.json({
        message: 'Phê duyệt trao thưởng thành công',
        assignment: updated,
      });
    }

    if (status) {
      db.run(
        `UPDATE parent_assignments
         SET status = ?,
             parent_feedback = COALESCE(?, parent_feedback),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [status, parentFeedback || null, Number(assignmentId)]
      );

      const items = getParentAssignments({ parentId: effectiveParentId });
      const updated = items.find((a) => a.id === Number(assignmentId));
      return NextResponse.json({
        message: 'Cập nhật trạng thái bài tập thành công',
        assignment: updated,
      });
    }

    return NextResponse.json(
      { error: 'Yêu cầu hành động không hợp lệ' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in PATCH /api/parent/assignments:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi cập nhật bài tập' },
      { status: 400 }
    );
  }
}
