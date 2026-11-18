"""Synthesise a soft music bed + transition SFX that follow the story's mood.
Writes public/bed.wav (44.1kHz stereo). Music sits ~22 dB under the voice."""
import numpy as np, wave, sys
SR = 44100
DUR = 89.6
N = int(SR * DUR)
out = np.zeros(N)
t_all = np.arange(N) / SR

NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
def hz(name, octv):
    return 440.0 * 2 ** ((NOTE[name] + 12 * (octv + 1) - 69) / 12)
CHORDS = {
    'Am': [('A', 2), ('C', 3), ('E', 3), ('A', 3)],
    'F':  [('F', 2), ('A', 2), ('C', 3), ('F', 3)],
    'C':  [('C', 3), ('E', 3), ('G', 3), ('C', 4)],
    'G':  [('G', 2), ('B', 2), ('D', 3), ('G', 3)],
    'Em': [('E', 2), ('G', 2), ('B', 2), ('E', 3)],
}

def add(sig, start):
    i = int(start * SR)
    if i >= N: return
    j = min(N, i + len(sig))
    out[i:j] += sig[: j - i]

def pluck(f, dur=1.6, amp=0.2):
    t = np.arange(int(SR * dur)) / SR
    env = np.exp(-t * 3.2) * np.minimum(1, t * 200)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    return amp * env * s

def pad(freqs, dur, amp=0.06):
    t = np.arange(int(SR * dur)) / SR
    env = np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 1.2)
    s = sum(np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * 0.2 * t)) + 0.5 * np.sin(2 * np.pi * f * 1.003 * t) for f in freqs)
    return amp * env * s / len(freqs)

def kick(amp=0.35):
    t = np.arange(int(SR * 0.35)) / SR
    f = 50 + 70 * np.exp(-t * 30)
    return amp * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)

def whoosh(dur=0.45, amp=0.18):
    n = int(SR * dur); t = np.arange(n) / SR
    noise = np.random.default_rng(1).standard_normal(n)
    # crude band sweep: moving average of varying width
    env = np.sin(np.pi * t / dur) ** 2
    k = np.convolve(noise, np.ones(12) / 12, mode='same')
    return amp * env * k

def chime(f=1046.5, amp=0.08):
    t = np.arange(int(SR * 1.5)) / SR
    return amp * np.exp(-t * 4) * (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.01 * t))

# (start, end, progression, bpm, style)
SECTIONS = [
    (0.0, 19.4, ['Am', 'F', 'C', 'G'], 66, 'sad'),
    (19.4, 30.7, ['F', 'Am', 'C', 'G'], 64, 'sad'),
    (30.7, 45.0, ['F', 'C', 'G', 'Am'], 72, 'warm'),
    (45.0, 74.1, ['C', 'G', 'Am', 'F'], 72, 'warm'),
    (74.1, 89.6, ['C', 'G', 'Am', 'F'], 76, 'hope'),
]
for a, b, prog, bpm, style in SECTIONS:
    beat = 60 / bpm
    bar = beat * 4
    t = a; k = 0
    while t < b - 0.2:
        ch = CHORDS[prog[k % len(prog)]]
        freqs = [hz(n, o) for n, o in ch]
        bl = min(bar, b - t)
        add(pad(freqs, bl + 0.6, amp=0.05 if style != 'tense' else 0.045), t)
        if style == 'tense':
            for q in range(4):  # heartbeat pulse
                if t + q * beat < b: add(kick(0.28), t + q * beat); add(kick(0.16), t + q * beat + 0.22)
            add(pluck(freqs[0] / 2, 2.0, 0.12), t)
        else:
            arp = [0, 1, 2, 3, 2, 1, 2, 3] if style != 'sad' else [0, 2, 3, 2]
            step = bar / len(arp)
            for q, idx in enumerate(arp):
                if t + q * step < b:
                    add(pluck(freqs[idx] * (2 if style == 'hope' else 1), 1.4, 0.10 if style == 'sad' else 0.09), t + q * step)
            if style in ('warm', 'hope'):
                for q in range(4):
                    if t + q * beat < b: add(kick(0.12 if q % 2 == 0 else 0.07), t + q * beat)
        t += bar; k += 1

# fades between sections and at the end
for a, b, *_ in SECTIONS:
    i, j = int(a * SR), int(b * SR)
    seg = out[i:j]; n = len(seg); fl = int(SR * 0.8)
    if n > 2 * fl:
        seg[:fl] *= np.linspace(0, 1, fl); seg[-fl:] *= np.linspace(1, 0, fl)
end_f = int(SR * 4); out[-end_f:] *= np.linspace(1, 0, end_f)

# level: music ~22 dB under the voice's mean level
voice_mean_db = float(sys.argv[1]) if len(sys.argv) > 1 else -26.0
rms = np.sqrt(np.mean(out ** 2)) + 1e-9
target = 10 ** ((voice_mean_db - 22) / 20)
out *= target / rms

# SFX on scene transitions and a few story beats (slightly louder than the bed)
SCENES = [6.25, 12.35, 19.4, 25.9, 30.7, 36.6, 39.55, 45.0, 50.1, 57.1, 63.3, 74.1, 81.2]
sfx = np.zeros(N)
def add_s(sig, start):
    i = int(start * SR); j = min(N, i + len(sig)); sfx[i:j] += sig[: j - i]
for s in SCENES: add_s(whoosh(), s - 0.15)
for s in [55.0, 79.9, 82.4, 84.2, 87.3]: add_s(chime(), s)
sfx *= 10 ** ((voice_mean_db - 14) / 20) / (np.sqrt(np.mean(sfx[sfx != 0] ** 2)) + 1e-9) * 0.5
mix = out + sfx
peak = np.max(np.abs(mix));
if peak > 0.9: mix *= 0.9 / peak
st = np.stack([mix, mix], axis=1)
pcm = (st * 32767).astype(np.int16)
w = wave.open('public/bed.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok', round(20 * np.log10(np.sqrt(np.mean(out ** 2))), 1), 'dB music mean')
