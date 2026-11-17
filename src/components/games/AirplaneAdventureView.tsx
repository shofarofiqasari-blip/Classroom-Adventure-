import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCw, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { CLASSROOM_OBJECTS, ClassroomObjectId, shuffleArray } from '../../data/classroomData';
import { ClassroomObject3D } from '../Objects3D';
import { BarakallahCelebration } from '../UstadzahShofaMascot';
import { sounds, speakEnglish, triggerSuccessPraise } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface AirplaneAdventureViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

interface CloudNode {
  id: string;
  objectId: ClassroomObjectId;
  isTarget: boolean;
  x: number; // percentage 0..100
  y: number; // percentage 12..86
  bumped: boolean;
}

// 4 widely-spaced sky lanes so clouds NEVER sit close together (only 1 target + 3 distractors)
type SkyZone = 'front' | 'midFront' | 'midBack' | 'back';

const LANE_X: Record<SkyZone, number> = {
  front: 24,
  midFront: 45,
  midBack: 66,
  back: 86,
};

const ALTITUDES = [20, 50, 80];

function buildZoneSchedule(count: number): SkyZone[] {
  // Never start Round 1 in front; rotate evenly across all 4 depth lanes
  const pool: SkyZone[] = [];
  const base: SkyZone[] = ['midFront', 'midBack', 'back', 'front'];
  while (pool.length < count) {
    pool.push(...shuffleArray(base));
  }
  if (pool[0] === 'front') {
    const swapIdx = pool.findIndex((z) => z !== 'front');
    if (swapIdx > 0) {
      [pool[0], pool[swapIdx]] = [pool[swapIdx], pool[0]];
    }
  }
  for (let i = 1; i < count; i++) {
    if (pool[i] === pool[i - 1]) {
      const nextDiff = pool.findIndex((z, idx) => idx > i && z !== pool[i]);
      if (nextDiff !== -1) {
        [pool[i], pool[nextDiff]] = [pool[nextDiff], pool[i]];
      }
    }
  }
  return pool.slice(0, count);
}

