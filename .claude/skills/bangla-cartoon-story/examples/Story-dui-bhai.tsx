import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';
import {sec, FPS, C, FONT, WIDTH} from './config';
import {LivingRoom, Night, Sofa} from './backgrounds/Home';
import {CityDay, GoldRays} from './backgrounds/Backgrounds';
import {Char, SceneStart} from './characters/Char';
import {TitleChip, PopIn, Stamp} from './ui/UI';
import {Captions} from './ui/Caption';
import {Bubble, Heart, Sparkle, RedX, Sweat} from './props/Props';
import {Book, GradCap, Note, Coin, Office, Gift, Desk} from './props/StoryProps';
import {Briefcase, Clock, HeartBroken, Balance, Chip, SocialBtn} from './props/Couple';
import {RainCloud, ScribbleBubble, Tear} from './props/Mood';
import {TOTAL_SEC, wordAt, SEGS} from './timeline';

const FY = 1420;
const SY = 1600;
const OV = 10;
const ease = Easing.inOut(Easing.cubic);
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return {at: (t: number) => sec(t) - g0, w: (si: number, word: string) => sec(wordAt(si, word)) - g0, s: (si: number) => sec(SEGS[si].start) - g0};
};

const Cam: React.FC<{keys: [number, number, number, number][]; children: React.ReactNode; shake?: number}> = ({keys, children, shake = 0}) => {
  const f = useCurrentFrame();
  const fr = keys.map((k) => k[0]);
  const opt = {...clamp, easing: ease};
  const pick = (i: number) => (keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[i]), opt) : keys[0][i]);
  const drift = 1 + interpolate(f, [0, 300], [0, 0.03], {extrapolateRight: 'clamp'});
  const sx = shake ? Math.sin(f * 1.9) * shake : 0;
  return <AbsoluteFill style={{transformOrigin: `${pick(2)}% ${pick(3)}%`, transform: `translateX(${sx}px) scale(${pick(1) * drift})`}}>{children}</AbsoluteFill>;
};

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', ...style}}>{children}</div>
);

const Tint: React.FC<{color: string; from: number; to: number; max?: number}> = ({color, from, to, max = 0.25}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{background: color, opacity: a * max * (0.75 + Math.sin(f / 4) * 0.25), mixBlendMode: 'multiply'}} />;
};

// ───────── scenes ─────────

// 1. "একটা ছোট সংসার। বাবা, মা আর দুই ছেলে।"
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.25, 50, 40], [s(2) + 10, 1.0, 50, 50]]}>
        <LivingRoom t={f} night={false} />
        <Char who="father" x={300} y={FY} pose="stand" face="smile" delay={w(1, 'বাবা')} />
        <Char who="mother" x={530} y={FY} s={1.2} pose="stand" face="smile" delay={w(1, 'মা')} />
        <Char who="kidE" x={740} y={FY} s={0.95} pose="stand" face="happy" delay={w(2, 'দুই')} />
        <Char who="kidY" x={900} y={FY} s={0.8} pose="stand" face="happy" delay={w(2, 'ছেলে') } />
        <PopIn x={540} y={330} delay={4}>
          <Heart size={80} />
        </PopIn>
      </Cam>
      <TitleChip text="ছোট সংসার" />
    </AbsoluteFill>
  );
};

// 2. "বড় ছেলেকে মানুষ করতে বাবা অনেক টাকা খরচ করেছিলেন।"
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const t0 = w(4, 'টাকা');
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 50], [120, 1.06, 50, 45]]}>
        <LivingRoom t={f} night={false} />
        <Char who="father" x={330} y={FY} pose={f < t0 ? 'stand' : 'give'} face="smile" />
        <Char who="kidE" x={760} y={FY} s={1.05} flip pose="stand" face="happy" />
        {[0, 1, 2, 3, 4].map((i) => {
          const k = interpolate(f, [t0 + i * 5, t0 + i * 5 + 18], [0, 1], {...clamp, easing: Easing.out(Easing.quad)});
          const x = 450 + k * 250 + i * 10;
          const y = 900 - Math.sin(k * Math.PI) * 220 - i * 30;
          return (
            <At key={i} x={x} y={y} style={{opacity: k > 0 ? 1 : 0, transform: `translate(-50%,-50%) rotate(${(i - 2) * 10}deg)`}}>
              <Note size={150} text="৳" />
            </At>
          );
        })}
      </Cam>
      <Stamp text="অনেক টাকা খরচ" x={540} y={330} delay={w(4, 'খরচ')} rot={-5} />
      <TitleChip text="বড় ছেলের জন্য" />
    </AbsoluteFill>
  );
};

