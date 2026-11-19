import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
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
  Upload,
  PlusCircle,
  FolderPlus,
  GripVertical,
  ArrowUp,
  ArrowDown,
  User,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  XCircle,
  Cloud,
  CloudOff,
  LogOut,
  LogIn,
  UserPlus,
  RefreshCw
} from 'lucide-react';

const EDITOR_PASSWORD = 'punyawebolim';

// Inisialisasi Koneksi Supabase dari .env / Vercel Environment Variables
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
const isSupabaseConfigured = /^https?:\/\/.+/.test(supabaseUrl) && Boolean(supabaseAnonKey);
let supabase = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Supabase init error:', e);
  }
}

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
              }
            ],
            examples: [
              {
                number: 1,
                problem:
                  'Hitunglah nilai dari $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{99 \\times 100}$.',
                solution:
                  'Gunakan identitas pecahan teleskopik $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ pada setiap suku:\n$$1 - \\frac{1}{100} = \\frac{99}{100}$$'
              },
              {
                number: 2,
                problem: 'Sederhanakan bentuk akar berikut: $\\sqrt{7 + 2\\sqrt{12}} - \\sqrt{7 - 2\\sqrt{12}}$.',
                solution:
                  'Karena $4 + 3 = 7$ dan $4 \\times 3 = 12$, maka $(2 + \\sqrt{3}) - (2 - \\sqrt{3}) = 2\\sqrt{3}$.'
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
              'Pada soal pekerjaan bersama, jumlahkan kecepatan (laju) kerja per satuan waktu, bukan waktu pengerjaannya.',
            sections: [
              {
                heading: '1. Perbandingan Senilai & Berbalik Nilai',
                paragraphs: ['Gunakan konsep laju gabungan $\\frac{1}{t_{\\text{gab}}} = \\frac{1}{t_A} + \\frac{1}{t_B}$.'],
                formulas: ['$$\\frac{x_1}{x_2} = \\frac{y_1}{y_2} \\qquad \\text{dan} \\qquad x_1 \\times y_1 = x_2 \\times y_2$$']
              }
            ],
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
            coachNote: 'Gunakan sifat FPB dan KPK.',
            sections: [
              {
                heading: '1. Sifat Dasar FPB dan KPK',
                paragraphs: ['Hubungan mendasar antara FPB dan KPK dua bilangan.'],
                formulas: ['$$\\text{FPB}(a,b) \\times \\text{KPK}(a,b) = a \\times b$$']
              }
            ],
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
            coachNote: 'Kuasai sifat modulo.',
            sections: [
              {
                heading: '1. Pengantar Kongruensi Modulo',
                paragraphs: ['Definisi dasar aritmetika modulo.'],
                formulas: ['$$a \\equiv b \\pmod{m}$$']
              }
            ],
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
  }
];

