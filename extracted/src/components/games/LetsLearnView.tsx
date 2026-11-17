import React, { useState } from 'react';
import { Volume2, RotateCw, BookOpen, MapPin } from 'lucide-react';
import { CLASSROOM_OBJECTS, POSITIONS } from '../../data/classroomData';
import { ClassroomObject3D, PositionScene3D } from '../Objects3D';
import { UstadzahShofaMascot } from '../UstadzahShofaMascot';
import { sounds, speakEnglish } from '../../utils/sound';
import { GameTopBar } from './GameTopBar';

interface LetsLearnViewProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onHome: () => void;
}

export const LetsLearnView: React.FC<LetsLearnViewProps> = ({
  isMuted,
  onToggleMute,
  onHome,
}) => {
  const [activeTab, setActiveTab] = useState<'objects' | 'positions'>('objects');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleListen = (text: string, id: string) => {
    sounds.playClick();
    setSpeakingId(id);
    speakEnglish(text, () => {
      setSpeakingId(null);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-white to-pink-50 animate-page-flip">
      <GameTopBar
        title="LET'S LEARN"
        subtitle="Pelajari 11 Classroom Objects & 6 Positions bersama Ustadzah Shofa"
        progressText={activeTab === 'objects' ? '11 Objects' : '6 Positions'}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onBack={onHome}
        onHome={onHome}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Intro & Tab Switcher */}
        <div className="bg-white/95 rounded-3xl border-2 border-sky-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <UstadzahShofaMascot
            size="sm"
            message="Ketuk tombol Listen untuk mendengarkan pelafalan Bahasa Inggrisnya, lalu ulangi dengan suara lantang!"
          />

          <div className="flex items-center gap-2 p-1.5 bg-sky-100/80 rounded-2xl border border-sky-200 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('objects');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'objects'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-sky-800 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Classroom Objects (11)</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('positions');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'positions'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-pink-700 hover:bg-white/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Positions (6)</span>
            </button>
          </div>
        </div>

        {/* Classroom Objects Grid (11 items) */}
        {activeTab === 'objects' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CLASSROOM_OBJECTS.map((item) => {
              const isSpeaking = speakingId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border-2 border-sky-200 hover:border-sky-400 p-4 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center justify-between group"
                >
                  <div className="w-full flex flex-col items-center">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-b from-sky-50 to-white border border-sky-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <div className="animate-icon-bob">
                        <ClassroomObject3D objectId={item.id} size={105} />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-sky-900 font-display tracking-wide">
                      {item.word}
                    </h2>
                    <div className="text-xs text-slate-400 font-semibold mt-0.5">
                      {item.pronunciation}
                    </div>
                    <div className="mt-1.5 text-sm sm:text-base font-extrabold text-pink-600 bg-pink-50 px-3 py-1 rounded-xl border border-pink-200">
                      {item.indonesian}
                    </div>

                    <div className="mt-3 text-xs text-slate-600 bg-slate-50 rounded-2xl p-2.5 w-full">
                      <div className="font-bold text-slate-800">"{item.exampleSentence}"</div>
                      <div className="text-slate-500 mt-0.5">{item.exampleIndonesian}</div>
                    </div>
                  </div>

                  {/* Audio Buttons */}
                  <div className="flex items-center gap-2 w-full mt-4">
                    <button
                      onClick={() => handleListen(item.word, item.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm shadow-sm cursor-pointer transition-all active:scale-95 ${
                        isSpeaking
                          ? 'bg-yellow-400 text-amber-950 animate-pulse'
                          : 'bg-sky-500 hover:bg-sky-600 text-white border-b-3 border-sky-700'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>LISTEN</span>
                    </button>

                    <button
                      onClick={() => handleListen(`${item.word}. ${item.exampleSentence}`, `${item.id}-repeat`)}
                      className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-2xl bg-yellow-100 hover:bg-yellow-200 text-amber-900 font-extrabold text-xs border border-yellow-300 cursor-pointer active:scale-95 transition-all"
                      title="Ulangi kata dan contoh kalimat"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>REPEAT</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Positions Grid (6 items) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSITIONS.map((pos, idx) => {
              const isSpeaking = speakingId === pos.id;
              const sampleConfig: Record<string, { sub: any; anc: any; anc2?: any }> = {
                IN: { sub: 'PENCIL', anc: 'BAG' },
                ON: { sub: 'GLOBE', anc: 'TABLE' },
                UNDER: { sub: 'BAG', anc: 'CHAIR' },
                BESIDE: { sub: 'CLOCK', anc: 'BLACKBOARD' },
                BEHIND: { sub: 'BOOK', anc: 'GLOBE' },
                BETWEEN: { sub: 'CHALK', anc: 'BOOK', anc2: 'GLOBE' },
              };
              const cfg = sampleConfig[pos.id];

              return (
                <div
                  key={pos.id}
                  className="bg-white rounded-3xl border-2 border-pink-200 hover:border-pink-400 p-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <PositionScene3D
                      position={pos.id}
                      subject={cfg.sub}
                      anchor={cfg.anc}
                      anchorSecond={cfg.anc2}
                      className="h-44 sm:h-48"
                    />

                    <div className="text-center mt-3">
                      <h2 className="text-3xl font-black text-pink-600 font-display tracking-wide">
                        {pos.word}
                      </h2>
                      <div className="inline-block mt-1 text-base font-extrabold text-sky-800 bg-sky-50 px-4 py-1 rounded-xl border border-sky-200">
                        {pos.indonesian}
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5">{pos.description}</p>
                    </div>

                    <div className="mt-3 text-xs bg-yellow-50/80 border border-yellow-200 rounded-2xl p-2.5 text-center">
                      <div className="font-extrabold text-slate-800">"{pos.exampleSentence}"</div>
                      <div className="text-slate-500 mt-0.5">{pos.exampleIndonesian}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleListen(pos.word, pos.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl font-black text-sm shadow-sm cursor-pointer transition-all active:scale-95 ${
                        isSpeaking
                          ? 'bg-yellow-400 text-amber-950 animate-pulse'
                          : 'bg-pink-500 hover:bg-pink-600 text-white border-b-3 border-pink-700'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>LISTEN</span>
                    </button>
                    <button
                      onClick={() => handleListen(`${pos.word}. ${pos.exampleSentence}`, `${pos.id}-ex-${idx}`)}
                      className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-2xl bg-yellow-100 hover:bg-yellow-200 text-amber-900 font-extrabold text-xs border border-yellow-300 cursor-pointer active:scale-95 transition-all"
                      title="Ulangi audio kalimat"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>REPEAT</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
