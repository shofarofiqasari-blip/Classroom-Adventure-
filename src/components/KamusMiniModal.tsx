import React, { useState } from 'react';
import { Volume2, X, Search, Sparkles } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/gameData';
import { VocabularyItem } from '../types/game';
import { speakEnglish } from '../utils/sound';
import { ClassroomObject3D } from './Objects3D';

interface KamusMiniModalProps {
  onClose: () => void;
}

export const KamusMiniModal: React.FC<KamusMiniModalProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'classroom-objects' | 'prepositions'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSpeakingWord, setActiveSpeakingWord] = useState<string | null>(null);

  const handleSpeak = (text: string, id: string) => {
    setActiveSpeakingWord(id);
    speakEnglish(text, () => {
      setActiveSpeakingWord(null);
    });
  };

  const filteredItems = VOCABULARY_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indonesian.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-sky-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              📖
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Kamus Mini Ceria Ustadzah Shofa
              </h2>
              <p className="text-xs text-sky-100 font-medium">
                11 Classroom Objects & 6 Positions • Kelas 2 SDIT Bina Insan Cendekia
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Tutup Kamus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Kosakata ({VOCABULARY_LIST.length})
            </button>
            <button
              onClick={() => setSelectedCategory('classroom-objects')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'classroom-objects'
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🎒 Benda di Kelas (11)
            </button>
            <button
              onClick={() => setSelectedCategory('prepositions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'prepositions'
                  ? 'bg-pink-500 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              📍 Posisi Benda (6)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata atau arti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Vocabulary Cards Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredItems.map((item: VocabularyItem) => {
            const isSpeaking = activeSpeakingWord === item.id;
            const isPreposition = item.category === 'prepositions';

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isPreposition
                    ? 'bg-gradient-to-br from-pink-50/70 to-amber-50/40 border-pink-200 hover:border-pink-300'
                    : 'bg-gradient-to-br from-sky-50/70 to-white border-sky-200 hover:border-sky-300'
                } shadow-xs hover:shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {item.objectId ? (
                      <div className="w-12 h-12 rounded-2xl bg-white border border-sky-100 flex items-center justify-center shadow-2xs">
                        <ClassroomObject3D objectId={item.objectId} size={42} />
                      </div>
                    ) : (
                      <span className="text-2xl">{item.visualTag}</span>
                    )}
                    <button
                      onClick={() => handleSpeak(item.word, item.id)}
                      className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shadow-xs cursor-pointer transition-all ${
                        isSpeaking
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : isPreposition
                          ? 'bg-pink-100 hover:bg-pink-200 text-pink-700'
                          : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                      }`}
                      title="Dengarkan pengucapan"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Listening...' : 'Listen 🔊'}</span>
                    </button>
                  </div>

                  {/* Word & Indonesian Meaning */}
                  <h3 className="text-lg font-black text-slate-800 flex items-baseline gap-2">
                    <span>{item.word}</span>
                  </h3>
                  <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                    Arti: {item.indonesian}
                  </div>

                  {/* Example Sentence */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px] leading-relaxed">
                    <div className="text-slate-700 font-semibold italic flex items-center justify-between">
                      <span>"{item.exampleSentence}"</span>
                      <button
                        onClick={() => handleSpeak(item.exampleSentence, `${item.id}-sentence`)}
                        className="text-slate-400 hover:text-emerald-600 p-0.5 cursor-pointer"
                        title="Dengarkan kalimat"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      ({item.exampleIndonesian})
                    </div>
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                  {isPreposition ? '📍 Preposition (Posisi)' : '🎒 Classroom Object (Benda)'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Klik tombol <strong>Listen 🔊</strong> untuk mendengar cara pengucapan guru asli!</span>
          </div>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
