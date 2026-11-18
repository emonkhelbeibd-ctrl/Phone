"""SRT -> SEGS entries for src/timeline.ts.
Usage: python3 tools/srt2timeline.py voice.srt speakers.txt > segs.txt
speakers.txt: one speaker id per SRT cue (e.g. wife / husband / narrator), same order.
Strips quotes from SRT text (captions add their own quotes for dialogue).
Fix spelling to match the user's script by hand afterwards."""
import sys
def ts(x):
    h, m, r = x.strip().split(':'); s, ms = r.split(','); return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000
blocks = open(sys.argv[1], encoding='utf-8').read().strip().split('\n\n')
who = [l.strip() for l in open(sys.argv[2], encoding='utf-8') if l.strip()] if len(sys.argv) > 2 else []
for i, b in enumerate(blocks):
    L = b.strip().split('\n'); a, e = L[1].split(' --> ')
    t = ' '.join(L[2:]).replace('"', '').replace("'", '’').strip()
    w = who[i] if i < len(who) else 'narrator'
    print(f"  {{start: {round(ts(a), 2)}, end: {round(ts(e), 2)}, who: '{w}', text: '{t}'}}, // {i}")