// 3. "কিন্তু সে পড়াশোনা শেষ করতে পারেনি, নিজের জীবনটাও…"
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#E9EDF3" glow="rgba(170,180,210,0.35)" />
      <Cam keys={[[0, 1.0, 50, 50], [150, 1.08, 50, 42]]}>
        <Char who="elder" x={540} y={FY} pose={f < w(6, 'গুছিয়ে') ? 'stand' : 'headHold'} face="sad" />
        <PopIn x={300} y={520} delay={w(5, 'পড়াশোনা')}>
          <div style={{position: 'relative'}}>
            <GradCap size={170} />
            <div style={{position: 'absolute', left: 100, top: -20}}>
              <PopIn x={30} y={30} delay={w(5, 'শেষ')}>
                <RedX size={74} />
              </PopIn>
            </div>
          </div>
        </PopIn>
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[760, 860, 700][i]} y={[480, 680, 820][i]} delay={w(6, 'গুছিয়ে') + i * 4} rot={[-25, 30, -40][i]}>
            {i === 0 ? <Book size={130} /> : i === 1 ? <Briefcase size={120} /> : <Coin size={70} />}
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="অগোছালো জীবন" />
    </AbsoluteFill>
  );
};

// 4. Younger brother studies hard — lack of money, giving up his needs
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#E3ECFA" glow="rgba(255,220,150,0.45)" />
      <Cam keys={[[0, 1.1, 50, 55], [s(10) + 30, 1.0, 50, 50]]}>
        <Char who="younger" x={540} y={FY} pose="chin" face="think" />
        <div style={{position: 'absolute', left: 280, top: 1060}}>
          <Desk w={520} />
        </div>
        <PopIn x={460} y={1030} delay={6}>
          <Book size={150} />
        </PopIn>
        <PopIn x={640} y={1035} delay={10}>
          <Book size={130} color="#2E7D5B" />
        </PopIn>
        <PopIn x={210} y={560} delay={w(9, 'টাকার')}>
          <div style={{position: 'relative'}}>
            <Coin size={110} />
            <div style={{position: 'absolute', left: 60, top: -20}}>
              <RedX size={60} />
            </div>
          </div>
        </PopIn>
        <PopIn x={870} y={560} delay={w(10, 'বিসর্জন')}>
          <div style={{position: 'relative'}}>
            <Gift size={130} />
            <div style={{position: 'absolute', left: 80, top: -20}}>
              <RedX size={60} />
            </div>
          </div>
        </PopIn>
        <PopIn x={540} y={380} delay={w(8, 'কষ্ট')}>
          <Sweat size={44} />
        </PopIn>
      </Cam>
      <TitleChip text="ছোট ছেলের সংগ্রাম" />
    </AbsoluteFill>
  );
};

// 5. "আজ সে একজন বড় অফিসার।"
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      <Cam keys={[[0, 1.15, 40, 50], [60, 1.0, 50, 50]]}>
        <At x={800} y={880}>
          <Office size={380} />
        </At>
        <Char who="younger" x={360} y={FY} pose="hips" face="smile" />
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[180, 540, 620][i]} y={[520, 420, 640][i]} delay={w(11, 'অফিসার।') + i * 4}>
            <Sparkle size={48} color="#E7B23F" />
          </PopIn>
        ))}
      </Cam>
      <Stamp text="বড় অফিসার!" x={540} y={330} delay={w(11, 'অফিসার।')} rot={-6} size={70} />
      <TitleChip text="আজকের সাফল্য" />
    </AbsoluteFill>
  );
};

