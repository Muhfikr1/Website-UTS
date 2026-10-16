import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const newsData = [
  {
    slug: 'prakarsai-penanaman-mangrove-pantai-keboromo',
    title: 'MAN 2 Pati Prakarsai Penanaman Mangrove di Pantai Keboromo Tayu Bersama PT Misaja Mitra dan BDK Semarang',
    excerpt: 'Pati, 13 Mei 2026 – MAN 2 Pati menggelar kegiatan penanaman mangrove bersama PT Misaja Mitra dan BDK Semarang.',
    content:
      'Pati, 13 Mei 2026 – MAN 2 Pati menggelar kegiatan penanaman mangrove di Pantai Keboromo, Tayu, bersama PT Misaja Mitra dan BDK Semarang. Kegiatan ini merupakan wujud komitmen madrasah terhadap budaya lingkungan dan program Adiwiyata.\n\nRatusan bibit mangrove ditanam oleh guru, tenaga kependidikan, dan siswa sepanjang pesisir pantai. Selain menanam, peserta juga mendapatkan edukasi tentang pentingnya ekosistem mangrove bagi kelestarian pantai dari pihak BDK Semarang.\n\nKegiatan ini diharapkan dapat menumbuhkan kepedulian lingkungan bagi seluruh warga madrasah serta menjadi amal jariyah yang terus mengalir.',
    category: 'Berita Madrasah',
    image: '/images/news-mangrove.jpg',
    date: new Date('2026-05-14'),
  },
  {
    slug: 'terima-penilaian-internal-itjen-kemenag',
    title: 'MAN 2 Pati Terima Penilaian Internal Inspektorat Jenderal Kementerian Agama',
    excerpt: 'Pati, 12 Mei 2026 – MAN 2 Pati menerima kunjungan penilaian internal terkait pembangunan Zona Integritas.',
    content:
      'Pati, 12 Mei 2026 – MAN 2 Pati menerima kunjungan penilaian internal Inspektorat Jenderal Kementerian Agama terkait pembangunan Zona Integritas menuju WBK (Wilayah Bebas Korupsi) dan WBBM (Wilayah Birokrasi Bersih dan Melayani).\n\nTim penilai melakukan verifikasi dokumen, observasi layanan, dan wawancara kepada beberapa stakeholder madrasah. Hasil penilaian menunjukkan kemajuan signifikan dalam penerapan Zona Integritas di lingkungan MAN 2 Pati.',
    category: 'Berita Madrasah',
    image: '/images/news-itjen.jpg',
    date: new Date('2026-05-12'),
  },
  {
    slug: 'umumkan-kelulusan-siswa-kelas-xii-2026',
    title: 'MAN 2 Pati Umumkan Kelulusan Siswa Kelas XII Tahun Ajaran 2025/2026',
    excerpt: 'Pati, 4 Mei 2026 – MAN 2 Pati secara resmi mengumumkan kelulusan siswa kelas XII Tahun Ajaran 2025/2026.',
    content:
      'Pati, 4 Mei 2026 – MAN 2 Pati secara resmi mengumumkan kelulusan siswa kelas XII Tahun Ajaran 2025/2026. Pengumuman dilakukan secara daring melalui laman resmi madrasah dan secara lisan dalam pengarahan wali kelas.\n\nKepala Madrasah mengucapkan selamat kepada seluruh siswa yang dinyatakan lulus dan berpesan agar terus meningkatkan ilmu serta menjaga nama baik madrasah di masyarakat.',
    category: 'Berita Madrasah',
    image: '/images/news-kelulusan.jpg',
    date: new Date('2026-05-04'),
  },
  {
    slug: 'upacara-bendera-hardiknas-2026',
    title: 'Khidmat dan Penuh Makna, MAN 2 Pati Gelar Upacara Bendera Peringati Hari Pendidikan Nasional 2026',
    excerpt: 'Pati, 2 Mei 2026 – Seluruh Guru dan Tenaga Kependidikan serta siswa mengikuti upacara bendera dengan khidmat.',
    content:
      'Pati, 2 Mei 2026 – Dalam rangka memperingati Hari Pendidikan Nasional (Hardiknas) 2026, MAN 2 Pati menggelar upacara bendera di halaman madrasah. Seluruh guru, tenaga kependidikan, dan siswa mengikuti dengan khidmat.\n\nPembina upacara menyampaikan amanat Menteri Pendidikan yang menekankan pentingnya pendidikan berkarakter dan semangat berinovasi bagi generasi muda.',
    category: 'Berita Madrasah',
    image: '/images/news-upacara.jpg',
    date: new Date('2026-05-02'),
  },
  {
    slug: 'semarak-jalan-santai-alun-alun-tayu',
    title: 'Semarak Jalan Santai MAN 2 Pati di Alun-Alun Tayu, Pererat Kebersamaan GTK dan Siswa',
    excerpt: 'Pati, 30 April 2026 – Suasana penuh semangat dan kebersamaan memeriahkan jalan santai keluarga besar MAN 2 Pati.',
    content:
      'Pati, 30 April 2026 – Keluarga besar MAN 2 Pati menggelar kegiatan jalan santai di Alun-Alun Tayu. Seluruh guru, tenaga kependidikan, dan siswa hadir dengan penuh semangat memakai kaos seragam.\n\nKegiatan ini menjadi sarana mempererat kebersamaan sekaligus membangun budaya hidup sehat warga madrasah.',
    category: 'Berita Madrasah',
    image: '/images/news-jalansantai.jpg',
    date: new Date('2026-04-30'),
  },
  {
    slug: 'hut-ke-30-penanaman-mangrove-tunggulsari',
    title: "Semarak HUT ke-30, MAN 2 Pati Gelar Penanaman Mangrove di Pantai Desa Tunggulsari Tayu",
    excerpt: 'Pati, 8 November 2025 – Memperingati Hari Ulang Tahun ke-30 madrasah dengan aksi nyata peduli lingkungan.',
    content:
      'Pati, 8 November 2025 – Dalam rangka memperingati Hari Ulang Tahun ke-30 MAN 2 Pati, seluruh warga madrasah menggelar penanaman mangrove di Pantai Desa Tunggulsari, Tayu.\n\nAksi nyata ini menegaskan komitmen MAN 2 Pati sebagai madrasah berbudaya lingkungan (Adiwiyata).',
    category: 'Adiwiyata',
    image: '/images/news-mangrove.jpg',
    date: new Date('2025-11-08'),
  },
  {
    slug: 'gerakan-mageri-segoro',
    title: 'MAN 2 Pati Ikuti Gerakan "Mageri Segoro" dengan Penanaman Mangrove di Pantai Tunggulsari Tayu',
    excerpt: 'Pati, 15 Oktober 2025 – Seluruh Guru dan Tenaga Kependidikan ikut serta dalam gerakan penghijauan pesisir.',
    content:
      'Pati, 15 Oktober 2025 – Seluruh guru dan tenaga kependidikan MAN 2 Pati ikut serta dalam Gerakan "Mageri Segoro" yang difasilitasi oleh pemerintah daerah. Kegiatan berupa penanaman mangrove di Pantai Tunggulsari Tayu ini menunjukkan keterlibatan madrasah dalam penghijauan pesisir.',
    category: 'Adiwiyata',
    image: '/images/g-adiwiyata.jpg',
    date: new Date('2025-10-15'),
  },
  {
    slug: 'pendampingan-zona-integritas-ditjen-pendis',
    title: 'Pendampingan Pembangunan Zona Integritas Oleh Tim Dirjen Pendis Kementerian Agama',
    excerpt: 'Pati, 22 Agustus 2025 – Tim Dirjen Pendis memberikan pendampingan pembangunan Zona Integritas.',
    content:
      'Pati, 22 Agustus 2025 – Tim Direktorat Jenderal Pendidikan Islam Kementerian Agama melakukan pendampingan pembangunan Zona Integritas di MAN 2 Pati. Pendampingan mencakup penataan alur layanan, penguatan SDM, dan inovasi pelayanan publik.',
    category: 'Berita Madrasah',
    image: '/images/news-itjen.jpg',
    date: new Date('2025-08-22'),
  },
  {
    slug: 'perekaman-ktp-el-siswa',
    title: 'Kegiatan Perekaman KTP-EL bagi Siswa MAN 2 Pati',
    excerpt: 'Pati, 21 Agustus 2025 – MAN 2 Pati melaksanakan kegiatan perekaman KTP-elektronik bagi siswa.',
    content:
      'Pati, 21 Agustus 2025 – Dalam kerja sama dengan Dinas Kependudukan dan Pencatatan Sipil Kabupaten Pati, MAN 2 Pati menyelenggarakan perekaman KTP-el secara langsung di madrasah bagi siswa kelas XII yang telah memenuhi syarat usia 17 tahun.',
    category: 'Berita Madrasah',
    image: '/images/g-kelas.jpg',
    date: new Date('2025-08-21'),
  },
  {
    slug: 'upacara-hut-ri-ke-80',
    title: 'Upacara Peringatan HUT ke-80 Indonesia Merdeka',
    excerpt: 'Pati, 17 Agustus 2025 – MAN 2 Pati menggelar upacara peringatan Hari Ulang Tahun ke-80 Indonesia Merdeka.',
    content:
      'Pati, 17 Agustus 2025 – MAN 2 Pati menggelar upacara peringatan HUT ke-80 Kemerdekaan Republik Indonesia dengan khidmat. Tema tahun ini mengingatkan pentingnya kerja sama dan gotong royong untuk Indonesia maju.',
    category: 'Berita Madrasah',
    image: '/images/news-upacara.jpg',
    date: new Date('2025-08-17'),
  },
  {
    slug: 'classmeeting-semester-genap-stecu',
    title: 'Classmeeting Semester Genap MAN 2 Pati Tahun Ajaran 2024/2025: Membangun Semangat Persatuan Lewat STECU',
    excerpt: 'Pati, 15 Juni 2025 – Classmeeting sukses diselenggarakan dengan penuh keceriaan dan kompetisi sehat.',
    content:
      'Pati, 15 Juni 2025 – MAN 2 Pati sukses menyelenggarakan classmeeting semester genap dengan tema "Membangun Semangat Persatuan Lewat STECU". Rangkaian lomba meliputi olahraga, seni, dan games yang diikuti seluruh kelas dengan penuh sportivitas.',
    category: 'Berita Madrasah',
    image: '/images/g-olahraga.jpg',
    date: new Date('2025-06-15'),
  },
  {
    slug: 'idul-adha-1446-h',
    title: 'Meriahnya Pelaksanaan Idul Adha di MAN 2 Pati',
    excerpt: 'Pati, 12 Juni 2025 – Semangat berbagi Idul Adha 1446 H memenuhi lingkungan madrasah.',
    content:
      'Pati, 12 Juni 2025 – MAN 2 Pati menyelenggarakan shalat Idul Adha 1446 H dan pembagian daging kurban kepada warga sekitar. Kegiatan ini menjadi wujud semangat berbagi dan kepedulian sosial warga madrasah.',
    category: 'Berita Madrasah',
    image: '/images/g-ibadah.jpg',
    date: new Date('2025-06-12'),
  },
  {
    slug: 'pengumuman-kelulusan-2025',
    title: 'Pengumuman Kelulusan Kelas XII Tahun Ajaran 2024/2025',
    excerpt: 'Pati, 4 Juni 2025 – MAN 2 Pati mengumumkan hasil kelulusan kelas XII Tahun Ajaran 2024/2025.',
    content:
      'Pati, 4 Juni 2025 – MAN 2 Pati resmi mengumumkan hasil kelulusan siswa kelas XII Tahun Ajaran 2024/2025. Ratusan siswa dinyatakan lulus dengan hasil yang membanggakan.',
    category: 'Berita Madrasah',
    image: '/images/news-kelulusan.jpg',
    date: new Date('2025-06-04'),
  },
  {
    slug: 'tim-penilai-itjen-kunjungi-man2pati',
    title: 'Tim Penilai Itjen Kemenag Kunjungi MAN 2 Pati: Apresiasi Pembangunan Zona Integritas',
    excerpt: 'Pati, 4 Juni 2025 – Tim Penilai Itjen Kemenag memberikan apresiasi atas pembangunan Zona Integritas.',
    content:
      'Pati, 4 Juni 2025 – Tim Penilai Inspektorat Jenderal Kementerian Agama mengunjungi MAN 2 Pati dan memberikan apresiasi atas capaian pembangunan Zona Integritas yang telah diraih madrasah.',
    category: 'Berita Madrasah',
    image: '/images/news-itjen.jpg',
    date: new Date('2025-06-04'),
  },
  {
    slug: 'upacara-hari-lahir-pancasila-2025',
    title: 'MAN 2 Pati Gelar Upacara Peringatan Hari Lahir Pancasila 1 Juni 2025',
    excerpt: 'Pati, 4 Juni 2025 – Upacara peringatan Hari Lahir Pancasila berlangsung khidmat.',
    content:
      'Pati, 4 Juni 2025 – MAN 2 Pati menggelar upacara peringatan Hari Lahir Pancasila. Seluruh warga madrasah hadir dengan penuh khidmat untuk mengenang dan mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari.',
    category: 'Berita Madrasah',
    image: '/images/news-upacara.jpg',
    date: new Date('2025-06-04'),
  },
]

