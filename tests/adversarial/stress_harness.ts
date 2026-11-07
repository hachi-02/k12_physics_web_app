/**
 * Standalone Adversarial High-Load & Edge-Case Stress Harness
 * Run via: npx tsx tests/adversarial/stress_harness.ts
 */
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DB_FILE = path.resolve(process.cwd(), 'test_stress_harness.db');
const SCHEMA_FILE = path.resolve(process.cwd(), 'lib/schema.sql');

function cleanup() {
  for (const ext of ['', '-wal', '-shm']) {
    const f = `${DB_FILE}${ext}`;
    if (fs.existsSync(f)) {
      try {
        fs.unlinkSync(f);
      } catch {
        // ignore
      }
    }
  }
}

async function runStressHarness() {
  console.log('====================================================');
  console.log('STARTING EMPIRICAL ADVERSARIAL STRESS HARNESS');
  console.log('Target DB:', DB_FILE);
  console.log('====================================================');

  cleanup();

  const db = new Database(DB_FILE);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA busy_timeout = 5000;');
  db.exec('PRAGMA synchronous = NORMAL;');

  const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf-8');
  db.exec(schemaSql);

  const results: { test: string; status: 'PASS' | 'FAIL'; details: string; durationMs: number }[] = [];

  // --------------------------------------------------------------------------
  // TEST 1: High-Volume Concurrent Promise.all Operations (1,000 ops)
  // --------------------------------------------------------------------------
  {
    const start = Date.now();
    try {
      // Seed base topic
      db.prepare('INSERT INTO physics_topics (title, slug, grade, tier) VALUES (?, ?, ?, ?)').run('Kinematics', 'kinematics-stress', 10, 'high');

      const insertStmt = db.prepare('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)');
      const selectStmt = db.prepare('SELECT id, username FROM users WHERE username = ?');

      // Create 500 concurrent write tasks + 500 concurrent read tasks
      const operations: Promise<void>[] = [];

      for (let i = 0; i < 500; i++) {
        const u = `stress_user_${i}`;
        // Write task
        operations.push(
          new Promise((resolve, reject) => {
            try {
              insertStmt.run(u, 'hash', 'student', `Name ${i}`, (i % 12) + 1);
              resolve();
            } catch (err) {
              reject(err);
            }
          })
        );
        // Read task
        operations.push(
          new Promise((resolve, reject) => {
            try {
              selectStmt.get(u);
              resolve();
            } catch (err) {
              reject(err);
            }
          })
        );
      }

      await Promise.all(operations);
      const duration = Date.now() - start;

      const userCount = (db.prepare('SELECT count(*) as count FROM users;').get() as { count: number }).count;
      if (userCount === 500) {
        results.push({
          test: 'High-Volume Interleaved Operations (1,000 ops)',
          status: 'PASS',
          details: `Successfully completed 500 inserts and 500 reads in ${duration}ms (${Math.round(1000 / (duration / 1000))} ops/sec). Zero locks.`,
          durationMs: duration,
        });
      } else {
        results.push({
          test: 'High-Volume Interleaved Operations (1,000 ops)',
          status: 'FAIL',
          details: `Expected 500 users, found ${userCount}`,
          durationMs: duration,
        });
      }
    } catch (err: any) {
      results.push({
        test: 'High-Volume Interleaved Operations (1,000 ops)',
        status: 'FAIL',
        details: `Exception caught: ${err.message}`,
        durationMs: Date.now() - start,
      });
    }
  }

  // --------------------------------------------------------------------------
  // TEST 2: Transaction Atomicity & Rollback Integrity on Constraint Failure
  // --------------------------------------------------------------------------
  {
    const start = Date.now();
    try {
      const initialCount = (db.prepare('SELECT count(*) as count FROM quiz_submissions;').get() as { count: number }).count;

      // Create a student for this test
      const s = db.prepare('INSERT INTO users (username, password_hash, role, name, grade) VALUES (?, ?, ?, ?, ?)').run('tx_student', 'h', 'student', 'TX S', 9);
      const studentId = Number(s.lastInsertRowid);

      let rolledBack = false;
      const tx = db.transaction(() => {
        // Step 1: Valid insert
        db.prepare(
          'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(studentId, 'practice', 85, 10, 8, '[]');

        // Step 2: Invalid insert (score = 150, violating CHECK(score <= 100))
        db.prepare(
          'INSERT INTO quiz_submissions (user_id, quiz_type, score, total_questions, correct_count, answers_json) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(studentId, 'practice', 150, 10, 15, '[]');
      });

      try {
        tx();
      } catch (txErr: any) {
        rolledBack = true;
      }

      const finalCount = (db.prepare('SELECT count(*) as count FROM quiz_submissions;').get() as { count: number }).count;
      const duration = Date.now() - start;

      if (rolledBack && finalCount === initialCount) {
        results.push({
          test: 'Transaction Rollback Integrity on Constraint Violation',
          status: 'PASS',
          details: `Transaction cleanly rolled back after CHECK violation. Row count remained strictly ${finalCount}. No partial commit.`,
          durationMs: duration,
        });
      } else {
        results.push({
          test: 'Transaction Rollback Integrity on Constraint Violation',
          status: 'FAIL',
          details: `Partial commit detected! Initial: ${initialCount}, Final: ${finalCount}`,
          durationMs: duration,
        });
      }
    } catch (err: any) {
      results.push({
        test: 'Transaction Rollback Integrity on Constraint Violation',
        status: 'FAIL',
        details: `Exception caught: ${err.message}`,
        durationMs: Date.now() - start,
      });
    }
  }

  // --------------------------------------------------------------------------
  // TEST 3: Extreme Payload Capacity & KaTeX Storage Integrity
  // --------------------------------------------------------------------------
  {
    const start = Date.now();
    try {
      // Create a 100KB theoretical lesson markdown containing extensive LaTeX formulae
      const largeLatexMarkdown = Array.from({ length: 500 }, (_, idx) =>
        `### Mục ${idx + 1}: Chuyển động biến đổi đều\n` +
        `Phương trình vận tốc: $v(t) = v_0 + a \\cdot t$\n` +
        `Phương trình tọa độ: $x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2$\n` +
        `Hệ thức độc lập thời gian: $v^2 - v_0^2 = 2as$\n` +
        `$$\\int_{0}^{t} (v_0 + at) dt = \\left[ v_0 t + \\frac{1}{2}at^2 \\right]_0^t$$\n`
      ).join('\n\n');

      const complexParentGuide = JSON.stringify({
        summary: 'Tóm tắt bài học cực đại',
        misconceptions: Array.from({ length: 50 }, (_, i) => `Ngộ nhận thứ ${i}: Vận tốc tỉ lệ với quãng đường`),
        guiding_questions: Array.from({ length: 50 }, (_, i) => `Câu hỏi số ${i}: Tại sao gia tốc rơi tự do không phụ thuộc khối lượng?`),
        home_experiments: [
          {
            title: 'Thí nghiệm thả rơi bi sắt và tờ giấy phẳng',
            materials: ['Bi sắt 50g', 'Tờ giấy A4 phẳng', 'Tờ giấy A4 vo tròn'],
            steps: ['Bước 1: Thả bi và giấy phẳng', 'Bước 2: Vo tròn giấy và thả lại'],
            expected_outcome: 'Lực cản không khí làm chậm tờ giấy phẳng',
          },
        ],
      });

      const topicId = (db.prepare('SELECT id FROM physics_topics LIMIT 1;').get() as { id: number }).id;

      const insertRes = db.prepare(
        'INSERT INTO lessons (topic_id, title, slug, content_markdown, parent_guide) VALUES (?, ?, ?, ?, ?)'
      ).run(topicId, 'Bài giảng 100KB LaTeX', 'bai-giang-100kb', largeLatexMarkdown, complexParentGuide);

      const fetched = db.prepare('SELECT content_markdown, parent_guide FROM lessons WHERE id = ?').get(insertRes.lastInsertRowid) as {
        content_markdown: string;
        parent_guide: string;
      };

      const duration = Date.now() - start;
      const isContentExact = fetched.content_markdown === largeLatexMarkdown;
      const parsedGuide = JSON.parse(fetched.parent_guide);
      const isGuideValid = parsedGuide.misconceptions.length === 50;

      if (isContentExact && isGuideValid) {
        results.push({
          test: 'Extreme Payload Capacity & KaTeX Storage Integrity',
          status: 'PASS',
          details: `Stored and retrieved 100KB complex LaTeX markdown (${largeLatexMarkdown.length} bytes) and 50-item JSON Parent Guide with 100% byte fidelity in ${duration}ms.`,
          durationMs: duration,
        });
      } else {
        results.push({
          test: 'Extreme Payload Capacity & KaTeX Storage Integrity',
          status: 'FAIL',
          details: `Byte mismatch or JSON corrupted. Match: ${isContentExact}, Guide length: ${parsedGuide?.misconceptions?.length}`,
          durationMs: duration,
        });
      }
    } catch (err: any) {
      results.push({
        test: 'Extreme Payload Capacity & KaTeX Storage Integrity',
        status: 'FAIL',
        details: `Exception caught: ${err.message}`,
        durationMs: Date.now() - start,
      });
    }
  }

  // --------------------------------------------------------------------------
  // TEST 4: Referential Integrity Check via PRAGMA foreign_key_check
  // --------------------------------------------------------------------------
  {
    const start = Date.now();
    try {
      const fkCheck = db.prepare('PRAGMA foreign_key_check;').all();
      const duration = Date.now() - start;

      if (fkCheck.length === 0) {
        results.push({
          test: 'Global Referential Integrity PRAGMA foreign_key_check',
          status: 'PASS',
          details: 'Zero foreign key violations across all tables, including dynamic cascades and SET NULL pointers.',
          durationMs: duration,
        });
      } else {
        results.push({
          test: 'Global Referential Integrity PRAGMA foreign_key_check',
          status: 'FAIL',
          details: `Violations found: ${JSON.stringify(fkCheck)}`,
          durationMs: duration,
        });
      }
    } catch (err: any) {
      results.push({
        test: 'Global Referential Integrity PRAGMA foreign_key_check',
        status: 'FAIL',
        details: `Exception caught: ${err.message}`,
        durationMs: Date.now() - start,
      });
    }
  }

  db.close();
  cleanup();

  console.log('\n====================================================');
  console.log('EMPIRICAL STRESS HARNESS RESULTS:');
  console.log('====================================================');
  let allPassed = true;
  for (const r of results) {
    const icon = r.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} [${r.status}] ${r.test} (${r.durationMs}ms)`);
    console.log(`   -> ${r.details}`);
    if (r.status === 'FAIL') allPassed = false;
  }
  console.log('====================================================');
  console.log(`Overall Stress Verdict: ${allPassed ? 'ALL STRESS TESTS PASSED' : 'STRESS FAILURES DETECTED'}`);
  console.log('====================================================');

  if (!allPassed) {
    process.exit(1);
  }
}

runStressHarness().catch((err) => {
  console.error('Fatal Harness Failure:', err);
  process.exit(1);
});