// 6. Success vs the elder brother's hidden pain
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  const shade = interpolate(f, [s(13), s(13) + 20], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #FFF3D6 0%, #FFF3D6 50%, #E6E9F0 50%, #E6E9F0 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 25% 45%, rgba(255,210,120,0.55), rgba(0,0,0,0) 40%)'}} />
      <Cam keys={[[0, 1.0, 50, 50], [s(13) + 10, 1.0, 50, 50], [s(13) + 40, 1.25, 75, 45]]}>
        <Char who="younger" x={280} y={FY} pose="hips" face="smile" />
        <Char who="elder" x={800} y={FY} flip pose="crossed" face="sad" dim={shade * 0.5} />
        <At x={800} y={360} style={{opacity: shade}}>
          <RainCloud t={f} size={220} rain={shade} />
        </At>
        <PopIn x={680} y={760} delay={w(13, 'কষ্ট')}>
          <HeartBroken size={130} split={interpolate(f, [w(13, 'কষ্ট') + 6, w(13, 'কষ্ট') + 24], [0, 0.7], clamp)} />
        </PopIn>
      </Cam>
      <TitleChip text="চাপা কষ্ট" />
    </AbsoluteFill>
  );
};

// 7. Elder (sarcastic): "তা সাহেব, এখন তো অনেক বড় অফিসার…"
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 50], [s(16), 1.25, 30, 40]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={300} y={FY} pose={f < s(16) ? 'hips' : 'point'} face="smug" />
        <Char who="younger" x={770} y={FY} flip pose="stand" face="neutral" walkFrom={1300} walk={[0, 30]} />
        <PopIn x={900} y={980} delay={30}>
          <Briefcase size={110} />
        </PopIn>
      </Cam>
      <Stamp text="সাহেব!" x={540} y={330} delay={w(14, 'সাহেব,')} rot={-7} size={70} />
      <TitleChip text="দুই ভাইয়ের দেখা" />
    </AbsoluteFill>
  );
};

// 8. Younger (calm): "কী বলো ভাইয়া! তোমাদের কথা ভুলে যাওয়ার…"
const S8: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.3, 70, 40], [100, 1.35, 70, 40]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={300} y={FY} pose="crossed" face="smug" />
        <Char who="younger" x={770} y={FY} flip pose="open" face="smile" />
        <PopIn x={600} y={600} delay={w(19, 'ভুলে')}>
          <Heart size={80} />
        </PopIn>
      </Cam>
      <TitleChip text="ভুলিনি ভাইয়া" />
    </AbsoluteFill>
  );
};

// 9. Elder: "ভুলে যাসনি, কিন্তু তোর জন্য আমি জীবনে কী করতে পেরেছি…"
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.45, 30, 38], [120, 1.5, 30, 38]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={320} y={FY} pose={f < w(21, 'কী') ? 'crossed' : 'open'} face="sad" />
      </Cam>
      <PopIn x={700} y={560} delay={w(21, 'পেরেছি')}>
        <Bubble w={150} h={140} tail="left">?</Bubble>
      </PopIn>
      <PopIn x={720} y={330} delay={w(21, 'কী')}>
        <Chip text="কী করতে পেরেছি?" color="#7A5AA8" />
      </PopIn>
      <TitleChip text="বড় ভাইয়ের আক্ষেপ" />
    </AbsoluteFill>
  );
};

// 10. "বাবা আমার পেছনে কত টাকা নষ্ট করল, অথচ আমি কিছুই করতে পারলাম না।"
const S10: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const t0 = w(22, 'টাকা');
  return (
    <AbsoluteFill>
      <Night t={f} color="#EFEAF4" />
      <Cam keys={[[0, 1.0, 50, 50], [150, 1.06, 50, 45]]}>
        <Char who="elder" x={540} y={FY} pose={f < w(23, 'কিছুই') ? 'open' : 'headHold'} face="sad" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const k = interpolate(f, [t0 + i * 4, t0 + i * 4 + 50], [0, 1], clamp);
          return (
            <At key={i} x={540 + (i - 2.5) * 150 + Math.sin(k * 6 + i) * 30} y={760 - k * 520} style={{opacity: k > 0 ? 1 - k : 0, transform: `translate(-50%,-50%) rotate(${k * 120 * (i % 2 ? 1 : -1)}deg)`}}>
              <Note size={140} text="৳" />
            </At>
          );
        })}
      </Cam>
      <Stamp text="নষ্ট?" x={540} y={330} delay={w(22, 'নষ্ট')} rot={-6} size={70} />
      <TitleChip text="হারানো টাকা" />
    </AbsoluteFill>
  );
};

