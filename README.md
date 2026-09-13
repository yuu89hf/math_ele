# 🧮 Math Studio - Platform Pembelajaran Matematika SD Interaktif

**Math Studio** adalah aplikasi web edukasi interaktif berbasis **Vanilla HTML5, CSS3, & Modern JavaScript**. Dirancang khusus untuk membantu siswa Sekolah Dasar (SD) memahami konsep dasar matematika melalui visualisasi dinamis, animasi *step-by-step*, dan media pembelajaran interaktif tanpa ketergantungan framework backend berat.

Aplikasi ini beroperasi **100% Client-Side** (tanpa PHP, tanpa Node.js, tanpa database), berukuran sangat ringan (< 200 KB), dan dapat dibuka langsung melalui peramban web (*browser*).

---

## 🌟 Modul Pembelajaran Utama

### 1. 🌿 Modul 01: Studio FPB & KPK (`fpbkpk.html`)
- **Visualisasi Pohon Faktor Dahan**: Diagram faktorisasi prima bercabang simetris (*Authentic Factor Tree*).
- **Target Perhitungan Interaktif**:
  - 🛡️ **Target FPB**: Menghitung Faktor Persekutuan Terbesar dan menandai eksponen terkecil dengan blok warna emerald.
  - ⚡ **Target KPK**: Menghitung Kelipatan Persekutuan Terkecil dan menandai eksponen terbesar dengan blok warna ungu.
- **Faktorisasi Lengkap & Eksponen**: Menampilkan perkalian prima dasar dan notasi eksponen.
- **Pilihan 2, 3, atau 4 Angka**: Fleksibel untuk latihan berbagai variasi angka.

---

### 2. ➗ Modul 02: Studio Pembagian Porogapit (`pembagian.html`)
- **Pembagian Bersusun (Porogapit)**: Visualisasi papan tulis digital dengan animasi pengurangan bertahap, efek cahaya produk (*product glow*), dan garis pengurangan.
- **Panduan Pengali Interaktif**: Membantu siswa menguji pengali bertahap dengan pratinjau instan.
- **Deteksi Pembagian Bersisa**: Memberikan peringatan jika angka menghasilkan desimal dan menyarankan angka terdekat yang habis dibagi.
- **Selebrasi Kemenangan**: Modal perayaan dengan animasi confetti saat pembagian selesai sempurna.

---

### 3. ➖ Modul 03: Studio Pengurangan Bersusun (`pengurangan.html`)
- **Teknik Meminjam (Regrouping)**: Visualisasi pengurangan bersusun ke bawah dengan animasi halus meminjam puluhan.
- **Animasi Soft Blur & Cross**: Angka asal memudar halus (*smooth blur*) saat meminjam puluhan, digantikan badge nilai baru secara stabil di baris atas.
- **Langkah Mikro Berurutan**: Tombol *Langkah Berikutnya* menjalankan satu tahapan demi tahapan lengkap dengan log penjelasan logika matematika di bawahnya.

---

## 📱 Fitur Unggulan UX & Audio

- **Sintesis Audio Murni (Web Audio API)**:
  - Efek suara interaktif (*SFX*) untuk klik tombol, langkah sukses, kesalahan, dan selebrasi kemenangan tanpa file MP3 eksternal.
  - Musik latar santai (*Ambient Pentatonic Chords*) yang dihasilkan secara sintetis langsung oleh browser.
- **Responsif & Ramah Layar Sentuh**:
  - Tombol sakelar tampilan (**Kontrol & Soal** vs **Papan Visual**) untuk kenyamanan belajar di ponsel pintar (*smartphone*).
  - Drawer navigasi hamburger untuk perpindahan modul secara cepat.
- **Mode Terang & Gelap (Light / Dark Theme)**:
  - Tersimpan otomatis di *Local Storage* peramban pengguna.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat murni statis. Anda dapat membukanya dengan cara apa pun:

### Opsi 1: Klik Ganda Langsung (Tanpa Server)
Buka folder `math_ele` di Windows File Explorer, lalu klik ganda pada file [`index.html`](index.html). Aplikasi langsung berjalan di browser!

### Opsi 2: Menggunakan Laragon / Local Web Server
Jika diletakkan di direktori Laragon `www/math_ele`:
- Buka browser dan akses: `http://localhost/math_ele/` atau `http://math_ele.test/`

### Opsi 3: Static Hosting
Dapat langsung di-deploy ke GitHub Pages, Vercel, Netlify, Cloudflare Pages, atau hosting statis lainnya tanpa build step!

---

## 📁 Struktur Berkas

```
math_ele/
├── index.html            # Portal Menu Utama (Pilih Modul)
├── fpbkpk.html           # Modul 01: Studio FPB & KPK
├── pembagian.html        # Modul 02: Studio Pembagian Porogapit
├── pengurangan.html      # Modul 03: Studio Pengurangan Bersusun
├── css/
│   └── style.css         # Keyframe animasi kustom & pola kertas grid
├── js/
│   ├── audio.js          # Web Audio API Sound Effects & Synth BGM
│   ├── shared.js         # Pengontrol Tema, Audio, dan Menu Drawer
│   ├── fpbkpk.js         # Logika kalkulasi pohon faktor FPB & KPK
│   ├── pembagian.js      # Mesin & visualisator pembagian porogapit
│   └── pengurangan.js    # Mesin & visualisator pengurangan meminjam
├── favicon.ico           # Ikon aplikasi
└── README.md             # Dokumentasi proyek
```

---

## 📄 Lisensi

Project ini dirilis di bawah lisensi [MIT License](LICENSE).
