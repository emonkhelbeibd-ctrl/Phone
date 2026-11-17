import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {sec, FPS} from './config';
import {CityDay, Room, DarkGlow, GoldRays} from './backgrounds/Backgrounds';
import {Char, SceneStart} from './characters/Char';
import {TitleChip, PopIn, Stamp} from './ui/UI';
import {Captions} from './ui/Caption';
import {Bubble, Sweat, Heart, Sparkle, Check} from './props/Props';
import {Book, GradCap, Laptop, Note, Coin, Office, Gift, Bundle, EmptyPot, Arrow, Desk} from './props/StoryProps';
import {TOTAL_SEC} from './timeline';

const FY = 1420;

const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return (t: number) => sec(t) - g0;
};

const Cam: React.FC<{children: React.ReactNode; to?: number; oy?: string}> = ({children, to = 1.04, oy = '55%'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transformOrigin: `50% ${oy}`, transform: `scale(${interpolate(f, [0, 150], [1, to], {extrapolateRight: 'clamp'})})`}}>
      {children}
    </AbsoluteFill>
  );
};

// 1. Uncle: "পোলারে চাকরিতে দিয়া দে।"
const S1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam>
        <Char who="uncle" speaker="uncle" x={250} y={FY} pose="point" face="smug" />
        <Char who="boy" x={570} y={FY} s={0.9} face="sad" look={-1} delay={3} />
        <Char who="father" x={840} y={FY} flip pose="stand" face="neutral" delay={5} />
      </Cam>
      <TitleChip text="চাচার পরামর্শ" />
    </AbsoluteFill>
  );
};

// 2. Father: "আমার পোলারে চাকরিতে দিমু নাকি পড়ামু, সেটা আমি ভালো বুঝি।"
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam>
        <Char who="uncle" x={220} y={FY} pose="stand" face={f < at(4.8) ? 'neutral' : 'surprised'} />
        <Char who="boy" x={560} y={FY} s={0.9} face={f < at(3.9) ? 'neutral' : 'smile'} />
        <Char who="father" speaker="father" x={840} y={FY} flip pose={f < at(4.7) ? 'point' : 'hips'} face={f < at(4.7) ? 'annoyed' : 'smug'} />
        <PopIn x={560} y={640} delay={at(3.9)}>
          <Book size={170} />
        </PopIn>
      </Cam>
      <Stamp text="পড়ামু!" x={560} y={330} delay={at(4.0)} rot={-6} size={70} />
      <TitleChip text="বাবার জবাব" />
    </AbsoluteFill>
  );
};

// 3. Narrator: "সংসারে অভাব ছিল, টানাপোড়েন ছিল।"
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const fade = interpolate(f, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <DarkGlow />
      <AbsoluteFill style={{opacity: fade}}>
        <Cam to={1.05}>
          <PopIn x={540} y={820} delay={2}>
            <EmptyPot size={420} />
          </PopIn>
          <PopIn x={300} y={1100} delay={at(7.2)}>
            <Coin size={80} />
          </PopIn>
          <PopIn x={780} y={1120} delay={at(7.4)}>
            <Coin size={64} />
          </PopIn>
        </Cam>
        <Stamp text="অভাব" x={540} y={420} delay={at(7.0)} rot={-6} size={80} />
        <Stamp text="টানাপোড়েন" x={540} y={1200} delay={at(8.4)} rot={5} size={60} />
      </AbsoluteFill>
      <TitleChip text="অভাবের সংসার" />
    </AbsoluteFill>
  );
};

// 4. "বাবা একাই সংসারের সব দায়িত্ব সামলাতেন।"
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const wobble = Math.sin(f / 6) * 2;
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam>
        <Char who="father" x={540} y={FY} pose="carry" face="sad" />
        <div style={{position: 'absolute', left: 0, top: 0, transform: `rotate(${wobble}deg)`, transformOrigin: '540px 420px'}}>
          <PopIn x={540} y={380} delay={at(10.4)}>
            <Bundle size={380} />
          </PopIn>
        </div>
        <PopIn x={700} y={560} delay={at(11.0)}>
          <Sweat size={46} />
        </PopIn>
        <PopIn x={385} y={600} delay={at(11.3)}>
          <Sweat size={38} />
        </PopIn>
      </Cam>
      <Stamp text="একাই সব দায়িত্ব" x={540} y={1240} delay={at(10.9)} rot={-5} size={58} />
      <TitleChip text="একা বাবা" />
    </AbsoluteFill>
  );
};

// 5. "কিন্তু ছেলেকে পড়াশোনা করানোর স্বপ্নটা ছাড়েননি।"
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Room t={f} />
      <Cam>
        <Char who="father" x={720} y={FY} flip pose="chin" face={f < at(13.9) ? 'think' : 'smile'} />
        <Char who="boy" x={330} y={FY} s={0.9} face="smile" delay={4} />
        <PopIn x={360} y={520} delay={at(13.9)}>
          <Bubble thought w={330} h={250} tail="right">
            <GradCap size={190} />
          </Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="বাবার স্বপ্ন" />
    </AbsoluteFill>
  );
};

// 6. "অনেক কষ্টে ছেলেকে পড়ালেন।"
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Room t={f} />
      <Cam>
        <Char who="father" x={720} y={FY} flip pose="give" face="smile" />
        <Char who="boy" x={330} y={FY} s={0.9} pose={f < at(16.3) ? 'stand' : 'give'} face="happy" />
        <PopIn x={470} y={1000} delay={at(15.9)}>
          <Book size={150} color="#2E7D5B" />
        </PopIn>
        <PopIn x={850} y={540} delay={at(16.0)}>
          <Sweat size={44} />
        </PopIn>
      </Cam>
      <Stamp text="অনেক কষ্টে" x={540} y={330} delay={at(16.0)} rot={-6} />
      <TitleChip text="কষ্টের পড়াশোনা" />
    </AbsoluteFill>
  );
};