const galleryData = [
  { title: 'Penanaman Mangrove Pantai Keboromo', category: 'Adiwiyata', image: '/images/news-mangrove.jpg', photoCount: 12, date: new Date('2026-05-14') },
  { title: 'Penilaian Internal Itjen Kemenag', category: 'Zona Integritas', image: '/images/news-itjen.jpg', photoCount: 8, date: new Date('2026-05-12') },
  { title: 'Kelulusan Siswa Kelas XII 2026', category: 'Akademik', image: '/images/news-kelulusan.jpg', photoCount: 15, date: new Date('2026-05-04') },
  { title: 'Upacara Hardiknas 2026', category: 'Kegiatan', image: '/images/news-upacara.jpg', photoCount: 10, date: new Date('2026-05-02') },
  { title: 'Jalan Santai Alun-Alun Tayu', category: 'Kebersamaan', image: '/images/news-jalansantai.jpg', photoCount: 18, date: new Date('2026-04-30') },
  { title: 'Praktikum Riset Laboratorium', category: 'Riset', image: '/images/g-riset.jpg', photoCount: 9, date: new Date('2026-04-15') },
  { title: 'Literasi Perpustakaan Madrasah', category: 'Akademik', image: '/images/g-perpus.jpg', photoCount: 7, date: new Date('2026-04-10') },
  { title: 'Kegiatan Keagamaan Bulanan', category: 'Keagamaan', image: '/images/g-ibadah.jpg', photoCount: 6, date: new Date('2026-03-20') },
  { title: 'Classmeeting STECU 2025', category: 'Kebersamaan', image: '/images/g-olahraga.jpg', photoCount: 21, date: new Date('2025-06-15') },
  { title: 'Pembelajaran Digital Kelas', category: 'Akademik', image: '/images/g-kelas.jpg', photoCount: 5, date: new Date('2025-05-28') },
  { title: 'Pengelolaan Taman Madrasah', category: 'Adiwiyata', image: '/images/g-adiwiyata.jpg', photoCount: 4, date: new Date('2025-05-15') },
  { title: 'Gedung Madrasah Eksterior', category: 'Sarpras', image: '/images/hero-school.jpg', photoCount: 3, date: new Date('2025-05-01') },
]

