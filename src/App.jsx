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
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  Lock,
  Save,
  Download,
  PlusCircle
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

const defaultCurriculumData = [
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
                  'Dua besaran dikatakan berbanding senilai jika kenaikan satu besaran menyebabkan kenaikan besaran lainnya dengan rasio tetap ($\\frac{x_1}{y_1} = \\frac{x_2}{y_2}$).'
                ],
                formulas: ['$$\\frac{x_1}{x_2} = \\frac{y_1}{y_2} \\quad \\text{atau} \\quad y = k \\cdot x$$']
              },
              {
                heading: '2. Perbandingan Berbalik Nilai & Pekerjaan Bersama',
                paragraphs: [
                  'Dua besaran berbanding berbalik nilai jika kenaikan satu besaran menyebabkan penurunan besaran lainnya ($x_1 \\cdot y_1 = x_2 \\cdot y_2$).'
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
                  'Keran A dapat mengisi penuh sebuah bak dalam waktu $3$ jam, sedangkan keran B dapat mengisinya dalam waktu $6$ jam. Jika kedua keran dibuka bersamaan, berapa jam waktu yang dibutuhkan hingga bak penuh?',
                solution:
                  'Gunakan rumus laju gabungan:\n$$\\frac{1}{t_{\\text{gab}}} = \\frac{1}{3} + \\frac{1}{6} = \\frac{2 + 1}{6} = \\frac{3}{6} = \\frac{1}{2}$$\nMaka $t_{\\text{gab}} = 2$ jam.'
              }
            ],
            exercises: []
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
            coachNote: 'Gunakan diagram Venn untuk memvisualisasikan irisan tiga himpunan.',
            sections: [
              {
                heading: '1. Prinsip Inklusi-Eksklusi Dua Himpunan',
                paragraphs: [
                  'Irisan ($A \\cap B$), gabungan ($A \\cup B$), komplemen, dan selisih himpunan memenuhi hubungan kardinalitas berikut:'
                ],
                formulas: ['$$|A \\cup B| = |A| + |B| - |A \\cap B|$$']
              }
            ],
            examples: [],
            exercises: []
          },
          {
            id: 't4',
            title: 'Pengantar Basis Bilangan Sederhana',
            coachNote: 'Perhatikan bahwa setiap digit pada basis $b$ harus bernilai kurang dari $b$.',
            sections: [
              {
                heading: '1. Konversi Basis Bilangan ke Basis 10',
                paragraphs: [
                  'Mengenal sistem bilangan berbasis selain $10$ (basis $2$, basis $5$, dll). Contoh: $23_4 = 2 \\times 4^1 + 3 \\times 4^0 = 11_{10}$.'
                ],
                formulas: ['$$(a_n a_{n-1} \\dots a_0)_b = a_n b^n + a_{n-1} b^{n-1} + \\dots + a_0 b^0$$']
              }
            ],
            examples: [],
            exercises: []
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
            coachNote: 'Kenali bentuk pemfaktoran simetris.',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't6',
            title: 'Persamaan & Pertidaksamaan Linear 1/2 Peubah',
            coachNote: 'Hati-hati saat mengalikan atau membagi pertidaksamaan dengan bilangan negatif.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Cek selisih tingkat pertama dan tingkat kedua.',
            sections: [
              {
                heading: '1. Barisan Aritmetika Dasar',
                paragraphs: ['Suku ke-$n$ barisan aritmetika dengan suku awal $a$ dan beda $b$:'],
                formulas: ['$$U_n = a + (n-1)b$$']
              }
            ],
            examples: [],
            exercises: []
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
            coachNote: 'Buat garis bantu sejajar jika menemui sudut berliku (zig-zag).',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't9',
            title: 'Bangun Datar & Koordinat Kartesius',
            coachNote: 'Manfaatkan perbandingan luas segitiga yang memiliki tinggi sama.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Hafalkan tripel Pythagoras dasar: (3,4,5), (5,12,13), (7,24,25), dan (8,15,17).',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't11',
            title: 'Analisis Data & Ukuran Pemusatan',
            coachNote: 'Gunakan konsep jumlah data = rata-rata dikali banyak data.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Gunakan sifat FPB(a, b) = FPB(a - b, b) untuk menyederhanakan bentuk aljabar.',
            sections: [
              {
                heading: '1. Hubungan FPB dan KPK',
                paragraphs: ['Untuk dua bilangan bulat positif $a$ dan $b$, berlaku:'],
                formulas: ['$$\\text{FPB}(a,b) \\times \\text{KPK}(a,b) = a \\times b$$']
              }
            ],
            examples: [],
            exercises: []
          },
          {
            id: 't13',
            title: 'Sisa Pembagian & Basis Lanjutan',
            coachNote: 'Amati pola pengulangan sisa pembagian pada bilangan berpangkat.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Gunakan Teorema Vieta tanpa harus mencari nilai akar satu per satu.',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't15',
            title: 'SPLDV & Pengantar Relasi/Fungsi',
            coachNote: 'Jumlahkan atau kurangkan kedua persamaan untuk membentuk pola simetris.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Perhatikan syarat konvergensi deret geometri tak hingga ($|r| < 1$).',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Rasio luas dua segitiga sebangun sama dengan kuadrat rasio sisinya.',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't18',
            title: 'Transformasi Geometri',
            coachNote: 'Pencerminan mempertahankan jarak dan besar sudut.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Gunakan jaring-jaring bangun ruang untuk mencari lintasan terpendek.',
            sections: [],
            examples: [],
            exercises: []
          },
          {
            id: 't20',
            title: 'Aturan Pencacahan & Peluang Dasar',
            coachNote: 'Bedakan kapan urutan diperhatikan (Permutasi) dan kapan diabaikan (Kombinasi).',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Manfaatkan Teorema Fermat Kecil untuk menyederhanakan pangkat besar.',
            sections: [
              {
                heading: '1. Definisi Kongruensi Modulo',
                paragraphs: ['$a \\equiv b \\pmod{m}$ berarti $m$ membagi habis $(a - b)$.'],
                formulas: ['$$a \\equiv b \\pmod{m} \\iff m \\mid (a - b)$$']
              }
            ],
            examples: [],
            exercises: []
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
            coachNote: 'Gunakan Teorema Sisa dan Teorema Faktor dengan substitusi akar pembuat nol.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Kenali konfigurasi dalil Menelaus dan Ceva pada segitiga.',
            sections: [],
            examples: [],
            exercises: []
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
            coachNote: 'Tentukan mana yang menjadi "merpati" dan mana yang menjadi "sarang".',
            sections: [],
            examples: [],
            exercises: []
          }
        ]
      }
    ]
  }
];

