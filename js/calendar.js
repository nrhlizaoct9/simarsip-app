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

  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth+1,0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const calendarHeader = document.querySelector('.calendar-header');
    const calendarDays = document.querySelector('.calendar-days');

    if (!calendarHeader || !calendarDays) return;

    calendarHeader.innerHTML = `
      <button class="btn-nav" id="btn-prev-month">❮</button>
      <h3>${monthNames[currentMonth]} ${currentYear}</h3>
      <button class="btn-nav" id="btn-next-month">❯</button>
    `;

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

      dayCard.addEventListener("click", ()=>{
        const primaryStatus = getPrimaryStatusForDate(bookings);

        if(typeof app!=='undefined' && app.dialog){
          if(primaryStatus==="tersedia" || primaryStatus==="sudah-dikembalikan"){
            app.dialog.confirm(
              getStatusMessage(primaryStatus,bookings) + "<br><br>Tambahkan peminjaman baru?",
              "Informasi Tanggal",
              ()=>{
                const selectedDate = dateObj.toISOString().split('T')[0];
                if(app.views && app.views.main && app.views.main.router){
                  app.views.main.router.navigate(`/peminjaman/?date=${selectedDate}`);
                } else {
                  window.location.href = `peminjaman.html?date=${selectedDate}`;
                }
              }
            );
          } else {
            app.dialog.alert(
              getStatusMessage(primaryStatus,bookings),
              "Informasi Tanggal"
            );
          }
        } else {
          alert(`Tanggal: ${dateObj.toLocaleDateString('id-ID')}`);
        }
      });

      calendarDays.appendChild(dayCard);
    }

    document.getElementById("btn-prev-month").onclick=()=>{
      currentMonth--; if(currentMonth<0){currentMonth=11; currentYear--;}
      renderCalendar();
    };
    document.getElementById("btn-next-month").onclick=()=>{
      currentMonth++; if(currentMonth>11){currentMonth=0; currentYear++;}
      renderCalendar();
    };
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
    // e.preventDefault(); // Removed to allow default link behavior
    const today = new Date().toISOString().split('T')[0];
    if(app.views && app.views.main && app.views.main.router){
      app.views.main.router.navigate(`/peminjaman/?date=${today}`); // Use the correct route path
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
