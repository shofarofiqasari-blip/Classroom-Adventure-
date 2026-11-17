import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import {
  WHERE_IS_IT_QUESTIONS,
  POSITIONS,
  PositionId,
  WhereIsItQuestion,
  shuffleArray,
} from '../../data/classroomData';
import { PositionScene3D } from '../Objects3D';
import { UstadzahShofaMascot, BarakallahCelebration } from '../UstadzahShofaMascot';
import { sounds, speakEnglish, triggerSuccessPraise } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface WhereIsItViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

/**
 * Generates an ordered session guaranteeing all 6 positions (IN, ON, UNDER, BESIDE, BEHIND, BETWEEN)
 */
function buildSessionQuestions(): WhereIsItQuestion[] {
  const positionIds: PositionId[] = ['IN', 'ON', 'UNDER', 'BESIDE', 'BEHIND', 'BETWEEN'];
  const picked: WhereIsItQuestion[] = [];
  for (const pos of positionIds) {
    const matches = shuffleArray(WHERE_IS_IT_QUESTIONS.filter((q) => q.position === pos));
    if (matches[0]) picked.push(matches[0]);
  }
  return shuffleArray(picked);
}

export const WhereIsItView: React.FC<WhereIsItViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [questions, setQuestions] = useState<WhereIsItQuestion[]>(() => buildSessionQuestions());
  const [qIdx, setQIdx] = useState<number>(0);
  const [selectedPos, setSelectedPos] = useState<PositionId | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [praiseText, setPraiseText] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const advanceTimerRef = useRef<number | null>(null);

  const currentQ = questions[qIdx];

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isComplete && currentQ) {
      const timer = setTimeout(() => {
        speakEnglish(currentQ.questionText);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [qIdx, isComplete, currentQ]);

  const handleChoosePosition = (posId: PositionId) => {
    if (isCorrect === true) return;
    setSelectedPos(posId);

    if (posId === currentQ.position) {
      setIsCorrect(true);
      setScore((s) => s + 15);
      const praise = triggerSuccessPraise();
      setPraiseText(praise);

      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = window.setTimeout(() => {
        if (qIdx + 1 >= questions.length) {
          sounds.playVictoryBarakallah();
          setIsComplete(true);
        } else {
          setQIdx((i) => i + 1);
          setSelectedPos(null);
          setIsCorrect(null);
          setPraiseText('');
        }
      }, 1700);
    } else {
      setIsCorrect(false);
      sounds.playWrong();
      setPraiseText('TRY AGAIN!');
    }
  };

  const handleReplay = () => {
    sounds.playClick();
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    setQuestions(buildSessionQuestions());
    setQIdx(0);
    setSelectedPos(null);
    setIsCorrect(null);
    setPraiseText('');
    setScore(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-pink-50 animate-page-flip">
      <GameTopBar
        title="WHERE IS IT?"
        subtitle="Amati posisi benda pada gambar, lalu pilih IN, ON, UNDER, BESIDE, BEHIND, atau BETWEEN"
        progressText={`${qIdx + 1}/${questions.length}`}
        scoreText={`Score: ${score}`}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center gap-4">
        <div className="bg-white rounded-[2rem] border-3 border-sky-200 p-4 sm:p-6 shadow-xl space-y-5">
          {/* Question Title + Audio */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-sky-100 pb-4">
            <div className="text-center sm:text-left">
              <div className="text-xs font-extrabold uppercase tracking-wider text-pink-500">
                Position Challenge {qIdx + 1} of {questions.length}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-sky-900 font-display">
                {currentQ.questionText}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sounds.playClick();
                  speakEnglish(currentQ.questionText);
                }}
                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-sky-700 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>LISTEN</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  speakEnglish(currentQ.questionText);
                }}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl shadow border-b-3 border-amber-600 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>REPEAT</span>
              </button>
            </div>
          </div>

          {/* 3D Position Scene & 6 Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-6">
              <PositionScene3D
                position={currentQ.position}
                subject={currentQ.subject}
                anchor={currentQ.anchor}
                anchorSecond={currentQ.anchorSecond}
                className="h-60 sm:h-72"
              />
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center sm:text-left">
                Choose the right position:
              </div>

              <div className="grid grid-cols-2 gap-3">
                {POSITIONS.map((pos) => {
                  const isPicked = selectedPos === pos.id;
                  const showCorrect = isCorrect === true && pos.id === currentQ.position;
                  const showWrong = isPicked && isCorrect === false;

                  let btnClass =
                    'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-900 border-b-4 border-b-sky-300';
                  if (showCorrect) {
                    btnClass =
                      'bg-emerald-500 text-white border-emerald-600 border-b-4 border-b-emerald-700 ring-4 ring-emerald-200 scale-[1.03]';
                  } else if (showWrong) {
                    btnClass = 'bg-pink-50 border-pink-400 text-pink-700 border-b-4 border-b-pink-400';
                  }

                  return (
                    <button
                      key={pos.id}
                      onClick={() => handleChoosePosition(pos.id)}
                      disabled={isCorrect === true}
                      className={`py-4 px-4 rounded-2xl border-2 font-black text-lg sm:text-xl font-display flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${btnClass}`}
                    >
                      <span>{pos.word}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5" />}
                      {showWrong && <XCircle className="w-5 h-5 text-pink-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feedback Area (Only shown AFTER child picks an answer!) */}
          {isCorrect !== null && (
            <div
              className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-pink-50 border-pink-300 text-pink-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <UstadzahShofaMascot
                  size="sm"
                  mood={
                    isCorrect
                      ? (['clapping', 'thumbsup', 'happy'] as const)[qIdx % 3]
                      : 'thumbsup'
                  }
                />
                <div>
                  <div className="text-xl sm:text-2xl font-black font-display flex items-center gap-1.5">
                    {isCorrect && <Sparkles className="w-5 h-5 text-amber-500" />}
                    <span>{praiseText}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold mt-0.5">
                    {isCorrect
                      ? currentQ.explanationIndo
                      : 'Perhatikan letak bendanya baik-baik ya! Coba pilih posisi yang lain.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isComplete && (
        <BarakallahCelebration
          title={`Where Is It? Complete! (${questions.length}/${questions.length})`}
          scoreText={`Final Score: ${score} Points`}
          onReplay={handleReplay}
          onHome={onHome}
        />
      )}
    </div>
  );
};
