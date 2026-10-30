const REFRESH_MS = 5000;
const ONLINE_THRESHOLD_S = 30;
const HOT_THRESHOLD = 35;

const $ = (id) => document.getElementById(id);

// created_at dari SQLite berupa UTC "YYYY-MM-DD HH:MM:SS" -> jadikan Date
function parseTime(s) {
  return new Date(s.replace(' ', 'T') + 'Z');
}
const fmtTime = (s) => parseTime(s).toLocaleTimeString('id-ID');
const fmtDateTime = (s) => parseTime(s).toLocaleString('id-ID');

// ---- Grafik ----
const chart = new Chart($('chart'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Suhu (°C)', data: [], borderColor: '#dc2626', backgroundColor: '#dc2626', tension: 0.3, yAxisID: 'y' },
      { label: 'Kelembapan (%)', data: [], borderColor: '#1e3a5f', backgroundColor: '#1e3a5f', tension: 0.3, yAxisID: 'y1' },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y:  { position: 'left',  title: { display: true, text: '°C' } },
      y1: { position: 'right', title: { display: true, text: '%' }, grid: { drawOnChartArea: false } },
    },
  },
});

// ---- Render ----
function renderLatest(r) {
  $('suhuValue').textContent = r.suhu.toFixed(1);
  $('humValue').textContent = r.kelembapan.toFixed(1);
  $('suhuTime').textContent = $('humTime').textContent = fmtTime(r.created_at);

  const hot = r.suhu > HOT_THRESHOLD;
  $('cardSuhu').classList.toggle('hot', hot);
  $('suhuStatus').textContent = hot ? 'Panas' : 'Normal';

  const ageSec = (Date.now() - parseTime(r.created_at).getTime()) / 1000;
  const online = ageSec < ONLINE_THRESHOLD_S;
  const badge = $('deviceStatus');
  badge.textContent = online ? 'Online' : 'Offline';
  badge.className = 'badge ' + (online ? 'online' : 'offline');
}

function renderStats(s) {
  const f = (v) => (v === null || v === undefined ? '-' : (+v).toFixed(1));
  $('sAvg').textContent = f(s.suhu.avg);  $('sMin').textContent = f(s.suhu.min);  $('sMax').textContent = f(s.suhu.max);
  $('hAvg').textContent = f(s.kelembapan.avg); $('hMin').textContent = f(s.kelembapan.min); $('hMax').textContent = f(s.kelembapan.max);
}

function renderChart(rows) {
  const asc = [...rows].reverse(); // API: terbaru dulu -> grafik: lama ke baru
  chart.data.labels = asc.map((r) => fmtTime(r.created_at));
  chart.data.datasets[0].data = asc.map((r) => r.suhu);
  chart.data.datasets[1].data = asc.map((r) => r.kelembapan);
  chart.update();
}

function renderTable(rows) {
  const tbody = $('tbody');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Belum ada data</td></tr>';
    return;
  }
  tbody.innerHTML = '';
  rows.slice(0, 10).forEach((r) => {
    const tr = document.createElement('tr');
    [r.id, r.device_id, r.suhu.toFixed(1), r.kelembapan.toFixed(1), fmtDateTime(r.created_at)].forEach((v) => {
      const td = document.createElement('td');
      td.textContent = v;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// ---- Ambil data ----
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

async function refresh() {
  try {
    const [rows, stats] = await Promise.all([
      getJSON('/api/readings?limit=20'),
      getJSON('/api/stats'),
    ]);
    if (rows.length > 0) renderLatest(rows[0]);
    renderChart(rows);
    renderTable(rows);
    renderStats(stats);
  } catch (err) {
    console.error('Gagal memuat data:', err);
    $('deviceStatus').textContent = 'Offline';
    $('deviceStatus').className = 'badge offline';
  }
}

refresh();
setInterval(refresh, REFRESH_MS);
