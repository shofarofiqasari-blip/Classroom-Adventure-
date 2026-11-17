import React, { useState, useEffect } from 'react';
import { GAME_LEVELS } from './data/gameData';
import { CLASSROOM_OBJECTS, POSITIONS } from './data/classroomData';
import { LevelData, PlayerProfile } from './types/game';
import { sounds, speakEnglish } from './utils/sound';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardView, ActiveGameView } from './components/DashboardView';
import { LetsLearnView } from './components/games/LetsLearnView';
import { LetsExploreView } from './components/games/LetsExploreView';
import { AirplaneAdventureView } from './components/games/AirplaneAdventureView';
import { PencilPathView } from './components/games/PencilPathView';
import { FindObjectView } from './components/games/FindObjectView';
import { WhereIsItView } from './components/games/WhereIsItView';
import { QuizTimeView } from './components/games/QuizTimeView';
import { Navbar } from './components/Navbar';
import { SideScrollerView } from './components/SideScrollerView';
import { BattleModal } from './components/BattleModal';
import { VictoryModal } from './components/VictoryModal';
import { CertificateModal } from './components/CertificateModal';
import { KamusMiniModal } from './components/KamusMiniModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { UstadzahShofaAvatar } from './components/VisualIllustrations';
import {
  Sparkles,
  BookOpen,
  Award,
  Play,
  CheckCircle2,
  ChevronRight,
  Volume2,
  RotateCcw,
} from 'lucide-react';

type AppRoute = 'welcome' | ActiveGameView;

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Muhammad Bintang',
  gender: 'boy',
  school: 'SDIT Bina Insan Cendekia',
  classGrade: 'Kelas 2 (Fase A)',
};

function safeReadStorage(key: string): string | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeWriteStorage(key: string, value: string) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // ignore storage restrictions in embedded iframes
  }
}