// 7. "ছেলেও পড়াশোনার পাশাপাশি ফ্রিল্যান্সিং শিখল, আয় করল।"
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Room t={f} />
      <Cam>
        <Char who="son" x={540} y={FY} pose={f < at(20.3) ? 'give' : 'open'} face={f < at(20.3) ? 'think' : 'happy'} />
        <div style={{position: 'absolute', left: 280, top: 1080}}>
          <Desk w={520} />
        </div>
        <PopIn x={540} y={990} delay={4}>
          <Laptop size={330} glow={Math.abs(Math.sin(f / 10))} />
        </PopIn>
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[260, 820, 540][i]} y={[620, 640, 420][i]} delay={at(20.4) + i * 3}>
            <Coin size={90} />
          </PopIn>
        ))}
        <PopIn x={540} y={300} delay={at(17.7)}>
          <Book size={130} />
        </PopIn>
      </Cam>
      <Stamp text="ফ্রিল্যান্সিং" x={540} y={1230} delay={at(19.2)} rot={-5} size={58} />
      <TitleChip text="পড়ার পাশাপাশি আয়" />
    </AbsoluteFill>
  );
};

// 8. "সেই টাকা দিয়ে নিজের পড়াশোনা চালিয়ে গেল।"
const S8: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam>
        <PopIn x={250} y={520} delay={2}>
          <Note size={240} text="টাকা" />
        </PopIn>
        <PopIn x={540} y={520} delay={at(21.9)}>
          <Arrow w={180} />
        </PopIn>
        <PopIn x={830} y={520} delay={at(22.3)}>
          <Book size={200} color="#2E7D5B" />
        </PopIn>
        <Char who="son" x={540} y={FY} pose="hips" face="smile" delay={3} />
      </Cam>
      <TitleChip text="নিজের খরচে পড়া" />
    </AbsoluteFill>
  );
};

// 9. "একসময় পড়াশোনা শেষ করে একটি কোম্পানিতে চাকরি পেল।"
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam>
        <PopIn x={790} y={900} delay={at(25.3)}>
          <Office size={380} />
        </PopIn>
        <Char who="son" x={350} y={FY} pose={f < at(26.2) ? 'stand' : 'open'} face="happy" />
        <PopIn x={350} y={480} delay={at(24.3)} rot={-8}>
          <GradCap size={190} />
        </PopIn>
        <PopIn x={940} y={500} delay={at(26.3)}>
          <Check size={110} />
        </PopIn>
      </Cam>
      <Stamp text="চাকরি পেল!" x={540} y={330} delay={at(26.2)} rot={-6} size={70} />
      <TitleChip text="স্বপ্ন পূরণ" />
    </AbsoluteFill>
  );
};

// 10. "এখন নিজের সামর্থ্য অনুযায়ী বাবা-মায়ের ছোট ছোট ইচ্ছেগুলো পূরণ করার চেষ্টা করে।"
const S10: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  return (
    <AbsoluteFill>
      <Room t={f} />
      <Cam>
        <Char who="son" x={230} y={FY} pose="give" face="smile" />
        <Char who="mother" x={610} y={FY} s={1.2} flip pose={f < at(30.3) ? 'stand' : 'give'} face={f < at(29.2) ? 'neutral' : 'happy'} delay={3} />
        <Char who="father" x={890} y={FY} s={1.25} flip pose="stand" face={f < at(29.2) ? 'smile' : 'happy'} delay={5} />
        <PopIn x={430} y={930} delay={at(28.4)}>
          <Gift size={150} />
        </PopIn>
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[610, 890, 760][i]} y={[470, 450, 330][i]} delay={at(29.6) + i * 4}>
            <Heart size={[70, 70, 90][i]} />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="ছোট ছোট ইচ্ছে" />
    </AbsoluteFill>
  );
};

// 11. Ending: "একজন বাবার কাছে এর চেয়ে বড় শান্তি আর কী হতে পারে!"
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const bgIn = interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Room t={f} />
      <AbsoluteFill style={{opacity: bgIn}}>
        <GoldRays t={f} />
      </AbsoluteFill>
      <Cam to={1.06}>
        <Char who="father" x={540} y={FY} pose="stand" face="happy" />
        <PopIn x={540} y={330} delay={at(33.6)} scale={1.3}>
          <Heart size={120} />
        </PopIn>
        {[0, 1, 2, 3].map((i) => (
          <PopIn key={i} x={[250, 830, 280, 820][i]} y={[440, 420, 800, 760][i]} delay={at(32.8) + i * 4}>
            <Sparkle size={48} />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="বাবার শান্তি" />
    </AbsoluteFill>
  );
};

const SCENES: [number, number, React.FC][] = [
  [0, 1.85, S1],
  [1.85, 6.4, S2],
  [6.4, 9.4, S3],
  [9.4, 12.4, S4],
  [12.4, 15.4, S5],
  [15.4, 17.35, S6],
  [17.35, 21.2, S7],
  [21.2, 23.75, S8],
  [23.75, 27.15, S9],
  [27.15, 32.1, S10],
  [32.1, TOTAL_SEC, S11],
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
