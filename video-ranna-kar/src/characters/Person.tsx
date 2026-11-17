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
    shirt: '#5E9C7A',
    shirtDark: '#4C8466',
    pants: '#2F3A5A',
    skin: C.skin,
  },
  simi: {
    shirt: '#E7B23F',
    shirtDark: '#C99525',
    saree: '#C2413A',
    sareeBorder: '#E7B23F',
    pallu: '#2E8B83',
    skin: '#A8673E',
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

const Arm: React.FC<{p: number[][]; sleeve: string; skin: string}> = ({p, sleeve, skin}) => {
  const end = p[p.length - 1];
  return (
    <g>
      <polyline points={pts(p)} fill="none" stroke={C.ink} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts(p)} fill="none" stroke={sleeve} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
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

  const head = (
    <g>
      {/* ears */}
      <circle cx={80} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <circle cx={220} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      {isSimi && <circle cx={80} cy={140} r={6} fill={L.sareeBorder} stroke={C.ink} strokeWidth={3} />}
      {isSimi && <circle cx={220} cy={140} r={6} fill={L.sareeBorder} stroke={C.ink} strokeWidth={3} />}
      {/* bun */}
      {isSimi && <circle cx={150} cy={22} r={30} fill="#1E1A18" stroke={C.ink} strokeWidth={5} />}
      {/* head */}
      <ellipse cx={150} cy={112} rx={72} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      {/* hair */}
      {isSimi ? (
        <path d="M78 112 Q74 34 150 32 Q226 34 222 112 Q206 70 150 66 Q94 70 78 112 Z" fill="#1E1A18" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      ) : (
        <path d="M78 104 Q72 30 150 30 Q230 30 222 100 Q214 72 186 64 Q170 80 140 70 Q110 62 92 80 Q82 90 78 104 Z" fill="#1E1A18" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      )}
      {isSimi && <circle cx={150} cy={78} r={5} fill={C.red} />}
      <Brows face={face} />
      <Eye cx={122} face={face} side="l" skin={skin} look={look} />
      <Eye cx={178} face={face} side="r" skin={skin} look={look} />
      {who === 'emon' && (
        <g fill="none" stroke={C.ink} strokeWidth={4}>
          <circle cx={122} cy={108} r={25} />
          <circle cx={178} cy={108} r={25} />
          <line x1={147} y1={106} x2={153} y2={106} />
        </g>
      )}
      {/* nose */}
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      {isSimi && (
        <g fill="#E58C7A" opacity={0.55}>
          <ellipse cx={104} cy={146} rx={13} ry={8} />
          <ellipse cx={196} cy={146} rx={13} ry={8} />
        </g>
      )}
      {who === 'emon' && <path d="M126 146 Q150 140 174 146" fill="none" stroke="#1E1A18" strokeWidth={6} strokeLinecap="round" />}
      <Mouth face={face} talk={talk} />
    </g>
  );

  return (
    <svg viewBox="-60 -20 420 800" width={420} height={800} style={{overflow: 'visible'}}>
      {/* legs + feet */}
      {isSimi ? (
        <g>
          <ellipse cx={118} cy={748} rx={30} ry={14} fill="#1E1A18" />
          <ellipse cx={182} cy={748} rx={30} ry={14} fill="#1E1A18" />
          <path d="M92 400 L208 400 L236 742 L64 742 Z" fill={L.saree} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M70 712 L230 712" stroke={L.sareeBorder} strokeWidth={14} />
          <path d="M66 742 L234 742" stroke={C.ink} strokeWidth={5} />
          <g fill={L.sareeBorder} opacity={0.8}>
            <circle cx={120} cy={520} r={5} />
            <circle cx={170} cy={600} r={5} />
            <circle cx={130} cy={650} r={5} />
            <circle cx={185} cy={500} r={5} />
          </g>
        </g>
      ) : (
        <g>
          <rect x={102} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <rect x={158} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <ellipse cx={118} cy={740} rx={32} ry={15} fill="#1E1A18" />
          <ellipse cx={186} cy={740} rx={32} ry={15} fill="#1E1A18" />
        </g>
      )}
      {/* torso */}
      {isSimi ? (
        <g>
          <path d="M88 200 Q150 182 212 200 L214 420 L86 420 Z" fill={L.shirt} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M100 196 L214 400 L192 420 L84 222 Z" fill={L.pallu} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M96 206 L204 404" stroke={L.sareeBorder} strokeWidth={6} />
        </g>
      ) : (
        <g>
          <path d="M86 205 Q150 184 214 205 L218 470 L82 470 Z" fill={L.shirt} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M130 194 L150 232 L170 194" fill="none" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <line x1={150} y1={232} x2={150} y2={462} stroke={L.shirtDark} strokeWidth={4} />
          <circle cx={150} cy={270} r={4} fill={C.ink} />
          <circle cx={150} cy={320} r={4} fill={C.ink} />
          <circle cx={150} cy={370} r={4} fill={C.ink} />
          <rect x={164} y={250} width={34} height={30} rx={4} fill="none" stroke={L.shirtDark} strokeWidth={4} />
        </g>
      )}
      {/* neck */}
      <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
      {!handsOnHead && head}
      <Arm p={la} sleeve={L.shirt} skin={skin} />
      <Arm p={ra} sleeve={L.shirt} skin={skin} />
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
