import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST, PUT, DELETE } from '@/app/api/cms/questions/route';
import { getDb } from '@/lib/db';

describe('CMS Questions API Suite (/api/cms/questions)', () => {
  let testTopicId: number;

  it('GET /api/cms/questions?topicId=... returns questions for an existing topic', async () => {
    const db = getDb();
    const topic = db.get<any>('SELECT id FROM physics_topics LIMIT 1');
    expect(topic).toBeDefined();
    testTopicId = topic.id;

    const req = new NextRequest(`http://localhost:3000/api/cms/questions?topicId=${testTopicId}`);
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.questions)).toBe(true);
  });

  it('POST /api/cms/questions creates a new MCQ question with 4 options and valid answer key', async () => {
    const mcqPayload = {
      topicId: testTopicId,
      questionType: 'mcq',
      prompt: 'Vận tốc trung bình trong chuyển động thẳng đều được tính bởi công thức nào? $v = ?$',
      options: [
        { id: 'A', text: '$v = \\frac{s}{t}$' },
        { id: 'B', text: '$v = s \\cdot t$' },
        { id: 'C', text: '$v = \\frac{t}{s}$' },
        { id: 'D', text: '$v = s + t$' },
      ],
      correctAnswer: 'A',
      explanation: 'Theo định nghĩa, vận tốc là quãng đường chia cho thời gian: $v = \\frac{s}{t}$.',
      difficulty: 'easy',
      points: 10,
      hints: [
        { level: 1, hint: 'Nhớ lại định nghĩa vận tốc chuyển động' },
        { level: 2, hint: 'Công thức liên hệ giữa s, v và t' },
        { level: 3, hint: 'Chọn đáp án A' },
      ],
    };

    const req = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'POST',
      body: JSON.stringify(mcqPayload),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.question.id).toBeDefined();
    expect(data.question.questionType).toBe('mcq');
    expect(data.question.correctAnswer).toBe('A');
    expect(data.question.options.length).toBe(4);

    const createdId = data.question.id;

    // Test PUT: update the question
    const updateReq = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'PUT',
      body: JSON.stringify({
        id: createdId,
        prompt: 'Đề bài MCQ đã cập nhật với $v = s/t$',
        points: 15,
      }),
    });
    const updateRes = await PUT(updateReq);
    const updateData = await updateRes.json();

    expect(updateRes.status).toBe(200);
    expect(updateData.success).toBe(true);
    expect(updateData.question.prompt).toContain('Đề bài MCQ đã cập nhật');
    expect(updateData.question.points).toBe(15);

    // Test DELETE
    const deleteReq = new NextRequest(`http://localhost:3000/api/cms/questions?id=${createdId}`, {
      method: 'DELETE',
    });
    const deleteRes = await DELETE(deleteReq);
    const deleteData = await deleteRes.json();

    expect(deleteRes.status).toBe(200);
    expect(deleteData.success).toBe(true);
  });

  it('POST /api/cms/questions creates a new Numeric question with float tolerance and unit', async () => {
    const numericPayload = {
      topicId: testTopicId,
      questionType: 'numeric',
      prompt: 'Một xe lăn có khối lượng $m = 2\\text{ kg}$ chịu lực kéo $F = 10\\text{ N}$. Gia tốc của xe là bao nhiêu?',
      correctAnswer: '5.0',
      numericTolerance: 0.02,
      numericUnit: 'm/s^2',
      explanation: 'Theo định luật II Newton: $a = \\frac{F}{m} = \\frac{10}{2} = 5\\text{ m/s}^2$.',
      difficulty: 'medium',
      points: 15,
    };

    const req = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'POST',
      body: JSON.stringify(numericPayload),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.question.id).toBeDefined();
    expect(data.question.questionType).toBe('numeric');
    expect(data.question.correctAnswer).toBe('5.0');
    expect(data.question.numericTolerance).toBe(0.02);
    expect(data.question.numericUnit).toBe('m/s^2');

    const createdId = data.question.id;

    // Delete question
    const deleteReq = new NextRequest(`http://localhost:3000/api/cms/questions?id=${createdId}`, {
      method: 'DELETE',
    });
    const deleteRes = await DELETE(deleteReq);
    expect(deleteRes.status).toBe(200);
  });

  it('validates and rejects invalid question payloads', async () => {
    // Missing prompt
    const req1 = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'POST',
      body: JSON.stringify({
        topicId: testTopicId,
        questionType: 'mcq',
        prompt: '',
        explanation: 'Giải thích',
      }),
    });
    const res1 = await POST(req1);
    expect(res1.status).toBe(400);

    // MCQ with correct answer not in options
    const req2 = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'POST',
      body: JSON.stringify({
        topicId: testTopicId,
        questionType: 'mcq',
        prompt: 'Câu hỏi test',
        options: [
          { id: 'A', text: 'Option A' },
          { id: 'B', text: 'Option B' },
        ],
        correctAnswer: 'C', // 'C' is not in options
        explanation: 'Giải thích',
      }),
    });
    const res2 = await POST(req2);
    expect(res2.status).toBe(400);

    // Numeric with non-numeric correct answer
    const req3 = new NextRequest('http://localhost:3000/api/cms/questions', {
      method: 'POST',
      body: JSON.stringify({
        topicId: testTopicId,
        questionType: 'numeric',
        prompt: 'Câu hỏi tính toán',
        correctAnswer: 'khong-phai-so',
        explanation: 'Giải thích',
      }),
    });
    const res3 = await POST(req3);
    expect(res3.status).toBe(400);
  });
});
