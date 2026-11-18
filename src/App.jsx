import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronRight, Menu, X, Layers, Shuffle, HelpCircle } from 'lucide-react';

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
    levelTitle: 'Level 2: Menengah (Standar OSK)',
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
    levelTitle: 'Level 3: Lanjut / Mahir (Standar OSN)',
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

// Expanded Bank Soal Campuran (14 Soal Campuran Aljabar, Teori Bilangan, Geometri, Kombinatorika)
const questionBank = [
  {
    id: 1,
    category: 'Teori Bilangan',
    question: 'Berapakah sisa pembagian dari $2^{100}$ jika dibagi oleh 7?',
    options: ['1', '2', '4', '6'],
    answer: '2',
    discussion: 'Gunakan pola modulo 7 untuk perpangkatan 2: $2^1 \\equiv 2$, $2^2 \\equiv 4$, $2^3 \\equiv 1$ (mod 7). Karena 100 dibagi 3 bersisa 1, maka $2^{100} \\equiv 2^1 \\equiv 2$ (mod 7).'
  },
  {
    id: 2,
    category: 'Aljabar',
    question: 'Jika $x + \\frac{1}{x} = 3$, tentukan nilai dari $x^3 + \\frac{1}{x^3}$.',
    options: ['18', '27', '24', '21'],
    answer: '18',
    discussion: 'Gunakan penjabaran kubus: $(x + \\frac{1}{x})^3 = x^3 + \\frac{1}{x^3} + 3(x + \\frac{1}{x})$. Substitusi nilai 3: $3^3 = x^3 + \\frac{1}{x^3} + 3(3) \\implies 27 = x^3 + \\frac{1}{x^3} + 9 \\implies x^3 + \\frac{1}{x^3} = 18$.'
  },
  {
    id: 3,
    category: 'Geometri',
    question: 'Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 6 cm dan 8 cm. Berapakah panjang garis berat yang ditarik dari sudut siku-siku ke sisi miring?',
    options: ['5 cm', '6 cm', '10 cm', '4.8 cm'],
    answer: '5 cm',
    discussion: 'Sisi miring (hipotenusa) = $\\sqrt{6^2 + 8^2} = 10$ cm. Pada segitiga siku-siku, panjang garis berat ke sisi miring selalu setengah dari panjang sisi miring tersebut, yaitu $10 / 2 = 5$ cm.'
  },
  {
    id: 4,
    category: 'Kombinatorika',
    question: 'Banyaknya cara menyusun huruf pada kata "MATEMATIKA" adalah...',
    options: ['151.200', '302.400', '45.360', '90.720'],
    answer: '151.200',
    discussion: 'Total huruf = 10, dengan unsur ganda: M=2, A=3, T=2. Banyak susunan = $\\frac{10!}{2! \\times 3! \\times 2!} = \\frac{3.628.800}{2 \\times 6 \\times 2} = 151.200$.'
  },
  {
    id: 5,
    category: 'Teori Bilangan',
    question: 'Banyaknya faktor positif dari bilangan 720 adalah...',
    options: ['24', '30', '32', '36'],
    answer: '30',
    discussion: 'Faktorisasi prima dari 720 adalah $720 = 72 \\times 10 = 2^4 \\times 3^2 \\times 5^1$. Banyaknya faktor positif dihitung dengan menambahkan 1 pada setiap eksponen lalu dikalikan: $(4+1)(2+1)(1+1) = 5 \\times 3 \\times 2 = 30$.'
  },
  {
    id: 6,
    category: 'Aljabar',
    question: 'Jika akar-akar persamaan kuadrat $x^2 - 5x + c = 0$ berselisih 1, berapakah nilai $c$?',
    options: ['4', '6', '8', '10'],
    answer: '6',
    discussion: 'Misalkan akar-akarnya $x_1$ dan $x_2$. Diketahui $x_1 - x_2 = 1$. Dari persamaan, $x_1 + x_2 = 5$ dan $x_1 x_2 = c$. Gunakan identitas $(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 \\implies 1^2 = 5^2 - 4c \\implies 1 = 25 - 4c \\implies 4c = 24 \\implies c = 6$.'
  },
  {
    id: 7,
    category: 'Geometri',
    question: 'Luas sebuah lingkaran yang kelilingnya $44$ cm (dengan $\\pi = \\frac{22}{7}$) adalah...',
    options: ['132 cm²', '154 cm²', '308 cm²', '616 cm²'],
    answer: '154 cm²',
    discussion: 'Keliling $K = 2\\pi r \\implies 44 = 2 \\times \\frac{22}{7} \\times r \\implies 44 = \\frac{44}{7} r \\implies r = 7$ cm. Luas lingkaran $L = \\pi r^2 = \\frac{22}{7} \\times 7^2 = 154$ cm².'
  },
  {
    id: 8,
    category: 'Teori Bilangan',
    question: 'Angka satuan dari bilangan $3^{2026}$ adalah...',
    options: ['1', '3', '7', '9'],
    answer: '9',
    discussion: 'Pola angka satuan perpangkatan 3 berulang setiap 4 kali: $3^1=3, 3^2=9, 3^3=7, 3^4=1$. Karena $2026 = 4 \\times 506 + 2$, sisa pembagiannya adalah 2, sehingga angka satuannya sama dengan $3^2 = 9$.'
  },
  {
    id: 9,
    category: 'Aljabar',
    question: 'Jika $f(x) = 2x - 3$ dan $(f \\circ g)(x) = 4x^2 - 6x + 5$, maka rumus fungsi $g(x)$ adalah...',
    options: ['$2x^2 - 3x + 4$', '$2x^2 - 3x + 1$', '$4x^2 - 6x + 8$', '$2x^2 + 3x - 1$'],
    answer: '$2x^2 - 3x + 4$',
    discussion: 'Diketahui $f(g(x)) = 2g(x) - 3 = 4x^2 - 6x + 5$. Maka $2g(x) = 4x^2 - 6x + 8 \\implies g(x) = 2x^2 - 3x + 4$.'
  },
  {
    id: 10,
    category: 'Geometri',
    question: 'Keliling trapesium sama kaki dengan panjang sisi sejajar 10 cm dan 20 cm serta panjang kaki trapesium 13 cm adalah...',
    options: ['56 cm', '43 cm', '50 cm', '66 cm'],
    answer: '56 cm',
    discussion: 'Keliling trapesium adalah jumlah seluruh sisinya. $K = \\text{sisi sejajar atas} + \\text{sisi sejajar bawah} + 2 \\times \\text{kaki} = 10 + 20 + 2(13) = 30 + 26 = 56$ cm.'
  },
  {
    id: 11,
    category: 'Kombinatorika',
    question: 'Dalam sebuah kelas terdapat 10 siswa. Akan dipilih pengurus kelas yang terdiri dari seorang ketua, seorang sekretaris, dan seorang bendahara. Banyaknya susunan pengurus yang mungkin adalah...',
    options: ['120', '720', '90', '504'],
    answer: '720',
    discussion: 'Pemilihan pengurus dengan jabatan spesifik (urutan diperhatikan) menggunakan permutasi 3 dari 10: $P(10,3) = \\frac{10!}{(10-3)!} = 10 \\times 9 \\times 8 = 720$.'
  },
  {
    id: 12,
    category: 'Teori Bilangan',
    question: 'FPB dan KPK dari dua bilangan adalah 6 dan 180. Jika salah satu bilangan tersebut adalah 30, berapakah bilangan yang lain?',
    options: ['18', '36', '60', '72'],
    answer: '36',
    discussion: 'Gunakan sifat hubungan FPB dan KPK: $\\text{FPB}(a,b) \\times \\text{KPK}(a,b) = a \\times b$. Maka $6 \\times 180 = 30 \\times b \\implies 1080 = 30b \\implies b = 36$.'
  },
  {
    id: 13,
    category: 'Aljabar',
    question: 'Nilai minimum dari fungsi kuadrat $f(x) = x^2 - 6x + 8$ adalah...',
    options: ['-1', '0', '-2', '1'],
    answer: '-1',
    discussion: 'Nilai minimum fungsi kuadrat tercapai di titik puncak $y_p = -\\frac{D}{4a}$. Diskriminan $D = b^2 - 4ac = (-6)^2 - 4(1)(8) = 36 - 32 = 4$. Maka nilai minimum = $-\\frac{4}{4(1)} = -1$.'
  },
  {
    id: 14,
    category: 'Geometri',
    question: 'Sebuah kubus memiliki panjang rusuk 6 cm. Jarak dari titik sudut ke titik sudut diagonal ruang kubus tersebut adalah...',
    options: ['6 cm', '$6\\sqrt{2}$ cm', '$6\\sqrt{3}$ cm', '$12$ cm'],
    answer: '$6\\sqrt{3}$ cm',
    discussion: 'Panjang diagonal ruang kubus dengan rusuk $s$ dirumuskan sebagai $s\\sqrt{3}$. Karena rusuknya 6 cm, maka panjang diagonal ruangnya adalah $6\\sqrt{3}$ cm.'
  }
];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(curriculumData[0].units[0].topics[0]);
  const [completed, setCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const [openLevels, setOpenLevels] = useState({
    'level-1': true,
    'level-2': false,
    'level-3': false
  });

  const [openUnits, setOpenUnits] = useState({
    'l1-u1': true
  });

  const toggleLevel = (levelId) => {
    setOpenLevels(prev => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleUnit = (unitId) => {
    setOpenUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    setCurrentQIndex(randomIndex);
    setSelectedAnswer(null);
    setShowDiscussion(false);
  };

  const activeQuestion = questionBank[currentQIndex];

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
        {/* Sidebar Navigasi & Menu Latihan */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-20 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-0 shadow-sm
        `}>
          <div className="p-4 border-b border-gray-100 bg-emerald-50">
            <button
              onClick={() => {
                setIsPracticeMode(true);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isPracticeMode 
                  ? 'bg-emerald-700 text-white shadow-md' 
                  : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <Shuffle size={16} />
              <span>⚡ Latihan Soal Campuran (OSN)</span>
            </button>
          </div>

          <div className="p-3 border-b border-gray-100 flex items-center space-x-2 bg-gray-50/50">
            <Layers size={16} className="text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Kurikulum Berbasis Level</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {curriculumData.map((level) => {
              const isLevelOpen = openLevels[level.levelId];
              return (
                <div key={level.levelId} className="border border-gray-200/70 rounded-xl overflow-hidden bg-white shadow-xs">
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

                  {isLevelOpen && (
                    <div className="p-2 space-y-2 bg-white border-t border-gray-100">
                      {level.units.map((unit) => {
                        const isUnitOpen = openUnits[unit.id];
                        return (
                          <div key={unit.id} className="rounded-lg border border-gray-100 bg-gray-50/50 overflow-hidden">
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-xs font-semibold text-gray-700 truncate pr-2">{unit.title}</span>
                              {isUnitOpen ? <ChevronDown size={14} className="text-gray-400 shrink-0" /> : <ChevronRight size={14} className="text-gray-400 shrink-0" />}
                            </button>

                            {isUnitOpen && (
                              <div className="p-1.5 space-y-1 bg-white border-t border-gray-100">
                                {unit.topics.map((topic) => {
                                  const isSelected = !isPracticeMode && selectedTopic.id === topic.id;
                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => {
                                        setSelectedTopic(topic);
                                        setIsPracticeMode(false);
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
            
            {isPracticeMode ? (
              <div className="space-y-6">
                <div className="bg-emerald-700 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-emerald-800 text-emerald-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-600">
                      Bank Soal Campuran OSN ({questionBank.length} Soal Tersedia)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Simulasi & Latihan Acak</h1>
                    <p className="text-emerald-100 text-sm mt-1">Uji kemampuan analitis Anda dengan soal campuran dari berbagai pilar matematika.</p>
                  </div>
                  <button
                    onClick={handleRandomQuestion}
                    className="flex items-center space-x-2 bg-white text-emerald-800 px-5 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-50 transition-all shrink-0"
                  >
                    <Shuffle size={18} />
                    <span>Soal Acak Berikutnya</span>
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                      Kategori: {activeQuestion.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Soal #{activeQuestion.id} dari {questionBank.length}</span>
                  </div>

                  <div className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                    {activeQuestion.question}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {activeQuestion.options.map((opt, idx) => {
                      const isChosen = selectedAnswer === opt;
                      const isCorrect = opt === activeQuestion.answer;
                      let btnStyle = "border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                        } else if (isChosen && !isCorrect) {
                          btnStyle = "border-red-400 bg-red-50 text-red-900 font-bold";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnswer(opt)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-xl border-2 text-left transition-all text-sm font-medium flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer !== null && isCorrect && <CheckCircle size={16} className="text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between">
                    <button
                      onClick={() => setShowDiscussion(!showDiscussion)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                    >
                      <HelpCircle size={16} />
                      <span>{showDiscussion ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Lengkap'}</span>
                    </button>

                    <button
                      onClick={handleRandomQuestion}
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
                    >
                      Soal Berikutnya ➔
                    </button>
                  </div>

                  {showDiscussion && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-900 space-y-2 animate-fadeIn">
                      <p className="font-bold flex items-center space-x-1">
                        <span>💡 Pembahasan Resmi:</span>
                      </p>
                      <p className="leading-relaxed">{activeQuestion.discussion}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Ringkasan Konsep & Teori</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {selectedTopic.content}
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-sm text-amber-900">
                      <strong>Catatan Pelatih:</strong> Pelajari konsep dasar di atas, lalu uji kemampuan Anda dengan mengklik menu <strong>⚡ Latihan Soal Campuran (OSN)</strong> di bagian atas sidebar!
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Navigasi Halaman</h4>
                      <ul className="space-y-2 text-xs font-medium text-gray-600">
                        <li className="text-emerald-700 font-semibold cursor-pointer">01. Ringkasan Konsep Utama</li>
                        <li className="hover:text-gray-900 cursor-pointer">02. Catatan Pelatih & Rumus</li>
                        <li className="hover:text-gray-900 cursor-pointer">03. Contoh Soal & Pembahasan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}