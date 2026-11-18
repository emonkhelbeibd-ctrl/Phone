# টেমপ্লেট API (template/src)

## ফাইল
- `config.ts` — WIDTH/HEIGHT/FPS, রং `C`, ফন্ট, `sec(s)`।
- `timeline.ts` — `SEGS` (start,end,who,text), `CAPTIONS` (segs, keys), `NAMES` (বক্তা-লেবেল), `TOTAL_SEC`, `wordAt(seg, word)`, `talkAt`।
- `kit.tsx` — `useAt()` → `{at(sec), w(seg,'শব্দ'), s(seg)}` (দৃশ্যের লোকাল ফ্রেম); `Cam`, `At`, `Tint`, `Ring`, `typed`, `Enter`/`Tr`, ধ্রুবক `OV FY SY RY`, `clamp`, `ease`।
- `Story.tsx` — `SCENES: [start, end, Component, transition][]`; প্রতিটা দৃশ্য `Sequence` + `SceneStart.Provider` + `Enter`; শেষে `Captions`, `Audio voice.mp3`, `Audio bed.wav`।
- `Root.tsx`/`index.ts` — কম্পোজিশন `Story`, ফন্ট লোড।

## চরিত্র (`characters/`)
- `Char` props: `who, x, y (পায়ের রেখা), s=1.3, flip, pose, face, look(-1..1), delay, sit, walkFrom, walk=[from,to], tilt(deg), dim(0..1)`।
- `who`: দম্পতি `husband|wife` (CouplePerson) অথবা `LOOKS`-এর যেকোনো id (Person)। `talkAt` স্বয়ংক্রিয়ভাবে `SEGS`-এর `who` মিলিয়ে মুখ নাড়ায় — তাই চরিত্র-id আর timeline-এর বক্তা-id এক রাখো।
- নতুন ভঙ্গি: `parts.tsx`-এর `ARMS` (দুই হাতের ৩-বিন্দু পথ, শরীরের নিজস্ব স্থানাঙ্কে, সামনে = +x)।

## UI (`ui/`)
`TitleChip text`, `PopIn x y delay rot scale`, `Stamp text x y delay rot size`, `ListRow n text y delay`, `Captions`।

## প্রপ
- `props/Props.tsx`: `Bubble (thought, tail)`, `Heart`, `Sparkle`, `RedX`, `Check`, `Sweat`, `Bulb`, `CalendarPage`, `FriedEgg`, `Pan`, `Spatula`।
- `props/StoryProps.tsx`: `Book`, `GradCap`, `Laptop`, `Note (টাকা)`, `Coin`, `Office`, `Gift`, `Bundle`, `EmptyPot`, `Arrow`, `Desk`।
- `props/Couple.tsx`: `BigPhone`, `Briefcase`, `House`, `Jar`, `Clock`, `HeartBroken split`, `Balance tilt left right`, `HoldingHands join`, `OpenBook open (children)`, `SocialBtn kind active`, `Chip`।
- `props/Mood.tsx`: `RainCloud t rain`, `ScribbleBubble`, `SmileMask`, `Temple gap roof`, `WeekStrip reveal cloud`, `Tear`।

## পটভূমি
- `backgrounds/Home.tsx`: `LivingRoom t night rain lamp`, `Sofa cx y w night`, `Night t color glow` (পেস্টেল আবেগ-পটভূমি)।
- `backgrounds/Roof.tsx`: `Rooftop t warm`, `Bench`।
- `backgrounds/Backgrounds.tsx`: `CityDay`, `Room`, `Kitchen`, `GoldRays`, `Sunburst`, `DarkGlow` (গাঢ় — এড়িয়ে চলো)।

## টুল (`tools/`)
- `srt2timeline.py voice.srt speakers.txt` → SEGS লাইন।
- `align_chunks.py voice.mp3 lines.txt` → বিরতি-ভিত্তিক সময় + পিচ।
- `make_bed.py <voice_dB> tools/bed.json` → `public/bed.wav`।

## কমান্ড
```
cp -r <skill>/template video-<slug> && cd video-<slug> && npm ci
cp <upload>.mp3 public/voice.mp3
ffmpeg -hide_banner -i public/voice.mp3 -af volumedetect -f null /dev/null 2>&1 | grep mean_volume
python3 tools/make_bed.py -23
npx remotion still Story s.png --frame=300 --scale=0.25 --log=error
npx remotion render Story out/<slug>.mp4 --codec h264 --crf 18 --concurrency=4 --log=error
```