const teacherData: {
  name: string
  position: string
  role: string
  initials?: string
  order: number
}[] = [
  { name: 'Arif Baehaqi, S.Pd., M.Si.', position: 'Kepala Madrasah', role: 'KEPALA', initials: 'AB', order: 1 },
  { name: "H. Safi'ul Umam, S.Ag.", position: 'Kepala Urusan TU', role: 'TU', initials: 'SU', order: 2 },
  { name: 'Sunaryo, S.Pd.', position: 'Wakabid. Kesiswaan', role: 'WAKABID', initials: 'SN', order: 3 },
  { name: 'Safrudin, M.Pd.', position: 'Wakabid. Akademik', role: 'WAKABID', initials: 'SF', order: 4 },
  { name: 'Hj. Anita Fizqiyah, S.Pd., M.Pd.', position: 'Wakabid. Sarpras', role: 'WAKABID', initials: 'AF', order: 5 },
  { name: 'Agung Sutrisno, S.Pd.', position: 'Wakabid. Humas', role: 'WAKABID', initials: 'AS', order: 6 },
  { name: 'Hj. Ummi Istiqomah, S.Ag.', position: 'Guru Akidah Akhlak', role: 'GURU', order: 10 },
  { name: 'Drs. Ali Irsat', position: 'Guru Bahasa Inggris', role: 'GURU', order: 11 },
  { name: 'Supatmi, S.Pd.', position: 'Guru Matematika', role: 'GURU', order: 12 },
  { name: "Hj. Rifa'a, S.Pd.", position: 'Guru Fisika', role: 'GURU', order: 13 },
  { name: 'Abid Masduki, S.Ag.', position: 'Guru Fikih', role: 'GURU', order: 14 },
  { name: 'Dra. Endang Suparti', position: 'Guru Ekonomi', role: 'GURU', order: 15 },
  { name: 'Hj. Indarwati, S.Pd.', position: 'Guru Bahasa Indonesia', role: 'GURU', order: 16 },
  { name: 'Sholikul Huda, S.Pd.', position: 'Guru Pend. Pancasila', role: 'GURU', order: 17 },
  { name: 'Tri Puji Astuti TWH, S.Pd.', position: 'Guru Biologi', role: 'GURU', order: 18 },
  { name: 'H. Surahmat Hadi, S.Pd., M.Si.', position: 'Guru Fisika', role: 'GURU', order: 19 },
  { name: 'Safrudin, M.Pd.', position: 'Guru Sejarah', role: 'GURU', order: 20 },
  { name: 'Hj. Anita Fizqiyah, S.Pd., M.Pd.', position: 'Guru Bahasa Inggris', role: 'GURU', order: 21 },
  { name: 'Dwi Sutrisno, S.Pd.', position: 'Guru Ekonomi', role: 'GURU', order: 22 },
  { name: 'Ahmad Sholihan, S.Ag., M.Pd.', position: 'Guru Quran Hadis', role: 'GURU', order: 23 },
  { name: 'Agung Sutrisno, S.Pd.', position: 'Guru Ekonomi', role: 'GURU', order: 24 },
  { name: 'Sunaryo, S.Pd.', position: 'Guru Ekonomi', role: 'GURU', order: 25 },
  { name: 'Rifatun Nasikah, S.Pd.', position: 'Guru Sejarah', role: 'GURU', order: 26 },
  { name: 'Hj. Sri Jauharin I., S.Pd.', position: 'Guru Sosiologi', role: 'GURU', order: 27 },
  { name: 'Idatul Fitriyah, S.Pd.', position: 'Guru Bahasa Indonesia', role: 'GURU', order: 28 },
  { name: "Muhammad Khoiruddin 'Ali, S.Pd.", position: 'Guru Sejarah', role: 'GURU', order: 29 },
  { name: 'Abdus Salam, S.Pd.I., M.Pd.', position: 'Guru Akidah Akhlak', role: 'GURU', order: 30 },
  { name: "Ahmad Ni'am Shidqi, S.Hum.", position: 'Guru Sejarah Kebudayaan Islam', role: 'GURU', initials: 'AN', order: 31 },
  { name: 'Bondan Lesmana, S.Pd.', position: 'Guru Sosiologi', role: 'GURU', initials: 'BL', order: 32 },
  { name: 'Akhyana Nurul Baiti, S.Pd.', position: 'Guru Matematika', role: 'GURU', initials: 'AN', order: 33 },
  { name: 'Kurnia Rohmatika, S.Pd.', position: 'Guru Quran Hadis', role: 'GURU', initials: 'KR', order: 34 },
  { name: 'Selamet Wahyu Purnomo Aji, S.Pd.', position: 'Guru Penjasorkes', role: 'GURU', initials: 'SW', order: 35 },
  { name: 'Suhartono, S.Pd.', position: 'Guru Biologi', role: 'GURU', order: 36 },
  { name: "Rizka Ni'ama, S.Pd.I.", position: 'Guru Bahasa Arab', role: 'GURU', order: 37 },
  { name: 'Eva Fitriana Darojah, S.Pd.', position: 'Guru Seni Musik', role: 'GURU', order: 38 },
  { name: 'Totok Wijayanto, S.Pd.Kor.', position: 'Guru Olahraga', role: 'GURU', order: 39 },
  { name: 'Sumiyati, S.Pd.', position: 'Guru Bahasa Indonesia', role: 'GURU', order: 40 },
  { name: 'Sunardi, S.Pd.', position: 'Guru Bahasa Jawa', role: 'GURU', order: 41 },
  { name: 'Moh. Amri, S.Pd.I., S.Kom.', position: 'Guru Fikih', role: 'GURU', order: 42 },
  { name: 'Qoidul Umam, S.Pd., M.Pd.', position: 'Guru Geografi', role: 'GURU', order: 43 },
  { name: 'Nabila Asyiqoh, S.Pd.', position: 'Guru Pend. Pancasila', role: 'GURU', order: 44 },
  { name: 'Byarvega Mahanita, S.Pd.', position: 'Guru Bahasa Inggris', role: 'GURU', initials: 'BM', order: 45 },
  { name: 'Surya Tyas Kurniani, S.Pd.', position: 'Guru Matematika', role: 'GURU', initials: 'ST', order: 46 },
  { name: 'Vera Rosita, S.Pd.', position: 'Guru BK', role: 'GURU', initials: 'VR', order: 47 },
  { name: 'Siti Zummaroh, S.Pd.', position: 'Guru Bahasa Indonesia', role: 'GURU', initials: 'SZ', order: 48 },
  { name: 'Rumaisah, S.Pd.', position: 'Guru Bahasa Jawa', role: 'GURU', initials: 'RS', order: 49 },
  { name: 'Dwi Agustina, S.Pd.', position: 'Guru Olahraga', role: 'GURU', initials: 'DA', order: 50 },
  { name: 'Roni Fathur Rohman, S.Pd., M.Pd.', position: 'Guru Matematika', role: 'GURU', initials: 'RF', order: 51 },
  { name: 'Habib Bullah, S.Pd.', position: 'Guru Geografi', role: 'GURU', initials: 'HB', order: 52 },
  { name: 'Hilma Lutfiana, M.Pd.', position: 'Guru Sosiologi', role: 'GURU', initials: 'HL', order: 53 },
  { name: 'Eko Wahyudi, S.T., M.Eng.', position: 'Guru Informatika', role: 'GURU', initials: 'EW', order: 54 },
  { name: 'Fithriyatul Fadhilah, S.Pd.', position: 'Guru Kimia', role: 'GURU', initials: 'FF', order: 55 },
  { name: 'Ira Wahyuningsih, S.Pd.', position: 'Guru Bahasa Arab', role: 'GURU', initials: 'IW', order: 56 },
  { name: 'Afif Baghtiar Efendi, S.Hum.', position: 'Guru SKI', role: 'GURU', initials: 'AB', order: 57 },
  { name: 'Nor Fitriyani, S.Pd.', position: 'Guru Pend. Pancasila', role: 'GURU', initials: 'NF', order: 58 },
  { name: 'Devi Noviyanti, S.Pd.', position: 'Guru Bahasa Jawa', role: 'GURU', initials: 'DN', order: 59 },
  { name: 'Nailul Arifah, S.Pd.', position: 'Guru Geografi', role: 'GURU', initials: 'NA', order: 60 },
]

