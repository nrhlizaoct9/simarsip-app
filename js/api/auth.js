// js/api/auth.js
const API_URL = 'http://localhost:8000/api'; // PASTIKAN PORT 8000

async function loginUser(email, password) {
  try {
    console.log('Attempting login to:', API_URL);
    
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password
    });

    const token = response.data.token;
    const user = response.data.user;

    // Simpan token dan data pengguna
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    // FIX: Gunakan Framework7 yang benar atau fallback
    // Setelah login berhasil, selalu alihkan ke index.html secara langsung.
    // Ini memastikan aplikasi Framework7 dimuat ulang sepenuhnya.
    alert(`Login berhasil! Selamat datang ${user.name || 'Pengguna'}!`); // Opsional: Untuk feedback langsung
    window.location.href = './index.html'; // Mengalihkan ke halaman utama
    
    return true;

  } catch (error) {
    console.error('Login error details:', error);
    let errorMessage = 'Terjadi kesalahan saat login.';
    
    if (error.response && error.response.data) {
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'Tidak bisa terhubung ke server. Pastikan Laravel berjalan di port 8000.';
    }
    
    // FIX: Error handling tanpa app
    if (typeof window.app !== 'undefined' && window.app.toast) {
      window.app.toast.create({
        text: errorMessage,
        position: 'center',
        closeTimeout: 4000,
      }).open();
    } else {
      // Fallback alert
      alert('Login Gagal: ' + errorMessage);
    }
    
    return false;
  }
}
