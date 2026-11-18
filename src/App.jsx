import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronRight, Menu, X, Layers } from 'lucide-react';

const curriculumData = [
  {
    levelId: 'level-1',
    levelTitle: 'Level 1: Fondasi & Dasar',
    description: 'Membangun intuisi, aritmetika lanjutan, dan pengenalan aljabar/geometri.',
    units: [
      {
        id: 'l1-u1',
        title: 'Unit 1: Bilangan Bulat, Pecahan, & Operasi',
        topics: [
          { id: 't1', title: 'Operasi Bilangan Bulat, Rasional, Akar, & Berpangkat', content: 'Pembahasan mendalam mengenai sifat-sifat operasi hitung bilangan bulat, rasional, bentuk akar, serta eksponen.' },
          { id: 't2', title: 'Perbandingan Senilai dan Berbalik Nilai', content: 'Konsep rasio, proporsi, serta cara menyelesaikan soal cerita perbandingan senilai dan berbalik nilai.' }
        ]
      },
      {
        id: 'l1-u2',
        title: 'Unit 2: Himpunan & Basis Bilangan',
        topics: [
          { id: 't3', title: 'Pengertian, Notasi, dan Operasi Himpunan', content: 'Irisan, gabungan, komplemen, selisih, serta diagram Venn dalam pemecahan masalah.' },
          { id: 't4', title: 'Pengantar Basis Bilangan Sederhana', content: 'Mengenal sistem bilangan berbasis selain 10 (basis 2, basis 5, dll).' }
        ]
      },
      {
        id: 'l1-u3',
        title: 'Unit 3: Aljabar & Operasi Dasar',
        topics: [
          { id: 't5', title: 'Operasi Aljabar, Akar, & Pangkat', content: 'Penyederhanaan bentuk aljabar yang memuat bilangan rasional dan akar.' },
          { id: 't6', title: 'Persamaan & Pertidaksamaan Linear 1/2 Peubah', content: 'Teknik penyelesaian persamaan dan pertidaksamaan linear.' }
        ]
      },
      {
        id: 'l1-u4',
        title: 'Unit 4: Pola Bilangan & Barisan Awal',
        topics: [
          { id: 't7', title: 'Pola Bilangan, Barisan, & Deret Sederhana', content: 'Mengidentifikasi pola bilangan bertingkat dan barisan aritmetika dasar.' }
        ]
      },
      {
        id: 'l1-u5',
        title: 'Unit 5: Garis, Sudut, & Bangun Datar',
        topics: [
          { id: 't8', title: 'Garis dan Sudut', content: 'Kedudukan dua garis, sudut berpenyiku, berpelurus, dan sehadap.' },
          { id: 't9', title: 'Bangun Datar & Koordinat Kartesius', content: 'Sifat segitiga, segiempat, keliling, luas, serta sistem koordinat kartesius.' }
        ]
      },
      {
        id: 'l1-u6',
        title: 'Unit 6: Teorema Pythagoras & Statistika',
        topics: [
          { id: 't10', title: 'Teorema Pythagoras', content: 'Tripel Pythagoras dan aplikasinya pada bangun datar.' },
          { id: 't11', title: 'Analisis Data & Ukuran Pemusatan', content: 'Rata-rata, median, modus data tunggal serta penafsiran grafik/tabel.' }
        ]
      }
    ]
  },
  {
    levelId: 'level-2',
    levelTitle: 'Level 2: Menengah',
    description: 'Penguasaan teknik standar kompetisi tingkat Kabupaten/Kota.',
    units: [
      {
        id: 'l2-u1',
        title: 'Unit 1: Teori Bilangan (FPB, KPK, & Sisa)',
        topics: [
          { id: 't12', title: 'FPB, KPK, & Algoritma Euclidean', content: 'Mencari FPB dan KPK bilangan besar serta sifat keterbagiannya.' },
          { id: 't13', title: 'Sisa Pembagian & Basis Lanjutan', content: 'Teorema sisa pembagian dan konversi basis bilangan.' }
        ]
      },
      {
        id: 'l2-u2',
        title: 'Unit 2: Aljabar Menengah & Fungsi',
        topics: [
          { id: 't14', title: 'Persamaan & Pertidaksamaan Kuadrat', content: 'Akar-akar kuadrat, Diskriminan, dan sifat akar (Vieta).' },
          { id: 't15', title: 'SPLDV & Pengantar Relasi/Fungsi', content: 'Sistem Persamaan Linear Dua Peubah serta konsep dasar fungsi.' }
        ]
      },
      {
        id: 'l2-u3',
        title: 'Unit 3: Barisan & Deret Lanjutan',
        topics: [
          { id: 't16', title: 'Barisan & Deret Aritmetika/Geometri Kompleks', content: 'Rumus suku ke-n dan jumlah n suku pertama tingkat lanjut.' }
        ]
      },
      {
        id: 'l2-u4',
        title: 'Unit 4: Geometri Menengah & Transformasi',
        topics: [
          { id: 't17', title: 'Kesebangunan, Kekongruenan, & Jarak', content: 'Perbandingan sisi pada segitiga sebangun serta jarak titik ke garis.' },
          { id: 't18', title: 'Transformasi Geometri', content: 'Translasi, refleksi, rotasi, dan dilatasi pada bidang.' }
        ]
      },
      {
        id: 'l2-u5',
        title: 'Unit 5: Bangun Ruang & Peluang Dasar',
        topics: [
          { id: 't19', title: 'Luas Permukaan & Volume Bangun Ruang', content: 'Kubus, balok, prisma, limas, tabung, kerucut, bola.' },
          { id: 't20', title: 'Aturan Pencacahan & Peluang Dasar', content: 'Kaidah pencacahan perkalian/penjumlahan dan peluang kejadian.' }
        ]
      }
    ]
  },
  {
    levelId: 'level-3',
    levelTitle: 'Level 3: Lanjut',
    description: 'Persiapan tingkat Provinsi (OSP) hingga Nasional (OSN).',
    units: [
      {
        id: 'l3-u1',
        title: 'Unit 1: Teori Bilangan Tingkat Tinggi',
        topics: [
          { id: 't21', title: 'Aritmetika Modulo & Kongruensi', content: 'Sifat-sifat kongruensi modulo, Fermat kecil, dan Euler totient.' }
        ]
      },
      {
        id: 'l3-u2',
        title: 'Unit 2: Aljabar Lanjutan & Polinomial',
        topics: [
          { id: 't22', title: 'Operasi Fungsi Suku Banyak & Rasional', content: 'Teorema sisa polinomial, faktorisasi tingkat tinggi, dan sifat akar.' }
        ]
      },
      {
        id: 'l3-u3',
        title: 'Unit 3: Geometri Lanjutan',
        topics: [
          { id: 't23', title: 'Garis Istimewa & Dalil Segitiga', content: 'Garis berat, sumbu, bagi, tinggi, serta dalil Menelaus & Ceva.' }
        ]
      },
      {
        id: 'l3-u4',
        title: 'Unit 4: Kombinatorika Kompleks',
        topics: [
          { id: 't24', title: 'Permutasi, Kombinasi, & Pigeonhole', content: 'Prinsip sarang merpati, kombinatorika lanjutan, dan peluang majemuk.' }
        ]
      }
    ]
  }
];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(curriculumData[0].units[0].topics[0]);
  const [completed, setCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State untuk mengontrol Level mana saja yang terbuka (Dropdown Level)
  const [openLevels, setOpenLevels] = useState({
    'level-1': true, // Level 1 terbuka secara default
    'level-2': false,
    'level-3': false
  });

  // State untuk mengontrol Unit mana saja yang terbuka (Dropdown Unit)
  const [openUnits, setOpenUnits] = useState({
    'l1-u1': true // Unit 1 di Level 1 terbuka secara default
  });

  const toggleLevel = (levelId) => {
    setOpenLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  };

  const toggleUnit = (unitId) => {
    setOpenUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              J
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              JAGOMATIKA <span className="text-emerald-600 text-xs uppercase px-2 py-0.5 bg-emerald-50 rounded-full ml-1 border border-emerald-200">Olimpiade</span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600 hidden sm:inline">Pusat Pembinaan & Mandiri</span>
          <div className="w-9 h-9 bg-emerald-100 text-emerald-800 font-semibold rounded-full flex items-center justify-center border border-emerald-300">
            OM
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigasi Dropdown */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-20 w-85 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-0 w-80 shadow-sm
        `}>
          <div className="p-4 border-b border-gray-100 bg-emerald-50/50 flex items-center space-x-2">
            <Layers size={18} className="text-emerald-700" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Kurikulum Berbasis Level</span>
              <h2 className="text-xs font-semibold text-gray-700">Olimpiade Matematika</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {curriculumData.map((level) => {
              const isLevelOpen = openLevels[level.levelId];
              return (
                <div key={level.levelId} className="border border-gray-200/70 rounded-xl overflow-hidden bg-white shadow-xs">
                  {/* Tombol Dropdown Level */}
                  <button
                    onClick={() => toggleLevel(level.levelId)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50/60 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-800">{level.levelTitle}</span>
                    </div>
                    {isLevelOpen ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
                  </button>

                  {/* Daftar Unit di dalam Level (Muncul jika Level dibuka) */}
                  {isLevelOpen && (
                    <div className="p-2 space-y-2 bg-white border-t border-gray-100">
                      {level.units.map((unit) => {
                        const isUnitOpen = openUnits[unit.id];
                        return (
                          <div key={unit.id} className="rounded-lg border border-gray-100 bg-gray-50/50 overflow-hidden">
                            {/* Tombol Dropdown Unit */}
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-xs font-semibold text-gray-700 truncate pr-2">{unit.title}</span>
                              {isUnitOpen ? <ChevronDown size={14} className="text-gray-400 shrink-0" /> : <ChevronRight size={14} className="text-gray-400 shrink-0" />}
                            </button>

                            {/* Daftar Topik di dalam Unit (Muncul jika Unit dibuka) */}
                            {isUnitOpen && (
                              <div className="p-1.5 space-y-1 bg-white border-t border-gray-100">
                                {unit.topics.map((topic) => {
                                  const isSelected = selectedTopic.id === topic.id;
                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => {
                                        setSelectedTopic(topic);
                                        setMobileMenuOpen(false);
                                        setCompleted(false);
                                      }}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-2 ${
                                        isSelected 
                                          ? 'bg-emerald-700 text-white shadow-xs' 
                                          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-900'
                                      }`}
                                    >
                                      <BookOpen size={12} className={isSelected ? 'text-white' : 'text-emerald-600'} />
                                      <span className="truncate">{topic.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:px-16 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header Modul */}
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Modul Pembelajaran Mandiri
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                {selectedTopic.title}
              </h1>
              
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Status Membaca:</span>
                  <span className="font-semibold text-emerald-700">{completed ? '100% Selesai' : '0%'}</span>
                </div>
                
                <button
                  onClick={() => setCompleted(!completed)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    completed 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle size={16} />
                  <span>{completed ? 'Materi Selesai Dipelajari' : 'Tandai Selesai'}</span>
                </button>
              </div>
            </div>

            {/* Isi Materi Utama */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Ringkasan Konsep & Teori</h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {selectedTopic.content}
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-sm text-amber-900">
                  <strong>Catatan Pelatih:</strong> Pelajari konsep dasar di atas, catat rumus penting ke dalam buku latihan khusus olimpiade Anda, lalu kerjakan contoh soal pembuktian atau hitung cepat setelah sesi ini.
                </div>
                <h3 className="text-md font-bold text-gray-900 pt-4">Contoh Soal & Pembahasan</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Soal Latihan Mandiri #1:</p>
                  <p>Terapkan sifat-sifat yang telah dipelajari pada modul ini untuk menyelesaikan variasi soal tingkat kabupaten/nasional.</p>
                </div>
              </div>

              {/* Sidebar Kanan (On This Page) */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Navigasi Halaman</h4>
                  <ul className="space-y-2 text-xs font-medium text-gray-600">
                    <li className="text-emerald-700 font-semibold cursor-pointer">01. Ringkasan Konsep Utama</li>
                    <li className="hover:text-gray-900 cursor-pointer">02. Catatan Pelatih & Rumus</li>
                    <li className="hover:text-gray-900 cursor-pointer">03. Contoh Soal & Pembahasan</li>
                    <li className="hover:text-gray-900 cursor-pointer">04. Latihan Mandiri</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}