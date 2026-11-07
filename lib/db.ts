import fs from 'node:fs';
import path from 'node:path';

/**
 * Uniform Database Client Contract as specified in PROJECT.md
 */
export interface DatabaseRunResult {
  changes: number;
  lastInsertRowid: number | bigint;
}

export interface DatabaseClient {
  query<T = any>(sql: string, params?: any[]): T[];
  get<T = any>(sql: string, params?: any[]): T | undefined;
  run(sql: string, params?: any[]): DatabaseRunResult;
  exec(sql: string): void;
  close?: () => void;
  readonly driver: 'better-sqlite3' | 'node:sqlite';
}

// Global handle to survive Next.js Fast-Refresh / HMR in development
declare global {
  // eslint-disable-next-line no-var
  var _k12_sqlite_db_instance: DatabaseClient | undefined;
}

/**
 * Low-level driver factory supporting better-sqlite3 with seamless node:sqlite fallback
 */
function createRawConnection(dbPath: string): {
  driver: 'better-sqlite3' | 'node:sqlite';
  raw: any;
  prepare: (sql: string) => {
    all: (...params: any[]) => any[];
    get: (...params: any[]) => any;
    run: (...params: any[]) => DatabaseRunResult;
  };
  exec: (sql: string) => void;
  close: () => void;
} {
  // Option A: Try better-sqlite3
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const BetterSqlite3 = require('better-sqlite3');
    const raw = new BetterSqlite3(dbPath);
    return {
      driver: 'better-sqlite3',
      raw,
      prepare(sql: string) {
        const stmt = raw.prepare(sql);
        return {
          all: (...params: any[]) => stmt.all(...params),
          get: (...params: any[]) => stmt.get(...params),
          run: (...params: any[]) => stmt.run(...params),
        };
      },
      exec(sql: string) {
        raw.exec(sql);
      },
      close() {
        raw.close();
      },
    };
  } catch (err: any) {
    if (process.env.DEBUG_SQLITE) {
      console.warn('[Database] better-sqlite3 not available, attempting native node:sqlite fallback:', err.message);
    }
  }

  // Option B: Native node:sqlite DatabaseSync (Node 22.5.0+ and 24+)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require('node:sqlite');
    const raw = new DatabaseSync(dbPath);
    return {
      driver: 'node:sqlite',
      raw,
      prepare(sql: string) {
        const stmt = raw.prepare(sql);
        return {
          all: (...params: any[]) => stmt.all(...params),
          get: (...params: any[]) => stmt.get(...params),
          run: (...params: any[]) => {
            const res = stmt.run(...params);
            return {
              changes: Number(res.changes || 0),
              lastInsertRowid: res.lastInsertRowid !== undefined ? res.lastInsertRowid : 0,
            };
          },
        };
      },
      exec(sql: string) {
        raw.exec(sql);
      },
      close() {
        raw.close();
      },
    };
  } catch (err: any) {
    throw new Error(
      `[Database] Fatal: Unable to initialize SQLite connection. Neither 'better-sqlite3' nor 'node:sqlite' ` +
      `is available in this Node runtime (${process.version}). Error: ${err.message}`
    );
  }
}

/**
 * Auto-initialization routine: Executes schema.sql if tables do not exist
 */
function ensureSchemaInitialized(client: DatabaseClient): void {
  try {
    const tableCheck = client.get<{ count: number }>(
      "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'"
    );

    if (!tableCheck || tableCheck.count === 0) {
      const possiblePaths = [
        process.env.SCHEMA_PATH,
        path.join(process.cwd(), 'lib', 'schema.sql'),
        path.join(process.cwd(), 'schema.sql'),
        typeof __dirname !== 'undefined' ? path.join(__dirname, 'schema.sql') : null,
      ].filter(Boolean) as string[];

      let schemaSql: string | null = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          schemaSql = fs.readFileSync(p, 'utf8');
          break;
        }
      }

      if (schemaSql) {
        client.exec(schemaSql);
      } else {
        console.warn('[Database] Warning: schema.sql file could not be located during auto-initialization.');
      }
    }
  } catch (error: any) {
    console.error('[Database] Error verifying or initializing schema:', error.message);
    throw error;
  }
}

/**
 * Initializes and returns a DatabaseClient instance with PRAGMAs configured
 */
function initDatabaseInstance(dbPath: string): DatabaseClient {
  const conn = createRawConnection(dbPath);

  // Apply critical SQLite PRAGMAs
  // 1. WAL mode for concurrent readers and writer (except in-memory)
  // 2. foreign_keys for referential cascade integrity
  // 3. busy_timeout so concurrent writes wait up to 5s before failing
  // 4. synchronous NORMAL for optimal WAL disk throughput
  try {
    conn.exec('PRAGMA foreign_keys = ON;');
    if (dbPath !== ':memory:') {
      conn.exec(`
        PRAGMA journal_mode = WAL;
        PRAGMA busy_timeout = 5000;
        PRAGMA synchronous = NORMAL;
      `);
    }
  } catch (pragmaErr: any) {
    // If WAL fails on special filesystems, keep foreign_keys
    console.warn('[Database] Notice during PRAGMA setup:', pragmaErr.message);
  }

  const client: DatabaseClient = {
    driver: conn.driver,
    query<T = any>(sql: string, params: any[] = []): T[] {
      return conn.prepare(sql).all(...params) as T[];
    },
    get<T = any>(sql: string, params: any[] = []): T | undefined {
      return conn.prepare(sql).get(...params) as T | undefined;
    },
    run(sql: string, params: any[] = []): DatabaseRunResult {
      return conn.prepare(sql).run(...params);
    },
    exec(sql: string): void {
      conn.exec(sql);
    },
    close() {
      conn.close();
    },
  };

  // Run schema auto-apply
  ensureSchemaInitialized(client);

  return client;
}

/**
 * Singleton Getter for the Application Database Connection
 */
export function getDb(): DatabaseClient {
  if (process.env.NODE_ENV === 'production') {
    if (!globalThis._k12_sqlite_db_instance) {
      const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'k12_physics.db');
      globalThis._k12_sqlite_db_instance = initDatabaseInstance(dbPath);
    }
    return globalThis._k12_sqlite_db_instance;
  }

  // In development / testing: Reuse globalThis instance across Next.js HMR cycles
  if (!globalThis._k12_sqlite_db_instance) {
    const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'k12_physics.db');
    globalThis._k12_sqlite_db_instance = initDatabaseInstance(dbPath);
  }

  return globalThis._k12_sqlite_db_instance;
}

/**
 * Helper to reset or create an isolated test database (e.g. for Vitest suites)
 */
export function resetDbForTesting(inMemory = true): DatabaseClient {
  if (globalThis._k12_sqlite_db_instance && typeof globalThis._k12_sqlite_db_instance.close === 'function') {
    try {
      globalThis._k12_sqlite_db_instance.close();
    } catch {
      // Ignore closing errors
    }
    globalThis._k12_sqlite_db_instance = undefined;
  }

  const targetPath = inMemory ? ':memory:' : (process.env.DATABASE_PATH || path.join(process.cwd(), 'test_k12_physics.db'));
  const client = initDatabaseInstance(targetPath);

  globalThis._k12_sqlite_db_instance = client;
  return client;
}

export default getDb;
