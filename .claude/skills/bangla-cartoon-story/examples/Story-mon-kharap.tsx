import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';
import {sec, FPS, C, FONT, WIDTH} from './config';
import {LivingRoom, Night} from './backgrounds/Home';
import {Rooftop, Bench} from './backgrounds/Roof';
import {Char, SceneStart} from './characters/Char';
import {Person} from './characters/Person';
import {TitleChip, PopIn, Stamp} from './ui/UI';
import {Captions} from './ui/Caption';
import {Bubble, Heart, Sparkle, RedX} from './props/Props';
import {Briefcase, OpenBook, SocialBtn, Chip} from './props/Couple';
import {RainCloud, ScribbleBubble, SmileMask, Temple, WeekStrip, Tear} from './props/Mood';
import {TOTAL_SEC, wordAt, SEGS} from './timeline';

const FY = 1420; // standing feet line
const RY = 1625; // sitting on the rooftop bench
const OV = 10;
const ease = Easing.inOut(Easing.cubic);
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return {at: (t: number) => sec(t) - g0, w: (si: number, word: string) => sec(wordAt(si, word)) - g0, g0};
};

const Cam: React.FC<{keys: [number, number, number, number][]; children: React.ReactNode}> = ({keys, children}) => {
  const f = useCurrentFrame();
  const fr = keys.map((k) => k[0]);
  const opt = {...clamp, easing: ease};
  const pick = (i: number) => (keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[i]), opt) : keys[0][i]);
  const drift = 1 + interpolate(f, [0, 300], [0, 0.03], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transformOrigin: `${pick(2)}% ${pick(3)}%`, transform: `scale(${pick(1) * drift})`}}>{children}</AbsoluteFill>;
};

const Fade: React.FC<{from: number; to?: number; len?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({from, to = 1e9, len = 10, children, style}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [from, from + len, to, to + len], [0, 1, 1, 0], clamp);
  return <div style={{position: 'absolute', inset: 0, opacity: a, ...style}}>{children}</div>;
};

const At: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)'}}>{children}</div>
);

// ───────────── scenes ─────────────

// 1. Hook: smiling outside, sad inside
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const sad = f >= at(6.35);
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.7, 50, 30], [at(5.8), 1.5, 50, 32], [at(6.3), 1.3, 50, 36]]}>
        <LivingRoom t={f} night={false} />
        <Char who="wife" x={540} y={FY} pose={sad ? 'crossed' : 'stand'} face={sad ? 'sad' : 'happy'} />
      </Cam>
      <Fade from={w(1, 'হাসি')} to={at(6.2)} len={8}>
        <At x={850} y={560}>
          <SmileMask size={190} />
        </At>
      </Fade>
      <PopIn x={540} y={330} delay={at(6.6)}>
        <RainCloud t={f} size={280} rain={interpolate(f, [at(7.0), at(7.5)], [0, 1], clamp)} />
      </PopIn>
      <TitleChip text="হাসির আড়ালে" />
    </AbsoluteFill>
  );
};

// 2. husband walks in: "কী হয়েছে? আজকে তোমাকে একটু চুপচাপ লাগছে।"
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.05, 50, 50], [at(10.1), 1.15, 55, 45]]}>
        <LivingRoom t={f} night={false} />
        <Char who="wife" x={320} y={FY} pose="crossed" face="sad" look={-1} />
        <Char who="husband" x={760} y={FY} flip pose={f < at(9.6) ? 'stand' : 'open'} face="sad" walkFrom={1300} walk={[2, 60]} />
        <At x={320} y={380}>
          <RainCloud t={f} size={230} />
        </At>
        <PopIn x={880} y={420} delay={at(8.95)}>
          <Bubble w={140} h={130} tail="left">?</Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="চুপচাপ কেন?" />
    </AbsoluteFill>
  );
};

