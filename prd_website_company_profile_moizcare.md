# Product Requirement Document (PRD)
## Website Company Profile MoizCare (SIMRS Pemasaran & Lead Generation)

| Detail Dokumen | Keterangan |
| --- | --- |
| **Nama Produk** | Website Company Profile & Landing Page MoizCare |
| **Entitas Bisnis** | CV. Panda Global Teknologi |
| **Domain Utama** | www.moizcare.com |
| **Target Utama** | Direktur RS, Manajemen Faskes, Kepala IT RS, Pemilik Klinik |
| **Versi Dokumen** | 1.0.0 |
| **Status Dokumen** | Ready for Design & Development |

---

## 1. Pendahuluan & Tujuan Produk

### 1.1 Visi Produk
Membangun website *company profile* dan *landing page* yang modern, futuristik, dan terpercaya untuk merepresentasikan **MoizCare** sebagai penyedia sistem informasi manajemen rumah sakit (SIMRS) terintegrasi terdepan di Indonesia.

### 1.2 Tujuan Utama (Business Goals)
1. **Lead Generation:** Mengubah pengunjung website (stakeholder faskes) menjadi calon klien potensial melalui penawaran *Live Demo* dan konsultasi gratis.
2. **Brand Awareness & Authority:** Menampilkan reputasi CV. Panda Global Teknologi, portofolio klien, dan kepatuhan penuh terhadap regulasi kesehatan nasional (Kemenkes & BPJS).
3. **Product Showcase:** Menyajikan keunggulan 40+ modul, arsitektur teknis, dan transparansi investasi paket SIMRS secara interaktif dan mudah dipahami.

---

## 2. Target Audiens & Persona

1. **Direksi & Pemilik Rumah Sakit (C-Level):**
   * *Fokus:* Keuntungan investasi, kepatuhan akreditasi, transparansi laporan keuangan eksekutif.
2. **Manajemen Operasional & Kepala Divisi Rekam Medis:**
   * *Fokus:*Kemudahan penggunaan (UI/UX), modul RME terpadu, otomatisasi antrean & BPJS.
3. **Tim IT & Kepala SIMRS Faskes:**
   * *Fokus:* Arsitektur teknis (<100ms query), kehandalan database, integrasi Satu Sehat (HL7 FHIR R4), dan keamanan data (RBAC, TTE).

---

## 3. Arsitektur Informasi & Struktur Halaman (Sitemap)

Website dirancang sebagai *Landing Page Utama (Single-Page Scroll / Multi-Tab)* dengan navigasi berikut:

```
[ NAVIGATION BAR ] 
  ├── Beranda (Hero)
  ├── Fitur & Modul
  ├── Interoperabilitas (Satu Sehat & BPJS)
  ├── Portofolio & Klien
  ├── Skema Investasi & Biaya
  ├── Alur Implementasi
  └── [ CTA Button: Minta Live Demo / Hubungi WhatsApp ]
```

---

## 4. Spesifikasi Konten & Layout Halaman (Page Sections)

### 4.1 Header / Hero Section
* **Visual:** Tema futuristik *Dark Health-Tech* (Sesuai identitas visual PDF: Dark Blue dengan aksen Neon Blue & Pink/Magenta).
* **Headline:** "Transformasi Layanan Kesehatan Melalui SIM-RS Terintegrasi & Modern"
* **Sub-headline:** "Sistem Informasi Manajemen Rumah Sakit yang andal, aman, berstandar Kemenkes RI (Satu Sehat), BPJS Health Bridging, dan mendukung akreditasi faskes Anda."
* **Primary Call-to-Action (CTA):** "Jadwalkan Live Demo" (Membuka Form Modal / WhatsApp direct).
* **Secondary CTA:** "Lihat Portofolio Klien".
* **Key Metrics Badge (Statistik Cepat):**
  * `40+` Modul Medis & Administrasi
  * `100%` Kompatibel Satu Sehat (HL7 FHIR)
  * `< 100ms` Kecepatan Akses Query
  * `Ready` Standardisasi Akreditasi RS