// 11. "আর তুই নিজের চেষ্টায় এত বড় হয়ে গেলি।"
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const steps = 5;
  const climb = interpolate(f, [w(24, 'চেষ্টায়'), w(24, 'বড়') + 10], [0, 1], {...clamp, easing: ease});
  return (
    <AbsoluteFill>
      <Night t={f} color="#FFF4E2" glow="rgba(255,210,130,0.5)" />
      {Array.from({length: steps}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: 380 + i * 120, top: 1360 - (i + 1) * 120, width: 120, height: (i + 1) * 120, background: i === steps - 1 ? '#E7B23F' : '#D9C8AE', border: `5px solid ${C.ink}`, boxSizing: 'border-box'}} />
      ))}
      <Char who="younger" x={440 + climb * 480} y={1240 - climb * 480} s={0.8} pose={climb >= 1 ? 'open' : 'stand'} face="happy" />
      <Char who="elder" x={220} y={FY} s={0.95} pose="stand" face="sad" />
      <PopIn x={920} y={420} delay={w(24, 'বড়') + 10}>
        <Sparkle size={60} color="#E7B23F" />
      </PopIn>
      <TitleChip text="নিজের চেষ্টায়" />
    </AbsoluteFill>
  );
};

// 12. Younger (hurt): "আবার সেই একই কথা! … আমি কখনো তোমার কাছে কিছু চাইনি?"
const S12: React.FC = () => {
  const f = useCurrentFrame();
  const {s} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 50], [s(26), 1.25, 70, 40]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={300} y={FY} pose="crossed" face="sad" />
        <Char who="younger" x={770} y={FY} flip pose={f < s(26) ? 'crossed' : 'point'} face="annoyed" />
      </Cam>
      <PopIn x={720} y={330} delay={4}>
        <Chip text="আবার সেই কথা!" />
      </PopIn>
      <TitleChip text="অভিমান" />
    </AbsoluteFill>
  );
};

// 13. Childhood flashback: "ছোটবেলায় কতবার তোমার কাছে সাহায্য চেয়েছি…"
const S13: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill style={{filter: 'sepia(0.55) saturate(0.9) brightness(1.04)'}}>
      <Cam keys={[[0, 1.0, 50, 50], [140, 1.08, 50, 50]]}>
        <LivingRoom t={f} night={false} />
        <Char who="kidE" x={720} y={FY} s={1.05} flip={false} pose="crossed" face="annoyed" look={1} />
        <Char who="kidY" x={330} y={FY} s={0.85} pose="reach" face="sad" />
        <PopIn x={560} y={720} delay={w(28, 'সাহায্য')}>
          <Book size={120} />
        </PopIn>
        <PopIn x={520} y={560} delay={w(29, 'পেয়েছি?')}>
          <Bubble w={140} h={130} tail="left">?</Bubble>
        </PopIn>
      </Cam>
      <AbsoluteFill style={{boxShadow: 'inset 0 0 180px rgba(90,60,30,0.45)'}} />
      <PopIn x={540} y={330} delay={4}>
        <Chip text="ছোটবেলা" color="#8C5A3A" />
      </PopIn>
      <TitleChip text="পুরোনো স্মৃতি" />
    </AbsoluteFill>
  );
};

// 14. Elder (defensive, angry)
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const {s, at} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.4, 30, 38], [s(32), 1.4, 30, 38], [s(32) + 20, 1.05, 45, 50]]} shake={f < 10 ? 6 : 0}>
        <LivingRoom t={f} night={false} />
        <Char who="younger" x={780} y={FY} flip pose="stand" face="surprised" />
        <Char who="elder" x={320} y={FY} pose={f < s(32) ? 'point' : 'headHold'} face={f < s(32) ? 'annoyed' : 'sad'} />
      </Cam>
      <Tint color="#E04A30" from={0} to={at(66.2)} max={0.3} />
      <Stamp text="দোষ দিচ্ছিস?" x={600} y={330} delay={4} rot={-6} />
      <TitleChip text="রাগের মাথায়" />
    </AbsoluteFill>
  );
};

