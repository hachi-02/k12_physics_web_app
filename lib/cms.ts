/**
 * lib/cms.ts
 * CMS Service Library for managing K-12 Physics Curriculum Tree and Question Authoring.
 */

import { getDb } from './db';
import { getTierForGrade } from './grading';

export interface CMSTopicItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  grade: number;
  tier: string;
  orderNum: number;
  icon: string | null;
  lessonCount: number;
  questionCount: number;
}

export interface McqOptionItem {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  latex?: string;
}

export interface HintItem {
  level: number;
  hint: string;
  penalty_stars?: number;
}

export interface CMSQuestionItem {
  id: number;
  topicId: number;
  lessonId: number | null;
  questionType: 'mcq' | 'numeric';
  prompt: string;
  latexFormula: string | null;
  options: McqOptionItem[] | null;
  correctAnswer: string;
  numericTolerance: number;
  numericUnit: string | null;
  hints: HintItem[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  createdAt: string;
}

export interface CreateTopicInput {
  title: string;
  slug?: string;
  description?: string;
  grade: number;
  tier?: string;
  orderNum?: number;
  icon?: string;
}

export interface CreateQuestionInput {
  topicId: number;
  lessonId?: number | null;
  questionType: 'mcq' | 'numeric';
  prompt: string;
  latexFormula?: string | null;
  options?: McqOptionItem[] | null;
  correctAnswer: string;
  numericTolerance?: number;
  numericUnit?: string | null;
  hints?: HintItem[] | null;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'topic';
}

/**
 * Retrieve all topics with lesson and question counts, grouped/sorted by grade & order
 */
export function getAllTopicsWithStats(grade?: number): CMSTopicItem[] {
  const db = getDb();
  let sql = `
    SELECT 
      t.id,
      t.title,
      t.slug,
      t.description,
      t.grade,
      t.tier,
      t.order_num as orderNum,
      t.icon,
      (SELECT COUNT(*) FROM lessons l WHERE l.topic_id = t.id) as lessonCount,
      (SELECT COUNT(*) FROM questions q WHERE q.topic_id = t.id) as questionCount
    FROM physics_topics t
  `;
  const params: any[] = [];
  if (grade !== undefined && !isNaN(grade)) {
    sql += ` WHERE t.grade = ?`;
    params.push(grade);
  }
  sql += ` ORDER BY t.grade ASC, t.order_num ASC, t.id ASC`;

  const rows = db.query<any>(sql, params);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description,
    grade: r.grade,
    tier: r.tier,
    orderNum: r.orderNum,
    icon: r.icon,
    lessonCount: Number(r.lessonCount || 0),
    questionCount: Number(r.questionCount || 0),
  }));
}

/**
 * Get topic by ID
 */
export function getTopicById(id: number): CMSTopicItem | null {
  const db = getDb();
  const row = db.get<any>(
    `SELECT 
      t.id, t.title, t.slug, t.description, t.grade, t.tier, t.order_num as orderNum, t.icon,
      (SELECT COUNT(*) FROM lessons l WHERE l.topic_id = t.id) as lessonCount,
      (SELECT COUNT(*) FROM questions q WHERE q.topic_id = t.id) as questionCount
    FROM physics_topics t
    WHERE t.id = ?`,
    [id]
  );
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    grade: row.grade,
    tier: row.tier,
    orderNum: row.orderNum,
    icon: row.icon,
    lessonCount: Number(row.lessonCount || 0),
    questionCount: Number(row.questionCount || 0),
  };
}

/**
 * Create a new topic
 */
