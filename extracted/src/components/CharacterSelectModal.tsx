import React, { useState } from 'react';
import { Sparkles, User, School, Play, Check, X } from 'lucide-react';
import { PlayerProfile, AvatarGender } from '../types/game';
import { StudentBoyAvatar, StudentGirlAvatar, UstadzahShofaAvatar } from './VisualIllustrations';

interface CharacterSelectModalProps {
  initialProfile: PlayerProfile;
  onConfirm: (profile: PlayerProfile) => void;
  onClose?: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  initialProfile,
  onConfirm,
  onClose,
}) => {
  const [name, setName] = useState<string>(initialProfile.name || 'Bintang Cilik');
  const [gender, setGender] = useState<AvatarGender>(initialProfile.gender || 'boy');
  const [school, setSchool] = useState<string>(initialProfile.school || 'SDIT Bina Insan Cendekia');
  const [classGrade, setClassGrade] = useState<string>(initialProfile.classGrade || 'Kelas 2 (Fase A)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      name: name.trim() || 'Bintang Cilik',
      gender,
      school: school.trim() || 'SDIT Bina Insan Cendekia',
      classGrade: classGrade.trim() || 'Kelas 2 (Fase A)',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-sky-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 p-5 text-white text-center relative">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Tutup Profil"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Profil Sang Petualang Cilik</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            PILIH KARAKTER & NAMA KAMU
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            Nama ini akan dicetak di E-Sertifikat &quot;The Treasure of 100 Good Jobs&quot;!
          </p>
        </div>

        {/* Teacher Welcoming Speech */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3 flex items-center gap-3">
          <div className="flex-shrink-0">
            <UstadzahShofaAvatar size={48} />
          </div>
          <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
            "Assalamu'alaikum shalih & shalihah! Tuliskan namamu dan pilih karakter petualangmu untuk mulai mengumpulkan 100 Good Jobs!"
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Avatar Selection Cards */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 mb-2">
              Pilih Avatar Petualang:
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              {/* Boy Avatar Option */}
              <button
                type="button"
                onClick={() => setGender('boy')}
                className={`p-3.5 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  gender === 'boy'
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 opacity-70'
                }`}
              >
                <StudentBoyAvatar size={75} />
                <div className="text-center">
                  <div className="font-extrabold text-sm text-slate-800 flex items-center justify-center gap-1">
                    <span>Ahmad / Bintang</span>
                    {gender === 'boy' && <Check className="w-4 h-4 text-sky-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500">Murid Putra (Peci & Seragam)</div>
                </div>
              </button>

              {/* Girl Avatar Option */}
              <button
                type="button"
                onClick={() => setGender('girl')}
                className={`p-3.5 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  gender === 'girl'
                    ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-300 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 opacity-70'
                }`}
              >
                <StudentGirlAvatar size={75} />
                <div className="text-center">
                  <div className="font-extrabold text-sm text-slate-800 flex items-center justify-center gap-1">
                    <span>Fatimah / Aura</span>
                    {gender === 'girl' && <Check className="w-4 h-4 text-pink-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500">Murid Putri (Jilbab & Seragam)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Student Name Input */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
              Nama Lengkap Siswa:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Muhammad Bintang Al-Fatih"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-hidden font-bold text-slate-800 text-sm sm:text-base"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 italic">
              Nama ini akan tertulis rapi di sertifikat kelulusan.
            </p>
          </div>

          {/* School & Class metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Sekolah:
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 font-semibold text-xs sm:text-sm text-slate-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Kelas / Fase:
              </label>
              <input
                type="text"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-xs sm:text-sm text-slate-700 focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black text-base py-3.5 rounded-2xl shadow-lg border-b-4 border-amber-700 cursor-pointer flex items-center justify-center gap-2 transition-all mt-4"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Mulai Petualangan 100 Good Jobs!</span>
          </button>
        </form>
      </div>
    </div>
  );
};