// 15. Narrator: silence; words that shouldn't have been said
const S15: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#E8E6F2" />
      <Cam keys={[[0, 1.0, 50, 50], [s(34), 1.0, 50, 50], [s(34) + 30, 1.3, 30, 42]]}>
        <Char who="younger" x={780} y={FY} pose="crossed" face="sad" look={1} />
        <Char who="elder" x={300} y={FY} flip pose="stand" face="sad" look={-1} />
        <PopIn x={220} y={380} delay={w(35, 'কথা')}>
          <div style={{position: 'relative'}}>
            <ScribbleBubble w={190} />
            <div style={{position: 'absolute', left: 120, top: -20}}>
              <PopIn x={30} y={30} delay={w(35, 'উচিত') - w(35, 'কথা')}>
                <RedX size={70} />
              </PopIn>
            </div>
          </div>
        </PopIn>
      </Cam>
      <PopIn x={540} y={330} delay={w(33, 'চুপ')}>
        <Chip text="…নীরবতা…" color="#7A7A9A" />
      </PopIn>
      <TitleChip text="নীরবতা" />
    </AbsoluteFill>
  );
};

// 16. Younger: sleepless nights of study
const S16: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  const tired = f >= w(39, 'পারব');
  return (
    <AbsoluteFill>
      <Night t={f} color="#DCE3F5" glow="rgba(255,225,160,0.55)" />
      <Cam keys={[[0, 1.0, 50, 50], [s(39), 1.0, 50, 50], [s(39) + 30, 1.3, 50, 40]]}>
        <Char who="younger" x={540} y={FY} pose={tired ? 'headHold' : 'chin'} face={tired ? 'sad' : 'think'} />
        <div style={{position: 'absolute', left: 280, top: 1060}}>
          <Desk w={520} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <PopIn key={i} x={420 + (i % 2) * 20} y={1030 - i * 34} delay={w(38, 'রাত') + i * 5}>
            <Book size={130} color={['#C8401F', '#2E7D5B', '#5A7BD8', '#E7B23F'][i]} />
          </PopIn>
        ))}
        <PopIn x={200} y={520} delay={w(38, 'রাত')}>
          <Clock size={160} t={f * 3} />
        </PopIn>
        <PopIn x={880} y={460} delay={w(38, 'রাত')}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            <path d="M80 10 A50 50 0 1 0 110 80 A40 40 0 1 1 80 10 Z" fill="#FFF0B8" stroke={C.ink} strokeWidth={5} />
          </svg>
        </PopIn>
        {tired && (
          <At x={500} y={700 + ((f * 3) % 50)}>
            <Tear size={24} />
          </At>
        )}
      </Cam>
      <TitleChip text="না ঘুমানো রাত" />
    </AbsoluteFill>
  );
};

// 17. "…যখন দেখতাম তুমি নিজের জীবনটা নিয়ে হাল ছেড়ে দিচ্ছ?"
const S17: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#ECE8F2" />
      <Cam keys={[[0, 1.0, 50, 50], [s(42), 1.05, 40, 48]]}>
        <Char who="younger" x={780} y={FY} flip pose={f < w(41, 'কষ্ট') ? 'stand' : 'wipe'} face="sad" />
        <Sofa cx={300} w={460} night={false} />
        <Char who="elder" x={300} y={SY} sit pose="headHold" face="sad" dim={0.25} />
        <At x={300} y={560}>
          <RainCloud t={f} size={200} />
        </At>
      </Cam>
      <PopIn x={540} y={330} delay={w(42, 'হাল')}>
        <Chip text="হাল ছেড়ে দেওয়া" color="#5A7BD8" />
      </PopIn>
      <TitleChip text="ভাইয়ের জন্য কষ্ট" />
    </AbsoluteFill>
  );
};

// 18. Elder (regretful): "আমি জানি রে… এই আফসোসটা…"
const S18: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.7, 50, 32], [200, 1.85, 50, 30]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={540} y={FY} pose={f < w(45, 'আফসোসটা') ? 'stand' : 'wipe'} face="sad" />
        {f >= w(45, 'আফসোসটা') && (
          <At x={505} y={560 + ((f * 2) % 40)}>
            <Tear size={22} />
          </At>
        )}
      </Cam>
      <PopIn x={540} y={330} delay={w(45, 'আফসোসটা')}>
        <Chip text="সারাজীবনের আফসোস" color="#7A5AA8" />
      </PopIn>
      <TitleChip text="আফসোস" />
    </AbsoluteFill>
  );
};