const defaultQuestionBank = [
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
      'Gunakan penjabaran kubus: $\\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right)$. Substitusi nilai $3$: $27 = x^3 + \\frac{1}{x^3} + 9 \\implies x^3 + \\frac{1}{x^3} = 18$.'
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
  }
];

export default function App() {
  // Penyimpanan Lokal (LocalStorage)
  const [curriculumData, setCurriculumData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jagomatika_curriculum');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return defaultCurriculumData;
  });

  const [questionBank, setQuestionBank] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jagomatika_questionbank');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return defaultQuestionBank;
  });

  // Gunakan ID topik aktif agar selalu sinkron dengan pembaruan curriculumData
  const [selectedTopicId, setSelectedTopicId] = useState('t1');
  const selectedTopic =
    curriculumData
      .flatMap((l) => l.units)
      .flatMap((u) => u.topics)
      .find((t) => t.id === selectedTopicId) || curriculumData[0].units[0].topics[0];

  const [completed, setCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  // Autentikasi & Akses Mode Editor
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

  // State Form Input & Edit di Mode Editor
  const [editorTarget, setEditorTarget] = useState('exercise'); // 'exercise' | 'example' | 'section' | 'mixed'
  const [editingIndex, setEditingIndex] = useState(null); // null = Mode Tambah Baru, angka = Index item yang diedit
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);

  const [edCategory, setEdCategory] = useState('Aljabar');
  const [edQuestion, setEdQuestion] = useState('');
  const [edOptions, setEdOptions] = useState(['', '', '', '']);
  const [edCorrectIdx, setEdCorrectIdx] = useState(0);
  const [edDiscussion, setEdDiscussion] = useState('');

  // Fields untuk Section (Materi/Teori)
  const [edHeading, setEdHeading] = useState('');
  const [edParagraph, setEdParagraph] = useState('');
  const [edFormula, setEdFormula] = useState('');

  const [saveNotification, setSaveNotification] = useState('');
  const questionInputRef = useRef(null);
  const editorFormTopRef = useRef(null);

  // State Latihan Soal Campuran
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  // State Latihan Mandiri di Topik
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

  // Load KaTeX
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

  const showToast = (msg) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3500);
  };

  const resetFormFields = () => {
    setEditingIndex(null);
    setConfirmDeleteIdx(null);
    setEdQuestion('');
    setEdOptions(['', '', '', '']);
    setEdCorrectIdx(0);
    setEdDiscussion('');
    setEdHeading('');
    setEdParagraph('');
    setEdFormula('');
  };

  const handleSwitchTarget = (newTarget) => {
    setEditorTarget(newTarget);
    resetFormFields();
  };

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
    if (editorTarget === 'section') {
      setEdParagraph((prev) => `${prev}${prev.endsWith(' ') || prev === '' ? '' : ' '}${snippet}`);
    } else {
      setEdQuestion((prev) => `${prev}${prev.endsWith(' ') || prev === '' ? '' : ' '}${snippet}`);
      if (questionInputRef.current) {
        questionInputRef.current.focus();
      }
    }
  };

  const handleOptionChange = (index, value) => {
    setEdOptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // MEMUAT ITEM KE FORM UNTUK DIEDIT
  const handleStartEditItem = (index, item) => {
    setEditingIndex(index);
    setConfirmDeleteIdx(null);

    if (editorTarget === 'section') {
      setEdHeading(item.heading || '');
      setEdParagraph((item.paragraphs || []).join('\n\n'));
      setEdFormula((item.formulas || []).join('\n'));
    } else if (editorTarget === 'example') {
      setEdQuestion(item.problem || '');
      setEdDiscussion(item.solution || '');
    } else {
      setEdQuestion(item.question || '');
      const opts = item.options && item.options.length === 4 ? [...item.options] : ['', '', '', ''];
      setEdOptions(opts);
      const foundIdx = opts.findIndex((o) => o === item.answer);
      setEdCorrectIdx(foundIdx >= 0 ? foundIdx : 0);
      setEdDiscussion(item.discussion || '');
      if (editorTarget === 'mixed' && item.category) {
        setEdCategory(item.category);
      }
    }

    if (editorFormTopRef.current) {
      editorFormTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // HAPUS ITEM DARI PENYIMPANAN
  const handleDeleteItem = (index) => {
    if (editorTarget === 'mixed') {
      const updatedBank = questionBank
        .filter((_, idx) => idx !== index)
        .map((item, idx) => ({ ...item, id: idx + 1 }));
      setQuestionBank(updatedBank);
      localStorage.setItem('jagomatika_questionbank', JSON.stringify(updatedBank));
      if (currentQIndex >= updatedBank.length) {
        setCurrentQIndex(0);
      }
      showToast('🗑️ Soal campuran berhasil dihapus.');
    } else {
      const updatedCurriculum = curriculumData.map((lvl) => ({
        ...lvl,
        units: lvl.units.map((unt) => ({
          ...unt,
          topics: unt.topics.map((top) => {
            if (top.id !== selectedTopic.id) return top;
            const newTop = { ...top };

            if (editorTarget === 'exercise') {
              newTop.exercises = (top.exercises || [])
                .filter((_, idx) => idx !== index)
                .map((item, idx) => ({ ...item, id: idx + 1 }));
            } else if (editorTarget === 'example') {
              newTop.examples = (top.examples || [])
                .filter((_, idx) => idx !== index)
                .map((item, idx) => ({ ...item, number: idx + 1 }));
            } else if (editorTarget === 'section') {
              newTop.sections = (top.sections || []).filter((_, idx) => idx !== index);
            }
            return newTop;
          })
        }))
      }));

      setCurriculumData(updatedCurriculum);
      localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
      showToast('🗑️ Item berhasil dihapus dari topik.');
    }

    if (editingIndex === index) {
      resetFormFields();
    } else {
      setConfirmDeleteIdx(null);
    }
  };

  // SIMPAN BARU ATAU SIMPAN PERUBAHAN (UPDATE)
  const handleSaveOrUpdate = () => {
    const isUpdating = editingIndex !== null;

    if (editorTarget === 'mixed') {
      if (!edQuestion.trim()) {
        showToast('⚠️ Teks soal tidak boleh kosong.');
        return;
      }
      let updatedBank;
      if (isUpdating) {
        updatedBank = questionBank.map((item, idx) =>
          idx === editingIndex
            ? {
                ...item,
                category: edCategory,
                question: edQuestion,
                options: [...edOptions],
                answer: edOptions[edCorrectIdx],
                discussion: edDiscussion
              }
            : item
        );
        showToast('✅ Perubahan soal campuran berhasil disimpan!');
      } else {
        const newQ = {
          id: questionBank.length + 1,
          category: edCategory,
          question: edQuestion,
          options: [...edOptions],
          answer: edOptions[edCorrectIdx],
          discussion: edDiscussion
        };
        updatedBank = [...questionBank, newQ];
        showToast('✅ Soal campuran baru berhasil ditambahkan!');
      }
      setQuestionBank(updatedBank);
      localStorage.setItem('jagomatika_questionbank', JSON.stringify(updatedBank));
      resetFormFields();
      return;
    }

    // Validasi sederhana untuk target topik
    if (editorTarget === 'section' && !edHeading.trim() && !edParagraph.trim()) {
      showToast('⚠️ Judul atau paragraf materi tidak boleh kosong.');
      return;
    }
    if (editorTarget !== 'section' && !edQuestion.trim()) {
      showToast('⚠️ Teks pertanyaan tidak boleh kosong.');
      return;
    }

    const updatedCurriculum = curriculumData.map((lvl) => ({
      ...lvl,
      units: lvl.units.map((unt) => ({
        ...unt,
        topics: unt.topics.map((top) => {
          if (top.id !== selectedTopic.id) return top;
          const newTop = { ...top };

          if (editorTarget === 'exercise') {
            const list = [...(top.exercises || [])];
            if (isUpdating) {
              list[editingIndex] = {
                ...list[editingIndex],
                question: edQuestion,
                options: [...edOptions],
                answer: edOptions[edCorrectIdx],
                discussion: edDiscussion
              };
            } else {
              list.push({
                id: list.length + 1,
                question: edQuestion,
                options: [...edOptions],
                answer: edOptions[edCorrectIdx],
                discussion: edDiscussion
              });
            }
            newTop.exercises = list;
          } else if (editorTarget === 'example') {
            const list = [...(top.examples || [])];
            if (isUpdating) {
              list[editingIndex] = {
                ...list[editingIndex],
                problem: edQuestion,
                solution: edDiscussion
              };
            } else {
              list.push({
                number: list.length + 1,
                problem: edQuestion,
                solution: edDiscussion
              });
            }
            newTop.examples = list;
          } else if (editorTarget === 'section') {
            const list = [...(top.sections || [])];
            const parsedParagraphs = edParagraph
              .split(/\n{2,}/)
              .map((p) => p.trim())
              .filter(Boolean);
            const parsedFormulas = edFormula
              .split('\n')
              .map((f) => f.trim())
              .filter(Boolean);

            const secObj = {
              heading: edHeading,
              paragraphs: parsedParagraphs.length > 0 ? parsedParagraphs : [''],
              ...(parsedFormulas.length > 0 ? { formulas: parsedFormulas } : {})
            };

            if (isUpdating) {
              list[editingIndex] = secObj;
            } else {
              list.push(secObj);
            }
            newTop.sections = list;
          }

          return newTop;
        })
      }))
    }));

    setCurriculumData(updatedCurriculum);
    localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
    resetFormFields();
    showToast(
      isUpdating
        ? `✅ Perubahan berhasil diperbarui pada "${selectedTopic.title}"!`
        : `✅ Konten baru berhasil ditambahkan ke "${selectedTopic.title}"!`
    );
  };

  const handleExportData = () => {
    const dataObj = { curriculumData, questionBank };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jagomatika_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleLevel = (levelId) => {
    setOpenLevels((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleUnit = (unitId) => {
    setOpenUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleRandomQuestion = () => {
    if (questionBank.length === 0) return;
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

  // Ambil daftar item tersimpan sesuai target yang dipilih
  const savedItemsList =
    editorTarget === 'mixed'
      ? questionBank
      : editorTarget === 'exercise'
        ? selectedTopic.exercises || []
        : editorTarget === 'example'
          ? selectedTopic.examples || []
          : selectedTopic.sections || [];

  const activeQuestion = questionBank[currentQIndex] || questionBank[0];

  const latexQuickButtons = [
    { label: 'Pecahan', code: '$\\frac{a}{b}$' },
    { label: 'Akar', code: '$\\sqrt{x}$' },
    { label: 'Pangkat', code: '$x^{2}$' },
    { label: 'Kali (×)', code: '$\\times$' },
    { label: 'Kongruen (≡)', code: '$\\equiv$' },
    { label: 'Modulo', code: '$\\pmod{m}$' },
    { label: 'Implikasi (⇒)', code: '$\\implies$' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Modal Password */}
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
        {/* Sidebar Navigasi */}
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
              <span>⚡ Latihan Soal Campuran ({questionBank.length})</span>
            </button>

            {isEditorUnlocked && (
              <button
                onClick={() => {
                  setIsEditorMode(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${
                  isEditorMode ? 'bg-amber-700 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <Edit3 size={15} />
                <span>{isEditorMode ? 'Sedang di Mode Editor' : 'Buka Mode Editor Langsung'}</span>
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
                                  const isSelected = !isPracticeMode && selectedTopic.id === topic.id;
                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => {
                                        setSelectedTopicId(topic.id);
                                        setIsPracticeMode(false);
                                        setMobileMenuOpen(false);
                                        setCompleted(false);
                                        setTopicAnswers({});
                                        setTopicDiscussions({});
                                        resetFormFields();
                                      }}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-2 ${
                                        isSelected
                                          ? 'bg-emerald-700 text-white shadow-xs'
                                          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-900'
                                      }`}
                                    >
                                      <BookOpen
                                        size={12}
                                        className={isSelected ? 'text-white shrink-0' : 'text-emerald-600 shrink-0'}
                                      />
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
              // TAMPILAN MODE EDITOR (TAMBAH, EDIT, & HAPUS)
              <div ref={editorFormTopRef} className="space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
                      CMS Mode Editor (Tambah • Edit • Hapus)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Kelola Materi & Soal Olimpiade</h1>
                    {editorTarget !== 'mixed' && (
                      <div className="pt-1 max-w-md">
                        <label className="block text-xs text-slate-400 mb-1">Pilih Topik Tujuan:</label>
                        <select
                          value={selectedTopicId}
                          onChange={(e) => {
                            setSelectedTopicId(e.target.value);
                            resetFormFields();
                          }}
                          className="w-full bg-slate-800 border border-slate-700 text-amber-300 font-semibold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                        >
                          {curriculumData.map((lvl) =>
                            lvl.units.map((unt) => (
                              <optgroup key={unt.id} label={`${lvl.levelTitle} — ${unt.title}`}>
                                {unt.topics.map((top) => (
                                  <option key={top.id} value={top.id}>
                                    {top.title}
                                  </option>
                                ))}
                              </optgroup>
                            ))
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={handleExportData}
                      className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition-all"
                      title="Unduh cadangan data JSON"
                    >
                      <Download size={15} />
                      <span>Backup JSON</span>
                    </button>
                  </div>
                </div>

                {saveNotification && (
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-sm">
                    <CheckCircle size={18} className="text-emerald-700 shrink-0" />
                    <span>{saveNotification}</span>
                  </div>
                )}

                {/* Pilihan Target Penambahan */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">Kelola Bagian:</span>
                  {[
                    { id: 'exercise', label: 'Latihan Mandiri Topik' },
                    { id: 'example', label: 'Contoh Soal Topik' },
                    { id: 'section', label: 'Materi / Teori Topik' },
                    { id: 'mixed', label: 'Bank Soal Campuran' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleSwitchTarget(tab.id)}
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
                  {/* FORM INPUT / EDIT */}
                  <div
                    className={`bg-white p-6 rounded-2xl border shadow-sm space-y-5 ${
                      editingIndex !== null ? 'border-amber-400 ring-2 ring-amber-200/60' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center space-x-2">
                        {editingIndex !== null ? (
                          <Edit3 size={18} className="text-amber-600" />
                        ) : (
                          <PlusCircle size={18} className="text-emerald-700" />
                        )}
                        <h2 className="text-base font-bold text-gray-900">
                          {editingIndex !== null ? `Edit Item #${editingIndex + 1}` : 'Tambah Konten Baru'}
                        </h2>
                      </div>

                      {editingIndex !== null && (
                        <button
                          type="button"
                          onClick={resetFormFields}
                          className="flex items-center space-x-1 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <RotateCcw size={13} />
                          <span>Batal Edit</span>
                        </button>
                      )}
                    </div>

                    {editorTarget === 'section' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Judul Sub-Bab (Heading)</label>
                          <input
                            type="text"
                            value={edHeading}
                            onChange={(e) => setEdHeading(e.target.value)}
                            placeholder="Contoh: 2. Teorema Tambahan"
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-gray-600 mb-1.5">Sisip Simbol LaTeX:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {latexQuickButtons.map((btn, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => insertLatexSnippet(btn.code)}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold"
                              >
                                {btn.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Paragraf Penjelasan</label>
                          <textarea
                            rows={3}
                            value={edParagraph}
                            onChange={(e) => setEdParagraph(e.target.value)}
                            placeholder="Tulis penjelasan konsep..."
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Rumus LaTeX ($$...$$, pisahkan baris baru jika lebih dari satu)
                          </label>
                          <textarea
                            rows={2}
                            value={edFormula}
                            onChange={(e) => setEdFormula(e.target.value)}
                            placeholder="$$a^2 - b^2 = (a-b)(a+b)$$"
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {editorTarget === 'mixed' && (
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Soal Campuran</label>
                            <select
                              value={edCategory}
                              onChange={(e) => setEdCategory(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white"
                            >
                              <option value="Teori Bilangan">Teori Bilangan</option>
                              <option value="Aljabar">Aljabar</option>
                              <option value="Geometri">Geometri</option>
                              <option value="Kombinatorika">Kombinatorika</option>
                            </select>
                          </div>
                        )}

                        <div>
                          <span className="block text-xs font-bold text-gray-600 mb-1.5">Sisip Simbol LaTeX:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {latexQuickButtons.map((btn, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => insertLatexSnippet(btn.code)}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold"
                              >
                                {btn.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Teks Soal / Pertanyaan</label>
                          <textarea
                            ref={questionInputRef}
                            rows={3}
                            value={edQuestion}
                            onChange={(e) => setEdQuestion(e.target.value)}
                            placeholder="Ketik pertanyaan dengan format $...$ untuk rumus..."
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>

                        {editorTarget !== 'example' && (
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-700">
                              Pilihan Jawaban (Klik huruf untuk kunci)
                            </label>
                            {edOptions.map((opt, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setEdCorrectIdx(idx)}
                                  className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 border ${
                                    edCorrectIdx === idx
                                      ? 'bg-emerald-700 text-white border-emerald-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {String.fromCharCode(65 + idx)}
                                </button>
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                                  placeholder={`Opsi ${String.fromCharCode(65 + idx)}`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-mono"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Pembahasan / Solusi</label>
                          <textarea
                            rows={3}
                            value={edDiscussion}
                            onChange={(e) => setEdDiscussion(e.target.value)}
                            placeholder="Ketik langkah pembahasan..."
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSaveOrUpdate}
                      className={`w-full py-3 font-bold rounded-xl text-sm shadow-md flex items-center justify-center space-x-2 transition-all text-white ${
                        editingIndex !== null
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : 'bg-emerald-700 hover:bg-emerald-800'
                      }`}
                    >
                      <Save size={18} />
                      <span>
                        {editingIndex !== null
                          ? `Simpan Perubahan Item #${editingIndex + 1}`
                          : 'Simpan Langsung ke Web'}
                      </span>
                    </button>
                  </div>

                  {/* LIVE PREVIEW */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-2">
                          <Eye size={18} className="text-emerald-700" />
                          <h2 className="text-base font-bold text-gray-900">Live Preview Tampilan</h2>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                          {editorTarget.toUpperCase()}
                        </span>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                        {editorTarget === 'section' ? (
                          <div className="space-y-3">
                            <h3 className="text-base font-bold text-emerald-900">
                              <MathText text={edHeading || 'Judul Sub-Bab...'} />
                            </h3>
                            <p className="text-gray-700 text-sm whitespace-pre-line">
                              <MathText text={edParagraph || 'Pratinjau paragraf materi...'} />
                            </p>
                            {edFormula && (
                              <div className="bg-slate-50 border p-3 rounded-lg text-sm whitespace-pre-line">
                                <MathText text={edFormula} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
                              <MathText text={edQuestion || 'Pratinjau teks soal akan muncul di sini...'} />
                            </div>
                            {editorTarget !== 'example' && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {edOptions.map((opt, idx) => (
                                  <div
                                    key={idx}
                                    className={`px-3.5 py-2 rounded-lg border text-sm flex items-center justify-between ${
                                      edCorrectIdx === idx
                                        ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-900'
                                        : 'bg-white text-gray-700'
                                    }`}
                                  >
                                    <MathText text={opt || `Opsi ${String.fromCharCode(65 + idx)}`} />
                                    {edCorrectIdx === idx && <CheckCircle size={14} className="text-emerald-600" />}
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs md:text-sm text-emerald-950 whitespace-pre-line">
                              <p className="font-bold text-emerald-800 mb-1">Pembahasan:</p>
                              <MathText text={edDiscussion || 'Pratinjau pembahasan...'} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DAFTAR ITEM TERSIMPAN (EDIT & HAPUS) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        Daftar Konten Tersimpan ({savedItemsList.length} Item)
                      </h2>
                      <p className="text-xs text-gray-500">
                        {editorTarget === 'mixed'
                          ? 'Menampilkan seluruh soal di Bank Soal Campuran'
                          : `Menampilkan item pada topik: ${selectedTopic.title}`}
                      </p>
                    </div>
                  </div>

                  {savedItemsList.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500">
                      Belum ada data tersimpan pada bagian ini. Gunakan formulir di atas untuk menambahkan.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedItemsList.map((item, idx) => {
                        const isCurrentlyEditing = editingIndex === idx;
                        const isConfirmingDelete = confirmDeleteIdx === idx;
                        const previewTitle =
                          editorTarget === 'section'
                            ? item.heading
                            : editorTarget === 'example'
                              ? item.problem
                              : item.question;

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                              isCurrentlyEditing
                                ? 'border-amber-400 bg-amber-50/60'
                                : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start space-x-3 min-w-0 flex-1">
                              <span className="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <div className="min-w-0 flex-1 space-y-1">
                                {editorTarget === 'mixed' && item.category && (
                                  <span className="inline-block text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                                    {item.category}
                                  </span>
                                )}
                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                  <MathText text={previewTitle || '(Tanpa judul)'} />
                                </div>
                                {item.answer && (
                                  <p className="text-xs text-emerald-700 font-semibold">
                                    Kunci: <MathText text={item.answer} />
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                              <button
                                type="button"
                                onClick={() => handleStartEditItem(idx, item)}
                                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>

                              {isConfirmingDelete ? (
                                <div className="flex items-center space-x-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteItem(idx)}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                                  >
                                    Yakin?
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteIdx(null)}
                                    className="px-2 py-1.5 rounded-lg text-xs font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                                  >
                                    Batal
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteIdx(idx)}
                                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                                >
                                  <Trash2 size={13} />
                                  <span>Hapus</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : isPracticeMode ? (
              // LATIHAN SOAL CAMPURAN
              <div className="space-y-6">
                <div className="bg-emerald-700 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-emerald-800 text-emerald-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-600">
                      Bank Soal Campuran OSN ({questionBank.length} Soal)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Simulasi & Latihan Acak</h1>
                  </div>
                  <button
                    onClick={handleRandomQuestion}
                    className="flex items-center space-x-2 bg-white text-emerald-800 px-5 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-50 transition-all shrink-0"
                  >
                    <Shuffle size={18} />
                    <span>Soal Berikutnya</span>
                  </button>
                </div>

                {questionBank.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm">
                    Belum ada soal di Bank Soal Campuran.
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                      <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                        Kategori: {activeQuestion?.category || 'Umum'}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        Soal #{currentQIndex + 1} dari {questionBank.length}
                      </span>
                    </div>

                    <div className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                      <MathText text={activeQuestion?.question} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {activeQuestion?.options?.map((opt, idx) => {
                        const isChosen = selectedAnswer === opt;
                        const isCorrect = opt === activeQuestion.answer;
                        let btnStyle = 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';

                        if (selectedAnswer !== null) {
                          if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          else if (isChosen && !isCorrect) btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedAnswer(opt)}
                            disabled={selectedAnswer !== null}
                            className={`p-4 rounded-xl border-2 text-left transition-all text-sm font-medium flex items-center justify-between ${btnStyle}`}
                          >
                            <MathText text={opt} />
                            {selectedAnswer !== null && isCorrect && (
                              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                            )}
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
                          <MathText text={activeQuestion?.discussion} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // MODUL MATERI STANDAR
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
                      <span className="font-semibold text-emerald-700">
                        {completed ? '100% Selesai' : 'Sedang Dipelajari'}
                      </span>
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
                    {/* MATERI */}
                    <section id="materi" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
                      <div className="flex items-center space-x-2 border-b pb-3">
                        <Calculator size={20} className="text-emerald-700" />
                        <h2 className="text-lg font-bold text-gray-900">Ringkasan Konsep & Rumus Penting</h2>
                      </div>

                      {selectedTopic.sections && selectedTopic.sections.length > 0 ? (
                        <div className="space-y-6">
                          {selectedTopic.sections.map((sec, sIdx) => (
                            <div key={sIdx} className="space-y-3">
                              <h3 className="text-base font-bold text-emerald-900">
                                <MathText text={sec.heading} />
                              </h3>
                              {sec.paragraphs.map((p, pIdx) => (
                                <p key={pIdx} className="text-gray-700 leading-relaxed text-sm md:text-base">
                                  <MathText text={p} />
                                </p>
                              ))}
                              {sec.formulas && sec.formulas.length > 0 && (
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
                        <p className="text-gray-500 italic text-sm">
                          Belum ada ringkasan materi pada topik ini. Gunakan Mode Editor untuk menambahkannya.
                        </p>
                      )}

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900">
                        <strong>Catatan Pelatih:</strong>{' '}
                        <MathText text={selectedTopic.coachNote || 'Pelajari materi di atas dengan seksama.'} />
                      </div>
                    </section>

                    {/* CONTOH SOAL */}
                    {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                      <section
                        id="contoh-soal"
                        className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6"
                      >
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
                              <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
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

                    {/* LATIHAN MANDIRI */}
                    {selectedTopic.exercises && selectedTopic.exercises.length > 0 && (
                      <section
                        id="latihan-mandiri"
                        className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6"
                      >
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
                                  <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
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
                                      if (isThisCorrect)
                                        optionClass = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                                      else if (isThisChosen && !isThisCorrect)
                                        optionClass = 'border-red-400 bg-red-50 text-red-900 font-bold';
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        onClick={() => handleSelectTopicAnswer(q.id, opt)}
                                        className={`px-4 py-2.5 rounded-lg border text-left text-sm transition-all flex items-center justify-between ${optionClass}`}
                                      >
                                        <MathText text={opt} />
                                        {chosen && isThisCorrect && (
                                          <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                                        )}
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
                                    <div className="leading-relaxed whitespace-pre-line">
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
                        {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                          <li>
                            <a href="#contoh-soal" className="hover:text-emerald-700 hover:underline">
                              02. Contoh Soal
                            </a>
                          </li>
                        )}
                        {selectedTopic.exercises && selectedTopic.exercises.length > 0 && (
                          <li>
                            <a href="#latihan-mandiri" className="hover:text-emerald-700 hover:underline">
                              03. Latihan Mandiri ({selectedTopic.exercises.length} Soal)
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