// 3. wife: "কিছু হয়নি… এমনিতেও ভালো লাগে না।"
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.1, 40, 50], [at(17.2), 1.1, 40, 50], [at(17.8), 1.55, 30, 34]]}>
        <LivingRoom t={f} night={false} />
        <Char who="husband" x={780} y={FY} flip pose="stand" face="sad" />
        <Char who="wife" x={320} y={FY} flip pose="crossed" face="sad" look={1} />
        <At x={320} y={380}>
          <RainCloud t={f} size={230} />
        </At>
      </Cam>
      <PopIn x={720} y={330} delay={w(8, 'কারণ')}>
        <Chip text="কোনো কারণ?" color="#5A7BD8" />
      </PopIn>
      <TitleChip text="এমনিতেই মন খারাপ" />
    </AbsoluteFill>
  );
};

// 4. Narrator: can't tell even the closest person what's inside
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const tangle = interpolate(f, [w(12, 'ভেতরে'), w(12, 'ভেতরে') + 30], [0, 1], clamp);
  const dash = interpolate(f, [w(11, 'বলতে'), w(11, 'বলতে') + 20], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Night t={f} color="#EEE6F8" />
      <Cam keys={[[0, 1.0, 50, 50], [at(25.8), 1.06, 35, 45]]}>
        <Char who="wife" x={320} y={FY} pose="stand" face="sad" />
        <Char who="husband" x={790} y={FY} flip pose="stand" face="neutral" delay={w(11, 'কাছের')} />
        <svg width={WIDTH} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={430} y1={640} x2={430 + 250 * dash} y2={640} stroke={C.red} strokeWidth={8} strokeDasharray="14 14" strokeLinecap="round" />
          {/* tangled thoughts glowing in her chest */}
          <g opacity={tangle} transform="translate(320,760)">
            <circle r={80} fill="#F7A8B8" opacity={0.35} />
            <path d="M-50 0 Q-30 -40 0 -10 T40 -20 T20 30 T-30 20 T-10 -30 T30 10" fill="none" stroke="#7A5AA8" strokeWidth={6} strokeLinecap="round" />
          </g>
        </svg>
        <PopIn x={560} y={640} delay={w(11, 'বলতে') + 20}>
          <RedX size={70} />
        </PopIn>
        <PopIn x={470} y={500} delay={w(11, 'বলতে')}>
          <ScribbleBubble w={150} />
        </PopIn>
      </Cam>
      <TitleChip text="না-বলা কথা" />
    </AbsoluteFill>
  );
};

// 5. Smiling through the day, words piling up
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const n = Math.floor(interpolate(f, [w(14, 'কথা'), at(30.2)], [0, 9], clamp));
  const spots = [
    [180, 420], [880, 400], [300, 280], [780, 260], [150, 640], [920, 640], [540, 230], [240, 860], [860, 860],
  ];
  return (
    <AbsoluteFill>
      <Night t={f} color="#F6E8F0" />
      <Cam keys={[[0, 1.0, 50, 50], [at(30.6), 1.08, 50, 45]]}>
        <Char who="wife" x={540} y={FY} pose="stand" face={f < w(14, 'অথচ') ? 'happy' : 'sad'} />
        <Fade from={2} to={w(14, 'অথচ')} len={8}>
          <At x={540} y={575}>
            <SmileMask size={200} />
          </At>
        </Fade>
        {spots.slice(0, n).map(([x, y], i) => (
          <PopIn key={i} x={x} y={y} delay={w(14, 'কথা') + i * ((at(30.2) - w(14, 'কথা')) / 9)} rot={(i % 2 ? 1 : -1) * 6}>
            <ScribbleBubble w={150} tone={['#FFFFFF', '#FDE7EE', '#E9EEFD'][i % 3]} />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="জমে থাকা কথা" />
    </AbsoluteFill>
  );
};

// 6. husband: "আজকে কোনো কিছু করতে হবে না। চলো, ছাদে যাই, একসঙ্গে বসি।"
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.05, 60, 50], [w(16, 'ছাদে'), 1.12, 55, 45]]}>
        <LivingRoom t={f} night={false} />
        <Char who="wife" x={300} y={FY} pose="stand" face={f < w(16, 'ছাদে') ? 'sad' : 'neutral'} look={1} />
        <Char who="husband" x={720} y={FY} flip pose={f < w(16, 'চলো') ? 'open' : 'reach'} face="smile" />
        <PopIn x={850} y={420} delay={w(15, 'কোনো')}>
          <div style={{position: 'relative'}}>
            <Briefcase size={150} />
            <div style={{position: 'absolute', left: 90, top: -10}}>
              <RedX size={70} />
            </div>
          </div>
        </PopIn>
        <PopIn x={540} y={330} delay={w(16, 'ছাদে')}>
          <Bubble thought w={260} h={200} tail="right">
            <svg width={170} height={120} viewBox="0 0 170 120">
              <rect width={170} height={120} rx={14} fill="#B9B0EA" />
              <circle cx={120} cy={36} r={18} fill="#FFF4D2" />
              <rect x={10} y={70} width={40} height={50} fill="#8E86C4" />
              <rect x={56} y={56} width={36} height={64} fill="#9C93CF" />
              <rect x={98} y={76} width={60} height={44} fill="#8E86C4" />
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} cx={20 + i * 40} cy={14 + (i % 2) * 8} r={5} fill={['#FFD36E', '#FF9FB2'][i % 2]} />
              ))}
            </svg>
          </Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="চলো ছাদে যাই" />
    </AbsoluteFill>
  );
};

