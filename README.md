IoT Greenhouse Monitoring SystemSistem pemantauan suhu dan kelembapan berbasis IoT (Internet of Things) yang mengintegrasikan pengiriman data sensor (ESP32/Simulator), backend REST API (Node.js & Express), penyimpanan database persisten (SQLite), serta visualisasi dashboard web secara real-time.👤 Identitas Anggota / PengembangNama: Alif Zaky LutfiansyahNIM: [Isi NIM Anda di sini]Kelompok: Kelompok 1🚀 Fitur UtamaREST API dengan Validasi Input: Menerima data sensor dari ESP32/Simulator dan memvalidasi rentang nilai suhu (-40 hingga 80 °C) serta kelembapan (0 hingga 100 %).Penyimpanan Persisten SQLite: Menyimpan seluruh riwayat bacaan sensor secara aman meskipun server di-restart.Web Dashboard Real-Time: Tampilan indikator suhu/kelembapan, status koneksi (Online/Offline), grafik interaktif (Chart.js), dan tabel riwayat.Statistik Data Sensor: Menghitung nilai rata-rata, minimum, dan maksimum suhu serta kelembapan.Ekspor Data CSV: Fitur untuk mengunduh laporan riwayat data sensor ke format .csv.🛠️ Teknologi yang DigunakanBackend: Node.js, Express.jsDatabase: SQLite (sqlite3)Hardware Simulation: ESP32 + DHT22 (Wokwi / simulator.js)Frontend: HTML5, CSS3, JavaScript (Fetch API, Chart.js)📁 Struktur Folder Proyekiot-monitoring/
├── public/              # File statis frontend (Dashboard Web)
│   ├── index.html       # Tampilan utama dashboard
│   ├── style.css        # Desain & styling dashboard
│   └── app.js           # Logika pemanggilan API & Chart.js
├── screenshots/         # Bukti pengujian & tangkapan layar
│   ├── dashboard.png    # Tampilan web dashboard
│   └── post_api.png     # Pengujian POST API via Postman
├── db.js                # Konfigurasi & inisialisasi SQLite
├── server.js            # Server Express & endpoint REST API
├── simulator.js         # Script simulator pengirim data lokal
├── .gitignore           # Konfigurasi abaikan node_modules & *.db
├── package.json         # Dependency proyek
└── README.md            # Dokumentasi proyek
📋 Tabel Endpoint REST APIMethodEndpointDeskripsiFormat Payload (Request Body / Query)Status CodePOST/api/readingsMengirim & menyimpan data sensor baru (termasuk validasi range){"device_id":"GH-01", "suhu":28.5, "kelembapan":72.0}201 Created / 400 Bad RequestGET/api/readings/latestMengambil 1 data sensor paling baru- (Opsional Query: ?device_id=GH-01)200 OKGET/api/readingsMengambil daftar riwayat data sensor- (Opsional Query: ?limit=20)200 OKGET/api/statsMengkalkulasi statistik data (Min, Max, Avg)-200 OKGET/api/export/csvMengunduh seluruh riwayat data berformat CSV-200 OK⚙️ Cara Menjalankan AplikasiIkuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal:1. Clone Repository & Install DependencyBuka terminal dan jalankan perintah:git clone https://github.com/ZAKY05/iot-monitoring-kelompok1.git
cd iot-monitoring-kelompok1
npm install
2. Jalankan Server BackendJalankan server Node.js (Terminal 1):node server.js
Server akan berjalan di http://localhost:3000.3. Jalankan Simulator Pengirim DataBuka Terminal Baru (Terminal 2), lalu jalankan:node simulator.js
4. Buka Dashboard WebBuka browser (Google Chrome / Microsoft Edge) lalu akses:http://localhost:3000
📸 ScreenshotsTangkapan layar pengujian aplikasi disimpan dalam folder screenshots/:Dashboard Web: screenshots/dashboard.pngPengujian REST API POST (Postman): screenshots/post_api.png
