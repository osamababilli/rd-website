import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

/** SQLite file. Override with DATABASE_PATH (it must live on a persistent disk in production). */
const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'rd-group.db');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  source      TEXT    NOT NULL,
  locale      TEXT    NOT NULL DEFAULT '',
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  company     TEXT    NOT NULL DEFAULT '',
  services    TEXT    NOT NULL DEFAULT '[]',
  budget      TEXT    NOT NULL DEFAULT '',
  timing      TEXT    NOT NULL DEFAULT '',
  contact_via TEXT    NOT NULL DEFAULT '',
  message     TEXT    NOT NULL DEFAULT '',
  status      TEXT    NOT NULL DEFAULT 'new',
  notes       TEXT    NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

const globalForDb = globalThis as unknown as { __rdDb?: Database.Database };

/** One shared connection per server process (kept across hot reloads in development). */
export function getDb(): Database.Database {
  if (!globalForDb.__rdDb) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    const db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('busy_timeout = 5000');
    db.exec(SCHEMA);
    globalForDb.__rdDb = db;
  }
  return globalForDb.__rdDb;
}