// 7. wife: "তুমি যাবে? তোমার তো কত কাজ!"
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.45, 30, 36], [80, 1.5, 32, 36]]}>
        <LivingRoom t={f} night={false} />
        <Char who="wife" x={320} y={FY} pose="stand" face="smile" />
        <Char who="husband" x={760} y={FY} flip pose="stand" face="smile" />
      </Cam>
      {[0, 1, 2].map((i) => (
        <PopIn key={i} x={780 + (i % 2) * 70} y={760 - i * 110} delay={w(19, 'কাজ') + i * 4} rot={(i - 1) * 8}>
          <Briefcase size={150} />
        </PopIn>
      ))}
      <TitleChip text="এত কাজ!" />
    </AbsoluteFill>
  );
};

// 8. husband: work is every day, but sad days are not
const S8: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const reveal = interpolate(f, [at(39.75), at(41.0)], [0, 1], clamp);
  const cloud = interpolate(f, [w(21, 'মন'), w(21, 'মন') + 12], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Night t={f} color="#EAF1FB" glow="rgba(170,190,255,0.35)" />
      <Cam keys={[[0, 1.0, 50, 50], [at(44.8), 1.05, 50, 40]]}>
        <At x={540} y={520}>
          <WeekStrip reveal={reveal} cloud={cloud} />
        </At>
        <Char who="husband" x={540} y={FY} s={1.15} pose={f < w(21, 'মন') ? 'open' : 'give'} face="smile" />
      </Cam>
      <PopIn x={540} y={330} delay={w(21, 'প্রতিদিন')}>
        <Chip text="মন খারাপ রোজ আসে না" color="#5A7BD8" />
      </PopIn>
      <TitleChip text="কাজ রোজই থাকবে" />
    </AbsoluteFill>
  );
};

// 9. Rooftop: nobody can solve everything
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.25, 50, 30], [at(49.9), 1.0, 50, 50]]}>
        <Rooftop t={f} />
        <Bench />
        <Char who="wife" x={420} y={RY} sit pose="stand" face="sad" />
        <Char who="husband" x={660} y={RY} sit pose="stand" face="neutral" look={-1} />
        <At x={420} y={600}>
          <RainCloud t={f} size={180} rain={0.5} />
        </At>
      </Cam>
      <PopIn x={540} y={330} delay={w(22, 'সমাধান')}>
        <div style={{opacity: interpolate(f, [w(23, 'কেউ') + 14, w(23, 'কেউ') + 24], [1, 0.35], clamp)}}>
          <Chip text="সব সমস্যার সমাধান?" color="#7A5AA8" />
        </div>
      </PopIn>
      <PopIn x={790} y={330} delay={w(23, 'কেউ')}>
        <RedX size={80} />
      </PopIn>
      <TitleChip text="ছাদে দুজন" />
    </AbsoluteFill>
  );
};

