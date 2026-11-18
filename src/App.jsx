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
  Upload,
  PlusCircle,
  FolderPlus
} from 'lucide-react';

const EDITOR_PASSWORD = 'punyawebolim';

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
              }
            ],
            examples: [
              {
                number: 1,
                problem:
                  'Hitunglah nilai dari $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{99 \\times 100}$.',
                solution:
                  'Gunakan identitas pecahan teleskopik $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ pada setiap suku:\n$$1 - \\frac{1}{100} = \\frac{99}{100}$$'
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
              }
            ]
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

  const [selectedTopicId, setSelectedTopicId] = useState('t1');
  
  // Pastikan topik terpilih selalu valid
  const allTopics = curriculumData.flatMap((l) => l.units).flatMap((u) => u.topics);
  const selectedTopic = allTopics.find((t) => t.id === selectedTopicId) || allTopics[0] || {
    id: 't-fallback',
    title: 'Topik Kosong',
    coachNote: 'Silakan buat unit dan topik baru via Mode Editor.',
    sections: [],
    examples: [],
    exercises: []
  };

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

  // State Form Editor Konten Soal & Materi
  const [editorTarget, setEditorTarget] = useState('exercise'); // 'exercise' | 'example' | 'section' | 'mixed' | 'unit' | 'topic'
  const [editingIndex, setEditingIndex] = useState(null);
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

  // Fields untuk Kelola Unit & Topik (Sub-Unit)
  const [targetLevelId, setTargetLevelId] = useState('level-1');
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
    setEditingUnitId(null);
    setEditingTopicId(null);
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

  // HANDLER CRUD UNIT & TOPIK
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
    localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
    showToast(editingUnitId ? '✅ Unit berhasil diperbarui!' : '✅ Unit baru berhasil ditambahkan!');
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
    localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
    showToast('🗑️ Unit berhasil dihapus.');
  };

  const handleSaveTopic = () => {
    if (!edTopicTitle.trim()) {
      showToast('⚠️ Judul topik tidak boleh kosong.');
      return;
    }
    if (!targetUnitId) {
      showToast('⚠️ Pilih unit tujuan terlebih dahulu.');
      return;
    }

    const updatedCurriculum = curriculumData.map((lvl) => {
      if (lvl.levelId !== targetLevelId) return lvl;
      const unitsList = lvl.units.map((u) => {
        if (u.id !== targetUnitId) return u;
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
    localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
    showToast(editingTopicId ? '✅ Topik berhasil diperbarui!' : '✅ Topik baru berhasil ditambahkan!');
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
    localStorage.setItem('jagomatika_curriculum', JSON.stringify(updatedCurriculum));
    showToast('🗑️ Topik berhasil dihapus.');
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

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          if (parsedData.curriculumData) {
            setCurriculumData(parsedData.curriculumData);
            localStorage.setItem('jagomatika_curriculum', JSON.stringify(parsedData.curriculumData));
          }
          if (parsedData.questionBank) {
            setQuestionBank(parsedData.questionBank);
            localStorage.setItem('jagomatika_questionbank', JSON.stringify(parsedData.questionBank));
          }
          showToast('✅ Data berhasil dipulihkan (Restore) dari file JSON!');
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

  const handleSelectTopicAnswer = (qId, option) => {
    setTopicAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleTopicDiscussion = (qId) => {
    setTopicDiscussions((prev) => ({ ...prev, [qId]: !prev[qId] }));
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
              // TAMPILAN MODE EDITOR
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
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
                      CMS Mode Editor (Unit, Sub-Unit, & Soal)
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Kelola Menu & Konten Olimpiade</h1>
                    {editorTarget !== 'mixed' && editorTarget !== 'unit' && editorTarget !== 'topic' && (
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
                      title="Pulihkan data dari file JSON cadangan"
                    >
                      <Upload size={15} />
                      <span>Restore JSON</span>
                    </button>
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

                {/* Tab Pilihan Menu Editor */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">Mode CMS:</span>
                  {[
                    { id: 'unit', label: '🗂️ Kelola Unit' },
                    { id: 'topic', label: '📑 Kelola Sub-Unit / Topik' },
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
                        <label className="block text-xs font-bold text-gray-700 mb-1">Judul Unit (Contoh: Unit 3: Aljabar)</label>
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

                    {/* Daftar Unit per Level untuk Diedit/Dihapus */}
                    <div className="pt-4 border-t space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Daftar Unit Saat Ini</h3>
                      {curriculumData.map((lvl) => (
                        <div key={lvl.levelId} className="space-y-2">
                          <p className="text-xs font-bold text-emerald-800">{lvl.levelTitle}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {lvl.units.map((u) => (
                              <div
                                key={u.id}
                                className="flex items-center justify-between p-3 bg-gray-50 border rounded-xl text-xs"
                              >
                                <span className="font-semibold text-gray-900">{u.title}</span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      setTargetLevelId(lvl.levelId);
                                      setEditingUnitId(u.id);
                                      setEdUnitTitle(u.title);
                                    }}
                                    className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUnit(lvl.levelId, u.id)}
                                    className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg font-bold"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            ))}
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

                    {/* Daftar Topik di Unit Terpilih */}
                    <div className="pt-4 border-t space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Daftar Sub-Unit dalam Unit Ini</h3>
                      {(() => {
                        const lvlObj = curriculumData.find((l) => l.levelId === targetLevelId);
                        const unitObj = lvlObj?.units.find((u) => u.id === (targetUnitId || lvlObj.units[0]?.id));
                        if (!unitObj || !unitObj.topics || unitObj.topics.length === 0) {
                          return <p className="text-xs text-gray-400 italic">Belum ada topik pada unit ini.</p>;
                        }
                        return unitObj.topics.map((t) => (
                          <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 border rounded-xl text-xs">
                            <span className="font-semibold text-gray-900">{t.title}</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingTopicId(t.id);
                                  setEdTopicTitle(t.title);
                                  setEdCoachNote(t.coachNote || '');
                                }}
                                className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTopic(targetLevelId, unitObj.id, t.id)}
                                className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg font-bold"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* FORM KONTEN SOAL / MATERI (Exercise, Example, Section, Mixed) */}
                {editorTarget !== 'unit' && editorTarget !== 'topic' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div
                      className={`bg-white p-6 rounded-2xl border shadow-sm space-y-5 ${
                        editingIndex !== null ? 'border-amber-400 ring-2 ring-amber-200/60' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-2">
                          {editingIndex !== null ? <Edit3 size={18} className="text-amber-600" /> : <PlusCircle size={18} className="text-emerald-700" />}
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
                              <label className="block text-xs font-bold text-gray-700">Pilihan Jawaban (Klik huruf untuk kunci)</label>
                              {edOptions.map((opt, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => setEdCorrectIdx(idx)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 border ${
                                      edCorrectIdx === idx ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-gray-100 text-gray-600'
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
                        <span>{editingIndex !== null ? `Simpan Perubahan Item #${editingIndex + 1}` : 'Simpan ke Web'}</span>
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
                              <h3 className="text-base font-bold text-emerald-900"><MathText text={edHeading || 'Judul Sub-Bab...'} /></h3>
                              <p className="text-gray-700 text-sm whitespace-pre-line"><MathText text={edParagraph || 'Pratinjau paragraf...'} /></p>
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
                                        edCorrectIdx === idx ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-900' : 'bg-white text-gray-700'
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
                )}

                {/* DAFTAR ITEM TERSIMPAN (Kecuali tab Unit & Topic) */}
                {editorTarget !== 'unit' && editorTarget !== 'topic' && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                      <div>
                        <h2 className="text-base font-bold text-gray-900">Daftar Konten Tersimpan ({savedItemsList.length} Item)</h2>
                        <p className="text-xs text-gray-500">
                          {editorTarget === 'mixed' ? 'Bank Soal Campuran' : `Topik: ${selectedTopic.title}`}
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
                          const previewTitle =
                            editorTarget === 'section' ? item.heading : editorTarget === 'example' ? item.problem : item.question;

                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                                isCurrentlyEditing ? 'border-amber-400 bg-amber-50/60' : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50'
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
                )}
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
                      <span className="font-semibold text-emerald-700">{completed ? '100% Selesai' : 'Sedang Dipelajari'}</span>
                    </div>

                    <button
                      onClick={() => setCompleted(!completed)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        completed ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
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
                        <strong>Catatan Pelatih:</strong> <MathText text={selectedTopic.coachNote || 'Pelajari materi di atas dengan seksama.'} />
                      </div>
                    </section>

                    {/* CONTOH SOAL */}
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
                      <section id="latihan-mandiri" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                          <div className="flex items-center space-x-2">
                            <Award size={20} className="text-emerald-700" />
                            <h2 className="text-lg font-bold text-gray-900">Latihan Mandiri ({selectedTopic.exercises.length} Soal)</h2>
                          </div>
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            Skor Sementara: {selectedTopic.exercises.filter((q) => topicAnswers[q.id] === q.answer).length} / {selectedTopic.exercises.length}
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
                                    let optionClass = 'border-gray-200 bg-white text-gray-700 hover:border-emerald-400 hover:bg-emerald-50/40';

                                    if (chosen) {
                                      if (isThisCorrect) optionClass = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                                      else if (isThisChosen && !isThisCorrect) optionClass = 'border-red-400 bg-red-50 text-red-900 font-bold';
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
                                    <p className="font-bold">Kunci Jawaban: <MathText text={q.answer} /></p>
                                    <div className="leading-relaxed whitespace-pre-line"><MathText text={q.discussion} /></div>
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
                        <li><a href="#materi" className="text-emerald-700 font-semibold hover:underline">01. Konsep & Rumus LaTeX</a></li>
                        {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                          <li><a href="#contoh-soal" className="hover:text-emerald-700 hover:underline">02. Contoh Soal</a></li>
                        )}
                        {selectedTopic.exercises && selectedTopic.exercises.length > 0 && (
                          <li><a href="#latihan-mandiri" className="hover:text-emerald-700 hover:underline">03. Latihan Mandiri</a></li>
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