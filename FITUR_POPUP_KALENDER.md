# Fitur Pop-up Informasi Kalender - SIMARSIP

## 📋 Deskripsi Fitur

Pop-up informasi kalender adalah fitur interaktif yang memudahkan pengguna melihat status peminjaman pada tanggal tertentu dengan sekali klik. Fitur ini dirancang untuk memberikan pengalaman pengguna yang cepat, intuitif, dan informatif tanpa perlu meninggalkan halaman kalender.

---

## 🎯 Tujuan Fitur

- **Mempermudah akses informasi**: Pengguna dapat melihat detail status peminjaman tanpa navigasi yang rumit.
- **Meningkatkan transparansi**: Status arsip dan informasi peminjam ditampilkan dengan jelas pada satu tempat.
- **Menghemat waktu**: Informasi lengkap tersedia dengan satu klik langsung pada tanggal kalender.

---

## 🔍 Cara Kerja

### 1. **Tampilan Kalender**
Kalender menampilkan setiap tanggal dengan warna latar yang menunjukkan status:

| Status | Warna Latar | Arti |
|--------|-----------|------|
| **Tersedia** | Hijau (#dcfce7) | Tidak ada peminjaman aktif, arsip tersedia untuk dipinjam |
| **Sedang Dipinjam** | Kuning (#fef3c7) | Ada arsip yang sedang dipinjam pada tanggal ini |
| **Pending** | Biru (#dbeafe) | Permintaan peminjaman menunggu persetujuan |
| **Sudah Dikembalikan** | Merah (#fecaca) | Arsip telah dikembalikan (riwayat) |

### 2. **Interaksi Pengguna**
Ketika pengguna **mengklik salah satu tanggal**, sistem akan:
1. Mendeteksi tanggal yang dipilih
2. Mengambil data peminjaman untuk tanggal tersebut
3. Menampilkan pop-up sheet dengan informasi detail

### 3. **Konten Pop-up**

Pop-up menampilkan informasi dalam format yang terstruktur dan mudah dibaca:

```
┌─────────────────────────────────────┐
│  Senin, 18 November 2025            │
├─────────────────────────────────────┤
│                                      │
│  📦 Ruang Seminar B                 │
│  Jenis: Ruangan                     │
│  Peminjam: Budi Santoso             │
│  Waktu: 10:00 - 12:00               │
│  Status: [Sedang Dipinjam]          │
│                                      │
│  [Edit]  [Hapus]  [Kembalikan]      │
│                                      │
└─────────────────────────────────────┘
```

#### Detail Informasi yang Ditampilkan:

- **Tanggal Lengkap**: Hari, tanggal, bulan, dan tahun (contoh: Senin, 18 November 2025)
- **Nama Arsip**: Judul atau nama item yang dipinjam (contoh: Ruang Seminar B, Proyektor Sony)
- **Jenis Arsip**: Kategori peminjaman (Ruangan / Barang)
- **Nama Peminjam**: Nama lengkap orang yang meminjam
- **Waktu Peminjaman**: Jam mulai dan jam selesai dalam format 24-jam
- **Status Badge**: Menampilkan status dengan warna yang sesuai dengan kalender

#### Tombol Aksi:
- **Edit**: Untuk mengubah detail peminjaman (fitur akan datang)
- **Hapus**: Untuk membatalkan atau menghapus peminjaman
- **Kembalikan**: Hanya muncul jika status "Sedang Dipinjam", untuk menandai arsip sudah dikembalikan

---

## 📱 Pengalaman Pengguna

### Skenario Penggunaan:

**Skenario 1: Cek Status Tanggal dengan Peminjaman**
1. Pengguna membuka halaman Kalender
2. Melihat tanggal 15 November berwarna kuning (Sedang Dipinjam)
3. Klik tanggal 15 November
4. Pop-up muncul menampilkan: Proyektor Sony sedang dipinjam oleh Siti Nurhaliza, jam 13:00 - 15:00
5. Pengguna dapat memilih untuk Edit, Hapus, atau Kembalikan

**Skenario 2: Cek Tanggal Kosong**
1. Pengguna klik tanggal yang berwarna hijau (Tersedia)
2. Pop-up menampilkan pesan: "Tidak ada peminjaman pada tanggal ini"
3. Pengguna dapat membuka form tambah peminjaman atau menutup pop-up

---

## 🎨 Desain Pop-up

### Styling:
- **Posisi**: Bottom sheet (naik dari bawah layar) ✓ intuitif untuk mobile
- **Background**: Putih dengan shadow untuk efek kedalaman
- **Typography**: 
  - Judul tanggal: Bold, ukuran 16px
  - Informasi detail: Regular, ukuran 13px
  - Status badge: Small label dengan background warna sesuai status
- **Animasi**: Smooth slide-up dan fade-in untuk pengalaman lebih halus

### Responsif:
- Desktop: Pop-up berukuran standar, centered atau right-aligned
- Tablet: Pop-up 80% lebar layar
- Mobile: Full-width bottom sheet dengan padding

---

## 🔧 Fitur Teknis

### Data yang Digunakan:
Pop-up mengambil data dari `mockBookings` array yang berisi:
```javascript
{
  id: 2,
  borrowerName: 'Siti Nurhaliza',
  item: 'Proyektor Sony VPL',
  type: 'Barang',
  status: 'Sedang dipinjam',
  date: new Date(2025, 10, 15),
  startTime: '13:00',
  endTime: '15:00'
}
```

### Event Handling:
- Listener pada setiap `.day-card` (kartu tanggal)
- Trigger: `click` event
- Action: Panggil fungsi `showBookingsForDate(dateObj)`
- Render: Buat DOM dinamis dan tampilkan melalui `app.sheet.create()`

### Status Priority:
Jika ada multiple peminjaman pada tanggal yang sama, status ditampilkan dengan prioritas:
1. **Sedang Dipinjam** (highest priority - penting!)
2. **Pending** (menunggu respons)
3. **Sudah Dikembalikan** (riwayat)
4. **Tersedia** (lowest priority - tidak ada apa-apa)

---

## ✨ Keunggulan Fitur

✅ **User-Friendly**: Satu klik untuk melihat semua info yang dibutuhkan  
✅ **Visual Clarity**: Warna memudahkan identifikasi status sekilas  
✅ **Mobile-Optimized**: Bottom sheet cocok untuk perangkat mobile  
✅ **Real-time**: Data langsung dari database mockBookings  
✅ **Actionable**: Tombol untuk edit, hapus, atau kembalikan langsung dari pop-up  

---

## 🚀 Pengembangan Selanjutnya (Roadmap)

- [ ] Integrasi backend API untuk sinkronisasi data real-time
- [ ] Notifikasi reminder untuk peminjaman yang akan jatuh tempo
- [ ] Fitur export/print laporan peminjaman per tanggal
- [ ] Filter dan search dalam pop-up untuk multi-items pada hari yang sama
- [ ] Integrasi calendar sharing untuk tim manajemen arsip
- [ ] Historical view dan audit trail untuk setiap peminjaman

---

## 📞 Support

Jika ada pertanyaan atau feedback tentang fitur ini, silakan hubungi tim development SIMARSIP.

---

**Versi**: 1.0  
**Tanggal**: November 2025  
**Dibuat untuk**: SIMARSIP - Sistem Manajemen Arsip & Inventaris Peminjaman
