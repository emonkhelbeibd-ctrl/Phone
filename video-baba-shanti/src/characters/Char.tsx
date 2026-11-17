import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Person, Pose, Face} from './Person';
import {LOOKS} from './parts';
import {FPS} from '../config';
import {talkAt} from '../timeline';
import {usePop} from '../ui/UI';

export const SceneStart = React.createContext(0);

// Character with feet at (x, y). flip=true faces left. `speaker` = timeline id for lip movement.
export const Char: React.FC<{
  who: keyof typeof LOOKS;
  speaker?: string;
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  pose?: Pose;
  face?: Face;
  look?: number;
  delay?: number;
  dx?: number;
}> = ({who, speaker, x, y, s = 1.3, flip = false, pose, face, look, delay = 0, dx = 0}) => {
  const f = useCurrentFrame();
  const g0 = React.useContext(SceneStart);
  const t = (f + g0) / FPS;
  const p = usePop(delay, 13);
  const breathe = 1 + Math.sin((f + g0) / 14 + x / 300) * 0.01;
  const talk = speaker ? talkAt(speaker, t) : 0;
  const bob = talk > 0 ? Math.sin(t * 9) * 3 : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 210 * s + dx,
        top: y - 775 * s + bob,
        width: 420 * s,
        height: 800 * s,
        transformOrigin: '50% 97%',
        transform: `scaleX(${flip ? -1 : 1}) scale(${0.85 + 0.15 * p}) scaleY(${breathe})`,
        opacity: Math.min(1, p * 2),
      }}
    >
      <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}>
        <Person look={LOOKS[who]} pose={pose} face={face} talk={talk} lookDir={look} />
      </div>
    </div>
  );
};
