import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, FONT, WIDTH} from '../config';

export const usePop = (delay = 0, damping = 12) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping, mass: 0.8}});
};

export const TitleChip: React.FC<{text: string}> = ({text}) => {
  const p = usePop(0, 14);
  return (
    <div style={{position: 'absolute', top: 100, width: WIDTH, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          transform: `scale(${0.6 + 0.4 * p})`,
          opacity: p,
          background: C.cream,
          border: `4px solid ${C.red}`,
          borderRadius: 60,
          padding: '8px 34px 10px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 42,
          color: C.ink,
          boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{width: 16, height: 16, borderRadius: 8, background: C.red, display: 'inline-block'}} />
        {text}
      </div>
    </div>
  );
};

// Pop-in wrapper positioned absolutely, centered on (x,y)
export const PopIn: React.FC<{x: number; y: number; delay?: number; rot?: number; children: React.ReactNode; scale?: number; damping?: number}> = ({
  x,
  y,
  delay = 0,
  rot = 0,
  children,
  scale = 1,
  damping = 11,
}) => {
  const p = usePop(delay, damping);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${p * scale})`,
        opacity: Math.min(1, p * 2),
      }}
    >
      {children}
    </div>
  );
};

export const Stamp: React.FC<{text: string; x: number; y: number; delay?: number; rot?: number; size?: number}> = ({text, x, y, delay = 0, rot = -7, size = 64}) => {
  const f = useCurrentFrame();
  const p = usePop(delay, 9);
  const shake = f - delay < 10 && f >= delay ? Math.sin((f - delay) * 2.4) * 4 * (1 - (f - delay) / 10) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%,-50%) rotate(${rot + shake}deg) scale(${0.3 + 0.7 * p})`,
        opacity: Math.min(1, p * 2),
        background: C.cream,
        border: `6px solid ${C.red}`,
        borderRadius: 18,
        padding: '6px 30px 10px',
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        color: C.red,
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
      }}
    >
      {text}
    </div>
  );
};

export const ListRow: React.FC<{n: string; text: string; delay: number; y: number; done?: boolean}> = ({n, text, delay, y, done}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: f - delay, fps, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 150,
        top: y,
        width: 780,
        height: 120,
        transform: `translateX(${(1 - p) * -700}px)`,
        opacity: p,
        background: C.card,
        border: `5px solid ${C.ink}`,
        borderRadius: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        paddingLeft: 26,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 56,
        color: C.ink,
        boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{width: 76, height: 76, borderRadius: 38, background: C.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, border: `4px solid ${C.ink}`}}>{n}</div>
      <div style={{flex: 1}}>{text}</div>
      {done !== undefined && <div style={{marginRight: 28, fontSize: 42, color: C.red}}>{done ? '' : ''}</div>}
    </div>
  );
};

// Shake helper for emphasis
export const shakeX = (f: number, start: number, len = 12, amp = 10) =>
  f >= start && f < start + len ? Math.sin((f - start) * 2.2) * amp * (1 - (f - start) / len) : 0;

export const fadeIn = (f: number, start: number, len = 8) => interpolate(f, [start, start + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
