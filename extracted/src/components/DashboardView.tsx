import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, User, Sparkles, Play } from 'lucide-react';
import { UstadzahShofaMascot } from './UstadzahShofaMascot';
import { ClassroomObject3D, PositionScene3D } from './Objects3D';
import { PlayerProfile } from '../types/game';
import { sounds } from '../utils/sound';
import classroomBg3d from '../assets/images/classroom_dashboard_3d_1794881209933.jpg';

export type ActiveGameView =
  | 'dashboard'
  | 'learn'
  | 'explore'
  | 'airplane'
  | 'pencil-path'
  | 'find-object'
  | 'where-is-it'
  | 'quiz'
  | 'treasure-adventure';

interface DashboardViewProps {
  playerProfile: PlayerProfile;
  treasureStars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectMenu: (view: ActiveGameView) => void;
  onOpenKamus: () => void;
  onOpenProfile: () => void;
}

const ENCOURAGEMENTS = [
  "LET'S PLAY!",
  "READY, SET, GO!",
  "LET'S HAVE FUN!",
  "WELCOME TO OUR ADVENTURE!",
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  playerProfile,
  treasureStars,
  isMuted,
  onToggleMute,
  onSelectMenu,
  onOpenKamus,
  onOpenProfile,
}) => {
  const [mottoIndex, setMottoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMottoIndex((prev) => (prev + 1) % ENCOURAGEMENTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleOpenMenu = (view: ActiveGameView) => {
    sounds.playClick();
    onSelectMenu(view);
  };

  const menus: Array<{
    id: ActiveGameView;
    number: string;
    title: string;
    subtitle: string;
    tag: string;
    cardBg: string;
    badgeBg: string;
    glowBg: string;
    illustration: React.ReactNode;
  }> = [
    {
      id: 'learn',
      number: '1',
      title: "LET'S LEARN",
      subtitle: '11 Benda & 6 Posisi',
      tag: 'AUDIO',
      cardBg: 'from-sky-50/90 to-white/95 border-sky-300 hover:border-sky-400',
      badgeBg: 'bg-sky-500 text-white',
      glowBg: 'bg-sky-200/60',
      illustration: (
        <div className="relative flex items-center justify-center gap-1">
          <span className="absolute -top-2 -left-2 text-xs sm:text-sm font-black text-sky-500 animate-twinkle">
            ABC
          </span>
          <div className="animate-icon-bob [&>svg]:h-11 [&>svg]:w-11 sm:[&>svg]:h-14 sm:[&>svg]:w-14 lg:[&>svg]:h-16 lg:[&>svg]:w-16">
            <ClassroomObject3D objectId="BOOK" size={64} />
          </div>
          <div
            className="animate-icon-wiggle [&>svg]:h-9 [&>svg]:w-9 sm:[&>svg]:h-12 sm:[&>svg]:w-12 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            style={{ animationDelay: '0.4s' }}
          >
            <ClassroomObject3D objectId="CHALK" size={56} />
          </div>
          <span className="absolute -bottom-1 -right-2 text-sm animate-bounce">🔊</span>
        </div>
      ),
    },
    {
      id: 'explore',
      number: '2',
      title: "LET'S EXPLORE",
      subtitle: 'Ruang Kelas & Uji Posisi',
      tag: '3D ROOM',
      cardBg: 'from-pink-50/90 to-white/95 border-pink-300 hover:border-pink-400',
      badgeBg: 'bg-pink-500 text-white',
      glowBg: 'bg-pink-200/60',
      illustration: (
        <div className="relative flex items-center justify-center gap-1">
          <span className="absolute -top-2 -right-2 text-xs sm:text-sm animate-twinkle">✨</span>
          <div className="animate-icon-wiggle [&>svg]:h-11 [&>svg]:w-11 sm:[&>svg]:h-14 sm:[&>svg]:w-14 lg:[&>svg]:h-16 lg:[&>svg]:w-16">
            <ClassroomObject3D objectId="GLOBE" size={64} />
          </div>
          <div
            className="animate-icon-bob [&>svg]:h-10 [&>svg]:w-10 sm:[&>svg]:h-13 sm:[&>svg]:w-13 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            style={{ animationDelay: '0.5s' }}
          >
            <ClassroomObject3D objectId="CUPBOARD" size={60} />
          </div>
        </div>
      ),
    },
    {
      id: 'airplane',
      number: '3',
      title: 'AIRPLANE ADVENTURE',
      subtitle: 'Terbang Tangkap Awan Kata',
      tag: '11 RONDE',
      cardBg: 'from-yellow-50/90 to-white/95 border-yellow-300 hover:border-amber-400',
      badgeBg: 'bg-amber-500 text-white',
      glowBg: 'bg-yellow-200/70',
      illustration: (
        <div className="relative flex items-center justify-center">
          <span className="absolute -left-3 -top-2 text-base sm:text-lg opacity-80 animate-float-drift">
            ☁️
          </span>
          <span className="absolute -right-3 bottom-0 text-sm sm:text-base opacity-80 animate-float-slow">
            ☁️
          </span>
          <svg
            viewBox="0 0 110 70"
            className="w-16 h-11 sm:w-20 sm:h-14 lg:w-24 lg:h-16 drop-shadow-md animate-plane-fly"
          >
            {/* Wind trail lines */}
            <line x1="2" y1="30" x2="14" y2="30" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="42" x2="12" y2="42" stroke="#f9a8d4" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="55" cy="38" rx="33" ry="13" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M 19,34 L 9,16 L 31,28 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            <path d="M 46,35 L 34,58 L 62,40 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 52,25 L 40,8 L 66,25 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="72" cy="35" r="5.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <circle cx="56" cy="36" r="4" fill="#ffffff" />
            {/* Spinning nose propeller */}
            <ellipse cx="90" cy="38" rx="2.5" ry="11" fill="#fb7185" opacity="0.85" />
            <circle cx="89" cy="38" r="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </svg>
        </div>
      ),
    },
    {
      id: 'pencil-path',
      number: '4',
      title: 'PENCIL PATH',
      subtitle: 'Labirin Jalan Pensil',
      tag: 'MAZE',
      cardBg: 'from-emerald-50/90 to-white/95 border-emerald-300 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500 text-white',
      glowBg: 'bg-emerald-200/60',
      illustration: (
        <div className="relative flex items-center justify-center gap-1.5">
          <div className="animate-pencil-sketch [&>svg]:h-11 [&>svg]:w-11 sm:[&>svg]:h-14 sm:[&>svg]:w-14">
            <ClassroomObject3D objectId="PENCIL" size={56} />
          </div>
          <div className="grid grid-cols-3 gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-emerald-100 rounded-xl border border-emerald-300 shadow-2xs">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-white" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-emerald-400" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-white" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-white" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-white" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-emerald-400" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-emerald-400" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-white" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-yellow-400 animate-pulse" />
          </div>
        </div>
      ),
    },
    {
      id: 'find-object',
      number: '5',
      title: 'FIND THE OBJECT',
      subtitle: 'Cari 9 Benda di Kelas',
      tag: '9 MISI',
      cardBg: 'from-sky-50/90 to-white/95 border-sky-300 hover:border-sky-400',
      badgeBg: 'bg-sky-600 text-white',
      glowBg: 'bg-sky-200/60',
      illustration: (
        <div className="relative flex items-center justify-center">
          <div className="animate-icon-bob [&>svg]:h-12 [&>svg]:w-12 sm:[&>svg]:h-14 sm:[&>svg]:w-14 lg:[&>svg]:h-16 lg:[&>svg]:w-16">
            <ClassroomObject3D objectId="BLACKBOARD" size={64} />
          </div>
          <div className="absolute -bottom-1 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-300 border-2 border-white shadow-md flex items-center justify-center text-xs sm:text-sm animate-magnify-scan">
            🔍
          </div>
          <span className="absolute -top-2 -left-2 text-xs animate-twinkle">✨</span>
        </div>
      ),
    },
    {
      id: 'where-is-it',
      number: '6',
      title: 'WHERE IS IT?',
      subtitle: 'Tebak 6 Posisi Benda',
      tag: 'POSISI',
      cardBg: 'from-pink-50/90 to-white/95 border-pink-300 hover:border-pink-400',
      badgeBg: 'bg-pink-500 text-white',
      glowBg: 'bg-pink-200/60',
      illustration: (
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-11 sm:w-24 sm:h-14 lg:w-28 lg:h-16 rounded-xl overflow-hidden border border-sky-200 bg-sky-50 flex items-center justify-center">
            <div className="scale-[0.34] sm:scale-[0.42] origin-center w-56 animate-icon-bob">
              <PositionScene3D position="ON" subject="GLOBE" anchor="TABLE" className="!h-36 !border-0" />
            </div>
          </div>
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow animate-bounce">
            ?
          </span>
        </div>
      ),
    },
    {
      id: 'quiz',
      number: '7',
      title: 'QUIZ TIME',
      subtitle: 'Tantangan Kuis Acak',
      tag: 'QUIZ',
      cardBg: 'from-yellow-50/90 to-white/95 border-yellow-300 hover:border-amber-400',
      badgeBg: 'bg-amber-500 text-white',
      glowBg: 'bg-yellow-200/70',
      illustration: (
        <div className="relative flex items-center justify-center gap-1">
          <span className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-md animate-icon-bob">
            🏆
          </span>
          <span className="text-2xl sm:text-3xl animate-twinkle">⭐</span>
          <span
            className="absolute -top-2 -left-2 text-xs sm:text-sm animate-twinkle"
            style={{ animationDelay: '0.8s' }}
          >
            ✨
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative flex flex-col p-2 sm:p-3 lg:p-4 select-none bg-sky-100">
      {/* 3D Cartoon Classroom Full-Bleed Learning Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src={classroomBg3d}
          alt="Latar Ruang Kelas 3D"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
        {/* Soft pastel scrim so foreground cards pop clearly while 3D classroom shines through */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/55 via-white/35 to-pink-100/55 backdrop-blur-[1.5px]" />
      </div>

      {/* Subtle Floating Learning Ornaments */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-4 left-[8%] text-2xl sm:text-3xl opacity-75 animate-float-drift">☁️</div>
        <div className="absolute top-8 right-[12%] text-2xl sm:text-3xl opacity-75 animate-float-slow">☁️</div>
        <div className="absolute bottom-6 left-[4%] text-xl sm:text-2xl opacity-80 animate-balloon">🎈</div>
        <div className="absolute bottom-8 right-[5%] text-xl sm:text-2xl opacity-80 animate-twinkle">⭐</div>
      </div>

      {/* Main Container locked to 1 viewport with ZERO scroll */}
      <div className="relative z-10 max-w-7xl w-full h-full mx-auto flex flex-col justify-between gap-2 sm:gap-2.5 lg:gap-3 min-h-0">
        {/* Compact Top Bar */}
        <header className="bg-white/90 backdrop-blur-md border-2 border-white shadow-[0_6px_20px_rgba(14,165,233,0.18)] rounded-2xl sm:rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-400 to-pink-400 flex items-center justify-center text-white text-base sm:text-lg shadow-sm border-2 border-white shrink-0 animate-icon-wiggle">
              🎓
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-base lg:text-lg font-black font-display tracking-tight text-sky-900 leading-none truncate">
                CLASSROOM ADVENTURE
              </h1>
              <p className="text-[9px] sm:text-[11px] font-extrabold text-pink-500 mt-0.5 truncate">
                SDIT BINA INSAN CENDEKIA • Kelas 2 SD (Fase A)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenKamus();
              }}
              className="flex items-center gap-1 bg-sky-50 hover:bg-sky-100 active:scale-95 text-sky-800 border-2 border-sky-200 font-extrabold text-[11px] sm:text-xs px-2.5 py-1.5 rounded-xl sm:rounded-2xl cursor-pointer transition-all min-h-[36px] sm:min-h-[40px]"
              title="Buka Kamus Mini"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
              <span className="hidden sm:inline">Kamus Mini</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenProfile();
              }}
              className="flex items-center gap-1 bg-pink-50 hover:bg-pink-100 active:scale-95 text-pink-700 border-2 border-pink-200 font-extrabold text-[11px] sm:text-xs px-2.5 py-1.5 rounded-xl sm:rounded-2xl cursor-pointer transition-all min-h-[36px] sm:min-h-[40px]"
              title="Ubah Profil Siswa"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="max-w-[70px] sm:max-w-[110px] truncate">{playerProfile.name}</span>
            </button>

            <button
              onClick={onToggleMute}
              className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
                isMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
              title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Compact Ustadzah Shofa Mascot Banner */}
        <section className="bg-white/90 backdrop-blur-md border-2 sm:border-3 border-white rounded-2xl sm:rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_8px_24px_rgba(14,165,233,0.18)] flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <UstadzahShofaMascot size="sm" />
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1 bg-yellow-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700 animate-spin" style={{ animationDuration: '5s' }} />
                <span key={mottoIndex} className="animate-fade-in">
                  {ENCOURAGEMENTS[mottoIndex]}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm font-extrabold text-slate-700 leading-tight mt-0.5 truncate sm:whitespace-normal">
                Halo <span className="text-pink-500">{playerProfile.name}</span>! Pilih permainan bersama{' '}
                <span className="text-sky-600">Ustadzah Shofa</span>:
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-extrabold shrink-0">
            <span className="bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-2xl">
              11 Classroom Objects
            </span>
            <span className="bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1 rounded-2xl">
              6 Positions
            </span>
          </div>
        </section>

        {/* ALL 7 MAIN MENUS + 100 GOOD JOBS IN 1 SINGLE SCREEN (NO SCROLL) */}
        <section className="flex-1 min-h-0 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-2.5 lg:gap-3.5">
          {menus.map((menu, idx) => (
            <button
              key={menu.id}
              onClick={() => handleOpenMenu(menu.id)}
              className="group relative h-full min-h-0 rounded-2xl sm:rounded-3xl p-[3px] shadow-[0_8px_22px_rgba(14,165,233,0.18)] hover:shadow-[0_14px_30px_rgba(251,146,60,0.34)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] transition-all cursor-pointer overflow-hidden"
            >
              {/* Rotating Luminous Border Sweep */}
              <span
                className={`pointer-events-none absolute top-1/2 left-1/2 w-[220%] h-[220%] animate-orbit-light opacity-85 group-hover:opacity-100 ${
                  idx % 2 === 0
                    ? 'bg-[conic-gradient(from_0deg,_#38bdf8_0deg,_#ffffff_65deg,_#fb923c_140deg,_#f472b6_220deg,_#fde047_295deg,_#38bdf8_360deg)]'
                    : 'bg-[conic-gradient(from_120deg,_#fb923c_0deg,_#fde047_75deg,_#ffffff_145deg,_#38bdf8_225deg,_#f472b6_300deg,_#fb923c_360deg)]'
                }`}
              />

              {/* Inner Card Surface */}
              <div
                className={`relative z-10 w-full h-full rounded-[13px] sm:rounded-[21px] bg-gradient-to-b ${menu.cardBg} border border-white/80 backdrop-blur-md p-2 sm:p-3 flex flex-col items-center justify-between text-center overflow-hidden`}
              >
                {/* Rotating soft light beam inside card behind icon */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full animate-orbit-light opacity-35 blur-md bg-[conic-gradient(from_0deg,_#38bdf8,_#fb923c,_#f472b6,_#fde047,_#38bdf8)]" />
                <div
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${menu.glowBg} blur-md opacity-70 group-hover:scale-125 transition-transform`}
                />

                {/* Top Row: Number & Fun Tag */}
                <div className="relative z-10 w-full flex items-center justify-between shrink-0">
                  <span
                    className={`w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl ${menu.badgeBg} font-black text-[10px] sm:text-xs flex items-center justify-center shadow-xs`}
                  >
                    {menu.number}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-black text-orange-600 bg-white/95 border border-orange-200 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs">
                    <Play className="w-2.5 h-2.5 fill-current text-pink-500" />
                    <span>{menu.tag}</span>
                  </span>
                </div>

                {/* Animated 3D Cartoon Illustration */}
                <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {menu.illustration}
                </div>

                {/* Menu Title & Subtitle */}
                <div className="relative z-10 w-full shrink-0">
                  <div className="text-[11px] sm:text-sm lg:text-base font-black text-slate-800 font-display tracking-tight leading-tight truncate">
                    {menu.title}
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-bold text-slate-600 leading-tight truncate">
                    {menu.subtitle}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* 8th card: 100 Good Jobs Adventure */}
          <button
            onClick={() => handleOpenMenu('treasure-adventure')}
            className="group relative h-full min-h-0 rounded-2xl sm:rounded-3xl p-[3px] shadow-[0_8px_22px_rgba(245,158,11,0.24)] hover:shadow-[0_14px_30px_rgba(251,146,60,0.4)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] transition-all cursor-pointer overflow-hidden"
          >
            {/* Rotating Golden-Orange Luminous Border */}
            <span className="pointer-events-none absolute top-1/2 left-1/2 w-[220%] h-[220%] animate-orbit-light opacity-95 bg-[conic-gradient(from_45deg,_#facc15_0deg,_#fb923c_85deg,_#ffffff_150deg,_#f472b6_225deg,_#38bdf8_295deg,_#facc15_360deg)]" />

            <div className="relative z-10 w-full h-full rounded-[13px] sm:rounded-[21px] bg-gradient-to-b from-orange-50/95 via-yellow-50/95 to-white/95 border border-white/80 backdrop-blur-md p-2 sm:p-3 flex flex-col items-center justify-between text-center overflow-hidden">
              <div className="pointer-events-none absolute top-1/2 left-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full animate-orbit-light opacity-40 blur-md bg-[conic-gradient(from_0deg,_#facc15,_#fb923c,_#f472b6,_#facc15)]" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-300/60 blur-md group-hover:scale-125 transition-transform" />

              <div className="relative z-10 w-full flex items-center justify-between shrink-0">
                <span className="px-1.5 sm:px-2 py-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[9px] sm:text-[10px]">
                  BONUS
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-orange-800 bg-white/95 border border-orange-200 px-1.5 py-0.5 rounded-full">
                  {treasureStars}/100 ★
                </span>
              </div>

              <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl sm:text-4xl lg:text-5xl animate-icon-bob drop-shadow-md">
                  👑
                </span>
                <span className="text-lg sm:text-xl animate-twinkle">✨</span>
              </div>

              <div className="relative z-10 w-full shrink-0">
                <div className="text-[11px] sm:text-sm lg:text-base font-black text-orange-950 font-display tracking-tight leading-tight truncate">
                  100 GOOD JOBS
                </div>
                <div className="text-[9px] sm:text-[11px] font-bold text-orange-700 leading-tight truncate">
                  Platformer &amp; Sertifikat
                </div>
              </div>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};
