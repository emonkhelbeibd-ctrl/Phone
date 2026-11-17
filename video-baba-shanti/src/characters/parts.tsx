import React from 'react';
import {C} from '../config';

export type Pose = 'stand' | 'point' | 'hips' | 'scratch' | 'open' | 'crossed' | 'chin' | 'headHold' | 'shrug' | 'give' | 'carry';
export type Face = 'neutral' | 'surprised' | 'annoyed' | 'smile' | 'happy' | 'wink' | 'sad' | 'think' | 'smug';

export type Look = {
  skin: string;
  outfit: 'shirt' | 'panjabi' | 'saree';
  top: string;
  topDark?: string;
  bottom: string; // pants / lungi / saree colour
  bottomType: 'pants' | 'lungi' | 'saree';
  hair: 'black' | 'grey' | 'balding' | 'bun' | 'kid';
  beard?: string; // colour or undefined
  mustache?: string;
  glasses?: boolean;
  shortSleeve?: boolean;
};

export const LOOKS: Record<string, Look> = {
  uncle: {skin: '#B9774A', outfit: 'shirt', top: '#D9A35B', topDark: '#B9853E', bottom: '#3E6E8E', bottomType: 'lungi', hair: 'balding', mustache: '#3A302A'},
  father: {skin: '#A8693F', outfit: 'panjabi', top: '#F1ECE2', topDark: '#D9D1C2', bottom: '#F1ECE2', bottomType: 'pants', hair: 'grey', beard: '#CFCAC2', glasses: true},
  boy: {skin: '#B37548', outfit: 'shirt', top: '#F7F7F2', topDark: '#DADAD2', bottom: '#2F4E7A', bottomType: 'pants', hair: 'kid', shortSleeve: true},
  son: {skin: '#B37548', outfit: 'shirt', top: '#5B8CC4', topDark: '#4874A8', bottom: '#2B3245', bottomType: 'pants', hair: 'black'},
  mother: {skin: '#AD6E46', outfit: 'saree', top: '#E2B04A', bottom: '#2F7D5B', bottomType: 'saree', hair: 'bun'},
};

// Arm paths in the character's own frame (forward = +x). Shoulders at (95,215) / (205,215).
export const ARMS: Record<Pose, [number[][], number[][]]> = {
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
  give: [
    [[95, 215], [80, 335], [88, 445]],
    [[205, 215], [250, 320], [318, 330]],
  ],
  carry: [
    [[95, 215], [36, 120], [96, 6]],
    [[205, 215], [264, 120], [204, 6]],
  ],
  shrug: [
    [[95, 215], [40, 270], [18, 205]],
    [[205, 215], [260, 270], [282, 205]],
  ],
};

const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ');

export const Arm: React.FC<{p: number[][]; sleeve: string; skin: string; short?: boolean}> = ({p, sleeve, skin, short}) => {
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

export const Eye: React.FC<{cx: number; face: Face; side: 'l' | 'r'; skin: string; look: number}> = ({cx, face, side, skin, look}) => {
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

export const Brows: React.FC<{face: Face}> = ({face}) => {
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

export const Mouth: React.FC<{face: Face; talk: number}> = ({face, talk}) => {
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

