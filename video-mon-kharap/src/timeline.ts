// Times from the user's SRT (matches the voice file within ~0.1s).
// Text follows the user's script spelling.
export type Who = 'emon' | 'simi' | 'narrator';
export type Seg = {start: number; end: number; who: Who; text: string};

export const SEGS: Seg[] = [
  {start: 0.1, end: 0.9, who: 'simi', text: 'তুমি জানো,'}, // 0
  {start: 1.2, end: 3.05, who: 'simi', text: 'আমি সবার সামনে হাসি,'}, // 1
  {start: 3.2, end: 4.0, who: 'simi', text: 'কথা বলি,'}, // 2
  {start: 4.35, end: 5.8, who: 'simi', text: 'সবকিছু স্বাভাবিক রাখি।'}, // 3
  {start: 6.35, end: 8.5, who: 'simi', text: 'কিন্তু সব দিন তো আসলে ভালো যায় না।'}, // 4
  {start: 8.9, end: 9.55, who: 'emon', text: 'কী হয়েছে?'}, // 5
  {start: 10.1, end: 12.1, who: 'emon', text: 'আজকে তোমাকে একটু চুপচাপ লাগছে।'}, // 6
  {start: 12.6, end: 13.45, who: 'simi', text: 'কিছু হয়নি।'}, // 7
  {start: 14.0, end: 16.7, who: 'simi', text: 'সবসময় কি কোনো কারণ থাকলেই মন খারাপ হবে?'}, // 8
  {start: 17.3, end: 19.1, who: 'simi', text: 'মাঝে মাঝে এমনিতেও ভালো লাগে না।'}, // 9
  {start: 19.65, end: 21.3, who: 'narrator', text: 'আমরা অনেক সময়'}, // 10
  {start: 21.4, end: 23.4, who: 'narrator', text: 'নিজের সবচেয়ে কাছের মানুষটাকেও বলতে পারি না,'}, // 11
  {start: 23.8, end: 25.6, who: 'narrator', text: 'আমাদের ভেতরে ঠিক কী চলছে।'}, // 12
  {start: 26.15, end: 27.5, who: 'narrator', text: 'হাসতে হাসতে দিন কাটিয়ে দিই,'}, // 13
  {start: 27.8, end: 30.3, who: 'narrator', text: 'অথচ মনে কত কথা জমে থাকে।'}, // 14
  {start: 31.0, end: 33.1, who: 'emon', text: 'আচ্ছা, আজকে কোনো কিছু করতে হবে না।'}, // 15
  {start: 33.45, end: 34.45, who: 'emon', text: 'চলো, ছাদে যাই,'}, // 16
  {start: 34.8, end: 35.6, who: 'emon', text: 'একসঙ্গে বসি।'}, // 17
  {start: 36.95, end: 37.8, who: 'simi', text: 'তুমি যাবে?'}, // 18
  {start: 38.1, end: 39.4, who: 'simi', text: 'তোমার তো কত কাজ!'}, // 19
  {start: 39.7, end: 41.1, who: 'emon', text: 'কাজ তো প্রতিদিনই থাকবে।'}, // 20
  {start: 41.6, end: 44.6, who: 'emon', text: 'কিন্তু তোমার মন খারাপের দিনগুলো তো প্রতিদিন আসে না।'}, // 21
  {start: 45.2, end: 47.95, who: 'narrator', text: 'জীবনে সব সমস্যার সমাধান করে দিতে পারে'}, // 22
  {start: 48.1, end: 49.6, who: 'narrator', text: 'এমন মানুষ হয়তো কেউ নেই।'}, // 23
  {start: 50.25, end: 52.0, who: 'narrator', text: 'কিন্তু এমন একজন মানুষ থাকা,'}, // 24
  {start: 52.4, end: 54.5, who: 'narrator', text: 'যার কাছে মন খারাপটা লুকাতে হয় না…'}, // 25
  {start: 54.9, end: 56.7, who: 'narrator', text: 'সেটাও অনেক বড় সৌভাগ্য।'}, // 26
  {start: 57.35, end: 59.2, who: 'narrator', text: 'সবসময় শক্ত থাকার দরকার নেই।'}, // 27
  {start: 59.7, end: 61.0, who: 'narrator', text: 'নিজের মানুষটার কাছে'}, // 28
  {start: 61.3, end: 62.8, who: 'narrator', text: 'মাঝে মাঝে ভেঙে পড়লেও চলে।'}, // 29
  {start: 63.5, end: 66.0, who: 'narrator', text: 'The Prophet বইতে কাহলিল জিবরান লিখেছেন—'}, // 30
  {start: 66.6, end: 67.9, who: 'narrator', text: '“তোমরা একসঙ্গে থাকবে,'}, // 31
  {start: 68.35, end: 69.8, who: 'narrator', text: 'কিন্তু খুব কাছাকাছি নয়।'}, // 32
  {start: 70.4, end: 73.5, who: 'narrator', text: 'কারণ মন্দিরের স্তম্ভগুলোও আলাদা দাঁড়িয়ে থাকে।”'}, // 33
  {start: 74.35, end: 76.9, who: 'narrator', text: 'ভালোবাসা মানে সবসময় কথা বলা নয়।'}, // 34
  {start: 77.4, end: 78.3, who: 'narrator', text: 'কখনো কখনো'}, // 35
  {start: 78.5, end: 80.9, who: 'narrator', text: 'পাশে চুপচাপ বসে থাকাটাও ভালোবাসা।'}, // 36
  {start: 81.4, end: 83.4, who: 'narrator', text: 'গল্পটা ভালো লাগলে একটা লাইক দিও,'}, // 37
  {start: 83.6, end: 85.4, who: 'narrator', text: 'তোমার অনুভূতিটা কমেন্টে জানিও,'}, // 38
  {start: 85.6, end: 88.0, who: 'narrator', text: 'আর এমন গল্প পেতে আমাদের ফলো করে রেখো।'}, // 39
];