function reorderList(list, fromIndex, toIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

const createEmptyProgress = (name = 'Siswa Tamu', username = '', schoolInfo = '') => ({
  name,
  username,
  schoolInfo,
  lastActive: new Date().toISOString(),
  visitedTopics: [],
  completedTopics: [],
  topicAttempts: {},
  mixedAttempts: {}
});

export default function App() {
  // Penyimpanan Kurikulum & Bank Soal
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

  // ==========================================
  // STATE AUTENTIKASI & PROGRES SISWA (CLOUD)
  // ==========================================
  const [authUser, setAuthUser] = useState(null);
  const [currentStudentData, setCurrentStudentData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedGuest = localStorage.getItem('jagomatika_guest_progress');
      if (savedGuest) {
        try {
          return JSON.parse(savedGuest);
        } catch (e) {}
      }
    }
    return createEmptyProgress('Siswa Tamu');
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // Modal Login / Daftar Akun Siswa
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authSchoolInfo, setAuthSchoolInfo] = useState('');
  const [authShowPass, setAuthShowPass] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Daftar Seluruh Siswa dari Supabase (Untuk Dasbor Pemilik Web)
  const [cloudStudentsList, setCloudStudentsList] = useState([]);
  const [loadingCloudStudents, setLoadingCloudStudents] = useState(false);
  const [confirmDeleteStudentId, setConfirmDeleteStudentId] = useState(null);

  const [selectedTopicId, setSelectedTopicId] = useState('t1');

  const allTopics = curriculumData.flatMap((l) => l.units).flatMap((u) => u.topics);
  const selectedTopic =
    allTopics.find((t) => t.id === selectedTopicId) ||
    allTopics[0] || {
      id: 't-fallback',
      title: 'Topik Kosong',
      coachNote: 'Silakan buat unit dan topik baru via Mode Editor.',
      sections: [],
      examples: [],
      exercises: []
    };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('topic'); // 'topic' | 'practice' | 'progress'

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

  // State Form Editor Konten Soal & Materi
  const [editorTarget, setEditorTarget] = useState('analytics');
  const [editingIndex, setEditingIndex] = useState(null);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);

  // State Drag & Drop Reorder
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [draggedLevelId, setDraggedLevelId] = useState(null);

  const [edCategory, setEdCategory] = useState('Aljabar');
  const [edQuestion, setEdQuestion] = useState('');
  const [edOptions, setEdOptions] = useState(['', '', '', '']);
  const [edCorrectIdx, setEdCorrectIdx] = useState(0);
  const [edDiscussion, setEdDiscussion] = useState('');

  // Fields untuk Section (Materi/Teori)
  const [edHeading, setEdHeading] = useState('');
  const [edParagraph, setEdParagraph] = useState('');
  const [edFormula, setEdFormula] = useState('');

  // Fields untuk Kelola Unit & Topik (Sub-Unit)
  const [targetLevelId, setTargetLevelId] = useState(() => defaultCurriculumData[0]?.levelId || 'level-1');
  const [targetUnitId, setTargetUnitId] = useState('');
  const [edUnitTitle, setEdUnitTitle] = useState('');
  const [editingUnitId, setEditingUnitId] = useState(null);

  const [edTopicTitle, setEdTopicTitle] = useState('');
  const [edCoachNote, setEdCoachNote] = useState('');
  const [editingTopicId, setEditingTopicId] = useState(null);

  const [saveNotification, setSaveNotification] = useState('');
  const questionInputRef = useRef(null);
  const editorFormTopRef = useRef(null);
  const fileInputRef = useRef(null);

  // State Latihan Soal Campuran
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  // State Latihan Mandiri & Contoh Soal di Topik
  const [topicAnswers, setTopicAnswers] = useState({});
  const [topicDiscussions, setTopicDiscussions] = useState({});
  const [exampleSolutions, setExampleSolutions] = useState({});

  const [openLevels, setOpenLevels] = useState(() => {
    const firstLevelId = defaultCurriculumData[0]?.levelId;
    return firstLevelId ? { [firstLevelId]: true } : { 'level-1': true };
  });

  const [openUnits, setOpenUnits] = useState(() => {
    const firstUnitId = defaultCurriculumData[0]?.units?.[0]?.id;
    return firstUnitId ? { [firstUnitId]: true } : { 'l1-u1': true };
  });

  const showToast = (msg) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3500);
  };

  // Reset pembahasan contoh soal saat berpindah topik
  useEffect(() => {
    setExampleSolutions({});
  }, [selectedTopicId]);

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

  // ==========================================
  // PULIHKAN SESI LOGIN SISWA SAAT WEB DIBUKA
  // ==========================================
  const loadStudentProgressFromCloud = async (user) => {
    if (!supabase || !user) return;
    setIsSyncing(true);
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setCurrentStudentData({
          name: data.full_name,
          username: data.username,
          schoolInfo: data.school_info || '',
          lastActive: data.updated_at,
          visitedTopics: data.visited_topics || [],
          completedTopics: data.completed_topics || [],
          topicAttempts: data.topic_attempts || {},
          mixedAttempts: data.mixed_attempts || {}
        });
      } else {
        const fallbackUsername = user.user_metadata?.username || (user.email || '').split('@')[0];
        const fallbackName = user.user_metadata?.full_name || fallbackUsername || 'Siswa';
        const fallbackSchool = user.user_metadata?.school_info || '';
        const recovered = createEmptyProgress(fallbackName, fallbackUsername, fallbackSchool);
        await supabase.from('student_progress').upsert(
          {
            user_id: user.id,
            username: fallbackUsername,
            full_name: fallbackName,
            school_info: fallbackSchool,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );
        setCurrentStudentData(recovered);
      }
    } catch (err) {
      console.error('Gagal memuat progres cloud:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // ==========================================
  // SINKRONISASI KURIKULUM & BANK SOAL KE CLOUD
  // ==========================================
  const hasLoadedCloudContentRef = useRef(false);

  const syncContentToCloud = async (nextCurriculum, nextQuestionBank, successMsg = '') => {
    try {
      localStorage.setItem('jagomatika_curriculum', JSON.stringify(nextCurriculum));
      localStorage.setItem('jagomatika_questionbank', JSON.stringify(nextQuestionBank));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e);
    }

    if (!supabase) {
      if (successMsg) showToast(`${successMsg} (Lokal saja — Supabase belum aktif)`);
      return;
    }

    setIsSyncing(true);
    try {
      const { error } = await supabase.rpc('save_app_content', {
        new_curriculum: nextCurriculum,
        new_question_bank: nextQuestionBank,
        admin_key: EDITOR_PASSWORD
      });
      if (error) throw error;
      if (successMsg) showToast(`${successMsg} ☁️ Tersimpan di cloud untuk semua siswa.`);
    } catch (err) {
      console.error('Gagal menyinkronkan materi ke cloud:', err);
      showToast('⚠️ Tersimpan lokal, namun gagal sinkron ke cloud Supabase.');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (!supabase || hasLoadedCloudContentRef.current) return;
    hasLoadedCloudContentRef.current = true;

    const loadGlobalContentFromCloud = async () => {
      try {
        const { data, error } = await supabase
          .from('app_content')
          .select('curriculum_data, question_bank')
          .eq('id', 'main')
          .maybeSingle();

        if (error) throw error;

        if (data) {
          if (Array.isArray(data.curriculum_data) && data.curriculum_data.length > 0) {
            setCurriculumData(data.curriculum_data);
            localStorage.setItem('jagomatika_curriculum', JSON.stringify(data.curriculum_data));
          }
          if (Array.isArray(data.question_bank)) {
            setQuestionBank(data.question_bank);
            localStorage.setItem('jagomatika_questionbank', JSON.stringify(data.question_bank));
          }
        } else {
          await syncContentToCloud(curriculumData, questionBank);
        }
      } catch (err) {
        console.error('Gagal memuat materi dari cloud:', err);
      }
    };

    loadGlobalContentFromCloud();
  }, []);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthUser(session.user);
        loadStudentProgressFromCloud(session.user);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setAuthUser(session.user);
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          loadStudentProgressFromCloud(session.user);
        }
      } else {
        setAuthUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Ambil Semua Data Siswa untuk Dasbor Pemilik Web
  const fetchAllStudentsForAdmin = async () => {
    if (!supabase) return;
    setLoadingCloudStudents(true);
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setCloudStudentsList(data || []);
    } catch (err) {
      console.error('Gagal mengambil daftar siswa:', err);
      showToast('⚠️ Gagal memuat data siswa dari Supabase.');
    } finally {
      setLoadingCloudStudents(false);
    }
  };

  useEffect(() => {
    if (isEditorMode && editorTarget === 'analytics' && isSupabaseConfigured) {
      fetchAllStudentsForAdmin();
    }
  }, [isEditorMode, editorTarget]);

  // ==========================================
  // SINKRONISASI PROGRES SISWA KE CLOUD / LOKAL
  // ==========================================
  const syncStudentProgressToStorage = async (updatedProgress, userOverride = authUser) => {
    if (supabase && userOverride) {
      setIsSyncing(true);
      try {
        await supabase.from('student_progress').upsert(
          {
            user_id: userOverride.id,
            username: updatedProgress.username,
            full_name: updatedProgress.name,
            school_info: updatedProgress.schoolInfo || '',
            visited_topics: updatedProgress.visitedTopics || [],
            completed_topics: updatedProgress.completedTopics || [],
            topic_attempts: updatedProgress.topicAttempts || {},
            mixed_attempts: updatedProgress.mixedAttempts || {},
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );
      } catch (err) {
        console.error('Gagal menyimpan ke Supabase:', err);
      } finally {
        setIsSyncing(false);
      }
    } else {
      localStorage.setItem('jagomatika_guest_progress', JSON.stringify(updatedProgress));
    }
  };

  // Catat kunjungan topik otomatis
  useEffect(() => {
    if (!isEditorMode && activeView === 'topic' && selectedTopic?.id) {
      setCurrentStudentData((prev) => {
        const visited = new Set(prev.visitedTopics || []);
        if (visited.has(selectedTopic.id)) return prev;
        visited.add(selectedTopic.id);
        const nextData = {
          ...prev,
          visitedTopics: Array.from(visited),
          lastActive: new Date().toISOString()
        };
        syncStudentProgressToStorage(nextData);
        return nextData;
      });
    }
  }, [selectedTopic?.id, activeView, isEditorMode, authUser]);

  // ==========================================
  // HANDLER LOGIN, REGISTER, & LOGOUT SISWA
  // ==========================================
  const formatUsernameToEmail = (rawUsername) => {
    const trimmed = rawUsername.trim().toLowerCase();
    if (trimmed.includes('@')) {
      return {
        email: trimmed,
        cleanUsername: trimmed.split('@')[0].replace(/[^a-z0-9._-]/g, '')
      };
    }
    const cleanUsername = trimmed.replace(/[^a-z0-9._-]/g, '');
    return {
      email: `${cleanUsername}@jagomatika.siswa`,
      cleanUsername
    };
  };

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!supabase) {
      setAuthError('Koneksi Supabase belum dikonfigurasi oleh admin web.');
      return;
    }

    const { email, cleanUsername } = formatUsernameToEmail(authUsername);

    if (!authFullName.trim()) {
      setAuthError('Nama lengkap wajib diisi.');
      return;
    }
    if (cleanUsername.length < 3) {
      setAuthError('Username minimal 3 karakter (huruf, angka, titik, atau garis bawah tanpa spasi).');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Password minimal 6 karakter.');
      return;
    }

    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: authPassword,
        options: {
          data: {
            username: cleanUsername,
            full_name: authFullName.trim(),
            school_info: authSchoolInfo.trim()
          }
        }
      });

      if (error) {
        if (error.message.toLowerCase().includes('already registered')) {
          setAuthError('Username ini sudah terdaftar. Silakan pilih username lain atau klik tab "Masuk".');
        } else {
          setAuthError(error.message);
        }
        return;
      }

      if (data?.user) {
        const initialProgress = {
          ...currentStudentData,
          name: authFullName.trim(),
          username: cleanUsername,
          schoolInfo: authSchoolInfo.trim(),
          lastActive: new Date().toISOString()
        };

        const { error: upsertErr } = await supabase.from('student_progress').upsert(
          {
            user_id: data.user.id,
            username: cleanUsername,
            full_name: authFullName.trim(),
            school_info: authSchoolInfo.trim(),
            visited_topics: initialProgress.visitedTopics || [],
            completed_topics: initialProgress.completedTopics || [],
            topic_attempts: initialProgress.topicAttempts || {},
            mixed_attempts: initialProgress.mixedAttempts || {},
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );

        if (upsertErr) {
          if (upsertErr.message.includes('duplicate key')) {
            setAuthError('Username sudah digunakan siswa lain. Silakan pilih username lain.');
            return;
          }
          setAuthError(`Gagal menyimpan profil ke database: ${upsertErr.message}`);
          return;
        }

        localStorage.removeItem('jagomatika_guest_progress');
        setAuthUser(data.user);
        setCurrentStudentData(initialProgress);
        setShowAuthModal(false);
        setAuthPassword('');
        showToast(`🎉 Akun "${cleanUsername}" berhasil dibuat! Progres otomatis tersimpan ke cloud.`);
      }
    } catch (err) {
      setAuthError('Terjadi kesalahan saat mendaftar. Pastikan "Confirm email" di Supabase sudah dimatikan.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginStudent = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!supabase) {
      setAuthError('Koneksi Supabase belum dikonfigurasi oleh admin web.');
      return;
    }

    const { email, cleanUsername } = formatUsernameToEmail(authUsername);

    if (!cleanUsername || !authPassword) {
      setAuthError('Masukkan username dan password Anda.');
      return;
    }

    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: authPassword
      });

      if (error) {
        setAuthError('Username atau password salah. Silakan periksa kembali.');
        return;
      }

      if (data?.user) {
        setAuthUser(data.user);
        await loadStudentProgressFromCloud(data.user);
        setTopicAnswers({});
        setTopicDiscussions({});
        setSelectedAnswer(null);
        setShowDiscussion(false);
        setShowAuthModal(false);
        setAuthPassword('');
        showToast(`👋 Selamat datang kembali! Progres belajar Anda berhasil dimuat.`);
      }
    } catch (err) {
      setAuthError('Gagal masuk ke akun. Periksa koneksi internet Anda.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogoutStudent = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAuthUser(null);
    setCurrentStudentData(createEmptyProgress('Siswa Tamu'));
    setTopicAnswers({});
    setTopicDiscussions({});
    setExampleSolutions({});
    setSelectedAnswer(null);
    setShowDiscussion(false);
    showToast('Anda telah keluar dari akun siswa.');
  };

  const handleDeleteCloudStudent = async (targetUserId) => {
    if (!supabase) return;
    try {
      const { error } = await supabase.rpc('delete_student_record', {
        target_user_id: targetUserId,
        admin_key: EDITOR_PASSWORD
      });
      if (error) throw error;
      setCloudStudentsList((prev) => prev.filter((s) => s.user_id !== targetUserId));
      setConfirmDeleteStudentId(null);
      showToast('🗑️ Data siswa berhasil dihapus dari database.');
    } catch (err) {
      showToast('⚠️ Gagal menghapus data siswa.');
    }
  };

  // ==========================================
  // HANDLER INTERAKSI BELAJAR SISWA
  // ==========================================
  const isTopicCompleted = (currentStudentData.completedTopics || []).includes(selectedTopic.id);

  const handleToggleTopicCompleted = () => {
    setCurrentStudentData((prev) => {
      const set = new Set(prev.completedTopics || []);
      if (set.has(selectedTopic.id)) {
        set.delete(selectedTopic.id);
      } else {
        set.add(selectedTopic.id);
      }
      const nextData = {
        ...prev,
        completedTopics: Array.from(set),
        lastActive: new Date().toISOString()
      };
      syncStudentProgressToStorage(nextData);
      return nextData;
    });
  };

  const markDiscussionViewed = (scope, containerId, qId) => {
    if (qId === undefined || qId === null) return;

    setCurrentStudentData((prev) => {
      if (scope === 'topic') {
        const topicMap = { ...(prev.topicAttempts?.[containerId] || {}) };
        const prevAttempt = topicMap[qId];
        if (prevAttempt?.viewedDiscussion) return prev;

        topicMap[qId] = {
          ...(prevAttempt || {}),
          viewedDiscussion: true,
          isFirstCorrect: prevAttempt?.isFirstCorrect === true ? true : false
        };

        const nextData = {
          ...prev,
          lastActive: new Date().toISOString(),
          topicAttempts: {
            ...(prev.topicAttempts || {}),
            [containerId]: topicMap
          }
        };
        syncStudentProgressToStorage(nextData);
        return nextData;
      }

      if (scope === 'mixed') {
        const mixedMap = { ...(prev.mixedAttempts || {}) };
        const prevAttempt = mixedMap[qId];
        if (prevAttempt?.viewedDiscussion) return prev;

        mixedMap[qId] = {
          ...(prevAttempt || {}),
          viewedDiscussion: true,
          isFirstCorrect: prevAttempt?.isFirstCorrect === true ? true : false
        };

        const nextData = {
          ...prev,
          lastActive: new Date().toISOString(),
          mixedAttempts: mixedMap
        };
        syncStudentProgressToStorage(nextData);
        return nextData;
      }

      return prev;
    });
  };

  const handleSelectTopicAnswer = (qObj, option) => {
    setTopicAnswers((prev) => ({ ...prev, [qObj.id]: option }));
    const isCorrect = option === qObj.answer;
    const isDiscCurrentlyOpen = Boolean(topicDiscussions[qObj.id]);

    setCurrentStudentData((prev) => {
      const topicMap = { ...(prev.topicAttempts?.[selectedTopic.id] || {}) };
      const prevAttempt = topicMap[qObj.id];
      const hasViewedDiscussion = Boolean(prevAttempt?.viewedDiscussion || isDiscCurrentlyOpen);

      const nextIsFirstCorrect =
        prevAttempt && typeof prevAttempt.isFirstCorrect === 'boolean'
          ? prevAttempt.isFirstCorrect && !hasViewedDiscussion
          : !hasViewedDiscussion && isCorrect;

      topicMap[qObj.id] = {
        firstAnswer: prevAttempt?.firstAnswer ?? option,
        isFirstCorrect: nextIsFirstCorrect,
        viewedDiscussion: hasViewedDiscussion,
        latestAnswer: option,
        isLatestCorrect: isCorrect
      };

      const nextData = {
        ...prev,
        lastActive: new Date().toISOString(),
        topicAttempts: {
          ...(prev.topicAttempts || {}),
          [selectedTopic.id]: topicMap
        }
      };
      syncStudentProgressToStorage(nextData);
      return nextData;
    });
  };

  const handleSelectMixedAnswer = (qObj, option) => {
    setSelectedAnswer(option);
    if (!qObj) return;
    const isCorrect = option === qObj.answer;
    const isDiscCurrentlyOpen = Boolean(showDiscussion);

    setCurrentStudentData((prev) => {
      const mixedMap = { ...(prev.mixedAttempts || {}) };
      const prevAttempt = mixedMap[qObj.id];
      const hasViewedDiscussion = Boolean(prevAttempt?.viewedDiscussion || isDiscCurrentlyOpen);

      const nextIsFirstCorrect =
        prevAttempt && typeof prevAttempt.isFirstCorrect === 'boolean'
          ? prevAttempt.isFirstCorrect && !hasViewedDiscussion
          : !hasViewedDiscussion && isCorrect;

      mixedMap[qObj.id] = {
        firstAnswer: prevAttempt?.firstAnswer ?? option,
        isFirstCorrect: nextIsFirstCorrect,
        viewedDiscussion: hasViewedDiscussion,
        latestAnswer: option,
        isLatestCorrect: isCorrect
      };

      const nextData = {
        ...prev,
        lastActive: new Date().toISOString(),
        mixedAttempts: mixedMap
      };
      syncStudentProgressToStorage(nextData);
      return nextData;
    });
  };

  // ==========================================
  // KALKULASI ANALITIK SISWA (INDIVIDUAL)
  // ==========================================
  const computeStudentAnalytics = (studentRec) => {
    const topicStats = [];
    const firstCorrectQuestions = [];
    const firstWrongQuestions = [];

    curriculumData.forEach((lvl) => {
      lvl.units.forEach((unt) => {
        unt.topics.forEach((top) => {
          const exercises = top.exercises || [];
          const attemptsMap = studentRec.topicAttempts?.[top.id] || {};
          const attemptedIds = Object.keys(attemptsMap);
          const isCompleted = (studentRec.completedTopics || []).includes(top.id);
          const isVisited = (studentRec.visitedTopics || []).includes(top.id) || attemptedIds.length > 0 || isCompleted;

          let firstCorrectCount = 0;
          exercises.forEach((q) => {
            const att = attemptsMap[q.id];
            if (att) {
              if (att.isFirstCorrect) {
                firstCorrectCount += 1;
                firstCorrectQuestions.push({
                  topicTitle: top.title,
                  question: q.question,
                  studentAnswer: att.firstAnswer,
                  correctAnswer: q.answer
                });
              } else {
                firstWrongQuestions.push({
                  topicTitle: top.title,
                  question: q.question,
                  studentAnswer: att.firstAnswer || '(Membuka kunci jawaban terlebih dahulu)',
                  correctAnswer: q.answer
                });
              }
            }
          });

          const scorePercent =
            exercises.length > 0 && attemptedIds.length > 0
              ? Math.round((firstCorrectCount / exercises.length) * 100)
              : null;

          topicStats.push({
            levelTitle: lvl.levelTitle,
            unitId: unt.id,
            unitTitle: unt.title,
            topicId: top.id,
            topicTitle: top.title,
            totalExercises: exercises.length,
            attemptedCount: attemptedIds.length,
            firstCorrectCount,
            scorePercent,
            isCompleted,
            isVisited
          });
        });
      });
    });

    Object.entries(studentRec.mixedAttempts || {}).forEach(([qId, att]) => {
      const qObj = questionBank.find((item) => String(item.id) === String(qId));
      if (qObj) {
        const entry = {
          topicTitle: `Bank Soal Campuran (${qObj.category})`,
          question: qObj.question,
          studentAnswer: att.firstAnswer || '(Membuka kunci jawaban terlebih dahulu)',
          correctAnswer: qObj.answer
        };
        if (att.isFirstCorrect) firstCorrectQuestions.push(entry);
        else firstWrongQuestions.push(entry);
      }
    });

    const totalTopics = topicStats.length;
    const completedCount = topicStats.filter((t) => t.isCompleted).length;
    const visitedCount = topicStats.filter((t) => t.isVisited).length;
    const totalAttempted = firstCorrectQuestions.length + firstWrongQuestions.length;
    const overallAccuracy =
      totalAttempted > 0 ? Math.round((firstCorrectQuestions.length / totalAttempted) * 100) : 0;

    const strongTopics = topicStats.filter((t) => t.scorePercent !== null && t.scorePercent >= 75);
    const weakTopics = topicStats.filter((t) => t.scorePercent !== null && t.scorePercent < 75);

    return {
      topicStats,
      firstCorrectQuestions,
      firstWrongQuestions,
      totalTopics,
      completedCount,
      visitedCount,
      totalAttempted,
      overallAccuracy,
      strongTopics,
      weakTopics
    };
  };

  // ==========================================
  // KALKULASI ANALITIK PEMILIK WEB (DARI SUPABASE)
  // ==========================================
  const computeOwnerAnalytics = () => {
    const normalizedStudents = cloudStudentsList.map((row) => ({
      userId: row.user_id,
      username: row.username,
      name: row.full_name,
      schoolInfo: row.school_info || '',
      lastActive: row.updated_at,
      visitedTopics: row.visited_topics || [],
      completedTopics: row.completed_topics || [],
      topicAttempts: row.topic_attempts || {},
      mixedAttempts: row.mixed_attempts || {}
    }));

    const totalStudents = normalizedStudents.length;

    const perStudentSummary = normalizedStudents.map((st) => {
      const stats = computeStudentAnalytics(st);
      return {
        ...st,
        ...stats
      };
    });

    const topicAggregates = [];
    curriculumData.forEach((lvl) => {
      lvl.units.forEach((unt) => {
        unt.topics.forEach((top) => {
          const exercises = top.exercises || [];
          let learnersCount = 0;
          let completedByCount = 0;
          let scoreSum = 0;
          let scoredLearnersCount = 0;

          normalizedStudents.forEach((st) => {
            const attemptsMap = st.topicAttempts?.[top.id] || {};
            const attemptedIds = Object.keys(attemptsMap);
            const isComp = (st.completedTopics || []).includes(top.id);
            const isVis = (st.visitedTopics || []).includes(top.id) || attemptedIds.length > 0 || isComp;

            if (isVis) learnersCount += 1;
            if (isComp) completedByCount += 1;

            if (exercises.length > 0 && attemptedIds.length > 0) {
              let correctFirst = 0;
              exercises.forEach((q) => {
                if (attemptsMap[q.id]?.isFirstCorrect) correctFirst += 1;
              });
              scoreSum += Math.round((correctFirst / exercises.length) * 100);
              scoredLearnersCount += 1;
            }
          });

          const avgScore = scoredLearnersCount > 0 ? Math.round(scoreSum / scoredLearnersCount) : null;

          topicAggregates.push({
            levelTitle: lvl.levelTitle,
            unitTitle: unt.title,
            topicId: top.id,
            topicTitle: top.title,
            learnersCount,
            completedByCount,
            scoredLearnersCount,
            avgScore
          });
        });
      });
    });

    const untouchedTopics = topicAggregates.filter((t) => t.learnersCount === 0);
    const masteredTopics = topicAggregates
      .filter((t) => t.avgScore !== null && t.avgScore >= 75)
      .sort((a, b) => b.avgScore - a.avgScore);
    const strugglingTopics = topicAggregates
      .filter((t) => t.avgScore !== null && t.avgScore < 75)
      .sort((a, b) => a.avgScore - b.avgScore);

    const activeLearnersWithScores = perStudentSummary.filter((s) => s.totalAttempted > 0);
    const avgGlobalAccuracy =
      activeLearnersWithScores.length > 0
        ? Math.round(
            activeLearnersWithScores.reduce((acc, cur) => acc + cur.overallAccuracy, 0) /
              activeLearnersWithScores.length
          )
        : 0;

    return {
      totalStudents,
      perStudentSummary,
      topicAggregates,
      untouchedTopics,
      masteredTopics,
      strugglingTopics,
      avgGlobalAccuracy
    };
  };

  // ==========================================
  // EDITOR KURIKULUM & SOAL
  // ==========================================
  const resetDragState = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
    setDraggedLevelId(null);
  };

  const resetFormFields = () => {
    setEditingIndex(null);
    setConfirmDeleteIdx(null);
    setEditingUnitId(null);
    setEditingTopicId(null);
    resetDragState();
    setEdQuestion('');
    setEdOptions(['', '', '', '']);
    setEdCorrectIdx(0);
    setEdDiscussion('');
    setEdHeading('');
    setEdParagraph('');
    setEdFormula('');
    setEdUnitTitle('');
    setEdTopicTitle('');
    setEdCoachNote('');
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

  const applyReorder = (fromIdx, toIdx, levelIdOverride = null) => {
    if (fromIdx === null || toIdx === null || fromIdx === toIdx) return;

    if (editorTarget === 'unit' && levelIdOverride) {
      const updatedCurriculum = curriculumData.map((lvl) => {
        if (lvl.levelId !== levelIdOverride) return lvl;
        if (toIdx < 0 || toIdx >= lvl.units.length) return lvl;
        return {
          ...lvl,
          units: reorderList(lvl.units, fromIdx, toIdx)
        };
      });
      setCurriculumData(updatedCurriculum);
      syncContentToCloud(updatedCurriculum, questionBank, '↕️ Urutan Unit berhasil diperbarui!');
      resetFormFields();
      return;
    }

    if (editorTarget === 'topic') {
      const lvlObj = curriculumData.find((l) => l.levelId === targetLevelId);
      const activeUnitId = targetUnitId || lvlObj?.units[0]?.id;
      if (!activeUnitId) return;

      const updatedCurriculum = curriculumData.map((lvl) => {
        if (lvl.levelId !== targetLevelId) return lvl;
        return {
          ...lvl,
          units: lvl.units.map((u) => {
            if (u.id !== activeUnitId) return u;
            if (toIdx < 0 || toIdx >= u.topics.length) return u;
            return {
              ...u,
              topics: reorderList(u.topics, fromIdx, toIdx)
            };
          })
        };
      });
      setCurriculumData(updatedCurriculum);
      syncContentToCloud(updatedCurriculum, questionBank, '↕️ Urutan Sub-Unit / Topik berhasil diperbarui!');
      resetFormFields();
      return;
    }

    if (editorTarget === 'mixed') {
      if (toIdx < 0 || toIdx >= questionBank.length) return;
      const reordered = reorderList(questionBank, fromIdx, toIdx).map((item, idx) => ({
        ...item,
        id: idx + 1
      }));
      setQuestionBank(reordered);
      syncContentToCloud(curriculumData, reordered, '↕️ Urutan Bank Soal Campuran berhasil diperbarui!');
      resetFormFields();
      return;
    }

    const updatedCurriculum = curriculumData.map((lvl) => ({
      ...lvl,
      units: lvl.units.map((unt) => ({
        ...unt,
        topics: unt.topics.map((top) => {
          if (top.id !== selectedTopic.id) return top;
          const newTop = { ...top };

          if (editorTarget === 'exercise' && top.exercises) {
            if (toIdx < 0 || toIdx >= top.exercises.length) return top;
            newTop.exercises = reorderList(top.exercises, fromIdx, toIdx).map((item, idx) => ({
              ...item,
              id: idx + 1
            }));
          } else if (editorTarget === 'example' && top.examples) {
            if (toIdx < 0 || toIdx >= top.examples.length) return top;
            newTop.examples = reorderList(top.examples, fromIdx, toIdx).map((item, idx) => ({
              ...item,
              number: idx + 1
            }));
          } else if (editorTarget === 'section' && top.sections) {
            if (toIdx < 0 || toIdx >= top.sections.length) return top;
            newTop.sections = reorderList(top.sections, fromIdx, toIdx);
          }

          return newTop;
        })
      }))
    }));

    setCurriculumData(updatedCurriculum);
    syncContentToCloud(updatedCurriculum, questionBank, '↕️ Urutan item berhasil diperbarui!');
    resetFormFields();
  };

  const handleDragStart = (e, idx, levelId = null) => {
    setDraggedIdx(idx);
    setDraggedLevelId(levelId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const handleDragOver = (e, idx, levelId = null) => {
    e.preventDefault();
    if (editorTarget === 'unit' && levelId !== draggedLevelId) return;
    if (dragOverIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDrop = (e, toIdx, levelId = null) => {
    e.preventDefault();
    if (editorTarget === 'unit' && levelId !== draggedLevelId) {
      resetDragState();
      return;
    }
    const fromIdx = draggedIdx !== null ? draggedIdx : Number(e.dataTransfer.getData('text/plain'));
    applyReorder(fromIdx, toIdx, levelId);
    resetDragState();
  };

  const handleSaveUnit = () => {
    if (!edUnitTitle.trim()) {
      showToast('⚠️ Judul unit tidak boleh kosong.');
      return;
    }

    const updatedCurriculum = curriculumData.map((lvl) => {
      if (lvl.levelId !== targetLevelId) return lvl;
      const unitsList = [...lvl.units];
      if (editingUnitId) {
        const idx = unitsList.findIndex((u) => u.id === editingUnitId);
        if (idx >= 0) {
          unitsList[idx] = { ...unitsList[idx], title: edUnitTitle };
        }
      } else {
        const newUnitId = `${lvl.levelId}-u${unitsList.length + 1}-${Date.now().toString().slice(-4)}`;
        unitsList.push({
          id: newUnitId,
          title: edUnitTitle,
          topics: []
        });
      }
      return { ...lvl, units: unitsList };
    });

    setCurriculumData(updatedCurriculum);
    syncContentToCloud(
      updatedCurriculum,
      questionBank,
      editingUnitId ? '✅ Unit berhasil diperbarui!' : '✅ Unit baru berhasil ditambahkan!'
    );
    resetFormFields();
  };

  const handleDeleteUnit = (levelId, unitId) => {
    const updatedCurriculum = curriculumData.map((lvl) => {
      if (lvl.levelId !== levelId) return lvl;
      return {
        ...lvl,
        units: lvl.units.filter((u) => u.id !== unitId)
      };
    });
    setCurriculumData(updatedCurriculum);
    syncContentToCloud(updatedCurriculum, questionBank, '🗑️ Unit berhasil dihapus.');
  };

  const handleSaveTopic = () => {
    if (!edTopicTitle.trim()) {
      showToast('⚠️ Judul topik tidak boleh kosong.');
      return;
    }
    const lvlObj = curriculumData.find((l) => l.levelId === targetLevelId);
    const activeUnitId = targetUnitId || lvlObj?.units[0]?.id;
    if (!activeUnitId) {
      showToast('⚠️ Pilih unit tujuan terlebih dahulu.');
      return;
    }

    const updatedCurriculum = curriculumData.map((lvl) => {
      if (lvl.levelId !== targetLevelId) return lvl;
      const unitsList = lvl.units.map((u) => {
        if (u.id !== activeUnitId) return u;
        const topicsList = [...u.topics];
        if (editingTopicId) {
          const idx = topicsList.findIndex((t) => t.id === editingTopicId);
          if (idx >= 0) {
            topicsList[idx] = {
              ...topicsList[idx],
              title: edTopicTitle,
              coachNote: edCoachNote
            };
          }
        } else {
          const newTopicId = `t-${Date.now().toString().slice(-5)}`;
          topicsList.push({
            id: newTopicId,
            title: edTopicTitle,
            coachNote: edCoachNote || 'Catatan pelatih...',
            sections: [],
            examples: [],
            exercises: []
          });
          setSelectedTopicId(newTopicId);
        }
        return { ...u, topics: topicsList };
      });
      return { ...lvl, units: unitsList };
    });

    setCurriculumData(updatedCurriculum);
    syncContentToCloud(
      updatedCurriculum,
      questionBank,
      editingTopicId ? '✅ Topik berhasil diperbarui!' : '✅ Topik baru berhasil ditambahkan!'
    );
    resetFormFields();
  };

  const handleDeleteTopic = (levelId, unitId, topicId) => {
    const updatedCurriculum = curriculumData.map((lvl) => {
      if (lvl.levelId !== levelId) return lvl;
      return {
        ...lvl,
        units: lvl.units.map((u) => {
          if (u.id !== unitId) return u;
          return {
            ...u,
            topics: u.topics.filter((t) => t.id !== topicId)
          };
        })
      };
    });
    setCurriculumData(updatedCurriculum);
    syncContentToCloud(updatedCurriculum, questionBank, '🗑️ Topik berhasil dihapus.');
  };

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

  const handleDeleteItem = (index) => {
    if (editorTarget === 'mixed') {
      const updatedBank = questionBank
        .filter((_, idx) => idx !== index)
        .map((item, idx) => ({ ...item, id: idx + 1 }));
      setQuestionBank(updatedBank);
      syncContentToCloud(curriculumData, updatedBank, '🗑️ Soal campuran berhasil dihapus.');
      if (currentQIndex >= updatedBank.length) {
        setCurrentQIndex(0);
      }
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
      syncContentToCloud(updatedCurriculum, questionBank, '🗑️ Item berhasil dihapus dari topik.');
    }

    if (editingIndex === index) {
      resetFormFields();
    } else {
      setConfirmDeleteIdx(null);
    }
  };

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
      }
      setQuestionBank(updatedBank);
      syncContentToCloud(
        curriculumData,
        updatedBank,
        isUpdating ? '✅ Perubahan soal campuran berhasil disimpan!' : '✅ Soal campuran baru berhasil ditambahkan!'
      );
      resetFormFields();
      return;
    }

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
    syncContentToCloud(
      updatedCurriculum,
      questionBank,
      isUpdating
        ? `✅ Perubahan berhasil diperbarui pada "${selectedTopic.title}"!`
        : `✅ Konten baru berhasil ditambahkan ke "${selectedTopic.title}"!`
    );
    resetFormFields();
  };

  const handleExportData = () => {
    const dataObj = { curriculumData, questionBank };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jagomatika_materi_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          const nextCurr = parsedData.curriculumData || curriculumData;
          const nextBank = parsedData.questionBank || questionBank;
          if (parsedData.curriculumData) {
            setCurriculumData(parsedData.curriculumData);
          }
          if (parsedData.questionBank) {
            setQuestionBank(parsedData.questionBank);
          }
          syncContentToCloud(nextCurr, nextBank, '✅ Materi berhasil dipulihkan dari file JSON!');
        } catch (error) {
          alert('Format file JSON tidak valid!');
        }
        e.target.value = null;
      };
    }
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

  const toggleTopicDiscussion = (qId) => {
    const nextOpen = !topicDiscussions[qId];
    setTopicDiscussions((prev) => ({ ...prev, [qId]: nextOpen }));
    if (nextOpen) {
      markDiscussionViewed('topic', selectedTopic.id, qId);
    }
  };

  const handleToggleMixedDiscussion = () => {
    const nextOpen = !showDiscussion;
    setShowDiscussion(nextOpen);
    if (nextOpen && activeQuestion?.id) {
      markDiscussionViewed('mixed', 'mixed', activeQuestion.id);
    }
  };

  const toggleExampleSolution = (exKey) => {
    setExampleSolutions((prev) => ({ ...prev, [exKey]: !prev[exKey] }));
  };

  const savedItemsList =
    editorTarget === 'mixed'
      ? questionBank
      : editorTarget === 'exercise'
        ? selectedTopic.exercises || []
        : editorTarget === 'example'
          ? selectedTopic.examples || []
          : editorTarget === 'section'
            ? selectedTopic.sections || []
            : [];

  const activeQuestion = questionBank[currentQIndex] || questionBank[0];
  const studentAnalytics = computeStudentAnalytics(currentStudentData);
  const ownerAnalytics = isEditorMode ? computeOwnerAnalytics() : null;

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
      {/* ==========================================
          MODAL LOGIN / DAFTAR AKUN SISWA
          ========================================== */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Akun Belajar Siswa</h3>
                  <p className="text-xs text-gray-500">Simpan & lanjutkan progres dari perangkat mana saja</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError('');
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Pilih Masuk vs Buat Akun */}
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('login');
                  setAuthError('');
                }}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  authTab === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LogIn size={14} />
                <span>Masuk Akun</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('register');
                  setAuthError('');
                }}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  authTab === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserPlus size={14} />
                <span>Buat Akun Baru</span>
              </button>
            </div>

            {authTab === 'login' ? (
              <form onSubmit={handleLoginStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    placeholder="Contoh: aqil_najih"
                    autoFocus
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={authShowPass ? 'text' : 'password'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Masukkan password..."
                      className="w-full pl-3.5 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setAuthShowPass((p) => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {authShowPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 shadow-xs"
                >
                  {authLoading ? 'Memproses...' : 'Masuk & Muat Progres'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterStudent} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap Siswa *</label>
                  <input
                    type="text"
                    value={authFullName}
                    onChange={(e) => setAuthFullName(e.target.value)}
                    placeholder="Contoh: M. Aqil Najih"
                    autoFocus
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kelas / Asal Sekolah (Opsional)</label>
                  <input
                    type="text"
                    value={authSchoolInfo}
                    onChange={(e) => setAuthSchoolInfo(e.target.value)}
                    placeholder="Contoh: SMP Athirah - Kelas 8"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Buat Username * <span className="font-normal text-gray-500">(tanpa spasi)</span>
                  </label>
                  <input
                    type="text"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    placeholder="Contoh: aqil_najih"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Buat Password * <span className="font-normal text-gray-500">(minimal 6 karakter)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={authShowPass ? 'text' : 'password'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Minimal 6 karakter..."
                      className="w-full pl-3.5 pr-10 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setAuthShowPass((p) => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {authShowPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 shadow-xs"
                >
                  {authLoading ? 'Mendaftarkan...' : 'Daftar & Simpan Progres'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal Password Editor */}
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-6 py-3 flex items-center justify-between gap-2">
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
            <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
              JAGOMATIKA{' '}
              <span className="hidden sm:inline text-emerald-600 text-xs uppercase px-2 py-0.5 bg-emerald-50 rounded-full ml-1 border border-emerald-200">
                Olimpiade
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-3">
          {!isEditorMode && (
            <>
              {authUser ? (
                <div className="flex items-center space-x-1.5">
                  <div
                    className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200"
                    title={isSyncing ? 'Sedang menyinkronkan ke cloud...' : 'Terhubung ke akun cloud'}
                  >
                    <Cloud size={14} className={isSyncing ? 'animate-pulse text-amber-600' : 'text-emerald-600'} />
                    <span className="max-w-[110px] truncate">{currentStudentData.name}</span>
                  </div>
                  <button
                    onClick={handleLogoutStudent}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-700 border border-gray-200"
                    title="Keluar Akun"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthTab('login');
                    setAuthError('');
                    setShowAuthModal(true);
                  }}
                  className="flex items-center space-x-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-300 transition-colors"
                >
                  <LogIn size={14} />
                  <span>Masuk / Daftar</span>
                </button>
              )}

              <button
                onClick={() => {
                  setActiveView('progress');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeView === 'progress'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                }`}
              >
                <BarChart3 size={14} />
                <span className="hidden sm:inline">Progres Saya</span>
              </button>
            </>
          )}

          {isEditorMode && (
            <button
              onClick={() => setIsEditorMode(false)}
              className="flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-200 transition-all"
            >
              <X size={14} />
              <span>Tutup Mode Editor</span>
            </button>
          )}

          <button
            onClick={handleSecretAvatarClick}
            title="Jagomatika"
            className="w-9 h-9 bg-emerald-100 text-emerald-800 font-semibold rounded-full flex items-center justify-center border border-emerald-300 select-none active:scale-95 transition-transform shrink-0"
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
                setActiveView('progress');
                setIsEditorMode(false);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeView === 'progress' && !isEditorMode
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <BarChart3 size={16} />
              <span>📊 Progres Belajar Saya ({studentAnalytics.overallAccuracy}%)</span>
            </button>

            <button
              onClick={() => {
                setActiveView('practice');
                setIsEditorMode(false);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeView === 'practice' && !isEditorMode
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
                <span>{isEditorMode ? 'Sedang di Mode Editor' : 'Buka Mode Editor & Analitik'}</span>
              </button>
            )}
          </div>

          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center space-x-2">
              <Layers size={16} className="text-emerald-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Kurikulum Berbasis Level</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700">
              {studentAnalytics.completedCount}/{studentAnalytics.totalTopics}
            </span>
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
                                  const isSelected = activeView === 'topic' && !isEditorMode && selectedTopic.id === topic.id;
                                  const doneByStudent = (currentStudentData.completedTopics || []).includes(topic.id);

                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => {
                                        setSelectedTopicId(topic.id);
                                        setActiveView('topic');
                                        setIsEditorMode(false);
                                        setMobileMenuOpen(false);
                                        setTopicAnswers({});
                                        setTopicDiscussions({});
                                        setExampleSolutions({});
                                        resetFormFields();
                                      }}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-between space-x-2 ${
                                        isSelected
                                          ? 'bg-emerald-700 text-white shadow-xs'
                                          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-900'
                                      }`}
                                    >
                                      <div className="flex items-center space-x-2 min-w-0">
                                        <BookOpen
                                          size={12}
                                          className={isSelected ? 'text-white shrink-0' : 'text-emerald-600 shrink-0'}
                                        />
                                        <span className="truncate">{topic.title}</span>
                                      </div>
                                      {doneByStudent && (
                                        <CheckCircle
                                          size={13}
                                          className={isSelected ? 'text-emerald-200 shrink-0' : 'text-emerald-600 shrink-0'}
                                        />
                                      )}
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
            {saveNotification && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-sm">
                <CheckCircle size={18} className="text-emerald-700 shrink-0" />
                <span>{saveNotification}</span>
              </div>
            )}

            {/* Banner Ajakan Login Jika Siswa Masih Tamu */}
            {!isEditorMode && !authUser && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-start space-x-3">
                  <CloudOff size={20} className="text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 space-y-0.5">
                    <p className="font-bold">Anda sedang belajar sebagai Siswa Tamu</p>
                    <p className="text-amber-800">
                      Buat akun atau masuk agar progres nilai Anda otomatis tercatat untuk pelatih dan bisa dilanjutkan di HP/laptop lain.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAuthTab('register');
                    setAuthError('');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 shadow-xs"
                >
                  Buat Akun / Masuk
                </button>
              </div>
            )}

            {isEditorMode ? (
              // ==========================================
              // TAMPILAN MODE EDITOR & ANALITIK PEMILIK WEB
              // ==========================================
              <div ref={editorFormTopRef} className="space-y-6">
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleImportJSON}
                  style={{ display: 'none' }}
                />

                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
                        CMS & Dasbor Pemilik Web
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                          isSupabaseConfigured
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                            : 'bg-red-500/20 text-red-300 border border-red-400/30'
                        }`}
                      >
                        <Cloud size={12} />
                        <span>
                          {isSupabaseConfigured
                            ? isSyncing
                              ? 'Menyimpan ke Cloud...'
                              : 'Supabase Aktif'
                            : 'Supabase Belum Terpasang'}
                        </span>
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Kelola Materi & Pantau Siswa</h1>
                    {editorTarget !== 'mixed' &&
                      editorTarget !== 'unit' &&
                      editorTarget !== 'topic' &&
                      editorTarget !== 'analytics' && (
                        <div className="pt-1 max-w-md">
                          <label className="block text-xs text-slate-400 mb-1">Topik Aktif Saat Ini:</label>
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
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-600 transition-all shadow-xs"
                    >
                      <Upload size={15} />
                      <span>Restore Materi</span>
                    </button>
                    <button
                      onClick={handleExportData}
                      className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition-all"
                    >
                      <Download size={15} />
                      <span>Backup Materi</span>
                    </button>
                  </div>
                </div>

                {/* Tab Pilihan Menu Editor */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-1">Menu:</span>
                  {[
                    { id: 'analytics', label: '📊 Analitik Siswa (Live)' },
                    { id: 'unit', label: '🗂️ Kelola Unit' },
                    { id: 'topic', label: '📑 Kelola Sub-Unit' },
                    { id: 'exercise', label: 'Latihan Mandiri' },
                    { id: 'example', label: 'Contoh Soal' },
                    { id: 'section', label: 'Materi / Teori' },
                    { id: 'mixed', label: 'Bank Soal Campuran' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleSwitchTarget(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        editorTarget === tab.id
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* ==========================================
                    TAB ANALITIK PEMILIK WEB (REAL-TIME CLOUD)
                    ========================================== */}
                {editorTarget === 'analytics' && ownerAnalytics && (
                  <div className="space-y-6">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-base font-bold text-gray-900">
                          Data Otomatis Seluruh Siswa ({ownerAnalytics.totalStudents} Akun Terdaftar)
                        </h2>
                        <p className="text-xs text-gray-500">
                          Setiap aktivitas belajar siswa langsung masuk ke tabel di bawah ini secara otomatis.
                        </p>
                      </div>
                      <button
                        onClick={fetchAllStudentsForAdmin}
                        disabled={loadingCloudStudents || !isSupabaseConfigured}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white shadow-xs"
                      >
                        <RefreshCw size={14} className={loadingCloudStudents ? 'animate-spin' : ''} />
                        <span>{loadingCloudStudents ? 'Memuat Data...' : 'Segarkan Data (Refresh)'}</span>
                      </button>
                    </div>

                    {/* 4 Kartu KPI Utama */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-xs font-bold uppercase">Total Siswa Terdaftar</span>
                          <Users size={18} className="text-emerald-700" />
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900">{ownerAnalytics.totalStudents}</p>
                        <p className="text-xs text-gray-500">Akun siswa di database cloud</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-xs font-bold uppercase">Rata-rata Akurasi</span>
                          <Award size={18} className="text-emerald-700" />
                        </div>
                        <p className="text-3xl font-extrabold text-emerald-700">{ownerAnalytics.avgGlobalAccuracy}%</p>
                        <p className="text-xs text-gray-500">Jawaban langsung benar pada klik pertama</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-xs font-bold uppercase">Materi Dikuasai</span>
                          <TrendingUp size={18} className="text-emerald-600" />
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900">{ownerAnalytics.masteredTopics.length}</p>
                        <p className="text-xs text-gray-500">Topik dengan skor rata-rata ≥ 75%</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-xs font-bold uppercase">Belum Tersentuh Siswa</span>
                          <AlertCircle size={18} className="text-amber-600" />
                        </div>
                        <p className="text-3xl font-extrabold text-amber-600">{ownerAnalytics.untouchedTopics.length}</p>
                        <p className="text-xs text-gray-500">Materi yang belum dipelajari siapa pun</p>
                      </div>
                    </div>

                    {/* 3 Kolom Analisis Materi */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
                        <div className="flex items-center space-x-2 border-b pb-2.5">
                          <TrendingUp size={18} className="text-emerald-700" />
                          <h3 className="text-sm font-bold text-gray-900">Materi Banyak Dikuasai</h3>
                        </div>
                        {ownerAnalytics.masteredTopics.length === 0 ? (
                          <p className="text-xs text-gray-400 italic py-4">Belum ada materi dengan skor tinggi.</p>
                        ) : (
                          <div className="space-y-2.5">
                            {ownerAnalytics.masteredTopics.map((t) => (
                              <div key={t.topicId} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-gray-900">{t.topicTitle}</span>
                                  <span className="text-xs font-extrabold px-2 py-0.5 bg-emerald-700 text-white rounded-md shrink-0">
                                    {t.avgScore}%
                                  </span>
                                </div>
                                <p className="text-[11px] text-emerald-800">
                                  Dipelajari {t.learnersCount} siswa • Tuntas: {t.completedByCount} siswa
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm space-y-3">
                        <div className="flex items-center space-x-2 border-b pb-2.5">
                          <TrendingDown size={18} className="text-red-600" />
                          <h3 className="text-sm font-bold text-gray-900">Materi Kurang Dikuasai</h3>
                        </div>
                        {ownerAnalytics.strugglingTopics.length === 0 ? (
                          <p className="text-xs text-gray-400 italic py-4">Tidak ada materi dengan skor rendah saat ini.</p>
                        ) : (
                          <div className="space-y-2.5">
                            {ownerAnalytics.strugglingTopics.map((t) => (
                              <div key={t.topicId} className="p-3 rounded-xl bg-red-50/70 border border-red-200 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-gray-900">{t.topicTitle}</span>
                                  <span className="text-xs font-extrabold px-2 py-0.5 bg-red-600 text-white rounded-md shrink-0">
                                    {t.avgScore}%
                                  </span>
                                </div>
                                <p className="text-[11px] text-red-800">
                                  Perlu penguatan pembinaan ({t.scoredLearnersCount} siswa mengerjakan latihan)
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3">
                        <div className="flex items-center space-x-2 border-b pb-2.5">
                          <AlertCircle size={18} className="text-amber-600" />
                          <h3 className="text-sm font-bold text-gray-900">Belum Dipelajari Siswa</h3>
                        </div>
                        {ownerAnalytics.untouchedTopics.length === 0 ? (
                          <p className="text-xs text-emerald-700 font-semibold py-4">
                            Seluruh materi sudah mulai diakses oleh siswa!
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {ownerAnalytics.untouchedTopics.map((t) => (
                              <div key={t.topicId} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-0.5">
                                <p className="text-xs font-bold text-gray-900">{t.topicTitle}</p>
                                <p className="text-[11px] text-gray-500">
                                  {t.levelTitle} • {t.unitTitle}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tabel Detail Seluruh Siswa */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                      <h3 className="text-base font-bold text-gray-900 border-b pb-3">
                        Daftar Capaian Siswa ({ownerAnalytics.perStudentSummary.length} Siswa)
                      </h3>

                      {ownerAnalytics.perStudentSummary.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">
                          Belum ada siswa yang mendaftar akun. Minta siswa klik tombol "Masuk / Daftar" di pojok kanan atas.
                        </p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b bg-gray-50 text-gray-600 uppercase">
                                <th className="py-3 px-3 font-bold">Nama & Username</th>
                                <th className="py-3 px-3 font-bold">Sekolah / Kelas</th>
                                <th className="py-3 px-3 font-bold">Materi Selesai</th>
                                <th className="py-3 px-3 font-bold">Langsung Benar</th>
                                <th className="py-3 px-3 font-bold">Akurasi</th>
                                <th className="py-3 px-3 font-bold">Materi Kuat</th>
                                <th className="py-3 px-3 font-bold text-right">Aksi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {ownerAnalytics.perStudentSummary.map((st) => (
                                <tr key={st.userId} className="hover:bg-gray-50">
                                  <td className="py-3 px-3">
                                    <p className="font-bold text-gray-900">{st.name}</p>
                                    <p className="text-[11px] text-gray-500">@{st.username}</p>
                                  </td>
                                  <td className="py-3 px-3 text-gray-600">{st.schoolInfo || '-'}</td>
                                  <td className="py-3 px-3">
                                    {st.completedCount} / {st.totalTopics} Topik
                                  </td>
                                  <td className="py-3 px-3 text-emerald-700 font-bold">
                                    {st.firstCorrectQuestions.length} / {st.totalAttempted} Soal
                                  </td>
                                  <td className="py-3 px-3">
                                    <span
                                      className={`px-2 py-0.5 rounded-md font-bold ${
                                        st.overallAccuracy >= 75
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : st.totalAttempted === 0
                                            ? 'bg-gray-100 text-gray-600'
                                            : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {st.overallAccuracy}%
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-gray-600 max-w-[180px] truncate">
                                    {st.strongTopics.length > 0
                                      ? st.strongTopics.map((t) => t.topicTitle).join(', ')
                                      : '-'}
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    {confirmDeleteStudentId === st.userId ? (
                                      <div className="inline-flex items-center space-x-1">
                                        <button
                                          onClick={() => handleDeleteCloudStudent(st.userId)}
                                          className="px-2 py-1 bg-red-600 text-white rounded-md font-bold"
                                        >
                                          Hapus
                                        </button>
                                        <button
                                          onClick={() => setConfirmDeleteStudentId(null)}
                                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md font-bold"
                                        >
                                          Batal
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setConfirmDeleteStudentId(st.userId)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                        title="Hapus data siswa"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* FORM KELOLA UNIT */}
                {editorTarget === 'unit' && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center space-x-2">
                        <FolderPlus size={18} className="text-emerald-700" />
                        <h2 className="text-base font-bold text-gray-900">
                          {editingUnitId ? 'Edit Nama Unit' : 'Tambah Unit Baru ke Sidebar'}
                        </h2>
                      </div>
                      {editingUnitId && (
                        <button
                          onClick={resetFormFields}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                        >
                          Batal Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Pilih Level Tujuan</label>
                        <select
                          value={targetLevelId}
                          onChange={(e) => setTargetLevelId(e.target.value)}
                          disabled={editingUnitId !== null}
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                        >
                          {curriculumData.map((lvl) => (
                            <option key={lvl.levelId} value={lvl.levelId}>
                              {lvl.levelTitle}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Judul Unit (Contoh: Unit 2: Aljabar Dasar)
                        </label>
                        <input
                          type="text"
                          value={edUnitTitle}
                          onChange={(e) => setEdUnitTitle(e.target.value)}
                          placeholder="Nama unit..."
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveUnit}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <Save size={18} />
                      <span>{editingUnitId ? 'Simpan Perubahan Unit' : 'Tambah Unit Baru'}</span>
                    </button>

                    <div className="pt-4 border-t space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Daftar Unit Saat Ini (Tahan klik kiri & geser untuk mengurutkan)
                      </h3>
                      {curriculumData.map((lvl) => (
                        <div key={lvl.levelId} className="space-y-2">
                          <p className="text-xs font-bold text-emerald-800">{lvl.levelTitle}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {lvl.units.map((u, uIdx) => {
                              const isDragging = draggedIdx === uIdx && draggedLevelId === lvl.levelId;
                              const isDragOver = dragOverIdx === uIdx && draggedLevelId === lvl.levelId;

                              return (
                                <div
                                  key={u.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, uIdx, lvl.levelId)}
                                  onDragOver={(e) => handleDragOver(e, uIdx, lvl.levelId)}
                                  onDrop={(e) => handleDrop(e, uIdx, lvl.levelId)}
                                  onDragEnd={resetDragState}
                                  className={`flex items-center justify-between p-3 border rounded-xl text-xs transition-all cursor-grab active:cursor-grabbing ${
                                    isDragging
                                      ? 'opacity-40 bg-emerald-50 border-emerald-400'
                                      : isDragOver
                                        ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50/70'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100/80'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2.5 min-w-0 pr-3">
                                    <GripVertical size={16} className="text-gray-400 shrink-0" />
                                    <span className="w-6 h-6 rounded-md bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                                      {uIdx + 1}
                                    </span>
                                    <span className="font-semibold text-gray-900 truncate">{u.title}</span>
                                  </div>

                                  <div className="flex items-center space-x-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => applyReorder(uIdx, uIdx - 1, lvl.levelId)}
                                      disabled={uIdx === 0}
                                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                    >
                                      <ArrowUp size={13} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => applyReorder(uIdx, uIdx + 1, lvl.levelId)}
                                      disabled={uIdx === lvl.units.length - 1}
                                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                    >
                                      <ArrowDown size={13} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTargetLevelId(lvl.levelId);
                                        setEditingUnitId(u.id);
                                        setEdUnitTitle(u.title);
                                      }}
                                      className="px-2.5 py-1.5 bg-amber-100 text-amber-900 rounded-lg font-bold hover:bg-amber-200"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteUnit(lvl.levelId, u.id)}
                                      className="px-2.5 py-1.5 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FORM KELOLA TOPIK / SUB-UNIT */}
                {editorTarget === 'topic' && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center space-x-2">
                        <BookOpen size={18} className="text-emerald-700" />
                        <h2 className="text-base font-bold text-gray-900">
                          {editingTopicId ? 'Edit Sub-Unit / Topik' : 'Tambah Sub-Unit / Topik Baru'}
                        </h2>
                      </div>
                      {editingTopicId && (
                        <button
                          onClick={resetFormFields}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                        >
                          Batal Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Pilih Level</label>
                        <select
                          value={targetLevelId}
                          onChange={(e) => {
                            const lvlId = e.target.value;
                            setTargetLevelId(lvlId);
                            const foundLvl = curriculumData.find((l) => l.levelId === lvlId);
                            if (foundLvl && foundLvl.units.length > 0) {
                              setTargetUnitId(foundLvl.units[0].id);
                            } else {
                              setTargetUnitId('');
                            }
                          }}
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                        >
                          {curriculumData.map((lvl) => (
                            <option key={lvl.levelId} value={lvl.levelId}>
                              {lvl.levelTitle}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Pilih Unit</label>
                        <select
                          value={targetUnitId || (curriculumData.find((l) => l.levelId === targetLevelId)?.units[0]?.id ?? '')}
                          onChange={(e) => setTargetUnitId(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                        >
                          {curriculumData
                            .find((l) => l.levelId === targetLevelId)
                            ?.units.map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Judul Topik / Sub-Unit</label>
                      <input
                        type="text"
                        value={edTopicTitle}
                        onChange={(e) => setEdTopicTitle(e.target.value)}
                        placeholder="Contoh: Operasi Hitung Lanjutan"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Catatan Pelatih (Coach Note)</label>
                      <textarea
                        rows={2}
                        value={edCoachNote}
                        onChange={(e) => setEdCoachNote(e.target.value)}
                        placeholder="Pesan khusus untuk siswa..."
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>

                    <button
                      onClick={handleSaveTopic}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <Save size={18} />
                      <span>{editingTopicId ? 'Simpan Perubahan Topik' : 'Tambah Topik Baru'}</span>
                    </button>

                    <div className="pt-4 border-t space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Daftar Sub-Unit dalam Unit Ini (Tahan klik kiri & geser untuk mengurutkan)
                      </h3>
                      {(() => {
                        const lvlObj = curriculumData.find((l) => l.levelId === targetLevelId);
                        const unitObj = lvlObj?.units.find((u) => u.id === (targetUnitId || lvlObj.units[0]?.id));
                        if (!unitObj || !unitObj.topics || unitObj.topics.length === 0) {
                          return <p className="text-xs text-gray-400 italic">Belum ada topik pada unit ini.</p>;
                        }
                        return unitObj.topics.map((t, tIdx) => {
                          const isDragging = draggedIdx === tIdx;
                          const isDragOver = dragOverIdx === tIdx;

                          return (
                            <div
                              key={t.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, tIdx)}
                              onDragOver={(e) => handleDragOver(e, tIdx)}
                              onDrop={(e) => handleDrop(e, tIdx)}
                              onDragEnd={resetDragState}
                              className={`flex items-center justify-between p-3 border rounded-xl text-xs transition-all cursor-grab active:cursor-grabbing ${
                                isDragging
                                  ? 'opacity-40 bg-emerald-50 border-emerald-400'
                                  : isDragOver
                                    ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50/70'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100/80'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0 pr-3">
                                <GripVertical size={16} className="text-gray-400 shrink-0" />
                                <span className="w-6 h-6 rounded-md bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                                  {tIdx + 1}
                                </span>
                                <span className="font-semibold text-gray-900 truncate">{t.title}</span>
                              </div>

                              <div className="flex items-center space-x-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => applyReorder(tIdx, tIdx - 1)}
                                  disabled={tIdx === 0}
                                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  <ArrowUp size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => applyReorder(tIdx, tIdx + 1)}
                                  disabled={tIdx === unitObj.topics.length - 1}
                                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  <ArrowDown size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingTopicId(t.id);
                                    setEdTopicTitle(t.title);
                                    setEdCoachNote(t.coachNote || '');
                                  }}
                                  className="px-2.5 py-1.5 bg-amber-100 text-amber-900 rounded-lg font-bold hover:bg-amber-200"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTopic(targetLevelId, unitObj.id, t.id)}
                                  className="px-2.5 py-1.5 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* FORM KONTEN SOAL / MATERI (Exercise, Example, Section, Mixed) */}
                {editorTarget !== 'analytics' && editorTarget !== 'unit' && editorTarget !== 'topic' && (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                              {editingIndex !== null ? `Edit Item #${editingIndex + 1}` : `Tambah ke: ${selectedTopic.title}`}
                            </h2>
                          </div>

                          {editingIndex !== null && (
                            <button
                              type="button"
                              onClick={resetFormFields}
                              className="flex items-center space-x-1 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg"
                            >
                              <RotateCcw size={13} />
                              <span>Batal</span>
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
                                placeholder="Contoh: 1. Sifat Dasar"
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
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border rounded-lg text-xs font-semibold"
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
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">Rumus LaTeX ($$...$$)</label>
                              <textarea
                                rows={2}
                                value={edFormula}
                                onChange={(e) => setEdFormula(e.target.value)}
                                placeholder="$$a^2 - b^2 = (a-b)(a+b)$$"
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono"
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
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border rounded-lg text-xs font-semibold"
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
                                placeholder="Ketik soal..."
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono"
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
                                placeholder="Ketik pembahasan..."
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono"
                              />
                            </div>
                          </div>
                        )}

                        <button
                          onClick={handleSaveOrUpdate}
                          className={`w-full py-3 font-bold rounded-xl text-sm shadow-md flex items-center justify-center space-x-2 transition-all text-white ${
                            editingIndex !== null ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-700 hover:bg-emerald-800'
                          }`}
                        >
                          <Save size={18} />
                          <span>
                            {editingIndex !== null ? `Simpan Perubahan Item #${editingIndex + 1}` : 'Simpan ke Web'}
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
                                  <MathText text={edParagraph || 'Pratinjau paragraf...'} />
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
                                  <MathText text={edQuestion || 'Pratinjau soal...'} />
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

                    {/* DAFTAR ITEM TERSIMPAN */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                        <div>
                          <h2 className="text-base font-bold text-gray-900">
                            Daftar Konten Tersimpan ({savedItemsList.length} Item)
                          </h2>
                          <p className="text-xs text-gray-500">
                            {editorTarget === 'mixed' ? 'Bank Soal Campuran' : `Topik: ${selectedTopic.title}`} —{' '}
                            <span className="text-emerald-700 font-semibold">
                              Tahan klik kiri & geser kartu untuk mengubah urutan
                            </span>
                          </p>
                        </div>
                      </div>

                      {savedItemsList.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500">
                          Belum ada data tersimpan pada bagian ini.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {savedItemsList.map((item, idx) => {
                            const isCurrentlyEditing = editingIndex === idx;
                            const isConfirmingDelete = confirmDeleteIdx === idx;
                            const isDragging = draggedIdx === idx;
                            const isDragOver = dragOverIdx === idx;
                            const previewTitle =
                              editorTarget === 'section'
                                ? item.heading
                                : editorTarget === 'example'
                                  ? item.problem
                                  : item.question;

                            return (
                              <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={(e) => handleDragOver(e, idx)}
                                onDrop={(e) => handleDrop(e, idx)}
                                onDragEnd={resetDragState}
                                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-grab active:cursor-grabbing ${
                                  isDragging
                                    ? 'opacity-40 bg-emerald-50 border-emerald-400'
                                    : isDragOver
                                      ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50/70'
                                      : isCurrentlyEditing
                                        ? 'border-amber-400 bg-amber-50/60'
                                        : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-start space-x-3 min-w-0 flex-1">
                                  <GripVertical size={18} className="text-gray-400 shrink-0 mt-1" />
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

                                <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-center">
                                  <button
                                    type="button"
                                    onClick={() => applyReorder(idx, idx - 1)}
                                    disabled={idx === 0}
                                    className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                  >
                                    <ArrowUp size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => applyReorder(idx, idx + 1)}
                                    disabled={idx === savedItemsList.length - 1}
                                    className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                  >
                                    <ArrowDown size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditItem(idx, item)}
                                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                                  >
                                    <Edit3 size={13} />
                                    <span>Edit</span>
                                  </button>

                                  {isConfirmingDelete ? (
                                    <div className="flex items-center space-x-1">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteItem(idx)}
                                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700"
                                      >
                                        Yakin?
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteIdx(null)}
                                        className="px-2 py-1.5 rounded-lg text-xs font-bold bg-gray-200 text-gray-700"
                                      >
                                        Batal
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteIdx(idx)}
                                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
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
                  </>
                )}
              </div>
            ) : activeView === 'progress' ? (
              // ==========================================
              // DASBOR PROGRES BELAJAR SISWA
              // ==========================================
              <div className="space-y-8">
                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
                        Laporan Evaluasi Diri Siswa
                      </span>
                      {authUser && (
                        <span className="text-xs font-semibold text-sky-300 bg-sky-500/20 px-2.5 py-1 rounded-full border border-sky-400/30">
                          @{currentStudentData.username}
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Progres Belajar: {currentStudentData.name}</h1>
                    <p className="text-xs text-slate-300">
                      {authUser
                        ? 'Semua progres Anda tersimpan otomatis di akun cloud dan dapat dilanjutkan di perangkat lain.'
                        : 'Masuk atau buat akun agar progres ini tersimpan permanen di cloud.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {authUser ? (
                      <button
                        onClick={handleLogoutStudent}
                        className="flex items-center space-x-1.5 bg-red-600/80 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold"
                      >
                        <LogOut size={14} />
                        <span>Keluar Akun</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setAuthTab('login');
                          setShowAuthModal(true);
                        }}
                        className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs"
                      >
                        <LogIn size={14} />
                        <span>Masuk / Daftar Akun</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 4 Kartu Ringkasan Siswa */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase text-gray-500">Materi Selesai</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-emerald-700">
                      {studentAnalytics.completedCount}{' '}
                      <span className="text-sm font-semibold text-gray-400">/ {studentAnalytics.totalTopics}</span>
                    </p>
                    <p className="text-xs text-gray-500">{studentAnalytics.visitedCount} topik sudah dibuka</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase text-gray-500">Akurasi Awal</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{studentAnalytics.overallAccuracy}%</p>
                    <p className="text-xs text-gray-500">Dari {studentAnalytics.totalAttempted} soal dikerjakan</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase text-gray-500">Langsung Benar</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-emerald-600">
                      {studentAnalytics.firstCorrectQuestions.length}
                    </p>
                    <p className="text-xs text-gray-500">Benar pada klik pertama</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase text-gray-500">Salah / Lihat Kunci Langsung</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-red-600">
                      {studentAnalytics.firstWrongQuestions.length}
                    </p>
                    <p className="text-xs text-gray-500">Perlu dipelajari ulang</p>
                  </div>
                </div>

                {/* Kekuatan (Nilai Tinggi) vs Kelemahan (Nilai Rendah) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
                    <div className="flex items-center space-x-2 border-b pb-3">
                      <TrendingUp size={18} className="text-emerald-700" />
                      <h2 className="text-base font-bold text-gray-900">Materi Nilai Tinggi (Kuat ≥ 75%)</h2>
                    </div>
                    {studentAnalytics.strongTopics.length === 0 ? (
                      <p className="text-xs text-gray-500 italic py-2">
                        Kerjakan latihan mandiri pada topik untuk memunculkan daftar materi terbaik Anda.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {studentAnalytics.strongTopics.map((t) => (
                          <div
                            key={t.topicId}
                            className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2"
                          >
                            <div>
                              <p className="text-xs font-bold text-gray-900">{t.topicTitle}</p>
                              <p className="text-[11px] text-emerald-800">
                                {t.firstCorrectCount}/{t.totalExercises} soal langsung benar
                              </p>
                            </div>
                            <span className="text-xs font-extrabold px-2.5 py-1 bg-emerald-700 text-white rounded-lg">
                              {t.scorePercent}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-3">
                    <div className="flex items-center space-x-2 border-b pb-3">
                      <TrendingDown size={18} className="text-red-600" />
                      <h2 className="text-base font-bold text-gray-900">Materi Nilai Rendah (Perlu Latihan)</h2>
                    </div>
                    {studentAnalytics.weakTopics.length === 0 ? (
                      <p className="text-xs text-gray-500 italic py-2">
                        Belum ada materi dengan nilai di bawah 75%. Pertahankan!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {studentAnalytics.weakTopics.map((t) => (
                          <div
                            key={t.topicId}
                            className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-2"
                          >
                            <div>
                              <p className="text-xs font-bold text-gray-900">{t.topicTitle}</p>
                              <p className="text-[11px] text-red-800">
                                Skor awal: {t.scorePercent}% ({t.firstCorrectCount}/{t.totalExercises} benar)
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedTopicId(t.topicId);
                                setActiveView('topic');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shrink-0"
                            >
                              Latih Ulang
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Peta Status Seluruh Unit & Sub-Unit */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-gray-900 border-b pb-3">
                    Peta Materi: Sudah Dipelajari vs. Belum Dipelajari
                  </h2>
                  <div className="space-y-3">
                    {studentAnalytics.topicStats.map((t) => (
                      <div
                        key={t.topicId}
                        className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-semibold text-gray-500">
                            {t.levelTitle} • {t.unitTitle}
                          </p>
                          <p className="text-sm font-bold text-gray-900">{t.topicTitle}</p>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          {t.scorePercent !== null && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-white">
                              Nilai: {t.scorePercent}%
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                              t.isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : t.isVisited
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {t.isCompleted ? '✅ Selesai' : t.isVisited ? '📖 Sedang Dipelajari' : '⏳ Belum Dipelajari'}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedTopicId(t.topicId);
                              setActiveView('topic');
                            }}
                            className="text-xs font-bold text-emerald-700 hover:underline px-2"
                          >
                            Buka ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rincian Soal: Dijawab Langsung Benar vs Dijawab Salah */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 border-b pb-3">
                      <CheckCircle size={18} className="text-emerald-600" />
                      <h2 className="text-base font-bold text-gray-900">
                        Soal Dijawab Langsung Benar ({studentAnalytics.firstCorrectQuestions.length})
                      </h2>
                    </div>
                    {studentAnalytics.firstCorrectQuestions.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">Belum ada soal yang dijawab langsung benar.</p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {studentAnalytics.firstCorrectQuestions.map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5 text-xs">
                            <span className="inline-block font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              {item.topicTitle}
                            </span>
                            <div className="text-gray-900 font-medium">
                              <MathText text={item.question} />
                            </div>
                            <p className="text-emerald-700 font-bold">
                              Jawaban Anda: <MathText text={item.studentAnswer} /> ✓
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 border-b pb-3">
                      <XCircle size={18} className="text-red-600" />
                      <h2 className="text-base font-bold text-gray-900">
                        Soal Dijawab Salah / Lihat Kunci Langsung ({studentAnalytics.firstWrongQuestions.length})
                      </h2>
                    </div>
                    {studentAnalytics.firstWrongQuestions.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">Belum ada soal yang dijawab salah.</p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {studentAnalytics.firstWrongQuestions.map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 space-y-1.5 text-xs">
                            <span className="inline-block font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-md">
                              {item.topicTitle}
                            </span>
                            <div className="text-gray-900 font-medium">
                              <MathText text={item.question} />
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                              <span className="text-red-700 font-semibold">
                                Jawaban Awal Anda: <MathText text={item.studentAnswer} /> ✗
                              </span>
                              <span className="text-emerald-700 font-bold">
                                Kunci Benar: <MathText text={item.correctAnswer} />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeView === 'practice' ? (
              // ==========================================
              // LATIHAN SOAL CAMPURAN
              // ==========================================
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
                            onClick={() => handleSelectMixedAnswer(activeQuestion, opt)}
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
                        onClick={handleToggleMixedDiscussion}
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
              // ==========================================
              // MODUL MATERI STANDAR
              // ==========================================
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
                      <span>Status Membaca ({currentStudentData.name}):</span>
                      <span className="font-semibold text-emerald-700">
                        {isTopicCompleted ? '100% Selesai' : 'Sedang Dipelajari'}
                      </span>
                    </div>

                    <button
                      onClick={handleToggleTopicCompleted}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        isTopicCompleted
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      <CheckCircle size={16} />
                      <span>{isTopicCompleted ? 'Materi Selesai Dipelajari' : 'Tandai Selesai'}</span>
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
                          {selectedTopic.examples.map((ex, idx) => {
                            const exKey = ex.number ?? idx;
                            const isSolOpen = Boolean(exampleSolutions[exKey]);

                            return (
                              <div key={exKey} className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                                <span className="inline-block text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-1 rounded-md">
                                  Contoh Soal #{ex.number}
                                </span>
                                <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
                                  <MathText text={ex.problem} />
                                </div>

                                <div className="pt-1">
                                  <button
                                    type="button"
                                    onClick={() => toggleExampleSolution(exKey)}
                                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
                                  >
                                    {isSolOpen ? <EyeOff size={14} /> : <Eye size={14} />}
                                    <span>{isSolOpen ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</span>
                                  </button>
                                </div>

                                {isSolOpen && (
                                  <div className="bg-white border border-emerald-200 rounded-lg p-4 text-sm text-gray-800 space-y-1">
                                    <p className="font-bold text-emerald-800">Pembahasan:</p>
                                    <div className="leading-relaxed whitespace-pre-line">
                                      <MathText text={ex.solution} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
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
                            Skor Sesi Ini:{' '}
                            {selectedTopic.exercises.filter((q) => topicAnswers[q.id] === q.answer).length} /{' '}
                            {selectedTopic.exercises.length}
                          </span>
                        </div>

                        <div className="space-y-6">
                          {selectedTopic.exercises.map((q) => {
                            const chosen = topicAnswers[q.id];
                            const isDiscOpen = topicDiscussions[q.id];
                            const savedAttempt = currentStudentData.topicAttempts?.[selectedTopic.id]?.[q.id];

                            return (
                              <div key={q.id} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/40">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start space-x-3">
                                    <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {q.id}
                                    </span>
                                    <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
                                      <MathText text={q.question} />
                                    </div>
                                  </div>
                                  {savedAttempt && (
                                    <span
                                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                        savedAttempt.isFirstCorrect
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {savedAttempt.isFirstCorrect ? 'Langsung Benar' : 'Pernah Salah / Lihat Kunci'}
                                    </span>
                                  )}
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
                                        onClick={() => handleSelectTopicAnswer(q, opt)}
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
                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm sticky top-20 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Navigasi Modul</h4>
                        <ul className="space-y-2.5 text-xs font-medium text-gray-600">
                          <li>
                            <a href="#materi" className="text-emerald-700 font-semibold hover:underline">
                              01. Konsep & Rumus
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

                      <div className="pt-3 border-t">
                        <button
                          onClick={() => setActiveView('progress')}
                          className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
                        >
                          📊 Lihat Progres Saya
                        </button>
                      </div>
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