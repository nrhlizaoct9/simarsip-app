// =========================
// CALENDAR FUNCTION
// =========================
function initializeCalendar() {
  let currentDate = new Date(2025,10,1);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function getBookingsForDate(date) {
    // Use global mockBookings
    return app.mockBookings.filter(b => 
      b.date.getFullYear()===date.getFullYear() &&
      b.date.getMonth()===date.getMonth() &&
      b.date.getDate()===date.getDate()
    );
  }

  function getPrimaryStatusForDate(bookings) {
    if (bookings.some(b => b.status === "Sedang dipinjam")) return "sedang-dipakai";
    if (bookings.some(b => b.status.toLowerCase() === "pending")) return "pending";
    if (bookings.some(b => b.status === "Sudah dikembalikan")) return "sudah-dikembalikan";
    return "tersedia";
  }

  function getStatusMessage(status, bookings) {
    if (status==="tersedia") return "<b>Tidak ada peminjaman</b>";
    const relevant = bookings.find(b => {
      if (status==="sedang-dipakai") return b.status==="Sedang dipinjam";
      if (status==="pending") return b.status.toLowerCase()==="pending";
      if (status==="sudah-dikembalikan") return b.status==="Sudah dikembalikan";
    });
    if (!relevant) return `<b>Status: ${status.replace('-', ' ')}</b>`;
    return `<b>Status: ${status.replace('-', ' ').toUpperCase()}</b><br>Peminjam: ${relevant.borrowerName}<br>Item: ${relevant.item}<br>Waktu: ${relevant.startTime} - ${relevant.endTime}`;
  }

  function formatDateToString(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function isDateSelected(dateObj) {
    if (!window.dateSelectionState || !window.dateSelectionState.selectedDates) return false;
    return window.dateSelectionState.selectedDates.some(d => {
      const dateToCheck = new Date(d);
      return dateToCheck.getFullYear() === dateObj.getFullYear() &&
             dateToCheck.getMonth() === dateObj.getMonth() &&
             dateToCheck.getDate() === dateObj.getDate();
    });
  }

  function toggleDateSelection(dateObj) {
    if (!window.dateSelectionState) return;
    
    const requiredDays = window.dateSelectionState.requiredDays;
    const selectedDates = window.dateSelectionState.selectedDates;
    const dateString = formatDateToString(dateObj);

    const index = selectedDates.findIndex(d => {
      const dateToCheck = new Date(d);
      return dateToCheck.getFullYear() === dateObj.getFullYear() &&
             dateToCheck.getMonth() === dateObj.getMonth() &&
             dateToCheck.getDate() === dateObj.getDate();
    });

    if (index > -1) {
      // Remove date
      selectedDates.splice(index, 1);
    } else if (selectedDates.length < requiredDays) {
      // Add date
      selectedDates.push(dateString);
    } else {
      app.dialog.alert(`Anda hanya dapat memilih ${requiredDays} hari`, 'Batas Tercapai');
      return;
    }

    renderCalendar();
  }

  function showDateSelectionTips() {
    if (!window.dateSelectionState || !window.dateSelectionState.isSelectingMode) return '';
    
    const requiredDays = window.dateSelectionState.requiredDays;
    const selectedCount = window.dateSelectionState.selectedDates.length;
    const remaining = requiredDays - selectedCount;

    return `
      <div style="background: #F3F4F6; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px;">
        <div style="font-weight: 500; color: #1F2937; margin-bottom: 6px;">Mode Pemilihan Tanggal</div>
        <div style="color: #6B7280; margin-bottom: 4px;">Pilih ${requiredDays} tanggal untuk peminjaman</div>
        <div style="color: #10B981; font-weight: 500;">Terpilih: ${selectedCount}/${requiredDays}</div>
        ${remaining > 0 ? `<div style="color: #6366F1; margin-top: 4px;">Sisa: ${remaining} tanggal</div>` : ''}
      </div>
    `;
  }

  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth+1,0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const calendarHeader = document.querySelector('.calendar-header');
    const calendarDays = document.querySelector('.calendar-days');
    const calendarTips = document.querySelector('.calendar-tips');

    if (!calendarHeader || !calendarDays) return;

    calendarHeader.innerHTML = `
      <button class="btn-nav" id="btn-prev-month">❮</button>
      <h3>${monthNames[currentMonth]} ${currentYear}</h3>
      <button class="btn-nav" id="btn-next-month">❯</button>
    `;

    // Show/hide tips based on mode
    if (calendarTips) {
      if (window.dateSelectionState && window.dateSelectionState.isSelectingMode) {
        calendarTips.innerHTML = showDateSelectionTips();
      } else {
        calendarTips.innerHTML = '';
      }
    }

    calendarDays.innerHTML = "";
    ['Min','Sen','Sel','Rab','Kam','Jum','Sab'].forEach(day=>{
      const header = document.createElement('div');
      header.className="day-header";
      header.textContent=day;
      calendarDays.appendChild(header);
    });

    for(let i=0;i<startingDayOfWeek;i++){
      const empty = document.createElement('div');
      empty.className="day-card empty";
      calendarDays.appendChild(empty);
    }

    for(let d=1; d<=daysInMonth; d++){
      const dateObj = new Date(currentYear,currentMonth,d);
      const bookings = getBookingsForDate(dateObj);

      let statusClass="status-available";
      const hasBorrowing = bookings.some(b=>b.status==="Sedang dipinjam");
      const hasPending = bookings.some(b=>b.status.toLowerCase()==="pending");
      const hasReturned = bookings.some(b=>b.status==="Sudah dikembalikan");
      if(hasBorrowing) statusClass="status-borrowing";
      else if(hasPending) statusClass="status-pending";
      else if(hasReturned) statusClass="status-returned";

      const dayCard = document.createElement('div');
      dayCard.className=`day-card ${statusClass}`;
      dayCard.textContent=d;
      
      // Check if date is selected in multi-date mode
      if (isDateSelected(dateObj)) {
        dayCard.classList.add('date-selected-multiday');
      }

      // In selection mode, allow clicking available dates
      if (window.dateSelectionState && window.dateSelectionState.isSelectingMode) {
        if (statusClass === "status-available") {
          dayCard.style.cursor = "pointer";
          dayCard.addEventListener("click", () => {
            toggleDateSelection(dateObj);
          });
        } else {
          dayCard.style.cursor = "not-allowed";
          dayCard.style.opacity = "0.6";
        }
      } else {
        // Normal mode: show booking details
        dayCard.addEventListener("click", ()=>{
          const primaryStatus = getPrimaryStatusForDate(bookings);

          if(typeof app!=='undefined' && app.dialog){
            if(primaryStatus==="tersedia"){
              app.dialog.create({
                title: 'Lihat Kalender',
                text: getStatusMessage(primaryStatus,bookings),
                buttons: [
                  {
                    text: 'Tutup',
                    close: true
                  }
                ]
              }).open();
            } else {
              app.dialog.alert('Ruangan tidak tersedia pada tanggal ini', 'Tidak Tersedia');
            }
          }
        });
      }

      calendarDays.appendChild(dayCard);
    }

    // Setup navigation buttons
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');

    if(btnPrevMonth) btnPrevMonth.addEventListener('click', ()=>{
      currentMonth--;
      if(currentMonth<0){
        currentMonth=11;
        currentYear--;
      }
      renderCalendar();
    });

    if(btnNextMonth) btnNextMonth.addEventListener('click', ()=>{
      currentMonth++;
      if(currentMonth>11){
        currentMonth=0;
        currentYear++;
      }
      renderCalendar();
    });

    // Add confirm button in selection mode
    const pageContent = document.querySelector('.page-content');
    if (window.dateSelectionState && window.dateSelectionState.isSelectingMode && pageContent) {
      let confirmButton = document.getElementById('btn-confirm-dates');
      if (!confirmButton) {
        confirmButton = document.createElement('button');
        confirmButton.id = 'btn-confirm-dates';
        confirmButton.type = 'button';
        confirmButton.className = 'btn-confirm-dates';
        confirmButton.textContent = 'Konfirmasi Tanggal';
        confirmButton.addEventListener('click', () => {
          if (window.dateSelectionState.selectedDates.length !== window.dateSelectionState.requiredDays) {
            app.dialog.alert(`Pilih ${window.dateSelectionState.requiredDays} tanggal`, 'Belum Lengkap');
            return;
          }
          
          window.dateSelectionState.isSelectingMode = false;
          
          // Call confirmation function in peminjaman.html
          if (typeof window.confirmDateSelection === 'function') {
            window.confirmDateSelection(window.dateSelectionState.selectedDates);
            
            // Navigate back to peminjaman form
            if (app.views && app.views.main && app.views.main.router) {
              app.views.main.router.navigate('/peminjaman/');
            } else {
              window.location.href = 'peminjaman.html';
            }
          }
        });
        
        const buttonsContainer = document.querySelector('.calendar-buttons') || document.createElement('div');
        buttonsContainer.className = 'calendar-buttons';
        buttonsContainer.appendChild(confirmButton);
        
        if (!document.querySelector('.calendar-buttons')) {
          pageContent.appendChild(buttonsContainer);
        }
      }
    }
  }

  renderCalendar();
}

// =========================
// INITIALIZE FAB
// =========================
function initializeFab() {
  const fabAdd = document.getElementById('fab-add');
  if(!fabAdd) return;
  fabAdd.addEventListener('click', (e)=>{
    const today = new Date().toISOString().split('T')[0];
    if(app.views && app.views.main && app.views.main.router){
      app.views.main.router.navigate(`/peminjaman/?date=${today}`);
    } else {
      window.location.href = `peminjaman.html?date=${today}`;
    }
  });
}

// =========================
// INITIALIZE ALL
// =========================
document.addEventListener('DOMContentLoaded',()=>{
  if(typeof app!=='undefined'){
    initializeCalendar();
    initializeFab();
  } else {
    console.error('[calendar.js] Framework7 app object not found');
  }
});
