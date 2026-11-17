import React, { useState } from 'react';
import { Volume2, RotateCw, Sparkles, Compass } from 'lucide-react';
import {
  CLASSROOM_OBJECTS,
  POSITIONS,
  ClassroomObjectId,
  PositionId,
} from '../../data/classroomData';
import { ClassroomObject3D, PositionScene3D } from '../Objects3D';
import { UstadzahShofaMascot } from '../UstadzahShofaMascot';
import { sounds, speakEnglish } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface LetsExploreViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

export const LetsExploreView: React.FC<LetsExploreViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [mode, setMode] = useState<'classroom' | 'positions'>('classroom');
  const [selectedObj, setSelectedObj] = useState<ClassroomObjectId>('GLOBE');
  const [selectedPos, setSelectedPos] = useState<PositionId>('ON');
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(['GLOBE']);

  const selectedObjMeta = CLASSROOM_OBJECTS.find((o) => o.id === selectedObj)!;
  const selectedPosMeta = POSITIONS.find((p) => p.id === selectedPos)!;

  const handleTapObject = (id: ClassroomObjectId) => {
    sounds.playStarCollect();
    setSelectedObj(id);
    if (!discoveredIds.includes(id)) {
      setDiscoveredIds((prev) => [...prev, id]);
    }
    speakEnglish(id);
  };

  const handleTapPosition = (posId: PositionId) => {
    sounds.playClick();
    setSelectedPos(posId);
    const meta = POSITIONS.find((p) => p.id === posId)!;
    speakEnglish(`${meta.word}. ${meta.exampleSentence}`);
  };

  // Interactive placements for the 11 objects in the Explore Classroom
  const roomPlacements: {
    id: ClassroomObjectId;
    style: string;
    size: number;
  }[] = [
    { id: 'BLACKBOARD', style: 'top-[12%] left-[24%] w-[26%]', size: 120 },
    { id: 'CLOCK', style: 'top-[8%] left-[54%]', size: 68 },
    { id: 'CALENDAR', style: 'top-[14%] left-[8%]', size: 78 },
    { id: 'CHALK', style: 'top-[36%] left-[34%]', size: 62 },
    { id: 'CUPBOARD', style: 'top-[22%] right-[6%]', size: 125 },
    { id: 'TABLE', style: 'bottom-[14%] left-[22%]', size: 125 },
    { id: 'GLOBE', style: 'bottom-[34%] left-[23%]', size: 70 },
    { id: 'BOOK', style: 'bottom-[33%] left-[34%]', size: 64 },
    { id: 'PENCIL', style: 'bottom-[33%] left-[44%]', size: 58 },
    { id: 'CHAIR', style: 'bottom-[10%] left-[56%]', size: 98 },
    { id: 'BAG', style: 'bottom-[12%] left-[72%]', size: 78 },
  ];

  const posSampleMap: Record<PositionId, { sub: ClassroomObjectId; anc: ClassroomObjectId; anc2?: ClassroomObjectId }> = {
    IN: { sub: 'PENCIL', anc: 'BAG' },
    ON: { sub: 'GLOBE', anc: 'TABLE' },
    UNDER: { sub: 'BAG', anc: 'CHAIR' },
    BESIDE: { sub: 'CLOCK', anc: 'BLACKBOARD' },
    BEHIND: { sub: 'BOOK', anc: 'GLOBE' },
    BETWEEN: { sub: 'CHALK', anc: 'BOOK', anc2: 'GLOBE' },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-yellow-50 animate-page-flip">
      <GameTopBar
        title="LET'S EXPLORE"
        subtitle="Sentuh benda-benda di kelas & coba posisi benda secara interaktif"
        progressText={mode === 'classroom' ? `${discoveredIds.length}/11 Explored` : '6 Positions'}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-4">
        {/* Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-3xl border-2 border-sky-200 p-3.5 shadow-sm">
          <UstadzahShofaMascot
            size="sm"
            message={
              mode === 'classroom'
                ? 'Sentuh setiap benda di dalam ruang kelas untuk melihat namanya dan mendengar pelafalannya!'
                : 'Pilih kata posisi di bawah untuk melihat bagaimana benda berpindah tempat!'
            }
          />

          <div className="flex gap-2 p-1 bg-sky-100 rounded-2xl border border-sky-200">
            <button
              onClick={() => {
                sounds.playClick();
                setMode('classroom');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black cursor-pointer transition-all ${
                mode === 'classroom'
                  ? 'bg-sky-500 text-white shadow'
                  : 'text-sky-800 hover:bg-white/60'
              }`}
            >
              🏫 Explore Classroom (11)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setMode('positions');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black cursor-pointer transition-all ${
                mode === 'positions'
                  ? 'bg-pink-500 text-white shadow'
                  : 'text-pink-700 hover:bg-white/60'
              }`}
            >
              📍 Explore Positions (6)
            </button>
          </div>
        </div>

        {mode === 'classroom' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Interactive 3D Classroom Explorer Canvas */}
            <div className="lg:col-span-8 relative h-[360px] sm:h-[430px] rounded-3xl border-4 border-sky-300 bg-gradient-to-b from-sky-100 via-sky-50 to-amber-100 shadow-lg overflow-hidden select-none">
              {/* Classroom Wall & Floor */}
              <div className="absolute inset-x-0 top-0 h-[66%] bg-gradient-to-b from-sky-100 to-sky-50 border-b-4 border-sky-200" />
              <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-amber-200 to-amber-300" />

              {/* Decorative bunting */}
              <div className="absolute top-0 inset-x-0 flex justify-around opacity-80 pointer-events-none">
                {['bg-pink-300', 'bg-yellow-300', 'bg-sky-300', 'bg-pink-300', 'bg-yellow-300', 'bg-sky-300'].map(
                  (c, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-5 ${c} rounded-b-full shadow-xs`}
                    />
                  )
                )}
              </div>

              {/* Clickable 11 Objects */}
              {roomPlacements.map((p) => {
                const isSelected = selectedObj === p.id;
                const isFound = discoveredIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTapObject(p.id)}
                    className={`absolute ${p.style} transition-transform duration-200 cursor-pointer hover:scale-110 active:scale-95 focus-visible:outline-none ${
                      isSelected ? 'scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] z-30' : 'z-20'
                    }`}
                    title={`Tap ${p.id}`}
                  >
                    <ClassroomObject3D objectId={p.id} size={p.size} />
                    {isFound && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow border border-white">
                        ★
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Object Spotlight Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border-3 border-pink-200 p-5 shadow-md flex flex-col justify-between items-center text-center">
              <div className="w-full space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Object Spotlight</span>
                </div>

                <div className="mx-auto w-36 h-36 rounded-3xl bg-gradient-to-b from-sky-50 to-pink-50 border-2 border-sky-200 flex items-center justify-center animate-float-slow">
                  <ClassroomObject3D objectId={selectedObj} size={115} />
                </div>

                <h2 className="text-3xl font-black text-sky-900 font-display">
                  {selectedObjMeta.word}
                </h2>
                <div className="text-lg font-extrabold text-pink-600">
                  Arti: {selectedObjMeta.indonesian}
                </div>

                <div className="bg-sky-50 rounded-2xl p-3 text-xs border border-sky-200">
                  <div className="font-bold text-slate-800">"{selectedObjMeta.exampleSentence}"</div>
                  <div className="text-slate-500 mt-1">{selectedObjMeta.exampleIndonesian}</div>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-4">
                <button
                  onClick={() => {
                    sounds.playClick();
                    speakEnglish(selectedObjMeta.word);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black py-3 rounded-2xl shadow border-b-4 border-sky-700 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>LISTEN</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    speakEnglish(`${selectedObjMeta.word}. ${selectedObjMeta.exampleSentence}`);
                  }}
                  className="px-4 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-amber-950 font-black border-b-4 border-amber-600 cursor-pointer"
                  title="Putar Ulang"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Positions Interactive Explorer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 bg-white rounded-3xl border-3 border-sky-200 p-5 shadow-md flex flex-col justify-between">
              <div>
                <div className="text-center mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-pink-600">
                    Interactive Position Sandbox
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-sky-900 font-display mt-0.5">
                    {selectedPosMeta.word} ({selectedPosMeta.indonesian})
                  </h2>
                </div>

                <PositionScene3D
                  position={selectedPos}
                  subject={posSampleMap[selectedPos].sub}
                  anchor={posSampleMap[selectedPos].anc}
                  anchorSecond={posSampleMap[selectedPos].anc2}
                  className="h-60 sm:h-72"
                />

                <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3.5 text-center">
                  <div className="text-base sm:text-lg font-black text-slate-800">
                    "{selectedPosMeta.exampleSentence}"
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    ({selectedPosMeta.exampleIndonesian})
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    sounds.playClick();
                    speakEnglish(`${selectedPosMeta.word}. ${selectedPosMeta.exampleSentence}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black py-3 rounded-2xl shadow border-b-4 border-pink-700 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>LISTEN PRONUNCIATION</span>
                </button>
              </div>
            </div>

            {/* 6 Position Selector Buttons */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 content-start">
              {POSITIONS.map((pos) => {
                const isActive = selectedPos === pos.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => handleTapPosition(pos.id)}
                    className={`p-4 rounded-3xl border-3 text-left transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white border-sky-700 shadow-lg scale-[1.02]'
                        : 'bg-white hover:bg-sky-50 text-slate-800 border-sky-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black font-display">
                        {pos.word}
                      </span>
                      <Sparkles className={`w-5 h-5 ${isActive ? 'text-yellow-300' : 'text-pink-400'}`} />
                    </div>
                    <div className={`text-sm font-bold mt-1 ${isActive ? 'text-sky-100' : 'text-pink-600'}`}>
                      {pos.indonesian}
                    </div>
                    <div className={`text-[11px] mt-1 leading-tight ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                      {pos.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
