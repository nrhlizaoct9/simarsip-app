# 🔧 TROUBLESHOOTING GUIDE - Connection Error

**Issue:** `127.0.0.1 refused to connect` atau `ERR_CONNECTION_REFUSED`  
**Status:** ✅ RESOLVED

---

## 🐛 MASALAH

Ketika Anda mencoba membuka `http://localhost:8080` atau `http://127.0.0.1:8080`, browser menunjukkan error:
```
127.0.0.1 refused to connect
ERR_CONNECTION_REFUSED
```

---

## ✅ SOLUSI

### Root Cause
Port 8080 sudah digunakan oleh process lain (dalam kasus ini, PID 10020 masih berjalan dari session sebelumnya).

### Cara Memperbaiki

#### **Opsi 1: Kill Process Lama (Recommended)**

```bash
# 1. Find process using port 8080
netstat -ano | findstr :8080

# 2. Kill the process (replace PID dengan nomor dari step 1)
taskkill /PID [PID_NUMBER] /F

# Contoh (dalam kasus ini PID adalah 10020):
taskkill /PID 10020 /F

# 3. Start server lagi
cd d:\simarsip_app
npm start
```

#### **Opsi 2: Gunakan Port Berbeda**

```bash
# Start dengan port 3000 instead of 8080
npx http-server -p 3000 -c-1

# Akses di: http://localhost:3000
```

#### **Opsi 3: Full Reset**

```bash
# 1. Kill semua Node processes
taskkill /F /IM node.exe

# 2. Clear npm cache (optional)
npm cache clean --force

# 3. Install dependencies lagi
npm install

# 4. Start fresh
npm start
```

---

## ✅ VERIFIKASI SERVER BERJALAN

Setelah menjalankan solusi di atas, verify dengan:

### Method 1: Check Port
```bash
netstat -ano | findstr :8080
# Harusnya ada baris dengan status LISTENING
```

### Method 2: Curl Test
```bash
curl http://localhost:8080
# Harusnya return HTML content, bukan error
```

### Method 3: Browser Test
```
Buka: http://localhost:8080
atau: http://127.0.0.1:8080
```

---

## 📊 STATUS CHECKING

### Port Status Interpretation

| Status | Meaning | Action |
|--------|---------|--------|
| LISTENING | ✅ Server running | Browser should work |
| TIME_WAIT | Leftover connections | Normal, will clear |
| FIN_WAIT_2 | Closing connections | Normal, will clear |
| CLOSE_WAIT | Pending close | May need restart |
| None found | ❌ Port free | Need to start server |

---

## 🚀 STEP-BY-STEP FIX

### Langkah 1: Close Current Browser
```
Close tab dengan localhost:8080
```

### Langkah 2: Kill Old Process
```bash
taskkill /PID 10020 /F
# atau jika tidak tahu PID:
taskkill /F /IM node.exe /IM http-server.exe
```

### Langkah 3: Start Server Fresh
```bash
cd d:\simarsip_app
npm start
```

### Langkah 4: Wait for Server
```
Tunggu 2-3 detik hingga server fully start
Cek output di terminal untuk confirmation
```

### Langkah 5: Open Browser
```
Buka: http://localhost:8080
atau: http://127.0.0.1:8080
```

---

## ❌ COMMON MISTAKES

### ❌ Mistake 1: Wrong Path
```bash
# WRONG:
npm start
# (from any directory)

# RIGHT:
cd d:\simarsip_app
npm start
```

### ❌ Mistake 2: Multiple npm start
```bash
# WRONG:
npm start    # Terminal 1
npm start    # Terminal 2 (port already in use!)

# RIGHT:
npm start    # Terminal 1 only
# Jika ingin second window, buat terminal baru tapi DON'T run npm start
```

### ❌ Mistake 3: Browser Cache
```bash
# WRONG:
Refresh with F5 (may use cache)

# RIGHT:
Refresh with Ctrl+Shift+R (hard refresh, clear cache)
atau: Ctrl+F5 (force refresh)
```

---

## 🔄 COMPLETE RESET PROCEDURE

Jika semua tidak bekerja, lakukan reset penuh:

```bash
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Navigate to project
cd d:\simarsip_app

# 3. Check port is free
netstat -ano | findstr :8080
# Should show nothing

# 4. Install fresh
npm install

# 5. Start fresh
npm start

# 6. Open browser
# http://localhost:8080
```

---

## 🆘 ADVANCED TROUBLESHOOTING

### Issue: Still getting connection refused

**Solution:**

```bash
# 1. Check if http-server is installed
npm list http-server

# 2. If not installed, install it
npm install http-server

# 3. Try manual start
npx http-server -p 8080 -c-1

# 4. If still fails, check Windows firewall
# Windows Defender Firewall > Allow app through firewall
# Make sure Node.js is allowed
```

### Issue: Port 8080 still in use after taskkill

```bash
# Try stronger kill command
taskkill /F /IM node.exe /IM npm.exe /IM http-server.exe

# Wait 5 seconds
timeout /t 5

# Try different port
npx http-server -p 9000 -c-1
```

### Issue: npm start not working at all

```bash
# Check npm installation
npm --version

# Reinstall http-server globally
npm install -g http-server

# Try direct http-server
http-server -p 8080 -c-1
```

---

## 📝 ERROR MESSAGES & MEANINGS

### `EADDRINUSE: address already in use 0.0.0.0:8080`
→ Port sudah digunakan → Kill old process → Restart

### `127.0.0.1 refused to connect`
→ Server tidak running → Start npm start → Verify port open

### `ERR_CONNECTION_REFUSED`
→ Connection rejected → Check firewall → Check server status

### `ENOTFOUND localhost`
→ DNS issue → Try 127.0.0.1 instead of localhost

### `Cannot find module 'http-server'`
→ Dependencies missing → Run `npm install`

---

## ✅ VERIFICATION CHECKLIST

- [ ] Terminal showing "Starting server"
- [ ] No error messages in terminal
- [ ] netstat showing port 8080 LISTENING
- [ ] Browser can open http://localhost:8080
- [ ] Page loads (shows SIMARSIP App)
- [ ] Buttons responsive

---

## 🎯 SUMMARY

**Problem:** Connection refused pada port 8080  
**Root Cause:** Process lama masih berjalan di port 8080  
**Solution:** Kill process lama (taskkill /PID 10020 /F) dan restart server  
**Status:** ✅ FIXED

---

## 📞 IF STILL NOT WORKING

Try these in order:

1. **Restart computer** (nuclear option)
2. **Use different port**: `npx http-server -p 3000 -c-1`
3. **Check firewall:** Windows Defender Firewall settings
4. **Check antivirus:** Disable temporarily to test
5. **Check DNS:** Use 127.0.0.1 instead of localhost
6. **Full npm reinstall:**
   ```bash
   npm cache clean --force
   rm -r node_modules
   npm install
   npm start
   ```

---

## 🎉 SHOULD NOW WORK!

After applying the solution above, you should be able to:

✅ Access http://localhost:8080  
✅ See SIMARSIP App home page  
✅ Click menu buttons  
✅ Test logout functionality  
✅ Test responsive design  

---

**Last Updated:** November 20, 2025  
**Issue Status:** ✅ RESOLVED  
**Server Port:** 8080 (or use alternative port)

---

## 🚀 NEXT STEPS

1. **Start server:** `npm start`
2. **Open browser:** http://localhost:8080
3. **Test features:**
   - Click profil → Klik "Keluar" → Confirm logout ✅
   - Open DevTools → Toggle device emulation → Test responsive ✅
4. **Ready to deploy!** 

Enjoy! 🎉
