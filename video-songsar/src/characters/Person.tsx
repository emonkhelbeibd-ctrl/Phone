import React from 'react';
import {C} from '../config';
import {ARMS, Arm, Eye, Brows, Mouth, Pose, Face} from './parts';

export type {Pose, Face};
export type Who = 'emon' | 'simi';

// Both characters: fair ("white tone") skin.
export const LOOK = {
  emon: {
    blazer: '#1F3358',
    blazerDark: '#162644',
    shirt: '#FAFAF7',
    pants: '#26324A',
    skin: '#F6D6BE',
  },
  simi: {
    dress: '#1B1A1F',
    gold: '#D9B45A',
    silver: '#D8D8DC',
    skin: '#F8DAC4',
  },
};

const PhoneInHand: React.FC<{x: number; y: number; glow: number}> = ({x, y, glow}) => (
  <g transform={`translate(${x - 22},${y - 70}) rotate(-8)`}>
    <rect x={0} y={0} width={46} height={84} rx={8} fill="#22252C" stroke={C.ink} strokeWidth={4} />
    <rect x={5} y={7} width={36} height={66} rx={4} fill={`rgba(140,205,255,${0.7 + 0.3 * glow})`} />
  </g>
);

export const Person: React.FC<{
  who: Who;
  pose?: Pose;
  face?: Face;
  talk?: number;
  look?: number;
  blink?: boolean;
  sit?: boolean;
  phoneGlow?: number;
}> = ({who, pose = 'stand', face = 'neutral', talk = 0, look = 0, blink = false, sit = false, phoneGlow = 0.5}) => {
  const isSimi = who === 'simi';
  const L: any = LOOK[who];
  const skin = L.skin;
  const [la, ra] = ARMS[pose];
  const handsOnHead = pose === 'scratch' || pose === 'headHold';

  const eyes = (
    <>
      <Brows face={face} />
      <Eye cx={122} face={face} side="l" skin={skin} look={look} blink={blink} />
      <Eye cx={178} face={face} side="r" skin={skin} look={look} blink={blink} />
    </>
  );

  const head = isSimi ? (
    <g>
      <ellipse cx={150} cy={116} rx={70} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      <path d="M76 132 Q66 30 150 28 Q236 30 226 132 Q220 84 196 66 Q160 58 124 74 Q94 92 76 132 Z" fill="#17141A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M124 74 Q150 52 196 66" fill="none" stroke="#3A3440" strokeWidth={4} strokeLinecap="round" />
      {eyes}
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <circle cx={196} cy={126} r={3.5} fill="#5A3A2A" />
      <g fill="#EE8F84" opacity={0.5}>
        <ellipse cx={104} cy={146} rx={13} ry={8} />
        <ellipse cx={196} cy={148} rx={13} ry={8} />
      </g>
      <Mouth face={face} talk={talk} />
    </g>
  ) : (
    <g>
      <circle cx={80} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <circle cx={220} cy={118} r={14} fill={skin} stroke={C.ink} strokeWidth={5} />
      <ellipse cx={150} cy={112} rx={72} ry={78} fill={skin} stroke={C.ink} strokeWidth={5} />
      {/* very short, light stubble along the jaw */}
      <path d="M82 118 Q84 188 150 192 Q216 188 218 118 L212 124 Q206 176 150 180 Q94 176 88 124 Z" fill="#4A3A34" opacity={0.28} />
      <path d="M132 172 Q150 180 168 172 L164 186 Q150 190 136 186 Z" fill="#4A3A34" opacity={0.25} />
      <path d="M76 106 Q62 22 150 14 Q240 18 224 106 Q220 66 196 54 Q160 42 118 50 Q86 62 76 106 Z" fill="#17141A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M110 38 Q160 -6 216 46" fill="none" stroke="#17141A" strokeWidth={20} strokeLinecap="round" />
      {eyes}
      <path d="M150 122 Q160 134 148 138" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M128 147 Q150 141 172 147" fill="none" stroke="#4A3A34" strokeWidth={4} strokeLinecap="round" opacity={0.45} />
      <g fill="#EE8F84" opacity={0.32}>
        <ellipse cx={102} cy={146} rx={13} ry={8} />
        <ellipse cx={198} cy={146} rx={13} ry={8} />
      </g>
      <Mouth face={face} talk={talk} />
    </g>
  );

  const simiBody = (
    <g>
      <path d="M80 110 Q60 220 70 310 Q150 330 230 310 Q240 220 220 110 Z" fill="#17141A" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      {sit ? (
        <>
          <ellipse cx={112} cy={620} rx={30} ry={14} fill="#1E1A18" />
          <ellipse cx={188} cy={620} rx={30} ry={14} fill="#1E1A18" />
        </>
      ) : (
        <>
          <ellipse cx={118} cy={748} rx={30} ry={14} fill="#1E1A18" />
          <ellipse cx={182} cy={748} rx={30} ry={14} fill="#1E1A18" />
        </>
      )}
      <rect x={134} y={176} width={32} height={30} fill={skin} stroke={C.ink} strokeWidth={5} />
      <path d={sit ? 'M90 200 Q150 184 210 200 L248 612 L52 612 Z' : 'M90 200 Q150 184 210 200 L240 742 L60 742 Z'} fill={L.dress} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      {sit && (
        <g>
          <ellipse cx={110} cy={462} rx={50} ry={34} fill={L.dress} stroke={C.ink} strokeWidth={5} />
          <ellipse cx={190} cy={462} rx={50} ry={34} fill={L.dress} stroke={C.ink} strokeWidth={5} />
          <rect x={64} y={440} width={172} height={30} fill={L.dress} />
        </g>
      )}
      <path d="M122 194 L150 250 L178 194 Z" fill={skin} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={104} y1={250 + i * 34} x2={134} y2={268 + i * 34} stroke={L.silver} strokeWidth={4} strokeDasharray="5 5" />
          <line x1={196} y1={250 + i * 34} x2={166} y2={268 + i * 34} stroke={L.silver} strokeWidth={4} strokeDasharray="5 5" />
        </g>
      ))}
      <path d="M122 194 L150 250 L178 194" fill="none" stroke={L.gold} strokeWidth={5} strokeDasharray="3 6" strokeLinecap="round" />
      {Array.from({length: 14}).map((_, i) => (
        <circle key={i} cx={(sit ? 70 : 80) + (i % 7) * (sit ? 26 : 23) + (i > 6 ? 11 : 0)} cy={(sit ? 560 : 666) + (i > 6 ? 24 : 0)} r={4} fill={L.gold} />
      ))}
      <path d="M136 208 Q150 222 164 208" fill="none" stroke={L.gold} strokeWidth={3} />
      <rect x={144} y={218} width={12} height={14} rx={2} fill="#B3243A" stroke={L.gold} strokeWidth={3} />
    </g>
  );

  const emonBody = (
    <g>
      {sit ? (
        <>
          {/* shins hanging down from the knees */}
          <rect x={92} y={470} width={46} height={150} rx={16} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <rect x={162} y={470} width={46} height={150} rx={16} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <ellipse cx={112} cy={624} rx={34} ry={15} fill="#1E1A18" />
          <ellipse cx={188} cy={624} rx={34} ry={15} fill="#1E1A18" />
        </>
      ) : (
        <>
          <rect x={102} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <rect x={158} y={440} width={40} height={290} rx={14} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <ellipse cx={118} cy={740} rx={32} ry={15} fill="#1E1A18" />
          <ellipse cx={186} cy={740} rx={32} ry={15} fill="#1E1A18" />
        </>
      )}
      <rect x={134} y={176} width={32} height={28} fill={skin} stroke={C.ink} strokeWidth={5} />
      <path d="M86 205 Q150 184 214 205 L218 476 L82 476 Z" fill={L.blazer} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M124 196 L176 196 L160 400 L140 400 Z" fill={L.shirt} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M124 196 L150 230 L138 244 Z M176 196 L150 230 L162 244 Z" fill={L.shirt} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M116 200 L150 400 L104 300 L122 260 Z" fill={L.blazerDark} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M184 200 L150 400 L196 300 L178 260 Z" fill={L.blazerDark} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={150} cy={430} r={6} fill={C.ink} />
      {sit && (
        <g>
          {/* thighs/lap toward the camera, with knees */}
          <rect x={76} y={404} width={76} height={92} rx={36} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <rect x={148} y={404} width={76} height={92} rx={36} fill={L.pants} stroke={C.ink} strokeWidth={5} />
          <path d="M96 470 Q114 482 132 470 M168 470 Q186 482 204 470" fill="none" stroke="#3B4A6A" strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
    </g>
  );

  return (
    <svg viewBox="-60 -20 420 800" width={420} height={800} style={{overflow: 'visible'}}>
      {isSimi ? simiBody : emonBody}
      {!handsOnHead && head}
      <Arm p={la} sleeve={isSimi ? L.dress : L.blazer} skin={skin} />
      {pose === 'phone' && <PhoneInHand x={ra[2][0]} y={ra[2][1]} glow={phoneGlow} />}
      <Arm p={ra} sleeve={isSimi ? L.dress : L.blazer} skin={skin} />
      {handsOnHead && (
        <>
          {head}
          {pose === 'headHold' && <circle cx={la[2][0]} cy={la[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />}
          <circle cx={ra[2][0]} cy={ra[2][1]} r={19} fill={skin} stroke={C.ink} strokeWidth={5} />
        </>
      )}
    </svg>
  );
};
