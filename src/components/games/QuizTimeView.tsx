import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  RotateCw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Clock,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import {
  CLASSROOM_OBJECTS,
  WHERE_IS_IT_QUESTIONS,
  ClassroomObjectId,
  PositionId,
  shuffleArray,
} from '../../data/classroomData';
import { ClassroomObject3D, PositionScene3D } from '../Objects3D';
import { UstadzahShofaMascot, BarakallahCelebration } from '../UstadzahShofaMascot';
import { sounds, speakEnglish, triggerSuccessPraise } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface QuizTimeViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

type QuestionKind =
  | 'object-visual'
  | 'position-visual'
  | 'translate-id-en'
  | 'translate-en-id';

interface QuizQuestion {
  id: string;
  kind: QuestionKind;
  badgeText: string;
  promptText: string;
  audioText: string;
  objectId?: ClassroomObjectId;
  positionData?: {
    position: PositionId;
    subject: ClassroomObjectId;
    anchor: ClassroomObjectId;
    anchorSecond?: ClassroomObjectId;
  };
  options: string[];
  correctAnswer: string;
  explanationIndo: string;
}

interface LevelMeta {
  level: 1 | 2 | 3;
  name: string;
  labelIndo: string;
  seconds: number;
  pointsPerQuestion: number;
}

const QUIZ_LEVELS: LevelMeta[] = [
  {
    level: 1,
    name: 'LEVEL 1 • EXPLORER',
    labelIndo: 'Kosakata Benda Kelas (Mudah)',
    seconds: 15,
    pointsPerQuestion: 10,
  },
  {
    level: 2,
    name: 'LEVEL 2 • ADVENTURER',
    labelIndo: 'Posisi Benda & Terjemahan Dasar (Menengah)',
    seconds: 12,
    pointsPerQuestion: 15,
  },
  {
    level: 3,
    name: 'LEVEL 3 • CHAMPION',
    labelIndo: 'Terjemahan Kalimat & Tantangan Posisi (Sulit)',
    seconds: 10,
    pointsPerQuestion: 20,
  },
];

interface SentenceTranslationItem {
  id: string;
  english: string;
  indonesian: string;
  wrongEnglish: string[];
  wrongIndonesian: string[];
}

const SENTENCE_TRANSLATIONS: SentenceTranslationItem[] = [
  {
    id: 'st-1',
    english: 'The globe is on the table.',
    indonesian: 'Bola dunia itu ada di atas meja.',
    wrongEnglish: ['The globe is under the table.', 'The globe is in the bag.'],
    wrongIndonesian: ['Bola dunia itu ada di bawah meja.', 'Bola dunia itu ada di dalam tas.'],
  },
  {
    id: 'st-2',
    english: 'The pencil is in the bag.',
    indonesian: 'Pensil itu ada di dalam tas.',
    wrongEnglish: ['The pencil is on the chair.', 'The pencil is behind the bag.'],
    wrongIndonesian: ['Pensil itu ada di atas kursi.', 'Pensil itu ada di belakang tas.'],
  },
  {
    id: 'st-3',
    english: 'The bag is under the chair.',
    indonesian: 'Tas itu ada di bawah kursi.',
    wrongEnglish: ['The bag is on the chair.', 'The bag is beside the blackboard.'],
    wrongIndonesian: ['Tas itu ada di atas kursi.', 'Tas itu ada di samping papan tulis.'],
  },
  {
    id: 'st-4',
    english: 'The clock is beside the blackboard.',
    indonesian: 'Jam dinding itu ada di samping papan tulis.',
    wrongEnglish: ['The clock is under the cupboard.', 'The clock is behind the table.'],
    wrongIndonesian: ['Jam dinding itu ada di bawah lemari.', 'Jam dinding itu ada di belakang meja.'],
  },
  {
    id: 'st-5',
    english: 'The book is behind the globe.',
    indonesian: 'Buku itu ada di belakang bola dunia.',
    wrongEnglish: ['The book is between the table.', 'The book is under the globe.'],
    wrongIndonesian: ['Buku itu ada di depan bola dunia.', 'Buku itu ada di bawah bola dunia.'],
  },
  {
    id: 'st-6',
    english: 'The chalk is between the book and the globe.',
    indonesian: 'Kapur tulis itu ada di antara buku dan bola dunia.',
    wrongEnglish: ['The chalk is in the cupboard.', 'The chalk is under the blackboard.'],
    wrongIndonesian: ['Kapur tulis itu ada di dalam lemari.', 'Kapur tulis itu ada di bawah papan tulis.'],
  },
  {
    id: 'st-7',
    english: 'The calendar is beside the cupboard.',
    indonesian: 'Kalender itu ada di samping lemari.',
    wrongEnglish: ['The calendar is in the bag.', 'The calendar is under the chair.'],
    wrongIndonesian: ['Kalender itu ada di dalam tas.', 'Kalender itu ada di bawah kursi.'],
  },
];

