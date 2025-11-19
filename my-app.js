// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'SIMARSIP App',
  theme: 'auto',
  routes: routes,  // Use routes from js/routes.js
  // Framework7 parameters
  touch: {
    tapHold: true
  },
  // Enable auto dark theme
  autoDarkTheme: true,
  preloadPreviousPage: true // Keep this from HEAD
});

// Global mock data for bookings (from HEAD)
app.mockBookings = [
  { id: 1, borrowerName: 'Ahmad Fauzi', item: 'Ruang Rapat A', type: 'Ruangan', status: 'Sudah dikembalikan', date: new Date(2025,10,15), startTime: '09:00', endTime: '11:00' },
  { id: 2, borrowerName: 'Siti Nurhaliza', item: 'Proyektor Sony VPL', type: 'Barang', status: 'Sedang dipinjam', date: new Date(2025,10,15), startTime: '13:00', endTime: '15:00' },
  { id: 3, borrowerName: 'Budi Santoso', item: 'Ruang Seminar B', type: 'Ruangan', status: 'Sedang dipinjam', date: new Date(2025,10,18), startTime: '10:00', endTime: '12:00' },
  { id: 4, borrowerName: 'Dewi Lestari', item: 'Laptop Dell', type: 'Barang', status: 'Sudah dikembalikan', date: new Date(2025,10,20), startTime: '08:00', endTime: '17:00' },
  { id: 5, borrowerName: 'Rudi Hartono', item: 'Ruang Meeting C', type: 'Ruangan', status: 'Pending', date: new Date(2025,10,20), startTime: '14:00', endTime: '16:00' },
  { id: 6, borrowerName: 'Fajar Nugroho', item: 'Kamera DSLR', type: 'Barang', status: 'Pending', date: new Date(2025,10,22), startTime: '09:00', endTime: '10:00' },
  { id: 7, borrowerName: 'Gita Permata', item: 'Ruang Diskusi D', type: 'Ruangan', status: 'Sedang dipinjam', date: new Date(2025,10,25), startTime: '11:00', endTime: '13:00' },
  { id: 8, borrowerName: 'Hendra Wijaya', item: 'Whiteboard Interaktif', type: 'Barang', status: 'Sudah dikembalikan', date: new Date(2025,10,28), startTime: '10:00', endTime: '16:00' }
];

// Data riwayat lengkap (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

var mainView = app.views.create('.view-main');

// Ensure calendar script is loaded and initialize calendar when calendar page opens
app.on('pageAfterIn', function (page) {
  if (page.name === 'calendar') {
    // Ensure popups are initialized and then call calendar functions
    try {
      // Initialize popups first
      app.popup.create({ el: '#popup-day-details' }); // Only initialize day details popup

      // Then initialize calendar and add booking functionality
      if (typeof initializeCalendar === 'function') initializeCalendar();
      if (typeof initializeFab === 'function') initializeFab();
      try { window.hideLoading(); } catch (e) {}
    } catch (err) {
      console.error('[my-app.js] Error during calendar page initialization:', err);
    }
  }
});

// Accessibility: blur focused element before a page is hidden and mark outgoing page inert
app.on('pageBeforeOut', function(page) {
  try {
    // Remove focus from any element inside the page we're about to hide
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    // Mark the outgoing page as inert so assistive tech won't try to focus it
    if (page && page.el) {
      try { page.el.inert = true; } catch (e) { /* inert may be read-only in some envs */ }
    }
  } catch (err) {
    console.error('[my-app.js] pageBeforeOut accessibility cleanup error:', err);
  }
});

