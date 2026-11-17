import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';
import {sec, FPS, C, FONT, WIDTH} from './config';
import {LivingRoom, Sofa, Night} from './backgrounds/Home';
import {GoldRays, Sunburst} from './backgrounds/Backgrounds';
import {Char, SceneStart} from './characters/Char';
import {Person} from './characters/Person';
import {TitleChip, PopIn, Stamp, ListRow} from './ui/UI';
import {Captions} from './ui/Caption';
import {Bubble, Heart, Sparkle, Check, Sweat} from './props/Props';
import {Briefcase, House, Jar, Clock, HeartBroken, Balance, HoldingHands, OpenBook, SocialBtn, Chip} from './props/Couple';
import {TOTAL_SEC, wordAt} from './timeline';

const FY = 1420; // standing feet line
const SY = 1600; // sitting "feet" anchor (puts hips on the sofa seat)
const OV = 10; // transition overlap (frames)

const useAt = () => {
  const g0 = React.useContext(SceneStart);
  return {at: (t: number) => sec(t) - g0, w: (si: number, word: string) => sec(wordAt(si, word)) - g0};
};

const ease = Easing.inOut(Easing.cubic);
// Keyframed camera: keys = [frame, scale, originX%, originY%]
const Cam: React.FC<{keys: [number, number, number, number][]; children: React.ReactNode; shake?: number}> = ({keys, children, shake = 0}) => {
  const f = useCurrentFrame();
  const fr = keys.map((k) => k[0]);
  const opt = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const, easing: ease};
  const sc = keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[1]), opt) : keys[0][1];
  const ox = keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[2]), opt) : keys[0][2];
  const oy = keys.length > 1 ? interpolate(f, fr, keys.map((k) => k[3]), opt) : keys[0][3];
  const drift = 1 + interpolate(f, [0, 300], [0, 0.03], {extrapolateRight: 'clamp'});
  const sx = shake ? Math.sin(f * 1.9) * shake : 0;
  return (
    <AbsoluteFill style={{transformOrigin: `${ox}% ${oy}%`, transform: `translateX(${sx}px) scale(${sc * drift})`}}>
      {children}
    </AbsoluteFill>
  );
};

const Tint: React.FC<{color: string; from: number; to: number; max?: number}> = ({color, from, to, max = 0.25}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [from, from + 8, to - 8, to], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 0.75 + Math.sin(f / 4) * 0.25;
  return <AbsoluteFill style={{background: color, opacity: a * max * pulse, mixBlendMode: 'multiply'}} />;
};

const Ring: React.FC<{x: number; y: number; r: number; delay: number}> = ({x, y, r, delay}) => {
  const f = useCurrentFrame();
  if (f < delay) return null;
  const k = ((f - delay) % 24) / 24;
  return (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `8px solid ${C.red}`, transform: `scale(${0.7 + k * 0.6})`, opacity: 1 - k}} />
  );
};

const Mini: React.FC<{who: 'emon' | 'simi'; face: any; x: number; y: number; s?: number}> = ({who, face, x, y, s = 0.42}) => (
  <div style={{position: 'absolute', left: x - 210 * s, top: y - 140 * s, width: 420 * s, height: 300 * s, overflow: 'hidden'}}>
    <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}>
      <Person who={who} face={face} />
    </div>
  </div>
);

// ───────────────────────── scenes ─────────────────────────

// 1. Hook — "তোমার কাছে কি শুধু টাকাটাই সব?"
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.55, 25, 32], [45, 1.45, 28, 34]]}>
        <LivingRoom t={f} rain />
        <Sofa />
        <Char who="emon" x={720} y={SY} sit pose="phone" face="neutral" look={-1} />
        <Char who="simi" x={300} y={FY} pose="hips" face="annoyed" />
      </Cam>
      <Stamp text="টাকাই সব?" x={600} y={420} delay={w(0, 'টাকাটাই')} rot={-7} size={74} />
      <TitleChip text="অভিযোগ" />
    </AbsoluteFill>
  );
};