function buildLevelQuestions(level: 1 | 2 | 3): QuizQuestion[] {
  const posPool: PositionId[] = ['IN', 'ON', 'UNDER', 'BESIDE', 'BEHIND', 'BETWEEN'];

  if (level === 1) {
    // Level 1 (Easy - 15s): 3 object visual questions (always including GLOBE!) + 2 word translations
    const globeObj = CLASSROOM_OBJECTS.find((o) => o.id === 'GLOBE')!;
    const others = shuffleArray(CLASSROOM_OBJECTS.filter((o) => o.id !== 'GLOBE')).slice(0, 4);

    const visualItems = shuffleArray([globeObj, others[0], others[1]]);
    const visualQs: QuizQuestion[] = visualItems.map((obj) => {
      const wrongs = shuffleArray(
        CLASSROOM_OBJECTS.filter((o) => o.id !== obj.id).map((o) => o.word)
      ).slice(0, 2);
      return {
        id: `l1-vis-${obj.id}`,
        kind: 'object-visual',
        badgeText: 'TEBAK GAMBAR',
        promptText: 'WHAT IS THIS?',
        audioText: 'What is this?',
        objectId: obj.id,
        options: shuffleArray([obj.word, ...wrongs]),
        correctAnswer: obj.word,
        explanationIndo: `It is a ${obj.word} (${obj.indonesian}).`,
      };
    });

    const idToEnObj = others[2];
    const wrongWords = shuffleArray(
      CLASSROOM_OBJECTS.filter((o) => o.id !== idToEnObj.id).map((o) => o.word)
    ).slice(0, 2);
    const transIdEn: QuizQuestion = {
      id: `l1-tr-iden-${idToEnObj.id}`,
      kind: 'translate-id-en',
      badgeText: 'TERJEMAHKAN (ID → EN)',
      promptText: `Apa Bahasa Inggrisnya "${idToEnObj.indonesian}"?`,
      audioText: `Choose the English word for ${idToEnObj.word}`,
      options: shuffleArray([idToEnObj.word, ...wrongWords]),
      correctAnswer: idToEnObj.word,
      explanationIndo: `"${idToEnObj.indonesian}" dalam Bahasa Inggris adalah ${idToEnObj.word}.`,
    };

    const enToIdObj = others[3];
    const wrongIndos = shuffleArray(
      CLASSROOM_OBJECTS.filter((o) => o.id !== enToIdObj.id).map((o) => o.indonesian)
    ).slice(0, 2);
    const transEnId: QuizQuestion = {
      id: `l1-tr-enid-${enToIdObj.id}`,
      kind: 'translate-en-id',
      badgeText: 'ARTI KATA (EN → ID)',
      promptText: `Apa arti kata "${enToIdObj.word}" dalam Bahasa Indonesia?`,
      audioText: enToIdObj.word,
      options: shuffleArray([enToIdObj.indonesian, ...wrongIndos]),
      correctAnswer: enToIdObj.indonesian,
      explanationIndo: `${enToIdObj.word} artinya "${enToIdObj.indonesian}".`,
    };

    return shuffleArray([...visualQs, transIdEn, transEnId]);
  }

  if (level === 2) {
    // Level 2 (Medium - 12s): 3 Position 3D visual questions + 2 ID->EN sentence translations
    const posPick = shuffleArray(WHERE_IS_IT_QUESTIONS).slice(0, 3);
    const posQs: QuizQuestion[] = posPick.map((pq) => {
      const wrongPos = shuffleArray(posPool.filter((p) => p !== pq.position)).slice(0, 2);
      return {
        id: `l2-pos-${pq.id}`,
        kind: 'position-visual',
        badgeText: 'TEBAK POSISI',
        promptText: pq.questionText,
        audioText: pq.questionText,
        positionData: {
          position: pq.position,
          subject: pq.subject,
          anchor: pq.anchor,
          anchorSecond: pq.anchorSecond,
        },
        options: shuffleArray([pq.position, ...wrongPos]),
        correctAnswer: pq.position,
        explanationIndo: pq.explanationIndo,
      };
    });

    const sentPick = shuffleArray(SENTENCE_TRANSLATIONS).slice(0, 2);
    const sentQs: QuizQuestion[] = sentPick.map((st) => ({
      id: `l2-st-${st.id}`,
      kind: 'translate-id-en',
      badgeText: 'TERJEMAHKAN KALIMAT (ID → EN)',
      promptText: `Bahasa Inggrisnya: "${st.indonesian}"`,
      audioText: st.english,
      options: shuffleArray([st.english, ...st.wrongEnglish]),
      correctAnswer: st.english,
      explanationIndo: `"${st.indonesian}" → "${st.english}"`,
    }));

    return shuffleArray([...posQs, ...sentQs]);
  }

  // Level 3 (Challenge - 10s): 2 hard Position 3D (BEHIND/BETWEEN/BESIDE/UNDER) + 2 EN->ID + 1 ID->EN sentence translations
  const hardPosPool = WHERE_IS_IT_QUESTIONS.filter((q) =>
    ['BESIDE', 'BEHIND', 'BETWEEN', 'UNDER'].includes(q.position)
  );
  const pickedHardPos = shuffleArray(hardPosPool).slice(0, 2);
  const hardPosQs: QuizQuestion[] = pickedHardPos.map((pq) => {
    const wrongPos = shuffleArray(posPool.filter((p) => p !== pq.position)).slice(0, 2);
    return {
      id: `l3-pos-${pq.id}`,
      kind: 'position-visual',
      badgeText: 'TANTANGAN POSISI',
      promptText: pq.questionText,
      audioText: pq.questionText,
      positionData: {
        position: pq.position,
        subject: pq.subject,
        anchor: pq.anchor,
        anchorSecond: pq.anchorSecond,
      },
      options: shuffleArray([pq.position, ...wrongPos]),
      correctAnswer: pq.position,
      explanationIndo: pq.explanationIndo,
    };
  });

  const sentShuffle = shuffleArray(SENTENCE_TRANSLATIONS);
  const enToIdQs: QuizQuestion[] = sentShuffle.slice(0, 2).map((st) => ({
    id: `l3-enid-${st.id}`,
    kind: 'translate-en-id',
    badgeText: 'ARTIKAN KALIMAT (EN → ID)',
    promptText: `Apa arti kalimat: "${st.english}"`,
    audioText: st.english,
    options: shuffleArray([st.indonesian, ...st.wrongIndonesian]),
    correctAnswer: st.indonesian,
    explanationIndo: `"${st.english}" artinya "${st.indonesian}"`,
  }));

  const stLast = sentShuffle[2];
  const idToEnQ: QuizQuestion = {
    id: `l3-iden-${stLast.id}`,
    kind: 'translate-id-en',
    badgeText: 'TERJEMAHKAN KALIMAT (ID → EN)',
    promptText: `Pilih terjemahan yang tepat: "${stLast.indonesian}"`,
    audioText: stLast.english,
    options: shuffleArray([stLast.english, ...stLast.wrongEnglish]),
    correctAnswer: stLast.english,
    explanationIndo: `"${stLast.indonesian}" → "${stLast.english}"`,
  };

  return shuffleArray([...hardPosQs, ...enToIdQs, idToEnQ]);
}