### 4.2 Ringkasan Keunggulan Utama (Value Propositions)
Kotak fitur interaktif yang menonjolkan 4 pilar utama MoizCare:
1. **Rekam Medis Elektronik (RME) Terpadu:** Template multi-spesialisasi, SOAP/CPPT, gambar status lokalis, odontogram, dan TTE.
2. **Interoperabilitas Satu Sehat & BPJS:** Integrasi VClaim, Antrol MJKN, Aplicares, iCare, dan 67+ resource HL7 FHIR.
3. **Rantai Pasok Farmasi & Multi-Depo:** Real-time stock, FIFO/FEFO, otomatisasi reorder point.
4. **Dashboard Bisnis & Keuangan Eksekutif:** Visualisasi performa RS, laporan billing, dan jasa medis secara real-time.

### 4.3 Interactive Module & Feature Showcase
Menampilkan galeri/tab interaktif berdasarkan modul-modul SIMRS:
* **Tab 1: Rawat Jalan & RME Spesifik** (Preview Status Lokalis Anatomi dengan fitur menggambar, Odontogram Gigi, Skala Nyeri FLACC).
* **Tab 2: Antrean & Kios Mandiri** (Preview TV Display, Pemanggilan Suara Text-to-Speech / TTS, dan Mobile JKN).
* **Tab 3: Integrasi Satu Sehat & BPJS** (Visualisasi dashboard mapping KFA, LOINC, ICD-10, dan background worker).
* **Tab 4: Billing & Keuangan Eksekutif** (Showcase 13 sub-modul keuangan, kasir inap/jalan, piutang, dan dashboard owner).
* **Tab 5: Modul Operasional Tambahan** (SIMAK/Aset, Inspeksi APAR K3 RS, Logistik, dan Asisten Laporan AI).

### 4.4 Kepatuhan & Integrasi Regulasi (Compliance Badges)
Menampilkan *brand logo* & *badge* integrasi resmi:
* Kementerian Kesehatan RI (Satu Sehat - HL7 FHIR R4)
* BPJS Kesehatan (VClaim, Antrol V2, Aplicares, iCare, HFIS)
* BSrE / Tanda Tangan Elektronik (TTE) Tersertifikasi

### 4.5 Portofolio & Referensi Faskes (Klien Mitra)
Bagian bukti sosial (*Social Proof*) yang menampilkan logo dan deskripsi singkat hasil implementasi:
1. **RS Mata Pekanbaru Eye Center (PBEC):** Modul RME Rawat Jalan & Bridging Satu Sehat.
2. **RSUD Petala Bumi Prov. Riau:** Modul E-Resep/Apotek Online BPJS & Satu Sehat.
3. **RS FanyBella Medika:** Implementasi SIM-RS Premium Terintegrasi Full Modul.
4. **RS Bina Kasih:** Implementasi Full Modul Medis, Administratif & Keuangan.
5. **RS Ibunda:** Implementasi Full Modul Pelayanan Pasien & Billing.
6. **Klinik Mata Duri Eye Center:** SIM-Klinik Spesialis Mata & RME.

### 4.6 Skema Investasi Transparan (Pricing Section)
Menampilkan transparansi paket investasi agar membangun kepercayaan calon pembeli:
* **Judul Paket:** Paket SIM-RS Premium Tipe C
* **Biaya Lisensi One-Time:** Rp 250.000.000,- (Hak Pakai, Unlimited User, Full Modul)
* **Biaya Maintenance Bulanan:** Rp 7.000.000,- / bulan (Update Regulasi, Support, Server Backup, Fix Bug)
* **Highlight:** *No Hidden Fees (Tanpa Biaya Tersembunyi per Modul).*
* **Tahapan Termin Pembayaran:**
  * Termin 1 (30%): Uang Muka / Kick-off Kontrak
  * Termin 2 (20%): Setup Server Proxmox VE & VM
  * Termin 3 (30%): Master Data & Bridging Satu Sehat Production
  * Termin 4 (20%): Pelatihan Unit & Go-Live Resmi

