import React from 'react';
import {C} from '../config';
import {ARMS, Arm, Eye, Brows, Mouth, Look, Pose, Face} from './parts';

export type {Pose, Face};

const Hair: React.FC<{look: Look}> = ({look}) => {
  switch (look.hair) {
    case 'black':
      return <path d="M78 104 Q70 28 150 26 Q232 28 222 102 Q214 66 186 58 Q166 74 138 64 Q106 58 92 78 Q82 90 78 104 Z" fill="#1E1A18" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
    case 'kid':
      return <path d="M78 108 Q72 30 150 28 Q228 30 222 108 Q210 70 176 70 Q150 82 120 70 Q90 72 78 108 Z" fill="#1E1A18" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
    case 'grey':
      return <path d="M78 100 Q72 30 150 28 Q228 30 222 100 Q212 64 180 58 Q150 66 120 58 Q90 64 78 100 Z" fill="#D8D4CC" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />;
    case 'balding':
      return (
        <g fill="#3A302A" stroke={C.ink} strokeWidth={4} strokeLinejoin="round">
          <path d="M78 116 Q74 70 96 56 L100 100 Z" />
          <path d="M222 116 Q226 70 204 56 L200 100 Z" />
        </g>
      );
    case 'bun':
      return (
        <g>
          <circle cx={150} cy={22} r={30} fill="#1E1A18" stroke={C.ink} strokeWidth={5} />
          <path d="M78 112 Q74 34 150 32 Q226 34 222 112 Q206 70 150 66 Q94 70 78 112 Z" fill="#1E1A18" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M150 34 Q170 50 196 70" fill="none" stroke="#9A948C" strokeWidth={5} strokeLinecap="round" />
        </g>
      );
  }
};

export const Person: React.FC<{
  look: Look;
  pose?: Pose;
  face?: Face;
  talk?: number;
  lookDir?: number;
}> = ({look: L, pose = 'stand', face = 'neutral', talk = 0, lookDir = 0}) => {
  const skin = L.skin;
  const [la, ra] = ARMS[pose];
  const handsOnHead = pose === 'scratch' || pose === 'headHold' || pose === 'carry';
  const female = L.outfit === 'saree';
  const long = L.outfit === 'panjabi';

  const head = (
    <g>
      <circle cx={80} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <circle cx={220} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      {female && <circle cx={80} cy={140} r={6} fill="#E2B04A" stroke={C.ink} strokeWidth={3} />}
      {female && <circle cx={220} cy={140} r={6} fill="#E2B04A" stroke={C.ink} strokeWidth={3} />}
      <ellipse cx={150} cy={112} rx={72} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      {L.beard && (
        <path d="M80 112 Q80 200 150 204 Q220 200 220 112 L210 120 Q206 176 150 182 Q94 176 90 120 Z" fill={L.beard} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      )}
      <Hair look={L} />
      {female && <circle cx={150} cy={80} r={5} fill={C.red} />}
      <Brows face={face} />
      <Eye cx={122} face={face} side="l" skin={skin} look={lookDir} />
      <Eye cx={178} face={face} side="r" skin={skin} look={lookDir} />
      {L.glasses && (
        <g fill="none" stroke={C.ink} strokeWidth={4}>
          <rect x={96} y={88} width={52} height={40} rx={10} />
          <rect x={152} y={88} width={52} height={40} rx={10} />
        </g>
      )}
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      {(L.mustache || L.beard) && <path d="M124 147 Q150 138 176 147" fill="none" stroke={L.mustache || L.beard} strokeWidth={8} strokeLinecap="round" />}
      {female && (
        <g fill="#E58C7A" opacity={0.5}>
          <ellipse cx={104} cy={146} rx={13} ry={8} />
          <ellipse cx={196} cy={146} rx={13} ry={8} />
        </g>
      )}
      <Mouth face={face} talk={talk} />
    </g>
  );

  let body: React.ReactNode;
  if (female) {
    body = (
      <g>
        <ellipse cx={118} cy={748} rx={30} ry={14} fill="#1E1A18" />
        <ellipse cx={182} cy={748} rx={30} ry={14} fill="#1E1A18" />
        <path d="M92 400 L208 400 L236 742 L64 742 Z" fill={L.bottom} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M70 712 L230 712" stroke="#E2B04A" strokeWidth={14} />
        <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
        <path d="M88 200 Q150 182 212 200 L214 420 L86 420 Z" fill={L.top} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M100 196 L214 400 L192 420 L84 222 Z" fill={L.bottom} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M96 206 L204 404" stroke="#E2B04A" strokeWidth={6} />
      </g>
    );
  } else {
    const torsoEnd = long ? 560 : 470;
    body = (
      <g>
        {L.bottomType === 'lungi' ? (
          <g>
            <path d="M86 450 L214 450 L224 726 L76 726 Z" fill={L.bottom} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={86} y1={500 + i * 60} x2={218} y2={500 + i * 60} stroke="#2A5470" strokeWidth={6} />
            ))}
            {[0, 1, 2].map((i) => (
              <line key={'v' + i} x1={118 + i * 34} y1={452} x2={116 + i * 36} y2={724} stroke="#2A5470" strokeWidth={5} />
            ))}
            <rect x={110} y={726} width={30} height={14} fill={skin} />
            <rect x={162} y={726} width={30} height={14} fill={skin} />
          </g>
        ) : (
          <g>
            <rect x={102} y={440} width={40} height={290} rx={14} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
            <rect x={158} y={440} width={40} height={290} rx={14} fill={L.bottom} stroke={C.ink} strokeWidth={5} />
          </g>
        )}
        <ellipse cx={118} cy={740} rx={32} ry={15} fill="#1E1A18" />
        <ellipse cx={186} cy={740} rx={32} ry={15} fill="#1E1A18" />
        <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
        <path d={`M86 205 Q150 184 214 205 L${long ? 226 : 218} ${torsoEnd} L${long ? 74 : 82} ${torsoEnd} Z`} fill={L.top} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        {long ? (
          <g>
            <path d="M138 196 L138 300" stroke={L.topDark} strokeWidth={5} />
            <circle cx={146} cy={226} r={4} fill={C.ink} />
            <circle cx={146} cy={256} r={4} fill={C.ink} />
            <circle cx={146} cy={286} r={4} fill={C.ink} />
          </g>
        ) : (
          <g>
            <path d="M130 194 L150 232 L170 194" fill="none" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
            <line x1={150} y1={232} x2={150} y2={462} stroke={L.topDark} strokeWidth={4} />
            <circle cx={150} cy={280} r={4} fill={C.ink} />
            <circle cx={150} cy={330} r={4} fill={C.ink} />
            <circle cx={150} cy={380} r={4} fill={C.ink} />
            <rect x={164} y={250} width={34} height={30} rx={4} fill="none" stroke={L.topDark} strokeWidth={4} />
          </g>
        )}
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
