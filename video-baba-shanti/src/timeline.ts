// Speech segments measured from voice.mp3 (silence detection -35dB / 0.25s).
// Text from the user's SRT + script (spelling fixed: টানাপোড়েন, কী).
export type Who = 'uncle' | 'father' | 'narrator';

export type Seg = {start: number; end: number; who: Who; text: string};

export const SEGS: Seg[] = [
  {start: 0.0, end: 1.35, who: 'uncle', text: 'পোলারে চাকরিতে দিয়া দে।'},
  {start: 1.97, end: 4.41, who: 'father', text: 'আমার পোলারে চাকরিতে দিমু নাকি পড়ামু,'},
  {start: 4.75, end: 5.91, who: 'father', text: 'সেটা আমি ভালো বুঝি।'},
  {start: 6.64, end: 7.91, who: 'narrator', text: 'সংসারে অভাব ছিল,'},
  {start: 8.35, end: 9.19, who: 'narrator', text: 'টানাপোড়েন ছিল।'},
  {start: 9.62, end: 12.09, who: 'narrator', text: 'বাবা একাই সংসারের সব দায়িত্ব সামলাতেন।'},
  {start: 12.58, end: 15.17, who: 'narrator', text: 'কিন্তু ছেলেকে পড়াশোনা করানোর স্বপ্নটা ছাড়েননি।'},
  {start: 15.64, end: 17.11, who: 'narrator', text: 'অনেক কষ্টে ছেলেকে পড়ালেন।'},
  {start: 17.55, end: 20.08, who: 'narrator', text: 'ছেলেও পড়াশোনার পাশাপাশি ফ্রিল্যান্সিং শিখল,'},
  {start: 20.4, end: 20.99, who: 'narrator', text: 'আয় করল।'},
  {start: 21.35, end: 23.44, who: 'narrator', text: 'সেই টাকা দিয়ে নিজের পড়াশোনা চালিয়ে গেল।'},
  {start: 23.93, end: 26.96, who: 'narrator', text: 'একসময় পড়াশোনা শেষ করে একটি কোম্পানিতে চাকরি পেল।'},
  {start: 27.33, end: 29.45, who: 'narrator', text: 'এখন নিজের সামর্থ্য অনুযায়ী বাবা-মায়ের'},
  {start: 29.45, end: 31.8, who: 'narrator', text: 'ছোট ছোট ইচ্ছেগুলো পূরণ করার চেষ্টা করে।'},
  {start: 32.36, end: 35.87, who: 'narrator', text: 'একজন বাবার কাছে এর চেয়ে বড় শান্তি আর কী হতে পারে!'},
];

export const CAPTIONS: {segs: number[]; keys: string[]}[] = [
  {segs: [0], keys: ['চাকরিতে']},
  {segs: [1], keys: ['পড়ামু,']},
  {segs: [2], keys: ['ভালো', 'বুঝি।']},
  {segs: [3, 4], keys: ['অভাব', 'টানাপোড়েন']},
  {segs: [5], keys: ['একাই', 'দায়িত্ব']},
  {segs: [6], keys: ['স্বপ্নটা']},
  {segs: [7], keys: ['কষ্টে']},
  {segs: [8, 9], keys: ['ফ্রিল্যান্সিং', 'আয়']},
  {segs: [10], keys: ['নিজের', 'পড়াশোনা']},
  {segs: [11], keys: ['চাকরি', 'পেল।']},
  {segs: [12], keys: ['সামর্থ্য', 'বাবা-মায়ের']},
  {segs: [13], keys: ['ইচ্ছেগুলো', 'পূরণ']},
  {segs: [14], keys: ['বড়', 'শান্তি']},
];

export const NAMES: Record<Who, string> = {uncle: 'চাচা', father: 'বাবা', narrator: ''};

export const TOTAL_SEC = 37.0;

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

export const captionStart = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].start;
export const captionWho = (ci: number) => SEGS[CAPTIONS[ci].segs[0]].who;

export const talkAt = (who: string, t: number) => {
  const s = SEGS.find((x) => x.who === who && t >= x.start && t <= x.end);
  if (!s) return 0;
  return Math.abs(Math.sin(t * 17)) * 0.7 + Math.abs(Math.sin(t * 7.3)) * 0.3;
};