export function createTopic(input: CreateTopicInput): CMSTopicItem {
  const db = getDb();
  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Tiêu đề chuyên đề không được để trống');
  }
  if (!input.grade || input.grade < 1 || input.grade > 12) {
    throw new Error('Khối lớp phải từ 1 đến 12');
  }

  const tier = input.tier || getTierForGrade(input.grade);
  let baseSlug = input.slug ? slugify(input.slug) : slugify(input.title);
  let finalSlug = baseSlug;
  let counter = 1;

  // Ensure unique slug
  while (true) {
    const existing = db.get<{ id: number }>('SELECT id FROM physics_topics WHERE slug = ?', [finalSlug]);
    if (!existing) break;
    counter++;
    finalSlug = `${baseSlug}-${counter}`;
  }

  // Determine orderNum
  let orderNum = input.orderNum;
  if (!orderNum) {
    const maxOrder = db.get<{ max_o: number | null }>(
      'SELECT MAX(order_num) as max_o FROM physics_topics WHERE grade = ?',
      [input.grade]
    );
    orderNum = (maxOrder?.max_o || 0) + 1;
  }

  const res = db.run(
    `INSERT INTO physics_topics (title, slug, description, grade, tier, order_num, order_index, icon)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title.trim(),
      finalSlug,
      input.description?.trim() || null,
      input.grade,
      tier,
      orderNum,
      orderNum,
      input.icon || 'BookOpen',
    ]
  );

  const insertedId = Number(res.lastInsertRowid);
  const created = getTopicById(insertedId);
  if (!created) {
    throw new Error('Không thể tải chuyên đề vừa tạo');
  }
  return created;
}

/**
 * Update an existing topic
 */
export function updateTopic(id: number, input: Partial<CreateTopicInput>): CMSTopicItem {
  const db = getDb();
  const existing = getTopicById(id);
  if (!existing) {
    throw new Error(`Chuyên đề ID ${id} không tồn tại`);
  }

  const updates: string[] = [];
  const params: any[] = [];

  if (input.title !== undefined) {
    if (!input.title.trim()) throw new Error('Tiêu đề không được để trống');
    updates.push('title = ?');
    params.push(input.title.trim());
  }

  if (input.description !== undefined) {
    updates.push('description = ?');
    params.push(input.description ? input.description.trim() : null);
  }

  if (input.grade !== undefined) {
    if (input.grade < 1 || input.grade > 12) throw new Error('Khối lớp phải từ 1 đến 12');
    updates.push('grade = ?');
    params.push(input.grade);
    // Auto-update tier if grade changed and tier not provided
    if (input.tier === undefined) {
      updates.push('tier = ?');
      params.push(getTierForGrade(input.grade));
    }
  }

  if (input.tier !== undefined) {
    updates.push('tier = ?');
    params.push(input.tier);
  }

  if (input.orderNum !== undefined) {
    updates.push('order_num = ?', 'order_index = ?');
    params.push(input.orderNum, input.orderNum);
  }

  if (input.icon !== undefined) {
    updates.push('icon = ?');
    params.push(input.icon);
  }

  if (updates.length > 0) {
    updates.push("updated_at = CURRENT_TIMESTAMP");
    params.push(id);
    db.run(`UPDATE physics_topics SET ${updates.join(', ')} WHERE id = ?`, params);
  }

  return getTopicById(id)!;
}

/**
 * Delete a topic (and cascade questions, lessons)
 */
export function deleteTopic(id: number): boolean {
  const db = getDb();
  const existing = getTopicById(id);
  if (!existing) {
    throw new Error(`Chuyên đề ID ${id} không tồn tại`);
  }

  // Delete questions, lessons, and assignments first to guarantee FK integrity
  db.run('DELETE FROM questions WHERE topic_id = ?', [id]);
  db.run('DELETE FROM lessons WHERE topic_id = ?', [id]);
  db.run('DELETE FROM parent_assignments WHERE topic_id = ?', [id]);
  const res = db.run('DELETE FROM physics_topics WHERE id = ?', [id]);
  return res.changes > 0;
}

/**
 * Get all questions for a given topic
 */
export function getQuestionsForTopic(topicId: number): CMSQuestionItem[] {
  const db = getDb();
  const rows = db.query<any>(
    `SELECT 
      id, topic_id as topicId, lesson_id as lessonId, question_type as questionType,
      prompt, latex_formula as latexFormula, options, correct_answer as correctAnswer,
      numeric_tolerance as numericTolerance, numeric_unit as numericUnit,
      hints, explanation, difficulty, points, created_at as createdAt
    FROM questions
    WHERE topic_id = ?
    ORDER BY id ASC`,
    [topicId]
  );

  return rows.map((r) => {
    let parsedOptions: McqOptionItem[] | null = null;
    if (r.options) {
      try {
        parsedOptions = typeof r.options === 'string' ? JSON.parse(r.options) : r.options;
      } catch {
        parsedOptions = null;
      }
    }

    let parsedHints: HintItem[] = [];
    if (r.hints) {
      try {
        parsedHints = typeof r.hints === 'string' ? JSON.parse(r.hints) : r.hints;
      } catch {
        parsedHints = [];
      }
    }

    return {
      id: r.id,
      topicId: r.topicId,
      lessonId: r.lessonId,
      questionType: r.questionType,
      prompt: r.prompt,
      latexFormula: r.latexFormula,
      options: parsedOptions,
      correctAnswer: r.correctAnswer,
      numericTolerance: r.numericTolerance ?? 0.02,
      numericUnit: r.numericUnit,
      hints: parsedHints,
      explanation: r.explanation,
      difficulty: r.difficulty || 'medium',
      points: r.points || 10,
      createdAt: r.createdAt,
    };
  });
}

/**
 * Get single question by ID
 */
export function getQuestionById(id: number): CMSQuestionItem | null {
  const db = getDb();
  const r = db.get<any>(
    `SELECT 
      id, topic_id as topicId, lesson_id as lessonId, question_type as questionType,
      prompt, latex_formula as latexFormula, options, correct_answer as correctAnswer,
      numeric_tolerance as numericTolerance, numeric_unit as numericUnit,
      hints, explanation, difficulty, points, created_at as createdAt
    FROM questions
    WHERE id = ?`,
    [id]
  );
  if (!r) return null;

  let parsedOptions: McqOptionItem[] | null = null;
  if (r.options) {
    try {
      parsedOptions = typeof r.options === 'string' ? JSON.parse(r.options) : r.options;
    } catch {
      parsedOptions = null;
    }
  }

  let parsedHints: HintItem[] = [];
  if (r.hints) {
    try {
      parsedHints = typeof r.hints === 'string' ? JSON.parse(r.hints) : r.hints;
    } catch {
      parsedHints = [];
    }
  }

  return {
    id: r.id,
    topicId: r.topicId,
    lessonId: r.lessonId,
    questionType: r.questionType,
    prompt: r.prompt,
    latexFormula: r.latexFormula,
    options: parsedOptions,
    correctAnswer: r.correctAnswer,
    numericTolerance: r.numericTolerance ?? 0.02,
    numericUnit: r.numericUnit,
    hints: parsedHints,
    explanation: r.explanation,
    difficulty: r.difficulty || 'medium',
    points: r.points || 10,
    createdAt: r.createdAt,
  };
}

/**
 * Create a new question (MCQ or Numeric)
 */
export function createQuestion(input: CreateQuestionInput): CMSQuestionItem {
  const db = getDb();

  // Validate topic existence
  const topic = getTopicById(input.topicId);
  if (!topic) {
    throw new Error(`Chuyên đề ID ${input.topicId} không tồn tại`);
  }

  if (!input.prompt || input.prompt.trim().length === 0) {
    throw new Error('Nội dung câu hỏi không được để trống');
  }

  if (input.questionType !== 'mcq' && input.questionType !== 'numeric') {
    throw new Error('Loại câu hỏi phải là trắc nghiệm (mcq) hoặc điền số (numeric)');
  }

  let optionsJson: string | null = null;
  let correctAnswer = input.correctAnswer ? input.correctAnswer.trim() : '';

  if (input.questionType === 'mcq') {
    if (!input.options || !Array.isArray(input.options) || input.options.length < 2) {
      throw new Error('Câu hỏi trắc nghiệm phải có ít nhất 2 phương án đáp án');
    }
    // Verify each option has id and text
    for (const opt of input.options) {
      if (!opt.id || !opt.text || opt.text.trim().length === 0) {
        throw new Error('Mỗi phương án đáp án phải có ký hiệu (A, B, C, D) và nội dung');
      }
    }
    optionsJson = JSON.stringify(input.options);

    const validOptionIds = input.options.map((o) => o.id.toUpperCase());
    if (!validOptionIds.includes(correctAnswer.toUpperCase())) {
      throw new Error(`Đáp án đúng '${correctAnswer}' không khớp với bất kỳ phương án nào (${validOptionIds.join(', ')})`);
    }
    correctAnswer = correctAnswer.toUpperCase();
  } else {
    // Numeric question validation
    if (!correctAnswer) {
      throw new Error('Câu hỏi điền số phải có đáp án đúng dạng số');
    }
    const cleanNum = correctAnswer.replace(',', '.');
    if (isNaN(parseFloat(cleanNum))) {
      throw new Error(`Giá trị đáp án số không hợp lệ: '${correctAnswer}'`);
    }
  }

  if (!input.explanation || input.explanation.trim().length === 0) {
    throw new Error('Lời giải chi tiết không được để trống');
  }

  let hintsJson: string = '[]';
  if (input.hints && Array.isArray(input.hints)) {
    hintsJson = JSON.stringify(input.hints);
  }

  const res = db.run(
    `INSERT INTO questions (
      topic_id, lesson_id, question_type, prompt, question_text, latex_formula,
      options, options_json, correct_answer, numeric_tolerance, numeric_unit, unit,
      hints, hints_json, explanation, difficulty, points
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.topicId,
      input.lessonId || null,
      input.questionType,
      input.prompt.trim(),
      input.prompt.trim(),
      input.latexFormula || null,
      optionsJson,
      optionsJson,
      correctAnswer,
      input.numericTolerance ?? 0.02,
      input.numericUnit || null,
      input.numericUnit || null,
      hintsJson,
      hintsJson,
      input.explanation.trim(),
      input.difficulty || 'medium',
      input.points || 10,
    ]
  );

  const insertedId = Number(res.lastInsertRowid);
  const created = getQuestionById(insertedId);
  if (!created) {
    throw new Error('Không thể tải câu hỏi vừa tạo');
  }
  return created;
}