// Remove inert flag when a page becomes active again
app.on('pageAfterIn', function(page) {
  try {
    if (page && page.el) {
      try { page.el.inert = false; } catch (e) { /* ignore */ }
    }
    // Ensure nothing is left focused from previous hidden pages
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    // Also hide any global loader when a page is ready
    try { window.hideLoading(); } catch (e) {}
    // If there are pending selectedDates from the calendar, try to apply them to this page
    try {
      // Also consider values persisted in localStorage as a fallback
      let pendingDates = (window.dateSelectionState && Array.isArray(window.dateSelectionState.selectedDates) && window.dateSelectionState.selectedDates.length > 0) ? window.dateSelectionState.selectedDates : null;
      try { const ls = localStorage.getItem('simarsip.lastSelectedIso'); if (!pendingDates && ls) { pendingDates = ls.split(','); } } catch(e) {}
      if (pendingDates && pendingDates.length > 0) {
        // If sourcePage matches this page, or if no sourcePage set but a targetSelector matches inside this page
        const src = window.dateSelectionState.sourcePage;
        const targetSel = window.dateSelectionState.targetSelector;
        const pageName = page && page.name ? page.name : (page && page.el && page.el.dataset ? page.el.dataset.name : null);
        let shouldApply = false;
        if (src && pageName && src === pageName) shouldApply = true;
        if (!shouldApply && targetSel && page && page.el && page.el.querySelector(targetSel)) shouldApply = true;

        if (shouldApply) {
          // write into the first matching element inside this page
          const el = (page.el.querySelector && (page.el.querySelector(targetSel) || page.el.querySelector('#borrowDate') || page.el.querySelector('#date') || page.el.querySelector('input[name="date"]')));
          if (el) {
              // format display and ISO
              const dates = pendingDates;
            const dateTexts = dates.map(d => {
              const date = new Date(d);
              return date.toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            });
            const displayValue = dateTexts.join(', ');
            const isoDates = dates.map(d => {
              const dt = new Date(d);
              const yyyy = dt.getFullYear();
              const mm = String(dt.getMonth() + 1).padStart(2, '0');
              const dd = String(dt.getDate()).padStart(2, '0');
              return `${yyyy}-${mm}-${dd}`;
            });
            const isoValue = isoDates.join(',');
            try { el.value = displayValue; } catch (e) {}
            try { el.dataset && (el.dataset.iso = isoValue); } catch (e) {}
            try { if (typeof app !== 'undefined' && app.toast) app.toast.create({ text: 'Tanggal diterapkan ke form', position: 'center', closeTimeout: 1200 }).open(); } catch (e) {}
            // leave selectedDates as-is in case user re-opens calendar; do not clear immediately
          }
        }
      }
    } catch (e) {
      console.error('[my-app.js] error applying pending dates to pageAfterIn:', e);
    }
  } catch (err) {
    console.error('[my-app.js] pageAfterIn accessibility setup error:', err);
  }
});

// Event handlers for menu cards (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
var btnRoom = document.getElementById('btn-room');
if (btnRoom) {
  btnRoom.addEventListener('click', function() {
    // Navigate ke halaman peminjaman ruangan
    if(typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router){
      app.views.main.router.navigate('/peminjaman/');
    } else {
      window.location.href = 'pages/peminjaman.html';
    }
  });
}

var btnDispen = document.getElementById('btn-dispen');
if (btnDispen) {
  btnDispen.addEventListener('click', function() {
    if(typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router){
      app.views.main.router.navigate('/dispen/');
    } else {
      window.location.href = 'pages/dispen.html';
    }
  });
}

var btnItem = document.getElementById('btn-item');
if (btnItem) {
  btnItem.addEventListener('click', function() {
    showFormDialog('Peminjaman Peralatan', 
      'Form untuk meminjam peralatan seperti proyektor, sound system, atau kamera.');
  });
}

// Event handlers untuk status pengajuan (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// Event handlers untuk footer navigation (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
var btnCalendar = document.getElementById('btn-calendar');
if (btnCalendar) {
  btnCalendar.addEventListener('click', function(e) {
    e.preventDefault();
    if(app && app.views && app.views.main && app.views.main.router){
      app.views.main.router.navigate('/calendar/');
    }
  });
}

var btnNotification = document.getElementById('btn-notification');
if (btnNotification) {
  btnNotification.addEventListener('click', function() {
    showNotifications();
  });
}

var btnHelp = document.getElementById('btn-help');
if (btnHelp) {
  btnHelp.addEventListener('click', function() {
    showFeatureDialog('Pusat Bantuan', 'Temukan panduan penggunaan dan FAQ aplikasi SIMARSIP.');
  });
}

// Navigasi manual: show/hide halaman (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
document.getElementById('btn-all-history').addEventListener('click', function() {
  showHistoryPage();
});

function showHistoryPage() {
  document.querySelector('[data-name="home"]').style.display = 'none';
  document.querySelector('[data-name="history"]').style.display = 'block';
  initHistoryPage(); // Initialize history page when shown
}

function showHomePage() {
  document.querySelector('[data-name="history"]').style.display = 'none';
  document.querySelector('[data-name="home"]').style.display = 'block';
}

// Fungsi untuk menampilkan dialog form (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// Fungsi untuk menampilkan detail status (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// Fungsi untuk menampilkan dialog fitur (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
function showFeatureDialog(title, description) {
  app.dialog.alert(description, title);
}

