import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, WIDTH, HEIGHT} from '../config';

const ink = {stroke: C.ink, strokeWidth: 5, strokeLinejoin: 'round' as const};

// Pastel twilight rooftop: gradient sky, twinkling stars, moon, city skyline,
// string lights, parapet wall and a floor mat.
export const Rooftop: React.FC<{t: number; warm?: number}> = ({t, warm = 0}) => {
  const bulbs = Array.from({length: 13});
  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8E8CD8" />
            <stop offset="0.45" stopColor="#C3B4EA" />
            <stop offset="0.75" stopColor="#F6C3D3" />
            <stop offset="1" stopColor="#FBE0C8" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF6D8" stopOpacity={0.9} />
            <stop offset="1" stopColor="#FFF6D8" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#sky)" />
        <AbsoluteFillRect color="#FFD9A0" opacity={warm * 0.18} />
        {Array.from({length: 40}).map((_, i) => {
          const x = (i * 263) % WIDTH;
          const y = 80 + ((i * 151) % 620);
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(t / (12 + (i % 7)) + i));
          return <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#FFFFFF" opacity={tw} />;
        })}
        <circle cx={800} cy={330} r={170} fill="url(#moonGlow)" />
        <circle cx={800} cy={330} r={74} fill="#FFF4D2" />
        <circle cx={780} cy={312} r={12} fill="#F1E3B8" />
        <circle cx={826} cy={350} r={8} fill="#F1E3B8" />
        {/* skyline */}
        {[
          [0, 900, 150, 400], [130, 820, 120, 480], [240, 960, 170, 340], [400, 860, 130, 440],
          [520, 930, 190, 370], [700, 800, 140, 500], [830, 900, 250, 400],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={i % 2 ? '#8E86C4' : '#9C93CF'} />
            {Array.from({length: 6}).map((_, k) => {
              const on = (Math.floor(t / 45) + i + k) % 3 !== 0;
              return <rect key={k} x={x + 20 + (k % 2) * (w / 2 - 6)} y={y + 30 + Math.floor(k / 2) * 70} width={26} height={34} fill={on ? '#FFE6A8' : '#B4AEDB'} />;
            })}
          </g>
        ))}
        {/* string lights */}
        <path d="M-20 230 Q540 420 1100 230" fill="none" stroke="#5A4E6E" strokeWidth={4} />
        {bulbs.map((_, i) => {
          const u = (i + 0.5) / bulbs.length;
          const x = -20 + u * 1120;
          const y = 230 + 4 * 190 * u * (1 - u);
          const glow = 0.6 + 0.4 * Math.abs(Math.sin(t / 10 + i * 0.9));
          return (
            <g key={i}>
              <circle cx={x} cy={y + 14} r={22} fill="#FFE29A" opacity={0.35 * glow} />
              <circle cx={x} cy={y + 14} r={9} fill={['#FFD36E', '#FF9FB2', '#9FD8FF'][i % 3]} opacity={glow} stroke={C.ink} strokeWidth={2} />
            </g>
          );
        })}
        {/* parapet wall */}
        <rect x={0} y={1180} width={WIDTH} height={180} fill="#E9C9B5" {...ink} />
        <rect x={0} y={1170} width={WIDTH} height={22} fill="#F3DCCB" {...ink} />
        {Array.from({length: 9}).map((_, i) => (
          <line key={i} x1={i * 130 + 40} y1={1192} x2={i * 130 + 40} y2={1360} stroke="#D7B39E" strokeWidth={4} />
        ))}
        {/* roof floor */}
        <rect x={0} y={1360} width={WIDTH} height={HEIGHT - 1360} fill="#D8C2B4" />
        <line x1={0} y1={1360} x2={WIDTH} y2={1360} stroke={C.ink} strokeWidth={5} />
        {/* plant pots */}
        <g transform="translate(70,1240)">
          <path d="M0 40 L80 40 L70 120 L10 120 Z" fill="#C97A5A" {...ink} />
          <path d="M40 40 Q10 -20 20 -60 M40 40 Q50 -40 80 -70 M40 40 Q70 0 100 -10" fill="none" stroke="#5E9C6E" strokeWidth={10} strokeLinecap="round" />
        </g>
        <g transform="translate(940,1250)">
          <path d="M0 40 L70 40 L62 110 L8 110 Z" fill="#C97A5A" {...ink} />
          <path d="M35 40 Q20 -10 0 -30 M35 40 Q40 -20 60 -40" fill="none" stroke="#5E9C6E" strokeWidth={10} strokeLinecap="round" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

const AbsoluteFillRect: React.FC<{color: string; opacity: number}> = ({color, opacity}) => <rect width={WIDTH} height={HEIGHT} fill={color} opacity={opacity} />;

// Simple low wooden bench (characters sit in front of it)
export const Bench: React.FC<{y?: number}> = ({y = 1190}) => (
  <svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', left: 0, top: 0}}>
    <rect x={150} y={y} width={780} height={46} rx={14} fill="#B88358" {...ink} />
    <rect x={170} y={y - 120} width={740} height={40} rx={12} fill="#C9946A" {...ink} />
    <rect x={190} y={y - 80} width={16} height={84} fill="#8C5A3A" />
    <rect x={874} y={y - 80} width={16} height={84} fill="#8C5A3A" />
    <rect x={200} y={y + 46} width={26} height={130} fill="#8C5A3A" {...ink} />
    <rect x={854} y={y + 46} width={26} height={130} fill="#8C5A3A" {...ink} />
  </svg>
);