export const QuizTimeView: React.FC<QuizTimeViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const [quiz, setQuiz] = useState<QuizQuestion[]>(() => buildLevelQuestions(1));
  const [qIdx, setQIdx] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [praise, setPraise] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_LEVELS[0].seconds);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const [showLevelComplete, setShowLevelComplete] = useState<boolean>(false);
  const [isAllComplete, setIsAllComplete] = useState<boolean>(false);
  const advanceTimerRef = useRef<number | null>(null);

  const currentLevel = QUIZ_LEVELS[levelIdx];
  const currentQ = quiz[qIdx];

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  // Auto-play clear English pronunciation for each question
  useEffect(() => {
    if (!showLevelComplete && !isAllComplete && currentQ) {
      const timer = setTimeout(() => {
        speakEnglish(currentQ.audioText);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [qIdx, levelIdx, showLevelComplete, isAllComplete, currentQ]);

  // Countdown Timer Tube loop (15s Lv1 -> 12s Lv2 -> 10s Lv3)
  useEffect(() => {
    if (showLevelComplete || isAllComplete || isCorrect === true || isTimedOut) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sounds.playWrong();
          setIsTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [qIdx, levelIdx, showLevelComplete, isAllComplete, isCorrect, isTimedOut]);

  const handleSelect = (option: string) => {
    if (isCorrect === true || isTimedOut) return;
    setSelected(option);

    if (option === currentQ.correctAnswer) {
      setIsCorrect(true);
      setScore((s) => s + currentLevel.pointsPerQuestion);
      const nextPraise = triggerSuccessPraise();
      setPraise(nextPraise);

      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = window.setTimeout(() => {
        if (qIdx + 1 >= quiz.length) {
          sounds.playVictoryBarakallah();
          if (levelIdx + 1 >= QUIZ_LEVELS.length) {
            setIsAllComplete(true);
          } else {
            setShowLevelComplete(true);
          }
        } else {
          setQIdx((i) => i + 1);
          setSelected(null);
          setIsCorrect(null);
          setPraise('');
          setIsTimedOut(false);
          setTimeLeft(currentLevel.seconds);
        }
      }, 1700);
    } else {
      setIsCorrect(false);
      sounds.playWrong();
      setPraise('YOU CAN DO IT!');
    }
  };

  const handleRetryTimedOut = () => {
    sounds.playClick();
    setSelected(null);
    setIsCorrect(null);
    setPraise('');
    setIsTimedOut(false);
    setTimeLeft(currentLevel.seconds);
    speakEnglish(currentQ.audioText);
  };

  const handleAdvanceLevel = () => {
    sounds.playCollectWhoosh();
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    const nextLevelIdx = levelIdx + 1;
    const nextLevelNum = QUIZ_LEVELS[nextLevelIdx].level;
    setLevelIdx(nextLevelIdx);
    setQuiz(buildLevelQuestions(nextLevelNum));
    setQIdx(0);
    setSelected(null);
    setIsCorrect(null);
    setPraise('');
    setIsTimedOut(false);
    setTimeLeft(QUIZ_LEVELS[nextLevelIdx].seconds);
    setShowLevelComplete(false);
  };

  const handleReplay = () => {
    sounds.playClick();
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    setLevelIdx(0);
    setQuiz(buildLevelQuestions(1));
    setQIdx(0);
    setSelected(null);
    setIsCorrect(null);
    setPraise('');
    setScore(0);
    setIsTimedOut(false);
    setTimeLeft(QUIZ_LEVELS[0].seconds);
    setShowLevelComplete(false);
    setIsAllComplete(false);
  };

  const isLowTime = timeLeft <= 3 && isCorrect !== true;
  const isMidTime = timeLeft <= Math.ceil(currentLevel.seconds / 2) && !isLowTime;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-orange-50 animate-page-flip">
      <GameTopBar
        title="QUIZ TIME"
        subtitle={`${currentLevel.name} • ${currentLevel.labelIndo}`}
        progressText={`Lv.${currentLevel.level}/3 • ${qIdx + 1}/${quiz.length}`}
        scoreText={`Score: ${score}`}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center gap-4">
        {/* Level Selector Stepper & Animated Liquid Time Tube (Tabung Waktu) */}
        <div className="bg-white/95 rounded-3xl border-3 border-sky-200 px-4 py-3 shadow-md flex flex-col md:flex-row items-center justify-between gap-3">
          {/* 3-Level Progress Pills */}
          <div className="flex items-center gap-2 shrink-0">
            {QUIZ_LEVELS.map((lv, idx) => (
              <div
                key={lv.level}
                className={`px-3 py-1 rounded-2xl text-xs font-black border-2 transition-all ${
                  idx === levelIdx
                    ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white border-orange-500 shadow-sm scale-105'
                    : idx < levelIdx
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                Lv.{lv.level} ({lv.seconds}s)
              </div>
            ))}
          </div>

          {/* Segmented Glass Countdown Timer Tube ("Tabung Waktu") */}
          <div className="flex-1 w-full max-w-md flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 font-black text-xs sm:text-sm px-3 py-1.5 rounded-2xl border-2 shrink-0 ${
                isLowTime
                  ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                  : isMidTime
                  ? 'bg-orange-100 text-orange-700 border-orange-300'
                  : 'bg-sky-100 text-sky-800 border-sky-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Tabung Waktu: {timeLeft}s</span>
            </div>

            <div
              className="flex-1 h-7 rounded-full bg-slate-100 border-3 border-sky-300 p-1 shadow-inner flex items-center gap-1 overflow-hidden"
              aria-label={`Sisa waktu ${timeLeft} detik`}
            >
              {Array.from({ length: currentLevel.seconds }).map((_, segIdx) => {
                const filled = segIdx < timeLeft;
                return (
                  <span
                    key={segIdx}
                    className={`flex-1 h-full rounded-full transition-all duration-300 ${
                      filled
                        ? isLowTime
                          ? 'bg-gradient-to-b from-rose-400 to-pink-500 shadow-2xs'
                          : isMidTime
                          ? 'bg-gradient-to-b from-yellow-300 to-orange-500 shadow-2xs'
                          : 'bg-gradient-to-b from-sky-400 to-emerald-400 shadow-2xs'
                        : 'bg-slate-200/70 scale-y-75 opacity-40'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border-3 border-sky-200 p-4 sm:p-6 shadow-xl space-y-5">
          {/* Question Header + Audio */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-sky-100 pb-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                <span>{currentQ.badgeText}</span>
                <span>•</span>
                <span>
                  Soal {qIdx + 1}/{quiz.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-sky-900 font-display leading-snug">
                {currentQ.promptText}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sounds.playClick();
                  speakEnglish(currentQ.audioText);
                }}
                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-sky-700 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>LISTEN</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  speakEnglish(currentQ.audioText);
                }}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl shadow border-b-3 border-amber-600 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>REPEAT</span>
              </button>
            </div>
          </div>

          {/* Visual Support & Choices */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-5 flex items-center justify-center">
              {currentQ.kind === 'object-visual' && currentQ.objectId ? (
                <div className="w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-sky-50 via-white to-pink-50 border-2 border-sky-200 flex items-center justify-center shadow-inner">
                  <ClassroomObject3D objectId={currentQ.objectId} size={155} />
                </div>
              ) : currentQ.kind === 'position-visual' && currentQ.positionData ? (
                <PositionScene3D
                  position={currentQ.positionData.position}
                  subject={currentQ.positionData.subject}
                  anchor={currentQ.positionData.anchor}
                  anchorSecond={currentQ.positionData.anchorSecond}
                  className="h-56 sm:h-64"
                />
              ) : (
                /* For translation questions: display friendly Ustadzah Shofa prompt card without leaking the answer! */
                <div className="w-full h-52 sm:h-60 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-orange-50 border-2 border-orange-200 p-5 flex flex-col items-center justify-center text-center gap-3 shadow-inner">
                  <UstadzahShofaMascot size="md" />
                  <p className="text-xs sm:text-sm font-extrabold text-sky-900">
                    Baca &amp; dengarkan dengan teliti, lalu pilih jawaban terbaik sebelum tabung waktu habis!
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-3">
              {currentQ.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C'][idx];
                const isPicked = selected === opt;
                const showCorrect = isCorrect === true && opt === currentQ.correctAnswer;
                const showWrong = isPicked && isCorrect === false;

                let btnClass =
                  'bg-sky-50/75 hover:bg-sky-100 border-sky-200 text-sky-900 border-b-4 border-b-sky-300';
                if (showCorrect) {
                  btnClass =
                    'bg-emerald-500 text-white border-emerald-600 border-b-4 border-b-emerald-700 ring-4 ring-emerald-200';
                } else if (showWrong) {
                  btnClass = 'bg-pink-50 border-pink-400 text-pink-700 border-b-4 border-b-pink-400';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={isCorrect === true || isTimedOut}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 flex items-center gap-3.5 font-black text-base sm:text-lg font-display transition-all cursor-pointer active:scale-95 ${btnClass}`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                        showCorrect
                          ? 'bg-white text-emerald-700'
                          : showWrong
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-sky-700 border border-sky-200'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 text-left leading-snug">{opt}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                    {showWrong && <XCircle className="w-6 h-6 text-pink-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeout Gentle Prompt */}
          {isTimedOut && isCorrect !== true && (
            <div className="p-4 rounded-3xl border-2 bg-orange-50 border-orange-300 text-orange-950 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <UstadzahShofaMascot size="sm" />
                <div>
                  <div className="text-xl font-black font-display text-orange-700">
                    TIME&apos;S UP! YOU CAN DO IT!
                  </div>
                  <p className="text-xs sm:text-sm font-bold mt-0.5">
                    Tabung waktu habis. Yuk coba jawab soal ini lagi dengan penuh semangat!
                  </p>
                </div>
              </div>
              <button
                onClick={handleRetryTimedOut}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-black text-sm px-5 py-3 rounded-2xl shadow-md border-b-4 border-orange-700 cursor-pointer shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                <span>TRY AGAIN</span>
              </button>
            </div>
          )}

          {/* Answer Feedback */}
          {!isTimedOut && isCorrect !== null && (
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
                      ? (['clapping', 'thumbsup', 'happy'] as const)[(qIdx + levelIdx) % 3]
                      : 'thumbsup'
                  }
                />
                <div>
                  <div className="text-xl sm:text-2xl font-black font-display flex items-center gap-1.5">
                    {isCorrect && <Sparkles className="w-5 h-5 text-amber-500" />}
                    <span>{praise}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold mt-0.5">
                    {isCorrect
                      ? currentQ.explanationIndo
                      : 'Coba perhatikan soal dan dengarkan lagi pelan-pelan, pasti bisa!'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Intermediate Level Complete Appreciation Modal (Lv.1 & Lv.2) */}
      {showLevelComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-[2rem] border-4 border-yellow-300 shadow-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <UstadzahShofaMascot size="md" />
              <div className="w-20 h-20 rounded-3xl bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-amber-500 shadow">
                <Trophy className="w-11 h-11" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                {currentLevel.name} TUNTAS!
              </div>
              <h2 className="text-3xl font-black text-pink-500 font-display animate-praise-pop">
                BARAKALLAH!
              </h2>
              <p className="text-lg font-black text-sky-800 font-display">
                YOU ARE AMAZING!
              </p>
              <p className="text-sm font-extrabold text-orange-500 font-display">
                KEEP UP THE GREAT WORK!
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-sky-900">
              Siap melanjutkan ke <span className="text-orange-600">{QUIZ_LEVELS[levelIdx + 1].name}</span> (Tabung Waktu {QUIZ_LEVELS[levelIdx + 1].seconds} Detik)?
            </div>

            <button
              onClick={handleAdvanceLevel}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 via-amber-500 to-pink-500 hover:from-orange-500 hover:to-pink-600 active:scale-95 text-white font-black text-base py-3.5 px-6 rounded-2xl shadow-lg border-b-4 border-orange-700 cursor-pointer"
            >
              <span>LANJUT LEVEL {QUIZ_LEVELS[levelIdx + 1].level}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {isAllComplete && (
        <BarakallahCelebration
          title="Quiz Time Complete! (All 3 Levels)"
          scoreText={`Final Score: ${score} Points`}
          onReplay={handleReplay}
          onHome={onHome}
        />
      )}
    </div>
  );
};
