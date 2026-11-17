import React from 'react';
import { ClassroomObjectId, PositionId } from '../data/classroomData';

interface Object3DProps {
  objectId: ClassroomObjectId;
  size?: number;
  className?: string;
}

/**
 * High-quality 3D-shaded cartoon SVG illustrations for all 11 canonical Classroom Objects.
 * Strictly NO text labels on the illustrations so quizzes and hidden-object games never leak answers!
 */
export const ClassroomObject3D: React.FC<Object3DProps> = ({
  objectId,
  size = 110,
  className = '',
}) => {
  switch (objectId) {
    case 'CHALK':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="chalkBox3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          {/* Chalk holder box */}
          <rect x="20" y="64" width="80" height="36" rx="8" fill="url(#chalkBox3d)" stroke="#ca8a04" strokeWidth="2.5" />
          <rect x="24" y="68" width="72" height="10" rx="4" fill="#fef08a" opacity="0.6" />
          {/* 3D White & Pastel Chalk Sticks */}
          <g transform="rotate(-12 40 50)">
            <rect x="30" y="24" width="16" height="52" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="38" cy="24" rx="8" ry="3.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
          <g transform="rotate(4 60 50)">
            <rect x="52" y="18" width="16" height="56" rx="6" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="60" cy="18" rx="8" ry="3.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
          <g transform="rotate(15 80 50)">
            <rect x="72" y="26" width="16" height="50" rx="6" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
            <ellipse cx="80" cy="26" rx="8" ry="3.5" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
          </g>
          {/* Front box lip */}
          <rect x="20" y="72" width="80" height="28" rx="8" fill="url(#chalkBox3d)" stroke="#ca8a04" strokeWidth="2.5" />
        </svg>
      );

    case 'TABLE':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="tableTop3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="106" rx="46" ry="7" fill="#94a3b8" opacity="0.35" />
          {/* Back legs */}
          <rect x="26" y="54" width="9" height="44" rx="3" fill="#92400e" />
          <rect x="85" y="54" width="9" height="44" rx="3" fill="#92400e" />
          {/* Front legs */}
          <rect x="16" y="60" width="11" height="44" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          <rect x="93" y="60" width="11" height="44" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* Skirt */}
          <rect x="16" y="54" width="88" height="14" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* 3D Table surface */}
          <path d="M 10,54 L 26,32 L 94,32 L 110,54 Z" fill="url(#tableTop3d)" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="10" y="52" width="100" height="9" rx="4" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
          {/* Specular shine */}
          <path d="M 28,38 L 90,38" stroke="#fef3c7" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'CLOCK':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="clockRim3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="62" cy="64" r="44" fill="#94a3b8" opacity="0.3" />
          <circle cx="60" cy="60" r="44" fill="url(#clockRim3d)" stroke="#1d4ed8" strokeWidth="3" />
          <circle cx="60" cy="60" r="35" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
          {/* Gloss */}
          <path d="M 35,44 A 30,30 0 0 1 85,44" stroke="#e0f2fe" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Hour markers */}
          <circle cx="60" cy="32" r="3" fill="#f43f5e" />
          <circle cx="88" cy="60" r="3" fill="#3b82f6" />
          <circle cx="60" cy="88" r="3" fill="#3b82f6" />
          <circle cx="32" cy="60" r="3" fill="#3b82f6" />
          <circle cx="74" cy="36" r="2" fill="#64748b" />
          <circle cx="84" cy="46" r="2" fill="#64748b" />
          <circle cx="84" cy="74" r="2" fill="#64748b" />
          <circle cx="74" cy="84" r="2" fill="#64748b" />
          <circle cx="46" cy="84" r="2" fill="#64748b" />
          <circle cx="36" cy="74" r="2" fill="#64748b" />
          <circle cx="36" cy="46" r="2" fill="#64748b" />
          <circle cx="46" cy="36" r="2" fill="#64748b" />
          {/* Hands */}
          <line x1="60" y1="60" x2="60" y2="39" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="60" y1="60" x2="78" y2="60" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        </svg>
      );

    case 'CHAIR':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="chairBlue3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="108" rx="34" ry="7" fill="#94a3b8" opacity="0.35" />
          {/* Backrest */}
          <rect x="33" y="16" width="54" height="40" rx="10" fill="url(#chairBlue3d)" stroke="#0369a1" strokeWidth="2.5" />
          <rect x="42" y="25" width="36" height="10" rx="5" fill="#bae6fd" opacity="0.65" />
          {/* Frame bars */}
          <rect x="36" y="54" width="7" height="14" fill="#64748b" />
          <rect x="77" y="54" width="7" height="14" fill="#64748b" />
          {/* Legs */}
          <rect x="35" y="72" width="7" height="30" rx="3" fill="#475569" />
          <rect x="78" y="72" width="7" height="30" rx="3" fill="#475569" />
          <rect x="28" y="74" width="8" height="32" rx="3" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <rect x="84" y="74" width="8" height="32" rx="3" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          {/* 3D Seat */}
          <path d="M 24,72 L 35,61 L 85,61 L 96,72 Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
          <rect x="24" y="71" width="72" height="9" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        </svg>
      );

    case 'BLACKBOARD':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="bbWood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="bbSlate" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e3a2f" />
              <stop offset="100%" stopColor="#0f241c" />
            </linearGradient>
          </defs>
          <rect x="10" y="24" width="100" height="72" rx="8" fill="url(#bbWood)" stroke="#78350f" strokeWidth="3" />
          <rect x="17" y="31" width="86" height="58" rx="4" fill="url(#bbSlate)" />
          {/* Chalk doodles */}
          <path d="M 28,50 L 38,50 M 33,44 L 33,56" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <circle cx="52" cy="50" r="6" fill="none" stroke="#fde047" strokeWidth="2" opacity="0.85" />
          <path d="M 68,55 Q 78,40 88,55" stroke="#bae6fd" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
          <line x1="28" y1="70" x2="90" y2="70" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
          {/* Chalk ledge */}
          <rect x="14" y="92" width="92" height="8" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <rect x="30" y="88" width="14" height="4" rx="2" fill="#ffffff" />
          <rect x="50" y="88" width="12" height="4" rx="2" fill="#f9a8d4" />
        </svg>
      );

    case 'BAG':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="bagPink3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="107" rx="36" ry="7" fill="#94a3b8" opacity="0.35" />
          {/* Straps */}
          <path d="M 32,42 C 20,42 18,86 28,96" stroke="#be185d" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M 88,42 C 100,42 102,86 92,96" stroke="#be185d" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Top loop */}
          <path d="M 48,26 C 48,14 72,14 72,26" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Main Bag */}
          <rect x="26" y="26" width="68" height="78" rx="22" fill="url(#bagPink3d)" stroke="#be185d" strokeWidth="3" />
          {/* Top flap shine */}
          <path d="M 32,44 Q 60,54 88,44" stroke="#fbcfe8" strokeWidth="3" fill="none" />
          {/* Front pocket */}
          <rect x="36" y="58" width="48" height="36" rx="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5" />
          {/* Zipper */}
          <line x1="40" y1="68" x2="80" y2="68" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="68" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          {/* Cute star */}
          <circle cx="60" cy="82" r="5" fill="#fde047" />
        </svg>
      );

    case 'CUPBOARD':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="cupboard3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="110" rx="40" ry="6" fill="#94a3b8" opacity="0.35" />
          {/* Legs */}
          <rect x="28" y="100" width="8" height="9" rx="2" fill="#78350f" />
          <rect x="84" y="100" width="8" height="9" rx="2" fill="#78350f" />
          {/* Cabinet frame */}
          <rect x="22" y="14" width="76" height="88" rx="8" fill="url(#cupboard3d)" stroke="#78350f" strokeWidth="3" />
          {/* Two cabinet doors */}
          <rect x="28" y="22" width="30" height="72" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          <rect x="62" y="22" width="30" height="72" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          {/* Handles */}
          <circle cx="52" cy="58" r="3.5" fill="#0284c7" />
          <circle cx="68" cy="58" r="3.5" fill="#0284c7" />
          {/* Top crown */}
          <rect x="18" y="12" width="84" height="8" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        </svg>
      );

    case 'PENCIL':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <g transform="translate(60, 60) rotate(-35) translate(-60, -60)">
            {/* Pink eraser */}
            <rect x="10" y="48" width="16" height="24" rx="5" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            {/* Silver ferrule */}
            <rect x="24" y="48" width="10" height="24" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
            {/* Yellow 3D body */}
            <rect x="34" y="48" width="54" height="24" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <rect x="34" y="48" width="54" height="7" fill="#fef08a" />
            <rect x="34" y="65" width="54" height="7" fill="#eab308" />
            {/* Wood cone */}
            <polygon points="88,48 88,72 110,60" fill="#fed7aa" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
            {/* Graphite tip */}
            <polygon points="101,55 101,65 110,60" fill="#1e293b" />
          </g>
        </svg>
      );

    case 'BOOK':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <linearGradient id="bookBlue3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="105" rx="38" ry="7" fill="#94a3b8" opacity="0.35" />
          {/* Pages bottom edge */}
          <path d="M 26,92 L 34,100 L 94,100 L 88,92 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          {/* Back cover edge */}
          <rect x="32" y="22" width="62" height="78" rx="6" fill="#1d4ed8" />
          {/* Front cover */}
          <rect x="24" y="16" width="66" height="80" rx="7" fill="url(#bookBlue3d)" stroke="#1e40af" strokeWidth="2.5" />
          {/* Spine */}
          <rect x="24" y="16" width="12" height="80" rx="4" fill="#1d4ed8" />
          {/* Star emblem (no text) */}
          <circle cx="62" cy="50" r="16" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
          <polygon points="62,38 65,46 73,46 67,51 69,59 62,54 55,59 57,51 51,46 59,46" fill="#f59e0b" />
          <line x1="46" y1="76" x2="78" y2="76" stroke="#bfdbfe" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'CALENDAR':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <rect x="20" y="22" width="80" height="82" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          {/* Red/Pink header */}
          <path d="M 20,34 C 20,25 25,22 32,22 L 88,22 C 95,22 100,25 100,34 L 100,46 L 20,46 Z" fill="#f43f5e" />
          {/* Binding rings */}
          <rect x="36" y="12" width="8" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <rect x="76" y="12" width="8" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {/* Calendar grid squares */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={29 + col * 17}
                y={54 + row * 12}
                width="12"
                height="8"
                rx="2"
                fill={row === 1 && col === 2 ? '#facc15' : '#e2e8f0'}
              />
            ))
          )}
        </svg>
      );

    case 'GLOBE':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} className={`select-none drop-shadow-md ${className}`}>
          <defs>
            <radialGradient id="globeOcean" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="108" rx="30" ry="6" fill="#94a3b8" opacity="0.35" />
          {/* Stand base */}
          <path d="M 38,104 L 82,104 L 74,94 L 46,94 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
          <rect x="57" y="84" width="6" height="12" fill="#b45309" />
          {/* Tilted C-arc */}
          <path d="M 60,16 A 36,36 0 1 1 52,86" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          {/* Earth Sphere */}
          <circle cx="58" cy="52" r="29" fill="url(#globeOcean)" stroke="#0284c7" strokeWidth="2" />
          {/* Continents */}
          <path d="M 40,42 Q 52,32 58,44 Q 54,58 44,54 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1" />
          <path d="M 62,38 Q 76,34 80,48 Q 74,64 64,58 Q 60,48 62,38 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1" />
          <path d="M 48,64 Q 58,62 60,72 Q 50,74 48,64 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1" />
          {/* Gloss */}
          <ellipse cx="47" cy="39" rx="7" ry="4" fill="#ffffff" opacity="0.45" transform="rotate(-30 47 39)" />
        </svg>
      );
  }
};