// 10. Lucky to have someone you don't hide your sadness from
const S10: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const lean = interpolate(f, [w(25, 'লুকাতে'), w(25, 'লুকাতে') + 20], [0, 6], {...clamp, easing: ease});
  const clear = interpolate(f, [w(25, 'লুকাতে') + 10, w(25, 'লুকাতে') + 40], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.25, 50, 52], [at(56.9), 1.4, 50, 48]]}>
        <Rooftop t={f} warm={1 - clear} />
        <Bench />
        <Char who="wife" x={440} y={RY} sit pose="stand" face={clear > 0.5 ? 'sad' : 'smile'} tilt={lean} />
        <Char who="husband" x={650} y={RY} sit pose="stand" face="smile" flip />
        <div style={{opacity: clear}}>
          <At x={440} y={620}>
            <RainCloud t={f} size={170} rain={clear} />
          </At>
        </div>
        <PopIn x={545} y={720} delay={w(25, 'লুকাতে') + 30}>
          <div style={{filter: `drop-shadow(0 0 ${18 + Math.sin(f / 5) * 8}px rgba(255,120,140,0.9))`}}>
            <Heart size={90} />
          </div>
        </PopIn>
      </Cam>
      <Stamp text="অনেক বড় সৌভাগ্য" x={540} y={330} delay={w(26, 'সৌভাগ্য')} rot={-5} />
      <TitleChip text="নিজের মানুষ" />
    </AbsoluteFill>
  );
};

// 11. You don't have to be strong all the time
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.55, 45, 40], [at(63.2), 1.7, 45, 38]]}>
        <Rooftop t={f} warm={1} />
        <Bench />
        <Char who="wife" x={440} y={RY} sit pose={f < w(29, 'ভেঙে') ? 'stand' : 'wipe'} face="sad" tilt={4} />
        <Char who="husband" x={650} y={RY} sit pose={f < w(28, 'মানুষটার') ? 'stand' : 'reach'} face="smile" flip />
        {f >= w(29, 'ভেঙে') && (
          <>
            <At x={410} y={720 + ((f * 3) % 60)}>
              <Tear size={26} />
            </At>
          </>
        )}
      </Cam>
      <PopIn x={540} y={330} delay={w(27, 'শক্ত')}>
        <Chip text="সবসময় শক্ত নয়" color="#7A5AA8" />
      </PopIn>
      <PopIn x={860} y={560} delay={w(29, 'চলে')}>
        <Heart size={100} />
      </PopIn>
      <TitleChip text="ভেঙে পড়লেও চলে" />
    </AbsoluteFill>
  );
};

// grapheme-safe typewriter
const typed = (s: string, k: number) => {
  const Sg = (Intl as any).Segmenter;
  const g: string[] = Sg ? Array.from(new Sg('bn', {granularity: 'grapheme'}).segment(s), (x: any) => x.segment) : Array.from(s);
  return g.slice(0, Math.round(g.length * k)).join('');
};

// 12. The Prophet — quote + temple pillars
const S12: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useAt();
  const open = interpolate(f, [6, 26], [0, 1], {...clamp, easing: ease});
  const q1 = 'তোমরা একসঙ্গে থাকবে, কিন্তু খুব কাছাকাছি নয়।';
  const k1 = interpolate(f, [at(SEGS[31].start), at(SEGS[32].end)], [0, 1], clamp);
  const tStart = at(SEGS[33].start);
  const shrink = interpolate(f, [tStart - 6, tStart + 14], [1, 0.72], {...clamp, easing: ease});
  const bookY = interpolate(f, [tStart - 6, tStart + 14], [520, 300], {...clamp, easing: ease});
  const temple = interpolate(f, [tStart, tStart + 20], [0, 1], clamp);
  const gap = interpolate(f, [tStart + 20, tStart + 60], [0, 1], {...clamp, easing: ease});
  return (
    <AbsoluteFill>
      <Night t={f} color="#FBF1E6" glow="rgba(255,200,150,0.45)" />
      <div style={{position: 'absolute', left: 540, top: bookY, transform: `translate(-50%,0) scale(${shrink})`, transformOrigin: '50% 0'}}>
        <OpenBook w={860} open={open}>
          <div style={{position: 'absolute', left: 80, top: 130, width: 300, textAlign: 'center', opacity: open, fontFamily: 'Georgia, serif', color: '#5A2E22'}}>
            <div style={{fontSize: 48, fontWeight: 700}}>The Prophet</div>
            <div style={{fontSize: 32, marginTop: 18}}>Kahlil Gibran</div>
          </div>
          <div style={{position: 'absolute', left: 470, top: 110, width: 320, fontFamily: FONT, fontWeight: 600, fontSize: 40, lineHeight: 1.45, color: '#2A2420'}}>
            “{typed(q1, k1)}
            {k1 >= 1 && '”'}
          </div>
        </OpenBook>
      </div>
      <div style={{position: 'absolute', left: 540, top: 820, transform: 'translate(-50%,0)', opacity: temple}}>
        <Temple size={620} gap={gap} roof={temple} />
      </div>
      <TitleChip text="The Prophet" />
    </AbsoluteFill>
  );
};

