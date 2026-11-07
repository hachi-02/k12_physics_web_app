import { NextRequest, NextResponse } from 'next/server';
import { getTextbookChapterReview } from '@/lib/textbook';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    const chapterId = parseInt(params.chapterId, 10);
    if (isNaN(chapterId)) {
      return NextResponse.json({ error: 'Mã chương không hợp lệ' }, { status: 400 });
    }

    const review = getTextbookChapterReview(chapterId);
    if (!review) {
      return NextResponse.json({ error: 'Không tìm thấy nội dung ôn tập chương' }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/textbook/chapter/[chapterId]/review:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi khi tải ôn tập chương' },
      { status: 500 }
    );
  }
}
