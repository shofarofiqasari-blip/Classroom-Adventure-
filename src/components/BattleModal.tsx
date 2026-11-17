import React, { useState, useEffect, useRef } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { LevelData, QuestionOption, QuestionData, PlayerProfile } from '../types/game';
import { sounds, speakEnglish, triggerSuccessPraise } from '../utils/sound';
import confetti from 'canvas-confetti';
import { PositionScene3D } from './Objects3D';
import {
  DustyMonster,
  GoblinMonster,
  KingPencilMonster,
  NaughtyEraserMonster,
  PaperDragonMonster,
  UstadzahShofaAvatar,
  StudentBoyAvatar,
  StudentGirlAvatar,
} from './VisualIllustrations';

interface BattleModalProps {
  level: LevelData;
  playerProfile?: PlayerProfile;
  onSuccess: () => void;
  onClose?: () => void;
}

export const BattleModal: React.FC<BattleModalProps> = ({
  level,
  playerProfile = { name: 'Bintang', gender: 'boy', school: 'SDIT Bina Insan Cendekia', classGrade: 'Kelas 2' },
  onSuccess,
}) => {
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [praiseText, setPraiseText] = useState<string>('GOOD JOB!');

  // Arcade Battle Attack States
  const [isBlasting, setIsBlasting] = useState<boolean>(false);
  const [monsterHit, setMonsterHit] = useState<boolean>(false);
  const [monsterHp, setMonsterHp] = useState<number>(3);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean>(false);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const totalQuestions = level.questions?.length || 1;
  const currentQuestion: QuestionData = level.questions
    ? level.questions[qIndex]
    : (level as unknown as { question: QuestionData }).question;

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakEnglish(currentQuestion.questionText, () => {
      setIsSpeaking(false);
    });
  };

  const handleSelectOption = (option: QuestionOption) => {
    if (isAnswered && isCorrect) return;

    setSelectedOption(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      const praise = triggerSuccessPraise();
      setPraiseText(praise);

      setIsBlasting(true);
      sounds.playBlastAttack();

      setTimeout(() => {
        setMonsterHit(true);
        sounds.playMonsterHit();
        setMonsterHp((prev) => Math.max(0, prev - 1));

        if (qIndex === totalQuestions - 1) {
          setMonsterDefeated(true);
          sounds.playMonsterDefeat();
          sounds.playVictoryBarakallah();

          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#38bdf8', '#10b981', '#f472b6', '#8b5cf6', '#eab308'],
          });
        }
      }, 350);

      setTimeout(() => {
        setIsBlasting(false);
        setMonsterHit(false);
      }, 950);

      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = window.setTimeout(() => {
        if (qIndex < totalQuestions - 1) {
          setQIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setIsCorrect(false);
        } else {
          onSuccess();
        }
      }, 1800);
    } else {
      setIsCorrect(false);
      sounds.playWrong();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsBlasting(false);
    setMonsterHit(false);
  };

  const renderMonster = () => {
    switch (level.enemyIllustrationKey) {
      case 'dusty':
        return <DustyMonster size={135} />;
      case 'goblin':
        return <GoblinMonster size={135} />;
      case 'king-pencil':
        return <KingPencilMonster size={135} />;
      case 'naughty-eraser':
        return <NaughtyEraserMonster size={135} />;
      case 'paper-dragon':
        return <PaperDragonMonster size={150} />;
      default:
        return <DustyMonster size={135} />;
    }
  };

  const getDifficultyBadge = (levelId: number) => {
    if (levelId === 1) return { text: 'Tingkat: Pemula (Mudah) ⭐', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (levelId === 2) return { text: 'Tingkat: Menengah Rendah ⭐⭐', color: 'bg-sky-100 text-sky-800 border-sky-300' };
    if (levelId === 3) return { text: 'Tingkat: Menengah ⭐⭐', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (levelId === 4) return { text: 'Tingkat: Menengah Tinggi ⭐⭐⭐', color: 'bg-purple-100 text-purple-800 border-purple-300' };
    return { text: 'Tingkat: BOSS BATTLE (Sangat Sulit) 👑⭐⭐⭐', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  const diffBadge = getDifficultyBadge(level.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-3 text-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">⚔️</span>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-amber-100">
                {level.zoneSub}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-display">
                {level.zoneTitle}
              </h2>
            </div>
          </div>

          {/* Question Stepper Indicator & Stars badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full border border-white/30 text-xs font-black">
              <span>Soal</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((step) => (
                  <span
                    key={step}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      step < qIndex
                        ? 'bg-emerald-400 text-emerald-950'
                        : step === qIndex
                        ? 'bg-amber-300 text-amber-950 ring-2 ring-white scale-110'
                        : 'bg-white/20 text-white/70'
                    }`}
                  >
                    {step + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-700/70 border border-amber-300/40 px-3 py-1 rounded-full flex items-center gap-1 shadow-inner">
              <span className="text-amber-300 text-sm">★</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-100">
                +{level.rewardStars} Good Job
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-4">
          {/* ARCADE BATTLE ARENA */}
          <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-3 sm:p-4 text-white border-2 border-indigo-500/50 shadow-inner overflow-hidden min-h-[140px] flex items-center justify-between">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Left: Player Side */}
            <div className="relative z-10 flex flex-col items-center max-w-[130px] sm:max-w-[160px] text-center">
              <div className="relative">
                {playerProfile.gender === 'girl' ? (
                  <StudentGirlAvatar size={70} />
                ) : (
                  <StudentBoyAvatar size={70} />
                )}
                {isBlasting && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-2xl animate-spin">
                    ✨
                  </div>
                )}
              </div>
              <div className="mt-1 text-xs font-black text-amber-300 truncate w-full">
                {playerProfile.name}
              </div>
              <div className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                Petualang Cilik
              </div>
            </div>

            {/* Middle: Attack Beam Animation */}
            <div className="relative z-10 flex-1 px-2 flex flex-col items-center justify-center">
              {isBlasting ? (
                <div className="w-full flex flex-col items-center animate-pulse">
                  <div className="w-full h-5 sm:h-7 bg-gradient-to-r from-amber-400 via-yellow-200 to-cyan-300 rounded-full shadow-[0_0_25px_#fde047] flex items-center justify-end px-2 border-2 border-white animate-bounce">
                    <span className="text-sm sm:text-base animate-ping">⚡</span>
                  </div>
                  <div className="mt-1 bg-amber-400 text-amber-950 font-black text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-lg border border-white animate-bounce whitespace-nowrap">
                    💥 SERANGAN PEMUSNAH ILMU!
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center opacity-80">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 text-lg">
                    <Zap className="w-5 h-5 fill-current animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1 font-semibold">
                    Jawab benar untuk serang!
                  </span>
                </div>
              )}
            </div>

            {/* Right: Monster Side */}
            <div className="relative z-10 flex flex-col items-center max-w-[140px] sm:max-w-[170px] text-center">
              <div className="w-full bg-slate-800/80 rounded-full p-1 border border-rose-500/50 mb-1">
                <div className="flex items-center justify-between text-[10px] font-black px-1.5 mb-0.5 text-rose-300">
                  <span>HP MUSUH</span>
                  <span>{monsterHp} / 3</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                  {[1, 2, 3].map((hpUnit) => (
                    <div
                      key={hpUnit}
                      className={`flex-1 h-full rounded-sm transition-all duration-500 ${
                        monsterHp >= hpUnit
                          ? 'bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_6px_#f43f5e]'
                          : 'bg-slate-700 opacity-30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`relative transition-all duration-200 ${
                  monsterHit ? 'scale-125 rotate-12 filter brightness-150 contrast-125' : ''
                }`}
              >
                {monsterDefeated ? (
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500/30 border-2 border-emerald-400 flex flex-col items-center justify-center animate-bounce">
                    <span className="text-3xl">💨</span>
                    <span className="text-[10px] font-black text-emerald-300">KALAH!</span>
                  </div>
                ) : (
                  renderMonster()
                )}

                {monsterHit && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-rose-950 font-black text-[11px] px-2 py-0.5 rounded-full border-2 border-white shadow-xl animate-ping whitespace-nowrap">
                    💥 CRITICAL HIT!
                  </div>
                )}
              </div>

              <div className="mt-1 text-xs font-black text-rose-300 truncate w-full">
                {level.enemyName}
              </div>
            </div>
          </div>

          {/* Difficulty Tag */}
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border ${diffBadge.color}`}>
              <span>{diffBadge.text}</span>
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Pertanyaan {qIndex + 1} dari {totalQuestions}
            </div>
          </div>

          {/* Visual Question Area (Label-free 3D Scene) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-6 bg-gradient-to-b from-sky-50 to-blue-50/60 rounded-2xl border-2 border-sky-200 p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs">
              <div className="text-[11px] font-bold text-sky-700 bg-sky-100 px-3 py-0.5 rounded-full mb-2">
                🔍 {currentQuestion.targetObject}
              </div>
              <PositionScene3D
                position={currentQuestion.scenePosition}
                subject={currentQuestion.sceneSubject}
                anchor={currentQuestion.sceneAnchor}
                anchorSecond={currentQuestion.sceneAnchorSecond}
              />
              <p className="text-[11px] text-slate-500 italic text-center mt-2">
                {currentQuestion.visualHintText}
              </p>
            </div>

            {/* Question Text & Answer Options */}
            <div className="md:col-span-6 flex flex-col space-y-3">
              <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-3.5 relative">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold uppercase text-amber-800">
                    Question ({qIndex + 1}/{totalQuestions}):
                  </span>
                  <button
                    onClick={handleSpeak}
                    disabled={isSpeaking}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow transition-all cursor-pointer"
                    title="Dengarkan pengucapan bahasa Inggris"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen 🔊'}</span>
                  </button>
                </div>

                <div className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug">
                  {currentQuestion.questionText}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  ({currentQuestion.questionIndo})
                </div>
              </div>

              <div className="space-y-2">
                {currentQuestion.options.map((option) => {
                  const isThisSelected = selectedOption === option.id;
                  let buttonStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700';

                  if (isAnswered) {
                    if (option.isCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
                    } else if (isThisSelected && !option.isCorrect) {
                      buttonStyle = 'bg-rose-50 border-rose-400 text-rose-800';
                    } else {
                      buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    buttonStyle = 'bg-sky-50 border-sky-400 text-sky-900';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option)}
                      disabled={isAnswered && isCorrect}
                      className={`w-full text-left p-3 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer font-semibold shadow-xs active:scale-[0.99] ${buttonStyle}`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 transition-colors ${
                          isAnswered && option.isCorrect
                            ? 'bg-emerald-500 text-white shadow'
                            : isAnswered && isThisSelected && !option.isCorrect
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="flex-1 text-sm sm:text-base font-bold">
                        {option.text}
                      </span>
                      {isAnswered && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feedback & Teacher Ustadzah Shofa Comment */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center gap-3.5 transition-all ${
                isCorrect
                  ? 'bg-emerald-50/95 border-emerald-400 text-emerald-900'
                  : 'bg-amber-50/95 border-amber-300 text-amber-900'
              }`}
            >
              <div className="flex-shrink-0">
                <UstadzahShofaAvatar
                  size={65}
                  mood={
                    isCorrect
                      ? (['clapping', 'thumbsup', 'happy'] as const)[qIndex % 3]
                      : 'thumbsup'
                  }
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-extrabold text-sm flex-wrap">
                  <span className="animate-praise-pop">
                    {isCorrect
                      ? qIndex === totalQuestions - 1
                        ? `👑 BARAKALLAH! ${praiseText}`
                        : `🌟 ${praiseText}`
                      : '💡 Yuk Coba Lagi!'}
                  </span>
                  <span className="text-xs bg-white/80 px-2 py-0.5 rounded-full border border-current">
                    Ustadzah Shofa
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                  {isCorrect ? (
                    <>
                      <strong>{praiseText}</strong> {currentQuestion.explanationIndo}
                      <br />
                      {qIndex === totalQuestions - 1 ? (
                        <span className="text-emerald-800 font-extrabold">
                          BARAKALLAH! YOU ARE AMAZING! KEEP UP THE GREAT WORK! {level.enemyName} berhasil dikalahkan!
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">
                          HP Musuh berkurang! Bersiap untuk soal berikutnya...
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      Hampir tepat! Perhatikan kembali gambar posisinya ya: apakah IN, ON, UNDER, BESIDE, BEHIND, atau BETWEEN? Klik tombol coba lagi!
                    </>
                  )}
                </p>
              </div>

              {!isCorrect && (
                <div className="flex-shrink-0 mt-2 sm:mt-0">
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm px-4 py-2 rounded-xl shadow transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Coba Lagi</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">Materi: 11 Classroom Objects & 6 Positions (Fase A)</span>
          </div>
          <span className="font-bold text-emerald-800">SDIT Bina Insan Cendekia</span>
        </div>
      </div>
    </div>
  );
};
