import React from 'react';
import { Star, Volume2, VolumeX, BookOpen, User, RotateCcw, Award, Home } from 'lucide-react';
import { PlayerProfile } from '../types/game';

interface NavbarProps {
  totalStars: number;
  currentLevelIndex: number;
  totalLevels: number;
  playerProfile: PlayerProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenKamus: () => void;
  onOpenProfile: () => void;
  onOpenCertificate?: () => void;
  onReset: () => void;
  onHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalStars,
  playerProfile,
  isMuted,
  onToggleMute,
  onOpenKamus,
  onOpenProfile,
  onOpenCertificate,
  onReset,
  onHome,
}) => {
  const progressPercent = Math.min(100, Math.round((totalStars / 100) * 100));

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-sky-200 sticky top-0 z-40 shadow-xs px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Teacher/Student Intro */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            {onHome && (
              <button
                onClick={onHome}
                className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 active:scale-95 text-sky-800 border-2 border-sky-300 px-3 py-2 rounded-2xl font-black text-xs cursor-pointer transition-all"
                title="Kembali ke Dashboard CLASSROOM ADVENTURE"
              >
                <Home className="w-4 h-4" />
                <span>HOME</span>
              </button>
            )}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-xl shadow-md border-2 border-white">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-slate-800 tracking-tight leading-tight">
                  The Treasure of 100 Good Jobs
                </h1>
                <span className="hidden sm:inline-block bg-sky-100 text-sky-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-sky-200">
                  SDIT BIC • Fase A
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                <span>Guru: <strong>Ustadzah Shofa</strong></span>
                <span>•</span>
                <button
                  onClick={onOpenProfile}
                  className="text-sky-600 hover:text-sky-700 underline cursor-pointer"
                  title="Ganti nama atau avatar siswa"
                >
                  Siswa: {playerProfile.name}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                isMuted
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
              title={isMuted ? 'Suara Senyap' : 'Suara Aktif'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenKamus}
              className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Buka Kamus Mini"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Good Jobs Stars Counter & Progress Bar */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl shadow-xs">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
            <div>
              <div className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider">
                Bintang Good Job
              </div>
              <div className="text-base sm:text-lg font-black text-amber-950 leading-none">
                {totalStars} <span className="text-xs text-amber-700">/ 100</span>
              </div>
            </div>
            <div className="w-20 sm:w-28 bg-amber-200 h-2.5 rounded-full overflow-hidden ml-1 border border-amber-300">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenKamus}
              className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-black px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-all"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Kamus Ceria</span>
            </button>

            {totalStars >= 100 && onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 border border-amber-500 text-xs font-black px-3 py-2 rounded-xl shadow cursor-pointer animate-bounce"
              >
                <Award className="w-4 h-4" />
                <span>E-Sertifikat</span>
              </button>
            )}

            <button
              onClick={onOpenProfile}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
              title="Ubah Profil Siswa"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleMute}
              className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                isMuted
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
              title={isMuted ? 'Nyalakan Efek Suara' : 'Senyapkan Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 border border-slate-200 cursor-pointer transition-colors"
              title="Mulai Ulang Petualangan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
