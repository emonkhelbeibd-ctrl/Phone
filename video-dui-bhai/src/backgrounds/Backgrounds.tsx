import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, WIDTH, HEIGHT} from '../config';

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(60,35,15,0.22) 100%)',
    }}
  />
);

// Home kitchen: wall, window with sun, picture frame, tiled backsplash, counter + stove, floor.
export const Kitchen: React.FC<{t?: number}> = ({t = 0}) => (
  <AbsoluteFill>
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.wall} />
          <stop offset="1" stopColor={C.wallLow} />
        </linearGradient>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill="url(#wall)" />
      {/* subtle wall dots */}
      {Array.from({length: 60}).map((_, i) => (
        <circle key={i} cx={(i * 197) % WIDTH} cy={240 + ((i * 131) % 900)} r={3} fill="#D8C6A6" opacity={0.6} />
      ))}
      {/* window */}
      <g transform="translate(640,330)">
        <rect x={-14} y={-14} width={318} height={358} rx={10} fill="#C46A4A" stroke={C.ink} strokeWidth={6} />
        <rect x={0} y={0} width={290} height={330} fill="#BFE0EA" stroke={C.ink} strokeWidth={5} />
        <circle cx={196 + Math.sin(t / 40) * 3} cy={96} r={44} fill={C.sun} />
        <line x1={145} y1={0} x2={145} y2={330} stroke={C.ink} strokeWidth={6} />
        <line x1={0} y1={165} x2={290} y2={165} stroke={C.ink} strokeWidth={6} />
        {/* curtains */}
        <path d="M-30 -20 Q10 150 -10 360 L-50 360 L-50 -20 Z" fill="#D9574A" stroke={C.ink} strokeWidth={5} />
        <path d="M320 -20 Q280 150 300 360 L340 360 L340 -20 Z" fill="#D9574A" stroke={C.ink} strokeWidth={5} />
      </g>
      {/* picture frame */}
      <g transform="translate(110,380)">
        <rect width={210} height={150} rx={6} fill="#F4EBDB" stroke={C.ink} strokeWidth={6} />
        <path d="M18 132 L80 62 L120 104 L150 78 L192 132 Z" fill="#7FAF8A" />
        <circle cx={160} cy={46} r={16} fill={C.sun} />
      </g>
      {/* backsplash tiles */}
      <rect x={0} y={900} width={WIDTH} height={220} fill={C.tile} />
      {Array.from({length: 12}).map((_, i) => (
        <line key={'v' + i} x1={i * 96} y1={900} x2={i * 96} y2={1120} stroke="#B7CBC4" strokeWidth={3} />
      ))}
      <line x1={0} y1={1010} x2={WIDTH} y2={1010} stroke="#B7CBC4" strokeWidth={3} />
      {/* counter */}
      <rect x={-10} y={1110} width={WIDTH + 20} height={30} fill={C.counterTop} stroke={C.ink} strokeWidth={5} />
      <rect x={-10} y={1140} width={WIDTH + 20} height={220} fill={C.counter} stroke={C.ink} strokeWidth={5} />
      {[60, 330, 600, 870].map((x) => (
        <g key={x}>
          <rect x={x} y={1165} width={220} height={170} rx={8} fill="#9C6846" stroke={C.ink} strokeWidth={4} />
          <rect x={x + 90} y={1190} width={40} height={10} rx={5} fill={C.ink} />
        </g>
      ))}
      {/* stove on counter */}
      <g transform="translate(430,1060)">
        <rect x={0} y={20} width={220} height={34} rx={8} fill="#5B5F66" stroke={C.ink} strokeWidth={5} />
        <ellipse cx={60} cy={20} rx={40} ry={8} fill="#3B3F45" />
        <ellipse cx={160} cy={20} rx={40} ry={8} fill="#3B3F45" />
      </g>
      {/* floor */}
      <rect x={0} y={1360} width={WIDTH} height={HEIGHT - 1360} fill={C.floor} />
      <line x1={0} y1={1360} x2={WIDTH} y2={1360} stroke={C.ink} strokeWidth={5} />
      {Array.from({length: 6}).map((_, i) => (
        <line key={'f' + i} x1={0} y1={1420 + i * 90} x2={WIDTH} y2={1420 + i * 90} stroke={C.floorDark} strokeWidth={3} />
      ))}
    </svg>
    <Vignette />
  </AbsoluteFill>
);

