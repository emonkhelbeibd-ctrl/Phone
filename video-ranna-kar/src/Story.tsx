import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {sec, FPS} from './config';
import {Kitchen, Sunburst, GoldRays} from './backgrounds/Backgrounds';
import {Char, SceneStart} from './characters/Char';
import {TitleChip, PopIn, Stamp, ListRow, shakeX} from './ui/UI';
import {Captions} from './ui/Caption';
import {Bubble, FriedEgg, Pan, Spatula, RedX, Sweat, Heart, Sparkle, Bulb, CalendarPage, Check} from './props/Props';
import {TOTAL_SEC} from './timeline';

const SX = 320; // Simi x
const EX = 770; // Emon x
const FY = 1420; // feet line

// Local frame of a global time inside the current scene
const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return (t: number) => sec(t) - g0;
};

// Slow push-in camera for every scene
const Cam: React.FC<{children: React.ReactNode; from?: number; to?: number; ox?: string; oy?: string}> = ({children, from = 1, to = 1.04, ox = '50%', oy = '55%'}) => {
  const f = useCurrentFrame();
  const g0 = React.useContext(SceneStart);
  return (
    <AbsoluteFill style={{transformOrigin: `${ox} ${oy}`, transform: `scale(${interpolate(f, [0, 150], [from, to], {extrapolateRight: 'clamp'})})`}}>
      {children}
      <span style={{display: 'none'}}>{g0}</span>
    </AbsoluteFill>
  );
};

// 1. Hook: Simi orders, Emon listens
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Sunburst t={f} />
      <Cam to={1.05}>
        <Char who="simi" x={SX} y={FY} pose={f < at(0.6) ? 'stand' : 'point'} face="smug" />
        <Char who="emon" x={EX} y={FY} flip pose="stand" face="neutral" look={0} delay={4} />
        <PopIn x={540} y={620} delay={at(0.95)} rot={-14}>
          <Spatula />
        </PopIn>
      </Cam>
      <TitleChip text="রান্নার হুকুম" />
    </AbsoluteFill>
  );
};

// 2. "কী! আমি?" — zoom on Emon
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const z = interpolate(f, [0, 8], [1.15, 1.55], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <AbsoluteFill style={{transformOrigin: '50% 34%', transform: `scale(${z}) translateX(${shakeX(f, 0, 10, 6)}px)`}}>
        <Char who="emon" x={540} y={FY} flip pose="stand" face="surprised" />
      </AbsoluteFill>
      <PopIn x={250} y={480} delay={at(2.08)}>
        <Bubble w={130} h={120}>!</Bubble>
      </PopIn>
      <PopIn x={830} y={470} delay={at(2.71)}>
        <Bubble w={130} h={120} tail="right">?</Bubble>
      </PopIn>
      <TitleChip text="অবাক ইমন" />
    </AbsoluteFill>
  );
};

// 3. "হ্যাঁ, তুমি। সব কাজ কি আমাকেই করতে হবে?"
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose={f < at(4.7) ? 'point' : 'hips'} face="annoyed" />
        <Char who="emon" x={EX} y={FY} flip pose="stand" face="sad" />
        <PopIn x={EX - 120} y={560} delay={at(4.2)}>
          <Sweat />
        </PopIn>
      </Cam>
      <Stamp text="সব কাজ আমার?" x={540} y={300} delay={at(4.95)} />
      <TitleChip text="সিমির অভিযোগ" />
    </AbsoluteFill>
  );
};

// 4a. "আচ্ছা ঠিক আছে, করব।" — Emon agrees, takes the spatula
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose="crossed" face="smile" />
        <Char who="emon" x={EX} y={FY} flip pose={f < at(8.2) ? 'stand' : 'point'} face="smile" />
        <PopIn x={EX - 200} y={700} delay={at(8.25)} rot={-20} scale={0.9}>
          <Spatula />
        </PopIn>
      </Cam>
      <Stamp text="করব!" x={EX} y={380} delay={at(8.3)} rot={6} />
      <TitleChip text="রাজি হলো ইমন" />
    </AbsoluteFill>
  );
};

