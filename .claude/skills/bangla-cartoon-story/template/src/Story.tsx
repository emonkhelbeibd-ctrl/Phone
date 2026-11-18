// Template: one component per scene, listed in SCENES with [start, end, Component, transition].
// See ../examples/Story-*.tsx (in the skill folder) for full real stories.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {sec, FPS} from './config';
import {LivingRoom} from './backgrounds/Home';
import {Char, SceneStart} from './characters/Char';
import {TitleChip, PopIn, Stamp} from './ui/UI';
import {Captions} from './ui/Caption';
import {Heart} from './props/Props';
import {TOTAL_SEC} from './timeline';
import {Cam, Enter, Tr, OV, FY, useAt} from './kit';

const S1: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.3, 50, 40], [at(3), 1.0, 50, 50]]}>
        <LivingRoom t={f} night={false} />
        <Char who="wife" x={320} y={FY} pose="hips" face="annoyed" />
        <Char who="husband" x={760} y={FY} flip pose="stand" face="surprised" delay={6} />
        <PopIn x={540} y={560} delay={at(2)}>
          <Heart size={90} />
        </PopIn>
      </Cam>
      <Stamp text="উদাহরণ!" x={540} y={330} delay={at(1)} />
      <TitleChip text="দৃশ্যের নাম" />
    </AbsoluteFill>
  );
};

const SCENES: [number, number, React.FC, Tr][] = [[0, TOTAL_SEC, S1, 'fade']];

export const Story: React.FC = () => (
  <AbsoluteFill style={{background: '#FCEBDD'}}>
    {SCENES.map(([a, b, Comp, tr], i) => {
      const from = sec(a);
      const dur = sec(b) - sec(a) + (i < SCENES.length - 1 ? OV : 0);
      return (
        <Sequence key={i} from={from} durationInFrames={dur}>
          <SceneStart.Provider value={from}>
            <Enter tr={i === 0 ? 'fade' : tr}>
              <Comp />
            </Enter>
          </SceneStart.Provider>
        </Sequence>
      );
    })}
    <Captions />
    <Audio src={staticFile('voice.mp3')} />
    <Audio src={staticFile('bed.wav')} />
  </AbsoluteFill>
);

export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);
