IoT Greenhouse Monitoring SystemSistem pemantauan suhu dan kelembapan berbasis IoT (Internet of Things) yang mengintegrasikan pengiriman data sensor (ESP32/Simulator), backend REST API (Node.js & Express), penyimpanan database persisten (SQLite), serta visualisasi dashboard web secara real-time. 
Anggota :
Alif Zaky Lutfiansyah [E41240975]
Muhammad Rizky Hillan Al Farizy [E41240977]
Yanuar Akbar Ahmadani [E41241000]
Zafar Muhammad Nur Ridwan [E41241092]

## Endpoint REST API

| Method | Endpoint | Fungsi | Respons sukses | Respons gagal |
|--------|----------|--------|----------------|---------------|
| POST | `/api/readings` | Menyimpan data sensor dari perangkat | `201` + data yang tersimpan | `400` + pesan error JSON |
| GET | `/api/readings/latest` | Data terbaru untuk kartu nilai | `200` + objek JSON | `404` jika belum ada data |
| GET | `/api/readings?limit=20` | Riwayat N data terakhir untuk grafik dan tabel | `200` + array JSON | - (limit tidak valid dianggap 20) |
| GET | `/api/stats` | Rata-rata, minimum, maksimum suhu dan kelembapan | `200` + objek JSON | - |

**Validasi POST:** `suhu` dan `kelembapan` harus berupa angka, `suhu` antara -40 s.d. 80 °C, dan `kelembapan` antara 0 s.d. 100 %.

Cara Menjalankan Aplikasi
Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal:
1. Clone Repository & Install Dependency
2. Buka terminal dan jalankan perintah:git clone https://github.com/ZAKY05/iot-monitoring-kelompok1.git
cd iot-monitoring-kelompok1
npm install
1. Jalankan Server Backend
2. Jalankan server Node.js (Terminal 1):node server.js
Server akan berjalan di http://localhost:3000.
3. Jalankan Simulator Pengirim DataBuka Terminal Baru (Terminal 2), lalu jalankan:node simulator.js
5. Buka Dashboard WebBuka browser (Google Chrome / Microsoft Edge) lalu akses:http://localhost:3000