// 2. "সারাদিন কাজ করো, বাসায় এসে ফোন…" / "…একটু সময় কাটানোরও…"
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  const ph = w(1, 'ফোন');
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 50], [ph - 12, 1.0, 50, 50], [ph, 1.5, 72, 42], [at(5.6), 1.5, 72, 42], [at(5.9), 1.0, 50, 50], [w(2, 'সময়'), 1.35, 28, 40]]}>
        <LivingRoom t={f} rain />
        <Sofa />
        <Char who="emon" x={720} y={SY} sit pose="phone" face="neutral" look={-1} />
        <Char who="simi" x={300} y={FY} pose={f < at(5.7) ? 'point' : 'hips'} face={f < at(5.7) ? 'annoyed' : 'sad'} />
        <Ring x={830} y={1030} r={90} delay={ph} />
        <Ring x={250} y={380} r={100} delay={w(2, 'সময়')} />
      </Cam>
      <TitleChip text="অভিযোগ" />
    </AbsoluteFill>
  );
};

// 3. Emon: "সারাদিন এত পরিশ্রম…" "ভবিষ্যতের জন্যই তো!" "অভিযোগের শেষ নেই"
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const {at, w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.05, 60, 50], [at(13.5), 1.12, 62, 45]]}>
        <LivingRoom t={f} rain />
        <Char who="simi" x={260} y={FY} pose="crossed" face="annoyed" />
        <Char who="emon" x={760} y={FY} flip pose={f < at(11.5) ? 'open' : f < at(13.5) ? 'point' : 'shrug'} face="annoyed" />
        <PopIn x={850} y={520} delay={w(3, 'পরিশ্রম')}>
          <Briefcase size={170} />
        </PopIn>
        <PopIn x={470} y={470} delay={w(4, 'ভবিষ্যতের')}>
          <House size={190} />
        </PopIn>
        <PopIn x={640} y={430} delay={w(4, 'ভবিষ্যতের') + 5}>
          <Jar size={120} fill={interpolate(f, [w(4, 'ভবিষ্যতের'), w(4, 'ভবিষ্যতের') + 30], [0.1, 0.7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
        </PopIn>
        <PopIn x={900} y={760} delay={at(10.0)}>
          <Sweat size={46} />
        </PopIn>
      </Cam>
      <Stamp text="অভিযোগের শেষ নেই!" x={540} y={300} delay={w(5, 'শেষ')} rot={-5} size={58} />
      <TitleChip text="ইমনের যুক্তি" />
    </AbsoluteFill>
  );
};

// 4. Simi close-up: "আমি কি… বেশি কিছু চেয়েছি? শুধু একটু সময় আর মনোযোগ…"
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.9, 50, 32], [150, 2.05, 50, 30]]}>
        <LivingRoom t={f} rain lamp={0.6} />
        <Char who="simi" x={540} y={FY} pose={f < w(7, 'সময়') ? 'stand' : 'wipe'} face="sad" />
      </Cam>
      <PopIn x={190} y={760} delay={w(7, 'সময়')}>
        <Clock size={190} t={f} />
      </PopIn>
      <PopIn x={890} y={760} delay={w(7, 'মনোযোগ')}>
        <Heart size={170} />
      </PopIn>
      <PopIn x={540} y={330} delay={w(6, 'বেশি')}>
        <Chip text="বেশি কিছু?" />
      </PopIn>
      <TitleChip text="শুধু একটু সময়" />
    </AbsoluteFill>
  );
};

// 5. Emon close-up irritated: "তুমি কখনো আমার পরিস্থিতিটা…"
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.8, 50, 32], [60, 1.95, 50, 31]]} shake={f < 8 ? 6 : 0}>
        <LivingRoom t={f} rain lamp={0.7} />
        <Char who="emon" x={540} y={FY} flip pose="point" face="annoyed" />
      </Cam>
      <Tint color="#E04A30" from={0} to={80} max={0.3} />
      <PopIn x={820} y={420} delay={w(8, 'পরিস্থিতিটা')}>
        <Bubble w={150} h={140} tail="left">?</Bubble>
      </PopIn>
      <TitleChip text="পরিস্থিতি" />
    </AbsoluteFill>
  );
};

