const Database = require('better-sqlite3');
const db = new Database('database.db');

// Buat tabel readings sesuai spesifikasi
db.exec(`
  CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    suhu REAL NOT NULL,
    kelembapan REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;