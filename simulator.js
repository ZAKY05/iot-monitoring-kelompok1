// simulator.js  -> jalankan: node simulator.js
// Node.js 18+ sudah punya fetch bawaan.
const URL = 'http://localhost:3000/api/readings';

setInterval(async () => {
  const data = {
    device_id: 'GH-01',
    suhu: +(25 + Math.random() * 12).toFixed(1),       // 25-37 °C
    kelembapan: +(60 + Math.random() * 25).toFixed(1)  // 60-85 %
  };

  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(`[${new Date().toLocaleTimeString()}] ${res.status}`, JSON.stringify(data));
  } catch (err) {
    console.error('Gagal mengirim data (server sudah jalan?):', err.message);
  }
}, 5000);
