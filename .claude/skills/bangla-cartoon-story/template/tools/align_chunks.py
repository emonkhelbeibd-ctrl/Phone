"""When the SRT is missing or its times don't match the audio:
1) find speech chunks from silences, 2) assign script lines to chunks by duration (DP),
3) print per-chunk pitch so you can confirm speakers (female ~220-310 Hz, male ~120-220 Hz).
Usage: python3 -I tools/align_chunks.py voice.mp3 lines.txt
lines.txt: one spoken line per row, in order. Review the output by hand: if a line looks
too short/long, move a chunk boundary (one chunk can hold two lines, or one line two chunks)."""
import sys, subprocess, re, json, unicodedata, wave, numpy as np, tempfile, os
audio, lines_path = sys.argv[1], sys.argv[2]
out = subprocess.run(['ffmpeg', '-i', audio, '-af', 'silencedetect=n=-35dB:d=0.3', '-f', 'null', '-'], capture_output=True, text=True).stderr
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', audio], capture_output=True, text=True).stdout)
sil = [float(x) for x in re.findall(r'silence_(?:start|end): ([0-9.]+)', out)]
chunks, s = [], 0.0
for i in range(0, len(sil) - 1, 2):
    if sil[i] > s: chunks.append((s, sil[i]))
    s = sil[i + 1]
if s < dur - 0.1: chunks.append((s, dur))
lines = [l.strip() for l in open(lines_path, encoding='utf-8') if l.strip()]
g = lambda t: sum(1 for c in t if not unicodedata.category(c).startswith('M') and c != ' ') + 2
w = [g(x) for x in lines]; rate = sum(b - a for a, b in chunks) / sum(w)
N, M = len(lines), len(chunks); INF = 1e18
dp = [[INF] * (M + 1) for _ in range(N + 1)]; bk = [[0] * (M + 1) for _ in range(N + 1)]; dp[0][0] = 0
for i in range(1, N + 1):
    for j in range(1, M + 1):
        for k in range(i - 1, j):
            if dp[i - 1][k] >= INF: continue
            d = sum(b - a for a, b in chunks[k:j]); e = (d - w[i - 1] * rate) ** 2 / (w[i - 1] * rate)
            if dp[i - 1][k] + e < dp[i][j]: dp[i][j] = dp[i - 1][k] + e; bk[i][j] = k
res, j = [], M
for i in range(N, 0, -1):
    k = bk[i][j]; res.append((i - 1, k, j)); j = k
res.reverse()
tmp = tempfile.mktemp(suffix='.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', audio, '-ac', '1', '-ar', '16000', tmp])
wv = wave.open(tmp); sr = wv.getframerate(); x = np.frombuffer(wv.readframes(wv.getnframes()), np.int16).astype(float); os.remove(tmp)
def pitch(a, b):
    seg = x[int(a * sr):int(b * sr)]; ps = []
    for k in range(0, len(seg) - 640, 320):
        f = seg[k:k + 640]
        if np.abs(f).mean() < 300: continue
        f = f - f.mean(); c = np.correlate(f, f, 'full')[639:]; lo, hi = int(sr / 400), int(sr / 70); l = lo + np.argmax(c[lo:hi])
        if c[l] > 0.3 * c[0]: ps.append(sr / l)
    return round(float(np.median(ps))) if ps else 0
for i, k, j in res:
    a, b = chunks[k][0], chunks[j - 1][1]
    print(f"{i:3d} {a:7.2f}-{b:7.2f} ({b - a:5.2f}s, expected {w[i] * rate:5.2f}) chunks={j - k} pitch={pitch(a, b)}Hz  {lines[i]}")