// Caption cards: groups of segments (short SRT lines merged so cards don't flicker)
export const CAPTIONS: {segs: number[]; keys: string[]}[] = [
  {segs: [0, 1], keys: ['হাসি,']},
  {segs: [2, 3], keys: ['স্বাভাবিক']},
  {segs: [4], keys: ['ভালো', 'যায়', 'না।']},
  {segs: [5, 6], keys: ['চুপচাপ']},
  {segs: [7, 8], keys: ['কারণ', 'মন', 'খারাপ']},
  {segs: [9], keys: ['এমনিতেও']},
  {segs: [10, 11], keys: ['কাছের', 'মানুষটাকেও']},
  {segs: [12], keys: ['ভেতরে']},
  {segs: [13], keys: ['হাসতে']},
  {segs: [14], keys: ['কথা', 'জমে']},
  {segs: [15], keys: ['কোনো', 'কিছু']},
  {segs: [16, 17], keys: ['ছাদে', 'একসঙ্গে']},
  {segs: [18, 19], keys: ['কাজ!']},
  {segs: [20], keys: ['প্রতিদিনই']},
  {segs: [21], keys: ['মন', 'খারাপের']},
  {segs: [22], keys: ['সমাধান']},
  {segs: [23], keys: ['কেউ', 'নেই।']},
  {segs: [24], keys: ['একজন', 'মানুষ']},
  {segs: [25], keys: ['লুকাতে']},
  {segs: [26], keys: ['সৌভাগ্য।']},
  {segs: [27], keys: ['শক্ত']},
  {segs: [28, 29], keys: ['ভেঙে', 'পড়লেও']},
  {segs: [30], keys: ['The', 'Prophet']},
  {segs: [31, 32], keys: ['একসঙ্গে', 'কাছাকাছি']},
  {segs: [33], keys: ['স্তম্ভগুলোও', 'আলাদা']},
  {segs: [34], keys: ['ভালোবাসা']},
  {segs: [35, 36], keys: ['চুপচাপ', 'ভালোবাসা।']},
  {segs: [37], keys: ['লাইক']},
  {segs: [38], keys: ['কমেন্টে']},
  {segs: [39], keys: ['ফলো']},
];

export const NAMES: Record<Who, string> = {emon: 'ইমন', simi: 'সিমি', narrator: ''};

export const TOTAL_SEC = 89.6;

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

// start time (s) of a word inside segment si
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
