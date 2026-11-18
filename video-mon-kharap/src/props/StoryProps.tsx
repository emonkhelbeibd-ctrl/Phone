import React from 'react';
import {C, FONT} from '../config';

const ink = {stroke: C.ink, strokeWidth: 5, strokeLinejoin: 'round' as const};

export const Book: React.FC<{size?: number; color?: string}> = ({size = 140, color = '#C8401F'}) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 150 120" style={{overflow: 'visible'}}>
    <path d="M75 20 Q40 4 6 14 L6 108 Q40 98 75 112 Q110 98 144 108 L144 14 Q110 4 75 20 Z" fill="#FFFDF6" {...ink} />
    <path d="M75 20 L75 112" stroke={C.ink} strokeWidth={5} />
    <path d="M6 108 Q40 98 75 112 Q110 98 144 108 L144 118 Q110 108 75 120 Q40 108 6 118 Z" fill={color} {...ink} />
    {[34, 50, 66].map((y) => (
      <g key={y} stroke="#B9AFA0" strokeWidth={4} strokeLinecap="round">
        <line x1={20} y1={y} x2={60} y2={y + 4} />
        <line x1={90} y1={y + 4} x2={130} y2={y} />
      </g>
    ))}
  </svg>
);

export const GradCap: React.FC<{size?: number}> = ({size = 160}) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 160 120" style={{overflow: 'visible'}}>
    <path d="M44 56 L44 90 Q80 110 116 90 L116 56 Z" fill="#2B2F3A" {...ink} />
    <path d="M80 10 L156 44 L80 78 L4 44 Z" fill="#363B48" {...ink} />
    <path d="M80 44 L132 60 L132 92" fill="none" stroke="#E7B23F" strokeWidth={5} />
    <circle cx={132} cy={98} r={8} fill="#E7B23F" stroke={C.ink} strokeWidth={4} />
  </svg>
);

export const Laptop: React.FC<{size?: number; glow?: number}> = ({size = 300, glow = 0}) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 300 210" style={{overflow: 'visible'}}>
    <rect x={40} y={10} width={220} height={150} rx={12} fill="#3B3F48" {...ink} />
    <rect x={54} y={24} width={192} height={122} rx={6} fill={`rgba(150,205,240,${0.75 + glow * 0.25})`} />
    <rect x={70} y={44} width={110} height={12} rx={6} fill="#fff" opacity={0.85} />
    <rect x={70} y={68} width={150} height={10} rx={5} fill="#fff" opacity={0.6} />
    <rect x={70} y={88} width={80} height={10} rx={5} fill="#fff" opacity={0.6} />
    <path d="M10 166 L290 166 L272 194 L28 194 Z" fill="#9AA0A8" {...ink} />
  </svg>
);

export const Note: React.FC<{size?: number; text?: string}> = ({size = 200, text = '৳'}) => (
  <div
    style={{
      width: size,
      height: size * 0.5,
      background: '#8CC79A',
      border: `5px solid ${C.ink}`,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      boxSizing: 'border-box',
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size * 0.24,
      color: '#1F5C35',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    }}
  >
    <span style={{width: size * 0.2, height: size * 0.2, borderRadius: '50%', background: '#B7E0C0', border: `4px solid #1F5C35`}} />
    {text}
  </div>
);

export const Coin: React.FC<{size?: number}> = ({size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <circle cx={35} cy={35} r={30} fill="#E7B23F" {...ink} />
    <circle cx={35} cy={35} r={19} fill="none" stroke="#B9852A" strokeWidth={4} />
    <text x={35} y={45} textAnchor="middle" fontSize={28} fontWeight={700} fill="#8A5E14" fontFamily="Hind Siliguri">৳</text>
  </svg>
);

export const Office: React.FC<{size?: number}> = ({size = 360}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 360 504" style={{overflow: 'visible'}}>
    <rect x={40} y={30} width={280} height={470} fill="#7FA3C6" {...ink} />
    <rect x={40} y={30} width={280} height={44} fill="#5C82A8" {...ink} />
    <text x={180} y={62} textAnchor="middle" fontSize={28} fontWeight={700} fill="#fff" fontFamily="Hind Siliguri">কোম্পানি</text>
    {Array.from({length: 15}).map((_, i) => (
      <rect key={i} x={70 + (i % 3) * 80} y={100 + Math.floor(i / 3) * 66} width={58} height={44} fill="#D9EEF8" stroke={C.ink} strokeWidth={4} />
    ))}
    <rect x={146} y={430} width={68} height={70} fill="#4D5A6B" {...ink} />
  </svg>
);

export const Gift: React.FC<{size?: number}> = ({size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 150 150" style={{overflow: 'visible'}}>
    <rect x={18} y={64} width={114} height={80} fill="#C8401F" {...ink} />
    <rect x={10} y={42} width={130} height={30} fill="#D9574A" {...ink} />
    <rect x={64} y={42} width={22} height={102} fill="#E7B23F" {...ink} />
    <path d="M75 42 Q40 0 36 30 Q36 44 75 42 Q110 44 114 30 Q110 0 75 42 Z" fill="#E7B23F" {...ink} />
  </svg>
);

// Heavy bundle carried on the head (responsibility)
export const Bundle: React.FC<{size?: number}> = ({size = 300}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 300 180" style={{overflow: 'visible'}}>
    <path d="M20 150 Q10 60 80 40 Q150 10 220 40 Q290 60 280 150 Z" fill="#C9A77A" {...ink} />
    <path d="M150 20 L150 150 M60 60 Q150 90 240 60" fill="none" stroke="#8C6A42" strokeWidth={6} />
    <rect x={20} y={140} width={260} height={24} rx={10} fill="#A5835A" {...ink} />
  </svg>
);

// Empty rice pot (scarcity)
export const EmptyPot: React.FC<{size?: number}> = ({size = 260}) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 260 208" style={{overflow: 'visible'}}>
    <ellipse cx={130} cy={40} rx={110} ry={26} fill="#3A3027" {...ink} />
    <path d="M22 44 Q14 180 130 196 Q246 180 238 44 Q130 80 22 44 Z" fill="#9A9EA6" {...ink} />
    <path d="M40 70 Q130 100 220 70" fill="none" stroke="#7D828B" strokeWidth={5} />
  </svg>
);

export const Arrow: React.FC<{w?: number; color?: string}> = ({w = 200, color = C.red}) => (
  <svg width={w} height={60} viewBox={`0 0 ${w} 60`}>
    <line x1={8} y1={30} x2={w - 30} y2={30} stroke={color} strokeWidth={10} strokeLinecap="round" strokeDasharray="2 18" />
    <path d={`M${w - 40} 10 L${w - 6} 30 L${w - 40} 50`} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Desk: React.FC<{w?: number}> = ({w = 520}) => (
  <svg width={w} height={260} viewBox={`0 0 ${w} 260`}>
    <rect x={0} y={0} width={w} height={34} rx={6} fill="#A9744C" {...ink} />
    <rect x={24} y={34} width={30} height={226} fill="#8C5A3A" {...ink} />
    <rect x={w - 54} y={34} width={30} height={226} fill="#8C5A3A" {...ink} />
  </svg>
);
