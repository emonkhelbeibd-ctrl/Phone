// Times from the user's SRT (matches the voice file within ~0.1s).
// Text follows the user's script spelling.
export type Who = 'elder' | 'younger' | 'narrator';
export type Seg = {start: number; end: number; who: Who; text: string};

// Times from the user's SRT (matches the voice). Text follows the script spelling.
export const SEGS: Seg[] = [
  {start: 0.05, end: 1.15, who: 'narrator', text: 'একটা ছোট সংসার।'}, // 0
  {start: 1.75, end: 2.85, who: 'narrator', text: 'বাবা, মা'}, // 1
  {start: 3.05, end: 3.8, who: 'narrator', text: 'আর দুই ছেলে।'}, // 2
  {start: 4.3, end: 6.15, who: 'narrator', text: 'বড় ছেলেকে মানুষ করতে'}, // 3
  {start: 6.3, end: 7.65, who: 'narrator', text: 'বাবা অনেক টাকা খরচ করেছিলেন।'}, // 4
  {start: 8.15, end: 10.15, who: 'narrator', text: 'কিন্তু সে পড়াশোনা শেষ করতে পারেনি,'}, // 5
  {start: 10.65, end: 12.95, who: 'narrator', text: 'নিজের জীবনটাও ঠিকভাবে গুছিয়ে নিতে পারেনি।'}, // 6
  {start: 13.6, end: 15.1, who: 'narrator', text: 'অন্যদিকে ছোট ছেলেটা'}, // 7
  {start: 15.3, end: 17.05, who: 'narrator', text: 'অনেক কষ্ট করে পড়াশোনা করেছে।'}, // 8
  {start: 17.45, end: 18.75, who: 'narrator', text: 'কখনো টাকার অভাবে,'}, // 9
  {start: 18.9, end: 20.85, who: 'narrator', text: 'কখনো নিজের প্রয়োজন বিসর্জন দিয়ে।'}, // 10
  {start: 21.3, end: 23.25, who: 'narrator', text: 'আজ সে একজন বড় অফিসার।'}, // 11
  {start: 23.7, end: 25.35, who: 'narrator', text: 'কিন্তু এই সাফল্যের পেছনে'}, // 12
  {start: 25.45, end: 28.25, who: 'narrator', text: 'একটা চাপা কষ্ট রয়ে গেছে বড় ভাইয়ের মনে।'}, // 13
  {start: 28.65, end: 29.35, who: 'elder', text: 'তা সাহেব,'}, // 14
  {start: 29.7, end: 31.75, who: 'elder', text: 'এখন তো অনেক বড় অফিসার হয়ে গেছিস!'}, // 15
  {start: 32.2, end: 34.0, who: 'elder', text: 'আমাদের মতো সাধারণ মানুষের কথা'}, // 16
  {start: 34.2, end: 34.95, who: 'elder', text: 'আর মনে থাকে?'}, // 17
  {start: 35.2, end: 36.15, who: 'younger', text: 'কী বলো ভাইয়া!'}, // 18
  {start: 36.5, end: 38.95, who: 'younger', text: 'তোমাদের কথা ভুলে যাওয়ার মতো মানুষ আমি নাকি?'}, // 19
  {start: 39.3, end: 40.05, who: 'elder', text: 'ভুলে যাসনি,'}, // 20
  {start: 40.5, end: 43.15, who: 'elder', text: 'কিন্তু তোর জন্য আমি জীবনে কী করতে পেরেছি বল তো?'}, // 21
  {start: 43.6, end: 46.15, who: 'elder', text: 'বাবা আমার পেছনে কত টাকা নষ্ট করল,'}, // 22
  {start: 46.45, end: 48.15, who: 'elder', text: 'অথচ আমি কিছুই করতে পারলাম না।'}, // 23
  {start: 48.6, end: 51.55, who: 'elder', text: 'আর তুই নিজের চেষ্টায় এত বড় হয়ে গেলি।'}, // 24
  {start: 51.8, end: 53.25, who: 'younger', text: 'আবার সেই একই কথা!'}, // 25
  {start: 53.65, end: 54.75, who: 'younger', text: 'তুমি কি মনে করো,'}, // 26
  {start: 54.9, end: 56.8, who: 'younger', text: 'আমি কখনো তোমার কাছে কিছু চাইনি?'}, // 27
  {start: 57.2, end: 59.85, who: 'younger', text: 'ছোটবেলায় কতবার তোমার কাছে সাহায্য চেয়েছি।'}, // 28
  {start: 60.2, end: 61.5, who: 'younger', text: 'সব সময় কি পেয়েছি?'}, // 29
  {start: 61.8, end: 63.65, who: 'elder', text: 'তাহলে এখন আমাকে দোষ দিচ্ছিস?'}, // 30
  {start: 63.9, end: 66.0, who: 'elder', text: 'আমার কি ইচ্ছা ছিল না তোর জন্য কিছু করার?'}, // 31
  {start: 66.3, end: 68.05, who: 'elder', text: 'নিজের জীবনটাই তো গুছাতে পারিনি!'}, // 32
  {start: 68.4, end: 70.75, who: 'narrator', text: 'কথাগুলো শুনে ছোট ভাই চুপ হয়ে গেল।'}, // 33
  {start: 71.2, end: 73.55, who: 'narrator', text: 'বড় ভাইও বুঝতে পারল, রাগের মাথায়'}, // 34
  {start: 73.7, end: 76.7, who: 'narrator', text: 'এমন কিছু কথা বলে ফেলেছে, যা তার বলা উচিত হয়নি।'}, // 35
  {start: 77.3, end: 77.75, who: 'younger', text: 'ভাইয়া,'}, // 36
  {start: 78.1, end: 81.0, who: 'younger', text: 'তুমি জানো আমি কত কষ্ট করে এখানে এসেছি।'}, // 37
  {start: 81.3, end: 83.0, who: 'younger', text: 'কত রাত না ঘুমিয়ে পড়েছি।'}, // 38
  {start: 83.4, end: 85.95, who: 'younger', text: 'কতবার মনে হয়েছে আর পারব না।'}, // 39
  {start: 86.3, end: 87.7, who: 'younger', text: 'কিন্তু কখনো কি ভেবেছ,'}, // 40
  {start: 88.0, end: 90.05, who: 'younger', text: 'আমার সবচেয়ে বেশি কষ্ট হতো'}, // 41
  {start: 90.15, end: 93.55, who: 'younger', text: 'যখন দেখতাম তুমি নিজের জীবনটা নিয়ে হাল ছেড়ে দিচ্ছ?'}, // 42
  {start: 93.8, end: 94.6, who: 'elder', text: 'আমি জানি রে।'}, // 43
  {start: 95.1, end: 97.6, who: 'elder', text: 'তোর কষ্টের সময় তোকে সাহায্য করতে পারিনি।'}, // 44
  {start: 98.0, end: 100.55, who: 'elder', text: 'এই আফসোসটা আমার সারাজীবন থাকবে।'}, // 45
  {start: 100.9, end: 104.25, who: 'younger', text: 'তুমি আমার জন্য কিছু করতে পারোনি, এটা ঠিক না ভাইয়া।'}, // 46
  {start: 104.6, end: 105.8, who: 'younger', text: 'তুমি আমার বড় ভাই,'}, // 47
  {start: 106.1, end: 108.1, who: 'younger', text: 'তোমার জায়গাটা কেউ নিতে পারবে না।'}, // 48
  {start: 108.4, end: 109.8, who: 'younger', text: 'আমি আজ যা হয়েছি,'}, // 49
  {start: 110.0, end: 111.7, who: 'younger', text: 'তাতে তোমারও একটা অংশ আছে।'}, // 50
  {start: 112.0, end: 114.8, who: 'narrator', text: 'সেদিন দুই ভাইয়ের মধ্যে আর কোনো কথা হয়নি।'}, // 51
  {start: 115.2, end: 118.1, who: 'narrator', text: 'শুধু বড় ভাই ছোট ভাইকে বুকে জড়িয়ে ধরেছিল।'}, // 52
  {start: 118.6, end: 121.4, who: 'narrator', text: 'কিছু সম্পর্কের হিসাব টাকা দিয়ে মাপা যায় না।'}, // 53
  {start: 121.8, end: 124.0, who: 'narrator', text: 'কেউ হয়তো জীবনে অনেক কিছু দিতে পারে না,'}, // 54
  {start: 124.3, end: 126.4, who: 'narrator', text: 'কিন্তু তার ভালোবাসা আর উপস্থিতি'}, // 55
  {start: 126.65, end: 128.0, who: 'narrator', text: 'কখনো ছোট হয়ে যায় না।'}, // 56
  {start: 128.4, end: 129.7, who: 'narrator', text: 'আর একটা কথা মনে রাখবেন—'}, // 57
  {start: 130.1, end: 131.8, who: 'narrator', text: 'জীবনে সফল হওয়ার পর'}, // 58
  {start: 132.0, end: 135.4, who: 'narrator', text: 'নিজের মানুষগুলোর পুরোনো কষ্টগুলো ভুলে যাবেন না।'}, // 59
  {start: 135.8, end: 137.4, who: 'narrator', text: 'গল্পটা ভালো লাগলে লাইক দিন,'}, // 60
  {start: 137.55, end: 139.3, who: 'narrator', text: 'আপনার অনুভূতি কমেন্টে জানান,'}, // 61
  {start: 139.6, end: 141.8, who: 'narrator', text: 'আর এমন গল্প পেতে ফলো করে রাখুন।'}, // 62
];

