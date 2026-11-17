import React, { useEffect } from 'react';
import { Award, RotateCcw, BookOpen, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';
import { TreasureChestIllustration, UstadzahShofaAvatar } from './VisualIllustrations';

interface VictoryModalProps {
  playerProfile: PlayerProfile;
  totalStars: number;
  onOpenCertificate: () => void;
  onOpenKamus: () => void;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  playerProfile,
  totalStars,
  onOpenCertificate,
  onOpenKamus,
  onRestart,
}) => {
  const [copiedNotice, setCopiedNotice] = React.useState(false);

  useEffect(() => {
    sounds.playChestFanfare();

    const end = Date.now() + 3000;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#38bdf8', '#f472b6', '#facc15', '#10b981', '#8b5cf6'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const text = `🎉 Alhamdulillah! ${playerProfile.name} berhasil menyelesaikan CLASSROOM ADVENTURE: The Treasure of 100 Good Jobs Bahasa Inggris Kelas 2 SDIT Bina Insan Cendekia bersama Ustadzah Shofa (${totalStars}/100 Good Jobs)! ⭐⭐⭐`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CLASSROOM ADVENTURE - 100 Good Jobs',
          text,
          url: window.location.href,
        });
      } catch {
        // ignore user dismiss
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Golden Confetti Top Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-4 text-center text-amber-950 font-black relative overflow-hidden">
          <div className="inline-block bg-amber-900/10 px-3 py-0.5 rounded-full text-xs uppercase tracking-wider mb-1 font-bold">
            🏆 VICTORY CELEBRATION!
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            HARTA KARUN UTAMA TERBUKA!
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-90 mt-0.5">
            Selamat, {playerProfile.name}! Kamu mengumpulkan 100 Bintang &quot;Good Job&quot;!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-center">
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative">
              <TreasureChestIllustration isOpen={true} size={190} />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 px-4 py-1 rounded-full text-sm font-black shadow-lg border-2 border-white flex items-center gap-1.5 animate-bounce">
                <span>⭐</span>
                <span>100 / 100 GOOD JOBS!</span>
                <span>⭐</span>
              </div>
            </div>
          </div>

          {/* Ustadzah Shofa's Appreciation Speech Box */}
          <div className="bg-gradient-to-br from-sky-50 to-pink-50 border-2 border-sky-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-left shadow-sm">
            <div className="flex-shrink-0">
              <UstadzahShofaAvatar size={85} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-xs font-black bg-sky-500 text-white px-2.5 py-0.5 rounded-full">
                  Ustadzah Shofa
                </span>
                <span className="text-xs text-sky-700 font-semibold">SDIT Bina Insan Cendekia</span>
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-black text-pink-500 font-display">
                BARAKALLAH! YOU ARE AMAZING!
              </div>
              <div className="text-sm font-extrabold text-sky-700 font-display">
                KEEP UP THE GREAT WORK! 🎉
              </div>
              <blockquote className="mt-1 text-xs sm:text-sm font-bold text-slate-700 italic leading-relaxed">
                &quot;Subhanallah! Kamu berhasil menuntaskan seluruh 15 soal tantangan, mengumpulkan 100 Good Job, dan membuka Harta Karun Ilmu!&quot;
              </blockquote>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-sky-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  11 Classroom Objects
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-pink-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  6 Positions
                </span>
              </div>
            </div>
          </div>

          {copiedNotice && (
            <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-extrabold py-2 px-4 rounded-xl">
              ✓ Teks prestasi berhasil disalin! Siap dibagikan ke orang tua & guru.
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onOpenCertificate}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black text-sm sm:text-base p-3.5 rounded-2xl shadow-lg border-b-4 border-amber-700 cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-200" />
              <span>Lihat & Unduh E-Sertifikat</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-extrabold text-sm sm:text-base p-3.5 rounded-2xl shadow-md border-b-4 border-sky-700 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
              <span>Bagikan Prestasi</span>
            </button>

            <button
              onClick={onOpenKamus}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-sm p-3 rounded-2xl shadow border-b-4 border-emerald-700 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Kamus Ceria</span>
            </button>

            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm p-3 rounded-2xl border-2 border-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Petualangan Baru</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
