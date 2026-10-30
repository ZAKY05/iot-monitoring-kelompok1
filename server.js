const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// 1. POST /api/readings (Menerima data sensor + Validasi)
app.post('/api/readings', (req, res) => {
  const { device_id, suhu, kelembapan } = req.body;

  // Validasi tipe data & rentang nilai
  if (!device_id || typeof suhu !== 'number' || typeof kelembapan !== 'number' || isNaN(suhu) || isNaN(kelembapan)) {
    return res.status(400).json({ error: "Suhu dan kelembapan harus berupa angka" });
  }
  if (suhu < -40 || suhu > 80) {
    return res.status(400).json({ error: "Suhu harus di antara -40 hingga 80 C" });
  }
  if (kelembapan < 0 || kelembapan > 100) {
    return res.status(400).json({ error: "Kelembapan harus di antara 0 hingga 100%" });
  }

  const stmt = db.prepare('INSERT INTO readings (device_id, suhu, kelembapan) VALUES (?, ?, ?)');
  const info = stmt.run(device_id, suhu, kelembapan);

  const inserted = db.prepare('SELECT * FROM readings WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(inserted);
});

// 2. GET /api/readings/latest (Data terbaru)
app.get('/api/readings/latest', (req, res) => {
  const { device_id } = req.query;
  let query = 'SELECT * FROM readings';
  let params = [];

  if (device_id && device_id !== 'ALL') {
    query += ' WHERE device_id = ?';
    params.push(device_id);
  }
  query += ' ORDER BY id DESC LIMIT 1';

  const data = db.prepare(query).get(...params);
  res.json(data || {});
});

// 3. GET /api/readings?limit=20 (Riwayat data)
app.get('/api/readings', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const { device_id } = req.query;
  
  let query = 'SELECT * FROM readings';
  let params = [];

  if (device_id && device_id !== 'ALL') {
    query += ' WHERE device_id = ?';
    params.push(device_id);
  }
  query += ' ORDER BY id DESC LIMIT ?';
  params.push(limit);

  const data = db.prepare(query).all(...params);
  res.json(data);
});

// 4. GET /api/stats (Statistik min, max, avg)
app.get('/api/stats', (req, res) => {
  const { device_id } = req.query;
  let query = 'SELECT AVG(suhu) as avg_suhu, MIN(suhu) as min_suhu, MAX(suhu) as max_suhu, AVG(kelembapan) as avg_kelembapan, MIN(kelembapan) as min_kelembapan, MAX(kelembapan) as max_kelembapan FROM readings';
  let params = [];

  if (device_id && device_id !== 'ALL') {
    query += ' WHERE device_id = ?';
    params.push(device_id);
  }

  const stats = db.prepare(query).get(...params);
  res.json(stats);
});

// TANTANGAN BONUS 1: Endpoint Ekspor CSV
app.get('/api/export/csv', (req, res) => {
  const data = db.prepare('SELECT * FROM readings ORDER BY id DESC').all();
  let csv = 'id,device_id,suhu,kelembapan,created_at\n';
  data.forEach(row => {
    csv += `${row.id},${row.device_id},${row.suhu},${row.kelembapan},${row.created_at}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=readings_history.csv');
  res.status(200).send(csv);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});