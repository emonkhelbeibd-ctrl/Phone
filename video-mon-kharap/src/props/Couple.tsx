import React from 'react';
import {C, FONT} from '../config';

const ink = {stroke: C.ink, strokeWidth: 5, strokeLinejoin: 'round' as const};

export const BigPhone: React.FC<{size?: number; glow?: number}> = ({size = 200, glow = 0.5}) => (
  <svg width={size} height={size * 1.8} viewBox="0 0 120 216" style={{overflow: 'visible'}}>
    <rect x={4} y={4} width={112} height={208} rx={18} fill="#22252C" {...ink} />
    <rect x={14} y={22} width={92} height={170} rx={8} fill={`rgba(140,205,255,${0.75 + glow * 0.25})`} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={24} y={36 + i * 38} width={72} height={26} rx={6} fill="#fff" opacity={0.75} />
    ))}
  </svg>
);

export const Briefcase: React.FC<{size?: number}> = ({size = 170}) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 170 136" style={{overflow: 'visible'}}>
    <rect x={58} y={8} width={54} height={30} rx={8} fill="none" stroke={C.ink} strokeWidth={8} />
    <rect x={6} y={30} width={158} height={100} rx={14} fill="#8C5A3A" {...ink} />
    <rect x={6} y={66} width={158} height={12} fill="#6E4428" />
    <rect x={74} y={60} width={22} height={24} rx={4} fill="#E7B23F" {...ink} />
  </svg>
);

export const House: React.FC<{size?: number}> = ({size = 200}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
    <path d="M20 96 L100 24 L180 96 Z" fill="#C8401F" {...ink} />
    <rect x={40} y={94} width={120} height={96} fill="#F4E7CF" {...ink} />
    <rect x={86} y={128} width={30} height={62} fill="#8C5A3A" {...ink} />
    <rect x={52} y={112} width={26} height={26} fill="#BFE0EA" {...ink} />
    <rect x={124} y={112} width={26} height={26} fill="#BFE0EA" {...ink} />
  </svg>
);

export const Jar: React.FC<{size?: number; fill?: number}> = ({size = 150, fill = 0.6}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 150 180" style={{overflow: 'visible'}}>
    <rect x={30} y={6} width={90} height={22} rx={6} fill="#8C5A3A" {...ink} />
    <path d="M24 30 Q10 60 14 150 Q16 176 75 176 Q134 176 136 150 Q140 60 126 30 Z" fill="#D9EEF8" {...ink} />
    <path d={`M18 ${170 - fill * 120} L132 ${170 - fill * 120} L134 150 Q132 172 75 172 Q18 172 16 150 Z`} fill="#E7B23F" opacity={0.9} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={50 + i * 25} cy={160 - fill * 60} r={10} fill="#F2C94C" stroke="#B9852A" strokeWidth={3} />
    ))}
  </svg>
);

