import React from 'react';
import {C, FONT} from '../config';

const ink = {stroke: C.ink, strokeWidth: 5, strokeLinejoin: 'round' as const};

// Small grey rain cloud that hovers over a character's head
export const RainCloud: React.FC<{t: number; size?: number; rain?: number}> = ({t, size = 260, rain = 1}) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 260 234" style={{overflow: 'visible'}}>
    <g transform={`translate(0,${Math.sin(t / 12) * 4})`}>
      <path d="M50 120 Q10 120 14 86 Q18 54 54 58 Q60 14 110 18 Q150 4 172 44 Q222 34 236 76 Q258 116 214 124 Z" fill="#A9B1C6" {...ink} />
      <path d="M60 104 Q100 92 140 104" fill="none" stroke="#C6CCDB" strokeWidth={8} strokeLinecap="round" />
    </g>
    {rain > 0 &&
      Array.from({length: 7}).map((_, i) => {
        const x = 50 + i * 26;
        const y = 132 + ((t * 5 + i * 17) % 90);
        return <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 22} stroke="#7FA6E8" strokeWidth={6} strokeLinecap="round" opacity={rain * (1 - (y - 132) / 100)} />;
      })}
  </svg>
);

// Speech bubble with scribbled (unsaid) words
export const ScribbleBubble: React.FC<{w?: number; tone?: string}> = ({w = 170, tone = '#FFFFFF'}) => (
  <svg width={w} height={w * 0.72} viewBox="0 0 170 122" style={{overflow: 'visible'}}>
    <path d="M14 10 Q10 4 18 4 L152 4 Q160 4 160 12 L160 78 Q160 86 152 86 L60 86 L34 112 L38 86 L18 86 Q10 86 10 78 Z" fill={tone} {...ink} />
    <path d="M28 30 Q44 18 58 32 T90 30 T128 32 T144 26" fill="none" stroke="#9A8FB0" strokeWidth={5} strokeLinecap="round" />
    <path d="M28 58 Q48 46 66 60 T108 56 T136 60" fill="none" stroke="#9A8FB0" strokeWidth={5} strokeLinecap="round" />
  </svg>
);

// Smiling mask (the face she shows everyone)
export const SmileMask: React.FC<{size?: number}> = ({size = 200}) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 200 220" style={{overflow: 'visible'}}>
    <path d="M20 40 Q100 -10 180 40 Q190 150 100 210 Q10 150 20 40 Z" fill="#FFF6EE" {...ink} />
    <path d="M52 88 Q70 70 88 88 M112 88 Q130 70 148 88" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
    <path d="M60 130 Q100 172 140 130" fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" />
    <line x1={20} y1={70} x2={-20} y2={60} stroke="#C89F6C" strokeWidth={5} />
    <line x1={180} y1={70} x2={220} y2={60} stroke="#C89F6C" strokeWidth={5} />
  </svg>
);

// Two temple pillars standing apart, holding up one roof
export const Temple: React.FC<{size?: number; gap?: number; roof?: number}> = ({size = 700, gap = 1, roof = 1}) => {
  const lx = 190 - gap * 40;
  const rx = 470 + gap * 40;
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 700 665" style={{overflow: 'visible'}}>
      <g opacity={roof} transform={`translate(0,${(1 - roof) * -60})`}>
        <path d="M60 170 L350 40 L640 170 Z" fill="#F3E2C2" {...ink} />
        <rect x={70} y={170} width={560} height={40} fill="#E8D2A8" {...ink} />
      </g>
      {[lx, rx].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y={210} width={52} height={22} fill="#E8D2A8" {...ink} />
          <rect x={x} y={232} width={40} height={340} fill="#F6EAD2" {...ink} />
          {[0, 1, 2].map((k) => (
            <line key={k} x1={x + 10 + k * 10} y1={240} x2={x + 10 + k * 10} y2={564} stroke="#DCC8A4" strokeWidth={4} />
          ))}
          <rect x={x - 10} y={572} width={60} height={26} fill="#E8D2A8" {...ink} />
        </g>
      ))}
      <rect x={30} y={598} width={640} height={30} rx={8} fill="#D9C29A" {...ink} />
    </svg>
  );
};

// Calendar strip: work every day, one cloudy day highlighted
export const WeekStrip: React.FC<{reveal: number; cloud: number}> = ({reveal, cloud}) => {
  const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ'];
  return (
    <div style={{display: 'flex', gap: 14}}>
      {days.map((d, i) => {
        const on = reveal * days.length > i;
        const isCloud = i === 3;
        return (
          <div
            key={d}
            style={{
              width: 150,
              height: 170,
              background: '#FFFDF8',
              border: `5px solid ${C.ink}`,
              borderRadius: 18,
              overflow: 'hidden',
              opacity: on ? 1 : 0,
              transform: `translateY(${on ? 0 : 30}px) scale(${isCloud ? 1 + cloud * 0.18 : 1})`,
              boxShadow: isCloud && cloud > 0 ? `0 0 ${30 * cloud}px rgba(120,150,230,0.9)` : '0 6px 12px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{background: isCloud && cloud > 0.5 ? '#7F8FC8' : C.red, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 30, textAlign: 'center', padding: '4px 0', borderBottom: `5px solid ${C.ink}`}}>{d}</div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 110, fontSize: 60}}>
              {isCloud && cloud > 0.5 ? (
                <svg width={100} height={70} viewBox="0 0 260 160">
                  <path d="M50 120 Q10 120 14 86 Q18 54 54 58 Q60 14 110 18 Q150 4 172 44 Q222 34 236 76 Q258 116 214 124 Z" fill="#A9B1C6" stroke={C.ink} strokeWidth={8} />
                </svg>
              ) : (
                <svg width={80} height={66} viewBox="0 0 170 136">
                  <rect x={58} y={8} width={54} height={30} rx={8} fill="none" stroke={C.ink} strokeWidth={10} />
                  <rect x={6} y={30} width={158} height={100} rx={14} fill="#8C5A3A" stroke={C.ink} strokeWidth={8} />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Tear: React.FC<{size?: number}> = ({size = 30}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
    <path d="M20 2 Q36 30 34 40 Q30 54 20 54 Q8 54 6 40 Q4 30 20 2 Z" fill="#8FD0F0" stroke={C.ink} strokeWidth={3} />
  </svg>
);
