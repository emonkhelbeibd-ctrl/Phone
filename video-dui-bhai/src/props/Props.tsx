import React from 'react';
import {C, FONT} from '../config';

export const FriedEgg: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 150 120" style={{overflow: 'visible'}}>
    <path d="M20 60 Q10 20 55 18 Q85 0 115 22 Q148 34 136 70 Q140 108 92 104 Q60 118 34 98 Q8 88 20 60 Z" fill="#FFFDF6" stroke={C.ink} strokeWidth={5} />
    <circle cx={78} cy={60} r={24} fill="#F2B233" stroke={C.ink} strokeWidth={5} />
    <circle cx={70} cy={52} r={6} fill="#FFE29A" />
  </svg>
);

export const Pan: React.FC<{egg?: boolean}> = ({egg = true}) => (
  <svg width={360} height={140} viewBox="0 0 360 140" style={{overflow: 'visible'}}>
    <rect x={220} y={50} width={140} height={24} rx={12} fill="#3B2A22" stroke={C.ink} strokeWidth={5} />
    <ellipse cx={120} cy={62} rx={118} ry={42} fill="#4A4F57" stroke={C.ink} strokeWidth={6} />
    <ellipse cx={120} cy={56} rx={98} ry={30} fill="#2F3338" />
    {egg && (
      <g transform="translate(62,22) scale(0.8)">
        <path d="M20 60 Q10 20 55 18 Q85 0 115 22 Q148 34 136 70 Q140 108 92 104 Q60 118 34 98 Q8 88 20 60 Z" fill="#FFFDF6" stroke={C.ink} strokeWidth={5} />
        <circle cx={78} cy={60} r={24} fill="#F2B233" stroke={C.ink} strokeWidth={5} />
      </g>
    )}
  </svg>
);

export const Spatula: React.FC = () => (
  <svg width={70} height={260} viewBox="0 0 70 260" style={{overflow: 'visible'}}>
    <rect x={28} y={90} width={14} height={170} rx={7} fill="#8C5A3A" stroke={C.ink} strokeWidth={5} />
    <rect x={6} y={4} width={58} height={92} rx={12} fill="#B8BEC6" stroke={C.ink} strokeWidth={5} />
    <line x1={24} y1={20} x2={24} y2={78} stroke={C.ink} strokeWidth={4} />
    <line x1={46} y1={20} x2={46} y2={78} stroke={C.ink} strokeWidth={4} />
  </svg>
);

export const RedX: React.FC<{size?: number}> = ({size = 90}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={44} fill={C.red} stroke={C.ink} strokeWidth={5} />
    <path d="M32 32 L68 68 M68 32 L32 68" stroke="#fff" strokeWidth={11} strokeLinecap="round" />
  </svg>
);

export const Check: React.FC<{size?: number}> = ({size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={44} fill="#4E9A62" stroke={C.ink} strokeWidth={5} />
    <path d="M28 52 L44 68 L74 36" fill="none" stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sweat: React.FC<{size?: number}> = ({size = 40}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
    <path d="M20 2 Q36 30 34 40 Q30 54 20 54 Q8 54 6 40 Q4 30 20 2 Z" fill="#8FD0F0" stroke={C.ink} strokeWidth={4} />
  </svg>
);

export const Heart: React.FC<{size?: number}> = ({size = 90}) => (
  <svg width={size} height={size} viewBox="0 0 100 92">
    <path d="M50 88 Q6 58 6 30 Q6 6 28 6 Q42 6 50 22 Q58 6 72 6 Q94 6 94 30 Q94 58 50 88 Z" fill={C.red} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
  </svg>
);

export const Sparkle: React.FC<{size?: number; color?: string}> = ({size = 40, color = C.red}) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <path d="M20 0 L24 16 L40 20 L24 24 L20 40 L16 24 L0 20 L16 16 Z" fill={color} />
  </svg>
);

export const Bulb: React.FC = () => (
  <svg width={110} height={150} viewBox="0 0 110 150" style={{overflow: 'visible'}}>
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (-150 + i * 30) * (Math.PI / 180);
      return <line key={i} x1={55 + Math.cos(a) * 62} y1={55 + Math.sin(a) * 62} x2={55 + Math.cos(a) * 82} y2={55 + Math.sin(a) * 82} stroke="#E8A72A" strokeWidth={7} strokeLinecap="round" />;
    })}
    <circle cx={55} cy={55} r={42} fill="#FFD95A" stroke={C.ink} strokeWidth={5} />
    <rect x={36} y={94} width={38} height={30} rx={6} fill="#9AA0A8" stroke={C.ink} strokeWidth={5} />
  </svg>
);

// Speech / thought bubble with a short symbol or child content
export const Bubble: React.FC<{children: React.ReactNode; thought?: boolean; w?: number; h?: number; tail?: 'left' | 'right'}> = ({
  children,
  thought,
  w = 120,
  h = 100,
  tail = 'left',
}) => (
  <div style={{position: 'relative', width: w, height: h}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#fff',
        border: `5px solid ${C.ink}`,
        borderRadius: thought ? '50%' : 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 60,
        color: C.ink,
      }}
    >
      {children}
    </div>
    {thought ? (
      <>
        <div style={{position: 'absolute', width: 26, height: 26, borderRadius: 13, background: '#fff', border: `5px solid ${C.ink}`, bottom: -30, [tail]: w * 0.18}} />
        <div style={{position: 'absolute', width: 14, height: 14, borderRadius: 7, background: '#fff', border: `4px solid ${C.ink}`, bottom: -56, [tail]: w * 0.1}} />
      </>
    ) : (
      <svg width={40} height={36} style={{position: 'absolute', bottom: -30, [tail]: 24}} viewBox="0 0 40 36">
        <path d={tail === 'left' ? 'M2 0 L10 34 L34 0' : 'M6 0 L30 34 L38 0'} fill="#fff" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <rect x={0} y={-6} width={40} height={8} fill="#fff" />
      </svg>
    )}
  </div>
);

export const CalendarPage: React.FC<{top: string; day: string}> = ({top, day}) => (
  <div style={{width: 230, background: '#FFFDF8', border: `5px solid ${C.ink}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.15)'}}>
    <div style={{background: C.red, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 38, textAlign: 'center', padding: '6px 0', borderBottom: `5px solid ${C.ink}`}}>{top}</div>
    <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 56, color: C.ink, textAlign: 'center', padding: '18px 0 14px', minHeight: 170, boxSizing: 'border-box'}}>{day}</div>
  </div>
);