// 4b. "কিন্তু কী রান্না করব?" — thinking
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="emon" x={620} y={FY} flip pose="chin" face="think" />
        <PopIn x={300} y={520} delay={at(9.9)}>
          <Bubble thought w={260} h={200} tail="right">
            <span style={{fontSize: 110, color: '#C8401F'}}>?</span>
          </Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="কী রান্না?" />
    </AbsoluteFill>
  );
};

// 5. "সেটা তুমি নিজেই ঠিক করো।"
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose={f < at(11.9) ? 'crossed' : 'point'} face="smug" />
        <Char who="emon" x={EX} y={FY} flip pose="stand" face="neutral" />
      </Cam>
      <Stamp text="তুমিই ঠিক করো" x={540} y={300} delay={at(11.9)} rot={-5} />
      <TitleChip text="তোমার সিদ্ধান্ত" />
    </AbsoluteFill>
  );
};

// 6. "তাহলে… ডিম ভাজি করি?"
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="emon" x={640} y={FY} flip pose={f < at(14.1) ? 'chin' : 'open'} face={f < at(13.3) ? 'think' : 'happy'} />
        <PopIn x={820} y={330} delay={at(13.2)}>
          <Bulb />
        </PopIn>
        <PopIn x={300} y={560} delay={at(14.2)}>
          <Bubble thought w={300} h={230} tail="right">
            <FriedEgg size={190} />
          </Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="ডিম ভাজি?" />
    </AbsoluteFill>
  );
};

// 7a. "প্রতিদিন ডিম ভাজি!"
const S8: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const days = ['শনি', 'রবি', 'সোম'];
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        {days.map((d, i) => (
          <PopIn key={d} x={240 + i * 300} y={560} delay={at(15.4) + i * 4} rot={(i - 1) * 4}>
            <div style={{position: 'relative'}}>
              <CalendarPage top={d} day="" />
              <div style={{position: "absolute", left: 40, top: 92}}>
                <FriedEgg size={150} />
              </div>
            </div>
          </PopIn>
        ))}
        <PopIn x={540} y={560} delay={at(16.2)} scale={2}>
          <RedX size={110} />
        </PopIn>
        <Char who="simi" x={540} y={FY + 40} s={0.95} pose="hips" face="annoyed" />
      </Cam>
      <TitleChip text="আবার ডিম!" />
    </AbsoluteFill>
  );
};

// 7b. "একটু ভালো কিছু রান্না করো।"
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose="point" face="annoyed" />
        <Char who="emon" x={EX} y={FY} flip pose="scratch" face="sad" />
        <PopIn x={EX - 130} y={560} delay={at(18.0)}>
          <Sweat />
        </PopIn>
      </Cam>
      <Stamp text="ভালো কিছু!" x={540} y={300} delay={at(17.9)} rot={-6} />
      {[0, 1, 2].map((i) => (
        <PopIn key={i} x={[300, 790, 560][i]} y={[290, 280, 450][i]} delay={at(18.0) + i * 3}>
          <Sparkle size={44} />
        </PopIn>
      ))}
      <TitleChip text="ভালো কিছু চাই" />
    </AbsoluteFill>
  );
};

// 8. "তাহলে তুমি বলো কী রান্না করব?"
const S10: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose="crossed" face="smug" />
        <Char who="emon" x={EX} y={FY} flip pose="shrug" face="neutral" />
        <PopIn x={EX - 40} y={430} delay={at(20.4)}>
          <Bubble w={130} h={120} tail="right">?</Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="তুমিই বলো" />
    </AbsoluteFill>
  );
};

// 9. "আমি বললে তো তোমার রান্না করা হলো না!"
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam>
        <Char who="simi" x={SX} y={FY} pose={f < at(22.6) ? 'chin' : 'point'} face="wink" />
        <Char who="emon" x={EX} y={FY} flip pose="stand" face={f < at(23.4) ? 'neutral' : 'surprised'} />
        {[0, 1].map((i) => (
          <PopIn key={i} x={[150, 470][i]} y={[470, 420][i]} delay={at(22.0) + i * 4}>
            <Sparkle size={50} color="#E7B23F" />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="সিমির যুক্তি" />
    </AbsoluteFill>
  );
};

// 10. "তার মানে রান্নাও আমাকে… আবার মেনুও আমাকে…"
const S12: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam to={1.02}>
        <ListRow n="১" text="রান্না" y={260} delay={at(24.9)} />
        <ListRow n="২" text="মেনু ঠিক করা" y={410} delay={at(27.0)} />
        <PopIn x={850} y={320} delay={at(25.6)}>
          <Check size={76} />
        </PopIn>
        <PopIn x={850} y={470} delay={at(27.6)}>
          <Check size={76} />
        </PopIn>
        <Char who="emon" x={540} y={FY + 20} flip pose="headHold" face="sad" />
        <PopIn x={400} y={760} delay={at(26.0)}>
          <Sweat />
        </PopIn>
      </Cam>
      <Stamp text="দুটোই আমার!" x={540} y={620} delay={at(27.9)} rot={-6} />
      <TitleChip text="দুই দায়িত্ব" />
    </AbsoluteFill>
  );
};

