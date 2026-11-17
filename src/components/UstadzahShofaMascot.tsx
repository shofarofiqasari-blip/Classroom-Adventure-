import React, { useState, useEffect } from 'react';
import { RotateCcw, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import trophyImg from '../assets/images/celebration_trophy_3d_1794879321125.jpg';
import clappingImg from '../assets/images/ustadzah_shofa_clapping_1794889358292.jpg';
import thumbsupImg from '../assets/images/ustadzah_shofa_thumbsup_1794889358999.jpg';
import happyImg from '../assets/images/ustadzah_shofa_happy_1794889359718.jpg';

export type MascotMood = 'auto' | 'default' | 'clapping' | 'thumbsup' | 'happy';

export const MASCOT_POSES: Record<Exclude<MascotMood, 'auto'>, string> = {
  default: '/assets/aistudio/file_000000001f7c82079f83b9f29c0125dd_7712509b.webp',
  clapping: clappingImg,
  thumbsup: thumbsupImg,
  happy: happyImg,
};

const AUTO_CYCLE_POSES: Exclude<MascotMood, 'auto'>[] = [
  'default',
  'happy',
  'thumbsup',
  'clapping',
];

const POSE_REACTION_ICON: Record<Exclude<MascotMood, 'auto'>, string> = {
  default: '👋',
  clapping: '👏',
  thumbsup: '👍',
  happy: '🌟',
};

interface UstadzahShofaMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  className?: string;
  showBadge?: boolean;
  mood?: MascotMood;
}

export const UstadzahShofaMascot: React.FC<UstadzahShofaMascotProps> = ({
  size = 'md',
  message,
  className = '',
  showBadge = false,
  mood = 'auto',
}) => {
  const [imgError, setImgError] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (mood !== 'auto') return;
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % AUTO_CYCLE_POSES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [mood]);

  const activePose: Exclude<MascotMood, 'auto'> =
    mood === 'auto' ? AUTO_CYCLE_POSES[cycleIndex] : mood;
  const activeSrc = MASCOT_POSES[activePose];
  const reactionIcon = POSE_REACTION_ICON[activePose];

  const sizeMap = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-44 h-44 sm:w-56 sm:h-56',
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0 animate-mascot-wave">
        <div
          className={`${sizeMap[size]} rounded-3xl overflow-hidden border-4 border-white shadow-[0_10px_28px_rgba(56,189,248,0.28)] bg-gradient-to-b from-sky-100 to-pink-50 flex items-center justify-center`}
        >
          {!imgError ? (
            <img
              key={activePose}
              src={activeSrc}
              alt="Ustadzah Shofa - Guru Bahasa Inggris SDIT Bina Insan Cendekia"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top animate-fade-in"
            />
          ) : (
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle cx="60" cy="60" r="56" fill="#e0f2fe" />
              <path d="M 28,60 C 24,110 96,110 92,60 C 92,20 28,20 28,60 Z" fill="#7dd3fc" />
              <ellipse cx="60" cy="54" rx="21" ry="23" fill="#fed7aa" />
              <circle cx="51" cy="52" r="3" fill="#1e293b" />
              <circle cx="69" cy="52" r="3" fill="#1e293b" />
              <path d="M 54,64 Q 60,70 66,64" stroke="#9a3412" strokeWidth="2.5" fill="none" />
              {/* Flower brooch below ear */}
              <circle cx="76" cy="74" r="6" fill="#f472b6" />
              <circle cx="76" cy="74" r="2.5" fill="#fde047" />
              <path d="M 30,96 Q 60,82 90,96 L 90,120 L 30,120 Z" fill="#f9a8d4" />
            </svg>
          )}
        </div>

        {/* Dynamic Expression Reaction Bubble */}
        <span
          key={`react-${activePose}`}
          className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-300 border-2 border-white shadow-md flex items-center justify-center text-sm sm:text-base animate-bounce"
        >
          {reactionIcon}
        </span>

        {showBadge && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-pink-400 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap border-2 border-white">
            Ustadzah Shofa
          </div>
        )}
      </div>

      {message && (
        <div className="relative bg-white/95 border-2 border-sky-200 rounded-2xl px-4 py-2.5 shadow-md text-xs sm:text-sm font-bold text-slate-700 leading-snug max-w-sm">
          {message}
        </div>
      )}
    </div>
  );
};

interface BarakallahCelebrationProps {
  title?: string;
  scoreText?: string;
  onReplay: () => void;
  onHome: () => void;
}

export const BarakallahCelebration: React.FC<BarakallahCelebrationProps> = ({
  title = 'Mission Complete!',
  scoreText,
  onReplay,
  onHome,
}) => {
  const [trophyError, setTrophyError] = useState(false);

  React.useEffect(() => {
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.55 },
      colors: ['#38bdf8', '#f472b6', '#facc15', '#ffffff', '#34d399'],
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-[2rem] border-4 border-yellow-300 shadow-2xl overflow-hidden text-center p-6 sm:p-8 space-y-5 relative">
        <div className="flex items-center justify-center gap-4">
          <UstadzahShofaMascot size="md" mood="clapping" />
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-yellow-200 bg-gradient-to-b from-sky-50 to-pink-50 shadow-md flex items-center justify-center">
            {!trophyError ? (
              <img
                src={trophyImg}
                alt="3D Golden Star Trophy"
                referrerPolicy="no-referrer"
                onError={() => setTrophyError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🏆</span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
            {title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-pink-500 font-display tracking-wide animate-praise-pop">
            BARAKALLAH!
          </h2>
          <p className="text-xl sm:text-2xl font-black text-sky-700 font-display">
            YOU ARE AMAZING!
          </p>
          <p className="text-base sm:text-lg font-extrabold text-amber-500 font-display">
            KEEP UP THE GREAT WORK!
          </p>
        </div>

        {scoreText && (
          <div className="inline-flex items-center gap-2 bg-yellow-50 border-2 border-yellow-300 px-4 py-2 rounded-2xl text-sm font-extrabold text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{scoreText}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onReplay}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-95 text-white font-black py-3.5 px-5 rounded-2xl shadow-lg border-b-4 border-sky-700 cursor-pointer transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN</span>
          </button>
          <button
            onClick={onHome}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 active:scale-95 text-white font-black py-3.5 px-5 rounded-2xl shadow-lg border-b-4 border-pink-700 cursor-pointer transition-all"
          >
            <Home className="w-5 h-5" />
            <span>HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