export const Sunburst: React.FC<{t: number; c1?: string; c2?: string}> = ({t, c1 = C.pinkBurst1, c2 = C.pinkBurst2}) => {
  const rays = 24;
  const cx = WIDTH / 2;
  const cy = 900;
  const R = 2000;
  const rot = t * 0.15;
  return (
    <AbsoluteFill style={{background: c1}}>
      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`rotate(${rot} ${cx} ${cy})`}>
          {Array.from({length: rays}).map((_, i) => {
            const a0 = (i / rays) * Math.PI * 2;
            const a1 = ((i + 0.5) / rays) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M${cx} ${cy} L${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} L${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} Z`}
                fill={c2}
              />
            );
          })}
        </g>
      </svg>
      <Vignette />
    </AbsoluteFill>
  );
};

export const GoldRays: React.FC<{t: number}> = ({t}) => (
  <AbsoluteFill>
    <Sunburst t={t} c1={C.gold1} c2="#EFD48E" />
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(255,250,230,0.75) 0%, rgba(255,250,230,0) 45%)'}} />
  </AbsoluteFill>
);

// Default story background: warm paper, faded city silhouette, soft sun, ground line.
export const CityDay: React.FC<{t?: number}> = ({t = 0}) => (
  <AbsoluteFill>
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ECE1CC" />
          <stop offset="1" stopColor="#DCCDB1" />
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill="url(#paper)" />
      <circle cx={850 + Math.sin(t / 50) * 4} cy={430} r={78} fill={C.sun} opacity={0.85} filter="url(#blur)" />
      {[
        [20, 760, 170, 600],
        [210, 860, 150, 500],
        [380, 700, 200, 660],
        [610, 820, 160, 540],
        [790, 740, 260, 620],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#D9C8AA" />
          {Array.from({length: 8}).map((_, k) => (
            <rect key={k} x={x + 24 + (k % 2) * (w / 2 - 10)} y={y + 40 + Math.floor(k / 2) * 90} width={34} height={46} fill="#E6D8BE" />
          ))}
        </g>
      ))}
      <rect x={0} y={1360} width={WIDTH} height={HEIGHT - 1360} fill="#D3C09F" />
      <line x1={0} y1={1360} x2={WIDTH} y2={1360} stroke="#B9A47F" strokeWidth={5} />
    </svg>
    <Vignette />
  </AbsoluteFill>
);

// Simple home room (wall, window, frame, door, floor)
export const Room: React.FC<{t?: number}> = ({t = 0}) => (
  <AbsoluteFill>
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <rect width={WIDTH} height={HEIGHT} fill={C.wall} />
      <rect x={0} y={1000} width={WIDTH} height={360} fill={C.wallLow} />
      <g transform="translate(640,330)">
        <rect x={-14} y={-14} width={318} height={358} rx={10} fill="#7FA36E" stroke={C.ink} strokeWidth={6} />
        <rect x={0} y={0} width={290} height={330} fill="#BFE0EA" stroke={C.ink} strokeWidth={5} />
        <circle cx={196 + Math.sin(t / 40) * 3} cy={96} r={44} fill={C.sun} />
        <line x1={145} y1={0} x2={145} y2={330} stroke={C.ink} strokeWidth={6} />
        <line x1={0} y1={165} x2={290} y2={165} stroke={C.ink} strokeWidth={6} />
      </g>
      <g transform="translate(110,380)">
        <rect width={210} height={150} rx={6} fill="#F4EBDB" stroke={C.ink} strokeWidth={6} />
        <path d="M18 132 L80 62 L120 104 L150 78 L192 132 Z" fill="#7FAF8A" />
        <circle cx={160} cy={46} r={16} fill={C.sun} />
      </g>
      <rect x={0} y={1360} width={WIDTH} height={HEIGHT - 1360} fill={C.floor} />
      <line x1={0} y1={1360} x2={WIDTH} y2={1360} stroke={C.ink} strokeWidth={5} />
      {Array.from({length: 6}).map((_, i) => (
        <line key={'f' + i} x1={0} y1={1420 + i * 90} x2={WIDTH} y2={1420 + i * 90} stroke={C.floorDark} strokeWidth={3} />
      ))}
    </svg>
    <Vignette />
  </AbsoluteFill>
);

// Emotional mood: dark navy with soft radial glow
export const DarkGlow: React.FC<{color?: string}> = ({color = '#1E2445'}) => (
  <AbsoluteFill style={{background: color}}>
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 42%, rgba(255,236,190,0.22) 0%, rgba(0,0,0,0) 45%)'}} />
    <Vignette />
  </AbsoluteFill>
);