interface PositionScene3DProps {
  position: PositionId;
  subject: ClassroomObjectId;
  anchor: ClassroomObjectId;
  anchorSecond?: ClassroomObjectId;
  className?: string;
}

/**
 * Renders an unmistakable, label-free 3D spatial illustration showing IN / ON / UNDER / BESIDE / BEHIND / BETWEEN.
 * Never reveals any preposition text inside the image!
 */
export const PositionScene3D: React.FC<PositionScene3DProps> = ({
  position,
  subject,
  anchor,
  anchorSecond = 'GLOBE',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-sky-50 via-white to-amber-50/70 border-2 border-sky-200 shadow-inner overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* Classroom floor line */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-amber-200/70 to-amber-100/40 border-t border-amber-300/60" />

      {position === 'ON' && (
        <div className="relative flex flex-col items-center justify-end h-48">
          <div className="z-20 -mb-7 transition-transform duration-300">
            <ClassroomObject3D objectId={subject} size={78} />
          </div>
          <div className="z-10">
            <ClassroomObject3D objectId={anchor} size={135} />
          </div>
        </div>
      )}

      {position === 'IN' && (
        <div className="relative flex items-center justify-center w-64 h-48">
          {/* Open bag or cupboard container view */}
          <div className="relative flex items-center justify-center">
            {/* Back rim */}
            <div className="w-40 h-32 rounded-3xl bg-gradient-to-b from-pink-400 to-pink-500 border-4 border-pink-600 shadow-lg relative overflow-visible flex items-start justify-center pt-1">
              {/* Top opening dark interior */}
              <div className="w-32 h-8 rounded-full bg-pink-900/70 border-2 border-pink-300 -mt-3" />
              {/* Subject peeking right out of the inside! */}
              <div className="absolute -top-9 z-10">
                <ClassroomObject3D objectId={subject} size={76} />
              </div>
              {/* Front pocket cover hiding bottom half of subject */}
              <div className="absolute bottom-0 inset-x-0 h-22 rounded-b-[1.25rem] rounded-t-xl bg-gradient-to-b from-sky-400 to-sky-500 border-t-4 border-yellow-300 z-20 flex items-center justify-center">
                <div className="w-10 h-2 rounded-full bg-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      )}

      {position === 'UNDER' && (
        <div className="relative flex flex-col items-center justify-end h-48">
          <div className="z-20">
            <ClassroomObject3D objectId={anchor} size={145} />
          </div>
          <div className="z-10 -mt-12">
            <ClassroomObject3D objectId={subject} size={72} />
          </div>
        </div>
      )}

      {position === 'BESIDE' && (
        <div className="relative flex items-end justify-center gap-4 h-44">
          <div className="z-10">
            <ClassroomObject3D objectId={anchor} size={125} />
          </div>
          <div className="z-10 pb-1">
            <ClassroomObject3D objectId={subject} size={92} />
          </div>
        </div>
      )}

      {position === 'BEHIND' && (
        <div className="relative flex items-end justify-center w-64 h-48">
          {/* Subject behind (offset right & partially occluded) */}
          <div className="z-10 -mr-14 mb-4 opacity-95">
            <ClassroomObject3D objectId={subject} size={92} />
          </div>
          {/* Anchor in front */}
          <div className="z-20 -ml-4">
            <ClassroomObject3D objectId={anchor} size={135} />
          </div>
        </div>
      )}

      {position === 'BETWEEN' && (
        <div className="relative flex items-end justify-center gap-3 h-44">
          <div className="z-10">
            <ClassroomObject3D objectId={anchor} size={105} />
          </div>
          <div className="z-20 pb-2">
            <ClassroomObject3D objectId={subject} size={80} />
          </div>
          <div className="z-10">
            <ClassroomObject3D objectId={anchorSecond} size={105} />
          </div>
        </div>
      )}
    </div>
  );
};