// 19. Younger (reassuring): "তুমি আমার বড় ভাই… তোমারও একটা অংশ আছে।"
const S19: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  const slice = interpolate(f, [w(50, 'অংশ'), w(50, 'অংশ') + 18], [0, 1], {...clamp, easing: ease});
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.1, 50, 50], [s(49), 1.1, 50, 50], [s(49) + 20, 1.0, 50, 55]]}>
        <LivingRoom t={f} night={false} />
        <Char who="elder" x={330} y={FY} pose="stand" face={f < w(47, 'বড়') ? 'sad' : 'smile'} />
        <Char who="younger" x={700} y={FY} flip pose={f < w(46, 'ঠিক') ? 'open' : 'reach'} face="smile" />
        <PopIn x={540} y={1200} delay={w(47, 'ভাই,')}>
          <Chip text="তুমি আমার বড় ভাই" />
        </PopIn>
      </Cam>
      <PopIn x={540} y={420} delay={s(49)}>
        <svg width={260} height={260} viewBox="-130 -130 260 260" style={{overflow: 'visible'}}>
          <circle r={110} fill="#E7B23F" stroke={C.ink} strokeWidth={6} />
          <text y={18} textAnchor="middle" fontFamily="Hind Siliguri" fontWeight={700} fontSize={44} fill="#5A3A10">সাফল্য</text>
          <g transform={`translate(${slice * 40},${-slice * 40})`} opacity={slice}>
            <path d="M0 0 L0 -110 A110 110 0 0 1 95 -55 Z" fill={C.red} stroke={C.ink} strokeWidth={6} />
            <text x={60} y={-115} fontFamily="Hind Siliguri" fontWeight={700} fontSize={34} fill={C.red}>ভাইয়া</text>
          </g>
        </svg>
      </PopIn>
      <TitleChip text="তোমারও অংশ" />
    </AbsoluteFill>
  );
};

// 20. The hug
const S20: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  const close = interpolate(f, [s(52), s(52) + 25], [0, 1], {...clamp, easing: ease});
  return (
    <AbsoluteFill>
      <GoldRays t={f} />
      <Cam keys={[[0, 1.0, 50, 50], [s(52) + 25, 1.25, 50, 40]]}>
        <Char who="elder" x={360 + close * 110} y={FY} pose={close > 0.3 ? 'hug' : 'stand'} face={close > 0.5 ? 'happy' : 'sad'} />
        <Char who="younger" x={720 - close * 110} y={FY} flip pose={close > 0.3 ? 'hug' : 'stand'} face={close > 0.5 ? 'happy' : 'sad'} />
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[420, 660, 540][i]} y={[440, 420, 320][i]} delay={w(52, 'জড়িয়ে') + i * 4}>
            <Heart size={[70, 70, 100][i]} />
          </PopIn>
        ))}
      </Cam>
      <PopIn x={540} y={330} delay={w(51, 'কোনো')}>
        <Chip text="কোনো কথা নয়" color="#8C5A3A" />
      </PopIn>
      <TitleChip text="বুকে জড়িয়ে" />
    </AbsoluteFill>
  );
};

// 21. Relationships can't be measured with money
const S21: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const t1 = interpolate(f, [w(53, 'মাপা'), w(53, 'মাপা') + 20], [0, -0.6], clamp);
  const t2 = interpolate(f, [w(55, 'ভালোবাসা'), w(55, 'ভালোবাসা') + 30], [0, 1.8], {...clamp, easing: Easing.out(Easing.back(1.4))});
  return (
    <AbsoluteFill>
      <Night t={f} color="#FFF4E6" glow="rgba(255,200,150,0.5)" />
      <Cam keys={[[0, 1.0, 50, 50], [280, 1.05, 50, 50]]}>
        <PopIn x={540} y={820} delay={3}>
          <Balance size={900} tilt={t1 + t2} left="টাকা" right="ভালোবাসা আর উপস্থিতি" />
        </PopIn>
      </Cam>
      <TitleChip text="সম্পর্কের হিসাব" />
    </AbsoluteFill>
  );
};