function safeRemoveStorage(key: string) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>('welcome');

  // Player profile state
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>(() => {
    const saved = safeReadStorage('shofa_game_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.name === 'string') {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  // Treasure of 100 Good Jobs progress
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = safeReadStorage('shofa_completed_levels');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);

  // Modals & UI controls
  const [activeBattleLevel, setActiveBattleLevel] = useState<LevelData | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showKamusModal, setShowKamusModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const totalStars = completedLevels.length * 20;

  const handleSaveProfile = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
    safeWriteStorage('shofa_game_profile', JSON.stringify(profile));
    setShowProfileModal(false);
  };

  useEffect(() => {
    safeWriteStorage('shofa_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sounds.setMuted(nextState);
  };

  const handleEncounter = (levelIdx: number) => {
    setCurrentLevelIndex(levelIdx);
    setActiveBattleLevel(GAME_LEVELS[levelIdx]);
  };

  const handleBattleSuccess = () => {
    if (activeBattleLevel) {
      const idx = activeBattleLevel.id - 1;
      if (!completedLevels.includes(idx)) {
        const nextCompleted = [...completedLevels, idx];
        setCompletedLevels(nextCompleted);

        if (nextCompleted.length >= 5) {
          setActiveBattleLevel(null);
          setTimeout(() => {
            setShowVictoryModal(true);
          }, 400);
          return;
        } else {
          setCurrentLevelIndex(Math.min(GAME_LEVELS.length - 1, idx + 1));
        }
      }
    }
    setActiveBattleLevel(null);
  };

  const handleOpenTreasure = () => {
    setShowVictoryModal(true);
  };

  const confirmResetTreasure = () => {
    setCompletedLevels([]);
    setCurrentLevelIndex(0);
    safeRemoveStorage('shofa_completed_levels');
    setShowResetConfirm(false);
  };

  const goHome = () => {
    sounds.playClick();
    setRoute('dashboard');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900">
      {route === 'welcome' && (
        <WelcomeScreen
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onStart={() => setRoute('dashboard')}
        />
      )}

      {route === 'dashboard' && (
        <div key="dashboard" className="animate-page-flip">
          <DashboardView
            playerProfile={playerProfile}
            treasureStars={totalStars}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onSelectMenu={(view) => setRoute(view)}
            onOpenKamus={() => setShowKamusModal(true)}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        </div>
      )}

      {route === 'learn' && (
        <div key="learn" className="animate-page-flip">
          <LetsLearnView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'explore' && (
        <div key="explore" className="animate-page-flip">
          <LetsExploreView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'airplane' && (
        <div key="airplane" className="animate-page-flip">
          <AirplaneAdventureView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'pencil-path' && (
        <div key="pencil-path" className="animate-page-flip">
          <PencilPathView
            playerGender={playerProfile.gender}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'find-object' && (
        <div key="find-object" className="animate-page-flip">
          <FindObjectView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'where-is-it' && (
        <div key="where-is-it" className="animate-page-flip">
          <WhereIsItView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'quiz' && (
        <div key="quiz" className="animate-page-flip">
          <QuizTimeView
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHome={goHome}
          />
        </div>
      )}

      {route === 'treasure-adventure' && (
        <div key="treasure" className="min-h-screen bg-slate-100 flex flex-col animate-page-flip">
          <Navbar
            totalStars={totalStars}
            currentLevelIndex={currentLevelIndex}
            totalLevels={GAME_LEVELS.length}
            playerProfile={playerProfile}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenKamus={() => setShowKamusModal(true)}
            onOpenProfile={() => setShowProfileModal(true)}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onReset={() => setShowResetConfirm(true)}
            onHome={goHome}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
            {/* Welcome Briefing Header Card */}
            <section className="bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 justify-between">
                <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                  <div className="relative flex-shrink-0">
                    <UstadzahShofaAvatar size={90} className="shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-white shadow">
                      Guru Kelas 2
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 bg-white/20 text-sky-50 px-3 py-0.5 rounded-full text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>SDIT Bina Insan Cendekia • Fase A</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight font-display">
                      Petualangan &quot;The Treasure of 100 Good Jobs&quot;
                    </h1>
                    <p className="text-xs sm:text-sm text-sky-50 max-w-2xl leading-relaxed">
                      &quot;Ahlan wa sahlan, ananda <strong>{playerProfile.name}</strong>! Berjalanlah melintasi 5 Zona Sekolah Ajaib, kalahkan monster dengan menjawab posisi benda dalam Bahasa Inggris, dan kumpulkan <strong>100 Bintang Good Job</strong>!&quot;
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5 flex-shrink-0">
                  <button
                    onClick={() => setShowKamusModal(true)}
                    className="flex items-center gap-2 bg-white text-sky-800 hover:bg-sky-50 active:scale-95 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow cursor-pointer transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>Buka Kamus (17 Kata)</span>
                  </button>

                  {totalStars >= 100 && (
                    <button
                      onClick={() => setShowCertificateModal(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 active:scale-95 text-amber-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-lg border border-amber-500 cursor-pointer animate-bounce"
                    >
                      <Award className="w-4 h-4" />
                      <span>Unduh E-Sertifikat!</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* 2D Side-Scrolling Platformer View */}
            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎮</span>
                  <h2 className="text-base sm:text-lg font-black text-slate-800">
                    Panggung Petualangan Bergerak (Side-Scrolling)
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                  Gerakkan karakter ke kanan untuk mencapai zona musuh!
                </span>
              </div>

              <SideScrollerView
                levels={GAME_LEVELS}
                currentLevelIndex={currentLevelIndex}
                completedLevels={completedLevels}
                playerProfile={playerProfile}
                totalStars={totalStars}
                onEncounterMonster={handleEncounter}
                onOpenTreasure={handleOpenTreasure}
              />
            </section>

            {/* 5 Mission Level Zones Grid */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1 flex-wrap gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                    <span>🗺️</span>
                    <span>Peta 5 Zona &amp; Musuh Sekolah Ajaib</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Setiap musuh yang dikalahkan memberikan 20 Bintang &quot;Good Job&quot; (Total 100 Bintang).
                  </p>
                </div>
                <div className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Progres: {completedLevels.length} / 5 Musuh Dikalahkan
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {GAME_LEVELS.map((level, idx) => {
                  const isCompleted = completedLevels.includes(idx);
                  const isCurrent = currentLevelIndex === idx;
                  const isLocked = !isCompleted && idx > currentLevelIndex;

                  return (
                    <div
                      key={level.id}
                      className={`relative p-4 rounded-3xl border-3 transition-all flex flex-col justify-between ${
                        isCompleted
                          ? 'bg-emerald-50/70 border-emerald-400 shadow-sm'
                          : isCurrent
                          ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-300 shadow-md scale-[1.02]'
                          : isLocked
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                              isCompleted
                                ? 'bg-emerald-600 text-white'
                                : isCurrent
                                ? 'bg-amber-500 text-white animate-pulse'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            Level {level.id}
                          </span>

                          <div className="flex items-center gap-1 text-xs font-black text-amber-800">
                            <span>★</span>
                            <span>{isCompleted ? '20/20' : '0/20'}</span>
                          </div>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug">
                          {level.enemyName}
                        </h3>
                        <div className="text-[11px] font-bold text-sky-700 mt-0.5">
                          {level.zoneTitle}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {level.enemyDescription}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
                          <span className="font-bold text-indigo-700">⚔️ 3 Soal Bertingkat</span>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            {level.id === 5 ? 'Boss' : `Lv.${level.id}`}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        {isCompleted ? (
                          <div className="flex items-center justify-center gap-1.5 bg-emerald-100 text-emerald-800 py-2 rounded-xl text-xs font-extrabold border border-emerald-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Barakallah! Tuntas (20 ★)</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEncounter(idx)}
                            disabled={isLocked}
                            className={`w-full py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md'
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{isCurrent ? 'Lawan Sekarang!' : 'Mulai Level'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Canonical Learning Material Summary */}
            <section className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <span>📚</span>
                    <span>Rangkuman Materi Ajar (Fase A)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    11 Classroom Objects &amp; 6 Positions • SDIT Bina Insan Cendekia bersama Ustadzah Shofa.
                  </p>
                </div>
                <button
                  onClick={() => setShowKamusModal(true)}
                  className="text-xs font-extrabold text-sky-700 hover:text-sky-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <span>Buka Kamus Interaktif Lengkap</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-50/60 rounded-2xl border-2 border-sky-200 p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎒</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-sky-950">
                      Topik 1: 11 Classroom Objects
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {CLASSROOM_OBJECTS.map((obj) => (
                      <button
                        key={obj.id}
                        onClick={() => speakEnglish(obj.word)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-sky-100 text-slate-700 px-2.5 py-1 rounded-xl text-xs font-bold border border-sky-200 shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>{obj.word}</span>
                        <span className="text-[10px] text-sky-700 font-semibold">({obj.indonesian})</span>
                        <Volume2 className="w-3 h-3 text-sky-500" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-pink-50/60 rounded-2xl border-2 border-pink-200 p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-pink-950">
                      Topik 2: 6 Positions
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    {POSITIONS.map((prep) => (
                      <button
                        key={prep.id}
                        onClick={() => speakEnglish(prep.word)}
                        className="p-2 bg-white hover:bg-pink-100/70 rounded-xl border border-pink-200 text-left transition-colors cursor-pointer"
                      >
                        <div className="font-black text-pink-900">{prep.word}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                          {prep.indonesian}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 mt-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span>🏫</span>
                <span className="font-bold text-slate-700">SDIT Bina Insan Cendekia</span>
                <span>•</span>
                <span>Ustadzah Shofa (Guru Kelas 2 SD • Fase A)</span>
              </div>
              <div>CLASSROOM ADVENTURE • The Treasure of 100 Good Jobs</div>
            </div>
          </footer>
        </div>
      )}

      {/* MODALS */}
      {activeBattleLevel && (
        <BattleModal
          level={activeBattleLevel}
          playerProfile={playerProfile}
          onSuccess={handleBattleSuccess}
          onClose={() => setActiveBattleLevel(null)}
        />
      )}

      {showVictoryModal && (
        <VictoryModal
          playerProfile={playerProfile}
          totalStars={totalStars}
          onOpenCertificate={() => {
            setShowVictoryModal(false);
            setShowCertificateModal(true);
          }}
          onOpenKamus={() => {
            setShowVictoryModal(false);
            setShowKamusModal(true);
          }}
          onRestart={() => {
            setShowVictoryModal(false);
            setShowResetConfirm(true);
          }}
        />
      )}

      {showCertificateModal && (
        <CertificateModal
          playerProfile={playerProfile}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {showKamusModal && (
        <KamusMiniModal onClose={() => setShowKamusModal(false)} />
      )}

      {showProfileModal && (
        <CharacterSelectModal
          initialProfile={playerProfile}
          onConfirm={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Custom In-App Reset Confirmation (no window.confirm) */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border-4 border-amber-300 p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-800">Mulai Petualangan Baru?</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Bintang Good Job akan dihitung kembali dari 0 untuk mengulang seluruh 5 zona.
            </p>
            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmResetTreasure}
                className="flex-1 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow cursor-pointer"
              >
                Ya, Ulangi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