export const CAPTIONS: {segs: number[]; keys: string[]}[] = [
  {segs: [0], keys: ["সংসার।"]},
  {segs: [1, 2], keys: ["বাবা,", "মা", "দুই"]},
  {segs: [3, 4], keys: ["টাকা", "খরচ"]},
  {segs: [5], keys: ["শেষ"]},
  {segs: [6], keys: ["গুছিয়ে"]},
  {segs: [7, 8], keys: ["ছোট", "কষ্ট"]},
  {segs: [9, 10], keys: ["অভাবে,", "বিসর্জন"]},
  {segs: [11], keys: ["বড়", "অফিসার।"]},
  {segs: [12], keys: ["সাফল্যের"]},
  {segs: [13], keys: ["চাপা", "কষ্ট"]},
  {segs: [14, 15], keys: ["অফিসার"]},
  {segs: [16, 17], keys: ["সাধারণ"]},
  {segs: [18], keys: ["ভাইয়া!"]},
  {segs: [19], keys: ["ভুলে"]},
  {segs: [20], keys: ["যাসনি,"]},
  {segs: [21], keys: ["কী", "পেরেছি"]},
  {segs: [22], keys: ["টাকা", "নষ্ট"]},
  {segs: [23], keys: ["কিছুই"]},
  {segs: [24], keys: ["নিজের", "চেষ্টায়"]},
  {segs: [25], keys: ["একই"]},
  {segs: [26, 27], keys: ["চাইনি?"]},
  {segs: [28], keys: ["ছোটবেলায়", "সাহায্য"]},
  {segs: [29], keys: ["পেয়েছি?"]},
  {segs: [30], keys: ["দোষ"]},
  {segs: [31], keys: ["ইচ্ছা"]},
  {segs: [32], keys: ["গুছাতে"]},
  {segs: [33], keys: ["চুপ"]},
  {segs: [34], keys: ["রাগের"]},
  {segs: [35], keys: ["উচিত", "হয়নি।"]},
  {segs: [36, 37], keys: ["কষ্ট"]},
  {segs: [38], keys: ["রাত", "ঘুমিয়ে"]},
  {segs: [39], keys: ["পারব", "না।"]},
  {segs: [40], keys: ["ভেবেছ,"]},
  {segs: [41], keys: ["বেশি", "কষ্ট"]},
  {segs: [42], keys: ["হাল", "ছেড়ে"]},
  {segs: [43, 44], keys: ["সাহায্য"]},
  {segs: [45], keys: ["আফসোসটা"]},
  {segs: [46], keys: ["ঠিক", "না"]},
  {segs: [47, 48], keys: ["বড়", "ভাই,", "জায়গাটা"]},
  {segs: [49, 50], keys: ["অংশ"]},
  {segs: [51], keys: ["কোনো", "কথা"]},
  {segs: [52], keys: ["বুকে", "জড়িয়ে"]},
  {segs: [53], keys: ["টাকা", "মাপা"]},
  {segs: [54], keys: ["অনেক", "কিছু"]},
  {segs: [55, 56], keys: ["ভালোবাসা", "উপস্থিতি"]},
  {segs: [57], keys: ["মনে", "রাখবেন—"]},
  {segs: [58], keys: ["সফল"]},
  {segs: [59], keys: ["পুরোনো", "কষ্টগুলো"]},
  {segs: [60], keys: ["লাইক"]},
  {segs: [61], keys: ["কমেন্টে"]},
  {segs: [62], keys: ["ফলো"]},
];

export const NAMES: Record<Who, string> = {elder: 'বড় ভাই', younger: 'ছোট ভাই', narrator: ''};

export const TOTAL_SEC = 143.5;

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
