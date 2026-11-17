/**
 * Sound synthesis using Web Audio API and Speech Synthesis
 * Zero external audio assets required, guaranteed reliable across all environments.
 */

export const PRAISE_LIST = [
  'NICE!',
  'GREAT!',
  'AWESOME!',
  'AMAZING!',
  'FANTASTIC!',
  'BRILLIANT!',
  'MARVELOUS!',
  'INCREDIBLE!',
  'PERFECT!',
  'WELL DONE!',
  'EXCELLENT!',
  'YOU DID IT!',
  'GOOD JOB!',
] as const;

let shuffledPraises: string[] = [];
let praiseIndex = 0;

function refillPraiseDeck(lastSpoken?: string) {
  const copy = [...PRAISE_LIST];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  if (lastSpoken && copy[0] === lastSpoken && copy.length > 1) {
    [copy[0], copy[copy.length - 1]] = [copy[copy.length - 1], copy[0]];
  }
  shuffledPraises = copy;
  praiseIndex = 0;
}

export function getNextPraise(): string {
  const previous = praiseIndex > 0 ? shuffledPraises[praiseIndex - 1] : undefined;
  if (shuffledPraises.length === 0 || praiseIndex >= shuffledPraises.length) {
    refillPraiseDeck(previous);
  }
  const praise = shuffledPraises[praiseIndex];
  praiseIndex += 1;
  return praise;
}

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  }

  public playCollectWhoosh() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [587.33, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const t = this.ctx.currentTime + idx * 0.045;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch {
      // ignore
    }
  }

  public playStep() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  public playJump() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }

  public playStarCollect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.22);
      });
    } catch {
      // ignore
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const melody = [
        { f: 523.25, t: 0.0, d: 0.1 },
        { f: 659.25, t: 0.1, d: 0.1 },
        { f: 783.99, t: 0.2, d: 0.1 },
        { f: 1046.5, t: 0.3, d: 0.32 },
      ];
      melody.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, this.ctx.currentTime + item.t);
        gain.gain.setValueAtTime(0.22, this.ctx.currentTime + item.t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + item.t);
        osc.stop(this.ctx.currentTime + item.t + item.d + 0.02);
      });
    } catch {
      // ignore
    }
  }

  public playMonsterDefeat() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // ignore
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {
      // ignore
    }
  }

  public playChestFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.0],
        [659.25, 830.61, 987.77],
        [1046.5, 1318.51, 1567.98],
      ];
      chords.forEach((chord, i) => {
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = this.ctx.currentTime + i * 0.15;
          const duration = i === chords.length - 1 ? 0.8 : 0.2;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + duration + 0.05);
        });
      });
    } catch {
      // ignore
    }
  }

  public playBlastAttack() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch {
      // ignore
    }
  }

  public playMonsterHit() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // ignore
    }
  }

  public playVictoryBarakallah() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, t: 0.0, d: 0.12 },
        { f: 659.25, t: 0.12, d: 0.12 },
        { f: 783.99, t: 0.24, d: 0.12 },
        { f: 1046.5, t: 0.36, d: 0.22 },
        { f: 1174.66, t: 0.54, d: 0.42 },
      ];
      notes.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, this.ctx.currentTime + item.t);
        gain.gain.setValueAtTime(0.22, this.ctx.currentTime + item.t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + item.t);
        osc.stop(this.ctx.currentTime + item.t + item.d + 0.02);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundEffects();

/**
 * Clean English Text-to-Speech helper tuned for Grade 2 SD students.
 * Prevents audio collisions by canceling any active utterance first.
 */
export function speakEnglish(text: string, onEnd?: () => void, rate: number = 0.82) {
  if (sounds.getMuted() || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/_+/g, 'blank').replace(/[!]+/g, '.');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.08;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Jenny') ||
          v.name.includes('Female'))
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    onEnd?.();
  }
}

/**
 * Plays a cheerful sound + speaks an English praise phrase without audio overlap.
 */
export function triggerSuccessPraise(customPraise?: string): string {
  const praise = customPraise || getNextPraise();
  sounds.playCorrect();
  setTimeout(() => {
    speakEnglish(praise.replace('!', ''), undefined, 0.9);
  }, 180);
  return praise;
}