// 6. Narrator: small things → fights; complaints vs hurt
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const {w, at} = useAt();
  const crack = interpolate(f, [w(9, 'ঝগড়া'), w(9, 'ঝগড়া') + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const apart = interpolate(f, [w(9, 'ঝগড়া'), w(9, 'ঝগড়া') + 30], [0, 70], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <AbsoluteFill>
      <Night t={f} color="#F3E7F6" />
      <Cam keys={[[0, 1.0, 50, 50], [at(31.5), 1.06, 50, 55]]}>
        <Char who="simi" x={340 - apart} y={FY} flip pose="crossed" face="sad" />
        <Char who="emon" x={740 + apart} y={FY} pose="crossed" face="annoyed" />
        <svg width={WIDTH} height={1920} style={{position: 'absolute', inset: 0}}>
          <path
            d="M540 220 L510 420 L570 560 L520 760 L575 940 L515 1120 L560 1300 L540 1380"
            fill="none"
            stroke="#F05A3C"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - crack}
            style={{filter: 'drop-shadow(0 0 12px rgba(240,90,60,0.8))'}}
          />
        </svg>
      </Cam>
      <PopIn x={790} y={420} delay={w(10, 'অভিযোগ')}>
        <Chip text="অভিযোগ" />
      </PopIn>
      <PopIn x={290} y={420} delay={w(10, 'অভিমান')}>
        <Chip text="অভিমান" color="#5A7BD8" />
      </PopIn>
      <PopIn x={540} y={300} delay={w(9, 'ছোট')}>
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 46, color: '#2A2420'}}>ছোট ছোট বিষয়…</div>
      </PopIn>
      <TitleChip text="ঝগড়ার শুরু" />
    </AbsoluteFill>
  );
};

// 7. "কেউ কারও মনের কথাটা বোঝার চেষ্টা করত না"
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const split = interpolate(f, [w(11, 'মনের'), w(11, 'মনের') + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <AbsoluteFill>
      <Night t={f} color="#FCE9EC" glow="rgba(240,120,110,0.3)" />
      <Cam keys={[[0, 1.0, 50, 45], [110, 1.08, 50, 45]]}>
        <PopIn x={540} y={760} delay={2}>
          <HeartBroken size={420} split={split} />
        </PopIn>
        <PopIn x={250} y={1140} delay={w(11, 'বোঝার')}>
          <Bubble w={190} h={130} tail="right">…</Bubble>
        </PopIn>
        <PopIn x={830} y={1140} delay={w(11, 'বোঝার') + 6}>
          <Bubble w={190} h={130} tail="left">…</Bubble>
        </PopIn>
      </Cam>
      <TitleChip text="না-বোঝা মন" />
    </AbsoluteFill>
  );
};

// 8. "একদিন… দুজনেই চুপচাপ বসে ছিল।"
const S8: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.25, 50, 60], [130, 1.0, 50, 55]]}>
        <LivingRoom t={f} rain lamp={0.45} />
        <Sofa />
        <Char who="simi" x={250} y={SY} sit pose="crossed" face="sad" look={-1} />
        <Char who="emon" x={830} y={SY} sit pose="stand" face="sad" look={1} />
      </Cam>
      <AbsoluteFill style={{background: 'rgba(80,90,140,0.08)'}} />
      <TitleChip text="নীরবতা" />
    </AbsoluteFill>
  );
};

// 9. Emon thinking
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#E4EEFB" />
      <Cam keys={[[0, 1.0, 50, 50], [180, 1.06, 60, 40]]}>
        <Char who="emon" x={700} y={FY} pose="chin" face="think" flip />
        <PopIn x={330} y={560} delay={w(13, 'ভাবছিল')}>
          <div style={{position: 'relative'}}>
            <Bubble thought w={480} h={380} tail="right">
              <span />
            </Bubble>
            <div style={{position: 'absolute', left: 40, top: 90}}>
              <PopIn x={80} y={60} delay={w(13, 'সংসারের')}>
                <House size={130} />
              </PopIn>
              <PopIn x={250} y={70} delay={w(13, 'সংসারের') + 6}>
                <Briefcase size={120} />
              </PopIn>
            </div>
          </div>
        </PopIn>
        {f >= w(14, 'খুশি') && <Mini who="simi" face="sad" x={340} y={720} s={0.5} />}
        <PopIn x={490} y={720} delay={w(14, 'খুশি')}>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 80, color: C.red}}>?</div>
        </PopIn>
      </Cam>
      <TitleChip text="ইমনের ভাবনা" />
    </AbsoluteFill>
  );
};