// Fungsi untuk menampilkan notifikasi (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// Simulasi notifikasi saat halaman dimuat (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
setTimeout(function() {
  app.toast.create({
    text: 'Selamat datang di SIMARSIP App!',
    position: 'top',
    closeTimeout: 3000,
    cssClass: 'custom-toast'
  }).open();
}, 1000);

// Add custom toast style (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// HISTORY PAGE FUNCTIONALITY (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
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

// Handler tombol kembali khusus untuk halaman riwayat (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
document.getElementById('btn-back-history').addEventListener('click', function(e) {
  e.preventDefault();
  showHomePage();
});

// Inisialisasi halaman history saat pertama kali tampil (from 6fae0237d9db65c743bb07e6fdfda7c3504650ff)
// initHistoryPage(); // This will be called when showHistoryPage is invoked

// ===== GLOBAL STATE FOR MULTI-DATE SELECTION =====
window.dateSelectionState = {
  requiredDays: 0,
  selectedDates: [],
  isSelectingMode: false
};

// Enable date-selection diagnostic logging during this debugging session.
// Set to false to disable verbose logs.
window.__DATE_SELECTION_DEBUG = true;

// Open calendar for a single-date selection (used by Dispen form)
window.openCalendarForSingleDate = function(targetSelector, sourceName) {
  // optional: targetSelector (e.g. '#borrowDate'), sourceName (e.g. 'dispen')
  window.dateSelectionState.requiredDays = 1;
  window.dateSelectionState.selectedDates = [];
  window.dateSelectionState.isSelectingMode = true;
  if (targetSelector) window.dateSelectionState.targetSelector = targetSelector;
  if (sourceName) window.dateSelectionState.sourcePage = sourceName;
  try { if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur(); } catch (e) {}
  try { window.showLoading('Membuka kalender...'); } catch (e) {}
  setTimeout(() => {
    if (typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router) {
      app.views.main.router.navigate('/calendar/');
    } else {
      window.location.href = '/calendar.html';
    }
  }, 100);
};

// ===== GLOBAL FUNCTIONS FOR DATE SELECTION =====
window.updateDurationInfo = function() {
  const duration = document.getElementById('duration') ? document.getElementById('duration').value : '';
  const durationInfo = document.getElementById('durationInfo');
  const selectedDates = window.dateSelectionState.selectedDates || [];
  
  if (!duration || !durationInfo) return;

  durationInfo.style.display = 'block';
  let remainingDays = parseInt(duration) - selectedDates.length;
  
  if (remainingDays > 0) {
    durationInfo.textContent = `Pilih ${remainingDays} tanggal lagi di kalender`;
  } else if (remainingDays === 0) {
    durationInfo.textContent = 'Semua tanggal sudah dipilih ✓';
  } else {
    durationInfo.textContent = `${Math.abs(remainingDays)} tanggal berlebih (hapus ${Math.abs(remainingDays)})`;
  }
};

window.openCalendarForDateSelection = function(targetSelector, sourceName) {
  const durationEl = document.getElementById('duration');
  const duration = durationEl ? durationEl.value : '';
  if (!duration) {
    if (typeof app !== 'undefined' && app.dialog) {
      app.dialog.alert('Pilih durasi peminjaman terlebih dahulu', 'Info');
    } else {
      alert('Pilih durasi peminjaman terlebih dahulu');
    }
    return;
  }

  window.dateSelectionState.requiredDays = parseInt(duration);
  window.dateSelectionState.selectedDates = [];
  window.dateSelectionState.isSelectingMode = true;
  // allow caller to specify target selector and source name for robust writing
  if (targetSelector) window.dateSelectionState.targetSelector = targetSelector;
  if (sourceName) window.dateSelectionState.sourcePage = sourceName;

  // Blur active element and show loading while navigating to calendar
  try { if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur(); } catch (e) {}
  try { window.showLoading('Membuka kalender...'); } catch (e) {}
  // Navigate to calendar dengan mode selection
  setTimeout(() => {
    if (typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router) {
      app.views.main.router.navigate('/calendar/');
    } else {
      window.location.href = '/calendar.html';
    }
  }, 100);
};

