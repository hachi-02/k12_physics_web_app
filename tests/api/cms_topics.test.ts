import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST, PUT, DELETE } from '@/app/api/cms/topics/route';
import { getDb } from '@/lib/db';

describe('CMS Topics API Suite (/api/cms/topics)', () => {
  it('GET /api/cms/topics returns all topics with lesson and question counts', async () => {
    const req = new NextRequest('http://localhost:3000/api/cms/topics');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.topics)).toBe(true);
    expect(data.topics.length).toBeGreaterThan(0);

    const first = data.topics[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('grade');
    expect(first).toHaveProperty('tier');
    expect(first).toHaveProperty('lessonCount');
    expect(first).toHaveProperty('questionCount');
    expect(typeof first.lessonCount).toBe('number');
  });

  it('GET /api/cms/topics?grade=10 filters topics strictly for Grade 10', async () => {
    const req = new NextRequest('http://localhost:3000/api/cms/topics?grade=10');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.topics.length).toBeGreaterThan(0);
    for (const t of data.topics) {
      expect(t.grade).toBe(10);
    }
  });

  it('POST /api/cms/topics creates a new topic with auto-slug and tier deduction', async () => {
    const newTopicPayload = {
      title: 'Kiểm thử Chuyên đề Mới CMS 10',
      grade: 10,
      description: 'Mô tả chuyên đề kiểm thử tự động',
      icon: 'Atom',
    };

    const req = new NextRequest('http://localhost:3000/api/cms/topics', {
      method: 'POST',
      body: JSON.stringify(newTopicPayload),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.topic.id).toBeDefined();
    expect(data.topic.title).toBe(newTopicPayload.title);
    expect(data.topic.grade).toBe(10);
    expect(data.topic.tier).toBe('high'); // Auto-deduced tier for grade 10
    expect(data.topic.slug).toBeDefined();

    const createdId = data.topic.id;

    // Test PUT: update the newly created topic
    const updateReq = new NextRequest('http://localhost:3000/api/cms/topics', {
      method: 'PUT',
      body: JSON.stringify({
        id: createdId,
        title: 'Chuyên đề Đã Cập Nhật',
        description: 'Mô tả mới',
      }),
    });
    const updateRes = await PUT(updateReq);
    const updateData = await updateRes.json();

    expect(updateRes.status).toBe(200);
    expect(updateData.success).toBe(true);
    expect(updateData.topic.title).toBe('Chuyên đề Đã Cập Nhật');

    // Test DELETE: delete the newly created topic
    const deleteReq = new NextRequest(`http://localhost:3000/api/cms/topics?id=${createdId}`, {
      method: 'DELETE',
    });
    const deleteRes = await DELETE(deleteReq);
    const deleteData = await deleteRes.json();

    expect(deleteRes.status).toBe(200);
    expect(deleteData.success).toBe(true);

    // Verify it is deleted
    const verifyReq = new NextRequest(`http://localhost:3000/api/cms/topics?grade=10`);
    const verifyRes = await GET(verifyReq);
    const verifyData = await verifyRes.json();
    const found = verifyData.topics.find((t: any) => t.id === createdId);
    expect(found).toBeUndefined();
  });

  it('rejects POST with missing title or invalid grade', async () => {
    // Missing title
    const req1 = new NextRequest('http://localhost:3000/api/cms/topics', {
      method: 'POST',
      body: JSON.stringify({ title: '', grade: 8 }),
    });
    const res1 = await POST(req1);
    const data1 = await res1.json();
    expect(res1.status).toBe(400);
    expect(data1.success).toBe(false);

    // Invalid grade (13)
    const req2 = new NextRequest('http://localhost:3000/api/cms/topics', {
      method: 'POST',
      body: JSON.stringify({ title: 'Topic Lạ', grade: 15 }),
    });
    const res2 = await POST(req2);
    const data2 = await res2.json();
    expect(res2.status).toBe(400);
    expect(data2.success).toBe(false);
  });
});
