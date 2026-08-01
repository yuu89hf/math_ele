/**
 * Audio Synthesizer & BGM Controller Module (Math Learning Studio)
 * Provides Web Audio API synthesized SFX & ambient background music.
 */
export class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.initCtx();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    }

    playStepSuccess() {
        if (!this.enabled) return;
        this.initCtx();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.1);
            osc.frequency.setValueAtTime(783.99, now + 0.2);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(now + 0.35);
        } catch (e) {}
    }

    playError() {
        if (!this.enabled) return;
        this.initCtx();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.setValueAtTime(180, now + 0.1);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(now + 0.25);
        } catch (e) {}
    }

    playVictory() {
        if (!this.enabled) return;
        this.initCtx();
        if (!this.ctx) return;

        try {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + (i * 0.12);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.4);
            });
        } catch (e) {}
    }
}

export class BGMController {
    constructor() {
        if (window.bgmPlayerInstance) {
            return window.bgmPlayerInstance;
        }

        this.isPlaying = false;
        this.synthTimer = null;
        this.ctx = null;

        const savedBgm = localStorage.getItem('math_bgm_active');
        if (savedBgm === 'on') {
            this.isPlaying = false; // user interaction required to start audio
        }

        window.bgmPlayerInstance = this;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playSynthChord() {
        if (!this.isPlaying) return;
        this.initCtx();
        if (!this.ctx) return;

        try {
            // Calm ambient pentatonic arpeggio chords
            const chordProgressions = [
                [261.63, 329.63, 392.00, 523.25], // C Major
                [220.00, 261.63, 329.63, 440.00], // A Minor
                [174.61, 220.00, 261.63, 349.23], // F Major
                [196.00, 246.94, 293.66, 392.00]  // G Major
            ];

            const chord = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];
            const now = this.ctx.currentTime;

            chord.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = now + (idx * 0.25);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.001, startTime);
                gain.gain.linearRampToValueAtTime(0.04, startTime + 0.3);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 2.6);
            });
        } catch (e) {}
    }

    startSynthBGM() {
        this.isPlaying = true;
        this.playSynthChord();
        if (this.synthTimer) clearInterval(this.synthTimer);
        this.synthTimer = setInterval(() => {
            if (this.isPlaying) {
                this.playSynthChord();
            }
        }, 3200);
    }

    stopSynthBGM() {
        this.isPlaying = false;
        if (this.synthTimer) {
            clearInterval(this.synthTimer);
            this.synthTimer = null;
        }
    }

    toggleBGM() {
        if (this.isPlaying) {
            this.stopSynthBGM();
            localStorage.setItem('math_bgm_active', 'off');
            return false;
        } else {
            this.startSynthBGM();
            localStorage.setItem('math_bgm_active', 'on');
            return true;
        }
    }
}