### 4.7 Roadmap Implementasi (Timeline 2+1 Bulan)
Visualisasi alur pengerjaan singkat:
* **Bulan 1 (Minggu 1-2):** Infrastruktur, VM, Database & SatuSehat Production
* **Bulan 1 (Minggu 3-4):** Pelatihan Unit Front Office, Kasir, RME Poli
* **Bulan 2 (Minggu 1-2):** Pelatihan Penunjang (Farmasi, Lab, Radiologi, UGD, Inap)
* **Bulan 2 (Minggu 3):** Dry Run / Uji Coba Simulasi Pelayanan Riil
* **Bulan 2 (Minggu 4):** **GO-LIVE PELUNCURAN SISTEM**
* **Bulan 3:** Bridging BPJS Kesehatan & Pendampingan Pasca Go-Live

### 4.8 Form Lead Generation & Kontak (Call to Action)
* **Form Interaktif:**
  * Nama Lengkap & Jabatan
  * Nama Rumah Sakit / Klinik
  * Tipe Faskes (Tipe C / Tipe D / Klinik / Lainnya)
  * Nomor WhatsApp / Telepon
  * Pesan / Jadwal Demo yang Diinginkan
* **Kartu Kontak Langsung:**
  * **Konsultan Utama:** Ahmad Tohar, S.Kom
  * **WhatsApp Direct Button:** 0853-6581-1832
  * **Email:** moizclient30@gmail.com
  * **Perusahaan:** CV. Panda Global Teknologi

### 4.9 Footer Section
* Logo MoizCare & Tagline "Smart Care - Better Health - Brighter Future"
* Alamat & Legalitas CV. Panda Global Teknologi
* Quick Links Navigasi
* Hak Cipta © 2026 CV. Panda Global Teknologi.

---

## 5. Kebutuhan Teknis & Fitur Website (Functional Requirements)

1. **Responsif Multi-Device:** Tampilan sempurna di Desktop, Tablet, dan Smartphone.
2. **Integrasi WhatsApp Direct:** Tombol CTA mengarahkan pesan dengan format otomatis ke nomor `0853-6581-1832`.
3. **Form Handling & Email Notification:** Data form dikirim otomatis ke email `moizclient30@gmail.com` dan tersimpan di database admin website.
4. **Interactive Screenshot Modal / Lightbox:** Pengunjung dapat memperbesar tangkapan layar antarmuka aplikasi (RME, Odontogram, SatuSehat Dashboard) untuk melihat detail UI.
5. **SEO & Performance Optimization:**
   * Skor Google PageSpeed $\ge 90$ untuk Mobile & Desktop.
   * Kata Kunci SEO Target: *SIMRS Tipe C, SIMRS Terbaik Riau, Rekam Medis Elektronik Terintegrasi, Bridging Satu Sehat BPJS, Vendor SIMRS Indonesia*.
6. **Keamanan Website:** Enkripsi SSL (HTTPS), reCAPTCHA v3 pada form, dan proteksi dari serangan spamming.

---

## 6. Panduan Desain Visual & UI/UX (Design Guidelines)

* **Tema Warna Utama:**
  * Primary Background: Deep Navy Blue (`#0B132B` / `#1C2541`)
  * Card / Accent Background: Dark Slate / Glossy Card (`#1E293B`)
  * Accent Brand Colors: Electric Cyan (`#00F0FF`) & Neon Pink/Purple (`#E01A4F` / `#9D4EDD`)
  * Typography: Pure White (`#FFFFFF`) & Cool Gray (`#94A3B8`)
* **Gaya Tipografi:** Font Sans-Serif Modern (contoh: *Plus Jakarta Sans*, *Inter*, atau *Poppins*).
* **Elemen Visual:** Melibatkan elemen *Glassmorphism*, gradien modern, ikon vektor kesehatan/teknologi, dan *mockup device* (Laptop/Tablet/TV Display).

---

## 7. Indikator Keberhasilan Website (KPIs)

1. **Tingkat Konversi (Conversion Rate):** Minimun $3-5\%$ dari total pengunjung website mengisi form / menghubungi WhatsApp untuk demo.
2. **Kecepatan Muat Halaman:** Halaman terbuka penuh dalam kurun waktu kurang dari 2 detik ($<2\text{s}$).
3. **Waktu Dwell (Time on Page):** Rata-rata pengunjung mengoperasikan website $> 2$ menit untuk mempelajari modul dan skema harga.