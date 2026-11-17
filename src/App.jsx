import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Database, 
  Layers, 
  ArrowLeft, 
  CheckCircle,
  Info
} from 'lucide-react';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState(1);

  // Data struktur materi (Nantinya ini bisa diambil dari Database)
  const courseData = [
    {
      id: 1,
      unitNumber: 1,
      title: "Teori Bilangan",
      topicCount: 5,
      topics: [
        {
          id: '1.1',
          title: "Sifat Keterbagian",
          isActive: true,
          subItems: [
            { id: 'notes', icon: BookOpen, label: "Key Concepts", isActive: true },
            { id: 'qb', icon: Database, label: "Question Bank", isActive: false },
            { id: 'flash', icon: Layers, label: "Flashcards", isActive: false }
          ]
        },
        {
          id: '1.2',
          title: "FPB dan KPK",
          isActive: false,
          subItems: []
        }
      ]
    },
    { id: 2, unitNumber: 2, title: "Aljabar", topicCount: 4, topics: [] },
    { id: 3, unitNumber: 3, title: "Geometri", topicCount: 6, topics: [] }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f4f6f0] text-slate-800">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-[#2b4c3b] text-white p-1.5 rounded-md">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#2b4c3b]">JAGOMATIKA</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button className="hover:text-[#2b4c3b] transition-colors">Program Kurikulum</button>
            <button className="hover:text-[#2b4c3b] transition-colors">Harga</button>
          </div>
          <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
          <button className="text-slate-600 hover:text-slate-900">
            <Search size={20} />
          </button>
          <button className="hidden md:block text-sm font-medium text-slate-700 hover:text-slate-900">
            Login
          </button>
          <button className="bg-[#2b4c3b] hover:bg-[#1f382b] text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2">
            Sign up <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. LEFT SIDEBAR (Hidden on mobile) */}
        <aside className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static z-40 h-[calc(100vh-4rem)] w-72 
          bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 ease-in-out flex-shrink-0
        `}>
          <div className="p-4 border-b border-slate-200 bg-[#e9ece4]/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm mt-1">
                <GraduationCap size={20} className="text-[#2b4c3b]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">TINGKAT SMP</p>
                <h2 className="text-base font-bold text-slate-800 leading-tight">Olimpiade Matematika SMP</h2>
              </div>
            </div>
            <button className="w-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-between transition-colors shadow-sm">
              Browse all courses <ChevronRight size={16} className="text-slate-400" />
            </button>
          </div>

          <div className="p-4 border-b border-slate-200">
            <button className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-[#2b4c3b] w-full text-left">
              <BookOpen size={18} className="text-slate-400" />
              Course overview
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">UNITS AND TOPICS</h3>
              <Info size={14} className="text-slate-400" />
            </div>

            <div className="space-y-3">
              {courseData.map((unit) => (
                <div key={unit.id} className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                    className="w-full flex items-center p-3 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 bg-white">
                      {unit.unitNumber}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">{unit.title}</h4>
                      <p className="text-xs text-slate-500">{unit.topicCount} topics</p>
                    </div>
                    {expandedUnit === unit.id ? (
                      <ChevronDown size={18} className="text-slate-400" />
                    ) : (
                      <ChevronRight size={18} className="text-slate-400" />
                    )}
                  </button>

                  {/* Accordion Content */}
                  {expandedUnit === unit.id && unit.topics && (
                    <div className="px-3 pb-3 pt-1">
                      {unit.topics.map(topic => (
                        <div key={topic.id} className={`rounded-xl mb-2 ${topic.isActive ? 'bg-[#e9ece4]' : 'hover:bg-slate-50'}`}>
                          <button className="w-full flex items-center p-3 text-left">
                            {topic.isActive && <ChevronDown size={16} className="text-slate-500 mr-2" />}
                            {!topic.isActive && <ChevronRight size={16} className="text-slate-400 mr-2" />}
                            <div>
                              <p className="text-xs text-slate-500 font-medium">Topic {topic.id}</p>
                              <p className={`text-sm font-medium ${topic.isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                {topic.title}
                              </p>
                            </div>
                          </button>

                          {/* Sub-items (Key Concepts, dll) */}
                          {topic.isActive && topic.subItems && (
                            <div className="pb-2 space-y-1">
                              {topic.subItems.map(item => (
                                <button key={item.id} className={`w-full flex items-center pl-9 pr-3 py-2 text-sm text-left rounded-lg transition-colors ${item.isActive ? 'bg-white shadow-sm font-semibold text-slate-800 mx-2 w-[calc(100%-16px)]' : 'text-slate-600 hover:text-slate-900 hover:bg-black/5 mx-2 w-[calc(100%-16px)]'}`}>
                                  <item.icon size={16} className={`mr-3 ${item.isActive ? 'text-[#2b4c3b]' : 'text-slate-400'}`} />
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto flex flex-col xl:flex-row gap-6 p-4 md:p-8">
            
            {/* 3. CENTER CONTENT */}
            <div className="flex-1 max-w-4xl">
              
              {/* Header Card (Soft Green) */}
              <div className="bg-[#e9ece4] rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-[#dce0d5]">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                  Sifat Keterbagian (Divisibility)
                </h1>
                
                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm mb-2 text-slate-700">
                    <span className="flex items-center gap-2 font-medium">
                      Reading progress <Info size={16} className="text-slate-400" />
                    </span>
                    <span className="font-bold">0%</span>
                  </div>
                  <div className="w-full bg-white/60 rounded-full h-2.5 shadow-inner">
                    <div className="bg-[#2b4c3b] h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center gap-2 shadow-sm">
                    <ArrowLeft size={16} /> Back to course
                  </button>
                  <button className="bg-[#2b4c3b] hover:bg-[#1f382b] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-md">
                    <CheckCircle size={16} /> Mark Key Concepts Complete
                  </button>
                </div>
              </div>

              {/* Content Article (White Card) */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
                <h2 id="section-1" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Konsep Dasar Keterbagian</h2>
                
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-lg">
                  <p>
                    Dalam teori bilangan, konsep keterbagian adalah fondasi utama. Suatu bilangan bulat <span className="font-serif italic text-xl">a</span> dikatakan membagi habis bilangan bulat <span className="font-serif italic text-xl">b</span> (ditulis sebagai <span className="font-serif italic font-bold text-xl">a | b</span>) jika terdapat suatu bilangan bulat <span className="font-serif italic text-xl">k</span> sedemikian sehingga:
                  </p>
                  
                  {/* Math Equation Block */}
                  <div className="bg-[#f4f6f0] p-6 rounded-2xl text-center text-2xl font-serif border border-[#e9ece4] shadow-inner text-slate-900">
                    <span className="italic">b</span> = <span className="italic">a</span> &times; <span className="italic">k</span>
                  </div>
                  
                  <p>
                    Dalam hal ini, <span className="font-serif italic text-xl">a</span> disebut sebagai <strong>faktor</strong> atau <strong>pembagi</strong> dari <span className="font-serif italic text-xl">b</span>, dan <span className="font-serif italic text-xl">b</span> disebut sebagai <strong>kelipatan</strong> dari <span className="font-serif italic text-xl">a</span>. Syarat mutlaknya adalah <span className="font-serif italic text-xl">a</span> &ne; 0.
                  </p>

                  <h3 id="section-2" className="text-xl font-bold text-slate-900 mt-8 mb-4">Sifat-sifat Utama (Teorema)</h3>
                  <ul className="list-none space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-[#e9ece4] text-[#2b4c3b] font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                      <p><strong>Refleksif:</strong> Setiap bilangan bulat tak nol membagi dirinya sendiri. (<span className="font-serif italic">a | a</span>)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#e9ece4] text-[#2b4c3b] font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                      <p><strong>Transitif:</strong> Jika <span className="font-serif italic">a | b</span> dan <span className="font-serif italic">b | c</span>, maka <span className="font-serif italic">a | c</span>.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#e9ece4] text-[#2b4c3b] font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                      <p><strong>Kombinasi Linear:</strong> Jika <span className="font-serif italic">a | b</span> dan <span className="font-serif italic">a | c</span>, maka <span className="font-serif italic">a</span> juga membagi <span className="font-serif italic">mb &plusmn; nc</span> untuk setiap bilangan bulat <span className="font-serif italic">m, n</span>.</p>
                    </li>
                  </ul>

                  <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
                    <h4 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
                      <Info size={20} /> Tips Olimpiade
                    </h4>
                    <p className="text-amber-900 text-base">
                      Sifat kombinasi linear sangat sering digunakan dalam soal pembuktian olimpiade (OSN) untuk mengeliminasi variabel pada bentuk pecahan aljabar. Pastikan Anda menguasai sifat ke-3 ini!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. RIGHT SIDEBAR (On this page) - Hidden on smaller screens */}
            <div className="hidden xl:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">ON THIS PAGE</h3>
                <nav className="space-y-2">
                  <a href="#section-1" className="block p-3 bg-[#e9ece4] rounded-xl text-sm text-slate-900 font-medium transition-colors border border-[#dce0d5]">
                    <span className="text-slate-500 font-mono mr-2">01</span> Konsep Dasar Keterbagian
                  </a>
                  <a href="#section-2" className="block p-3 hover:bg-slate-50 rounded-xl text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="text-slate-400 font-mono mr-2">02</span> Sifat-sifat Utama
                  </a>
                  <a href="#section-3" className="block p-3 hover:bg-slate-50 rounded-xl text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="text-slate-400 font-mono mr-2">03</span> Ciri Keterbagian Bilangan
                  </a>
                  <a href="#section-4" className="block p-3 hover:bg-slate-50 rounded-xl text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="text-slate-400 font-mono mr-2">04</span> Contoh Soal Olimpiade
                  </a>
                </nav>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;