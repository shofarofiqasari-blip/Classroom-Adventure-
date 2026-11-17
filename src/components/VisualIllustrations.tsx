import React from 'react';
import clappingImg from '../assets/images/ustadzah_shofa_clapping_1794889358292.jpg';
import thumbsupImg from '../assets/images/ustadzah_shofa_thumbsup_1794889358999.jpg';
import happyImg from '../assets/images/ustadzah_shofa_happy_1794889359718.jpg';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Monster 1: Dusty (Monster Debu)
 */
export const DustyMonster: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg viewBox="0 0 160 160" width={size} height={size} className={`animate-bounce ${className}`}>
    <defs>
      <radialGradient id="dustyGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="70%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#6b21a8" />
      </radialGradient>
    </defs>
    {/* Dust cloud puffs */}
    <circle cx="80" cy="85" r="50" fill="url(#dustyGrad)" />
    <circle cx="45" cy="70" r="26" fill="url(#dustyGrad)" />
    <circle cx="115" cy="70" r="26" fill="url(#dustyGrad)" />
    <circle cx="60" cy="115" r="24" fill="url(#dustyGrad)" />
    <circle cx="100" cy="115" r="24" fill="url(#dustyGrad)" />
    <circle cx="80" cy="50" r="28" fill="url(#dustyGrad)" />

    {/* Big cute googly eyes */}
    <ellipse cx="65" cy="75" rx="12" ry="14" fill="#ffffff" stroke="#4c1d95" strokeWidth="2" />
    <ellipse cx="95" cy="75" rx="12" ry="14" fill="#ffffff" stroke="#4c1d95" strokeWidth="2" />
    {/* Pupils looking playful */}
    <circle cx="68" cy="75" r="6" fill="#1e1b4b" />
    <circle cx="70" cy="72" r="2.5" fill="#ffffff" />
    <circle cx="98" cy="75" r="6" fill="#1e1b4b" />
    <circle cx="100" cy="72" r="2.5" fill="#ffffff" />

    {/* Rosy Cheeks */}
    <ellipse cx="50" cy="92" rx="7" ry="4" fill="#f472b6" opacity="0.6" />
    <ellipse cx="110" cy="92" rx="7" ry="4" fill="#f472b6" opacity="0.6" />

    {/* Cute Mouth with 1 funny tooth */}
    <path d="M 70,95 Q 80,110 90,95 Z" fill="#581c87" />
    <rect x="77" y="95" width="6" height="6" rx="1" fill="#ffffff" />

    {/* Dust speckles floating */}
    <circle cx="30" cy="40" r="4" fill="#e9d5ff" />
    <circle cx="130" cy="45" r="5" fill="#e9d5ff" />
    <circle cx="135" cy="110" r="4" fill="#e9d5ff" />
  </svg>
);

/**
 * Monster 2: Goblin Buku Acak-Adakan
 */
export const GoblinMonster: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg viewBox="0 0 160 160" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="goblinSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>

    {/* Pointy ears */}
    <polygon points="30,85 10,70 35,95" fill="#15803d" stroke="#14532d" strokeWidth="2" />
    <polygon points="130,85 150,70 125,95" fill="#15803d" stroke="#14532d" strokeWidth="2" />

    {/* Goblin Head */}
    <circle cx="80" cy="90" r="42" fill="url(#goblinSkin)" stroke="#14532d" strokeWidth="3" />

    {/* Origami Paper Hat */}
    <polygon points="80,20 40,65 120,65" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
    <polygon points="40,65 120,65 110,75 50,75" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />

    {/* Eyes */}
    <circle cx="65" cy="85" r="11" fill="#ffffff" stroke="#14532d" strokeWidth="2" />
    <circle cx="95" cy="85" r="11" fill="#ffffff" stroke="#14532d" strokeWidth="2" />
    <circle cx="68" cy="86" r="5" fill="#14532d" />
    <circle cx="98" cy="86" r="5" fill="#14532d" />

    {/* Goblin Grin */}
    <path d="M 60,110 Q 80,126 100,110 Z" fill="#14532d" />
    <polygon points="68,110 72,118 76,110" fill="#ffffff" />
    <polygon points="84,110 88,118 92,110" fill="#ffffff" />

    {/* Torn Book Pages in hands */}
    <rect x="25" y="115" width="22" height="28" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" transform="rotate(-15 25 115)" />
    <rect x="110" y="110" width="22" height="28" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" transform="rotate(20 110 110)" />
  </svg>
);

/**
 * Monster 3: Raja Pensil Tumpul
 */
