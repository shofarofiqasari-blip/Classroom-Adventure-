import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, Sparkles } from 'lucide-react';
import {
  FIND_OBJECT_MISSIONS,
  ClassroomObjectId,
  shuffleArray,
} from '../../data/classroomData';
import { ClassroomObject3D } from '../Objects3D';
import { BarakallahCelebration } from '../UstadzahShofaMascot';
import { sounds, speakEnglish, triggerSuccessPraise } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface FindObjectViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

/**
 * FIND THE OBJECT (Section G):
 * - Large 3D-shaded Classroom scene filling most of the screen
 * - 9 Missions strictly matching: CHALK, TABLE, CLOCK, CHAIR, BLACKBOARD, BAG, CUPBOARD, BOOK, GLOBE
 * - ZERO DOOR, ZERO WINDOW, ZERO CUP
 * - ZERO visual hints (NO dashed boxes, NO borders, NO circles, NO arrows, NO glow, NO blinking on target!)
 * - All items blend naturally with identical clean appearance.
 */
export const FindObjectView: React.FC<FindObjectViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [missions, setMissions] = useState<ClassroomObjectId[]>(() =>
    shuffleArray([...FIND_OBJECT_MISSIONS])
  );
  const [missionIdx, setMissionIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry'; text: string } | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const targetObject = missions[missionIdx];

  useEffect(() => {
    if (!isComplete && targetObject) {
      const timer = setTimeout(() => {
        speakEnglish(`Find the ${targetObject}`);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [missionIdx, isComplete, targetObject]);

  const handleTapObject = (tappedId: ClassroomObjectId) => {
    if (locked || isComplete) return;

    if (tappedId === targetObject) {
      setLocked(true);
      const praise = triggerSuccessPraise();
      setScore((s) => s + 10);
      setFeedback({ type: 'success', text: praise });

      setTimeout(() => {
        setFeedback(null);
        setLocked(false);
        if (missionIdx + 1 >= missions.length) {
          sounds.playVictoryBarakallah();
          setIsComplete(true);
        } else {
          setMissionIdx((m) => m + 1);
        }
      }, 1350);
    } else {
      sounds.playWrong();
      setFeedback({ type: 'retry', text: 'TRY AGAIN!' });
      setTimeout(() => {
        setFeedback((curr) => (curr?.type === 'retry' ? null : curr));
      }, 1050);
    }
  };

  const handleReplay = () => {
    sounds.playClick();
    setMissions(shuffleArray([...FIND_OBJECT_MISSIONS]));
    setMissionIdx(0);
    setScore(0);
    setFeedback(null);
    setLocked(false);
    setIsComplete(false);
  };

  // All classroom items naturally placed with generous touch area & NO visual distinction between target & others!
  const classroomObjectsLayout: {
    id: ClassroomObjectId;
    posClass: string;
    size: number;
    zIndex: string;
  }[] = [
    { id: 'CALENDAR', posClass: 'top-[13%] left-[2%] sm:left-[5%] w-[16%] max-w-[90px]', size: 90, zIndex: 'z-10' },
    { id: 'BLACKBOARD', posClass: 'top-[10%] left-[21%] sm:left-[24%] w-[30%] max-w-[175px]', size: 175, zIndex: 'z-10' },
    { id: 'CHALK', posClass: 'top-[38%] left-[31%] sm:left-[34%] w-[13%] max-w-[68px]', size: 68, zIndex: 'z-20' },
    { id: 'CLOCK', posClass: 'top-[7%] left-[55%] sm:left-[57%] w-[16%] max-w-[84px]', size: 84, zIndex: 'z-10' },
    { id: 'CUPBOARD', posClass: 'top-[18%] right-[2%] sm:right-[4%] w-[26%] max-w-[165px]', size: 165, zIndex: 'z-10' },
    { id: 'TABLE', posClass: 'bottom-[7%] left-[8%] sm:left-[16%] w-[32%] max-w-[165px]', size: 165, zIndex: 'z-20' },
    { id: 'GLOBE', posClass: 'bottom-[32%] left-[8%] sm:left-[15%] w-[16%] max-w-[82px]', size: 82, zIndex: 'z-30' },
    { id: 'BOOK', posClass: 'bottom-[31%] left-[26%] sm:left-[30%] w-[15%] max-w-[78px]', size: 78, zIndex: 'z-30' },
    { id: 'PENCIL', posClass: 'bottom-[33%] left-[42%] sm:left-[44%] w-[13%] max-w-[62px]', size: 62, zIndex: 'z-30' },
    { id: 'CHAIR', posClass: 'bottom-[7%] left-[48%] sm:left-[55%] w-[23%] max-w-[122px]', size: 122, zIndex: 'z-20' },
    { id: 'BAG', posClass: 'bottom-[8%] right-[3%] sm:right-[10%] w-[19%] max-w-[92px]', size: 92, zIndex: 'z-30' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-pink-50 animate-page-flip">
      <GameTopBar
        title="FIND THE OBJECT"
        subtitle="Amati ruang kelas dengan teliti, lalu ketuk benda yang diminta!"
        progressText={`${missionIdx + 1}/9`}
        scoreText={`Score: ${score}`}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-3">
        {/* Instruction Bar: NO target image preview! */}
        <div className="bg-white rounded-3xl border-3 border-sky-200 px-4 py-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
              Mission {missionIdx + 1} of 9
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-sky-900 font-display">
              FIND THE <span className="text-pink-500">{targetObject}!</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                speakEnglish(`Find the ${targetObject}`);
              }}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-sky-700 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>LISTEN</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                speakEnglish(`Find the ${targetObject}`);
              }}
              className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl shadow border-b-3 border-amber-600 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>REPEAT</span>
            </button>
          </div>
        </div>

        {/* Large 3D Classroom Interactive Scene (NO Doors, NO Windows, NO Cups, NO Visual Hints!) */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden select-none bg-sky-50">
          {/* Classroom Walls */}
          <div className="absolute inset-x-0 top-0 h-[66%] bg-gradient-to-b from-sky-200/80 via-sky-100 to-sky-50 border-b-8 border-amber-200" />
          {/* Classroom Pastel Bunting */}
          <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none opacity-85">
            {['bg-pink-300', 'bg-yellow-300', 'bg-sky-300', 'bg-pink-300', 'bg-yellow-300', 'bg-sky-300', 'bg-pink-300'].map(
              (color, i) => (
                <div key={i} className={`w-10 sm:w-14 h-5 sm:h-6 ${color} rounded-b-full`} />
              )
            )}
          </div>
          {/* Classroom Wooden Floor */}
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-amber-200 to-amber-300">
            <div className="w-full h-full opacity-20 flex">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-amber-700 h-full" />
              ))}
            </div>
          </div>

          {/* Interactive Classroom Objects - uniform, natural, zero highlights/hints */}
          {classroomObjectsLayout.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTapObject(item.id)}
              aria-label={`Select ${item.id}`}
              className={`absolute ${item.posClass} ${item.zIndex} p-1 cursor-pointer active:scale-95 transition-transform duration-150 focus-visible:outline-none [&>svg]:w-full [&>svg]:h-auto`}
            >
              <ClassroomObject3D objectId={item.id} size={item.size} />
            </button>
          ))}

          {/* Feedback Banner */}
          {feedback && (
            <div className="absolute inset-x-0 top-5 flex justify-center z-40 pointer-events-none">
              <div
                className={`px-6 py-2.5 rounded-3xl shadow-xl border-4 font-black text-xl sm:text-3xl font-display animate-praise-pop flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-gradient-to-r from-yellow-300 to-amber-300 text-amber-950 border-white'
                    : 'bg-white text-pink-600 border-pink-300'
                }`}
              >
                {feedback.type === 'success' && <Sparkles className="w-6 h-6 text-amber-700" />}
                <span>{feedback.text}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {isComplete && (
        <BarakallahCelebration
          title="Find the Object Complete! (9/9)"
          scoreText={`Final Score: ${score} Points`}
          onReplay={handleReplay}
          onHome={onHome}
        />
      )}
    </div>
  );
};