// 10. Simi thinking
const S10: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <Night t={f} color="#F6E6F3" />
      <Cam keys={[[0, 1.0, 50, 50], [170, 1.06, 40, 40]]}>
        <Char who="simi" x={380} y={FY} pose="chin" face="sad" />
        <PopIn x={760} y={560} delay={w(15, 'ভাবছিল')}>
          <Bubble thought w={440} h={360} tail="left">
            <span />
          </Bubble>
        </PopIn>
        {f >= w(16, 'বুঝতে') && <Mini who="emon" face="neutral" x={700} y={560} s={0.45} />}
        <PopIn x={860} y={500} delay={w(16, 'চাওয়া-পাওয়া')}>
          <Heart size={110} />
        </PopIn>
        <PopIn x={860} y={650} delay={w(16, 'চাওয়া-পাওয়া') + 6}>
          <Clock size={100} t={f} />
        </PopIn>
      </Cam>
      <TitleChip text="সিমির ভাবনা" />
    </AbsoluteFill>
  );
};

// 11. Emon walks over to Simi
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const st = w(17, 'এগিয়ে') - 30;
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.1, 70, 55], [st + 50, 1.15, 40, 55]]}>
        <LivingRoom t={f} rain lamp={0.7} />
        <Sofa />
        <Char who="simi" x={300} y={SY} sit pose="crossed" face="sad" look={1} />
        <Char who="emon" x={620} y={FY} flip pose="stand" face="neutral" walkFrom={1250} walk={[st, st + 60]} />
      </Cam>
      <TitleChip text="এগিয়ে আসা" />
    </AbsoluteFill>
  );
};

// 12. Emon gentle: "শোনো… সময় দিতে পারছি না। কিন্তু বিশ্বাস করো…"
const S12: React.FC = () => {
  const f = useCurrentFrame();
  const {w, at} = useAt();
  const warm = interpolate(f, [w(19, 'বিশ্বাস'), w(19, 'বিশ্বাস') + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.35, 45, 45], [at(60.0), 1.35, 55, 42], [at(63.5), 1.5, 58, 40]]}>
        <LivingRoom t={f} rain lamp={0.8 + warm * 0.4} />
        <Sofa />
        <Char who="simi" x={300} y={SY} sit pose="stand" face={f < at(60) ? 'sad' : 'neutral'} look={1} />
        <Char who="emon" x={640} y={FY} flip pose={f < at(60) ? 'open' : 'reach'} face="smile" />
        <Ring x={250} y={380} r={100} delay={w(18, 'সময়')} />
        <PopIn x={720} y={560} delay={w(19, 'বিশ্বাস')}>
          <div style={{filter: `drop-shadow(0 0 ${20 + Math.sin(f / 5) * 8}px rgba(255,120,100,0.9))`}}>
            <Heart size={90} />
          </div>
        </PopIn>
      </Cam>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(255,200,120,0.25), rgba(0,0,0,0) 60%)', opacity: warm}} />
      <TitleChip text="মনের কথা" />
    </AbsoluteFill>
  );
};

