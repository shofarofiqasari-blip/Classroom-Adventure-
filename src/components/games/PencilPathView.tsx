import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, RotateCw, Sparkles } from 'lucide-react';
import { CLASSROOM_OBJECTS, ClassroomObjectId, shuffleArray } from '../../data/classroomData';
import { ClassroomObject3D } from '../Objects3D';
import { StudentBoyAvatar, StudentGirlAvatar } from '../VisualIllustrations';
import { UstadzahShofaMascot, BarakallahCelebration } from '../UstadzahShofaMascot';
import { sounds, speakEnglish, triggerSuccessPraise } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface PencilPathViewProps {
  playerGender?: 'boy' | 'girl';
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

interface Coord {
  r: number;
  c: number;
}

interface MazeBlueprint {
  start: Coord;
  grid: number[][]; // 0 = open path, 1 = wall
  candidateSpots: Coord[]; // varied intersection/dead-end spots for target + distractors
}

// 6 Varied 7x9 Mazes with intersections, alternative paths, and dead ends (never a simple straight line!)
const MAZE_BLUEPRINTS: MazeBlueprint[] = [
  {
    start: { r: 3, c: 0 },
    grid: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 0, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 1, 1, 0],
    ],
    candidateSpots: [
      { r: 0, c: 2 },
      { r: 0, c: 8 },
      { r: 2, c: 6 },
      { r: 5, c: 0 },
      { r: 6, c: 0 },
      { r: 6, c: 8 },
    ],
  },
  {
    start: { r: 0, c: 0 },
    grid: [
      [0, 0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 1, 1, 0, 0],
    ],
    candidateSpots: [
      { r: 0, c: 5 },
      { r: 0, c: 8 },
      { r: 2, c: 0 },
      { r: 6, c: 0 },
      { r: 6, c: 4 },
      { r: 6, c: 8 },
    ],
  },
  {
    start: { r: 6, c: 0 },
    grid: [
      [0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0],
    ],
    candidateSpots: [
      { r: 0, c: 0 },
      { r: 0, c: 6 },
      { r: 0, c: 8 },
      { r: 3, c: 4 },
      { r: 5, c: 0 },
      { r: 6, c: 8 },
    ],
  },
  {
    start: { r: 3, c: 8 },
    grid: [
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
    ],
    candidateSpots: [
      { r: 0, c: 0 },
      { r: 0, c: 5 },
      { r: 2, c: 0 },
      { r: 4, c: 0 },
      { r: 6, c: 0 },
      { r: 6, c: 4 },
    ],
  },
  {
    start: { r: 0, c: 4 },
    grid: [
      [0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
    ],
    candidateSpots: [
      { r: 0, c: 0 },
      { r: 0, c: 8 },
      { r: 4, c: 0 },
      { r: 4, c: 8 },
      { r: 6, c: 0 },
      { r: 6, c: 8 },
    ],
  },
  {
    start: { r: 6, c: 4 },
    grid: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0, 1],
      [0, 1, 0, 1, 0, 0, 0, 0, 0],
    ],
    candidateSpots: [
      { r: 0, c: 0 },
      { r: 0, c: 8 },
      { r: 2, c: 6 },
      { r: 5, c: 0 },
      { r: 6, c: 0 },
      { r: 6, c: 8 },
    ],
  },
];

interface PlacedNode {
  r: number;
  c: number;
  objectId: ClassroomObjectId;
  isTarget: boolean;
  oopsVisited: boolean;
}