// 11. Ending mood: "সংসার করতে হলে এতটুকু তো করতেই হবে!"
const S13: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const bgIn = interpolate(f, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <AbsoluteFill style={{opacity: bgIn}}>
        <GoldRays t={f} />
      </AbsoluteFill>
      <Cam>
        <Char who="simi" x={540} y={FY} pose={f < at(30.2) ? 'hips' : 'point'} face="happy" />
        <PopIn x={540} y={360} delay={at(29.0)}>
          <Heart size={110} />
        </PopIn>
        {[0, 1, 2, 3].map((i) => (
          <PopIn key={i} x={[250, 830, 300, 800][i]} y={[420, 400, 760, 720][i]} delay={at(29.2) + i * 4}>
            <Sparkle size={46} />
          </PopIn>
        ))}
      </Cam>
      <Stamp text="সংসারের নিয়ম!" x={540} y={1230} delay={at(30.6)} rot={-5} size={58} />
      <TitleChip text="সংসারের নিয়ম" />
    </AbsoluteFill>
  );
};

// 12. "বুঝলাম, আজকে আমার ছুটির দিনেও ছুটি নেই!"
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const strike = interpolate(f, [at(34.5), at(34.9)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Kitchen t={f} />
      <Cam to={1.06}>
        <Char who="emon" x={620} y={FY} flip pose={f < at(33.0) ? 'stand' : 'headHold'} face={f < at(33.0) ? 'neutral' : 'sad'} />
        <PopIn x={230} y={560} delay={at(33.6)} rot={-5}>
          <div style={{position: 'relative'}}>
            <CalendarPage top="শুক্রবার" day="ছুটি" />
            <svg width={230} height={60} style={{position: 'absolute', left: 0, top: 96}} viewBox="0 0 230 60">
              <line x1={30} y1={30} x2={30 + 170 * strike} y2={30} stroke="#C8401F" strokeWidth={10} strokeLinecap="round" />
            </svg>
          </div>
        </PopIn>
        <PopIn x={790} y={500} delay={at(33.4)}>
          <Sweat size={46} />
        </PopIn>
      </Cam>
      <Stamp text="ছুটি নেই!" x={540} y={300} delay={at(34.6)} rot={-7} size={72} />
      <TitleChip text="ছুটি নেই!" />
    </AbsoluteFill>
  );
};

// Pan prop used for pre-roll? (kept available for edits)
void Pan;

const SCENES: [number, number, React.FC][] = [
  [0, 2.0, S1],
  [2.0, 3.45, S2],
  [3.45, 6.9, S3],
  [6.9, 9.25, S4],
  [9.25, 11.0, S5],
  [11.0, 12.95, S6],
  [12.95, 15.2, S7],
  [15.2, 17.2, S8],
  [17.2, 19.3, S9],
  [19.3, 21.6, S10],
  [21.6, 24.3, S11],
  [24.3, 28.6, S12],
  [28.6, 32.05, S13],
  [32.05, TOTAL_SEC, S14],
];

export const Story: React.FC = () => (
  <AbsoluteFill style={{background: '#E8DCC6'}}>
    {SCENES.map(([a, b, Comp], i) => (
      <Sequence key={i} from={sec(a)} durationInFrames={sec(b) - sec(a)}>
        <SceneStart.Provider value={sec(a)}>
          <Comp />
        </SceneStart.Provider>
      </Sequence>
    ))}
    <Captions />
    <Audio src={staticFile('voice.mp3')} />
  </AbsoluteFill>
);

export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);
