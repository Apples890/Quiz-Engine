class AudioSystem {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    this.playTone(800, 0.05, 'square');
  }

  playSuccess() {
    if (!this.enabled || !this.audioContext) return;
    
    this.playTone(600, 0.1, 'sine');
    setTimeout(() => this.playTone(800, 0.1, 'sine'), 80);
    setTimeout(() => this.playTone(1000, 0.15, 'sine'), 160);
  }

  playError() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.3);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  playTransition() {
    if (!this.enabled || !this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * 0.15;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    gainNode.gain.value = 0.2;

    source.start(this.audioContext.currentTime);
  }
}

export const audioSystem = new AudioSystem();