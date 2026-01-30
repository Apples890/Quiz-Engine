import { motion } from 'framer-motion';
import NeonButton from './ui/NeonButton';
import FramePanel from './ui/FramePanel';
import { audioSystem } from '@/lib/audioSystem';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { cinematicSlideIn, goldShimmer } from '@/lib/animations';

interface MainHubProps {
  playerName: string;
  onStart: () => void;
}

export default function MainHub({ playerName, onStart }: MainHubProps) {
  const [soundEnabled, setSoundEnabled] = useState(audioSystem.isEnabled());

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audioSystem.setEnabled(newState);
    if (newState) {
      audioSystem.playClick();
    }
  };

  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.14),transparent_60%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(140deg,rgba(245,196,81,0.1),transparent_50%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <FramePanel className="relative overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={goldShimmer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>

          <div className="text-center">
            <div className="text-[var(--mlbb-muted)] font-share-tech text-sm tracking-[0.4em]">
              COMMAND CENTER
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-rajdhani font-semibold text-[var(--mlbb-text)]">
              WELCOME, {playerName}
            </div>

            <div className="mt-6 text-5xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-gold)] via-[var(--mlbb-teal)] to-[var(--mlbb-gold-soft)]">
              MLBB QUIZ
            </div>
            <div className="mt-3 text-xl md:text-2xl font-orbitron font-bold text-[var(--mlbb-teal)]">
              ESPORTS CHALLENGE
            </div>
          </div>

          <div className="mt-10 grid gap-3 text-center">
            <div className="text-[var(--mlbb-gold)] font-rajdhani font-bold text-xl tracking-widest">
              ⚔️ EXTREME SERIES ⚔️
            </div>
            <div className="text-[var(--mlbb-text)] font-rajdhani text-lg">
              6 ROUNDS • SUDDEN DEATH • SHUFFLE ENABLED
            </div>
            <div className="text-[var(--mlbb-danger)] font-rajdhani text-base">
              ONE WRONG ANSWER = DEFEAT
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NeonButton onClick={onStart} variant="primary" className="min-w-[200px]">
              ENTER MATCH
            </NeonButton>

            <motion.button
              onClick={toggleSound}
              className="mlbb-focus-ring relative inline-flex items-center gap-2 rounded-xl border border-[rgba(245,196,81,0.4)] px-5 py-3 text-[var(--mlbb-gold)] bg-[rgba(9,15,34,0.7)] hover:bg-[rgba(245,196,81,0.15)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span className="text-sm font-share-tech tracking-[0.2em]">
                SOUND {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </motion.button>
          </div>

          <motion.div
            className="mt-8 text-center text-[var(--mlbb-muted)] font-share-tech text-sm"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PRESS ENTER MATCH WHEN READY
          </motion.div>
        </FramePanel>
      </motion.div>
    </div>
  );
}
