import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, WIDTH, HEIGHT} from '../config';

const ink = {stroke: C.ink, strokeWidth: 5, strokeLinejoin: 'round' as const};

// Living room, night (blue, lamp glow, rain on window) or day (warm).
export const LivingRoom: React.FC<{t: number; night?: boolean; rain?: boolean; lamp?: number}> = ({t, night = true, rain = false, lamp = 1}) => {
  const wall = night ? '#E6E0F4' : '#F6EBDD';
  const wallLow = night ? '#D8D0EC' : '#EEDCC6';
  const floor = night ? '#C9A88C' : '#D7B48F';
  const sky = night ? '#5E6FB0' : '#BFE6F2';
  const flick = 0.92 + Math.sin(t / 5) * 0.03 + Math.sin(t / 2.3) * 0.02;
  const ang = ((t / 30) * 6) % 360; // clock second hand
  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFD98A" stopOpacity={0.55 * lamp * flick} />
            <stop offset="1" stopColor="#FFD98A" stopOpacity={0} />
          </radialGradient>
          <clipPath id="win">
            <rect x={600} y={300} width={300} height={360} />
          </clipPath>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill={wall} />
        <rect x={0} y={1040} width={WIDTH} height={320} fill={wallLow} />
        {/* window */}
        <rect x={586} y={286} width={328} height={388} rx={10} fill={night ? '#FFFFFF' : '#FFFFFF'} {...ink} />
        <rect x={600} y={300} width={300} height={360} fill={sky} />
        {night ? (
          <circle cx={820} cy={380} r={40} fill="#F3EBC8" opacity={0.9} />
        ) : (
          <circle cx={820 + Math.sin(t / 50) * 3} cy={390} r={46} fill={C.sun} />
        )}
        {night && rain && (
          <g clipPath="url(#win)" stroke="#9FB4E0" strokeWidth={3} strokeLinecap="round" opacity={0.75}>
            {Array.from({length: 26}).map((_, i) => {
              const x0 = 600 + ((i * 53) % 300);
              const y0 = 300 + (((t * 22 + i * 97) % 420) - 40);
              return <line key={i} x1={x0} y1={y0} x2={x0 - 8} y2={y0 + 34} />;
            })}
          </g>
        )}
        <line x1={750} y1={300} x2={750} y2={660} stroke={C.ink} strokeWidth={6} />
        <line x1={600} y1={480} x2={900} y2={480} stroke={C.ink} strokeWidth={6} />
        <path d="M570 270 Q610 470 580 690 L540 690 L540 270 Z" fill={night ? '#F29C9C' : '#F4A6A0'} {...ink} />
        <path d="M930 270 Q890 470 920 690 L960 690 L960 270 Z" fill={night ? '#F29C9C' : '#F4A6A0'} {...ink} />
        {/* wall clock */}
        <g transform="translate(250,380)">
          <circle r={74} fill="#FFFDF6" {...ink} />
          {Array.from({length: 12}).map((_, i) => (
            <line key={i} x1={0} y1={-60} x2={0} y2={-50} stroke={C.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />
          ))}
          <line x1={0} y1={0} x2={0} y2={-38} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform="rotate(300)" />
          <line x1={0} y1={0} x2={0} y2={-52} stroke={C.ink} strokeWidth={5} strokeLinecap="round" transform="rotate(60)" />
          <line x1={0} y1={6} x2={0} y2={-56} stroke={C.red} strokeWidth={3} strokeLinecap="round" transform={`rotate(${ang})`} />
          <circle r={7} fill={C.ink} />
        </g>
        {/* floor lamp */}
        <g transform="translate(110,700)">
          <circle cx={30} cy={40} r={260} fill="url(#lampGlow)" />
          <path d="M-40 0 L100 0 L70 -90 L-10 -90 Z" fill={night ? '#F2C66B' : '#E8C68A'} {...ink} />
          <rect x={24} y={0} width={12} height={640} fill="#6B5A4E" {...ink} />
          <ellipse cx={30} cy={644} rx={60} ry={14} fill="#6B5A4E" {...ink} />
        </g>
        <rect x={0} y={1360} width={WIDTH} height={HEIGHT - 1360} fill={floor} />
        <line x1={0} y1={1360} x2={WIDTH} y2={1360} stroke={C.ink} strokeWidth={5} />
        {Array.from({length: 6}).map((_, i) => (
          <line key={i} x1={0} y1={1420 + i * 90} x2={WIDTH} y2={1420 + i * 90} stroke={night ? '#B8977B' : '#C4A07B'} strokeWidth={3} />
        ))}
        {/* rug */}
        <ellipse cx={540} cy={1440} rx={430} ry={60} fill={night ? '#F2B8C6' : '#F6C6B6'} opacity={0.75} />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(120,90,130,0.18) 100%)'}} />
    </AbsoluteFill>
  );
};

// Sofa back + seat (characters sit in front of it); width centred at cx
export const Sofa: React.FC<{cx?: number; y?: number; w?: number; night?: boolean}> = ({cx = 540, y = 960, w = 860, night = true}) => {
  const col = night ? '#8FB6E8' : '#8FB6E8';
  const dark = night ? '#77A0D6' : '#77A0D6';
  const x = cx - w / 2;
  return (
    <svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', left: 0, top: 0}}>
      <rect x={x + 30} y={y} width={w - 60} height={240} rx={40} fill={col} {...ink} />
      <rect x={x + 60} y={y + 30} width={(w - 120) / 2 - 10} height={170} rx={24} fill={dark} {...ink} />
      <rect x={cx + 10} y={y + 30} width={(w - 120) / 2 - 10} height={170} rx={24} fill={dark} {...ink} />
      <rect x={x} y={y + 200} width={w} height={150} rx={30} fill={col} {...ink} />
      <rect x={x - 10} y={y + 120} width={90} height={260} rx={36} fill={dark} {...ink} />
      <rect x={x + w - 80} y={y + 120} width={90} height={260} rx={36} fill={dark} {...ink} />
      <rect x={x + 60} y={y + 350} width={24} height={40} fill="#3B2F2A" />
      <rect x={x + w - 84} y={y + 350} width={24} height={40} fill="#3B2F2A" />
    </svg>
  );
};

// Deep emotional background with drifting soft particles
export const Night: React.FC<{t: number; color?: string; glow?: string}> = ({t, color = '#EDE6FA', glow = 'rgba(255,190,200,0.45)'}) => (
  <AbsoluteFill style={{background: color}}>
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, ${glow} 0%, rgba(0,0,0,0) 48%)`}} />
    <svg width={WIDTH} height={HEIGHT}>
      {Array.from({length: 30}).map((_, i) => {
        const x = (i * 211) % WIDTH;
        const y = (((i * 337) % HEIGHT) - t * (0.6 + (i % 4) * 0.25) + HEIGHT * 4) % HEIGHT;
        return <circle key={i} cx={x + Math.sin(t / 40 + i) * 12} cy={y} r={2 + (i % 3)} fill={i % 2 ? "#F7A8B8" : "#B9C8F2"} opacity={0.35 + (i % 5) * 0.08} />;
      })}
    </svg>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(150,120,170,0.18) 100%)'}} />
  </AbsoluteFill>
);
