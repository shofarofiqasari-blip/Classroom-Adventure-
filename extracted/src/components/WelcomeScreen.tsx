import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { UstadzahShofaMascot } from './UstadzahShofaMascot';
import { ClassroomObject3D } from './Objects3D';
import { sounds, speakEnglish } from '../utils/sound';

interface WelcomeScreenProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onStart: () => void;
}

const MOTTOS = [
  "WELCOME TO OUR ADVENTURE!",
  "READY, SET, GO!",
  "LET'S HAVE FUN!",
  "LET'S PLAY!",
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isMuted,
  onToggleMute,
  onStart,
}) => {
  const [mottoIdx, setMottoIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMottoIdx((prev) => (prev + 1) % MOTTOS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    sounds.playCollectWhoosh();
    speakEnglish("Welcome to Classroom Adventure! Let's play!", undefined, 0.88);
    onStart();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-pink-100 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Floating Animated Ornaments */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-8 left-[6%] text-4xl sm:text-5xl opacity-70 animate-float-drift">☁️</div>
        <div className="absolute top-16 right-[10%] text-4xl sm:text-5xl opacity-70 animate-float-slow">☁️</div>
        <div className="absolute top-[22%] left-[12%] text-2xl sm:text-3xl animate-twinkle">⭐</div>
        <div className="absolute top-[28%] right-[8%] text-2xl sm:text-3xl animate-twinkle" style={{ animationDelay: '0.9s' }}>✨</div>
        <div className="absolute bottom-[16%] left-[7%] text-3xl sm:text-4xl animate-balloon">🎈</div>
        <div className="absolute bottom-[12%] right-[9%] text-3xl sm:text-4xl animate-float-slow">📘</div>
        <div className="absolute top-[60%] left-[4%] text-3xl animate-float-slow" style={{ animationDelay: '1.2s' }}>✏️</div>
      </div>

      {/* Top Bar: School Badge & Sound Toggle */}
      <header className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="inline-flex items-center gap-2 bg-white/90 border-2 border-sky-200 px-3.5 py-2 rounded-2xl shadow-sm">
          <span className="text-lg">🏫</span>
          <div>
            <div className="text-xs sm:text-sm font-black text-sky-800 tracking-tight leading-none">
              SDIT BINA INSAN CENDEKIA
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-pink-500">
              Bahasa Inggris • Kelas 2 SD (Fase A)
            </div>
          </div>
        </div>

        <button
          onClick={onToggleMute}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 font-extrabold text-xs cursor-pointer transition-all shadow-sm min-h-[44px] ${
            isMuted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white border-sky-200 text-sky-700 hover:bg-sky-50'
          }`}
          aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{isMuted ? 'Audio Off' : 'Audio On'}</span>
        </button>
      </header>

      {/* Main Welcome Hero */}
      <main className="relative z-10 max-w-6xl w-full mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Ustadzah Shofa 3D Mascot & Greeting */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-300/90 border-2 border-white text-amber-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span key={mottoIdx} className="animate-fade-in">
              {MOTTOS[mottoIdx]}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black font-display tracking-tight leading-tight text-sky-900 drop-shadow-xs">
            CLASSROOM{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-sky-500 to-amber-500">
              ADVENTURE
            </span>
          </h1>

          {/* Mascot + Speech Bubble */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 backdrop-blur-xs border-4 border-white rounded-[2rem] p-4 shadow-[0_14px_34px_rgba(56,189,248,0.22)]">
            <UstadzahShofaMascot size="lg" showBadge />
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-block bg-sky-100 text-sky-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                Guru &amp; Pemandu Belajar
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-700 leading-relaxed">
                &quot;Assalamu&apos;alaikum! Selamat datang di <span className="text-sky-600">CLASSROOM ADVENTURE</span>. Ayo belajar Bahasa Inggris bersama!&quot;
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] font-extrabold">
                <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-xl">
                  11 Classroom Objects
                </span>
                <span className="bg-pink-50 text-pink-600 border border-pink-200 px-2.5 py-1 rounded-xl">
                  6 Positions
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-1 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-sky-400 via-sky-500 to-pink-500 hover:from-sky-500 hover:to-pink-600 active:scale-95 text-white font-black text-xl sm:text-2xl px-9 py-4 rounded-3xl shadow-[0_10px_28px_rgba(14,165,233,0.38)] border-b-4 border-sky-700 cursor-pointer transition-all font-display"
            >
              <Play className="w-7 h-7 fill-current" />
              <span>LET&apos;S PLAY!</span>
            </button>
          </div>
        </div>

        {/* Right: 3D Cartoon Classroom Scene Preview */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-[2.25rem] border-4 border-white bg-gradient-to-b from-sky-200/80 via-sky-50 to-amber-100/90 p-5 sm:p-6 shadow-[0_20px_50px_rgba(14,165,233,0.22)] overflow-hidden">
            {/* Classroom Wall Items Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20">
                <ClassroomObject3D objectId="CLOCK" size={76} className="w-full h-auto" />
              </div>

              {/* Clean 3D Blackboard with exact School & App Title */}
              <div className="flex-1 bg-gradient-to-b from-emerald-800 to-emerald-950 border-4 border-amber-700 rounded-2xl p-3 text-center shadow-lg relative">
                <div className="text-[10px] font-bold text-yellow-200 tracking-wider uppercase">
                  SDIT BINA INSAN CENDEKIA
                </div>
                <div className="text-sm sm:text-base font-black text-white font-display tracking-wide mt-0.5">
                  CLASSROOM ADVENTURE
                </div>
                <div className="text-[10px] text-sky-200 font-bold mt-0.5">
                  Classroom Objects &amp; Positions
                </div>
                {/* Chalk ledge */}
                <div className="mt-2 h-2 bg-amber-800 rounded-full flex items-center justify-center gap-2">
                  <span className="w-4 h-1 bg-white rounded-full" />
                  <span className="w-3 h-1 bg-pink-300 rounded-full" />
                </div>
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20">
                <ClassroomObject3D objectId="CALENDAR" size={76} className="w-full h-auto" />
              </div>
            </div>

            {/* Middle & Floor Row with Canonical 3D Objects */}
            <div className="relative pt-2 pb-1 flex items-end justify-around gap-1">
              <div className="w-16 sm:w-20 animate-float-slow">
                <ClassroomObject3D objectId="CUPBOARD" size={82} className="w-full h-auto" />
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex items-end gap-1 -mb-4 z-10">
                  <div className="w-11 sm:w-12">
                    <ClassroomObject3D objectId="GLOBE" size={48} className="w-full h-auto" />
                  </div>
                  <div className="w-10 sm:w-11">
                    <ClassroomObject3D objectId="BOOK" size={44} className="w-full h-auto" />
                  </div>
                  <div className="w-9 sm:w-10">
                    <ClassroomObject3D objectId="PENCIL" size={40} className="w-full h-auto" />
                  </div>
                </div>
                <div className="w-24 sm:w-28">
                  <ClassroomObject3D objectId="TABLE" size={105} className="w-full h-auto" />
                </div>
              </div>
              <div className="w-14 sm:w-16">
                <ClassroomObject3D objectId="CHAIR" size={68} className="w-full h-auto" />
              </div>
              <div className="w-14 sm:w-16 animate-float-slow" style={{ animationDelay: '0.8s' }}>
                <ClassroomObject3D objectId="BAG" size={64} className="w-full h-auto" />
              </div>
            </div>

            {/* Warm wooden floor */}
            <div className="h-3 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 border border-amber-400/50 mt-1" />
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 text-center text-xs font-bold text-sky-800/80">
        Materi Bahasa Inggris Kelas 2 SD (Fase A) • Guru: Ustadzah Shofa
      </footer>
    </div>
  );
};
