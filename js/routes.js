// Routes Configuration - Static HTML Files
var routes = [
  {
    path: '/',
    url: '/pages/home.html',
    on: {
      pageInit: function (event, page) {
        // Handle home page buttons
        var btnRoom = document.getElementById('btn-room');
        if (btnRoom) {
          btnRoom.addEventListener('click', function() {
            app.dialog.alert('Fitur Ruangan belum diimplementasikan');
          });
        }
        
        var btnDispen = document.getElementById('btn-dispen');
        if (btnDispen) {
          btnDispen.addEventListener('click', function() {
            app.dialog.alert('Fitur Dispensasi belum diimplementasikan');
          });
        }
        
        var btnItem = document.getElementById('btn-item');
        if (btnItem) {
          btnItem.addEventListener('click', function() {
            app.dialog.alert('Fitur Item belum diimplementasikan');
          });
        }
        
        var btnAllHistory = document.getElementById('btn-all-history');
        if (btnAllHistory) {
          btnAllHistory.addEventListener('click', function(e) {
            e.preventDefault();
            app.dialog.alert('Fitur Riwayat Semua belum diimplementasikan');
          });
        }
      }
    }
  },
  {
    path: '/calendar/',
    url: '/pages/calendar.html',
    on: {
      pageInit: function (event, page) {
        // Initialize calendar
        initializeCalendar();
      }
    }
  },
  {
    path: '/peminjaman/',
    url: '/pages/peminjaman.html',
    on: {
      pageInit: function (event, page) {
        // You might want to add specific initialization logic for the peminjaman page here
        // For example, pre-filling the date if passed from calendar
        const dateParam = page.route.query.date;
        if (dateParam) {
          document.getElementById('date').value = dateParam;
          document.getElementById('returnDate').value = dateParam;
        }
      }
    }
  },
  {
    path: '/profile/',
    url: '/pages/profile.html',
    on: {
      pageInit: function (event, page) {
        console.log('[js/routes.js] Profile page initialized.');
        // Add any specific initialization logic for the profile page here if needed
      }
    }
  }
];
