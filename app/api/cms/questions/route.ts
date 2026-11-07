import { NextRequest, NextResponse } from 'next/server';
import {
  getQuestionsForTopic,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/cms';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const topicIdParam = searchParams.get('topicId');

    if (idParam) {
      const question = getQuestionById(parseInt(idParam, 10));
      if (!question) {
        return NextResponse.json({ success: false, error: 'Câu hỏi không tồn tại' }, { status: 404 });
      }
      return NextResponse.json({ success: true, question });
    }

    if (!topicIdParam) {
      return NextResponse.json({ success: false, error: 'Thiếu topicId hoặc id' }, { status: 400 });
    }

    const questions = getQuestionsForTopic(parseInt(topicIdParam, 10));
    return NextResponse.json({ success: true, questions });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = createQuestion(body);
    return NextResponse.json({ success: true, question }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Thiếu question ID' }, { status: 400 });
    }
    const question = updateQuestion(Number(id), data);
    return NextResponse.json({ success: true, question });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ success: false, error: 'Thiếu question ID' }, { status: 400 });
    }
    deleteQuestion(parseInt(idParam, 10));
    return NextResponse.json({ success: true, message: 'Xóa câu hỏi thành công' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