export const Clock: React.FC<{size?: number; t?: number}> = ({size = 160, t = 0}) => (
  <svg width={size} height={size} viewBox="-80 -80 160 160">
    <circle r={72} fill="#FFFDF6" {...ink} />
    {Array.from({length: 12}).map((_, i) => (
      <line key={i} x1={0} y1={-60} x2={0} y2={-50} stroke={C.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />
    ))}
    <line x1={0} y1={0} x2={0} y2={-36} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${t * 0.5})`} />
    <line x1={0} y1={0} x2={0} y2={-52} stroke={C.red} strokeWidth={5} strokeLinecap="round" transform={`rotate(${t * 6})`} />
    <circle r={7} fill={C.ink} />
  </svg>
);

export const HeartBroken: React.FC<{size?: number; split?: number}> = ({size = 220, split = 0}) => (
  <svg width={size} height={size} viewBox="0 0 220 200" style={{overflow: 'visible'}}>
    <g transform={`translate(${-split * 26},0) rotate(${-split * 8} 110 190)`}>
      <path d="M110 190 Q12 126 12 64 Q12 14 60 14 Q92 14 110 48 L96 84 L118 112 L100 150 Z" fill={C.red} {...ink} />
    </g>
    <g transform={`translate(${split * 26},0) rotate(${split * 8} 110 190)`}>
      <path d="M110 190 Q208 126 208 64 Q208 14 160 14 Q128 14 110 48 L96 84 L118 112 L100 150 Z" fill="#B3341A" {...ink} />
    </g>
  </svg>
);

export const Balance: React.FC<{size?: number; tilt?: number; left?: string; right?: string}> = ({size = 760, tilt = 0, left = '', right = ''}) => {
  const a = tilt * 14; // degrees, + = right side down
  const rad = (a * Math.PI) / 180;
  const L = {x: 380 - 280 * Math.cos(rad), y: 210 - 280 * Math.sin(rad)};
  const R = {x: 380 + 280 * Math.cos(rad), y: 210 + 280 * Math.sin(rad)};
  const pan = (p: {x: number; y: number}, label: string, color: string) => (
    <g>
      <line x1={p.x} y1={p.y} x2={p.x - 90} y2={p.y + 170} stroke="#B9852A" strokeWidth={4} />
      <line x1={p.x} y1={p.y} x2={p.x + 90} y2={p.y + 170} stroke="#B9852A" strokeWidth={4} />
      <path d={`M${p.x - 120} ${p.y + 170} Q${p.x} ${p.y + 240} ${p.x + 120} ${p.y + 170} Z`} fill="#E7B23F" {...ink} />
      <foreignObject x={p.x - 130} y={p.y + 196} width={260} height={110}>
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 44, color, textAlign: 'center', lineHeight: 1.15}}>{label}</div>
      </foreignObject>
    </g>
  );
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 760 680" style={{overflow: 'visible'}}>
      <rect x={366} y={210} width={28} height={420} fill="#B9852A" {...ink} />
      <rect x={250} y={620} width={260} height={40} rx={12} fill="#8C6A2A" {...ink} />
      <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#B9852A" strokeWidth={18} strokeLinecap="round" />
      <circle cx={380} cy={210} r={22} fill="#E7B23F" {...ink} />
      {pan(L, left, '#2A2420')}
      {pan(R, right, '#2A2420')}
    </svg>
  );
};

export const HoldingHands: React.FC<{size?: number; join?: number}> = ({size = 600, join = 1}) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 600 300" style={{overflow: 'visible'}}>
    <g transform={`translate(${(1 - join) * -120},0)`}>
      <path d="M0 150 L230 150" stroke={C.ink} strokeWidth={70} strokeLinecap="round" />
      <path d="M0 150 L230 150" stroke="#1F3358" strokeWidth={60} strokeLinecap="round" />
      <circle cx={262} cy={150} r={44} fill="#F6D6BE" {...ink} />
    </g>
    <g transform={`translate(${(1 - join) * 120},0)`}>
      <path d="M600 160 L370 160" stroke={C.ink} strokeWidth={66} strokeLinecap="round" />
      <path d="M600 160 L370 160" stroke="#1B1A1F" strokeWidth={56} strokeLinecap="round" />
      <circle cx={334} cy={156} r={42} fill="#F8DAC4" {...ink} />
      <circle cx={334} cy={156} r={10} fill="#D9B45A" />
    </g>
  </svg>
);

export const OpenBook: React.FC<{w?: number; open?: number; children?: React.ReactNode}> = ({w = 860, open = 1, children}) => (
  <div style={{position: 'relative', width: w, height: w * 0.62}}>
    <svg width={w} height={w * 0.62} viewBox="0 0 860 534" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <path d="M430 60 Q250 10 30 40 L30 500 Q250 470 430 520 Q610 470 830 500 L830 40 Q610 10 430 60 Z" fill="#7A2E2A" {...ink} />
      <g transform={`translate(430,0) scale(${open},1) translate(-430,0)`}>
        <path d="M430 70 Q250 24 50 50 L50 486 Q250 458 430 504 Z" fill="#FFF8E8" {...ink} />
      </g>
      <path d="M430 70 Q610 24 810 50 L810 486 Q610 458 430 504 Z" fill="#FFF8E8" {...ink} />
      <line x1={430} y1={70} x2={430} y2={504} stroke={C.ink} strokeWidth={5} />
    </svg>
    <div style={{position: 'absolute', inset: 0}}>{children}</div>
  </div>
);

export const SocialBtn: React.FC<{kind: 'like' | 'comment' | 'follow'; active: number}> = ({kind, active}) => {
  const bg = active > 0.5 ? (kind === 'like' ? '#2E6FE0' : kind === 'comment' ? '#2E9D6A' : C.red) : '#F4EFE8';
  const fg = active > 0.5 ? '#fff' : C.ink;
  const label = kind === 'like' ? 'লাইক' : kind === 'comment' ? 'কমেন্ট' : 'ফলো';
  const icon =
    kind === 'like' ? (
      <path d="M10 46 L22 46 L22 20 L10 20 Z M26 46 L48 46 Q54 46 55 40 L58 26 Q59 20 52 20 L40 20 L42 10 Q42 2 36 2 L26 20 Z" fill={fg} />
    ) : kind === 'comment' ? (
      <path d="M8 10 Q8 4 14 4 L50 4 Q56 4 56 10 L56 34 Q56 40 50 40 L26 40 L14 52 L16 40 L14 40 Q8 40 8 34 Z" fill={fg} />
    ) : (
      <path d="M28 6 L36 6 L36 26 L56 26 L56 34 L36 34 L36 54 L28 54 L28 34 L8 34 L8 26 L28 26 Z" fill={fg} />
    );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        background: bg,
        border: `5px solid ${C.ink}`,
        borderRadius: 60,
        padding: '18px 44px 18px 30px',
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 58,
        color: fg,
        boxShadow: '0 10px 22px rgba(0,0,0,0.25)',
        transform: `scale(${1 + Math.max(0, Math.sin(Math.min(1, active) * Math.PI)) * 0.15})`,
      }}
    >
      <svg width={64} height={60} viewBox="0 0 64 60">
        {icon}
      </svg>
      {label}
    </div>
  );
};

export const Chip: React.FC<{text: string; color?: string; bg?: string}> = ({text, color = C.red, bg = '#F6EEE2'}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 46,
      color,
      background: bg,
      border: `4px solid ${color}`,
      borderRadius: 40,
      padding: '6px 30px 10px',
      whiteSpace: 'nowrap',
      boxShadow: '0 8px 18px rgba(0,0,0,0.2)',
    }}
  >
    {text}
  </div>
);