// Backwards-compatible alias used by peralatan.html
window.openEquipmentCalendar = function() {
  if (typeof window.openCalendarForDateSelection === 'function') {
    // call with selector and source so confirmDateSelection writes back correctly
    return window.openCalendarForDateSelection('#borrowDate', 'peralatan');
  }
};
window.confirmDateSelection = function(dates, options) {
  options = options || {};
  const maxAttempts = options.maxAttempts || 12; // ~12 * 200ms = 2.4s
  const intervalMs = options.intervalMs || 200;

  if (!dates || dates.length === 0) {
    try { window.hideLoading(); } catch (e) {}
    return Promise.resolve(false);
  }

  // Format dates as display text
  const dateTexts = dates.map(d => {
    const date = new Date(d);
    return date.toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  });
  const displayValue = dateTexts.join(', ');
  // also prepare ISO strings for reliable parsing/storage
  const isoDates = dates.map(d => {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const isoValue = isoDates.join(',');

  // Determine candidate selectors based on known pages
  const source = window.dateSelectionState && window.dateSelectionState.sourcePage ? window.dateSelectionState.sourcePage : null;
  const candidates = [];
  // If a targetSelector was provided when opening, try it first
  if (window.dateSelectionState && window.dateSelectionState.targetSelector) {
    candidates.push(window.dateSelectionState.targetSelector);
  }
  if (source) {
    // prefer writing into the originating page fragment
    candidates.push(`[data-name="${source}"] #borrowDate`);
    candidates.push(`[data-name="${source}"] #date`);
    candidates.push(`[data-name="${source}"] input[name=\"date\"]`);
  }
  // common fallbacks
  candidates.push('#borrowDate');
  candidates.push('#date');
  // Additional page-position fallbacks for Framework7 classes
  candidates.push('.page-on-center #borrowDate');
  candidates.push('.page-on-center #date');
  candidates.push('.page-on-left #borrowDate');
  candidates.push('.page-on-right #borrowDate');

  let attempt = 0;

  function tryWrite() {
    attempt++;
    if (window.__DATE_SELECTION_DEBUG) console.debug('[confirmDateSelection] attempt', attempt, 'candidates', candidates, 'source', source);
    for (let sel of candidates) {
      try {
        const el = document.querySelector(sel);
        if (window.__DATE_SELECTION_DEBUG) console.debug('[confirmDateSelection] checking selector', sel, 'el=', el);
        if (!el) continue;
        // skip if element or its ancestor is aria-hidden
        if (el.closest && el.closest('[aria-hidden="true"]')) {
          if (window.__DATE_SELECTION_DEBUG) console.debug('[confirmDateSelection] selector inside aria-hidden, skipping', sel);
          continue;
        }
        // write display and ISO values
        try {
          if ('value' in el) {
            el.value = displayValue;
          } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = displayValue;
          } else {
            el.textContent = displayValue;
          }
        } catch (err) {}
        try { el.dataset && (el.dataset.iso = isoValue); } catch (e) {}

        window.dateSelectionState.selectedDates = dates;
        if (window.__DATE_SELECTION_DEBUG) console.debug('[confirmDateSelection] wrote value to', sel, displayValue);
        try { window.updateDurationInfo(); } catch (e) {}
        try { window.hideLoading(); } catch (e) {}

        // Show a small toast to indicate success (Framework7) — helpful while debugging
        try {
          if (typeof app !== 'undefined' && app.toast) {
            app.toast.create({ text: 'Tanggal berhasil disimpan', position: 'center', closeTimeout: 1400 }).open();
          }
        } catch (e) { /* ignore toast failures */ }

        // After successful write, navigate back to the source page if possible
        const target = source ? `/${source}/` : '/peminjaman/';
        try {
          if (typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router) {
            app.views.main.router.navigate(target);
          }
        } catch (e) {}

        return Promise.resolve(true);
      } catch (err) {
        // ignore and continue
      }
    }

    if (attempt >= maxAttempts) {
      try { window.hideLoading(); } catch (e) {}
      try {
        if (typeof app !== 'undefined' && app.toast) {
          app.toast.create({ text: 'Gagal menyimpan tanggal — silakan coba lagi', position: 'center', closeTimeout: 2200 }).open();
        }
      } catch (e) {}
      // fallback: navigate back anyway
      try {
        if (typeof app !== 'undefined' && app.views && app.views.main && app.views.main.router) {
          const target = source ? `/${source}/` : '/peminjaman/';
          app.views.main.router.navigate(target);
        }
      } catch (e) {}
      return Promise.resolve(false);
    }

    // schedule next attempt
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tryWrite());
      }, intervalMs);
    });
  }

  // start attempts
  return tryWrite();
};