// 22. After success, don't forget your people
const S22: React.FC = () => {
  const f = useCurrentFrame();
  const {w, s} = useAt();
  const turn = f >= w(59, 'মানুষগুলোর');
  return (
    <AbsoluteFill>
      <CityDay t={f} />
      {Array.from({length: 4}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: 560 + i * 120, top: 1360 - (i + 1) * 110, width: 120, height: (i + 1) * 110, background: i === 3 ? '#E7B23F' : '#D9C8AE', border: `5px solid ${C.ink}`, boxSizing: 'border-box'}} />
      ))}
      <Char who="younger" x={980} y={920} s={0.8} flip={turn} pose={turn ? 'reach' : 'hips'} face="smile" delay={s(58) > 0 ? 0 : 0} />
      <Char who="father" x={140} y={FY} s={0.85} pose="stand" face="smile" />
      <Char who="mother" x={300} y={FY} s={0.8} pose="stand" face="smile" />
      <Char who="elder" x={460} y={FY} s={0.88} pose="stand" face="smile" />
      <svg width={WIDTH} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M900 700 Q640 520 320 820" fill="none" stroke={C.red} strokeWidth={8} strokeDasharray="18 16" strokeLinecap="round" pathLength={1} strokeDashoffset={0} opacity={turn ? 1 : 0} />
      </svg>
      <PopIn x={620} y={560} delay={w(59, 'ভুলে')}>
        <Heart size={100} />
      </PopIn>
      <Stamp text="ভুলে যাবেন না" x={540} y={330} delay={w(59, 'ভুলে')} rot={-5} />
      <TitleChip text="মনে রাখবেন" />
    </AbsoluteFill>
  );
};

// 23. CTA
const S23: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const act = (t: number) => interpolate(f, [t, t + 10], [0, 1], clamp);
  const lk = w(60, 'লাইক');
  const cm = w(61, 'কমেন্টে');
  const fl = w(62, 'ফলো');
  return (
    <AbsoluteFill>
      <GoldRays t={f} />
      <PopIn x={540} y={330} delay={lk - 8}>
        <SocialBtn kind="like" active={act(lk)} />
      </PopIn>
      <PopIn x={540} y={490} delay={cm - 8}>
        <SocialBtn kind="comment" active={act(cm)} />
      </PopIn>
      <PopIn x={540} y={650} delay={fl - 8}>
        <SocialBtn kind="follow" active={act(fl)} />
      </PopIn>
      <Char who="father" x={210} y={FY} s={0.75} pose="stand" face="happy" delay={2} />
      <Char who="mother" x={400} y={FY} s={0.72} pose="stand" face="happy" delay={5} />
      <Char who="elder" x={620} y={FY} s={0.78} pose="hug" face="happy" delay={8} />
      <Char who="younger" x={850} y={FY} s={0.75} flip pose="hug" face="happy" delay={11} />
      <TitleChip text="আপনার অনুভূতি" />
    </AbsoluteFill>
  );
};

type Tr = 'fade' | 'slide' | 'slideR' | 'zoom' | 'whip' | 'iris';
const SCENES: [number, number, React.FC, Tr][] = [
  [0, 4.2, S1, 'fade'],
  [4.2, 8.0, S2, 'slide'],
  [8.0, 13.4, S3, 'fade'],
  [13.4, 21.1, S4, 'slideR'],
  [21.1, 23.5, S5, 'zoom'],
  [23.5, 28.45, S6, 'fade'],
  [28.45, 35.1, S7, 'iris'],
  [35.1, 39.2, S8, 'whip'],
  [39.2, 43.4, S9, 'whip'],
  [43.4, 48.4, S10, 'fade'],
  [48.4, 51.7, S11, 'zoom'],
  [51.7, 57.0, S12, 'whip'],
  [57.0, 61.7, S13, 'fade'],
  [61.7, 68.3, S14, 'whip'],
  [68.3, 77.1, S15, 'fade'],
  [77.1, 86.1, S16, 'slide'],
  [86.1, 93.7, S17, 'fade'],
  [93.7, 100.75, S18, 'zoom'],
  [100.75, 111.9, S19, 'slide'],
  [111.9, 118.4, S20, 'iris'],
  [118.4, 128.2, S21, 'fade'],
  [128.2, 135.6, S22, 'slide'],
  [135.6, TOTAL_SEC, S23, 'zoom'],
];

const Enter: React.FC<{tr: Tr; children: React.ReactNode}> = ({tr, children}) => {
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

export const SCENE_STARTS = SCENES.map((x) => x[0]);

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
void FONT;
