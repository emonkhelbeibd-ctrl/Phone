// Speech segments measured from voice.mp3 (silence detection, -35dB / 0.25s),
// matched to the script lines. Times are in seconds.
export type Who = 'emon' | 'simi';

export type Seg = {start: number; end: number; who: Who; text: string};

export const SEGS: Seg[] = [
  {start: 0.0, end: 1.75, who: 'simi', text: 'আজকে তুমি রান্নাটা করো!'},
  {start: 2.08, end: 2.34, who: 'emon', text: 'কী!'},
  {start: 2.71, end: 3.16, who: 'emon', text: 'আমি?'},
  {start: 3.5, end: 4.45, who: 'simi', text: 'হ্যাঁ, তুমি।'},
  {start: 4.85, end: 6.61, who: 'simi', text: 'সব কাজ কি আমাকেই করতে হবে?'},
  {start: 7.02, end: 8.95, who: 'emon', text: 'আচ্ছা ঠিক আছে, করব।'},
  {start: 9.37, end: 10.69, who: 'emon', text: 'কিন্তু কী রান্না করব?'},
  {start: 11.16, end: 12.63, who: 'simi', text: 'সেটা তুমি নিজেই ঠিক করো।'},
  {start: 13.13, end: 13.9, who: 'emon', text: 'তাহলে'},
  {start: 14.16, end: 14.95, who: 'emon', text: 'ডিম ভাজি করি?'},
  {start: 15.36, end: 16.88, who: 'simi', text: 'প্রতিদিন ডিম ভাজি!'},
  {start: 17.36, end: 19.02, who: 'simi', text: 'একটু ভালো কিছু রান্না করো।'},
  {start: 19.45, end: 21.37, who: 'emon', text: 'তাহলে তুমি বলো কী রান্না করব?'},
  {start: 21.75, end: 24.06, who: 'simi', text: 'আমি বললে তো তোমার রান্না করা হলো না!'},
  {start: 24.41, end: 26.33, who: 'emon', text: 'তার মানে রান্নাও আমাকে করতে হবে,'},
  {start: 26.63, end: 28.38, who: 'emon', text: 'আবার মেনুও আমাকে ঠিক করতে হবে!'},
  {start: 28.73, end: 31.84, who: 'simi', text: 'সংসার করতে হলে এতটুকু তো করতেই হবে!'},
  {start: 32.18, end: 32.72, who: 'emon', text: 'বুঝলাম,'},
  {start: 33.05, end: 35.13, who: 'emon', text: 'আজকে আমার ছুটির দিনেও ছুটি নেই!'},
];

// Each caption card = one or more segments; keywords turn red as they are spoken.
export const CAPTIONS: {segs: number[]; keys: string[]}[] = [
  {segs: [0], keys: ['তুমি', 'রান্নাটা']},
  {segs: [1, 2], keys: ['আমি?']},
  {segs: [3, 4], keys: ['তুমি।', 'আমাকেই']},
  {segs: [5], keys: ['করব।']},
  {segs: [6], keys: ['কী', 'রান্না']},
  {segs: [7], keys: ['নিজেই']},
  {segs: [8, 9], keys: ['ডিম', 'ভাজি']},
  {segs: [10], keys: ['প্রতিদিন']},
  {segs: [11], keys: ['ভালো', 'কিছু']},
  {segs: [12], keys: ['তুমি', 'বলো']},
  {segs: [13], keys: ['তোমার', 'রান্না']},
  {segs: [14], keys: ['রান্নাও']},
  {segs: [15], keys: ['মেনুও']},
  {segs: [16], keys: ['সংসার']},
  {segs: [17, 18], keys: ['ছুটি', 'নেই!']},
];

export const NAMES: Record<Who, string> = {emon: 'ইমন', simi: 'সিমি'};

export const TOTAL_SEC = 36.5;

const graphemes = (s: string) => {
  const Seg = (Intl as any).Segmenter;
  if (Seg) return Array.from(new Seg('bn', {granularity: 'grapheme'}).segment(s)).length;
  return s.length;
};

export type Word = {text: string; start: number; key: boolean};

// Split each segment's time across its words, proportional to grapheme count.
export const captionWords = (ci: number): Word[] => {
  const c = CAPTIONS[ci];
  const out: Word[] = [];
  for (const si of c.segs) {
    const s = SEGS[si];
    const words = s.text.split(' ');
    const w = words.map((x) => graphemes(x) + 1);
    const total = w.reduce((a, b) => a + b, 0);
    let acc = 0;
    words.forEach((x, i) => {
      out.push({text: x, start: s.start + ((s.end - s.start) * acc) / total, key: c.keys.includes(x)});
      acc += w[i];
    });
  }
  return out;
};

export const captionStart = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].start;
export const captionWho = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].who;

// Mouth openness for a character at time t (seconds)
export const talkAt = (who: Who, t: number) => {
  const s = SEGS.find((x) => x.who === who && t >= x.start && t <= x.end);
  if (!s) return 0;
  const v = Math.abs(Math.sin(t * 17)) * 0.7 + Math.abs(Math.sin(t * 7.3)) * 0.3;
  return v;
};