// 13. Love is sometimes sitting together in silence
const S13: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const rise = interpolate(f, [w(36, 'ভালোবাসা'), w(36, 'ভালোবাসা') + 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.35, 50, 55], [at(81.0), 1.0, 50, 50]]}>
        <Rooftop t={f} warm={0.7} />
        <Bench />
        <Char who="wife" x={440} y={RY} sit pose="stand" face="happy" tilt={5} />
        <Char who="husband" x={650} y={RY} sit pose="stand" face="happy" flip />
        <div style={{position: 'absolute', left: 545, top: 820 - rise * 260, transform: `translate(-50%,-50%) scale(${0.3 + rise})`, opacity: rise}}>
          <Heart size={120} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <PopIn key={i} x={[260, 830, 340, 760][i]} y={[520, 500, 760, 740][i]} delay={w(36, 'ভালোবাসা') + 10 + i * 4}>
            <Sparkle size={44} color="#FFFFFF" />
          </PopIn>
        ))}
      </Cam>
      <PopIn x={540} y={330} delay={w(34, 'কথা')}>
        <Chip text="শুধু কথা নয়" color="#7A5AA8" />
      </PopIn>
      <TitleChip text="চুপচাপ ভালোবাসা" />
    </AbsoluteFill>
  );
};

// 14. CTA
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const act = (t: number) => interpolate(f, [t, t + 10], [0, 1], clamp);
  const lk = w(37, 'লাইক');
  const cm = w(38, 'কমেন্টে');
  const fl = w(39, 'ফলো');
  return (
    <AbsoluteFill>
      <Rooftop t={f} warm={0.5} />
      <AbsoluteFill style={{background: 'rgba(255,240,248,0.45)'}} />
      <PopIn x={540} y={330} delay={lk - 8}>
        <SocialBtn kind="like" active={act(lk)} />
      </PopIn>
      <PopIn x={540} y={490} delay={cm - 8}>
        <SocialBtn kind="comment" active={act(cm)} />
      </PopIn>
      <PopIn x={540} y={650} delay={fl - 8}>
        <SocialBtn kind="follow" active={act(fl)} />
      </PopIn>
      <Char who="wife" x={420} y={FY} s={0.82} pose="stand" face="happy" delay={4} />
      <Char who="husband" x={660} y={FY} s={0.82} flip pose="stand" face="happy" delay={8} />
      <TitleChip text="তোমার অনুভূতি" />
    </AbsoluteFill>
  );
};

type Tr = 'fade' | 'slide' | 'slideR' | 'zoom' | 'whip' | 'iris';
const SCENES: [number, number, React.FC, Tr][] = [
  [0, 6.25, S1, 'fade'],
  [6.25, 12.35, S2, 'slide'],
  [12.35, 19.4, S3, 'zoom'],
  [19.4, 25.9, S4, 'fade'],
  [25.9, 30.7, S5, 'zoom'],
  [30.7, 36.6, S6, 'whip'],
  [36.6, 39.55, S7, 'zoom'],
  [39.55, 45.0, S8, 'slide'],
  [45.0, 50.1, S9, 'iris'],
  [50.1, 57.1, S10, 'fade'],
  [57.1, 63.3, S11, 'zoom'],
  [63.3, 74.1, S12, 'fade'],
  [74.1, 81.2, S13, 'iris'],
  [81.2, TOTAL_SEC, S14, 'zoom'],
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

export const Story: React.FC = () => (
  <AbsoluteFill style={{background: '#F6EBDD'}}>
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
void Person;
