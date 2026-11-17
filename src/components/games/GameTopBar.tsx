import React from 'react';
import { Home, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../../utils/sound';

interface GameTopBarProps {
  title: string;
  subtitle?: string;
  progressText?: string;
  scoreText?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onBack: () => void;
  onHome: () => void;
}

export const GameTopBar: React.FC<GameTopBarProps> = ({
  title,
  subtitle,
  progressText,
  scoreText,
  isMuted,
  onToggleMute,
  onBack,
  onHome,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-sky-200 px-3 sm:px-6 py-2.5 shadow-xs sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: HOME & BACK */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              onHome();
            }}
            className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-sm border-b-3 border-pink-700 cursor-pointer transition-all whitespace-nowrap shrink-0"
            title="Kembali ke Dashboard"
          >
            <Home className="w-4 h-4" />
            <span>HOME</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="flex items-center gap-1 bg-sky-100 hover:bg-sky-200 active:scale-95 text-sky-800 font-extrabold text-xs sm:text-sm px-3 py-2 rounded-2xl border border-sky-300 cursor-pointer transition-all whitespace-nowrap shrink-0"
            title="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">BACK</span>
          </button>
        </div>

        {/* Center: Game Title */}
        <div className="text-center min-w-0 px-2">
          <h1 className="text-sm sm:text-lg font-black text-sky-900 font-display truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-semibold truncate hidden md:block">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: Progress / Score & Mute */}
        <div className="flex items-center gap-2 shrink-0">
          {progressText && (
            <span className="bg-yellow-100 text-amber-900 border border-yellow-300 px-3 py-1 rounded-xl text-xs sm:text-sm font-black tabular-nums whitespace-nowrap">
              {progressText}
            </span>
          )}
          {scoreText && (
            <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl text-xs sm:text-sm font-black tabular-nums whitespace-nowrap">
              {scoreText}
            </span>
          )}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Nyalakan suara' : 'Matikan suara'}
            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
              isMuted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
