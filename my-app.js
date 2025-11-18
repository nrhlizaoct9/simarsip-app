// Initialize Framework7
// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'SIMARSIP App',
  theme: 'auto',
  routes: routes,
  preloadPreviousPage: true
});

// Global mock data for bookings
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

// Create main view
var mainView = app.views.create('.view-main');

// Ensure calendar script is loaded and initialize calendar when calendar page opens
app.on('pageAfterIn', function (page) {
  if (page.name === 'calendar') {
    console.log('[my-app.js] Calendar page fully initialized via pageAfterIn');
    // Ensure popups are initialized and then call calendar functions
    try {
      console.log('[my-app.js] app object available:', typeof app !== 'undefined');
      console.log('[my-app.js] app.popup object available:', typeof app !== 'undefined' && typeof app.popup !== 'undefined');

      // Initialize popups first
      app.popup.create({ el: '#popup-day-details' }); // Only initialize day details popup

      // Then initialize calendar and add booking functionality
      if (typeof initializeCalendar === 'function') initializeCalendar();
      if (typeof initializeFab === 'function') initializeFab(); // Use initializeFab
    } catch (err) {
      console.error('[my-app.js] Error during calendar page initialization:', err);
    }
  }
});
