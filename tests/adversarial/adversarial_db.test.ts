import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { getDb, resetDbForTesting } from '../../lib/db';

const SCHEMA_PATH = path.resolve(__dirname, '../../lib/schema.sql');

describe('Milestone 1 Adversarial Stress Test Suite', () => {
  let db: ReturnType<typeof resetDbForTesting>;

  beforeEach(() => {
    // Reset to fresh in-memory database for each test
    db = resetDbForTesting(true);
  });

  afterEach(() => {
    if (db && typeof db.close === 'function') {
      try {
        db.close();
      } catch {
        // ignore
      }
    }
  });

  // ==========================================================================
  // SECTION 1: SQL INJECTION RESILIENCE & PARAMETER BINDING
  // ==========================================================================
  describe('1. SQL Injection Resilience & Parameter Binding', () => {
    it('should resist classic stacked query injection (\'; DROP TABLE users; --)', () => {
      // Seed an initial user
      db.run(
        'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
        ['legit_user', 'hash123', 'student', 'Legit User']
      );

      const maliciousInput = "legit_user'; DROP TABLE users; --";

      // Attempt injection via db.get with parameter binding
      const result = db.get('SELECT * FROM users WHERE username = ?', [maliciousInput]);
      expect(result).toBeUndefined();

      // Verify users table still exists and data is intact
      const countResult = db.get<{ count: number }>('SELECT count(*) as count FROM users');
      expect(countResult?.count).toBe(1);
    });

    it('should resist tautology authentication bypass (\' OR \'1\'=\'1)', () => {
      db.run(
        'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
        ['admin_user', 'secret_pass', 'admin', 'Admin User']
      );

      const bypassUser = "' OR '1'='1";
      const bypassPass = "' OR '1'='1";

      const authenticated = db.get(
        'SELECT * FROM users WHERE username = ? AND password_hash = ?',
        [bypassUser, bypassPass]
      );

      expect(authenticated).toBeUndefined();
    });

    it('should resist comment injection (admin\' --)', () => {
      db.run(
        'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
        ['admin', 'secure_pass', 'admin', 'Real Admin']
      );

      const injectedUsername = "admin' --";
      const queryResult = db.get(
        'SELECT * FROM users WHERE username = ? AND password_hash = ?',
        [injectedUsername, 'wrong_pass']
      );

      expect(queryResult).toBeUndefined();
    });

    it('should resist UNION-based data exfiltration injection', () => {
      db.run(
        'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
        ['victim', 'victim_secret', 'student', 'Victim Student']
      );

      const unionPayload = "' UNION SELECT 999, 'hacked', 'pwned', 'Attacker', null, null, 'admin', null, null, null, null --";
      const rows = db.query('SELECT * FROM users WHERE username = ?', [unionPayload]);

      expect(rows).toHaveLength(0);
    });

    it('should safely store and retrieve adversarial payloads (LaTeX, HTML, JSON, Unicode, Null-bytes, Emojis)', () => {
      const complexPayloads = [
        // Complex LaTeX with backslashes, braces, superscripts, subscripts
        '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2} \\quad \\text{và} \\quad \\vec{F} = m \\frac{d\\vec{v}}{dt}',
        // XSS script tags and HTML entities
        '<script>alert("xss")</script><img src="x" onerror="eval(\'malicious\')"/>',
        // Vietnamese diacritics with extreme accents and emojis
        'Định luật bảo toàn năng lượng ⚡⚛️🔬: Cơ năng = Thế năng + Động năng ($W = W_t + W_d$)',
        // Nested JSON strings with escaped quotes
        '{"experiment": "Con lắc đơn", "notes": "Thử nghiệm \\"rơi tự do\\"", "sub": {"latex": "T = 2\\pi\\sqrt{\\frac{l}{g}}"}}',
        // Extreme length string (10,000 characters)
        'A'.repeat(10000),
      ];

      for (let i = 0; i < complexPayloads.length; i++) {
        const payload = complexPayloads[i];
        const res = db.run(
          'INSERT INTO physics_topics (title, slug, grade, tier, description) VALUES (?, ?, ?, ?, ?)',
          [`Topic ${i}`, `slug-payload-${i}`, 10, 'high', payload]
        );
        expect(res.changes).toBe(1);

        const fetched = db.get<{ description: string }>(
          'SELECT description FROM physics_topics WHERE id = ?',
          [res.lastInsertRowid]
        );
        expect(fetched?.description).toBe(payload);
      }
    });

    it('should correctly handle falsy bound parameters (0, false, empty string, null)', () => {
      const res = db.run(
        'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
        ['falsy_user', 'hash', 'student', '', null]
      );
      expect(res.changes).toBe(1);

      const user = db.get<{ name: string; grade: number | null }>(
        'SELECT name, grade FROM users WHERE id = ?',
        [res.lastInsertRowid]
      );
      expect(user?.name).toBe('');
      expect(user?.grade).toBeNull();
    });

    it('should throw an error when parameter count mismatches placeholders', () => {
      // Too few parameters
      expect(() => {
        db.query('SELECT * FROM users WHERE username = ? AND role = ?', ['only_one']);
      }).toThrow();

      // Too many parameters
      expect(() => {
        db.query('SELECT * FROM users WHERE username = ?', ['param1', 'extra_param2']);
      }).toThrow();
    });
  });

  // ==========================================================================
  // SECTION 2: CONSTRAINT ENFORCEMENT STRESS TESTING
  // ==========================================================================
  describe('2. Constraint Enforcement Stress Testing', () => {
    describe('Users Table Constraints', () => {
      it('should reject negative grade numbers in users (-1, -10)', () => {
        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
            ['neg_grade_1', 'hash', 'student', 'Neg One', -1]
          );
        }).toThrow(/CHECK constraint failed/);

        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
            ['neg_grade_10', 'hash', 'student', 'Neg Ten', -10]
          );
        }).toThrow(/CHECK constraint failed/);
      });

      it('should reject grade 0 in users (valid range is 1-12)', () => {
        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
            ['zero_grade', 'hash', 'student', 'Zero Grade', 0]
          );
        }).toThrow(/CHECK constraint failed/);
      });

      it('should reject grade > 12 in users (13, 100)', () => {
        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
            ['grade_13', 'hash', 'student', 'Grade 13', 13]
          );
        }).toThrow(/CHECK constraint failed/);

        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
            ['grade_100', 'hash', 'student', 'Grade 100', 100]
          );
        }).toThrow(/CHECK constraint failed/);
      });

      it('should accept boundary grades 1 and 12, and NULL grade (for parents/admins)', () => {
        const u1 = db.run(
          'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
          ['grade_1', 'hash', 'student', 'Grade 1', 1]
        );
        const u12 = db.run(
          'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
          ['grade_12', 'hash', 'student', 'Grade 12', 12]
        );
        const uNull = db.run(
          'INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)',
          ['parent_null', 'hash', 'parent', 'Parent Null', null]
        );

        expect(u1.changes).toBe(1);
        expect(u12.changes).toBe(1);
        expect(uNull.changes).toBe(1);
      });

      it('should reject invalid user roles (teacher, guest, superadmin, empty, case-sensitive)', () => {
        const invalidRoles = ['teacher', 'guest', 'superadmin', 'ADMIN', 'STUDENT', '', 'parent '];
        for (const role of invalidRoles) {
          expect(() => {
            db.run(
              'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
              [`user_${role.replace(/\s+/g, '_')}`, 'hash', role, 'Test']
            );
          }).toThrow(/CHECK constraint failed/);
        }
      });

      it('should reject duplicate usernames (UNIQUE constraint)', () => {
        db.run(
          'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
          ['duplicate_user', 'hash', 'student', 'Original']
        );

        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
            ['duplicate_user', 'hash2', 'parent', 'Imposter']
          );
        }).toThrow(/UNIQUE constraint failed.*users\.username/);
      });

      it('should reject duplicate empty string usernames if inserted twice', () => {
        db.run(
          'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
          ['', 'hash', 'student', 'Empty 1']
        );

        expect(() => {
          db.run(
            'INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)',
            ['', 'hash', 'parent', 'Empty 2']
          );
        }).toThrow(/UNIQUE constraint failed.*users\.username/);
      });
    });

    describe('Family Links Table Constraints', () => {
      it('should reject duplicate family links for same parent and student', () => {
        const p = db.run('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)', ['p_dup', 'h', 'parent', 'P']);
        const s = db.run('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)', ['s_dup', 'h', 'student', 'S', 5]);

        const pid = Number(p.lastInsertRowid);
        const sid = Number(s.lastInsertRowid);

        db.run('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)', [pid, sid]);

        expect(() => {
          db.run('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)', [pid, sid]);
        }).toThrow(/UNIQUE constraint failed.*family_links\.parent_id, family_links\.student_id/);
      });

      it('should reject self-linking in family_links (parent_id == student_id)', () => {
        const u = db.run('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)', ['u_self', 'h', 'parent', 'U']);
        const uid = Number(u.lastInsertRowid);

        expect(() => {
          db.run('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)', [uid, uid]);
        }).toThrow(/CHECK constraint failed.*parent_id != student_id/);
      });
    });

    describe('Physics Topics Constraints', () => {
      it('should reject invalid topic grades (-1, 0, 13, null)', () => {
        expect(() => {
          db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Bad Topic', 'slug-bad-1', -1, 'primary']);
        }).toThrow(/CHECK constraint failed/);

        expect(() => {
          db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Bad Topic', 'slug-bad-0', 0, 'primary']);
        }).toThrow(/CHECK constraint failed/);

        expect(() => {
          db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Bad Topic', 'slug-bad-13', 13, 'high']);
        }).toThrow(/CHECK constraint failed/);

        expect(() => {
          db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Bad Topic', 'slug-bad-null', null, 'high']);
        }).toThrow(/NOT NULL constraint failed/);
      });

      it('should reject invalid tiers in physics_topics', () => {
        const invalidTiers = ['kindergarten', 'college', 'PRIMARY', 'middle ', ''];
        for (const tier of invalidTiers) {
          expect(() => {
            db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['T', `slug-${tier}`, 6, tier]);
          }).toThrow(/CHECK constraint failed/);
        }
      });

      it('should reject duplicate topic slugs', () => {
        db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Topic A', 'unique-slug', 1, 'primary']);

        expect(() => {
          db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Topic B', 'unique-slug', 2, 'primary']);
        }).toThrow(/UNIQUE constraint failed.*physics_topics\.slug/);
      });
    });

    describe('Questions & Quizzes Constraints', () => {
      let validTopicId: number;

      beforeEach(() => {
        const t = db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Optics', 'optics-test', 7, 'middle']);
        validTopicId = Number(t.lastInsertRowid);
      });

      it('should reject invalid question_type (essay, true_false, multi_select, MCQ, empty)', () => {
        const invalidTypes = ['essay', 'true_false', 'multi_select', 'MCQ', 'NUMERIC', ''];
        for (const qType of invalidTypes) {
          expect(() => {
            db.run(
              'INSERT INTO questions (topic_id, question_type, prompt, correct_answer, explanation) VALUES (?, ?, ?, ?, ?)',
              [validTopicId, qType, 'Prompt', 'A', 'Expl']
            );
          }).toThrow(/CHECK constraint failed/);
        }
      });

      it('should reject invalid question difficulty (expert, insane, EASY)', () => {
        expect(() => {
          db.run(
            'INSERT INTO questions (topic_id, question_type, prompt, correct_answer, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?)',
            [validTopicId, 'mcq', 'Prompt', 'A', 'Expl', 'expert']
          );
        }).toThrow(/CHECK constraint failed/);
      });

      it('should enforce quiz_submissions score boundary (0 <= score <= 100)', () => {
        const u = db.run('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)', ['quiz_user', 'h', 'student', 'Q', 7]);
        const uid = Number(u.lastInsertRowid);

        // Negative score (-1, -0.01) must fail
        expect(() => {
          db.run(
            'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
            [uid, 'practice', -1, 10, 0, '[]']
          );
        }).toThrow(/CHECK constraint failed/);

        // Score > 100 (100.1, 150) must fail
        expect(() => {
          db.run(
            'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
            [uid, 'practice', 100.1, 10, 10, '[]']
          );
        }).toThrow(/CHECK constraint failed/);

        // Valid boundary scores (0.0, 100.0, 75.5) must succeed
        const s0 = db.run(
          'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
          [uid, 'practice', 0.0, 10, 0, '[]']
        );
        const s100 = db.run(
          'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
          [uid, 'exam', 100.0, 10, 10, '[]']
        );
        const s75 = db.run(
          'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
          [uid, 'assignment', 75.5, 10, 7, '[]']
        );

        expect(s0.changes).toBe(1);
        expect(s100.changes).toBe(1);
        expect(s75.changes).toBe(1);
      });

      it('should reject invalid quiz_type in quiz_submissions', () => {
        const u = db.run('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)', ['quiz_user2', 'h', 'student', 'Q2', 7]);
        const uid = Number(u.lastInsertRowid);

        expect(() => {
          db.run(
            'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)',
            [uid, 'diagnostic', 80, 10, 8, '[]']
          );
        }).toThrow(/CHECK constraint failed/);
      });
    });

    describe('Gamification & Study Sessions Constraints', () => {
      let studentId: number;

      beforeEach(() => {
        const s = db.run('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)', ['student_gam', 'h', 'student', 'SG', 8]);
        studentId = Number(s.lastInsertRowid);
      });

      it('should reject negative gamification values (stars, streaks, level < 1)', () => {
        // Negative stars
        expect(() => {
          db.run('INSERT INTO student_gamification (student_id, stars) VALUES (?, ?)', [studentId, -5]);
        }).toThrow(/CHECK constraint failed/);

        // Negative streak
        expect(() => {
          db.run('INSERT INTO student_gamification (student_id, current_streak) VALUES (?, ?)', [studentId, -1]);
        }).toThrow(/CHECK constraint failed/);

        // Level 0
        expect(() => {
          db.run('INSERT INTO student_gamification (student_id, level) VALUES (?, ?)', [studentId, 0]);
        }).toThrow(/CHECK constraint failed/);
      });

      it('should reject duplicate gamification records for the same student', () => {
        db.run('INSERT INTO student_gamification (student_id, stars, level) VALUES (?, ?, ?)', [studentId, 100, 2]);

        expect(() => {
          db.run('INSERT INTO student_gamification (student_id, stars, level) VALUES (?, ?, ?)', [studentId, 50, 1]);
        }).toThrow(/UNIQUE constraint failed.*student_gamification\.student_id/);
      });

      it('should reject negative duration and invalid session_type in study_sessions', () => {
        // Negative duration
        expect(() => {
          db.run(
            'INSERT INTO study_sessions (student_id, session_type, duration_seconds) VALUES (?, ?, ?)',
            [studentId, 'learn', -10]
          );
        }).toThrow(/CHECK constraint failed/);

        // Invalid session type
        expect(() => {
          db.run(
            'INSERT INTO study_sessions (student_id, session_type, duration_seconds) VALUES (?, ?, ?)',
            [studentId, 'gaming', 600]
          );
        }).toThrow(/CHECK constraint failed/);
      });
    });
  });

  // ==========================================================================
  // SECTION 3: CASCADE DELETION INTEGRITY
  // ==========================================================================
  describe('3. Cascade Deletion Integrity Stress Testing', () => {
    it('should cleanly cascade delete all child entities when a parent or student user is deleted without orphan records', () => {
      // 1. Create Parent and Student
      const parentRes = db.run('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)', ['par_casc', 'h', 'parent', 'Parent Casc']);
      const studentRes = db.run('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)', ['stu_casc', 'h', 'student', 'Student Casc', 8]);
      const parentId = Number(parentRes.lastInsertRowid);
      const studentId = Number(studentRes.lastInsertRowid);

      // 2. Create Topic and Lesson
      const topicRes = db.run('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)', ['Topic Casc', 'topic-casc', 8, 'middle']);
      const topicId = Number(topicRes.lastInsertRowid);

      const lessonRes = db.run('INSERT INTO lessons (topic_id, title, slug, content_markdown, parent_guide) VALUES (?, ?, ?, ?, ?)', [topicId, 'Lesson Casc', 'lesson-casc', '# Content', '{}']);
      const lessonId = Number(lessonRes.lastInsertRowid);

      // 3. Create Question
      const questionRes = db.run('INSERT INTO questions (topic_id, lesson_id, question_type, prompt, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?)', [topicId, lessonId, 'mcq', 'Q?', 'A', 'E']);
      const questionId = Number(questionRes.lastInsertRowid);

      // 4. Create Family Link
      db.run('INSERT INTO family_links (parent_id, student_id) VALUES (?, ?)', [parentId, studentId]);

      // 5. Create Parent Assignment
      const assignRes = db.run(
        'INSERT INTO parent_assignments (parent_id, student_id, topic_id, lesson_id, title) VALUES (?, ?, ?, ?, ?)',
        [parentId, studentId, topicId, lessonId, 'Homework 1']
      );
      const assignmentId = Number(assignRes.lastInsertRowid);

      // 6. Create Quiz Submission linked to User and Assignment
      const subRes = db.run(
        'INSERT INTO quiz_submissions (user_id, quiz_type, topic_id, lesson_id, assignment_id, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [studentId, 'assignment', topicId, lessonId, assignmentId, 95.0, 10, 9, '[]']
      );
      const submissionId = Number(subRes.lastInsertRowid);

      // 7. Create Gamification Record
      db.run('INSERT INTO student_gamification (student_id, stars, level) VALUES (?, ?, ?)', [studentId, 250, 3]);

      // 8. Create Study Session
      db.run('INSERT INTO study_sessions (student_id, topic_id, lesson_id, session_type, duration_seconds) VALUES (?, ?, ?, ?, ?)', [studentId, topicId, lessonId, 'practice', 1200]);

      // Verify all records exist before deletion
      expect(db.get('SELECT id FROM family_links WHERE parent_id = ?', [parentId])).toBeDefined();
      expect(db.get('SELECT id FROM parent_assignments WHERE parent_id = ?', [parentId])).toBeDefined();
      expect(db.get('SELECT id FROM quiz_submissions WHERE user_id = ?', [studentId])).toBeDefined();
      expect(db.get('SELECT id FROM student_gamification WHERE student_id = ?', [studentId])).toBeDefined();
      expect(db.get('SELECT id FROM study_sessions WHERE student_id = ?', [studentId])).toBeDefined();

      // Verify PRAGMA foreign_key_check is completely clean
      const initialFkCheck = db.query('PRAGMA foreign_key_check;');
      expect(initialFkCheck).toHaveLength(0);

      // ========================================================
      // STEP A: Delete Parent User
      // ========================================================
      db.run('DELETE FROM users WHERE id = ?', [parentId]);

      // Assert family_links for parentId was cascade deleted
      expect(db.get('SELECT id FROM family_links WHERE parent_id = ?', [parentId])).toBeUndefined();

      // Assert parent_assignments for parentId was cascade deleted
      expect(db.get('SELECT id FROM parent_assignments WHERE parent_id = ?', [parentId])).toBeUndefined();

      // Assert the quiz submission assignment_id was SET NULL (per foreign key ON DELETE SET NULL)
      const subAfterParentDelete = db.get<{ assignment_id: number | null }>(
        'SELECT assignment_id FROM quiz_submissions WHERE id = ?',
        [submissionId]
      );
      expect(subAfterParentDelete?.assignment_id).toBeNull();

      // Student and its data should still exist
      expect(db.get('SELECT id FROM users WHERE id = ?', [studentId])).toBeDefined();
      expect(db.get('SELECT id FROM student_gamification WHERE student_id = ?', [studentId])).toBeDefined();

      // Foreign keys must remain 100% valid
      expect(db.query('PRAGMA foreign_key_check;')).toHaveLength(0);

      // ========================================================
      // STEP B: Delete Student User
      // ========================================================
      db.run('DELETE FROM users WHERE id = ?', [studentId]);

      // Verify student's submissions, gamification, and study sessions are completely gone
      expect(db.get('SELECT id FROM quiz_submissions WHERE user_id = ?', [studentId])).toBeUndefined();
      expect(db.get('SELECT id FROM student_gamification WHERE student_id = ?', [studentId])).toBeUndefined();
      expect(db.get('SELECT id FROM study_sessions WHERE student_id = ?', [studentId])).toBeUndefined();

      // Foreign keys must remain 100% valid
      expect(db.query('PRAGMA foreign_key_check;')).toHaveLength(0);

      // ========================================================
      // STEP C: Delete Topic
      // ========================================================
      db.run('DELETE FROM physics_topics WHERE id = ?', [topicId]);

      // Lessons and questions must be cascade deleted
      expect(db.get('SELECT id FROM lessons WHERE id = ?', [lessonId])).toBeUndefined();
      expect(db.get('SELECT id FROM questions WHERE id = ?', [questionId])).toBeUndefined();

      // Zero foreign key violations
      expect(db.query('PRAGMA foreign_key_check;')).toHaveLength(0);
    });
  });

  // ==========================================================================
  // SECTION 4: CONCURRENCY & WAL MODE STRESS TESTING
  // ==========================================================================
  describe('4. Concurrency & WAL Mode Stress Testing', () => {
    function cleanupDbFiles(basePath: string) {
      for (const ext of ['', '-wal', '-shm']) {
        const p = `${basePath}${ext}`;
        if (fs.existsSync(p)) {
          try {
            fs.unlinkSync(p);
          } catch {
            // ignore
          }
        }
      }
    }

    it('should verify WAL mode and busy_timeout PRAGMAs on a disk-backed database', () => {
      const dbPath = path.resolve(process.cwd(), 'test_wal_pragma.db');
      cleanupDbFiles(dbPath);

      // Create disk database via Database directly mimicking lib/db.ts
      const diskDb = new Database(dbPath);
      diskDb.exec('PRAGMA foreign_keys = ON;');
      diskDb.exec('PRAGMA journal_mode = WAL;');
      diskDb.exec('PRAGMA busy_timeout = 5000;');
      diskDb.exec('PRAGMA synchronous = NORMAL;');

      const journalMode = diskDb.prepare('PRAGMA journal_mode;').get() as { journal_mode: string };
      const busyTimeout = diskDb.prepare('PRAGMA busy_timeout;').get() as { timeout: number };
      const foreignKeys = diskDb.prepare('PRAGMA foreign_keys;').get() as { foreign_keys: number };

      expect(journalMode.journal_mode.toLowerCase()).toBe('wal');
      expect(busyTimeout.timeout).toBe(5000);
      expect(foreignKeys.foreign_keys).toBe(1);

      diskDb.close();
      cleanupDbFiles(dbPath);
    });

    it('should sustain rapid interleaved queries without deadlock or corruption', () => {
      const dbPath = path.resolve(process.cwd(), 'test_wal_interleaved.db');
      cleanupDbFiles(dbPath);

      const diskDb = new Database(dbPath);
      const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf-8');
      diskDb.exec(schemaSql);
      diskDb.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');

      // Insert 1 topic
      diskDb.prepare('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)').run('Mechanics', 'mechanics-wal', 10, 'high');

      // Execute 300 rapid interleaved read and write operations
      const insertUser = diskDb.prepare('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)');
      const selectUser = diskDb.prepare('SELECT * FROM users WHERE username = ?');
      const countUsers = diskDb.prepare('SELECT count(*) as count FROM users');

      for (let i = 0; i < 150; i++) {
        insertUser.run(`user_wal_${i}`, 'hash', 'student', `Student ${i}`, (i % 12) + 1);
        const row = selectUser.get(`user_wal_${i}`) as { username: string; grade: number };
        expect(row.username).toBe(`user_wal_${i}`);
      }

      const total = countUsers.get() as { count: number };
      expect(total.count).toBe(150);

      diskDb.close();
      cleanupDbFiles(dbPath);
    });

    it('should allow concurrent readers while a writer connection performs long transactions (WAL isolation)', () => {
      const dbPath = path.resolve(process.cwd(), 'test_wal_isolation.db');
      cleanupDbFiles(dbPath);

      const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf-8');

      // Initialize Disk Database with WAL mode
      const initDb = new Database(dbPath);
      initDb.exec(schemaSql);
      initDb.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
      initDb.prepare('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)').run('initial_user', 'hash', 'student', 'Initial');
      initDb.close();

      // Open Connection A (Writer) and Connection B (Reader)
      const writerDb = new Database(dbPath);
      const readerDb = new Database(dbPath);

      writerDb.exec('PRAGMA busy_timeout = 5000;');
      readerDb.exec('PRAGMA busy_timeout = 5000;');

      // Begin an explicit transaction on Writer
      writerDb.exec('BEGIN IMMEDIATE TRANSACTION;');
      const insertStmt = writerDb.prepare('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)');
      for (let i = 0; i < 50; i++) {
        insertStmt.run(`tx_user_${i}`, 'hash', 'student', `Tx User ${i}`);
      }

      // Concurrently query from Reader WHILE Writer transaction is still uncommitted!
      // In WAL mode, the reader reads the snapshot before the transaction started.
      const readerCountBeforeCommit = readerDb.prepare('SELECT count(*) as count FROM users;').get() as { count: number };
      expect(readerCountBeforeCommit.count).toBe(1); // Only sees committed initial_user!

      // Commit transaction on Writer
      writerDb.exec('COMMIT;');

      // Concurrently query from Reader AFTER commit
      const readerCountAfterCommit = readerDb.prepare('SELECT count(*) as count FROM users;').get() as { count: number };
      expect(readerCountAfterCommit.count).toBe(51); // Now sees all committed users!

      writerDb.close();
      readerDb.close();
      cleanupDbFiles(dbPath);
    });

    it('should serialize concurrent writers with busy_timeout without SQLITE_BUSY crash', () => {
      const dbPath = path.resolve(process.cwd(), 'test_wal_multiconn.db');
      cleanupDbFiles(dbPath);

      const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf-8');

      const initDb = new Database(dbPath);
      initDb.exec(schemaSql);
      initDb.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
      initDb.close();

      // Create 3 independent connection handles
      const conns = [
        new Database(dbPath),
        new Database(dbPath),
        new Database(dbPath),
      ];

      for (const c of conns) {
        c.exec('PRAGMA busy_timeout = 5000;');
      }

      // Perform interleaved sequential transactions across separate connections
      for (let cycle = 0; cycle < 10; cycle++) {
        for (let connIdx = 0; connIdx < conns.length; connIdx++) {
          const conn = conns[connIdx];
          conn.prepare('INSERT INTO users (username, password_hash, role, name) VALUES (?, ?, ?, ?)').run(
            `conn_${connIdx}_cycle_${cycle}`,
            'hash',
            'student',
            `User C${connIdx}_${cycle}`
          );
        }
      }

      const verifyDb = new Database(dbPath);
      const total = verifyDb.prepare('SELECT count(*) as count FROM users;').get() as { count: number };
      expect(total.count).toBe(30);

      for (const c of conns) {
        c.close();
      }
      verifyDb.close();
      cleanupDbFiles(dbPath);
    });
  });
});