/**
 * Update an existing question
 */
export function updateQuestion(id: number, input: Partial<CreateQuestionInput>): CMSQuestionItem {
  const db = getDb();
  const existing = getQuestionById(id);
  if (!existing) {
    throw new Error(`Câu hỏi ID ${id} không tồn tại`);
  }

  const updates: string[] = [];
  const params: any[] = [];

  if (input.prompt !== undefined) {
    if (!input.prompt.trim()) throw new Error('Nội dung câu hỏi không được để trống');
    updates.push('prompt = ?', 'question_text = ?');
    params.push(input.prompt.trim(), input.prompt.trim());
  }

  if (input.latexFormula !== undefined) {
    updates.push('latex_formula = ?');
    params.push(input.latexFormula ? input.latexFormula.trim() : null);
  }

  if (input.options !== undefined) {
    const jsonStr = input.options ? JSON.stringify(input.options) : null;
    updates.push('options = ?', 'options_json = ?');
    params.push(jsonStr, jsonStr);
  }

  if (input.correctAnswer !== undefined) {
    updates.push('correct_answer = ?');
    params.push(input.correctAnswer.trim());
  }

  if (input.numericTolerance !== undefined) {
    updates.push('numeric_tolerance = ?');
    params.push(input.numericTolerance);
  }

  if (input.numericUnit !== undefined) {
    updates.push('numeric_unit = ?', 'unit = ?');
    params.push(input.numericUnit, input.numericUnit);
  }

  if (input.hints !== undefined) {
    const hintsStr = JSON.stringify(input.hints || []);
    updates.push('hints = ?', 'hints_json = ?');
    params.push(hintsStr, hintsStr);
  }

  if (input.explanation !== undefined) {
    if (!input.explanation.trim()) throw new Error('Lời giải chi tiết không được để trống');
    updates.push('explanation = ?');
    params.push(input.explanation.trim());
  }

  if (input.difficulty !== undefined) {
    updates.push('difficulty = ?');
    params.push(input.difficulty);
  }

  if (input.points !== undefined) {
    updates.push('points = ?');
    params.push(input.points);
  }

  if (updates.length > 0) {
    updates.push("updated_at = CURRENT_TIMESTAMP");
    params.push(id);
    db.run(`UPDATE questions SET ${updates.join(', ')} WHERE id = ?`, params);
  }

  return getQuestionById(id)!;
}

/**
 * Delete a question
 */
export function deleteQuestion(id: number): boolean {
  const db = getDb();
  const existing = getQuestionById(id);
  if (!existing) {
    throw new Error(`Câu hỏi ID ${id} không tồn tại`);
  }
  const res = db.run('DELETE FROM questions WHERE id = ?', [id]);
  return res.changes > 0;
}
