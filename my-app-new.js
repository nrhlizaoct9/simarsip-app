// Mock data - Booking/Peminjaman data
const mockBookings = [
  {
    id: 1,
    borrowerName: 'Ahmad Fauzi',
    item: 'Ruang Rapat A',
    type: 'Ruangan',
    status: 'Sudah dikembalikan',
    date: new Date(2025, 10, 15),
    startTime: '09:00',
    endTime: '11:00'
  },
  {
    id: 2,
    borrowerName: 'Siti Nurhaliza',
    item: 'Proyektor Sony VPL',
    type: 'Barang',
    status: 'Sedang dipinjam',
    date: new Date(2025, 10, 15),
    startTime: '13:00',
    endTime: '15:00'
  },
  {
    id: 3,
    borrowerName: 'Budi Santoso',
    item: 'Ruang Seminar B',
    type: 'Ruangan',
    status: 'Sedang dipinjam',
    date: new Date(2025, 10, 18),
    startTime: '10:00',
    endTime: '12:00'
  },
  {
    id: 4,
    borrowerName: 'Dewi Lestari',
    item: 'Laptop Dell',
    type: 'Barang',
    status: 'Sudah dikembalikan',
    date: new Date(2025, 10, 20),
    startTime: '08:00',
    endTime: '17:00'
  },
  {
    id: 5,
    borrowerName: 'Rudi Hartono',
    item: 'Ruang Meeting C',
    type: 'Ruangan',
    status: 'Sedang dipinjam',
    date: new Date(2025, 10, 20),
    startTime: '14:00',
    endTime: '16:00'
  },
  {
    id: 6,
    borrowerName: 'Linda Wijaya',
    item: 'Kamera Canon',
    type: 'Barang',
    status: 'Sedang dipinjam',
    date: new Date(2025, 10, 22),
    startTime: '09:00',
    endTime: '12:00'
  }
];

