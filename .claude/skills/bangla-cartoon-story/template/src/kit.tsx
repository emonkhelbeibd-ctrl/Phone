// Shared scene helpers: camera, transitions, tint, word-synced timing.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {sec} from './config';
import {SceneStart} from './characters/Char';
import {wordAt, SEGS} from './timeline';

export const OV = 10; // transition overlap in frames
export const FY = 1420; // standing feet line
export const SY = 1600; // sitting anchor (sofa)
export const RY = 1625; // sitting anchor (rooftop bench)
export const ease = Easing.inOut(Easing.cubic);
export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

// Local frame helpers inside a scene:
//   at(seconds)      -> local frame of an absolute time
//   w(segIdx, word)  -> local frame when that word is spoken
//   s(segIdx)        -> local frame when that segment starts
export const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return {
    at: (t: number) => sec(t) - g0,
    w: (si: number, word: string) => sec(wordAt(si, word)) - g0,
    s: (si: number) => sec(SEGS[si].start) - g0,
  };
};

// Keyframed camera: keys = [localFrame, scale, originX%, originY%]; zoom+pan with easing, plus slow drift.
export const Cam: React.FC<{keys: [number, number, number, number][]; children: React.ReactNode; shake?: number}> = ({keys, children, shake = 0}) => {
  const f = useCurrentFrame();
  const fr = keys.map((k) => k[0]);
  const opt = {...clamp, easing: ease};
  const pick = (i: number) => (keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[i]), opt) : keys[0][i]);
  const drift = 1 + interpolate(f, [0, 300], [0, 0.03], {extrapolateRight: 'clamp'});
  const sx = shake ? Math.sin(f * 1.9) * shake : 0;
  return <AbsoluteFill style={{transformOrigin: `${pick(2)}% ${pick(3)}%`, transform: `translateX(${sx}px) scale(${pick(1) * drift})`}}>{children}</AbsoluteFill>;
};

export const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', ...style}}>{children}</div>
);

// Pulsing colour wash (anger = '#E04A30')
export const Tint: React.FC<{color: string; from: number; to: number; max?: number}> = ({color, from, to, max = 0.25}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{background: color, opacity: a * max * (0.75 + Math.sin(f / 4) * 0.25), mixBlendMode: 'multiply'}} />;
};

// Pulsing highlight ring (e.g. around a phone or clock)
export const Ring: React.FC<{x: number; y: number; r: number; delay: number; color?: string}> = ({x, y, r, delay, color = '#C8401F'}) => {
  const f = useCurrentFrame();
  if (f < delay) return null;
  const k = ((f - delay) % 24) / 24;
  return <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `8px solid ${color}`, transform: `scale(${0.7 + k * 0.6})`, opacity: 1 - k}} />;
};

// grapheme-safe Bengali typewriter
export const typed = (s: string, k: number) => {
  const Sg = (Intl as any).Segmenter;
  const g: string[] = Sg ? Array.from(new Sg('bn', {granularity: 'grapheme'}).segment(s), (x: any) => x.segment) : Array.from(s);
  return g.slice(0, Math.round(g.length * k)).join('');
};

export type Tr = 'fade' | 'slide' | 'slideR' | 'zoom' | 'whip' | 'iris';
export const Enter: React.FC<{tr: Tr; children: React.ReactNode}> = ({tr, children}) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, OV], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  if (k >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  let style: React.CSSProperties = {};
  if (tr === 'fade') style = {opacity: k};
  if (tr === 'slide') style = {transform: `translateX(${(1 - k) * 100}%)`};
  if (tr === 'slideR') style = {transform: `translateX(${(k - 1) * 100}%)`};
  if (tr === 'zoom') style = {opacity: k, transform: `scale(${1.25 - 0.25 * k})`};
  if (tr === 'whip') style = {transform: `translateX(${(1 - k) * 100}%)`, filter: `blur(${(1 - k) * 18}px)`};
  if (tr === 'iris') style = {clipPath: `circle(${k * 120}% at 50% 45%)`};
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};