export const KingPencilMonster: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg viewBox="0 0 160 160" width={size} height={size} className={className}>
    {/* Golden Crown */}
    <polygon points="50,45 60,20 70,35 80,15 90,35 100,20 110,45" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <circle cx="60" cy="20" r="3" fill="#ef4444" />
    <circle cx="80" cy="15" r="4" fill="#3b82f6" />
    <circle cx="100" cy="20" r="3" fill="#22c55e" />

    {/* Pencil Body Cylinder */}
    <rect x="52" y="45" width="56" height="75" rx="6" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
    <line x1="70" y1="45" x2="70" y2="120" stroke="#fbbf24" strokeWidth="2" />
    <line x1="90" y1="45" x2="90" y2="120" stroke="#d97706" strokeWidth="2" />

    {/* Blunt Round Tip (Broken/Rounded) */}
    <path d="M 52,120 Q 80,145 108,120 Z" fill="#fde68a" stroke="#78350f" strokeWidth="2" />
    <ellipse cx="80" cy="132" rx="10" ry="6" fill="#334155" />

    {/* Eyes with bushy royal eyebrows */}
    <rect x="58" y="65" width="14" height="4" rx="2" fill="#78350f" transform="rotate(-10 58 65)" />
    <rect x="88" y="65" width="14" height="4" rx="2" fill="#78350f" transform="rotate(10 88 65)" />
    <circle cx="65" cy="76" r="6" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
    <circle cx="95" cy="76" r="6" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
    <circle cx="67" cy="76" r="3" fill="#1e293b" />
    <circle cx="97" cy="76" r="3" fill="#1e293b" />

    {/* King Mustache & Mouth */}
    <path d="M 66,95 Q 80,90 94,95 Q 88,102 80,98 Q 72,102 66,95 Z" fill="#78350f" />
  </svg>
);

/**
 * Monster 4: Penghapus Papan Nakal (Mischievous Board Eraser)
 */
export const NaughtyEraserMonster: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg viewBox="0 0 160 160" width={size} height={size} className={`animate-pulse ${className}`}>
    {/* Floating ghost wings */}
    <path d="M 30,75 Q 10,60 20,45 Q 35,55 35,70 Z" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />
    <path d="M 130,75 Q 150,60 140,45 Q 125,55 125,70 Z" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />

    {/* Eraser Wooden/Plastic Top */}
    <rect x="35" y="55" width="90" height="28" rx="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
    {/* Felt Pad Bottom */}
    <rect x="38" y="83" width="84" height="24" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="2" />

    {/* Chalk Dust Trail */}
    <ellipse cx="80" cy="120" rx="35" ry="8" fill="#f8fafc" opacity="0.7" />
    <circle cx="50" cy="130" r="5" fill="#f8fafc" opacity="0.5" />
    <circle cx="110" cy="132" r="6" fill="#f8fafc" opacity="0.5" />

    {/* Cute playful face on the eraser */}
    <circle cx="65" cy="69" r="6" fill="#ffffff" />
    <circle cx="66" cy="69" r="3" fill="#0369a1" />
    <circle cx="95" cy="69" r="6" fill="#ffffff" />
    <circle cx="96" cy="69" r="3" fill="#0369a1" />

    {/* Tongue out cheeky smile */}
    <path d="M 74,75 Q 80,82 86,75" stroke="#0369a1" strokeWidth="2" fill="none" />
    <ellipse cx="80" cy="80" rx="4" ry="5" fill="#f43f5e" />
  </svg>
);

/**
 * Monster 5: Naga Kertas Coretan (Doodle Paper Dragon - Boss)
 */
export const PaperDragonMonster: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => (
  <svg viewBox="0 0 180 180" width={size} height={size} className={className}>
    {/* Origami Folded Wings */}
    <polygon points="90,70 10,35 45,95" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" />
    <polygon points="90,70 170,35 135,95" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" />

    {/* Dragon Long Tail with notebook lines */}
    <path d="M 90,120 Q 140,150 120,170 Q 100,165 95,145" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />

    {/* Dragon Body */}
    <ellipse cx="90" cy="105" rx="38" ry="32" fill="#fff1f2" stroke="#e11d48" strokeWidth="3" />
    {/* Doodle scribble scales */}
    <path d="M 75,95 Q 82,90 90,95 Q 98,90 105,95" stroke="#be123c" strokeWidth="2" fill="none" />
    <path d="M 75,108 Q 82,103 90,108 Q 98,103 105,108" stroke="#be123c" strokeWidth="2" fill="none" />

    {/* Dragon Head */}
    <polygon points="90,30 65,75 115,75" fill="#ffe4e6" stroke="#e11d48" strokeWidth="3" />
    {/* Cute dragon horns */}
    <polygon points="72,35 62,15 78,30" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
    <polygon points="108,35 118,15 102,30" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

    {/* Big Dragon Eyes */}
    <circle cx="78" cy="55" r="9" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
    <circle cx="102" cy="55" r="9" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
    <circle cx="80" cy="55" r="4.5" fill="#9f1239" />
    <circle cx="100" cy="55" r="4.5" fill="#9f1239" />

    {/* Snout with funny little fire puff */}
    <ellipse cx="90" cy="68" rx="8" ry="5" fill="#fecdd3" />
    <circle cx="87" cy="68" r="1.5" fill="#be123c" />
    <circle cx="93" cy="68" r="1.5" fill="#be123c" />

    {/* Golden Boss Crown */}
    <polygon points="80,26 85,12 90,20 95,12 100,26" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
  </svg>
);