const announcementData = [
  {
    title: 'Pengumuman Kelulusan Siswa Kelas XII Tahun Ajaran 2025/2026',
    content:
      'Diberitahukan kepada seluruh siswa kelas XII bahwa hasil kelulusan Tahun Ajaran 2025/2026 dapat diakses melalui laman PTSP Online madrasah mulai tanggal 4 Mei 2026 pukul 09.00 WIB.',
    date: new Date('2026-05-04'),
    isPinned: true,
  },
  {
    title: 'Pendaftaran SPMB Tahun Ajaran 2026/2027 Telah Dibuka',
    content:
      'Pendaftaran Seleksi Penerimaan Murid Baru (SPMB) MAN 2 Pati Tahun Ajaran 2026/2027 telah dibuka. Informasi lengkap jalur, jadwal, dan persyaratan dapat dilihat pada laman SPMB 2026.',
    date: new Date('2026-04-20'),
    isPinned: true,
  },
  {
    title: 'Jadwal Ujian Madrasah Semester Genap TA 2025/2026',
    content:
      'Jadwal Ujian Madrasah (UM) semester genap dilaksanakan mulai tanggal 20 April sampai dengan 28 April 2026. Seluruh siswa wajib hadir 15 menit sebelum ujian dimulai.',
    date: new Date('2026-04-10'),
    isPinned: false,
  },
  {
    title: 'Libur Semester Genap dan Pengambilan Rapor',
    content:
      'Libur semester genap dimulai tanggal 29 Mei 2026. Pengambilan rapor dilaksanakan pada tanggal 30 Mei 2026 di masing-masing kelas bersama wali kelas.',
    date: new Date('2026-05-15'),
    isPinned: false,
  },
  {
    title: 'Sosialisasi Program Research Community (Rescom)',
    content:
      'Sosialisasi program Research Community bagi siswa kelas X dan XI akan dilaksanakan pada Sabtu, 23 Mei 2026 di aula madrasah. Dihadirkan narasumber dari praktisi riset pendidikan.',
    date: new Date('2026-05-18'),
    isPinned: false,
  },
]

async function main() {
  // Reset tables
  await db.news.deleteMany()
  await db.gallery.deleteMany()
  await db.teacher.deleteMany()
  await db.announcement.deleteMany()
  await db.complaint.deleteMany()
  await db.visitorStat.deleteMany()

  // Seed news
  for (const n of newsData) {
    await db.news.create({ data: n })
  }

  // Seed gallery
  for (const g of galleryData) {
    await db.gallery.create({ data: g })
  }

  // Seed teachers
  for (const t of teacherData) {
    await db.teacher.create({
      data: {
        name: t.name,
        position: t.position,
        role: t.role,
        initials: t.initials ?? null,
        order: t.order,
      },
    })
  }

  // Seed announcements
  for (const a of announcementData) {
    await db.announcement.create({ data: a })
  }

  // Seed visitor stat
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  await db.visitorStat.create({
    data: {
      date: today,
      todayCount: 83,
      yesterdayCount: 212,
      monthCount: 1403,
      totalCount: 2855,
      onlineCount: 6,
    },
  })

  console.log('Seed selesai:', {
    news: await db.news.count(),
    gallery: await db.gallery.count(),
    teacher: await db.teacher.count(),
    announcement: await db.announcement.count(),
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
