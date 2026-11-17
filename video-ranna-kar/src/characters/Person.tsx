import React from 'react';
import {C} from '../config';

export type Pose =
  | 'stand'
  | 'point'
  | 'hips'
  | 'scratch'
  | 'open'
  | 'crossed'
  | 'chin'
  | 'headHold'
  | 'shrug';

export type Face =
  | 'neutral'
  | 'surprised'
  | 'annoyed'
  | 'smile'
  | 'happy'
  | 'wink'
  | 'sad'
  | 'think'
  | 'smug';

type Who = 'emon' | 'simi';

const LOOK = {
  emon: {
    shirt: '#6E6650', // olive body
    sleeve: '#F2F0EA', // white raglan sleeves
    pants: '#E6DDC6',
    cap: '#1F2D4A',
    skin: '#B57D55',
  },
  simi: {
    dress: '#F4F0F2', // white with black lattice
    hijab: '#C9A6D6',
    hijabDark: '#B08BC2',
    under: '#C9A07E',
    skin: '#BE8763',
  },
};

// Arm paths in the character's own frame (forward = +x). Shoulders at (95,215) / (205,215).
const ARMS: Record<Pose, [number[][], number[][]]> = {
  stand: [
    [[95, 215], [80, 335], [88, 445]],
    [[205, 215], [220, 335], [212, 445]],
  ],
  point: [
    [[95, 215], [80, 335], [88, 445]],
    [[205, 215], [262, 268], [330, 240]],
  ],
  hips: [
    [[95, 215], [38, 310], [92, 390]],
    [[205, 215], [262, 310], [208, 390]],
  ],
  scratch: [
    [[95, 215], [80, 335], [88, 445]],
    [[205, 215], [272, 160], [212, 62]],
  ],
  open: [
    [[95, 215], [62, 330], [6, 300]],
    [[205, 215], [238, 330], [294, 300]],
  ],
  crossed: [
    [[95, 215], [96, 330], [198, 310]],
    [[205, 215], [204, 342], [102, 330]],
  ],
  chin: [
    [[95, 215], [80, 335], [88, 445]],
    [[205, 215], [246, 330], [176, 222]],
  ],
  headHold: [
    [[95, 215], [30, 140], [92, 58]],
    [[205, 215], [270, 140], [208, 58]],
  ],
  shrug: [
    [[95, 215], [40, 270], [18, 205]],
    [[205, 215], [260, 270], [282, 205]],
  ],
};

const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ');

