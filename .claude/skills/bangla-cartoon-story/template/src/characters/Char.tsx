import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Person, Pose, Face, Who as CastWho} from './Person';
import {CouplePerson, CoupleWho} from './CouplePerson';

export type Who = CastWho | CoupleWho;
import {FPS} from '../config';
import {talkAt} from '../timeline';
import {usePop} from '../ui/UI';

export const SceneStart = React.createContext(0);

// Character with feet at (x, y). flip=true faces left.
// walkFrom: x position the character walks in from (with step bob) between walk[0]..walk[1] (local frames).
export const Char: React.FC<{
  who: Who;
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  pose?: Pose;
  face?: Face;
  look?: number;
  delay?: number;
  sit?: boolean;
  walkFrom?: number;
  walk?: [number, number];
  tilt?: number;
  dim?: number;
}> = ({who, x, y, s = 1.3, flip = false, pose, face, look, delay = 0, sit = false, walkFrom, walk, tilt = 0, dim = 0}) => {
  const f = useCurrentFrame();
  const g0 = React.useContext(SceneStart);
  const gf = f + g0;
  const t = gf / FPS;
  const p = usePop(delay, 14);
  const off = (who.length * 13) % 50; // stagger blink/breath per character
  const breathe = 1 + Math.sin((gf + off) / 16) * 0.012;
  const sway = Math.sin((gf + off) / 40) * 0.8; // gentle idle sway (deg)
  const talk = talkAt(who, t);
  const bob = talk > 0 ? Math.sin(t * 9) * 3 : 0;
  // blink every ~3.3s (staggered per character)
  const blink = (gf + off * 2) % 100 < 4;

  let px = x;
  let stepY = 0;
  let stepRot = 0;
  if (walkFrom !== undefined && walk) {
    const k = interpolate(f, walk, [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
    px = walkFrom + (x - walkFrom) * k;
    if (k > 0 && k < 1) {
      stepY = -Math.abs(Math.sin(f / 3.2)) * 18;
      stepRot = Math.sin(f / 3.2) * 3;
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: px - 210 * s,
        top: y - 775 * s + bob + stepY,
        width: 420 * s,
        height: 800 * s,
        transformOrigin: '50% 97%',
        transform: `scaleX(${flip ? -1 : 1}) rotate(${sway + stepRot + tilt}deg) scale(${0.85 + 0.15 * p}) scaleY(${breathe})`,
        opacity: Math.min(1, p * 2),
        filter: dim ? `brightness(${1 - dim * 0.6}) saturate(${1 - dim * 0.5})` : undefined,
      }}
    >
      <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}>
        {who === 'husband' || who === 'wife' ? (
          <CouplePerson who={who} pose={pose} face={face} talk={talk} look={look} blink={blink} sit={sit} phoneGlow={Math.abs(Math.sin(gf / 9))} />
        ) : (
          <Person who={who as CastWho} pose={pose} face={face} talk={talk} look={look} blink={blink} sit={sit} phoneGlow={Math.abs(Math.sin(gf / 9))} />
        )}
      </div>
    </div>
  );
};
