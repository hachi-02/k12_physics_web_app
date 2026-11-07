import { NextRequest, NextResponse } from 'next/server';
import { getAllTopicsWithStats, createTopic, updateTopic, deleteTopic } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gradeParam = searchParams.get('grade');
    const grade = gradeParam ? parseInt(gradeParam, 10) : undefined;

    const topics = getAllTopicsWithStats(grade);
    return NextResponse.json({ success: true, topics });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const topic = createTopic(body);
    return NextResponse.json({ success: true, topic }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Thiếu topic ID' }, { status: 400 });
    }
    const topic = updateTopic(Number(id), data);
    return NextResponse.json({ success: true, topic });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ success: false, error: 'Thiếu topic ID' }, { status: 400 });
    }
    deleteTopic(parseInt(idParam, 10));
    return NextResponse.json({ success: true, message: 'Xóa chuyên đề thành công' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