// Routes Configuration
const routes = [
  {
    path: '/',
    component: `
      <div data-name="home" class="page">
        <!-- NAVBAR -->
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner">
            <div class="title">SIMARSIP APP</div>
            <div class="right">
              <div class="user-profile">
                <i class="f7-icons">person_circle</i>
                <span>Halo, HMIF!</span>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGE CONTENT -->
        <div class="page-content">
          <!-- WELCOME BANNER -->
          <div class="welcome-banner">
            <h3>Selamat Datang!</h3>
            <p>Kelola pengajuan surat dan peminjaman dengan mudah</p>
          </div>

          <!-- SEARCH BAR -->
          <div class="searchbar-custom">
            <input type="text" placeholder="Cari pengajuan...">
            <i class="f7-icons search-icon">search</i>
          </div>

          <!-- AJUKAN SURAT BARU -->
          <div class="block-title">Ajukan Surat Baru</div>
          <div class="menu-row">
            <div class="menu-card" id="btn-room">
              <i class="f7-icons menu-icon">square_stack_3d_up</i>
              <span>Peminjaman Ruangan</span>
            </div>
            <div class="menu-card" id="btn-dispen">
              <i class="f7-icons menu-icon">doc_person_fill</i>
              <span>Surat Dispen</span>
            </div>
            <div class="menu-card" id="btn-item">
              <i class="f7-icons menu-icon">cube_box_fill</i>
              <span>Peminjaman Peralatan</span>
            </div>
          </div>

          <!-- STATUS PENGAJUAN -->
          <div class="block-title">Status Pengajuan Terakhir</div>
          <div class="status-card" id="status-1">
            <div class="status-card-content">
              <strong>Peminjaman Ruangan - Lab Komputer</strong>
              <small>10/06/2025 - 15:00-17:00</small>
            </div>
            <div class="badge-approve">Disetujui</div>
          </div>
          <div class="status-card" id="status-2">
            <div class="status-card-content">
              <strong>Peminjaman Peralatan - Proyektor</strong>
              <small>10/06/2025 - 2 hari</small>
            </div>
            <div class="badge-wait">Menunggu</div>
          </div>
          <div class="status-card" id="status-3">
            <div class="status-card-content">
              <strong>Surat Dispensasi - Acara Kampus</strong>
              <small>09/06/2025</small>
            </div>
            <div class="badge-approve">Disetujui</div>
          </div>
          <div class="status-card" id="status-4">
            <div class="status-card-content">
              <strong>Peminjaman Ruangan - Aula</strong>
              <small>08/06/2025 - 09:00-12:00</small>
            </div>
            <div class="badge-reject">Ditolak</div>
          </div>

          <!-- LINK LIHAT SEMUA RIWAYAT -->
          <div class="see-more-container">
            <a href="#" class="see-more" id="btn-all-history">
              <span>Lihat Semua Riwayat</span>
              <i class="f7-icons">chevron_right</i>
            </a>
          </div>
        </div>

        <!-- TOOLBAR BAWAH -->
        <div class="toolbar toolbar-bottom">
          <div class="toolbar-inner">
            <a href="/" class="link active" data-link-active="active">
              <div class="link-content">
                <i class="f7-icons">house_fill</i>
                <span>Beranda</span>
              </div>
            </a>
            <a href="/calendar/" class="link">
              <div class="link-content">
                <i class="f7-icons">calendar</i>
                <span>Kalender</span>
              </div>
            </a>
            <a href="#" class="link" onclick="app.dialog.alert('Fitur Notifikasi belum diimplementasikan'); return false;">
              <div class="link-content">
                <i class="f7-icons">bell_fill</i>
                <span>Notifikasi</span>
              </div>
            </a>
            <a href="#" class="link" onclick="app.dialog.alert('Fitur Bantuan belum diimplementasikan'); return false;">
              <div class="link-content">
                <i class="f7-icons">question_circle</i>
                <span>Bantuan</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    `,
    on: {
      pageInit: function (event, page) {
        // Handle home page buttons
        document.getElementById('btn-room')?.addEventListener('click', function() {
          app.dialog.alert('Fitur Ruangan belum diimplementasikan');
        });
        
        document.getElementById('btn-dispen')?.addEventListener('click', function() {
          app.dialog.alert('Fitur Dispensasi belum diimplementasikan');
        });
        
        document.getElementById('btn-item')?.addEventListener('click', function() {
          app.dialog.alert('Fitur Item belum diimplementasikan');
        });
        
        document.getElementById('btn-all-history')?.addEventListener('click', function(e) {
          e.preventDefault();
          app.dialog.alert('Fitur Riwayat Semua belum diimplementasikan');
        });
      }
    }
  },
  {
    path: '/calendar/',
    component: `
      <div data-name="calendar" class="page page-calendar">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner">
            <div class="left">
              <a href="/" class="link back">
                <i class="f7-icons">chevron_left</i>
                <span class="if-not-md">Back</span>
              </a>
            </div>
            <div class="title">Kalender Peminjaman</div>
          </div>
        </div>

        <div class="page-content calendar-content">
          <div class="legend-box">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #dcfce7; border: 1px solid #86efac;"></div>
              <span>Tersedia</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #fef3c7; border: 1px solid #fcd34d;"></div>
              <span>Sedang dipinjam</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #fecaca; border: 1px solid #fca5a5;"></div>
              <span>Sudah dikembalikan</span>
            </div>
          </div>

          <div class="calendar-card">
            <div class="calendar-header"></div>
            <div class="calendar-days"></div>
          </div>
        </div>

        <div class="toolbar toolbar-bottom">
          <div class="toolbar-inner">
            <a href="/" class="link">
              <div class="link-content">
                <i class="f7-icons">house_fill</i>
                <span>Beranda</span>
              </div>
            </a>
            <a href="/calendar/" class="link active" data-link-active="active">
              <div class="link-content">
                <i class="f7-icons">calendar</i>
                <span>Kalender</span>
              </div>
            </a>
            <a href="#" class="link" onclick="app.dialog.alert('Fitur Notifikasi belum diimplementasikan'); return false;">
              <div class="link-content">
                <i class="f7-icons">bell_fill</i>
                <span>Notifikasi</span>
              </div>
            </a>
            <a href="#" class="link" onclick="app.dialog.alert('Fitur Bantuan belum diimplementasikan'); return false;">
              <div class="link-content">
                <i class="f7-icons">question_circle</i>
                <span>Bantuan</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    `,
    on: {
      pageInit: function (event, page) {
        initializeCalendar();
      }
    }
  }
];

// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'SIMARSIP App',
  theme: 'auto',
  routes: routes
});

var mainView = app.views.create('.view-main');