// 13. Simi: "আমি জানি। আমিও বুঝি… কিন্তু মাঝে মাঝে আমারও খুব একা লাগে।"
const S13: React.FC = () => {
  const f = useCurrentFrame();
  const {w, at} = useAt();
  const alone = interpolate(f, [w(22, 'একা') - 6, w(22, 'একা') + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.15, 45, 50], [at(68.4), 1.2, 40, 48], [at(69.2), 1.55, 35, 38]]}>
        <LivingRoom t={f} rain lamp={0.8} />
        <Sofa />
        <Char who="emon" x={680} y={FY} flip pose="stand" face="sad" dim={alone} />
        <Char who="simi" x={300} y={SY} sit pose={f < at(68.4) ? 'stand' : 'wipe'} face={f < at(65.4) ? 'smile' : 'sad'} look={1} />
      </Cam>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 30% 42%, rgba(0,0,0,0) 16%, rgba(60,50,90,0.55) 48%)', opacity: alone}} />
      <PopIn x={760} y={500} delay={w(21, 'পরিশ্রম')}>
        <Briefcase size={140} />
      </PopIn>
      <Stamp text="একা লাগে" x={600} y={330} delay={w(22, 'একা')} rot={-5} />
      <TitleChip text="অভিমানের কথা" />
    </AbsoluteFill>
  );
};

// 14. Emon: "আমরা দুজনেই একটু চেষ্টা করি… সময় দেব… বোঝার চেষ্টা… কেমন?"
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const {w, at} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 50], [at(79.5), 1.05, 50, 52]]}>
        <LivingRoom t={f} lamp={1.1} />
        <Char who="simi" x={300} y={FY} pose="stand" face="smile" />
        <Char who="emon" x={780} y={FY} flip pose={f < at(79.2) ? 'open' : 'give'} face="smile" />
        <ListRow n="১" text="আমি সময় দেব" y={260} delay={w(24, 'সময়')} />
        <ListRow n="২" text="তুমি বুঝবে" y={410} delay={w(25, 'বোঝার')} />
        <PopIn x={860} y={320} delay={w(24, 'সময়') + 12}>
          <Check size={76} />
        </PopIn>
        <PopIn x={860} y={470} delay={w(25, 'বোঝার') + 12}>
          <Check size={76} />
        </PopIn>
        <PopIn x={630} y={650} delay={at(79.28)}>
          <Bubble w={150} h={130} tail="right">?</Bubble>
        </PopIn>
      </Cam>
      <PopIn x={540} y={1240} delay={w(23, 'দুজনেই')}>
        <Chip text="দুজনেরই চেষ্টা" color="#2E7D5B" />
      </PopIn>
      <TitleChip text="নতুন প্রতিশ্রুতি" />
    </AbsoluteFill>
  );
};

// 15. Simi: "হুম, এটাই তো চাই।"
const S15: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useAt();
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.25, 45, 45], [60, 1.3, 50, 45]]}>
        <LivingRoom t={f} lamp={1.2} />
        <Char who="simi" x={360} y={FY} pose="stand" face="happy" />
        <Char who="emon" x={720} y={FY} flip pose="stand" face="happy" />
        {[0, 1, 2, 3, 4].map((i) => (
          <PopIn key={i} x={[300, 760, 540, 420, 650][i]} y={[420, 400, 300, 560, 540][i]} delay={at(80.2) + i * 3}>
            <Heart size={[80, 80, 110, 60, 60][i]} />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="এটাই তো চাই" />
    </AbsoluteFill>
  );
};

// 16. New morning: "সব সমস্যা শেষ হয়ে যায়নি… সুন্দর পরিবর্তন"
const S16: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const sunrise = interpolate(f, [0, 40], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Cam keys={[[0, 1.0, 50, 55], [200, 1.08, 50, 55]]}>
        <LivingRoom t={f} night={false} />
        <AbsoluteFill style={{background: '#5E6FB0', opacity: (1 - sunrise) * 0.6}} />
        <Sofa night={false} />
        <Char who="simi" x={420} y={SY} sit pose="stand" face="happy" />
        <Char who="emon" x={660} y={SY} sit pose="stand" face="smile" flip />
        {[0, 1, 2, 3].map((i) => (
          <PopIn key={i} x={[220, 860, 300, 780][i]} y={[520, 500, 820, 800][i]} delay={w(28, 'সুন্দর') + i * 4}>
            <Sparkle size={50} color="#E7B23F" />
          </PopIn>
        ))}
      </Cam>
      <Stamp text="সুন্দর পরিবর্তন" x={540} y={330} delay={w(28, 'পরিবর্তন')} rot={-5} />
      <TitleChip text="নতুন সকাল" />
    </AbsoluteFill>
  );
};

