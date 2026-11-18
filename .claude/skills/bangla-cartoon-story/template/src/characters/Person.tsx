import React from 'react';
import {C} from '../config';
import {ARMS, Arm, Eye, Brows, Mouth, Pose, Face} from './parts';

export type {Pose, Face};
export type Who = 'elder' | 'younger' | 'father' | 'mother' | 'kidE' | 'kidY';

type Look = {
  skin: string;
  outfit: 'shirt' | 'tee' | 'panjabi' | 'saree';
  top: string;
  topDark: string;
  bottom: string;
  hair: 'neat' | 'messy' | 'grey' | 'bun' | 'kid' | 'kidSpiky';
  beard?: {color: string; opacity: number};
  tie?: string;
  glasses?: boolean;
  shortSleeve?: boolean;
  pallu?: string;
};

export const LOOKS: Record<Who, Look> = {
  // Younger brother — the officer: crisp white shirt, navy tie, neat hair
  younger: {skin: '#F2CBA8', outfit: 'shirt', top: '#FBFBF8', topDark: '#DCDCD6', bottom: '#3A3F4E', hair: 'neat', tie: '#24467A'},
  // Elder brother — faded rust shirt, untidy hair, stubble
  elder: {skin: '#E8BC96', outfit: 'shirt', top: '#B56A4E', topDark: '#94533B', bottom: '#5E5B4C', hair: 'messy', beard: {color: '#3A2E2A', opacity: 0.45}},
  father: {skin: '#E6B892', outfit: 'panjabi', top: '#F3EFE6', topDark: '#D9D1C2', bottom: '#F3EFE6', hair: 'grey', beard: {color: '#D6D1C8', opacity: 1}, glasses: true},
  mother: {skin: '#EDC3A0', outfit: 'saree', top: '#E7B23F', topDark: '#C99525', bottom: '#2F7D6B', pallu: '#2F7D6B', hair: 'bun'},
  kidY: {skin: '#F2CBA8', outfit: 'tee', top: '#FBFBF8', topDark: '#DCDCD6', bottom: '#2F4E7A', hair: 'kid', shortSleeve: true},
  kidE: {skin: '#E8BC96', outfit: 'tee', top: '#D9574A', topDark: '#B9453A', bottom: '#4A4F5C', hair: 'kidSpiky', shortSleeve: true},
};

