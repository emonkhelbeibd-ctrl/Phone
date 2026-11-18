// Fill SEGS with tools/srt2timeline.py (or tools/align_chunks.py when there is no usable SRT).
// who = speaker id: a character id from characters/ (e.g. 'husband', 'wife', 'elder') or 'narrator'.
export type Who = string;
export type Seg = {start: number; end: number; who: Who; text: string};

export const SEGS: Seg[] = [
  // {start: 0.1, end: 1.8, who: 'wife', text: 'উদাহরণ লাইন।'},
];

// Caption cards = groups of segments (merge very short SRT lines; max 2 lines per card).
export const CAPTIONS: {segs: number[]; keys: string[]}[] = [
  // {segs: [0, 1], keys: ['মূল', 'শব্দ']},
];

// Speaker label shown above the caption card ('' = narrator: no label, no quotes)
export const NAMES: Record<string, string> = {narrator: ''};

export const TOTAL_SEC = 10; // audio length + ~1.5 s

const graphemes = (s: string) => {
  const Sg = (Intl as any).Segmenter;
  if (Sg) return Array.from(new Sg('bn', {granularity: 'grapheme'}).segment(s)).length;
  return s.length;
};

export type Word = {text: string; start: number; key: boolean};

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
      out.push({text: x, start: s.start + ((s.end - s.start) * acc) / total, key: c.keys.some((k) => x.includes(k))});
      acc += w[i];
    });
  }
  return out;
};

// start time (s) of a word inside segment si — use it to sync visuals to the voice
export const wordAt = (si: number, word: string) => {
  const s = SEGS[si];
  const words = s.text.split(' ');
  const w = words.map((x) => graphemes(x) + 1);
  const total = w.reduce((a, b) => a + b, 0);
  let acc = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(word)) return s.start + ((s.end - s.start) * acc) / total;
    acc += w[i];
  }
  return s.start;
};

export const captionStart = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].start;
export const captionWho = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].who;

// mouth movement while a character speaks
export const talkAt = (who: string, t: number) => {
  const s = SEGS.find((x) => x.who === who && t >= x.start && t <= x.end);
  if (!s) return 0;
  return Math.abs(Math.sin(t * 17)) * 0.7 + Math.abs(Math.sin(t * 7.3)) * 0.3;
};
