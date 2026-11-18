import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Layers,
  Shuffle,
  HelpCircle,
  Calculator,
  Lightbulb,
  Award,
  Edit3,
  Copy,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  Code,
  Lock
} from 'lucide-react';

const EDITOR_PASSWORD = 'punyarumah';

// Komponen helper untuk merender tulisan & rumus LaTeX ($...$ dan $$...$$) secara real-time
function MathText({ text = '', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderMath = () => {
      if (containerRef.current) {
        containerRef.current.textContent = text;
        if (window.renderMathInElement) {
          window.renderMathInElement(containerRef.current, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
      }
    };

    renderMath();
    window.addEventListener('katex-loaded', renderMath);
    return () => window.removeEventListener('katex-loaded', renderMath);
  }, [text]);

  return <span ref={containerRef} className={className} />;
}

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
          {
            id: 't1',
            title: 'Operasi Bilangan Bulat, Rasional, Akar, & Berpangkat',
            coachNote:
              'Dalam soal olimpiade, perhitungan angka besar tidak pernah dikerjakan secara manual satu per satu. Selalu cari pola faktorisasi, sifat distributif, atau deret teleskopik yang saling menghilangkan.',
            sections: [
              {
                heading: '1. Operasi Bilangan Bulat & Trik Faktorisasi Cepat',
                paragraphs: [
                  'Penguasaan sifat komutatif, asosiatif, dan distributif adalah kunci utama menyederhanakan operasi bilangan bulat berukuran besar. Selain itu, identitas aljabar dasar sangat sering muncul dalam hitungan aritmetika olimpiade:'
                ],
                formulas: [
                  '$$a \\times b + a \\times c = a(b + c)$$',
                  '$$a^2 - b^2 = (a - b)(a + b)$$',
                  '$$(a + b)^2 = a^2 + 2ab + b^2 \\quad \\text{dan} \\quad (a - b)^2 = a^2 - 2ab + b^2$$'
                ]
              },
              {
                heading: '2. Bilangan Rasional & Pecahan Teleskopik',
                paragraphs: [
                  'Bilangan rasional adalah bilangan yang dapat dinyatakan dalam bentuk $\\frac{a}{b}$ dengan $a, b$ bilangan bulat dan $b \\neq 0$. Pada soal kompetisi, penjumlahan pecahan berpola sering diselesaikan menggunakan teknik pemecahan parsial (deret teleskopik):'
                ],
                formulas: [
                  '$$\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$$',
                  '$$\\frac{1}{n(n+k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n+k}\\right)$$'
                ]
              },
              {
                heading: '3. Sifat-Sifat Bilangan Berpangkat (Eksponen)',
                paragraphs: [
                  'Untuk bilangan real $a, b \\neq 0$ serta bilangan bulat $m, n$, berlaku aturan dasar eksponen berikut. Untuk membandingkan dua bilangan berpangkat besar, samakan bilangan pokok (basis) atau samakan pangkatnya menggunakan FPB.'
                ],
                formulas: [
                  '$$a^m \\times a^n = a^{m+n}, \\qquad \\frac{a^m}{a^n} = a^{m-n}, \\qquad (a^m)^n = a^{m \\times n}$$',
                  '$$(a \\times b)^n = a^n \\times b^n, \\qquad a^0 = 1, \\qquad a^{-n} = \\frac{1}{a^n}$$'
                ]
              },
              {
                heading: '4. Bentuk Akar, Merasionalkan Penyebut, & Akar Bersarang',
                paragraphs: [
                  'Bentuk akar disederhanakan dengan memfaktorkan bilangan di dalam akar menjadi perkalian bilangan kuadrat sempurna. Untuk merasionalkan penyebut bentuk sekawan maupun menyederhanakan akar ganda, gunakan sifat berikut (dengan syarat $a > b > 0$):'
                ],
                formulas: [
                  '$$\\frac{c}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{c(\\sqrt{a} \\mp \\sqrt{b})}{a - b}$$',
                  '$$\\sqrt{(a + b) + 2\\sqrt{ab}} = \\sqrt{a} + \\sqrt{b}, \\qquad \\sqrt{(a + b) - 2\\sqrt{ab}} = \\sqrt{a} - \\sqrt{b}$$'
                ]
              }
            ],
            examples: [
              {
                number: 1,
                problem:
                  'Hitunglah nilai dari $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{99 \\times 100}$.',
                solution:
                  'Gunakan identitas pecahan teleskopik $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ pada setiap suku:\n$$\\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\left(\\frac{1}{3} - \\frac{1}{4}\\right) + \\dots + \\left(\\frac{1}{99} - \\frac{1}{100}\\right)$$\nSemua suku di bagian tengah saling meniadakan, menyisakan suku awal dan suku akhir:\n$$1 - \\frac{1}{100} = \\frac{99}{100}$$'
              },
              {
                number: 2,
                problem: 'Sederhanakan bentuk akar berikut: $\\sqrt{7 + 2\\sqrt{12}} - \\sqrt{7 - 2\\sqrt{12}}$.',
                solution:
                  'Cari dua bilangan yang jika dijumlahkan hasilnya $7$ dan jika dikalikan hasilnya $12$. Bilangan tersebut adalah $4$ dan $3$ (karena $4 + 3 = 7$ dan $4 \\times 3 = 12$).\nMaka:\n$$\\sqrt{7 + 2\\sqrt{12}} = \\sqrt{4} + \\sqrt{3} = 2 + \\sqrt{3}$$\n$$\\sqrt{7 - 2\\sqrt{12}} = \\sqrt{4} - \\sqrt{3} = 2 - \\sqrt{3}$$\nSehingga selisihnya adalah $(2 + \\sqrt{3}) - (2 - \\sqrt{3}) = 2\\sqrt{3}$.'
              },
              {
                number: 3,
                problem: 'Manakah bilangan yang lebih besar antara $2^{300}$ dan $3^{200}$?',
                solution:
                  'FPB dari pangkat $300$ dan $200$ adalah $100$. Ubah kedua bilangan agar memiliki pangkat $100$:\n$$2^{300} = (2^3)^{100} = 8^{100}$$\n$$3^{200} = (3^2)^{100} = 9^{100}$$\nKarena $8 < 9$, maka $8^{100} < 9^{100}$. Jadi, bilangan yang lebih besar adalah $3^{200}$.'
              },
              {
                number: 4,
                problem: 'Tentukan nilai dari $\\frac{2026^2 - 2024^2}{2026 + 2024}$.',
                solution:
                  'Gunakan sifat selisih dua kuadrat $a^2 - b^2 = (a - b)(a + b)$ pada pembilang:\n$$\\frac{(2026 - 2024)(2026 + 2024)}{2026 + 2024} = 2026 - 2024 = 2$$'
              }
            ],
            exercises: [
              {
                id: 1,
                question: 'Nilai dari $2026^2 - 2025^2$ adalah...',
                options: ['1', '2025', '4051', '4050'],
                answer: '4051',
                discussion:
                  'Gunakan sifat $a^2 - b^2 = (a - b)(a + b) = (2026 - 2025)(2026 + 2025) = 1 \\times 4051 = 4051$.'
              },
              {
                id: 2,
                question:
                  'Nilai dari $\\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\frac{1}{4 \\times 5} + \\dots + \\frac{1}{19 \\times 20}$ adalah...',
                options: ['$\\frac{9}{20}$', '$\\frac{19}{20}$', '$\\frac{1}{10}$', '$\\frac{11}{20}$'],
                answer: '$\\frac{9}{20}$',
                discussion:
                  'Dengan deret teleskopik: $\\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\left(\\frac{1}{3} - \\frac{1}{4}\\right) + \\dots + \\left(\\frac{1}{19} - \\frac{1}{20}\\right) = \\frac{1}{2} - \\frac{1}{20} = \\frac{10 - 1}{20} = \\frac{9}{20}$.'
              },
              {
                id: 3,
                question: 'Bentuk sederhana dari $\\sqrt{11 + 2\\sqrt{30}}$ adalah...',
                options: ['$\\sqrt{6} + \\sqrt{5}$', '$\\sqrt{10} + 1$', '$3 + \\sqrt{2}$', '$\\sqrt{15} + \\sqrt{2}$'],
                answer: '$\\sqrt{6} + \\sqrt{5}$',
                discussion:
                  'Karena $6 + 5 = 11$ dan $6 \\times 5 = 30$, maka $\\sqrt{(6 + 5) + 2\\sqrt{6 \\times 5}} = \\sqrt{6} + \\sqrt{5}$.'
              },
              {
                id: 4,
                question: 'Jika $2^x = 16$ dan $3^y = 27$, maka nilai dari $x^y + y^x$ adalah...',
                options: ['12', '81', '145', '128'],
                answer: '145',
                discussion:
                  'Dari $2^x = 2^4 \\implies x = 4$, dan $3^y = 3^3 \\implies y = 3$. Maka $x^y + y^x = 4^3 + 3^4 = 64 + 81 = 145$.'
              },
              {
                id: 5,
                question:
                  'Hasil dari $\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{4}\\right)\\cdots\\left(1 - \\frac{1}{100}\\right)$ adalah...',
                options: ['$\\frac{1}{50}$', '$\\frac{1}{100}$', '$\\frac{99}{100}$', '$\\frac{1}{99}$'],
                answer: '$\\frac{1}{100}$',
                discussion:
                  'Ubah setiap kurung menjadi pecahan tunggal: $\\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} \\times \\dots \\times \\frac{99}{100}$. Pembilang dan penyebut saling mencoret menyisakan $\\frac{1}{100}$.'
              },
              {
                id: 6,
                question: 'Bentuk rasional dari $\\frac{6}{\\sqrt{5} - \\sqrt{2}}$ adalah...',
                options: [
                  '$2\\sqrt{5} + 2\\sqrt{2}$',
                  '$2\\sqrt{5} - 2\\sqrt{2}$',
                  '$3\\sqrt{5} + 3\\sqrt{2}$',
                  '$\\sqrt{5} + \\sqrt{2}$'
                ],
                answer: '$2\\sqrt{5} + 2\\sqrt{2}$',
                discussion:
                  'Kalikan dengan sekawannya: $\\frac{6(\\sqrt{5} + \\sqrt{2})}{(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})} = \\frac{6(\\sqrt{5} + \\sqrt{2})}{5 - 2} = \\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2\\sqrt{5} + 2\\sqrt{2}$.'
              },
              {
                id: 7,
                question:
                  'Diketahui $a = 2^{40}$, $b = 3^{30}$, dan $c = 5^{20}$. Urutan bilangan dari yang terkecil ke terbesar adalah...',
                options: ['$a, b, c$', '$a, c, b$', '$c, b, a$', '$b, c, a$'],
                answer: '$a, c, b$',
                discussion:
                  'Samakan pangkat menjadi $10$: $a = (2^4)^{10} = 16^{10}$, $b = (3^3)^{10} = 27^{10}$, $c = (5^2)^{10} = 25^{10}$. Karena $16 < 25 < 27$, urutannya adalah $a, c, b$.'
              },
              {
                id: 8,
                question: 'Nilai dari $\\sqrt{75} + \\sqrt{48} - \\sqrt{108}$ adalah...',
                options: ['$2\\sqrt{3}$', '$3\\sqrt{3}$', '$4\\sqrt{3}$', '$5\\sqrt{3}$'],
                answer: '$3\\sqrt{3}$',
                discussion:
                  'Sederhanakan tiap akar: $\\sqrt{25 \\times 3} + \\sqrt{16 \\times 3} - \\sqrt{36 \\times 3} = 5\\sqrt{3} + 4\\sqrt{3} - 6\\sqrt{3} = 3\\sqrt{3}$.'
              },
              {
                id: 9,
                question:
                  'Jika $\\frac{1}{1 + \\frac{1}{2 + \\frac{1}{x}}} = \\frac{7}{10}$, maka nilai $x$ yang memenuhi adalah...',
                options: ['2', '3', '4', '5'],
                answer: '3',
                discussion:
                  'Balikkan pecahan bertingkat secara bertahap: $1 + \\frac{1}{2 + \\frac{1}{x}} = \\frac{10}{7} \\implies \\frac{1}{2 + \\frac{1}{x}} = \\frac{3}{7} \\implies 2 + \\frac{1}{x} = \\frac{7}{3} \\implies \\frac{1}{x} = \\frac{1}{3} \\implies x = 3$.'
              },
              {
                id: 10,
                question: 'Nilai dari $\\frac{2^{2026} + 2^{2024}}{2^{2025} - 2^{2023}}$ adalah...',
                options: ['2', '$\\frac{5}{3}$', '$\\frac{10}{3}$', '4'],
                answer: '$\\frac{10}{3}$',
                discussion:
                  'Faktorkan pangkat terkecil: $\\frac{2^{2024}(2^2 + 1)}{2^{2023}(2^2 - 1)} = \\frac{2^{2024} \\times 5}{2^{2023} \\times 3} = \\frac{2 \\times 5}{3} = \\frac{10}{3}$.'
              },
              {
                id: 11,
                question: 'Banyaknya bilangan bulat $n$ yang memenuhi $\\sqrt{10} < n < \\sqrt{90}$ adalah...',
                options: ['5', '6', '7', '8'],
                answer: '6',
                discussion:
                  'Diketahui $3^2 = 9 < 10 < 16 = 4^2$ sehingga $\\sqrt{10} \\approx 3,16$. Sedangkan $9^2 = 81 < 90 < 100 = 10^2$ sehingga $\\sqrt{90} \\approx 9,48$. Bilangan bulat $n$ yang memenuhi adalah $4, 5, 6, 7, 8, 9$ (ada $6$ bilangan).'
              },
              {
                id: 12,
                question: 'Nilai dari bentuk akar tak hingga $\\sqrt{6 + \\sqrt{6 + \\sqrt{6 + \\dots}}}$ adalah...',
                options: ['2', '3', '4', '6'],
                answer: '3',
                discussion:
                  'Misalkan $x = \\sqrt{6 + \\sqrt{6 + \\dots}}$, maka $x = \\sqrt{6 + x} \\implies x^2 = 6 + x \\implies x^2 - x - 6 = 0 \\implies (x - 3)(x + 2) = 0$. Karena nilai akar positif, maka $x = 3$.'
              },
              {
                id: 13,
                question: 'Hasil dari $\\left(\\frac{1}{2}\\right)^{-3} + \\left(\\frac{1}{3}\\right)^{-2} - 5^0$ adalah...',
                options: ['16', '17', '12', '18'],
                answer: '16',
                discussion:
                  'Gunakan sifat $a^{-n} = \\frac{1}{a^n}$ dan $a^0 = 1$: $2^3 + 3^2 - 1 = 8 + 9 - 1 = 16$.'
              },
              {
                id: 14,
                question:
                  'Nilai dari $\\frac{1}{\\sqrt{1} + \\sqrt{2}} + \\frac{1}{\\sqrt{2} + \\sqrt{3}} + \\frac{1}{\\sqrt{3} + \\sqrt{4}} + \\dots + \\frac{1}{\\sqrt{15} + \\sqrt{16}}$ adalah...',
                options: ['3', '4', '15', '$\\sqrt{15}$'],
                answer: '3',
                discussion:
                  'Rasionalkan setiap suku: $\\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sqrt{k+1} - \\sqrt{k}$. Deret menjadi $(\\sqrt{2} - \\sqrt{1}) + (\\sqrt{3} - \\sqrt{2}) + \\dots + (\\sqrt{16} - \\sqrt{15}) = \\sqrt{16} - \\sqrt{1} = 4 - 1 = 3$.'
              },
              {
                id: 15,
                question: 'Jika $3^{x+2} = 81^{x-1}$, maka nilai $x$ yang memenuhi adalah...',
                options: ['1', '2', '3', '4'],
                answer: '2',
                discussion:
                  'Samakan bilangan pokok menjadi $3$: $3^{x+2} = (3^4)^{x-1} \\implies 3^{x+2} = 3^{4x-4}$. Samakan pangkatnya: $x + 2 = 4x - 4 \\implies 3x = 6 \\implies x = 2$.'
              }
            ]
          },
          {
            id: 't2',
            title: 'Perbandingan Senilai dan Berbalik Nilai',
            coachNote:
              'Pada soal pekerjaan bersama, jangan jumlahkan waktu pengerjaannya, melainkan jumlahkan kecepatan (laju) kerja per satuan waktu.',
            sections: [
              {
                heading: '1. Perbandingan Senilai (Direct Proportion)',
                paragraphs: [
                  'Dua besaran dikatakan berbanding senilai jika kenaikan satu besaran menyebabkan kenaikan besaran lainnya dengan rasio tetap ($\\frac{x_1}{y_1} = \\frac{x_2}{y_2}$). Contohnya: jumlah barang dan harga total, jarak tempuh pada kecepatan tetap, serta skala pada peta.'
                ],
                formulas: ['$$\\frac{x_1}{x_2} = \\frac{y_1}{y_2} \\quad \\text{atau} \\quad y = k \\cdot x$$']
              },
              {
                heading: '2. Perbandingan Berbalik Nilai & Pekerjaan Bersama',
                paragraphs: [
                  'Dua besaran berbanding berbalik nilai jika kenaikan satu besaran menyebabkan penurunan besaran lainnya ($x_1 \\cdot y_1 = x_2 \\cdot y_2$). Jika objek A menyelesaikan pekerjaan dalam $t_A$ jam dan objek B dalam $t_B$ jam, waktu gabungan $t_{\\text{gab}}$ memenuhi:'
                ],
                formulas: [
                  '$$x_1 \\times y_1 = x_2 \\times y_2$$',
                  '$$\\frac{1}{t_{\\text{gab}}} = \\frac{1}{t_A} + \\frac{1}{t_B}$$'
                ]
              }
            ],
            examples: [
              {
                number: 1,
                problem:
                  'Sebuah proyek pembangunan jembatan direncanakan selesai dalam $30$ hari oleh $15$ pekerja. Setelah bekerja selama $6$ hari, pekerjaan terhenti selama $4$ hari karena hujan. Berapa tambahan pekerja yang diperlukan agar proyek selesai tepat waktu?',
                solution:
                  'Sisa hari normal $= 30 - 6 = 24$ hari (untuk $15$ pekerja).\nKarena terhenti $4$ hari, sisa hari efektif tinggal $24 - 4 = 20$ hari.\nGunakan perbandingan berbalik nilai:\n$$24 \\times 15 = 20 \\times P_{\\text{baru}} \\implies P_{\\text{baru}} = \\frac{360}{20} = 18 \\text{ pekerja}$$\nJadi, tambahan pekerja yang dibutuhkan adalah $18 - 15 = 3$ orang.'
              },
              {
                number: 2,
                problem:
                  'Keran A dapat mengisi penuh sebuah bak dalam waktu $3$ jam, sedangkan keran B dapat mengisinya dalam waktu $6$ jam. Jika kedua keran dibuka bersamaan, berapa jam waktu yang dibutuhkan hingga bak penuh?',
                solution:
                  'Gunakan rumus laju gabungan:\n$$\\frac{1}{t_{\\text{gab}}} = \\frac{1}{3} + \\frac{1}{6} = \\frac{2 + 1}{6} = \\frac{3}{6} = \\frac{1}{2}$$\nMaka $t_{\\text{gab}} = 2$ jam.'
              }
            ]
          }
        ]
      },
      {
        id: 'l1-u2',
        title: 'Unit 2: Himpunan & Basis Bilangan',
        topics: [
          {
            id: 't3',
            title: 'Pengertian, Notasi, dan Operasi Himpunan',
            content:
              'Irisan ($A \\cap B$), gabungan ($A \\cup B$), komplemen, selisih, serta prinsip inklusi-eksklusi $|A \\cup B| = |A| + |B| - |A \\cap B|$ dalam pemecahan masalah.'
          },
          {
            id: 't4',
            title: 'Pengantar Basis Bilangan Sederhana',
            content:
              'Mengenal sistem bilangan berbasis selain $10$ (basis $2$, basis $5$, dll). Contoh: $23_4 = 2 \\times 4^1 + 3 \\times 4^0 = 11_{10}$.'
          }
        ]
      },
      {
        id: 'l1-u3',
        title: 'Unit 3: Aljabar & Operasi Dasar',
        topics: [
          {
            id: 't5',
            title: 'Operasi Aljabar, Akar, & Pangkat',
            content: 'Penyederhanaan bentuk aljabar yang memuat bilangan rasional dan akar.'
          },
          {
            id: 't6',
            title: 'Persamaan & Pertidaksamaan Linear 1/2 Peubah',
            content: 'Teknik penyelesaian persamaan dan pertidaksamaan linear.'
          }
        ]
      },
      {
        id: 'l1-u4',
        title: 'Unit 4: Pola Bilangan & Barisan Awal',
        topics: [
          {
            id: 't7',
            title: 'Pola Bilangan, Barisan, & Deret Sederhana',
            content: 'Mengidentifikasi pola bilangan bertingkat dan barisan aritmetika dasar $U_n = a + (n-1)b$.'
          }
        ]
      },
      {
        id: 'l1-u5',
        title: 'Unit 5: Garis, Sudut, & Bangun Datar',
        topics: [
          {
            id: 't8',
            title: 'Garis dan Sudut',
            content: 'Kedudukan dua garis, sudut berpenyiku ($90^\\circ$), berpelurus ($180^\\circ$), dan sehadap.'
          },
          {
            id: 't9',
            title: 'Bangun Datar & Koordinat Kartesius',
            content: 'Sifat segitiga, segiempat, keliling, luas, serta sistem koordinat kartesius.'
          }
        ]
      },
      {
        id: 'l1-u6',
        title: 'Unit 6: Teorema Pythagoras & Statistika',
        topics: [
          {
            id: 't10',
            title: 'Teorema Pythagoras',
            content: 'Tripel Pythagoras ($3\\text{-}4\\text{-}5$, $5\\text{-}12\\text{-}13$, $7\\text{-}24\\text{-}25$) dan aplikasinya.'
          },
          {
            id: 't11',
            title: 'Analisis Data & Ukuran Pemusatan',
            content: 'Rata-rata ($\\bar{x}$), median, modus data tunggal serta penafsiran grafik/tabel.'
          }
        ]
      }
    ]
  },
  {
    levelId: 'level-2',
    levelTitle: 'LEVEL 2: MENENGAH',
    description: 'Penguasaan teknik standar kompetisi / Olimpiade.',
    units: [
      {
        id: 'l2-u1',
        title: 'Unit 1: Teori Bilangan (FPB, KPK, & Sisa)',
        topics: [
          {
            id: 't12',
            title: 'FPB, KPK, & Algoritma Euclidean',
            content: 'Mencari FPB dan KPK bilangan besar serta sifat $\\text{FPB}(a,b) \\times \\text{KPK}(a,b) = a \\times b$.'
          },
          {
            id: 't13',
            title: 'Sisa Pembagian & Basis Lanjutan',
            content: 'Teorema sisa pembagian dan konversi basis bilangan.'
          }
        ]
      },
      {
        id: 'l2-u2',
        title: 'Unit 2: Aljabar Menengah & Fungsi',
        topics: [
          {
            id: 't14',
            title: 'Persamaan & Pertidaksamaan Kuadrat',
            content: 'Akar-akar kuadrat, Diskriminan $D = b^2 - 4ac$, dan rumus Vieta.'
          },
          {
            id: 't15',
            title: 'SPLDV & Pengantar Relasi/Fungsi',
            content: 'Sistem Persamaan Linear Dua Peubah serta konsep dasar fungsi.'
          }
        ]
      },
      {
        id: 'l2-u3',
        title: 'Unit 3: Barisan & Deret Lanjutan',
        topics: [
          {
            id: 't16',
            title: 'Barisan & Deret Aritmetika/Geometri Kompleks',
            content: 'Rumus suku ke-$n$ dan jumlah $n$ suku pertama tingkat lanjut.'
          }
        ]
      },
      {
        id: 'l2-u4',
        title: 'Unit 4: Geometri Menengah & Transformasi',
        topics: [
          {
            id: 't17',
            title: 'Kesebangunan, Kekongruenan, & Jarak',
            content: 'Perbandingan sisi pada segitiga sebangun serta jarak titik ke garis.'
          },
          {
            id: 't18',
            title: 'Transformasi Geometri',
            content: 'Translasi, refleksi, rotasi, dan dilatasi pada bidang.'
          }
        ]
      },
      {
        id: 'l2-u5',
        title: 'Unit 5: Bangun Ruang & Peluang Dasar',
        topics: [
          {
            id: 't19',
            title: 'Luas Permukaan & Volume Bangun Ruang',
            content: 'Kubus, balok, prisma, limas, tabung, kerucut, bola.'
          },
          {
            id: 't20',
            title: 'Aturan Pencacahan & Peluang Dasar',
            content: 'Kaidah pencacahan perkalian/penjumlahan dan peluang kejadian.'
          }
        ]
      }
    ]
  },
  {
    levelId: 'level-3',
    levelTitle: 'LEVEL 3: LANJUT',
    description: 'Persiapan Olimpiade tingkat lanjut',
    units: [
      {
        id: 'l3-u1',
        title: 'Unit 1: Teori Bilangan Tingkat Tinggi',
        topics: [
          {
            id: 't21',
            title: 'Aritmetika Modulo & Kongruensi',
            content: 'Sifat-sifat kongruensi modulo, Teorema Fermat Kecil, dan Euler totient.'
          }
        ]
      },
      {
        id: 'l3-u2',
        title: 'Unit 2: Aljabar Lanjutan & Polinomial',
        topics: [
          {
            id: 't22',
            title: 'Operasi Fungsi Suku Banyak & Rasional',
            content: 'Teorema sisa polinomial, faktorisasi tingkat tinggi, dan sifat akar.'
          }
        ]
      },
      {
        id: 'l3-u3',
        title: 'Unit 3: Geometri Lanjutan',
        topics: [
          {
            id: 't23',
            title: 'Garis Istimewa & Dalil Segitiga',
            content: 'Garis berat, sumbu, bagi, tinggi, serta dalil Menelaus & Ceva.'
          }
        ]
      },
      {
        id: 'l3-u4',
        title: 'Unit 4: Kombinatorika Kompleks',
        topics: [
          {
            id: 't24',
            title: 'Permutasi, Kombinasi, & Pigeonhole',
            content: 'Prinsip sarang merpati, kombinatorika lanjutan, dan peluang majemuk.'
          }
        ]
      }
    ]
  }
];