const Hair: React.FC<{L: Look}> = ({L}) => {
  switch (L.hair) {
    case 'neat':
      return (
        <g>
          <path d="M78 104 Q70 26 150 22 Q232 26 222 102 Q216 70 196 60 L120 60 Q96 66 86 84 Q80 92 78 104 Z" fill="#1A1614" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M120 60 Q150 40 200 52" fill="none" stroke="#3A3330" strokeWidth={4} strokeLinecap="round" />
        </g>
      );
    case 'messy':
      return (
        <path d="M76 108 Q64 60 80 40 L92 52 L100 22 L118 42 L134 12 L150 38 L170 14 L182 40 L204 22 L208 50 L226 44 Q236 76 224 108 Q214 74 188 66 Q150 80 116 66 Q90 74 76 108 Z" fill="#221C1A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      );
    case 'grey':
      return <path d="M78 100 Q72 30 150 28 Q228 30 222 100 Q212 64 180 58 Q150 66 120 58 Q90 64 78 100 Z" fill="#D8D4CC" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
    case 'bun':
      return (
        <g>
          <circle cx={150} cy={22} r={30} fill="#2A2422" stroke={C.ink} strokeWidth={5} />
          <path d="M78 112 Q74 34 150 32 Q226 34 222 112 Q206 70 150 66 Q94 70 78 112 Z" fill="#2A2422" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M150 34 Q172 50 198 72" fill="none" stroke="#A8A29A" strokeWidth={6} strokeLinecap="round" />
        </g>
      );
    case 'kid':
      return <path d="M78 108 Q72 30 150 28 Q228 30 222 108 Q210 70 176 70 Q150 82 120 70 Q90 72 78 108 Z" fill="#1A1614" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
    case 'kidSpiky':
      return <path d="M78 108 Q70 50 92 34 L108 50 L120 22 L140 44 L158 18 L172 44 L196 26 L204 52 Q228 70 222 108 Q210 72 176 70 Q150 82 120 70 Q90 74 78 108 Z" fill="#221C1A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
  }
};

export const Person: React.FC<{
  who: Who;
  pose?: Pose;
  face?: Face;
  talk?: number;
  look?: number;
  blink?: boolean;
  sit?: boolean;
  phoneGlow?: number;
}> = ({who, pose = 'stand', face = 'neutral', talk = 0, look = 0, blink = false, sit = false}) => {
  const L = LOOKS[who];
  const skin = L.skin;
  const [la, ra] = ARMS[pose];
  const handsOnHead = pose === 'scratch' || pose === 'headHold' || pose === 'carry';
  const female = L.outfit === 'saree';

  const head = (
    <g>
      <circle cx={80} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <circle cx={220} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      {female && <circle cx={80} cy={140} r={6} fill="#E7B23F" stroke={C.ink} strokeWidth={3} />}
      {female && <circle cx={220} cy={140} r={6} fill="#E7B23F" stroke={C.ink} strokeWidth={3} />}
      <ellipse cx={150} cy={112} rx={72} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      {L.beard && (
        <path d="M80 112 Q80 200 150 204 Q220 200 220 112 L210 120 Q206 176 150 182 Q94 176 90 120 Z" fill={L.beard.color} opacity={L.beard.opacity} stroke={L.beard.opacity === 1 ? C.ink : 'none'} strokeWidth={3} />
      )}
      <Hair L={L} />
      {female && <circle cx={150} cy={80} r={5} fill={C.red} />}
      <Brows face={face} />
      <Eye cx={122} face={face} side="l" skin={skin} look={look} blink={blink} />
      <Eye cx={178} face={face} side="r" skin={skin} look={look} blink={blink} />
      {L.glasses && (
        <g fill="none" stroke={C.ink} strokeWidth={4}>
          <rect x={96} y={88} width={52} height={40} rx={10} />
          <rect x={152} y={88} width={52} height={40} rx={10} />
        </g>
      )}
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      {L.beard && <path d="M126 147 Q150 139 174 147" fill="none" stroke={L.beard.color} strokeWidth={L.beard.opacity === 1 ? 8 : 5} strokeLinecap="round" opacity={Math.min(1, L.beard.opacity + 0.2)} />}
      <g fill="#EE8F84" opacity={female || who === 'younger' || who.startsWith('kid') ? 0.4 : 0.2}>
        <ellipse cx={102} cy={146} rx={13} ry={8} />
        <ellipse cx={198} cy={146} rx={13} ry={8} />
      </g>
      <Mouth face={face} talk={talk} />
    </g>
  );

  const legs = sit ? (
    <g>
      <rect x={92} y={470} width={46} height={150} rx={16} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
      <rect x={162} y={470} width={46} height={150} rx={16} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
      <ellipse cx={112} cy={624} rx={34} ry={15} fill="#1E1A18" />
      <ellipse cx={188} cy={624} rx={34} ry={15} fill="#1E1A18" />
    </g>
  ) : (
    <g>
      <rect x={102} y={440} width={40} height={290} rx={14} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
      <rect x={158} y={440} width={40} height={290} rx={14} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
      <ellipse cx={118} cy={740} rx={32} ry={15} fill="#1E1A18" />
      <ellipse cx={186} cy={740} rx={32} ry={15} fill="#1E1A18" />
    </g>
  );
  const lap = sit ? (
    <g>
      <rect x={76} y={404} width={76} height={92} rx={36} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
      <rect x={148} y={404} width={76} height={92} rx={36} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
    </g>
  ) : null;

  let body: React.ReactNode;
  if (female) {
    body = (
      <g>
        <ellipse cx={118} cy={748} rx={30} ry={14} fill="#1E1A18" />
        <ellipse cx={182} cy={748} rx={30} ry={14} fill="#1E1A18" />
        <path d="M92 400 L208 400 L236 742 L64 742 Z" fill={L.bottom} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M70 712 L230 712" stroke="#E7B23F" strokeWidth={14} />
        <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
        <path d="M88 200 Q150 182 212 200 L214 420 L86 420 Z" fill={L.top} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M100 196 L214 400 L192 420 L84 222 Z" fill={L.pallu} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M96 206 L204 404" stroke="#E7B23F" strokeWidth={6} />
      </g>
    );
  } else {
    const long = L.outfit === 'panjabi';
    const end = long && !sit ? 560 : sit ? 440 : 470;
    body = (
      <g>
        {legs}
        <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
        <path d={`M86 205 Q150 184 214 205 L${long ? 226 : 218} ${end} L${long ? 74 : 82} ${end} Z`} fill={L.top} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        {L.outfit === 'shirt' && (
          <g>
            <path d="M122 194 L150 232 L178 194" fill="none" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
            <path d="M122 194 L134 226 L150 232 Z M178 194 L166 226 L150 232 Z" fill={L.top} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
            {L.tie ? (
              <path d="M142 232 L158 232 L164 360 L150 380 L136 360 Z" fill={L.tie} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
            ) : (
              <>
                <line x1={150} y1={232} x2={150} y2={end - 6} stroke={L.topDark} strokeWidth={4} />
                <circle cx={150} cy={280} r={4} fill={C.ink} />
                <circle cx={150} cy={330} r={4} fill={C.ink} />
                <circle cx={150} cy={380} r={4} fill={C.ink} />
              </>
            )}
            <rect x={166} y={252} width={32} height={28} rx={4} fill="none" stroke={L.topDark} strokeWidth={4} />
          </g>
        )}
        {L.outfit === 'tee' && <path d="M126 196 Q150 216 174 196" fill="none" stroke={C.ink} strokeWidth={5} />}
        {long && (
          <g>
            <path d="M138 196 L138 300" stroke={L.topDark} strokeWidth={5} />
            <circle cx={146} cy={226} r={4} fill={C.ink} />
            <circle cx={146} cy={256} r={4} fill={C.ink} />
            <circle cx={146} cy={286} r={4} fill={C.ink} />
          </g>
        )}
        {lap}
      </g>
    );
  }

  return (
    <svg viewBox="-60 -20 420 800" width={420} height={800} style={{overflow: 'visible'}}>
      {body}
      {!handsOnHead && head}
      <Arm p={la} sleeve={L.top} skin={skin} short={L.shortSleeve} />
      <Arm p={ra} sleeve={L.top} skin={skin} short={L.shortSleeve} />
      {handsOnHead && (
        <>
          {head}
          {pose !== 'scratch' && <circle cx={la[2][0]} cy={la[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />}
          <circle cx={ra[2][0]} cy={ra[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />
        </>
      )}
    </svg>
  );
};
