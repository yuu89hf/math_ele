# 🧮 Math Studio - Platform Pembelajaran Matematika SD Interaktif

**Math Studio** adalah aplikasi web interaktif berbasis **Laravel 12** yang dirancang khusus untuk membantu siswa Sekolah Dasar (SD) memahami konsep dasar matematika melalui visualisasi dinamis, animasi *step-by-step*, dan media pembelajaran interaktif.

Aplikasi ini beroperasi **100% tanpa memerlukan database (database-free)**, tanpa skor/poin persaingan, berfokus murni pada pemahaman visual, serta mendukung tampilan **Light Theme** bawaan yang ramah mobile dan elegan.

---

## 🌟 Modul Pembelajaran utama

### 1. 🌿 Modul 01: Studio FPB & KPK (`/fpbkpk`)
- **Visualisasi Pohon Faktor Dahan**: Diagram faktorisasi prima bercabang simetris (Authentic Factor Tree).
- **2 Target Perhitungan**:
  - 🛡️ **Target FPB**: Menghitung Faktor Persekutuan Terbesar $\text{FPB}(a, b)$ dan memberi penanda warna hijau emerald pada eksponen terkecil.
  - ⚡ **Target KPK**: Menghitung Kelipatan Persekutuan Terkecil $\text{KPK}(a, b)$ dan memberi penanda warna ungu pada eksponen terbesar.
- **Faktorisasi Prima Lengkap**: Menampilkan persamaan perkalian lengkap (misal $24 = 2 \times 2 \times 2 \times 3$) dan bentuk eksponen ($24 = 2^3 \times 3$).
- **High-Contrast Color Highlighting**: Penandaan angka eksponen yang "menang" diambil menggunakan murni blok warna berpendar tanpa teks label berantakan.

---

### 2. ➗ Modul 02: Studio Pembagian Porogapit (`/pembagian`)
- **Pembagian Bersusun (Porogapit)**: Visualisasi papan tulis digital dengan animasi garis pembagian dan pengurangan bertahap.
- **Panduan Pengali Ramah**: Membantu siswa menentukan pengali bersahabat (seperti $10, 5, 2, 1$).
- **Selebrasi Kemenangan**: Modal perayaan interaktif dengan tombol "Tutup" sederhana tanpa perhitungan skor persaingan.

---

### 3. ➖ Modul 03: Studio Pengurangan Bersusun (`/pengurangan`)
- **Teknik Meminjam (Regrouping)**: Visualisasi pengurangan bersusun ke bawah untuk soal-soal seperti $27 - 9 = 18$.
- **Animasi Soft Blur & Morphing**:
  - Angka puluhan yang dipinjam ($2$) dan angka satuan yang menerima ($7$) secara otomatis di-blur halus dan memudar ke latar belakang.
  - Badge angka baru hasil meminjam ($1$ merah dan $17$ hijau) muncul secara stabil dan tegas di atasnya.
- **Urutan Langkah Mikro & Penjelasan Logika**:
  - Setiap klik tombol **"Langkah Berikutnya"** menjalankan 1 mikro-langkah berurutan tanpa lompat-lompat.
  - Dilengkapi kotak penjelasan logika matematika transparan yang menjelaskan alasan dan perubahan nilai angka.

---

## 📱 Fitur Unggulan UX & Mobile

- **Mobile First & Navigasi Responsif**:
  - **Drawer Navigasi Halaman (🍔 Hamburger Left)**: Pindah halaman antara Menu Utama, FPB & KPK, Pembagian, dan Pengurangan.
  - **Tombol Sakelar Tampilan (📑 Right Switcher)**: Beralih instan antara panel **Kontrol & Soal** dan **Papan Visual** di HP.
  - **Default Tampilan HP**: Dimulai dari panel **Kontrol & Soal** dan otomatis meluncur ke **Papan Visual** saat tombol aksi ditekan.
- **Sintesis Audio Web (Web Audio API)**:
  - Efek suara interaktif (SFX) klik, langkah sukses, meminjam, dan selebrasi tanpa ketergantungan file MP3 eksternal.
  - Musik latar (*Pentatonic Ambient BGM*) yang lembut dan menenangkan.
- **Desain Modern Light Theme**:
  - Menggunakan Tailwind CSS v4, font *Plus Jakarta Sans*, gradien warna vibran, dan latar belakang pola kertas grid (*grid pattern paper*).

---

## 🚀 Panduan Jalankan Aplikasi Secara Lokal

### Persyaratan Sistem:
- PHP >= 8.2
- Composer
- Node.js & NPM (Opsional untuk asset bundling)

### Langkah Instalasi:

1. **Clone / Buka Direktori Project**:
   ```bash
   cd math_ele
   ```

2. **Install Dependensi Composer**:
   ```bash
   composer install
   ```

3. **Salin File Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Jalankan Server Lokal Laravel**:
   ```bash
   php artisan serve
   ```
   Akses aplikasi melalui peramban web di: `http://localhost:8000`

---

## 🛠️ Struktur Direktori Utama

```
math_ele/
├── app/
├── config/
├── public/
├── resources/
│   ├── css/
│   │   └── app.css (Tailwind CSS v4 & custom animations)
│   ├── js/
│   │   ├── fpbkpk/ (Module JS FPB & KPK)
│   │   ├── math2/  (Module JS Pembagian Porogapit & Synthesizer Audio)
│   │   ├── pengurangan/ (Module JS Pengurangan Bersusun)
│   │   └── app.js (Main Entrypoint)
│   └── views/
│       ├── components/
│       │   ├── layout/
│       │   ├── math/ (Control Panel & Visual Canvas Components)
│       │   ├── header.blade.php
│       │   └── mobile-tabs.blade.php
│       ├── welcome.blade.php (Selection Hub Portal)
│       ├── fpbkpk.blade.php
│       ├── pembagian.blade.php
│       └── pengurangan.blade.php
└── routes/
    └── web.php (Dynamic Web Routes)
```

---

## 📄 Lisensi

Project ini dirilis di bawah lisensi [MIT License](LICENSE).