const Arm: React.FC<{p: number[][]; sleeve: string; skin: string; short?: boolean}> = ({p, sleeve, skin, short}) => {
  const end = p[p.length - 1];
  const s0 = p[0];
  const s1 = p[1];
  const mid = [s0[0] + (s1[0] - s0[0]) * 0.6, s0[1] + (s1[1] - s0[1]) * 0.6];
  return (
    <g>
      <polyline points={pts(p)} fill="none" stroke={C.ink} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts(p)} fill="none" stroke={short ? skin : sleeve} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
      {short && (
        <>
          <line x1={s0[0]} y1={s0[1]} x2={mid[0]} y2={mid[1]} stroke={C.ink} strokeWidth={50} strokeLinecap="butt" />
          <line x1={s0[0]} y1={s0[1]} x2={mid[0]} y2={mid[1]} stroke={sleeve} strokeWidth={40} strokeLinecap="butt" />
          <circle cx={s0[0]} cy={s0[1]} r={20} fill={sleeve} />
        </>
      )}
      {!short && <circle cx={end[0]} cy={end[1]} r={21} fill={C.ink} />}
      <circle cx={end[0]} cy={end[1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />
    </g>
  );
};

const Eye: React.FC<{cx: number; face: Face; side: 'l' | 'r'; skin: string; look: number}> = ({cx, face, side, skin, look}) => {
  const cy = 108;
  if (face === 'happy' || (face === 'wink' && side === 'r')) {
    return <path d={`M${cx - 14} ${cy + 4} Q${cx} ${cy - 14} ${cx + 14} ${cy + 4}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />;
  }
  const big = face === 'surprised';
  const r = big ? 21 : 17;
  const pr = big ? 6 : 8;
  let dx = look * 5;
  let dy = 0;
  if (face === 'think') {
    dx = 6;
    dy = -7;
  }
  const lid = face === 'annoyed' || face === 'sad' || face === 'smug';
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <circle cx={cx + dx} cy={cy + dy + (lid ? 4 : 0)} r={pr} fill={C.ink} />
      {lid && (
        <path d={`M${cx - r - 3} ${cy - 2} L${cx + r + 3} ${cy - 2} L${cx + r + 3} ${cy - r - 4} L${cx - r - 3} ${cy - r - 4} Z`} fill={skin} />
      )}
      {lid && <line x1={cx - r} y1={cy - 2} x2={cx + r} y2={cy - 2} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
    </g>
  );
};

const Brows: React.FC<{face: Face}> = ({face}) => {
  const L = 122;
  const R = 178;
  const y = 80;
  let l = `M${L - 16} ${y} L${L + 14} ${y}`;
  let r = `M${R - 14} ${y} L${R + 16} ${y}`;
  if (face === 'surprised') {
    l = `M${L - 16} ${y - 10} Q${L} ${y - 20} ${L + 14} ${y - 10}`;
    r = `M${R - 14} ${y - 10} Q${R} ${y - 20} ${R + 16} ${y - 10}`;
  } else if (face === 'annoyed') {
    l = `M${L - 16} ${y - 6} L${L + 14} ${y + 4}`;
    r = `M${R - 14} ${y + 4} L${R + 16} ${y - 6}`;
  } else if (face === 'sad') {
    l = `M${L - 16} ${y + 4} L${L + 14} ${y - 6}`;
    r = `M${R - 14} ${y - 6} L${R + 16} ${y + 4}`;
  } else if (face === 'smug' || face === 'wink') {
    l = `M${L - 16} ${y} L${L + 14} ${y - 2}`;
    r = `M${R - 14} ${y - 10} Q${R} ${y - 16} ${R + 16} ${y - 8}`;
  } else if (face === 'think') {
    r = `M${R - 14} ${y - 8} L${R + 16} ${y - 12}`;
  }
  return (
    <g stroke={C.ink} strokeWidth={6} strokeLinecap="round" fill="none">
      <path d={l} />
      <path d={r} />
    </g>
  );
};

const Mouth: React.FC<{face: Face; talk: number}> = ({face, talk}) => {
  const cx = 150;
  const cy = 158;
  if (face === 'surprised') return <ellipse cx={cx} cy={cy + 2} rx={11} ry={15} fill="#5A2A22" stroke={C.ink} strokeWidth={4} />;
  if (face === 'happy' || face === 'smile' || face === 'wink' || face === 'smug') {
    const open = face === 'happy' ? 1 : talk;
    if (open > 0.3)
      return <path d={`M${cx - 22} ${cy - 4} Q${cx} ${cy + 24} ${cx + 22} ${cy - 4} Z`} fill="#5A2A22" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />;
    return <path d={`M${cx - 20} ${cy - 2} Q${cx} ${cy + 14} ${cx + 20} ${cy - 2}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
  }
  if (face === 'sad' || face === 'annoyed') {
    if (talk > 0.3) return <ellipse cx={cx} cy={cy + 2} rx={14} ry={8 + talk * 4} fill="#5A2A22" stroke={C.ink} strokeWidth={4} />;
    return <path d={`M${cx - 16} ${cy + 6} Q${cx} ${cy - 6} ${cx + 16} ${cy + 6}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
  }
  if (talk > 0.3) return <ellipse cx={cx} cy={cy + 2} rx={12} ry={6 + talk * 6} fill="#5A2A22" stroke={C.ink} strokeWidth={4} />;
  return <line x1={cx - 13} y1={cy} x2={cx + 13} y2={cy} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
};

export const Person: React.FC<{
  who: Who;
  pose?: Pose;
  face?: Face;
  talk?: number; // 0..1 mouth openness while speaking
  look?: number; // -1..1 pupils
}> = ({who, pose = 'stand', face = 'neutral', talk = 0, look = 0}) => {
  const L = LOOK[who] as any;
  const skin = L.skin;
  const [la, ra] = ARMS[pose];
  const handsOnHead = pose === 'scratch' || pose === 'headHold';
  const isSimi = who === 'simi';

  const head = isSimi ? (
    <g>
      {/* hijab: hood + cape over shoulders */}
      <path d="M150 14 Q58 14 56 132 Q52 220 74 286 L58 392 Q150 426 242 392 L226 286 Q248 220 244 132 Q242 14 150 14 Z" fill={L.hijab} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M100 250 Q150 300 200 250" fill="none" stroke={L.hijabDark} strokeWidth={5} strokeLinecap="round" />
      <path d="M90 320 Q150 360 210 320" fill="none" stroke={L.hijabDark} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={150} cy={124} rx={62} ry={70} fill={skin} stroke={C.ink} strokeWidth={5} />
      {/* under-scarf band on the forehead */}
      <path d="M92 90 Q150 52 208 90 Q150 72 92 90 Z" fill="#DDBB96" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <g transform="translate(0,12)">
        <Brows face={face} />
        <Eye cx={124} face={face} side="l" skin={skin} look={look} />
        <Eye cx={176} face={face} side="r" skin={skin} look={look} />
        <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        {/* nose stud */}
        <circle cx={160} cy={134} r={4} fill="#F4E7B0" stroke={C.ink} strokeWidth={2} />
        <g fill="#E58C7A" opacity={0.5}>
          <ellipse cx={106} cy={146} rx={12} ry={7} />
          <ellipse cx={194} cy={146} rx={12} ry={7} />
        </g>
        <Mouth face={face} talk={talk} />
      </g>
    </g>
  ) : (
    <g>
      <circle cx={80} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <circle cx={220} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <ellipse cx={150} cy={112} rx={72} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      {/* short hair at the sides under the cap */}
      <path d="M80 70 L80 112 L92 104 L92 70 Z" fill="#1E1A18" />
      <path d="M220 70 L220 112 L208 104 L208 70 Z" fill="#1E1A18" />
      {/* beard along the jaw */}
      <path d="M82 116 Q82 194 150 199 Q218 194 218 116 L211 122 Q208 180 150 186 Q92 180 89 122 Z" fill="#2E2420" />
      <path d="M132 176 Q150 184 168 176 L166 190 Q150 194 134 190 Z" fill="#2E2420" />
      {/* cap */}
      <path d="M74 84 Q74 6 150 6 Q226 6 226 84 Z" fill={L.cap} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M150 8 L150 84" stroke="#2C3D60" strokeWidth={4} />
      <ellipse cx={150} cy={86} rx={88} ry={15} fill="#17223A" stroke={C.ink} strokeWidth={5} />
      <circle cx={150} cy={46} r={14} fill="#DCE6F2" stroke={C.ink} strokeWidth={3} />
      <Brows face={face} />
      <Eye cx={122} face={face} side="l" skin={skin} look={look} />
      <Eye cx={178} face={face} side="r" skin={skin} look={look} />
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M124 147 Q150 138 176 147" fill="none" stroke="#1E1A18" strokeWidth={8} strokeLinecap="round" />
      <Mouth face={face} talk={talk} />
    </g>
  );

  return (
    <svg viewBox="-60 -20 420 800" width={420} height={800} style={{overflow: 'visible'}}>
      <defs>
        <pattern id="lattice" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="36" height="36" fill={LOOK.simi.dress} />
          <line x1="0" y1="0" x2="0" y2="36" stroke="#2A2420" strokeWidth="3" strokeDasharray="6 4" />
          <line x1="0" y1="0" x2="36" y2="0" stroke="#2A2420" strokeWidth="3" strokeDasharray="6 4" />
        </pattern>
      </defs>
      {isSimi ? (
        <g>
          <ellipse cx={118} cy={748} rx={30} ry={14} fill="#1E1A18" />
          <ellipse cx={182} cy={748} rx={30} ry={14} fill="#1E1A18" />
          <path d="M90 200 Q150 184 210 200 L240 742 L60 742 Z" fill="url(#lattice)" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M62 716 L238 716 L240 742 L60 742 Z" fill="#1E1A18" />
        </g>
      ) : (
        <g>
          <rect x={102} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <rect x={158} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <ellipse cx={118} cy={740} rx={32} ry={15} fill="#1E1A18" />
          <ellipse cx={186} cy={740} rx={32} ry={15} fill="#1E1A18" />
          <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
          <path d="M86 205 Q150 184 214 205 L218 470 L82 470 Z" fill={L.shirt} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          {/* white raglan shoulders */}
          <path d="M86 205 Q110 196 128 194 L104 290 L86 260 Z" fill={L.sleeve} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          <path d="M214 205 Q190 196 172 194 L196 290 L214 260 Z" fill={L.sleeve} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          <path d="M126 194 Q150 216 174 194" fill="none" stroke={L.sleeve} strokeWidth={10} strokeLinecap="round" />
          <path d="M120 192 Q150 224 180 192" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {!handsOnHead && head}
      <Arm p={la} sleeve={isSimi ? L.dress : L.sleeve} skin={skin} short={!isSimi} />
      <Arm p={ra} sleeve={isSimi ? L.dress : L.sleeve} skin={skin} short={!isSimi} />
      {handsOnHead && (
        <>
          {head}
          {/* redraw hands over the head */}
          {pose === 'headHold' && <circle cx={la[2][0]} cy={la[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />}
          <circle cx={ra[2][0]} cy={ra[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />
        </>
      )}
    </svg>
  );
};
