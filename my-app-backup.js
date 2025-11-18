// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'SIMARSIP App',
  theme: 'auto',
  routes: [
    // Routes akan ditambahkan nanti untuk navigasi antar halaman
    {
      path: '/form-ruangan/',
      component: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="left">
                <a href="#" class="link back">
                  <i class="f7-icons">chevron_left</i>
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
    ,
    {
      path: '/calendar/',
      component: `
        <div data-name="calendar" class="page page-calendar">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="left">
                <a href="#" class="link back">
                  <i class="f7-icons">chevron_left</i>
                  <span class="if-not-md">Back</span>
                </a>
              </div>
              <div class="title">Kalender Peminjaman</div>
            </div>
          </div>

          <div class="page-content calendar-content">
            <div class="calendar-card">
              <div class="calendar-header">
                <button class="btn-nav prev-month">&lt;</button>
                <div class="month-year">November 2025</div>
                <button class="btn-nav next-month">&gt;</button>
              </div>

              <div class="calendar-grid">
                <div class="calendar-weekdays">
                  <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
                </div>
                <div class="calendar-days">
                  <!-- generated days here -->
                </div>
              </div>

              <div class="calendar-legend">
                <div><span class="legend-box available"></span> Tersedia</div>
                <div><span class="legend-box borrowing"></span> Sedang dipinjam</div>
                <div><span class="legend-box returned"></span> Sudah dikembalikan</div>
              </div>
            </div>

            <div class="calendar-sidebar" style="display:none;">
              <!-- optional summary for desktop -->
            </div>
          </div>

          <a class="floating-button add-booking">+</a>
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
document.getElementById('btn-notification').addEventListener('click', function() {
  showNotifications();
});

document.getElementById('btn-help').addEventListener('click', function() {
  showFeatureDialog('Pusat Bantuan', 'Temukan panduan penggunaan dan FAQ aplikasi SIMARSIP.');
});

document.getElementById('btn-all-history').addEventListener('click', function() {
  showFeatureDialog('Riwayat Lengkap', 'Lihat semua riwayat pengajuan surat dan peminjaman.');
});


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
const customToastStyle = document.createElement('style');
customToastStyle.textContent = `
  .custom-toast {
    background: linear-gradient(135deg, #0d6efd, #6f42c1);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(customToastStyle);

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

// ------------------ Calendar Functionality ------------------
// Sample booking data keyed by YYYY-MM-DD
const bookings = {
  '2025-11-12': [{ name: 'Budi', item: 'Proyektor', start: '09:00', end: '12:00', status: 'borrowing' }],
  '2025-11-13': [{ name: 'Siti', item: 'Lab Komputer', start: '13:00', end: '15:00', status: 'available' }],
  '2025-11-20': [{ name: 'Rina', item: 'Kamera', start: '08:00', end: '10:00', status: 'returned' }],
};

let currentDate = new Date(2025, 10, 1); // November 2025 (month index 10)

function formatYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function renderCalendarPage(pageEl) {
  const monthYearEl = pageEl.querySelector('.month-year');
  const daysContainer = pageEl.querySelector('.calendar-days');
  monthYearEl.textContent = currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  // compute first day (Monday start) and number of days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  // get weekday index 0-6 where Monday=0
  let startIndex = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month+1, 0).getDate();

  daysContainer.innerHTML = '';

  // fill blank days before start
  for (let i=0;i<startIndex;i++) {
    const el = document.createElement('div');
    el.className = 'day-card empty';
    daysContainer.appendChild(el);
  }

  for (let d=1; d<=daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const ymd = formatYMD(dateObj);
    const el = document.createElement('div');
    el.className = 'day-card';
    if (bookings[ymd]) {
      // pick highest-priority status (borrowing > returned > available)
      const st = bookings[ymd][0].status;
      el.classList.add('status-' + st);
    }
    if (formatYMD(new Date()) === ymd) el.classList.add('today');

    el.innerHTML = `
      <div class="day-number">${d}</div>
      <div class="day-icons"></div>
    `;

    // add icons for bookings
    const iconsEl = el.querySelector('.day-icons');
    if (bookings[ymd]) {
      bookings[ymd].forEach(b => {
        const ic = document.createElement('span');
        ic.className = 'icon';
        if (b.status === 'borrowing') ic.textContent = '⚠️';
        else if (b.status === 'returned') ic.textContent = '✅';
        else ic.textContent = '📌';
        iconsEl.appendChild(ic);
      });
    }

    el.addEventListener('click', function() {
      openDayModal(ymd);
    });

    daysContainer.appendChild(el);
  }

}

function openDayModal(ymd) {
  const data = bookings[ymd] || [];
  let listHtml = '';
  if (data.length === 0) listHtml = '<p>Tidak ada peminjaman pada tanggal ini.</p>';
  data.forEach((b, i) => {
    listHtml += `<div class="booking-detail">
      <strong>${b.item}</strong>
      <div>Oleh: ${b.name}</div>
      <div>Jam: ${b.start} - ${b.end}</div>
      <div>Status: ${b.status}</div>
      <div class="booking-actions">
        <button class="btn-action btn-edit">Edit</button>
        <button class="btn-action btn-delete">Hapus</button>
        <button class="btn-action btn-return">Kembalikan</button>
      </div>
    </div>`;
  });

  app.dialog.create({
    title: `Detail Peminjaman - ${ymd}`,
    content: listHtml,
    buttons: [
      { text: 'Tutup', close: true }
    ]
  }).open();
}

// when calendar page initialized
app.on('pageInit', function (page) {
  if (page.name === 'calendar') {
    renderCalendarPage(page.el);

    // nav buttons
    page.el.querySelector('.prev-month').addEventListener('click', function() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
      renderCalendarPage(page.el);
    });
    page.el.querySelector('.next-month').addEventListener('click', function() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
      renderCalendarPage(page.el);
    });

    // floating add
    const fab = document.querySelector('.floating-button.add-booking');
    if (fab) {
      fab.addEventListener('click', function() {
        app.dialog.create({
          title: 'Tambah Peminjaman',
          content: `
            <div class="list">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Nama</div>
                    <div class="item-input-wrap"><input type="text" placeholder="Nama peminjam"></div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Barang / Ruangan</div>
                    <div class="item-input-wrap"><input type="text" placeholder="Contoh: Proyektor"></div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Tanggal</div>
                    <div class="item-input-wrap"><input type="date"></div>
                  </div>
                </li>
              </ul>
            </div>
          `,
          buttons: [
            { text: 'Batal', close: true },
            { text: 'Simpan', bold: true, onClick: function() { app.toast.create({ text: 'Peminjaman disimpan', closeTimeout:1500 }).open(); } }
          ]
        }).open();
      });
    }
  }
});

// Handle calendar link active state - disabled for now to fix loading issue
// app.on('routeChange', function (route) {
//   document.querySelectorAll('.toolbar-inner a').forEach(a => a.classList.remove('active'));
//   if (route.url === '/calendar/') {
//     document.getElementById('btn-calendar').classList.add('active');
//   } else {
//     document.querySelector('.toolbar-inner a').classList.add('active');
//   }
// });
