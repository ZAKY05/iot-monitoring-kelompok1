# IoT Greenhouse Monitoring System

Sistem pemantauan suhu dan kelembapan berbasis IoT (Internet of Things) yang mengintegrasikan:

- Pengiriman data sensor (ESP32 atau simulator)
- Backend REST API (Node.js dan Express)
- Penyimpanan database persisten (SQLite)
- Visualisasi dashboard web secara real-time

## Anggota Kelompok

| No | Nama | NIM |
|----|------|-----|
| 1 | Alif Zaky Lutfiansyah | E41240975 |
| 2 | Muhammad Rizky Hillan Al Farizy | E41240977 |
| 3 | Yanuar Akbar Ahmadani | E41241000 |
| 4 | Zafar Muhammad Nur Ridwan | E41241092 |

## Fitur Dashboard

- Kartu suhu dan kelembapan terkini beserta waktu pembaruan terakhir
- Kartu suhu berwarna merah (status "Panas") jika suhu > 35 °C, hijau jika normal
- Grafik garis 20 data terakhir (Chart.js)
- Tabel riwayat 10 data terakhir
- Pembaruan otomatis setiap 5 detik tanpa reload halaman
- Indikator status perangkat: **Online** jika data terakhir < 30 detik, selain itu **Offline**

## Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal.

### 1. Clone repository dan install dependency

Buka terminal, lalu jalankan:

```bash
git clone https://github.com/ZAKY05/iot-monitoring-kelompok1.git
cd iot-monitoring-kelompok1
npm install
```

### 2. Jalankan server backend

Di **Terminal 1**:

```bash
node server.js
```

Server akan berjalan di `http://localhost:3000`.

### 3. Jalankan simulator pengirim data

Buka **Terminal baru (Terminal 2)**, lalu jalankan:

```bash
node simulator.js
```

Simulator mengirim data suhu dan kelembapan setiap 5 detik.

### 4. Buka dashboard web

Buka browser (Google Chrome atau Microsoft Edge), lalu akses:

```
http://localhost:3000
```

## Endpoint REST API

| Method | Endpoint | Fungsi | Respons sukses | Respons gagal |
|--------|----------|--------|----------------|---------------|
| POST | `/api/readings` | Menyimpan data sensor dari perangkat | `201` + data yang tersimpan | `400` + pesan error JSON |
| GET | `/api/readings/latest` | Data terbaru untuk kartu nilai | `200` + objek JSON | `404` jika belum ada data |
| GET | `/api/readings?limit=20` | Riwayat N data terakhir untuk grafik dan tabel | `200` + array JSON | - (limit tidak valid dianggap 20) |
| GET | `/api/stats` | Rata-rata, minimum, maksimum suhu dan kelembapan | `200` + objek JSON | - |

**Validasi POST:** `suhu` dan `kelembapan` harus berupa angka, `suhu` antara -40 s.d. 80 °C, dan `kelembapan` antara 0 s.d. 100 %. Jika dilanggar, server membalas `400` dengan pesan error JSON.

Contoh request:

```bash
curl -X POST http://localhost:3000/api/readings \
  -H "Content-Type: application/json" \
  -d '{"device_id":"GH-01","suhu":30.5,"kelembapan":70}'
```

## Teknologi

- HTML, CSS, JavaScript (fetch dan Chart.js)
- Node.js dan Express
- SQLite
- Git dan GitHub
