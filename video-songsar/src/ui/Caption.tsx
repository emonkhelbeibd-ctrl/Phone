import React from 'react';
import {useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {C, FONT, WIDTH, FPS} from '../config';
import {CAPTIONS, captionStart, captionWho, captionWords, NAMES, TOTAL_SEC} from '../timeline';

export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / FPS;
  let ci = -1;
  for (let i = 0; i < CAPTIONS.length; i++) if (t >= captionStart(i) - 0.05) ci = i;
  if (ci < 0) return null;
  const startF = Math.round((captionStart(ci) - 0.05) * FPS);
  const endT = ci + 1 < CAPTIONS.length ? captionStart(ci + 1) - 0.05 : TOTAL_SEC;
  const lf = f - startF;
  const inP = spring({frame: lf, fps, config: {damping: 16}});
  const out = interpolate(t, [endT - 0.12, endT], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const words = captionWords(ci);
  const who = captionWho(ci);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        width: WIDTH,
        top: 1500,
        display: 'flex',
        justifyContent: 'center',
        opacity: inP * (ci + 1 < CAPTIONS.length ? out : 1),
        transform: `translateY(calc(-50% + ${(1 - inP) * 24}px))`,
      }}
    >
      <div style={{position: 'relative', maxWidth: 880}}>
        {who !== 'narrator' && <div
          style={{
            position: 'absolute',
            top: -44,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 28,
            color: '#4E443C',
          }}
        >
          <span style={{background: 'rgba(246,238,226,0.92)', borderRadius: 14, padding: '2px 16px'}}>
            <span style={{color: C.red}}>●</span> {NAMES[who]}
          </span>
        </div>}
        <div
          style={{
            background: C.card,
            borderRadius: 26,
            padding: '20px 40px 24px',
            boxShadow: '0 10px 26px rgba(40,25,10,0.22)',
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.32,
            color: C.ink,
            textAlign: 'center',
          }}
        >
          {words.map((w, i) => {
            const on = w.key && t >= w.start;
            const pf = (t - w.start) * FPS;
            const pop = on ? interpolate(pf, [0, 4, 9], [1.0, 1.14, 1.0], {extrapolateRight: 'clamp'}) : 1;
            let txt = w.text;
            if (i === 0 && who !== 'narrator') txt = '“' + txt;
            if (i === words.length - 1 && who !== 'narrator') txt = txt + '”';
            return (
              <React.Fragment key={i}>
                <span style={{display: 'inline-block', color: on ? C.red : C.ink, transform: `scale(${pop})`}}>{txt}</span>
                {i < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