const AVATAR_POSES = [
  '/assets/aistudio/file_000000001f7c82079f83b9f29c0125dd_7712509b.webp',
  happyImg,
  thumbsupImg,
  clappingImg,
];

/**
 * Ustadzah Shofa Avatar (Approved 3D mascot with varied joyful expressions)
 */
export const UstadzahShofaAvatar: React.FC<
  IllustrationProps & { mood?: 'auto' | 'default' | 'clapping' | 'thumbsup' | 'happy' }
> = ({ className = '', size = 120, mood = 'auto' }) => {
  const [imgError, setImgError] = React.useState(false);
  const [poseIdx, setPoseIdx] = React.useState(0);

  React.useEffect(() => {
    if (mood !== 'auto') return;
    const t = setInterval(() => setPoseIdx((p) => (p + 1) % AVATAR_POSES.length), 3200);
    return () => clearInterval(t);
  }, [mood]);

  const src =
    mood === 'clapping'
      ? clappingImg
      : mood === 'thumbsup'
      ? thumbsupImg
      : mood === 'happy'
      ? happyImg
      : mood === 'default'
      ? AVATAR_POSES[0]
      : AVATAR_POSES[poseIdx];

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden border-3 border-white shadow-md bg-sky-100 flex items-center justify-center select-none animate-mascot-wave ${className}`}
    >
      {!imgError ? (
        <img
          key={src}
          src={src}
          alt="Ustadzah Shofa"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top animate-fade-in"
        />
      ) : (
        <svg viewBox="0 0 120 120" width={size} height={size}>
          <circle cx="60" cy="60" r="56" fill="#e0f2fe" />
          <path d="M 28,60 C 24,110 96,110 92,60 C 92,20 28,20 28,60 Z" fill="#7dd3fc" />
          <ellipse cx="60" cy="54" rx="22" ry="24" fill="#fed7aa" />
          <circle cx="51" cy="52" r="3" fill="#1e293b" />
          <circle cx="69" cy="52" r="3" fill="#1e293b" />
          <path d="M 54,64 Q 60,70 66,64" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="77" cy="74" r="6" fill="#f472b6" />
          <circle cx="77" cy="74" r="2.5" fill="#fde047" />
          <path d="M 30,96 Q 60,82 90,96 L 90,120 L 30,120 Z" fill="#f9a8d4" />
        </svg>
      )}
    </div>
  );
};

/**
 * Student Boy Avatar (Bintang / Ahmad)
 */
export const StudentBoyAvatar: React.FC<IllustrationProps> = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    {/* Background Circle */}
    <circle cx="50" cy="50" r="46" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />

    {/* Peci / Songkok */}
    <path d="M 32,32 Q 50,26 68,32 L 66,42 Q 50,38 34,42 Z" fill="#1e293b" />

    {/* Face */}
    <ellipse cx="50" cy="52" rx="19" ry="20" fill="#fed7aa" />

    {/* Hair strands */}
    <path d="M 34,41 Q 40,46 44,43" stroke="#0f172a" strokeWidth="3" fill="none" />
    <path d="M 56,43 Q 60,46 66,41" stroke="#0f172a" strokeWidth="3" fill="none" />

    {/* Eyes */}
    <circle cx="43" cy="52" r="3" fill="#0f172a" />
    <circle cx="57" cy="52" r="3" fill="#0f172a" />
    <circle cx="44" cy="51" r="1" fill="#ffffff" />
    <circle cx="58" cy="51" r="1" fill="#ffffff" />

    {/* Smile */}
    <path d="M 45,61 Q 50,66 55,61" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* SDIT White & Green Uniform Collar */}
    <path d="M 30,86 Q 50,75 70,86 L 70,96 L 30,96 Z" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
    <polygon points="50,76 45,86 55,86" fill="#16a34a" />
  </svg>
);

/**
 * Student Girl Avatar (Aura / Fatimah)
 */
export const StudentGirlAvatar: React.FC<IllustrationProps> = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    {/* Background Circle */}
    <circle cx="50" cy="50" r="46" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />

    {/* Hijab Back */}
    <path d="M 26,50 C 22,85 78,85 74,50 C 74,24 26,24 26,50 Z" fill="#ec4899" />

    {/* Face */}
    <ellipse cx="50" cy="48" rx="17" ry="18" fill="#fed7aa" />

    {/* Ciput / inner band */}
    <path d="M 36,38 Q 50,33 64,38" stroke="#ffffff" strokeWidth="3" fill="none" />

    {/* Eyes */}
    <circle cx="44" cy="48" r="3" fill="#0f172a" />
    <circle cx="56" cy="48" r="3" fill="#0f172a" />
    <circle cx="45" cy="47" r="1" fill="#ffffff" />
    <circle cx="57" cy="47" r="1" fill="#ffffff" />

    {/* Cheeks & Smile */}
    <circle cx="39" cy="52" r="2.5" fill="#f43f5e" opacity="0.6" />
    <circle cx="61" cy="52" r="2.5" fill="#f43f5e" opacity="0.6" />
    <path d="M 46,55 Q 50,60 54,55" stroke="#be123c" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Hijab Drape Front */}
    <path d="M 32,68 Q 50,86 68,68 L 68,96 L 32,96 Z" fill="#db2777" />
    <circle cx="50" cy="72" r="3" fill="#fde047" />
  </svg>
);

/**
 * Magical Treasure Chest (Golden Peti Harta Karun)
 */
export const TreasureChestIllustration: React.FC<{ isOpen?: boolean; size?: number; className?: string }> = ({
  isOpen = false,
  size = 180,
  className = '',
}) => (
  <svg viewBox="0 0 200 170" width={size} height={(size * 170) / 200} className={`select-none ${className}`}>
    <defs>
      <linearGradient id="chestWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="chestGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="100" cy="155" rx="75" ry="12" fill="#0f172a" opacity="0.4" />

    {isOpen && (
      /* Rays of Light shooting out of open chest */
      <g>
        <path d="M 100,70 L 40,0 L 70,0 Z" fill="#fef08a" opacity="0.4" />
        <path d="M 100,70 L 85,0 L 115,0 Z" fill="#fef08a" opacity="0.5" />
        <path d="M 100,70 L 130,0 L 160,0 Z" fill="#fef08a" opacity="0.4" />
        {/* Swirling Sparkle Stars */}
        <text x="70" y="30" fill="#eab308" fontSize="24" className="animate-spin">✨</text>
        <text x="120" y="25" fill="#f59e0b" fontSize="22">🌟</text>
        <text x="90" y="15" fill="#fde047" fontSize="28">⭐</text>
      </g>
    )}

    {/* Chest Lower Box */}
    <rect x="30" y="80" width="140" height="70" rx="8" fill="url(#chestWood)" stroke="#451a03" strokeWidth="4" />
    <rect x="30" y="80" width="140" height="15" fill="#92400e" opacity="0.6" />

    {/* Gold Corner Straps */}
    <rect x="30" y="80" width="16" height="70" rx="2" fill="url(#chestGold)" stroke="#78350f" strokeWidth="1.5" />
    <rect x="154" y="80" width="16" height="70" rx="2" fill="url(#chestGold)" stroke="#78350f" strokeWidth="1.5" />
    <rect x="92" y="80" width="16" height="70" fill="url(#chestGold)" stroke="#78350f" strokeWidth="1.5" />

    {/* Keyhole Plate */}
    <rect x="88" y="90" width="24" height="28" rx="6" fill="#fde047" stroke="#854d0e" strokeWidth="2" />
    <circle cx="100" cy="100" r="4" fill="#451a03" />
    <polygon points="98,102 102,102 103,110 97,110" fill="#451a03" />

    {/* Chest Lid */}
    {isOpen ? (
      /* Open Lid raised back */
      <g transform="translate(0, -25)">
        <path
          d="M 25,60 C 25,30 175,30 175,60 L 170,75 L 30,75 Z"
          fill="url(#chestWood)"
          stroke="#451a03"
          strokeWidth="4"
        />
        <rect x="30" y="60" width="140" height="12" fill="url(#chestGold)" />
      </g>
    ) : (
      /* Closed Lid */
      <g>
        <path
          d="M 26,80 C 26,45 174,45 174,80 Z"
          fill="url(#chestWood)"
          stroke="#451a03"
          strokeWidth="4"
        />
        {/* Metal bands across curved lid */}
        <path d="M 38,78 C 38,55 52,50 52,78" fill="none" stroke="url(#chestGold)" strokeWidth="12" />
        <path d="M 94,76 C 94,50 106,50 106,76" fill="none" stroke="url(#chestGold)" strokeWidth="14" />
        <path d="M 148,78 C 148,55 162,50 162,78" fill="none" stroke="url(#chestGold)" strokeWidth="12" />
      </g>
    )}
  </svg>
);