// 17. Lesson: balance — explaining yourself vs understanding the other
const S17: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const t1 = interpolate(f, [w(29, 'নিজের'), w(29, 'নিজের') + 20], [0, -0.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const t2 = interpolate(f, [w(30, 'অন্যজনের'), w(30, 'অন্যজনের') + 30], [0, 1.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.4))});
  return (
    <AbsoluteFill>
      <Night t={f} color="#EAF2FB" />
      <Cam keys={[[0, 1.0, 50, 50], [240, 1.05, 50, 50]]}>
        <PopIn x={540} y={820} delay={3}>
          <Balance size={900} tilt={t1 + t2} left="নিজের কথা বোঝানো" right="অন্যের কথা বোঝা" />
        </PopIn>
      </Cam>
      <PopIn x={540} y={1250} delay={w(30, 'জরুরি')}>
        <Chip text="বেশি জরুরি" color="#2E7D5B" />
      </PopIn>
      <TitleChip text="শিক্ষা" />
    </AbsoluteFill>
  );
};

// 18. Happy home = holding hands even after fights
const S18: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const join = interpolate(f, [w(32, 'হাতটা') - 10, w(32, 'হাতটা') + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const fight = interpolate(f, [w(31, 'ঝগড়া'), w(31, 'ঝগড়া') + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <GoldRays t={f} />
      <Cam keys={[[0, 1.0, 50, 50], [230, 1.08, 50, 48]]}>
        <div style={{position: 'absolute', left: 240, top: 420, opacity: fight * (1 - join * 0.6), fontFamily: FONT, fontWeight: 700, fontSize: 60, color: C.ink}}>
          <Chip text="ঝগড়া হবেই" color={C.ink} />
        </div>
        <div style={{position: 'absolute', left: 90, top: 800}}>
          <HoldingHands size={900} join={join} />
        </div>
        <PopIn x={540} y={700} delay={w(32, 'ধরে')}>
          <Heart size={120} />
        </PopIn>
        {[0, 1, 2].map((i) => (
          <PopIn key={i} x={[260, 820, 540][i]} y={[1160, 1150, 600][i]} delay={w(32, 'রাখা') + i * 4}>
            <Sparkle size={50} />
          </PopIn>
        ))}
      </Cam>
      <TitleChip text="সুখী সংসার" />
    </AbsoluteFill>
  );
};

// 19. Book quote — The Prophet
const S19: React.FC = () => {
  const f = useCurrentFrame();
  const {w, at} = useAt();
  const open = interpolate(f, [8, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const q = 'And stand together, yet not too near together.';
  const n = Math.round(interpolate(f, [at(109.84), at(112.6)], [0, q.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <AbsoluteFill>
      <Night t={f} color="#FBF1E2" glow="rgba(255,210,150,0.5)" />
      <Cam keys={[[0, 0.95, 50, 50], [at(109.6), 1.0, 50, 48], [at(112.9), 1.12, 70, 45]]}>
        <div style={{position: 'absolute', left: 110, top: 560}}>
          <OpenBook w={860} open={open}>
            <div style={{position: 'absolute', left: 80, top: 120, width: 300, textAlign: 'center', opacity: open, fontFamily: 'Georgia, serif', color: '#5A2E22'}}>
              <div style={{fontSize: 46, fontWeight: 700}}>The Prophet</div>
              <div style={{fontSize: 30, marginTop: 18}}>Kahlil Gibran</div>
              <div style={{fontSize: 28, marginTop: 40, opacity: interpolate(f, [w(35, 'Marriage') - 4, w(35, 'Marriage') + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>— On Marriage —</div>
            </div>
            <div style={{position: 'absolute', left: 470, top: 110, width: 320, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 40, lineHeight: 1.35, color: '#2A2420'}}>
              “{q.slice(0, n)}
              {n < q.length && f >= at(109.84) && <span style={{opacity: Math.round(f / 8) % 2}}>|</span>}
              {n >= q.length && '”'}
            </div>
          </OpenBook>
        </div>
      </Cam>
      <TitleChip text="The Prophet" />
    </AbsoluteFill>
  );
};

// 20. Together, yet free
const S20: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  return (
    <AbsoluteFill>
      <GoldRays t={f} />
      <Cam keys={[[0, 1.0, 50, 55], [200, 1.06, 50, 55]]}>
        <Char who="simi" x={330} y={FY} pose="stand" face="happy" />
        <Char who="emon" x={750} y={FY} flip pose="stand" face="happy" />
        <PopIn x={540} y={460} delay={w(36, 'একসঙ্গে')}>
          <Heart size={110} />
        </PopIn>
        <PopIn x={540} y={1240} delay={w(38, 'সম্মান')}>
          <Chip text="সম্মান" />
        </PopIn>
        <PopIn x={300} y={330} delay={w(37, 'ব্যক্তিস্বাধীনতা')}>
          <Chip text="স্বাধীনতা" color="#2E7D5B" />
        </PopIn>
        <PopIn x={790} y={330} delay={w(38, 'স্বতন্ত্রতাকেও')}>
          <Chip text="স্বতন্ত্রতা" color="#5A7BD8" />
        </PopIn>
      </Cam>
      <TitleChip text="একসঙ্গে, তবু স্বাধীন" />
    </AbsoluteFill>
  );
};

// 21. CTA
const S21: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useAt();
  const act = (t: number) => interpolate(f, [t, t + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lk = w(39, 'লাইক');
  const cm = w(40, 'কমেন্টে');
  const fl = w(41, 'ফলো');
  return (
    <AbsoluteFill>
      <Sunburst t={f} />
      <Cam keys={[[0, 1.0, 50, 50], [260, 1.04, 50, 50]]}>
        <PopIn x={540} y={330} delay={lk - 8}>
          <SocialBtn kind="like" active={act(lk)} />
        </PopIn>
        <PopIn x={540} y={490} delay={cm - 8}>
          <SocialBtn kind="comment" active={act(cm)} />
        </PopIn>
        <PopIn x={540} y={650} delay={fl - 8}>
          <SocialBtn kind="follow" active={act(fl)} />
        </PopIn>
        <Char who="simi" x={370} y={FY} s={0.82} pose="stand" face="happy" delay={4} />
        <Char who="emon" x={710} y={FY} s={0.82} flip pose="stand" face="happy" delay={8} />
      </Cam>
      <TitleChip text="আপনার মতামত" />
    </AbsoluteFill>
  );
};

type Tr = 'fade' | 'slide' | 'slideR' | 'zoom' | 'whip' | 'iris';
const SCENES: [number, number, React.FC, Tr][] = [
  [0, 2.0, S1, 'fade'],
  [2.0, 9.0, S2, 'whip'],
  [9.0, 15.7, S3, 'slide'],
  [15.7, 21.5, S4, 'zoom'],
  [21.5, 24.6, S5, 'whip'],
  [24.6, 31.9, S6, 'fade'],
  [31.9, 35.8, S7, 'zoom'],
  [35.8, 40.3, S8, 'fade'],
  [40.3, 46.6, S9, 'slide'],
  [46.6, 52.4, S10, 'slideR'],
  [52.4, 55.95, S11, 'fade'],
  [55.95, 64.05, S12, 'zoom'],
  [64.05, 71.6, S13, 'slide'],
  [71.6, 79.8, S14, 'zoom'],
  [79.8, 82.0, S15, 'fade'],
  [82.0, 88.85, S16, 'iris'],
  [88.85, 97.2, S17, 'slide'],
  [97.2, 104.95, S18, 'zoom'],
  [104.95, 113.45, S19, 'fade'],
  [113.45, 120.35, S20, 'iris'],
  [120.35, TOTAL_SEC, S21, 'zoom'],
];

export const SCENE_STARTS = SCENES.map((s) => s[0]);

const Enter: React.FC<{tr: Tr; children: React.ReactNode}> = ({tr, children}) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, OV], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
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