// Bank Soal Campuran (14 Soal Campuran untuk Mode Latihan Acak)
const questionBank = [
  {
    id: 1,
    category: 'Teori Bilangan',
    question: 'Berapakah sisa pembagian dari $2^{100}$ jika dibagi oleh $7$?',
    options: ['1', '2', '4', '6'],
    answer: '2',
    discussion:
      'Gunakan pola modulo $7$ untuk perpangkatan $2$: $2^1 \\equiv 2$, $2^2 \\equiv 4$, $2^3 \\equiv 1 \\pmod{7}$. Karena $100$ dibagi $3$ bersisa $1$, maka $2^{100} \\equiv 2^1 \\equiv 2 \\pmod{7}$.'
  },
  {
    id: 2,
    category: 'Aljabar',
    question: 'Jika $x + \\frac{1}{x} = 3$, tentukan nilai dari $x^3 + \\frac{1}{x^3}$.',
    options: ['18', '27', '24', '21'],
    answer: '18',
    discussion:
      'Gunakan penjabaran kubus: $\\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right)$. Substitusi nilai $3$: $3^3 = x^3 + \\frac{1}{x^3} + 3(3) \\implies 27 = x^3 + \\frac{1}{x^3} + 9 \\implies x^3 + \\frac{1}{x^3} = 18$.'
  },
  {
    id: 3,
    category: 'Geometri',
    question:
      'Sebuah segitiga siku-siku memiliki panjang sisi siku-siku $6\\text{ cm}$ dan $8\\text{ cm}$. Berapakah panjang garis berat yang ditarik dari sudut siku-siku ke sisi miring?',
    options: ['$5\\text{ cm}$', '$6\\text{ cm}$', '$10\\text{ cm}$', '$4,8\\text{ cm}$'],
    answer: '$5\\text{ cm}$',
    discussion:
      'Sisi miring (hipotenusa) $= \\sqrt{6^2 + 8^2} = 10\\text{ cm}$. Pada segitiga siku-siku, panjang garis berat ke sisi miring selalu setengah dari panjang sisi miring tersebut, yaitu $10 / 2 = 5\\text{ cm}$.'
  },
  {
    id: 4,
    category: 'Kombinatorika',
    question: 'Banyaknya cara menyusun huruf pada kata "MATEMATIKA" adalah...',
    options: ['151.200', '302.400', '45.360', '90.720'],
    answer: '151.200',
    discussion:
      'Total huruf $= 10$, dengan unsur ganda: $\\text{M}=2, \\text{A}=3, \\text{T}=2$. Banyak susunan $= \\frac{10!}{2! \\times 3! \\times 2!} = \\frac{3.628.800}{2 \\times 6 \\times 2} = 151.200$.'
  },
  {
    id: 5,
    category: 'Teori Bilangan',
    question: 'Banyaknya faktor positif dari bilangan $720$ adalah...',
    options: ['24', '30', '32', '36'],
    answer: '30',
    discussion:
      'Faktorisasi prima dari $720$ adalah $720 = 2^4 \\times 3^2 \\times 5^1$. Banyaknya faktor positif $= (4+1)(2+1)(1+1) = 5 \\times 3 \\times 2 = 30$.'
  },
  {
    id: 6,
    category: 'Aljabar',
    question: 'Jika akar-akar persamaan kuadrat $x^2 - 5x + c = 0$ berselisih $1$, berapakah nilai $c$?',
    options: ['4', '6', '8', '10'],
    answer: '6',
    discussion:
      'Gunakan identitas $(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 \\implies 1^2 = 5^2 - 4c \\implies 1 = 25 - 4c \\implies c = 6$.'
  },
  {
    id: 7,
    category: 'Geometri',
    question: 'Luas sebuah lingkaran yang kelilingnya $44\\text{ cm}$ (dengan $\\pi = \\frac{22}{7}$) adalah...',
    options: ['$132\\text{ cm}^2$', '$154\\text{ cm}^2$', '$308\\text{ cm}^2$', '$616\\text{ cm}^2$'],
    answer: '$154\\text{ cm}^2$',
    discussion:
      'Keliling $K = 2\\pi r \\implies 44 = 2 \\times \\frac{22}{7} \\times r \\implies r = 7\\text{ cm}$. Luas lingkaran $L = \\pi r^2 = \\frac{22}{7} \\times 7^2 = 154\\text{ cm}^2$.'
  },
  {
    id: 8,
    category: 'Teori Bilangan',
    question: 'Angka satuan dari bilangan $3^{2026}$ adalah...',
    options: ['1', '3', '7', '9'],
    answer: '9',
    discussion:
      'Pola angka satuan perpangkatan $3$ berulang setiap $4$ kali: $3, 9, 7, 1$. Karena $2026 = 4 \\times 506 + 2$, sisa pembagiannya adalah $2$, sehingga angka satuannya sama dengan $3^2 = 9$.'
  },
  {
    id: 9,
    category: 'Aljabar',
    question: 'Jika $f(x) = 2x - 3$ dan $(f \\circ g)(x) = 4x^2 - 6x + 5$, maka rumus fungsi $g(x)$ adalah...',
    options: ['$2x^2 - 3x + 4$', '$2x^2 - 3x + 1$', '$4x^2 - 6x + 8$', '$2x^2 + 3x - 1$'],
    answer: '$2x^2 - 3x + 4$',
    discussion:
      'Diketahui $f(g(x)) = 2g(x) - 3 = 4x^2 - 6x + 5$. Maka $2g(x) = 4x^2 - 6x + 8 \\implies g(x) = 2x^2 - 3x + 4$.'
  },
  {
    id: 10,
    category: 'Geometri',
    question:
      'Keliling trapesium sama kaki dengan panjang sisi sejajar $10\\text{ cm}$ dan $20\\text{ cm}$ serta panjang kaki trapesium $13\\text{ cm}$ adalah...',
    options: ['$56\\text{ cm}$', '$43\\text{ cm}$', '$50\\text{ cm}$', '$66\\text{ cm}$'],
    answer: '$56\\text{ cm}$',
    discussion: 'Keliling trapesium $K = 10 + 20 + 2(13) = 30 + 26 = 56\\text{ cm}$.'
  },
  {
    id: 11,
    category: 'Kombinatorika',
    question:
      'Dalam sebuah kelas terdapat $10$ siswa. Akan dipilih pengurus kelas yang terdiri dari seorang ketua, seorang sekretaris, dan seorang bendahara. Banyaknya susunan pengurus yang mungkin adalah...',
    options: ['120', '720', '90', '504'],
    answer: '720',
    discussion: 'Permutasi $3$ dari $10$: $P(10,3) = 10 \\times 9 \\times 8 = 720$.'
  },
  {
    id: 12,
    category: 'Teori Bilangan',
    question:
      'FPB dan KPK dari dua bilangan adalah $6$ dan $180$. Jika salah satu bilangan tersebut adalah $30$, berapakah bilangan yang lain?',
    options: ['18', '36', '60', '72'],
    answer: '36',
    discussion:
      'Gunakan sifat $\\text{FPB}(a,b) \\times \\text{KPK}(a,b) = a \\times b \\implies 6 \\times 180 = 30 \\times b \\implies b = 36$.'
  },
  {
    id: 13,
    category: 'Aljabar',
    question: 'Nilai minimum dari fungsi kuadrat $f(x) = x^2 - 6x + 8$ adalah...',
    options: ['-1', '0', '-2', '1'],
    answer: '-1',
    discussion:
      'Titik puncak $x_p = -\\frac{b}{2a} = 3$, sehingga nilai minimum $f(3) = 3^2 - 6(3) + 8 = 9 - 18 + 8 = -1$.'
  },
  {
    id: 14,
    category: 'Geometri',
    question:
      'Sebuah kubus memiliki panjang rusuk $6\\text{ cm}$. Jarak dari titik sudut ke titik sudut diagonal ruang kubus tersebut adalah...',
    options: ['$6\\text{ cm}$', '$6\\sqrt{2}\\text{ cm}$', '$6\\sqrt{3}\\text{ cm}$', '$12\\text{ cm}$'],
    answer: '$6\\sqrt{3}\\text{ cm}$',
    discussion: 'Panjang diagonal ruang kubus dengan rusuk $s$ adalah $s\\sqrt{3} = 6\\sqrt{3}\\text{ cm}$.'
  }
];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(curriculumData[0].units[0].topics[0]);
  const [completed, setCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  // State Autentikasi & Akses Mode Editor Tersembunyi (?editor=1 atau 5x klik badge OM)
  const [isEditorUnlocked, setIsEditorUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('jagomatika_editor_unlocked') === 'true';
    }
    return false;
  });

  const [isEditorMode, setIsEditorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const unlocked = sessionStorage.getItem('jagomatika_editor_unlocked') === 'true';
      return params.get('editor') === '1' && unlocked;
    }
    return false;
  });

  const [showPasswordModal, setShowPasswordModal] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const unlocked = sessionStorage.getItem('jagomatika_editor_unlocked') === 'true';
      return params.get('editor') === '1' && !unlocked;
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);

  // State Form Input di Mode Editor
  const [editorTarget, setEditorTarget] = useState('exercise'); // 'exercise' | 'mixed' | 'example'
  const [edId, setEdId] = useState('16');
  const [edCategory, setEdCategory] = useState('Aljabar');
  const [edQuestion, setEdQuestion] = useState(
    'Jika $x + y = 10$ dan $xy = 21$, tentukan nilai dari $x^2 + y^2$.'
  );
  const [edOptions, setEdOptions] = useState(['58', '100', '42', '79']);
  const [edCorrectIdx, setEdCorrectIdx] = useState(0);
  const [edDiscussion, setEdDiscussion] = useState(
    'Gunakan identitas aljabar $(x + y)^2 = x^2 + 2xy + y^2$.\nSubstitusi nilai yang diketahui: $10^2 = (x^2 + y^2) + 2(21) \\implies 100 = x^2 + y^2 + 42 \\implies x^2 + y^2 = 58$.'
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const questionInputRef = useRef(null);

  // State untuk Mode Latihan Soal Campuran
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  // State untuk 15 Soal Latihan Mandiri di dalam Topik
  const [topicAnswers, setTopicAnswers] = useState({});
  const [topicDiscussions, setTopicDiscussions] = useState({});

  const [openLevels, setOpenLevels] = useState({
    'level-1': true,
    'level-2': false,
    'level-3': false
  });

  const [openUnits, setOpenUnits] = useState({
    'l1-u1': true
  });

  // Memuat KaTeX CSS & JS secara otomatis agar rumus LaTeX tampil rapi
  useEffect(() => {
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('katex-js')) {
      const script = document.createElement('script');
      script.id = 'katex-js';
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
      script.onload = () => {
        const autoRender = document.createElement('script');
        autoRender.id = 'katex-autorender';
        autoRender.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js';
        autoRender.onload = () => {
          window.dispatchEvent(new Event('katex-loaded'));
        };
        document.head.appendChild(autoRender);
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleSecretAvatarClick = () => {
    const nextCount = secretClicks + 1;
    if (nextCount >= 5) {
      setSecretClicks(0);
      if (isEditorMode) {
        setIsEditorMode(false);
      } else if (isEditorUnlocked) {
        setIsEditorMode(true);
      } else {
        setPasswordInput('');
        setPasswordError('');
        setShowPasswordModal(true);
      }
    } else {
      setSecretClicks(nextCount);
    }
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (passwordInput === EDITOR_PASSWORD) {
      sessionStorage.setItem('jagomatika_editor_unlocked', 'true');
      setIsEditorUnlocked(true);
      setShowPasswordModal(false);
      setIsEditorMode(true);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('Kata sandi salah. Silakan coba lagi.');
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const insertLatexSnippet = (snippet) => {
    setEdQuestion((prev) => `${prev}${prev.endsWith(' ') || prev === '' ? '' : ' '}${snippet}`);
    if (questionInputRef.current) {
      questionInputRef.current.focus();
    }
  };

  const handleOptionChange = (index, value) => {
    setEdOptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const resetEditorForm = () => {
    setEdId((prev) => String((parseInt(prev, 10) || 0) + 1));
    setEdQuestion('');
    setEdOptions(['', '', '', '']);
    setEdCorrectIdx(0);
    setEdDiscussion('');
    setCopiedCode(false);
  };

  // Menghasilkan kode JS siap tempel (JSON.stringify otomatis menggandakan backslash LaTeX)
  const generateCodeOutput = () => {
    const numericId = parseInt(edId, 10) || 1;
    if (editorTarget === 'example') {
      return `{
  number: ${numericId},
  problem: ${JSON.stringify(edQuestion)},
  solution: ${JSON.stringify(edDiscussion)}
},`;
    }

    const correctAnswerStr = edOptions[edCorrectIdx] || '';
    if (editorTarget === 'mixed') {
      return `{
  id: ${numericId},
  category: ${JSON.stringify(edCategory)},
  question: ${JSON.stringify(edQuestion)},
  options: [${edOptions.map((o) => JSON.stringify(o)).join(', ')}],
  answer: ${JSON.stringify(correctAnswerStr)},
  discussion: ${JSON.stringify(edDiscussion)}
},`;
    }

    return `{
  id: ${numericId},
  question: ${JSON.stringify(edQuestion)},
  options: [${edOptions.map((o) => JSON.stringify(o)).join(', ')}],
  answer: ${JSON.stringify(correctAnswerStr)},
  discussion: ${JSON.stringify(edDiscussion)}
},`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCodeOutput());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const toggleLevel = (levelId) => {
    setOpenLevels((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleUnit = (unitId) => {
    setOpenUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    setCurrentQIndex(randomIndex);
    setSelectedAnswer(null);
    setShowDiscussion(false);
  };

  const handleSelectTopicAnswer = (qId, option) => {
    setTopicAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleTopicDiscussion = (qId) => {
    setTopicDiscussions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const activeQuestion = questionBank[currentQIndex];

  const latexQuickButtons = [
    { label: 'Pecahan', code: '$\\frac{a}{b}$' },
    { label: 'Akar', code: '$\\sqrt{x}$' },
    { label: 'Pangkat', code: '$x^{2}$' },
    { label: 'Kali (×)', code: '$\\times$' },
    { label: 'Kongruen (≡)', code: '$\\equiv$' },
    { label: 'Modulo', code: '$\\pmod{m}$' },
    { label: 'Implikasi (⇒)', code: '$\\implies$' },
    { label: 'Derajat (°)', code: '$^\\circ$' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Modal Password Akses Mode Editor */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Akses Mode Editor</h3>
                  <p className="text-xs text-gray-500">Masukkan kata sandi pelatih</p>
                </div>
              </div>
              <button
                onClick={handleClosePasswordModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Masukkan kata sandi..."
                    autoFocus
                    className="w-full pl-3.5 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPasswordText ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordError && <p className="text-xs font-semibold text-red-600 mt-1.5">{passwordError}</p>}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={handleClosePasswordModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Masuk Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              JAGOMATIKA{' '}
              <span className="text-emerald-600 text-xs uppercase px-2 py-0.5 bg-emerald-50 rounded-full ml-1 border border-emerald-200">
                Olimpiade
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isEditorMode && (
            <button
              onClick={() => setIsEditorMode(false)}
              className="flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-200 transition-all"
            >
              <X size={14} />
              <span>Tutup Mode Editor</span>
            </button>
          )}
          <span className="text-sm font-medium text-gray-600 hidden sm:inline">Pusat Pembinaan & Mandiri</span>
          <button
            onClick={handleSecretAvatarClick}
            title="Jagomatika"
            className="w-9 h-9 bg-emerald-100 text-emerald-800 font-semibold rounded-full flex items-center justify-center border border-emerald-300 select-none active:scale-95 transition-transform"
          >
            OM
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigasi & Menu Latihan */}
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-20 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-0 shadow-sm
        `}
        >
          <div className="p-4 border-b border-gray-100 bg-emerald-50 space-y-2">
            <button
              onClick={() => {
                setIsPracticeMode(true);
                setIsEditorMode(false);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isPracticeMode && !isEditorMode
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <Shuffle size={16} />
              <span>⚡ Latihan Soal Campuran (OSN)</span>
            </button>

            {isEditorMode && (
              <button
                onClick={() => {
                  setIsEditorMode(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white shadow-sm"
              >
                <Edit3 size={15} />
                <span>Mode Editor & Live LaTeX</span>
              </button>
            )}
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
                    {isLevelOpen ? (
                      <ChevronDown size={16} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-500" />
                    )}
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
                              {isUnitOpen ? (
                                <ChevronDown size={14} className="text-gray-400 shrink-0" />
                              ) : (
                                <ChevronRight size={14} className="text-gray-400 shrink-0" />
                              )}
                            </button>

                            {isUnitOpen && (
                              <div className="p-1.5 space-y-1 bg-white border-t border-gray-100">
                                {unit.topics.map((topic) => {
                                  const isSelected = !isPracticeMode && !isEditorMode && selectedTopic.id === topic.id;
                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => {
                                        setSelectedTopic(topic);
                                        setIsPracticeMode(false);
                                        setIsEditorMode(false);
                                        setMobileMenuOpen(false);
                                        setCompleted(false);
                                        setTopicAnswers({});
                                        setTopicDiscussions({});
                                      }}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-2 ${
                                        isSelected
                                          ? 'bg-emerald-700 text-white shadow-xs'
                                          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-900'
                                      }`}
                                    >
                                      <BookOpen size={12} className={isSelected ? 'text-white shrink-0' : 'text-emerald-600 shrink-0'} />
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
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:px-14 bg-gray-50 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-8">
            {isEditorMode ? (
              // TAMPILAN MODE EDITOR TERSEMBUNYI
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
                      Mode Editor Pelatih (Terverifikasi)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Generator Soal & Live Preview LaTeX</h1>
                    <p className="text-slate-300 text-sm mt-1">
                      Ketik rumus dengan tanda <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">$ ... $</code>{' '}
                      (cukup 1 backslash <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">\frac</code>), cek
                      pratinjaunya, lalu salin kode JS siap pakai.
                    </p>
                  </div>
                  <button
                    onClick={resetEditorForm}
                    className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition-all shrink-0"
                  >
                    <RotateCcw size={15} />
                    <span>Soal Baru (Reset)</span>
                  </button>
                </div>

                {/* Pilihan Target Format Kode */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">Target Tujuan Kode:</span>
                  {[
                    { id: 'exercise', label: 'Latihan Mandiri Unit (exercises)' },
                    { id: 'mixed', label: 'Bank Soal Campuran (questionBank)' },
                    { id: 'example', label: 'Contoh Soal Modul (examples)' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setEditorTarget(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        editorTarget === tab.id
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* KOLOM KIRI: FORM INPUT */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
                    <div className="flex items-center space-x-2 border-b pb-3">
                      <Edit3 size={18} className="text-emerald-700" />
                      <h2 className="text-base font-bold text-gray-900">1. Formulir Input Konten</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          {editorTarget === 'example' ? 'Nomor Contoh' : 'ID / Nomor Soal'}
                        </label>
                        <input
                          type="number"
                          value={edId}
                          onChange={(e) => setEdId(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      {editorTarget === 'mixed' && (
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Materi</label>
                          <select
                            value={edCategory}
                            onChange={(e) => setEdCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 bg-white"
                          >
                            <option value="Teori Bilangan">Teori Bilangan</option>
                            <option value="Aljabar">Aljabar</option>
                            <option value="Geometri">Geometri</option>
                            <option value="Kombinatorika">Kombinatorika</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Tombol Sisip Cepat LaTeX */}
                    <div>
                      <span className="block text-xs font-bold text-gray-600 mb-1.5">Sisip Cepat Simbol LaTeX:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {latexQuickButtons.map((btn, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => insertLatexSnippet(btn.code)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Teks Pertanyaan / Soal</label>
                      <textarea
                        ref={questionInputRef}
                        rows={4}
                        value={edQuestion}
                        onChange={(e) => setEdQuestion(e.target.value)}
                        placeholder="Ketik soal di sini, gunakan $...$ untuk rumus..."
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>

                    {editorTarget !== 'example' && (
                      <div className="space-y-2.5">
                        <label className="block text-xs font-bold text-gray-700">
                          Pilihan Jawaban (Klik huruf untuk menandai Kunci Jawaban)
                        </label>
                        {edOptions.map((opt, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => setEdCorrectIdx(idx)}
                              className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 border transition-all ${
                                edCorrectIdx === idx
                                  ? 'bg-emerald-700 text-white border-emerald-700'
                                  : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                              }`}
                              title="Tandai sebagai jawaban benar"
                            >
                              {String.fromCharCode(65 + idx)}
                            </button>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleOptionChange(idx, e.target.value)}
                              placeholder={`Opsi ${String.fromCharCode(65 + idx)} (contoh: $2\\sqrt{3}$)`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Pembahasan Lengkap</label>
                      <textarea
                        rows={4}
                        value={edDiscussion}
                        onChange={(e) => setEdDiscussion(e.target.value)}
                        placeholder="Ketik langkah pembahasan dengan format LaTeX..."
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  </div>

                  {/* KOLOM KANAN: LIVE PREVIEW & GENERATED CODE */}
                  <div className="space-y-6">
                    {/* Live Preview Card */}
                    <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-2">
                          <Eye size={18} className="text-emerald-700" />
                          <h2 className="text-base font-bold text-gray-900">2. Live Preview Tampilan Siswa</h2>
                        </div>
                        {editorTarget === 'mixed' && (
                          <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                            {edCategory}
                          </span>
                        )}
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                        <div className="flex items-start space-x-3">
                          <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {edId || '1'}
                          </span>
                          <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
                            <MathText text={edQuestion || 'Pratinjau soal akan muncul di sini...'} />
                          </div>
                        </div>

                        {editorTarget !== 'example' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-10">
                            {edOptions.map((opt, idx) => {
                              const isKey = edCorrectIdx === idx;
                              return (
                                <div
                                  key={idx}
                                  className={`px-3.5 py-2 rounded-lg border text-sm flex items-center justify-between ${
                                    isKey
                                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                      : 'border-gray-200 bg-white text-gray-700'
                                  }`}
                                >
                                  <MathText text={opt || `Opsi ${String.fromCharCode(65 + idx)}`} />
                                  {isKey && <CheckCircle size={14} className="text-emerald-600 shrink-0" />}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-xs md:text-sm text-emerald-950 space-y-1">
                          <p className="font-bold text-emerald-800">Pembahasan:</p>
                          <div className="leading-relaxed whitespace-pre-line">
                            <MathText text={edDiscussion || 'Pratinjau pembahasan akan muncul di sini...'} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Box Kode JS Siap Salin */}
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Code size={18} className="text-emerald-400" />
                          <h3 className="text-sm font-bold text-white">3. Kode Siap Tempel (App.jsx)</h3>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            copiedCode
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-900 hover:bg-emerald-50'
                          }`}
                        >
                          {copiedCode ? <Check size={15} /> : <Copy size={15} />}
                          <span>{copiedCode ? 'Kode Tersalin!' : 'Salin Kode'}</span>
                        </button>
                      </div>

                      <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-emerald-300 overflow-x-auto font-mono leading-relaxed">
                        {generateCodeOutput()}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ) : isPracticeMode ? (
              // TAMPILAN MODE LATIHAN SOAL CAMPURAN
              <div className="space-y-6">
                <div className="bg-emerald-700 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-emerald-800 text-emerald-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-600">
                      Bank Soal Campuran OSN ({questionBank.length} Soal Tersedia)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Simulasi & Latihan Acak</h1>
                    <p className="text-emerald-100 text-sm mt-1">
                      Uji kemampuan analitis Anda dengan soal campuran dari berbagai pilar matematika.
                    </p>
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
                    <span className="text-xs font-semibold text-gray-500">
                      Soal #{activeQuestion.id} dari {questionBank.length}
                    </span>
                  </div>

                  <div className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                    <MathText text={activeQuestion.question} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {activeQuestion.options.map((opt, idx) => {
                      const isChosen = selectedAnswer === opt;
                      const isCorrect = opt === activeQuestion.answer;
                      let btnStyle = 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';

                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnswer(opt)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-xl border-2 text-left transition-all text-sm font-medium flex items-center justify-between ${btnStyle}`}
                        >
                          <MathText text={opt} />
                          {selectedAnswer !== null && isCorrect && <CheckCircle size={16} className="text-emerald-600 shrink-0" />}
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
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-900 space-y-2">
                      <p className="font-bold">💡 Pembahasan Resmi:</p>
                      <div className="leading-relaxed whitespace-pre-line">
                        <MathText text={activeQuestion.discussion} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // TAMPILAN MODUL MATERI STANDAR
              <div className="space-y-8">
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    Modul Pembelajaran Mandiri
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
                    {selectedTopic.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Status Membaca:</span>
                      <span className="font-semibold text-emerald-700">{completed ? '100% Selesai' : 'Sedang Dipelajari'}</span>
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3 space-y-8">
                    <section id="materi" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
                      <div className="flex items-center space-x-2 border-b pb-3">
                        <Calculator size={20} className="text-emerald-700" />
                        <h2 className="text-lg font-bold text-gray-900">Ringkasan Konsep & Rumus Penting</h2>
                      </div>

                      {selectedTopic.sections ? (
                        <div className="space-y-6">
                          {selectedTopic.sections.map((sec, sIdx) => (
                            <div key={sIdx} className="space-y-3">
                              <h3 className="text-base font-bold text-emerald-900">{sec.heading}</h3>
                              {sec.paragraphs.map((p, pIdx) => (
                                <p key={pIdx} className="text-gray-700 leading-relaxed text-sm md:text-base">
                                  <MathText text={p} />
                                </p>
                              ))}
                              {sec.formulas && (
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 overflow-x-auto">
                                  {sec.formulas.map((formula, fIdx) => (
                                    <div key={fIdx} className="text-gray-900 text-sm md:text-base">
                                      <MathText text={formula} />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                          <MathText text={selectedTopic.content || ''} />
                        </p>
                      )}

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900">
                        <strong>Catatan Pelatih:</strong>{' '}
                        <MathText
                          text={
                            selectedTopic.coachNote ||
                            'Pelajari konsep dasar di atas, catat rumus penting ke dalam buku catatan olimpiade Anda, lalu kerjakan latihan soal di bawah ini.'
                          }
                        />
                      </div>
                    </section>

                    {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                      <section id="contoh-soal" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
                        <div className="flex items-center space-x-2 border-b pb-3">
                          <Lightbulb size={20} className="text-amber-600" />
                          <h2 className="text-lg font-bold text-gray-900">Contoh Soal & Pembahasan Olimpiade</h2>
                        </div>

                        <div className="space-y-6">
                          {selectedTopic.examples.map((ex) => (
                            <div key={ex.number} className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                              <span className="inline-block text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-1 rounded-md">
                                Contoh Soal #{ex.number}
                              </span>
                              <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed">
                                <MathText text={ex.problem} />
                              </div>
                              <div className="bg-white border border-emerald-200 rounded-lg p-4 text-sm text-gray-800 space-y-1">
                                <p className="font-bold text-emerald-800">Pembahasan:</p>
                                <div className="leading-relaxed whitespace-pre-line">
                                  <MathText text={ex.solution} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {selectedTopic.exercises && selectedTopic.exercises.length > 0 && (
                      <section id="latihan-mandiri" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                          <div className="flex items-center space-x-2">
                            <Award size={20} className="text-emerald-700" />
                            <h2 className="text-lg font-bold text-gray-900">
                              Latihan Mandiri ({selectedTopic.exercises.length} Soal)
                            </h2>
                          </div>
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            Skor Sementara:{' '}
                            {selectedTopic.exercises.filter((q) => topicAnswers[q.id] === q.answer).length} /{' '}
                            {selectedTopic.exercises.length}
                          </span>
                        </div>

                        <div className="space-y-6">
                          {selectedTopic.exercises.map((q) => {
                            const chosen = topicAnswers[q.id];
                            const isDiscOpen = topicDiscussions[q.id];

                            return (
                              <div key={q.id} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/40">
                                <div className="flex items-start space-x-3">
                                  <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {q.id}
                                  </span>
                                  <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed">
                                    <MathText text={q.question} />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-10">
                                  {q.options.map((opt, oIdx) => {
                                    const isThisChosen = chosen === opt;
                                    const isThisCorrect = opt === q.answer;
                                    let optionClass =
                                      'border-gray-200 bg-white text-gray-700 hover:border-emerald-400 hover:bg-emerald-50/40';

                                    if (chosen) {
                                      if (isThisCorrect) {
                                        optionClass = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                                      } else if (isThisChosen && !isThisCorrect) {
                                        optionClass = 'border-red-400 bg-red-50 text-red-900 font-bold';
                                      }
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        onClick={() => handleSelectTopicAnswer(q.id, opt)}
                                        className={`px-4 py-2.5 rounded-lg border text-left text-sm transition-all flex items-center justify-between ${optionClass}`}
                                      >
                                        <MathText text={opt} />
                                        {chosen && isThisCorrect && <CheckCircle size={15} className="text-emerald-600 shrink-0" />}
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className="pl-0 sm:pl-10 flex items-center justify-between pt-1">
                                  <button
                                    onClick={() => toggleTopicDiscussion(q.id)}
                                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                                  >
                                    <HelpCircle size={14} />
                                    <span>{isDiscOpen ? 'Tutup Pembahasan' : 'Lihat Kunci & Pembahasan'}</span>
                                  </button>
                                </div>

                                {isDiscOpen && (
                                  <div className="ml-0 sm:ml-10 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-xs md:text-sm text-emerald-950 space-y-1">
                                    <p className="font-bold">
                                      Kunci Jawaban: <MathText text={q.answer} />
                                    </p>
                                    <div className="leading-relaxed">
                                      <MathText text={q.discussion} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm sticky top-20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Navigasi Modul</h4>
                      <ul className="space-y-2.5 text-xs font-medium text-gray-600">
                        <li>
                          <a href="#materi" className="text-emerald-700 font-semibold hover:underline">
                            01. Konsep & Rumus LaTeX
                          </a>
                        </li>
                        {selectedTopic.examples && (
                          <li>
                            <a href="#contoh-soal" className="hover:text-emerald-700 hover:underline">
                              02. Contoh Soal & Pembahasan
                            </a>
                          </li>
                        )}
                        {selectedTopic.exercises && (
                          <li>
                            <a href="#latihan-mandiri" className="hover:text-emerald-700 hover:underline">
                              03. Latihan Mandiri (15 Soal)
                            </a>
                          </li>
                        )}
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