// Initialize calendar
function initializeCalendar() {
  let currentDate = new Date(2025, 10, 1); // November 2025
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const calendarHeader = document.querySelector('.calendar-header');
    const calendarDays = document.querySelector('.calendar-days');

    if (!calendarHeader || !calendarDays) {
      console.error('Calendar elements not found');
      return;
    }

    calendarHeader.innerHTML = `
      <button class="btn-nav" id="btn-prev-month">❮</button>
      <h3>${monthNames[currentMonth]} ${currentYear}</h3>
      <button class="btn-nav" id="btn-next-month">❯</button>
    `;

    calendarDays.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    dayHeaders.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'day-header';
      dayHeader.textContent = day;
      calendarDays.appendChild(dayHeader);
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day-card empty';
      calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCard = document.createElement('div');
      dayCard.className = 'day-card';
      
      const dateObj = new Date(currentYear, currentMonth, day);
      const bookingsForDay = getBookingsForDate(dateObj);
      
      // Determine status color
      let statusClass = 'status-available';
      if (bookingsForDay.length > 0) {
        const hasReturned = bookingsForDay.some(b => b.status === 'Sudah dikembalikan');
        const hasBorrowing = bookingsForDay.some(b => b.status === 'Sedang dipinjam');
        
        if (hasBorrowing) {
          statusClass = 'status-borrowing';
        } else if (hasReturned) {
          statusClass = 'status-returned';
        }
      }
      
      dayCard.classList.add(statusClass);
      dayCard.textContent = day;
      dayCard.addEventListener('click', () => showBookingsForDate(dateObj));
      calendarDays.appendChild(dayCard);
    }

    // Add event listeners for month navigation
    document.getElementById('btn-prev-month')?.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    document.getElementById('btn-next-month')?.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  function getBookingsForDate(date) {
    return mockBookings.filter(booking => {
      return booking.date.getFullYear() === date.getFullYear() &&
             booking.date.getMonth() === date.getMonth() &&
             booking.date.getDate() === date.getDate();
    });
  }

  function showBookingsForDate(date) {
    const bookings = getBookingsForDate(date);
    const dateStr = date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    let content = `<h3>${dateStr}</h3>`;
    
    if (bookings.length === 0) {
      content += '<p style="text-align:center; color:#999;">Tidak ada peminjaman pada tanggal ini</p>';
    } else {
      bookings.forEach(booking => {
        const statusColor = booking.status === 'Sudah dikembalikan' ? '#fecaca' : 
                          booking.status === 'Sedang dipinjam' ? '#fef3c7' : '#dcfce7';
        const statusBgColor = booking.status === 'Sudah dikembalikan' ? '#fee2e2' : 
                            booking.status === 'Sedang dipinjam' ? '#fffbeb' : '#f0fdf4';
        
        content += `
          <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; margin-bottom: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">${booking.item}</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 4px;">Peminjam: ${booking.borrowerName}</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 4px;">Jenis: ${booking.type}</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 8px;">Waktu: ${booking.startTime} - ${booking.endTime}</div>
            <div style="background: ${statusBgColor}; color: #666; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; border: 1px solid ${statusColor};">${booking.status}</div>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <button class="popover-button" style="flex: 1; padding: 6px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Edit</button>
              <button class="popover-button" style="flex: 1; padding: 6px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Hapus</button>
              ${booking.status === 'Sedang dipinjam' ? `<button class="popover-button" style="flex: 1; padding: 6px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Kembalikan</button>` : ''}
            </div>
          </div>
        `;
      });
    }

    app.sheet.create({
      content: content,
      on: {
        open: () => {
          document.querySelectorAll('.popover-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const action = e.target.textContent;
              app.sheet.close();
              if (action === 'Edit') {
                app.dialog.alert('Fitur Edit belum diimplementasikan');
              } else if (action === 'Hapus') {
                app.dialog.confirm('Yakin ingin menghapus?', () => {
                  app.dialog.alert('Peminjaman berhasil dihapus');
                });
              } else if (action === 'Kembalikan') {
                app.dialog.confirm('Yakin ingin mengembalikan?', () => {
                  app.dialog.alert('Terima kasih telah mengembalikan');
                });
              }
            });
          });
        }
      }
    }).open();
  }

  // Initial render
  renderCalendar();
}
