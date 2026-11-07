// tests/unit/db_schema.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

describe('Database Schema & Referential Integrity (M1)', () => {
  let db: Database.Database;

  beforeEach(() => {
    // Create an in-memory database for hermetic testing
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON;');

    // Load and execute schema DDL
    const schemaSql = fs.readFileSync(path.resolve(process.cwd(), 'lib/schema.sql'), 'utf-8');
    db.exec(schemaSql);
  });

  afterEach(() => {
    db.close();
  });

  describe('Table Existence & Structure', () => {
    const requiredTables = [
      'users',
      'family_links',
      'physics_topics',
      'lessons',
      'questions',
      'parent_assignments',
      'quiz_submissions',
      'student_gamification',
      'study_sessions',
    ];

    it.each(requiredTables)('should create table "%s"', (tableName) => {
      const result = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
        .get(tableName);
      expect(result).toBeDefined();
      expect((result as { name: string }).name).toBe(tableName);
    });
  });

  describe('Foreign Key Constraint Enforcement', () => {
    it('should reject insertion into family_links with non-existent parent_id', () => {
      expect(() => {
        db.prepare(
          'INSERT INTO family_links (parent_id, student_id, relationship) VALUES (?, ?, ?)'
        ).run(999, 1000, 'parent');
      }).toThrow(/FOREIGN KEY constraint failed/);
    });

    it('should reject insertion into lessons with non-existent topic_id', () => {
      expect(() => {
        db.prepare(
          'INSERT INTO lessons (topic_id, title, slug, content_markdown, parent_guide) VALUES (?, ?, ?, ?, ?)'
        ).run(999, 'Invalid Lesson', 'invalid-lesson', 'Content', '{}');
      }).toThrow(/FOREIGN KEY constraint failed/);
    });

    it('should reject insertion into questions with non-existent topic_id', () => {
      expect(() => {
        db.prepare(
          'INSERT INTO questions (topic_id, prompt, question_type, correct_answer, explanation) VALUES (?, ?, ?, ?, ?)'
        ).run(999, 'Sample Question', 'mcq', 'A', 'Explanation');
      }).toThrow(/FOREIGN KEY constraint failed/);
    });

    it('should cascade delete child lessons and questions when a topic is deleted', () => {
      // Insert a topic
      const topicResult = db.prepare(
        'INSERT INTO physics_topics (grade, tier, title, slug) VALUES (?, ?, ?, ?)'
      ).run(6, 'middle', 'Chuyên đề kiểm thử', 'chuyen-de-kiem-thu');
      const topicId = Number(topicResult.lastInsertRowid);

      // Insert child lesson
      const lessonResult = db.prepare(
        'INSERT INTO lessons (topic_id, title, slug, content_markdown, parent_guide) VALUES (?, ?, ?, ?, ?)'
      ).run(topicId, 'Bài học con', 'bai-hoc-con', 'Nội dung', '{}');
      const lessonId = Number(lessonResult.lastInsertRowid);

      // Insert child question
      db.prepare(
        'INSERT INTO questions (topic_id, lesson_id, prompt, question_type, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(topicId, lessonId, 'Câu hỏi con', 'mcq', 'A', 'Giải thích');

      // Verify records exist
      expect(db.prepare('SELECT id FROM lessons WHERE topic_id = ?').all(topicId)).toHaveLength(1);
      expect(db.prepare('SELECT id FROM questions WHERE topic_id = ?').all(topicId)).toHaveLength(1);

      // Delete parent topic
      db.prepare('DELETE FROM physics_topics WHERE id = ?').run(topicId);

      // Verify cascade deletion
      expect(db.prepare('SELECT id FROM lessons WHERE topic_id = ?').all(topicId)).toHaveLength(0);
      expect(db.prepare('SELECT id FROM questions WHERE topic_id = ?').all(topicId)).toHaveLength(0);
    });
  });

  describe('Check & Uniqueness Constraints', () => {
    it('should reject invalid user role', () => {
      expect(() => {
        db.prepare(
          'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)'
        ).run('testuser', 'hash', 'invalid_role', 'Test User');
      }).toThrow(/CHECK constraint failed/);
    });

    it('should reject grade outside 1-12 range for users', () => {
      expect(() => {
        db.prepare(
          'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)'
        ).run('student_bad_grade', 'hash', 'student', 'Student Bad Grade', 13);
      }).toThrow(/CHECK constraint failed/);
    });

    it('should reject duplicate family links for identical parent and student', () => {
      // Create valid parent and student
      const p = db.prepare('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)').run('parent1', 'h', 'parent', 'P1');
      const s = db.prepare('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)').run('student1', 'h', 'student', 'S1', 8);

      const pid = Number(p.lastInsertRowid);
      const sid = Number(s.lastInsertRowid);

      db.prepare('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)').run(pid, sid);

      expect(() => {
        db.prepare('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)').run(pid, sid);
      }).toThrow(/UNIQUE constraint failed/);
    });

    it('should prevent self-linking in family_links (parent_id != student_id)', () => {
      const u = db.prepare('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)').run('user1', 'h', 'student', 'U1');
      const uid = Number(u.lastInsertRowid);

      expect(() => {
        db.prepare('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)').run(uid, uid);
      }).toThrow(/CHECK constraint failed/);
    });
  });
});