export const AirplaneAdventureView: React.FC<AirplaneAdventureViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [roundOrder, setRoundOrder] = useState<ClassroomObjectId[]>(() =>
    shuffleArray(CLASSROOM_OBJECTS.map((o) => o.id))
  );
  const [zoneSchedule, setZoneSchedule] = useState<SkyZone[]>(() => buildZoneSchedule(11));
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [clouds, setClouds] = useState<CloudNode[]>([]);
  const [planePos, setPlanePos] = useState<{ x: number; y: number }>({ x: 8, y: 50 });
  const [planeTilt, setPlaneTilt] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry'; text: string } | null>(null);
  const [roundLocked, setRoundLocked] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const skyRef = useRef<HTMLDivElement>(null);
  const planePosRef = useRef<{ x: number; y: number }>({ x: 8, y: 50 });
  const targetYRef = useRef<number>(50);
  const isDraggingRef = useRef<boolean>(false);
  const cloudsRef = useRef<CloudNode[]>([]);
  const roundLockedRef = useRef<boolean>(false);

  const targetObject = roundOrder[roundIdx];

  // Build 4 well-separated clouds: 1 target + strictly 3 distractors
  const setupRoundClouds = useCallback((targetId: ClassroomObjectId, targetZone: SkyZone) => {
    const distractors = shuffleArray(
      CLASSROOM_OBJECTS.map((o) => o.id).filter((id) => id !== targetId)
    ).slice(0, 3);

    const allZones: SkyZone[] = ['front', 'midFront', 'midBack', 'back'];
    const distractorZones = shuffleArray(allZones.filter((z) => z !== targetZone));

    // Stagger altitudes so adjacent horizontal lanes never share the same height
    const yOptions = shuffleArray(ALTITUDES);
    const assignedY: Record<SkyZone, number> = {
      front: yOptions[0],
      midFront: yOptions[1],
      midBack: yOptions[2],
      back: yOptions[0] === 50 ? 20 : 50,
    };

    const rawNodes: CloudNode[] = [
      {
        id: `${targetId}-target-${Date.now()}`,
        objectId: targetId,
        isTarget: true,
        x: LANE_X[targetZone],
        y: assignedY[targetZone],
        bumped: false,
      },
      ...distractors.map((objId, idx) => {
        const z = distractorZones[idx];
        return {
          id: `${targetId}-${objId}-${idx}-${Date.now()}`,
          objectId: objId,
          isTarget: false,
          x: LANE_X[z],
          y: assignedY[z],
          bumped: false,
        };
      }),
    ];

    const newClouds = shuffleArray(rawNodes);
    cloudsRef.current = newClouds;
    setClouds(newClouds);
    planePosRef.current = { x: 7, y: 50 };
    targetYRef.current = 50;
    setPlanePos({ x: 7, y: 50 });
    setPlaneTilt(0);
    setFeedback(null);
    roundLockedRef.current = false;
    setRoundLocked(false);
  }, []);

  useEffect(() => {
    if (!isComplete && targetObject) {
      setupRoundClouds(targetObject, zoneSchedule[roundIdx] || 'midFront');
      const timer = setTimeout(() => {
        speakEnglish(`Find the ${targetObject}`);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [roundIdx, isComplete, targetObject, zoneSchedule, setupRoundClouds]);

  // Smooth 60fps airplane flying loop (Left -> Right continuously + collision check)
  useEffect(() => {
    if (isComplete) return;
    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!roundLockedRef.current) {
        const prev = planePosRef.current;
        // Continuous left-to-right speed (~12.5% per second)
        let nextX = prev.x + 12.5 * dt;
        if (nextX > 94) {
          nextX = 6;
          // Reset bumped distractors on new pass so player can retry cleanly
          cloudsRef.current = cloudsRef.current.map((c) => ({ ...c, bumped: false }));
          setClouds(cloudsRef.current);
        }

        // Smooth interpolation toward user's targetY
        const dy = targetYRef.current - prev.y;
        const nextY = Math.max(12, Math.min(88, prev.y + dy * Math.min(1, dt * 11)));
        const tilt = Math.max(-22, Math.min(22, dy * 0.9));

        planePosRef.current = { x: nextX, y: nextY };
        setPlanePos({ x: nextX, y: nextY });
        setPlaneTilt(tilt);

        // Collision detection with clouds
        for (const cloud of cloudsRef.current) {
          if (cloud.bumped) continue;
          const distX = Math.abs(nextX - cloud.x);
          const distY = Math.abs(nextY - cloud.y);
          if (distX < 6.8 && distY < 11.5) {
            if (cloud.isTarget) {
              roundLockedRef.current = true;
              setRoundLocked(true);
              sounds.playCollectWhoosh();
              const praise = triggerSuccessPraise();
              setScore((s) => s + 10);
              setFeedback({ type: 'success', text: praise });

              setTimeout(() => {
                if (roundIdx + 1 >= roundOrder.length) {
                  sounds.playVictoryBarakallah();
                  setIsComplete(true);
                } else {
                  setRoundIdx((r) => r + 1);
                }
              }, 1450);
              break;
            } else {
              // Gentle distractor feedback without interrupting flight
              cloud.bumped = true;
              cloudsRef.current = [...cloudsRef.current];
              setClouds(cloudsRef.current);
              sounds.playWrong();
              const gentleMessages = ['TRY AGAIN!', 'YOU CAN DO IT!'];
              setFeedback({
                type: 'retry',
                text: gentleMessages[Math.floor(Math.random() * gentleMessages.length)],
              });
              setTimeout(() => {
                setFeedback((curr) => (curr?.type === 'retry' ? null : curr));
              }, 1100);
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isComplete, roundIdx, roundOrder.length]);

  // Keyboard Up/Down control
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        targetYRef.current = Math.max(12, targetYRef.current - 12);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        targetYRef.current = Math.min(88, targetYRef.current + 12);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Touch / Mouse drag control directly on the sky canvas
  const updateYFromPointer = (clientY: number) => {
    if (!skyRef.current) return;
    const rect = skyRef.current.getBoundingClientRect();
    const relY = ((clientY - rect.top) / rect.height) * 100;
    targetYRef.current = Math.max(12, Math.min(88, relY));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateYFromPointer(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateYFromPointer(e.clientY);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleReplay = () => {
    sounds.playClick();
    setRoundOrder(shuffleArray(CLASSROOM_OBJECTS.map((o) => o.id)));
    setZoneSchedule(buildZoneSchedule(11));
    setRoundIdx(0);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-200 via-sky-100 to-pink-50 animate-page-flip">
      <GameTopBar
        title="AIRPLANE ADVENTURE"
        subtitle="Arahkan pesawat ke atas atau ke bawah untuk mengambil benda yang tepat!"
        progressText={`${roundIdx + 1}/11`}
        scoreText={`Score: ${score}`}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-3">
        {/* Instruction Bar: ONLY English target word, NO Indonesian translation, NO target image! */}
        <div className="bg-white/95 rounded-3xl border-3 border-sky-300 px-4 py-3 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
              Round {roundIdx + 1} of 11
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-sky-900 font-display tracking-wide">
              {targetObject}!
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                speakEnglish(`Find the ${targetObject}`);
              }}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-sky-700 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>LISTEN</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                speakEnglish(`Find the ${targetObject}`);
              }}
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl shadow border-b-3 border-amber-600 cursor-pointer"
              title="Ulangi Audio"
            >
              <RotateCw className="w-4 h-4" />
              <span>REPEAT</span>
            </button>
          </div>
        </div>

        {/* Interactive Sky Canvas */}
        <div
          ref={skyRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative flex-1 min-h-[380px] sm:min-h-[450px] rounded-[2rem] border-4 border-white shadow-xl overflow-hidden select-none touch-none bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 cursor-ns-resize"
        >
          {/* Decorative Sun, Empty Drifting Clouds & Background Hills */}
          <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_40px_#fde047] opacity-90 pointer-events-none" />
          <div className="absolute top-[12%] left-[15%] text-4xl sm:text-5xl opacity-55 animate-float-drift pointer-events-none">☁️</div>
          <div className="absolute top-[68%] left-[45%] text-4xl sm:text-5xl opacity-50 animate-float-slow pointer-events-none">☁️</div>
          <div className="absolute top-[22%] left-[72%] text-3xl sm:text-4xl opacity-45 animate-float-drift pointer-events-none">☁️</div>
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-emerald-300/60 to-transparent pointer-events-none" />

          {/* Floating Clouds with Classroom Object Pictures (NO TEXT LABELS!) */}
          {clouds.map((cloud) => (
            <div
              key={cloud.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${
                cloud.bumped ? 'opacity-25 scale-75' : 'opacity-100'
              } ${roundLocked && cloud.isTarget ? 'scale-125 drop-shadow-[0_0_24px_#facc15] z-30' : 'z-10'}`}
              style={{ left: `${cloud.x}%`, top: `${cloud.y}%` }}
            >
              {/* Star burst effect when target cloud is collected */}
              {roundLocked && cloud.isTarget && (
                <div className="pointer-events-none absolute -inset-5 flex items-center justify-center z-40">
                  <span className="absolute -top-2 -left-2 text-2xl animate-ping">⭐</span>
                  <span className="absolute -top-3 right-0 text-xl animate-bounce">✨</span>
                  <span className="absolute -bottom-2 -right-2 text-2xl animate-ping">⭐</span>
                  <span className="absolute bottom-0 -left-3 text-xl animate-bounce">🌟</span>
                </div>
              )}

              {/* Fluffy 3D Cloud Container */}
              <div className="relative flex items-center justify-center w-24 h-20 sm:w-32 sm:h-24">
                <svg viewBox="0 0 160 110" className="absolute inset-0 w-full h-full drop-shadow-md">
                  <path
                    d="M 35,92 C 15,92 6,78 12,62 C 16,50 28,46 36,48 C 40,26 62,16 82,24 C 98,14 122,22 126,44 C 144,44 154,60 148,76 C 144,88 132,92 120,92 Z"
                    fill="#ffffff"
                    stroke="#bae6fd"
                    strokeWidth="4"
                  />
                </svg>
                <div className="relative z-10 -mt-1">
                  <ClassroomObject3D objectId={cloud.objectId} size={62} />
                </div>
              </div>
            </div>
          ))}

          {/* Controllable 3D Cartoon Airplane */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-transform duration-75"
            style={{
              left: `${planePos.x}%`,
              top: `${planePos.y}%`,
              transform: `translate(-50%, -50%) rotate(${planeTilt}deg)`,
            }}
          >
            <svg viewBox="0 0 140 90" className="w-24 h-16 sm:w-32 sm:h-20 drop-shadow-xl">
              <defs>
                <linearGradient id="planeBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              {/* Tail fin */}
              <path d="M 18,46 L 8,20 L 28,20 L 38,44 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Fuselage */}
              <path
                d="M 18,44 C 30,32 94,30 118,44 C 126,49 126,58 116,62 C 92,70 30,68 18,54 Z"
                fill="url(#planeBody)"
                stroke="#1d4ed8"
                strokeWidth="2.5"
              />
              {/* Yellow Stripe */}
              <path d="M 32,52 L 106,52" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
              {/* Cockpit Glass */}
              <path d="M 62,36 C 72,22 92,24 98,38 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              {/* Wing */}
              <path d="M 54,54 L 38,78 L 68,78 L 80,54 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
              {/* Spinning Propeller */}
              <rect x="118" y="45" width="7" height="12" rx="3" fill="#f43f5e" />
              <ellipse cx="127" cy="51" rx="3.5" ry="20" fill="#fef08a" opacity="0.8" stroke="#eab308" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Feedback Banner Overlay */}
          {feedback && (
            <div className="absolute inset-x-0 top-5 flex justify-center z-40 pointer-events-none">
              <div
                className={`px-6 py-2.5 rounded-3xl shadow-xl border-4 font-black text-xl sm:text-3xl font-display animate-praise-pop flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-gradient-to-r from-yellow-300 to-amber-300 text-amber-950 border-white'
                    : 'bg-white/95 text-pink-600 border-pink-300'
                }`}
              >
                {feedback.type === 'success' && <Sparkles className="w-6 h-6 text-amber-700" />}
                <span>{feedback.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Accessible Controls (Up / Down Touch Buttons + Drag Hint) */}
        <div className="bg-white/95 rounded-3xl border-2 border-sky-200 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="text-xs sm:text-sm font-bold text-slate-600">
            Sentuh & geser langit ke atas/bawah, atau pakai tombol panah!
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                targetYRef.current = Math.max(12, targetYRef.current - 16);
              }}
              className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-sky-700 cursor-pointer"
            >
              <ArrowUp className="w-5 h-5" />
              <span>UP</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                targetYRef.current = Math.min(88, targetYRef.current + 16);
              }}
              className="flex items-center gap-1 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow border-b-3 border-pink-700 cursor-pointer"
            >
              <ArrowDown className="w-5 h-5" />
              <span>DOWN</span>
            </button>
          </div>
        </div>
      </main>

      {isComplete && (
        <BarakallahCelebration
          title="Airplane Adventure Complete! (11/11)"
          scoreText={`Final Score: ${score} Points`}
          onReplay={handleReplay}
          onHome={onHome}
        />
      )}
    </div>
  );
};
