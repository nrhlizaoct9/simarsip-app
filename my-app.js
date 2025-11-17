// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'SIMARSIP App',
  theme: 'auto',
  routes: [
    {
      path: '/history/',
      name: 'history'
    },
    {
      path: '/form-ruangan/',
      component: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="left">
                <a href="#" class="link back">
                  <i class="icon icon-back"></i>
                  <span class="if-not-md">Back</span>
                </a>
              </div>
              <div class="title">Peminjaman Ruangan</div>
            </div>
          </div>
          <div class="page-content">
            <div class="block">
              <p>Form peminjaman ruangan akan ditampilkan di sini.</p>
            </div>
          </div>
        </div>
      `
    }
  ],
  // Framework7 parameters
  touch: {
    tapHold: true
  },
  // Enable auto dark theme
  autoDarkTheme: true
});

// Data riwayat lengkap
var allHistoryData = [
  {
    id: 1,
    title: 'Peminjaman Ruangan - Lab Komputer',
    date: '10/06/2025 - 15:00-17:00',
    description: 'Kegiatan: Workshop Pemrograman',
    status: 'approve',
    dokumen: [
      { name: 'Surat Permohonan.pdf', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'Peminjaman Peralatan - Proyektor',
    date: '10/06/2025 - 2 hari',
    description: 'Barang: Proyektor Epson (1 unit)',
    status: 'wait',
    dokumen: [
      { name: 'Surat Permohonan.pdf', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'Surat Dispensasi - Acara Kampus',
    date: '09/06/2025',
    description: 'Alasan: Mengikuti Lomba Hackathon',
    status: 'approve',
    dokumen: [
      { name: 'Bukti Lomba.jpg', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'Peminjaman Ruangan - Aula',
    date: '08/06/2025 - 09:00-12:00',
    description: 'Kegiatan: Seminar Kewirausahaan',
    status: 'reject',
    dokumen: []
  },
  {
    id: 5,
    title: 'Peminjaman Peralatan - Sound System',
    date: '07/06/2025 - 3 hari',
    description: 'Barang: Sound System Denon',
    status: 'approve',
    dokumen: [
      { name: 'Surat Permohonan.pdf', url: '#' }
    ]
  },
  {
    id: 6,
    title: 'Surat Dispensasi - Sakit',
    date: '06/06/2025',
    description: 'Alasan: Sakit dengan sertifikat dokter',
    status: 'verified',
    dokumen: [
      { name: 'Surat Dokter.pdf', url: '#' }
    ]
  },
  {
    id: 7,
    title: 'Peminjaman Ruangan - Ruang Rapat',
    date: '05/06/2025 - 10:00-12:00',
    description: 'Kegiatan: Rapat Organisasi',
    status: 'wait',
    dokumen: []
  },
  {
    id: 8,
    title: 'Peminjaman Peralatan - Kamera',
    date: '04/06/2025 - 2 hari',
    description: 'Barang: Kamera Canon EOS',
    status: 'approve',
    dokumen: [
      { name: 'Surat Permohonan.pdf', url: '#' }
    ]
  },
  {
    id: 9,
    title: 'Surat Dispensasi - Kompetisi',
    date: '03/06/2025',
    description: 'Alasan: Mengikuti Kompetisi IT Nasional',
    status: 'reject',
    dokumen: []
  },
  {
    id: 10,
    title: 'Peminjaman Ruangan - Lab Terpadu',
    date: '02/06/2025 - 14:00-16:00',
    description: 'Kegiatan: Lab Praktikum Jaringan',
    status: 'approve',
    dokumen: []
  }
];

// Main application logic
var mainView = app.views.create('.view-main');

// Event handlers untuk menu utama
document.getElementById('btn-room').addEventListener('click', function() {
  showFormDialog('Peminjaman Ruangan', 
    'Form untuk mengajukan peminjaman ruangan seperti Lab Komputer, Aula, atau Kelas.');
});

document.getElementById('btn-dispen').addEventListener('click', function() {
  showFormDialog('Surat Dispensasi', 
    'Form untuk mengajukan surat dispensasi kehadiran dengan berbagai alasan.');
});

document.getElementById('btn-item').addEventListener('click', function() {
  showFormDialog('Peminjaman Peralatan', 
    'Form untuk meminjam peralatan seperti proyektor, sound system, atau kamera.');
});

// Event handlers untuk status pengajuan
document.getElementById('status-1').addEventListener('click', function() {
  showStatusDetail(
    'Peminjaman Ruangan - Lab Komputer',
    '10/06/2025 - 15:00-17:00',
    'Kegiatan: Workshop Pemrograman<br>Ruangan: Lab Komputer Gedung A<br>Status: Disetujui',
    'approve'
  );
});

document.getElementById('status-2').addEventListener('click', function() {
  showStatusDetail(
    'Peminjaman Peralatan - Proyektor',
    '10/06/2025 - 2 hari',
    'Barang: Proyektor Epson<br>Jumlah: 1 unit<br>Durasi: 2 hari<br>Status: Menunggu persetujuan admin sarpras',
    'wait'
  );
});

document.getElementById('status-3').addEventListener('click', function() {
  showStatusDetail(
    'Surat Dispensasi - Acara Kampus',
    '09/06/2025',
    'Jenis: Acara Kampus<br>Alasan: Mengikuti Lomba Hackathon<br>Dosen: Dr. Ahmad Wijaya, M.Kom.<br>Status: Telah diverifikasi dosen',
    'verified'
  );
});

document.getElementById('status-4').addEventListener('click', function() {
  showStatusDetail(
    'Peminjaman Ruangan - Aula',
    '08/06/2025 - 09:00-12:00',
    'Kegiatan: Seminar Kewirausahaan<br>Ruangan: Aula Utama<br>Status: Ditolak<br><br><strong>Alasan Penolakan:</strong> Ruangan sudah dipesan untuk kegiatan wisuda.',
    'reject'
  );
});

// Event handlers untuk footer navigation
document.getElementById('btn-calendar').addEventListener('click', function() {
  showFeatureDialog('Kalender', 'Lihat jadwal peminjaman ruangan dan barang dalam bentuk kalender.');
});

document.getElementById('btn-notification').addEventListener('click', function() {
  showNotifications();
});

document.getElementById('btn-help').addEventListener('click', function() {
  showFeatureDialog('Pusat Bantuan', 'Temukan panduan penggunaan dan FAQ aplikasi SIMARSIP.');
});

// Navigasi manual: show/hide halaman
document.getElementById('btn-all-history').addEventListener('click', function() {
  showHistoryPage();
});

function showHistoryPage() {
  document.querySelector('[data-name="home"]').style.display = 'none';
  document.querySelector('[data-name="history"]').style.display = 'block';
}

function showHomePage() {
  document.querySelector('[data-name="history"]').style.display = 'none';
  document.querySelector('[data-name="home"]').style.display = 'block';
}

// Fungsi untuk menampilkan dialog form
function showFormDialog(title, description) {
  app.dialog.create({
    title: title,
    text: description,
    content: `
      <div class="dialog-form">
        <div class="list">
          <ul>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Nama Kegiatan</div>
                <div class="item-input-wrap">
                  <input type="text" placeholder="Masukkan nama kegiatan">
                </div>
              </div>
            </li>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Tanggal</div>
                <div class="item-input-wrap">
                  <input type="date" placeholder="Pilih tanggal">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `,
    buttons: [
      {
        text: 'Batal',
        close: true
      },
      {
        text: 'Ajukan',
        bold: true,
        onClick: function() {
          app.toast.create({
            text: 'Pengajuan ' + title + ' berhasil dikirim!',
            position: 'center',
            closeTimeout: 2000,
          }).open();
        }
      }
    ]
  }).open();
}

// Fungsi untuk menampilkan detail status
function showStatusDetail(title, date, details, status) {
  let statusText = '';
  let statusClass = '';
  
  switch(status) {
    case 'approve':
      statusText = 'Disetujui';
      statusClass = 'badge-approve';
      break;
    case 'wait':
      statusText = 'Menunggu';
      statusClass = 'badge-wait';
      break;
    case 'verified':
      statusText = 'Terverifikasi Dosen';
      statusClass = 'badge-verified';
      break;
    case 'reject':
      statusText = 'Ditolak';
      statusClass = 'badge-reject';
      break;
  }
  
  app.dialog.create({
    title: 'Detail Pengajuan',
    content: `
      <div class="status-detail">
        <h3>${title}</h3>
        <p class="detail-date">${date}</p>
        <div class="detail-content">
          ${details}
        </div>
        <div class="status-badge ${statusClass}">${statusText}</div>
      </div>
      <style>
        .status-detail h3 { margin: 0 0 10px 0; color: #333; }
        .detail-date { color: #666; margin-bottom: 15px; font-size: 14px; }
        .detail-content { margin-bottom: 20px; line-height: 1.5; }
        .status-badge { display: inline-block; padding: 6px 12px; border-radius: 12px; font-weight: bold; font-size: 12px; }
      </style>
    `,
    buttons: [
      {
        text: 'Tutup',
        close: true
      }
    ]
  }).open();
}

// Fungsi untuk menampilkan dialog fitur
function showFeatureDialog(title, description) {
  app.dialog.alert(description, title);
}

// Fungsi untuk menampilkan notifikasi
function showNotifications() {
  app.dialog.create({
    title: 'Notifikasi',
    content: `
      <div class="notifications-list">
        <div class="notification-item">
          <i class="f7-icons" style="color: #0d6efd;">info_circle_fill</i>
          <div class="notification-content">
            <strong>Pengajuan Disetujui</strong>
            <p>Peminjaman Lab Komputer untuk tanggal 10/06/2025 telah disetujui</p>
            <small>2 jam yang lalu</small>
          </div>
        </div>
        <div class="notification-item">
          <i class="f7-icons" style="color: #ffc107;">exclamationmark_triangle_fill</i>
          <div class="notification-content">
            <strong>Perlu Tindakan</strong>
            <p>Verifikasi diperlukan untuk surat dispensasi mahasiswa</p>
            <small>1 hari yang lalu</small>
          </div>
        </div>
        <div class="notification-item">
          <i class="f7-icons" style="color: #28a745;">checkmark_seal_fill</i>
          <div class="notification-content">
            <strong>Peminjaman Selesai</strong>
            <p>Proyektor yang dipinjam telah dikembalikan</p>
            <small>2 hari yang lalu</small>
          </div>
        </div>
      </div>
      <style>
        .notifications-list { max-height: 300px; overflow-y: auto; }
        .notification-item { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; }
        .notification-item:last-child { border-bottom: none; }
        .notification-item i { font-size: 20px; margin-right: 10px; margin-top: 2px; }
        .notification-content { flex: 1; }
        .notification-content strong { display: block; margin-bottom: 4px; }
        .notification-content p { margin: 0 0 4px 0; font-size: 14px; color: #666; }
        .notification-content small { color: #999; font-size: 12px; }
      </style>
    `,
    buttons: [
      {
        text: 'Tandai Semua Sudah Dibaca',
        close: false,
        onClick: function() {
          app.toast.create({
            text: 'Semua notifikasi telah ditandai sudah dibaca',
            position: 'bottom',
            closeTimeout: 2000,
          }).open();
        }
      },
      {
        text: 'Tutup',
        close: true
      }
    ]
  }).open();
}

// Simulasi notifikasi saat halaman dimuat
setTimeout(function() {
  app.toast.create({
    text: 'Selamat datang di SIMARSIP App!',
    position: 'top',
    closeTimeout: 3000,
    cssClass: 'custom-toast'
  }).open();
}, 1000);

// Add custom toast style
app.on('pageInit', function (page) {
  const style = document.createElement('style');
  style.textContent = `
    .custom-toast {
      background: linear-gradient(135deg, #0d6efd, #6f42c1);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);
});

// Handle search functionality
const searchInput = document.querySelector('.searchbar-custom input');
searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const statusCards = document.querySelectorAll('.status-card');
  
  statusCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

// Add pull-to-refresh functionality
app.ptr.create('.page-content', {
  onRefresh: function (ptr) {
    // Simulate loading new data
    setTimeout(function () {
      app.toast.create({
        text: 'Data diperbarui',
        position: 'top',
        closeTimeout: 2000,
      }).open();
      ptr.done();
    }, 1000);
  }
});

// HISTORY PAGE FUNCTIONALITY
function initHistoryPage() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      displayHistory(currentFilter);
    });
  });

  // Tampilkan history yang difilter
  displayHistory(currentFilter);
}

function displayHistory(filter) {
  const historyList = document.getElementById('history-list');
  
  let filteredData = allHistoryData;
  if (filter !== 'all') {
    filteredData = allHistoryData.filter(item => item.status === filter);
  }

  if (filteredData.length === 0) {
    historyList.innerHTML = `
      <div class="history-empty">
        <i class="f7-icons">doc_text</i>
        <p>Tidak ada riwayat untuk ditampilkan</p>
      </div>
    `;
    return;
  }

  historyList.innerHTML = filteredData.map(item => {
    const statusText = getStatusText(item.status);
    return `
      <div class="history-item status-${item.status}" onclick="showHistoryDetail(${item.id})">
        <div class="history-item-header">
          <div>
            <div class="history-item-title">${item.title}</div>
            <div class="history-item-date">${item.date}</div>
          </div>
          <span class="history-status-badge ${item.status}">${statusText}</span>
        </div>
        <div class="history-item-description">${item.description}</div>
      </div>
    `;
  }).join('');
}

function getStatusText(status) {
  const statusMap = {
    'approve': 'Disetujui',
    'wait': 'Menunggu',
    'reject': 'Ditolak',
    'verified': 'Terverifikasi'
  };
  return statusMap[status] || status;
}

function showHistoryDetail(id) {
  const item = allHistoryData.find(h => h.id === id);
  if (!item) return;

  const statusText = getStatusText(item.status);
  const statusClass = 'badge-' + item.status;

  let dokumenHtml = '';
  if (item.dokumen && item.dokumen.length > 0) {
    dokumenHtml = `<div class="history-documents"><strong>Dokumen Pendukung:</strong><ul style='margin:8px 0 0 0;padding-left:18px;'>` +
      item.dokumen.map(doc => `<li><a href="${doc.url}" target="_blank">${doc.name}</a></li>`).join('') +
      `</ul></div>`;
  }

  app.dialog.create({
    title: 'Detail Riwayat',
    content: `
      <div class="status-detail">
        <h3>${item.title}</h3>
        <p class="detail-date">${item.date}</p>
        <div class="detail-content">
          <strong>Keterangan:</strong><br>
          ${item.description}
        </div>
        ${dokumenHtml}
        <div class="status-badge ${statusClass}">${statusText}</div>
      </div>
      <style>
        .status-detail h3 { margin: 0 0 10px 0; color: #333; }
        .detail-date { color: #666; margin-bottom: 15px; font-size: 14px; }
        .detail-content { margin-bottom: 20px; line-height: 1.5; }
        .status-badge { display: inline-block; padding: 6px 12px; border-radius: 12px; font-weight: bold; font-size: 12px; }
        .history-documents { margin-bottom: 16px; }
        .history-documents ul { margin: 0; padding-left: 18px; }
        .history-documents li { font-size: 13px; margin-bottom: 4px; }
        .history-documents a { color: #0d6efd; text-decoration: underline; }
      </style>
    `,
    buttons: [
      {
        text: 'Tutup',
        close: true
      }
    ]
  }).open();
}

// Initialize history page saat halaman history ditampilkan

// Handler tombol kembali khusus untuk halaman riwayat
document.getElementById('btn-back-history').addEventListener('click', function(e) {
  e.preventDefault();
  showHomePage();
});

// Inisialisasi halaman history saat pertama kali tampil
initHistoryPage();
