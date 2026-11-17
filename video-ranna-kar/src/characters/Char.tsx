import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Person, Pose, Face} from './Person';
import {FPS} from '../config';
import {talkAt, Who} from '../timeline';
import {usePop} from '../ui/UI';

export const SceneStart = React.createContext(0);

// Places a character with feet at (x, y). flip=true makes them face left.
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
  hop?: number; // extra vertical bounce frame trigger
}> = ({who, x, y, s = 1.3, flip = false, pose, face, look, delay = 0}) => {
  const f = useCurrentFrame();
  const g0 = React.useContext(SceneStart);
  const t = (f + g0) / FPS;
  const p = usePop(delay, 13);
  const breathe = 1 + Math.sin((f + g0) / 14 + (who === 'simi' ? 1.3 : 0)) * 0.01;
  const talk = talkAt(who, t);
  const bob = talk > 0 ? Math.sin(t * 9) * 3 : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 210 * s,
        top: y - 775 * s + bob,
        width: 420 * s,
        height: 800 * s,
        transformOrigin: '50% 97%',
        transform: `scaleX(${flip ? -1 : 1}) scale(${0.85 + 0.15 * p}) scaleY(${breathe})`,
        opacity: Math.min(1, p * 2),
      }}
    >
      <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}>
        <Person who={who} pose={pose} face={face} talk={talk} look={look} />
      </div>
    </div>
  );
};
