import React, { useRef } from 'react';
import { Download, Printer, X, Sparkles, Award } from 'lucide-react';
import { PlayerProfile } from '../types/game';

interface CertificateModalProps {
  playerProfile: PlayerProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ playerProfile, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const studentName = playerProfile.name.trim() || 'Siswa Berprestasi';
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Download high-resolution PNG using HTML5 Canvas drawing
  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Parchment Ivory)
    const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1100);
    bgGrad.addColorStop(0, '#fefdf8');
    bgGrad.addColorStop(0.5, '#ffffff');
    bgGrad.addColorStop(1, '#fef9ec');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1600, 1100);

    // Outer Ornate Border
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#d97706';
    ctx.strokeRect(35, 35, 1530, 1030);

    // Inner Thin Gold Border
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#b45309';
    ctx.strokeRect(55, 55, 1490, 990);

    // Corner Accents
    const corners = [
      [55, 55],
      [1545, 55],
      [55, 1045],
      [1545, 1045],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // School Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#15803d';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('SDIT BINA INSAN CENDEKIA', 800, 140);

    ctx.fillStyle = '#64748b';
    ctx.font = '600 20px sans-serif';
    ctx.fillText('PROGRAM PEMBELAJARAN BAHASA INGGRIS KELAS 2 • FASE A', 800, 175);

    // Title: CERTIFICATE OF EXCELLENCE
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 54px serif';
    ctx.fillText('CERTIFICATE OF EXCELLENCE', 800, 260);

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('★ THE TREASURE OF 100 GOOD JOBS ★', 800, 305);

    // "This certificate is proudly awarded to"
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 24px serif';
    ctx.fillText('Sertifikat ini dengan bangga diberikan kepada:', 800, 390);

    // Student Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText(studentName.toUpperCase(), 800, 480);

    // Decorative Underline under name
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(350, 505);
    ctx.lineTo(1250, 505);
    ctx.stroke();

    // Achievement text
    ctx.fillStyle = '#047857';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('BARAKALLAH, KAMU BERHASIL!', 800, 560);

    ctx.fillStyle = '#334155';
    ctx.font = '22px sans-serif';
    ctx.fillText(
      'Menuntaskan 15 Soal Tantangan & Mengumpulkan 100 Bintang "Good Job"',
      800,
      605
    );
    ctx.fillText(
      'Materi: Classroom Objects (Benda Kelas) & Prepositions of Place (Posisi Benda)',
      800,
      640
    );

    // Special badge title
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Predikat: ENGLISH MASTER - PHASE A (SUPERSTAR ⭐)', 800, 685);

    // Gold Medal Seal Circle
    ctx.beginPath();
    ctx.arc(800, 810, 65, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('100', 800, 805);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('GOOD JOBS', 800, 835);

    // Bottom signatures & Date
    // Date (Left)
    ctx.fillStyle = '#475569';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Tanggal: ${currentDate}`, 180, 940);
    ctx.fillText('Kelas: 2 (Fase A)', 180, 975);

    // Teacher Signature (Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic bold 28px serif';
    ctx.fillText('Ustadzah Shofa, S.Pd.', 1420, 930);
    ctx.fillStyle = '#64748b';
    ctx.font = '20px sans-serif';
    ctx.fillText('Guru Kelas 2 SDIT Bina Insan Cendekia', 1420, 965);

    // Signature line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1120, 940);
    ctx.lineTo(1420, 940);
    ctx.stroke();

    // Trigger download
    const link = document.createElement('a');
    link.download = `Sertifikat_100_Good_Job_${studentName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col my-auto">
        {/* Action Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-sm sm:text-base">
              E-Sertifikat Resmi: English Master (Phase A)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Unduh (PNG)</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (Printable layout) */}
        <div className="p-4 sm:p-8 bg-slate-100 flex justify-center">
          <div
            ref={certificateRef}
            className="certificate-print-area w-full max-w-3xl bg-gradient-to-br from-amber-50/40 via-white to-amber-50/60 p-6 sm:p-10 rounded-2xl border-8 border-double border-amber-600 shadow-xl relative select-none"
            style={{ minHeight: '480px' }}
          >
            {/* Corner Decorative Dots */}
            <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-amber-500" />
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-amber-500" />
            <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-amber-500" />
            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-amber-500" />

            {/* School Header */}
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-extrabold text-sm sm:text-base tracking-wide">
                <span>🏫</span>
                <span>SDIT BINA INSAN CENDEKIA</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Program Pembelajaran Bahasa Inggris Kelas 2 (Fase A)
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mt-5">
              <h1 className="text-2xl sm:text-4xl font-black text-amber-900 tracking-tight font-serif">
                CERTIFICATE OF EXCELLENCE
              </h1>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs sm:text-sm font-black px-3 py-0.5 rounded-full mt-1.5 border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>THE TREASURE OF 100 GOOD JOBS</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
            </div>

            {/* Awarded to */}
            <div className="text-center mt-6">
              <p className="text-xs sm:text-sm italic text-slate-500">
                Sertifikat ini dengan bangga diberikan kepada:
              </p>
              <div className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 border-b-2 border-amber-400 pb-1 inline-block px-8 tracking-wide font-display">
                {studentName}
              </div>
            </div>

            {/* Achievement text */}
            <div className="text-center mt-4 max-w-xl mx-auto space-y-1">
              <div className="text-base sm:text-xl font-black text-emerald-700 tracking-tight font-display">
                "BARAKALLAH, KAMU BERHASIL! 🌟"
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Atas keberhasilan luar biasa menyelesaikan <strong className="text-sky-700">CLASSROOM ADVENTURE (15 Soal Tantangan)</strong>, dan mengumpulkan{' '}
                <strong className="text-amber-700">100 Bintang &quot;Good Job&quot;</strong> materi{' '}
                <strong className="text-sky-700">11 Classroom Objects</strong> &amp;{' '}
                <strong className="text-sky-700">6 Positions</strong> dengan predikat:
              </div>
              <span className="font-extrabold text-amber-800 block text-sm sm:text-base pt-1">
                ⭐ ENGLISH MASTER - PHASE A (SUPERSTAR) ⭐
              </span>
            </div>

            {/* Seal & Signatures Row */}
            <div className="mt-8 pt-4 flex items-end justify-between px-2 sm:px-6">
              {/* Date */}
              <div className="text-left text-xs text-slate-600">
                <div className="font-bold text-slate-800">Tanggal:</div>
                <div>{currentDate}</div>
                <div className="text-[11px] text-slate-500">Kelas 2 (Fase A)</div>
              </div>

              {/* Gold Emblem Seal */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-4 border-amber-700 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-xs sm:text-sm font-black text-amber-950">100</span>
                <span className="text-[9px] sm:text-[10px] font-black text-amber-900 leading-tight">
                  GOOD JOBS
                </span>
                <span className="text-[10px]">⭐</span>
              </div>

              {/* Teacher Signature */}
              <div className="text-right text-xs">
                <div className="italic font-bold text-base text-slate-900 font-serif">
                  Ustadzah Shofa, S.Pd.
                </div>
                <div className="border-t border-slate-400 mt-1 pt-1 font-semibold text-slate-700">
                  Guru Kelas 2 SDIT BIC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>💡 File sertifikat berformat PNG beresolusi tinggi, siap dicetak atau disimpan.</span>
          <button
            onClick={onClose}
            className="text-amber-700 hover:text-amber-800 font-bold cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
