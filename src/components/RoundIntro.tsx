import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { QuizRound } from '@/data/quizData';
import FramePanel from './ui/FramePanel';
import { cinematicSlideIn, lightSweep } from '@/lib/animations';

interface RoundIntroProps {
  round: QuizRound;
  roundNumber: number;
  totalRounds: number;
  onComplete: () => void;
}

export default function RoundIntro({ round, roundNumber, totalRounds, onComplete }: RoundIntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(120deg,rgba(245,196,81,0.1),transparent_50%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <FramePanel className="relative overflow-hidden text-center">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={lightSweep}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>

          <motion.div
            className="text-[var(--mlbb-muted)] font-share-tech text-sm tracking-[0.4em] mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            ROUND BRIEFING
          </motion.div>

          <div className="text-6xl md:text-7xl font-orbitron font-black text-[var(--mlbb-gold)] mb-3">
            {roundNumber}/{totalRounds}
          </div>

          <motion.h2
            className="text-3xl md:text-4xl font-orbitron font-bold text-[var(--mlbb-text)] mb-4"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {round.title}
          </motion.h2>

          <motion.div
            className="text-[var(--mlbb-teal)] text-2xl font-rajdhani font-semibold mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DIFFICULTY: {round.difficulty}
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-3 border border-[rgba(98,214,232,0.5)] px-8 py-3 text-[var(--mlbb-gold)] font-rajdhani font-semibold text-lg rounded-full bg-[rgba(8,14,32,0.7)]"
            animate={{ boxShadow: ['0 0 15px rgba(98,214,232,0.2)', '0 0 30px rgba(98,214,232,0.45)', '0 0 15px rgba(98,214,232,0.2)'] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            PREPARE YOURSELF
          </motion.div>
        </FramePanel>
      </motion.div>
    </div>
  );
}
