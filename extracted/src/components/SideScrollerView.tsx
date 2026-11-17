import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowUp, Star, Swords, Sparkles, Navigation, MapPin } from 'lucide-react';
import { LevelData, PlayerProfile } from '../types/game';
import { sounds } from '../utils/sound';
import {
  StudentBoyAvatar,
  StudentGirlAvatar,
  DustyMonster,
  GoblinMonster,
  KingPencilMonster,
  NaughtyEraserMonster,
  PaperDragonMonster,
  TreasureChestIllustration,
} from './VisualIllustrations';

interface SideScrollerProps {
  levels: LevelData[];
  currentLevelIndex: number;
  completedLevels: number[];
  playerProfile: PlayerProfile;
  totalStars: number;
  onEncounterMonster: (levelIndex: number) => void;
  onOpenTreasure: () => void;
}

interface FloatingStar {
  id: number;
  xPos: number;
  collected: boolean;
}

// Total world width in pixels - spaced far apart for an epic adventure feel
const WORLD_WIDTH = 3000;

// Level station X pixel positions (spaced ~550px - 600px apart!)
const LEVEL_POSITIONS = [380, 950, 1550, 2150, 2700];
const TREASURE_POSITION = 2880;

export const SideScrollerView: React.FC<SideScrollerProps> = ({
  levels,
  currentLevelIndex,
  completedLevels,
  playerProfile,
  totalStars,
  onEncounterMonster,
  onOpenTreasure,
}) => {
  // Player X position in pixels within the 3000px corridor
  const [playerX, setPlayerX] = useState<number>(() => {
    return LEVEL_POSITIONS[currentLevelIndex] || 200;
  });

  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [facingLeft, setFacingLeft] = useState<boolean>(false);

  // Floating bonus stars scattered along the long school corridor
  const [miniStars, setMiniStars] = useState<FloatingStar[]>([
    { id: 1, xPos: 200, collected: false },
    { id: 2, xPos: 300, collected: false },
    { id: 3, xPos: 550, collected: false },
    { id: 4, xPos: 720, collected: false },
    { id: 5, xPos: 840, collected: false },
    { id: 6, xPos: 1150, collected: false },
    { id: 7, xPos: 1320, collected: false },
    { id: 8, xPos: 1440, collected: false },
    { id: 9, xPos: 1750, collected: false },
    { id: 10, xPos: 1950, collected: false },
    { id: 11, xPos: 2350, collected: false },
    { id: 12, xPos: 2520, collected: false },
    { id: 13, xPos: 2800, collected: false },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Jump handler
  const handleJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    sounds.playJump();
    setTimeout(() => {
      setIsJumping(false);
    }, 450);
  };

  // Move left
  const moveLeft = (amount: number = 40) => {
    setFacingLeft(true);
    setIsWalking(true);
    sounds.playStep();
    setPlayerX((prev) => Math.max(80, prev - amount));
  };

  // Move right
  const moveRight = (amount: number = 40) => {
    setFacingLeft(false);
    setIsWalking(true);
    sounds.playStep();
    setPlayerX((prev) => Math.min(WORLD_WIDTH - 80, prev + amount));
  };

  // Auto walk to active level station
  const walkToActiveLevel = () => {
    const target = allCompleted ? TREASURE_POSITION : LEVEL_POSITIONS[currentLevelIndex];
    setFacingLeft(target < playerX);
    setPlayerX(target);
    sounds.playStep();
  };

  // Camera tracking: keep player centered in viewport
  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const targetScroll = playerX - containerWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [playerX]);

  // Sync player position when active level changes
  useEffect(() => {
    const target = allCompleted ? TREASURE_POSITION : LEVEL_POSITIONS[currentLevelIndex];
    setPlayerX(target - 60);
  }, [currentLevelIndex, completedLevels.length]);

  // Check collision with floating mini stars
  useEffect(() => {
    setMiniStars((stars) =>
      stars.map((s) => {
        if (!s.collected && Math.abs(s.xPos - playerX) < 45) {
          sounds.playStarCollect();
          return { ...s, collected: true };
        }
        return s;
      })
    );
  }, [playerX]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight(45);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft(45);
      } else if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleJump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowLeft', 'a', 'd', 'A', 'D'].includes(e.key)) {
        setIsWalking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Render monster icon at level station
  const renderMonsterAtStation = (key: string, isDefeated: boolean) => {
    if (isDefeated) {
      return (
        <div className="w-18 h-18 rounded-full bg-emerald-100 border-3 border-emerald-400 flex flex-col items-center justify-center shadow-lg animate-pulse">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
          <span className="text-[10px] font-black text-emerald-800">20 GOOD JOBS</span>
        </div>
      );
    }

    switch (key) {
      case 'dusty':
        return <DustyMonster size={85} />;
      case 'goblin':
        return <GoblinMonster size={85} />;
      case 'king-pencil':
        return <KingPencilMonster size={85} />;
      case 'naughty-eraser':
        return <NaughtyEraserMonster size={85} />;
      case 'paper-dragon':
        return <PaperDragonMonster size={95} />;
      default:
        return <DustyMonster size={85} />;
    }
  };

  const allCompleted = completedLevels.length >= 5;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-4 border-amber-400 shadow-2xl bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 select-none">
      {/* Top Exploration & Radar Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-4 py-2 text-white flex flex-col sm:flex-row items-center justify-between gap-2 border-b-2 border-emerald-500">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-xs font-black tracking-wide">
            KORIDOR PETUALANGAN PANJANG (JARAK ANTAR ZONA: ~600m)
          </span>
        </div>

        {/* Mini Radar / Progress Track */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] text-emerald-200 font-bold uppercase">Radar:</span>
          <div className="relative w-full sm:w-56 h-3 bg-emerald-950/80 rounded-full border border-emerald-400/60 overflow-hidden flex items-center">
            {/* Level markers on radar */}
            {LEVEL_POSITIONS.map((pos, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full -translate-x-1/2 ${
                  completedLevels.includes(i) ? 'bg-amber-400' : 'bg-slate-400'
                }`}
                style={{ left: `${(pos / WORLD_WIDTH) * 100}%` }}
              />
            ))}
            {/* Player marker on radar */}
            <div
              className="absolute w-3.5 h-3.5 bg-yellow-300 border border-white rounded-full -translate-x-1/2 shadow"
              style={{ left: `${(playerX / WORLD_WIDTH) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-black text-amber-300">
            {Math.round(playerX)}m / 3000m
          </span>
        </div>
      </div>

      {/* HORIZONTALLY SCROLLABLE 3000px ADVENTURE CORRIDOR */}
      <div
        ref={scrollContainerRef}
        className="relative h-72 sm:h-80 w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none bg-gradient-to-b from-amber-50 to-amber-200"
      >
        {/* Extended 3000px World Container */}
        <div className="relative h-full" style={{ width: `${WORLD_WIDTH}px` }}>
          {/* Top Sky & Windows Background Scenery across 3000px */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-sky-200 via-sky-100 to-amber-100 border-b-2 border-amber-300/60 overflow-hidden">
            {/* Clouds & Sun scattered */}
            <div className="absolute top-3 left-40 text-4xl opacity-80">☁️</div>
            <div className="absolute top-6 left-[650px] text-3xl opacity-75">☁️</div>
            <div className="absolute top-2 left-[1200px] text-4xl opacity-85">☁️</div>
            <div className="absolute top-5 left-[1800px] text-3xl opacity-80">☁️</div>
            <div className="absolute top-3 left-[2400px] text-4xl opacity-90">☀️</div>

            {/* School Wall Notices along the corridor */}
            <div className="absolute bottom-2 left-60 bg-white/80 border border-amber-300 px-3 py-1 rounded-xl shadow-xs text-[11px] font-bold text-amber-900">
              🏫 SDIT BINA INSAN CENDEKIA • WING KELAS 2
            </div>
            <div className="absolute bottom-2 left-[780px] bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-xl shadow-xs text-[11px] font-bold text-emerald-900">
              📖 "Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengamalkannya"
            </div>
            <div className="absolute bottom-2 left-[1380px] bg-sky-100/90 border border-sky-300 px-3 py-1 rounded-xl shadow-xs text-[11px] font-bold text-sky-900">
              🌟 ENGLISH ZONE: IN • ON • UNDER • BESIDE • BEHIND • BETWEEN
            </div>
            <div className="absolute bottom-2 left-[1980px] bg-purple-100/90 border border-purple-300 px-3 py-1 rounded-xl shadow-xs text-[11px] font-bold text-purple-900">
              💡 RAPI & BERSIH: LETAKKAN BENDA DI TEMPATNYA!
            </div>
            <div className="absolute bottom-2 left-[2550px] bg-amber-200/90 border border-amber-400 px-3 py-1 rounded-xl shadow-xs text-[11px] font-black text-amber-950">
              👑 GERBANG HARTA KARUN UTAMA USTADZAH SHOFA
            </div>
          </div>

          {/* School Corridor Scenery Props between levels */}
          {/* Potted plants, lockers, bookshelves placed at intervals */}
          <div className="absolute bottom-16 left-[220px] text-3xl">🪴</div>
          <div className="absolute bottom-16 left-[620px] text-4xl">🗄️</div>
          <div className="absolute bottom-16 left-[720px] text-3xl">📚</div>
          <div className="absolute bottom-16 left-[1220px] text-4xl">🪴</div>
          <div className="absolute bottom-16 left-[1320px] text-3xl">🪑</div>
          <div className="absolute bottom-16 left-[1820px] text-4xl">🔬</div>
          <div className="absolute bottom-16 left-[1950px] text-3xl">🪴</div>
          <div className="absolute bottom-16 left-[2420px] text-4xl">🏆</div>

          {/* Floor Tiled Ground */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-amber-300 to-amber-200 border-t-4 border-amber-400">
            <div className="w-full h-full opacity-20 flex">
              {Array.from({ length: 120 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-amber-800 h-full" />
              ))}
            </div>
          </div>

          {/* Floating Collectible Mini Stars */}
          {miniStars.map((star) => (
            <div
              key={star.id}
              className={`absolute bottom-24 transition-all duration-300 ${
                star.collected ? 'opacity-0 scale-150' : 'opacity-100 animate-bounce'
              }`}
              style={{ left: `${star.xPos}px` }}
            >
              <div className="w-7 h-7 rounded-full bg-amber-400/95 border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-xs">⭐</span>
              </div>
            </div>
          ))}

          {/* 5 LEVEL CHECKPOINT STATIONS (SPACED ~600px APART) */}
          {levels.map((level, idx) => {
            const stationX = LEVEL_POSITIONS[idx];
            const isCurrent = currentLevelIndex === idx;
            const isDone = completedLevels.includes(idx);
            const isLocked = !isDone && idx > currentLevelIndex;

            return (
              <div
                key={level.id}
                className="absolute bottom-16 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${stationX}px` }}
              >
                {/* Station Banner */}
                <div
                  className={`mb-2 px-3 py-1 rounded-full text-xs font-black shadow-md transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-300 scale-110 animate-pulse'
                      : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  Level {level.id} • {level.enemyName}
                </div>

                {/* Monster Encounter Station */}
                <button
                  onClick={() => {
                    if (!isLocked) {
                      onEncounterMonster(idx);
                    }
                  }}
                  disabled={isLocked}
                  className={`relative group transition-all transform cursor-pointer ${
                    isCurrent ? 'scale-105' : 'hover:scale-105'
                  } ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                  title={level.zoneTitle}
                >
                  {renderMonsterAtStation(level.enemyIllustrationKey, isDone)}

                  {/* Swords indicator if active */}
                  {isCurrent && !isDone && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce whitespace-nowrap">
                      <Swords className="w-3.5 h-3.5" />
                      <span>Lawan 3 Soal!</span>
                    </div>
                  )}
                </button>

                {/* Pedestal */}
                <div className="w-20 h-3.5 bg-amber-400 rounded-full border-2 border-amber-600 mt-1 shadow-sm" />
                <div className="text-[10px] font-bold text-amber-800 mt-0.5">
                  Pos: {stationX}m
                </div>
              </div>
            );
          })}

          {/* FINAL TREASURE CHEST AT THE END (2880px) */}
          <div
            className="absolute bottom-16 flex flex-col items-center -translate-x-1/2"
            style={{ left: `${TREASURE_POSITION}px` }}
          >
            <div
              className={`mb-1 px-3 py-1 rounded-full text-xs font-black shadow ${
                allCompleted
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 ring-4 ring-yellow-300 animate-bounce'
                  : 'bg-slate-400 text-white'
              }`}
            >
              👑 PETI 100 STARS USTADZAH SHOFA
            </div>

            <button
              onClick={() => {
                if (allCompleted) {
                  onOpenTreasure();
                }
              }}
              disabled={!allCompleted}
              className={`transition-all transform ${
                allCompleted
                  ? 'cursor-pointer hover:scale-110 active:scale-95 animate-pulse'
                  : 'opacity-70 grayscale cursor-not-allowed'
              }`}
              title="Peti Harta Karun Utama 100 Good Job"
            >
              <TreasureChestIllustration isOpen={allCompleted} size={120} />
            </button>

            <div className="w-24 h-4 bg-amber-500 rounded-full border-2 border-amber-600 mt-1 shadow" />
          </div>

          {/* ANIMATED PLAYER CHARACTER */}
          <div
            className={`absolute bottom-16 transition-all duration-150 -translate-x-1/2 z-20 ${
              isJumping ? '-translate-y-16' : 'translate-y-0'
            }`}
            style={{
              left: `${playerX}px`,
              transform: `translateX(-50%) ${facingLeft ? 'scaleX(-1)' : 'scaleX(1)'}`,
            }}
          >
            <div className="relative">
              {playerProfile.gender === 'girl' ? (
                <StudentGirlAvatar size={75} />
              ) : (
                <StudentBoyAvatar size={75} />
              )}
              {isWalking && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full animate-ping" />
                </div>
              )}
            </div>

            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900/85 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap shadow border border-white/50"
              style={{ transform: `translateX(-50%) ${facingLeft ? 'scaleX(-1)' : 'scaleX(1)'}` }}
            >
              {playerProfile.name || 'Bintang'}
            </div>
          </div>
        </div>
      </div>

      {/* KID-FRIENDLY CONTROLS & FAST NAVIGATION BAR */}
      <div className="bg-white/95 backdrop-blur-sm border-t-2 border-amber-200 p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Navigation Buttons for Touch & Click */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => moveLeft(70)}
            className="w-12 h-12 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white flex items-center justify-center shadow-md border-b-4 border-sky-700 cursor-pointer"
            title="Jalan Kiri"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={() => moveRight(70)}
            className="w-12 h-12 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white flex items-center justify-center shadow-md border-b-4 border-sky-700 cursor-pointer"
            title="Jalan Kanan"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <button
            onClick={handleJump}
            className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-md border-b-4 border-amber-700 cursor-pointer"
            title="Lompat"
          >
            <ArrowUp className="w-7 h-7" />
          </button>

          {/* Quick Walk to Active Level Station button */}
          <button
            onClick={walkToActiveLevel}
            className="hidden sm:flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-black px-3 py-2.5 rounded-xl border border-sky-300 cursor-pointer transition-colors"
            title="Langsung berjalan ke lokasi musuh aktif"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>Menuju Pos Musuh Level {currentLevelIndex + 1}</span>
          </button>
        </div>

        {/* Direct Action Quick Launch */}
        <div className="flex items-center gap-2">
          {!allCompleted ? (
            <button
              onClick={() => onEncounterMonster(currentLevelIndex)}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 active:scale-95 text-white font-extrabold text-sm sm:text-base px-5 py-2.5 rounded-2xl shadow-lg border-b-4 border-rose-700 cursor-pointer animate-pulse"
            >
              <Swords className="w-4 h-4" />
              <span>Tantang Musuh Level {currentLevelIndex + 1} (3 Soal)!</span>
            </button>
          ) : (
            <button
              onClick={onOpenTreasure}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 active:scale-95 text-amber-950 font-black text-sm sm:text-base px-5 py-2.5 rounded-2xl shadow-lg border-b-4 border-amber-700 cursor-pointer animate-bounce"
            >
              <span>🎉 Buka Peti Harta Karun 100 Good Job!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
