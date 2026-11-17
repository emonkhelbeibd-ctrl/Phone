// Speech chunks measured from voice.mp3 (silence detection -35dB/0.3s), aligned to the
// script lines by duration + speaker pitch. Text follows the user's script spelling.
export type Who = 'emon' | 'simi' | 'narrator';
export type Seg = {start: number; end: number; who: Who; text: string; keys?: string[]};

export const SEGS: Seg[] = [
  {start: 0.0, end: 1.79, who: 'simi', text: 'তোমার কাছে কি শুধু টাকাটাই সব?', keys: ['টাকাটাই', 'সব?']},
  {start: 2.15, end: 5.33, who: 'simi', text: 'সারাদিন কাজ করো, বাসায় এসে ফোন নিয়ে বসে থাকো।', keys: ['কাজ', 'ফোন']},
  {start: 5.79, end: 8.67, who: 'simi', text: 'আমার সঙ্গে একটু সময় কাটানোরও কি প্রয়োজন মনে হয় না?', keys: ['সময়', 'প্রয়োজন']},
  {start: 9.1, end: 11.1, who: 'emon', text: 'সারাদিন এত পরিশ্রম করি কার জন্য?', keys: ['পরিশ্রম', 'কার']},
  {start: 11.6, end: 12.98, who: 'emon', text: 'আমাদের ভবিষ্যতের জন্যই তো!', keys: ['ভবিষ্যতের']},
  {start: 13.61, end: 15.25, who: 'emon', text: 'তারপরও তোমার অভিযোগের শেষ নেই।', keys: ['অভিযোগের', 'শেষ', 'নেই।']},
  {start: 15.9, end: 17.89, who: 'simi', text: 'আমি কি তোমার কাছে বেশি কিছু চেয়েছি?', keys: ['বেশি', 'কিছু']},
  {start: 18.44, end: 21.12, who: 'simi', text: 'শুধু একটু সময় আর মনোযোগ চেয়েছি।', keys: ['সময়', 'মনোযোগ']},
  {start: 21.63, end: 24.17, who: 'emon', text: 'তুমি কখনো আমার পরিস্থিতিটা বোঝার চেষ্টা করেছ?', keys: ['পরিস্থিতিটা']},
  {start: 24.8, end: 28.07, who: 'narrator', text: 'এভাবেই ছোট ছোট বিষয় থেকে শুরু হতো তাদের ঝগড়া।', keys: ['ছোট', 'ঝগড়া।']},
  {start: 28.77, end: 31.67, who: 'narrator', text: 'দুজনেরই কিছু অভিযোগ ছিল, কিছু অভিমান ছিল।', keys: ['অভিযোগ', 'অভিমান']},
  {start: 32.24, end: 35.28, who: 'narrator', text: 'কিন্তু কেউ কারও মনের কথাটা বোঝার চেষ্টা করত না।', keys: ['মনের', 'কথাটা']},
  {start: 36.04, end: 39.75, who: 'narrator', text: 'একদিন এমনই একটা ঝগড়ার পর দুজনেই চুপচাপ বসে ছিল।', keys: ['চুপচাপ']},
  {start: 40.42, end: 43.92, who: 'narrator', text: 'ইমন ভাবছিল, সংসারের জন্য এত কিছু করার পরও', keys: ['ইমন', 'সংসারের']},
  {start: 44.25, end: 46.13, who: 'narrator', text: 'কেন সে সিমিকে খুশি রাখতে পারছে না?', keys: ['খুশি']},
  {start: 46.84, end: 48.25, who: 'narrator', text: 'অন্যদিকে সিমিও ভাবছিল,', keys: ['সিমিও']},
  {start: 48.65, end: 51.96, who: 'narrator', text: 'ইমন কি একবারও বুঝতে পারে না, তারও কিছু চাওয়া-পাওয়া আছে?', keys: ['চাওয়া-পাওয়া']},
  {start: 52.6, end: 55.6, who: 'narrator', text: 'কিছুক্ষণ পর ইমন নিজেই সিমির কাছে এগিয়ে গেল।', keys: ['নিজেই', 'এগিয়ে']},
  {start: 56.17, end: 59.52, who: 'emon', text: 'শোনো, হয়তো আমি তোমাকে ঠিকমতো সময় দিতে পারছি না।', keys: ['সময়']},
  {start: 60.18, end: 63.66, who: 'emon', text: 'কিন্তু বিশ্বাস করো, সবকিছুই আমাদের ভালো থাকার জন্য করি।', keys: ['বিশ্বাস', 'ভালো']},
  {start: 64.21, end: 64.82, who: 'simi', text: 'আমি জানি।', keys: ['জানি।']},
  {start: 65.47, end: 67.84, who: 'simi', text: 'আমিও বুঝি তুমি কতটা পরিশ্রম করো।', keys: ['বুঝি', 'পরিশ্রম']},
  {start: 68.51, end: 71.32, who: 'simi', text: 'কিন্তু মাঝে মাঝে আমারও খুব একা লাগে।', keys: ['একা']},
  {start: 71.74, end: 74.16, who: 'emon', text: 'আচ্ছা, তাহলে আমরা দুজনেই একটু চেষ্টা করি।', keys: ['দুজনেই', 'চেষ্টা']},
  {start: 74.87, end: 75.96, who: 'emon', text: 'আমি তোমাকে সময় দেব,', keys: ['সময়']},
  {start: 76.4, end: 78.72, who: 'emon', text: 'আর তুমিও আমার পরিস্থিতিটা বোঝার চেষ্টা করবে।', keys: ['বোঝার']},
  {start: 79.28, end: 79.54, who: 'emon', text: 'কেমন?', keys: ['কেমন?']},
  {start: 79.99, end: 81.48, who: 'simi', text: 'হুম, এটাই তো চাই।', keys: ['এটাই', 'চাই।']},
  {start: 82.12, end: 84.64, who: 'narrator', text: 'সেদিন তাদের সব সমস্যা শেষ হয়ে যায়নি।', keys: ['সমস্যা']},
  {start: 85.07, end: 88.36, who: 'narrator', text: 'কিন্তু দুজনের মধ্যে একটা সুন্দর পরিবর্তন এসেছিল।', keys: ['সুন্দর', 'পরিবর্তন']},
  {start: 88.96, end: 93.34, who: 'narrator', text: 'তারা বুঝতে শিখেছিল, সংসারে সবসময় নিজের কথাটা বোঝানোর চেয়ে', keys: ['নিজের', 'বোঝানোর']},
  {start: 93.71, end: 96.86, who: 'narrator', text: 'অন্যজনের কথাটা বোঝার চেষ্টা করা অনেক বেশি জরুরি।', keys: ['অন্যজনের', 'জরুরি।']},
  {start: 97.38, end: 100.63, who: 'narrator', text: 'কারণ সুখী সংসার মানে কখনো ঝগড়া না হওয়া নয়,', keys: ['সুখী', 'সংসার']},
  {start: 101.08, end: 104.4, who: 'narrator', text: 'বরং ঝগড়ার পরও একে অপরের হাতটা ধরে রাখা।', keys: ['হাতটা', 'ধরে', 'রাখা।']},
  {start: 105.13, end: 107.0, who: 'narrator', text: 'Kahlil Gibran তাঁর বিখ্যাত বই', keys: ['Kahlil', 'Gibran']},
  {start: 107.0, end: 109.22, who: 'narrator', text: 'The Prophet-এর Marriage অংশে লিখেছেন—', keys: ['The', 'Prophet-এর']},
  {start: 109.84, end: 112.92, who: 'narrator', text: '"And stand together, yet not too near together."', keys: ['together,', 'together."']},
  {start: 113.6, end: 115.35, who: 'narrator', text: 'অর্থাৎ, একসঙ্গে থেকো,', keys: ['একসঙ্গে']},
  {start: 115.74, end: 117.6, who: 'narrator', text: 'কিন্তু একে অপরের ব্যক্তিস্বাধীনতা', keys: ['ব্যক্তিস্বাধীনতা']},
  {start: 117.6, end: 119.71, who: 'narrator', text: 'ও স্বতন্ত্রতাকেও সম্মান করো।', keys: ['সম্মান']},
  {start: 120.51, end: 122.07, who: 'narrator', text: 'গল্পটা ভালো লাগলে লাইক দিন।', keys: ['লাইক']},
  {start: 122.37, end: 124.7, who: 'narrator', text: 'আপনাদের মতামত কমেন্টে জানান এবং', keys: ['কমেন্টে']},
  {start: 124.7, end: 127.5, who: 'narrator', text: 'এমন আরও গল্প দেখতে আমাদের পেজটি ফলো করুন।', keys: ['ফলো']},
];

// one caption per segment
export const CAPTIONS: {segs: number[]; keys: string[]}[] = SEGS.map((s, i) => ({segs: [i], keys: s.keys || []}));

export const NAMES: Record<Who, string> = {emon: 'ইমন', simi: 'সিমি', narrator: ''};

export const TOTAL_SEC = 129.0;

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
      out.push({text: x, start: s.start + ((s.end - s.start) * acc) / total, key: c.keys.includes(x)});
      acc += w[i];
    });
  }
  return out;
};

// time (s) when a word inside segment `si` starts — used to sync visuals to the voice
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

export const talkAt = (who: string, t: number) => {
  const s = SEGS.find((x) => x.who === who && t >= x.start && t <= x.end);
  if (!s) return 0;
  return Math.abs(Math.sin(t * 17)) * 0.7 + Math.abs(Math.sin(t * 7.3)) * 0.3;
};