export const PencilPathView: React.FC<PencilPathViewProps> = ({
  playerGender = 'boy',
  isMuted,
  onToggleMute,
  onHome,
}) => {
  // 6 rounds guaranteeing GLOBE + varied objects from the 11 Classroom Objects
  const [roundTargets, setRoundTargets] = useState<ClassroomObjectId[]>(() => {
    const others = shuffleArray(
      CLASSROOM_OBJECTS.map((o) => o.id).filter((id) => id !== 'GLOBE')
    ).slice(0, 5);
    return shuffleArray(['GLOBE', ...others]);
  });

  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [blueprintIdx, setBlueprintIdx] = useState<number>(0);
  const [playerPos, setPlayerPos] = useState<Coord>({ r: 3, c: 0 });
  const [trail, setTrail] = useState<string[]>(['3-0']);
  const [placedNodes, setPlacedNodes] = useState<PlacedNode[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'oops'; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [roundLocked, setRoundLocked] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const blueprint = MAZE_BLUEPRINTS[blueprintIdx % MAZE_BLUEPRINTS.length];
  const targetObject = roundTargets[roundIdx];

  const setupRound = useCallback((rIdx: number, targetId: ClassroomObjectId) => {
    const bp = MAZE_BLUEPRINTS[rIdx % MAZE_BLUEPRINTS.length];
    const distractors = shuffleArray(
      CLASSROOM_OBJECTS.map((o) => o.id).filter((id) => id !== targetId)
    ).slice(0, 5);

    const items = shuffleArray([targetId, ...distractors]);
    const spots = shuffleArray(bp.candidateSpots);

    const nodes: PlacedNode[] = items.map((objId, i) => ({
      r: spots[i].r,
      c: spots[i].c,
      objectId: objId,
      isTarget: objId === targetId,
      oopsVisited: false,
    }));

    setBlueprintIdx(rIdx % MAZE_BLUEPRINTS.length);
    setPlayerPos(bp.start);
    setTrail([`${bp.start.r}-${bp.start.c}`]);
    setPlacedNodes(nodes);
    setFeedback(null);
    setRoundLocked(false);
  }, []);

  useEffect(() => {
    if (!isComplete && targetObject) {
      setupRound(roundIdx, targetObject);
      const timer = setTimeout(() => {
        speakEnglish(`Find the ${targetObject}`);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [roundIdx, isComplete, targetObject, setupRound]);

  const tryMoveTo = useCallback(
    (nextR: number, nextC: number) => {
      if (roundLocked || isComplete) return;
      if (nextR < 0 || nextR >= blueprint.grid.length || nextC < 0 || nextC >= blueprint.grid[0].length) {
        return;
      }
      // Must be strictly adjacent (1 step orthogonal) & open corridor (0)
      const manhattan = Math.abs(nextR - playerPos.r) + Math.abs(nextC - playerPos.c);
      if (manhattan !== 1) return;
      if (blueprint.grid[nextR][nextC] === 1) {
        sounds.playWrong();
        return;
      }

      sounds.playStep();

      // Check if stepped on placed node
      const hitNode = placedNodes.find((n) => n.r === nextR && n.c === nextC);
      if (hitNode) {
        if (hitNode.isTarget) {
          setPlayerPos({ r: nextR, c: nextC });
          setTrail((t) => [...t, `${nextR}-${nextC}`]);
          setRoundLocked(true);
          const praise = triggerSuccessPraise();
          setScore((s) => s + 15);
          setFeedback({ type: 'success', text: praise });

          setTimeout(() => {
            if (roundIdx + 1 >= roundTargets.length) {
              sounds.playVictoryBarakallah();
              setIsComplete(true);
            } else {
              setRoundIdx((r) => r + 1);
            }
          }, 1450);
        } else {
          // Distractor hit -> bounce softly, keep player on previous cell, show OOPS! TRY ANOTHER WAY!
          sounds.playWrong();
          setPlacedNodes((prev) =>
            prev.map((n) => (n.r === nextR && n.c === nextC ? { ...n, oopsVisited: true } : n))
          );
          setFeedback({ type: 'oops', text: 'OOPS! TRY ANOTHER WAY!' });
          setTimeout(() => {
            setFeedback((f) => (f?.type === 'oops' ? null : f));
          }, 1250);
        }
        return;
      }

      setPlayerPos({ r: nextR, c: nextC });
      setTrail((prev) => (prev.includes(`${nextR}-${nextC}`) ? prev : [...prev, `${nextR}-${nextC}`]));
    },
    [roundLocked, isComplete, blueprint, playerPos, placedNodes, roundIdx, roundTargets.length]
  );

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        tryMoveTo(playerPos.r - 1, playerPos.c);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        tryMoveTo(playerPos.r + 1, playerPos.c);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        tryMoveTo(playerPos.r, playerPos.c - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        tryMoveTo(playerPos.r, playerPos.c + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [playerPos, tryMoveTo]);

  const handleReplay = () => {
    sounds.playClick();
    const others = shuffleArray(
      CLASSROOM_OBJECTS.map((o) => o.id).filter((id) => id !== 'GLOBE')
    ).slice(0, 5);
    setRoundTargets(shuffleArray(['GLOBE', ...others]));
    setRoundIdx(0);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-pink-50 animate-page-flip">
      <GameTopBar
        title="PENCIL PATH"
        subtitle="Geser atau ketuk langsung jalur di labirin untuk menemukan benda yang tepat!"
        progressText={`${roundIdx + 1}/${roundTargets.length}`}
        scoreText={`Score: ${score}`}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-3">
        {/* Instruction Bar */}
        <div className="bg-white rounded-3xl border-3 border-sky-200 px-4 py-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
              Maze {roundIdx + 1} of {roundTargets.length}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-sky-900 font-display">
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

        {/* Full-Width Direct Play Interactive Grid Maze (No extra D-pad buttons!) */}
        <div className="w-full max-w-3xl mx-auto relative bg-white rounded-[2rem] border-4 border-sky-300 p-3 sm:p-4 shadow-xl select-none touch-none">
          {feedback && (
            <div className="absolute inset-x-0 top-4 flex justify-center z-30 pointer-events-none px-3">
              <div
                className={`px-4 py-2 rounded-3xl shadow-xl border-4 font-black text-lg sm:text-2xl font-display animate-praise-pop flex items-center gap-3 ${
                  feedback.type === 'success'
                    ? 'bg-yellow-300 text-amber-950 border-white'
                    : 'bg-pink-500 text-white border-white'
                }`}
              >
                {feedback.type === 'success' && <UstadzahShofaMascot size="sm" mood="clapping" />}
                {feedback.type === 'success' && <Sparkles className="w-5 h-5" />}
                <span>{feedback.text}</span>
              </div>
            </div>
          )}

          <div
            onPointerMove={(e) => {
              if (!isDragging) return;
              const el = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-maze-cell]');
              if (el) {
                const r = Number(el.getAttribute('data-row'));
                const c = Number(el.getAttribute('data-col'));
                if (!Number.isNaN(r) && !Number.isNaN(c)) {
                  tryMoveTo(r, c);
                }
              }
            }}
            onPointerUp={() => setIsDragging(false)}
            onPointerCancel={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            className="grid grid-cols-9 gap-1 sm:gap-1.5 bg-sky-100 p-2 rounded-2xl border-2 border-sky-200 touch-none"
          >
            {blueprint.grid.map((row, r) =>
              row.map((cell, c) => {
                const isWall = cell === 1;
                const isPlayer = playerPos.r === r && playerPos.c === c;
                const isVisited = trail.includes(`${r}-${c}`);
                const node = placedNodes.find((n) => n.r === r && n.c === c);

                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    data-maze-cell="true"
                    data-row={r}
                    data-col={c}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                      tryMoveTo(r, c);
                    }}
                    onClick={() => tryMoveTo(r, c)}
                    className={`relative aspect-square rounded-xl flex items-center justify-center transition-all touch-none ${
                      isWall
                        ? 'bg-gradient-to-b from-sky-500 to-sky-600 shadow-inner border-b-3 border-sky-800 cursor-not-allowed'
                        : isVisited
                        ? 'bg-yellow-50 border border-yellow-200 cursor-pointer'
                        : 'bg-white hover:bg-sky-50 border border-sky-100 cursor-pointer'
                    }`}
                  >
                    {/* Path pebble dot */}
                    {!isWall && !isPlayer && !node && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isVisited ? 'bg-yellow-400' : 'bg-sky-200'
                        }`}
                      />
                    )}

                    {/* Target or Distractor Object (Zero text labels!) */}
                    {node && !isPlayer && (
                      <div
                        className={`transition-all ${
                          node.oopsVisited ? 'opacity-30 grayscale scale-90' : 'hover:scale-105'
                        }`}
                      >
                        <ClassroomObject3D objectId={node.objectId} size={46} />
                      </div>
                    )}

                    {/* Controllable Boy / Girl Student Character */}
                    {isPlayer && (
                      <div
                        className="relative z-20 animate-bounce [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-11 sm:[&>svg]:h-11 drop-shadow-md"
                        style={{ animationDuration: '1.6s' }}
                      >
                        {playerGender === 'girl' ? (
                          <StudentGirlAvatar size={46} />
                        ) : (
                          <StudentBoyAvatar size={46} />
                        )}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <p className="text-center text-xs font-bold text-slate-500 mt-2.5">
            Sentuh &amp; geser langsung karakter di jalur labirin menuju <span className="text-pink-600 font-extrabold">{targetObject}</span>!
          </p>
        </div>
      </main>

      {isComplete && (
        <BarakallahCelebration
          title={`Pencil Path Complete! (${roundTargets.length}/${roundTargets.length})`}
          scoreText={`Final Score: ${score} Points`}
          onReplay={handleReplay}
          onHome={onHome}
        />
      )}
    </div>
  );
};
