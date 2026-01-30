import { motion } from 'framer-motion';
import FramePanel from './ui/FramePanel';
import NeonButton from './ui/NeonButton';
import { cinematicSlideIn, energyBurst, goldShimmer } from '@/lib/animations';

interface VictoryProps {
  playerName: string;
  totalRounds: number;
  onPlayAgain: () => void;
}

export default function Victory({ playerName, totalRounds, onPlayAgain }: VictoryProps) {
  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(245,196,81,0.12),transparent_55%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <div className="relative text-center mb-8">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={energyBurst}
            initial="hidden"
            animate="visible"
          >
            <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(245,196,81,0.35),transparent_70%)]" />
          </motion.div>

          <div className="text-7xl md:text-8xl mb-4">🏆</div>
          <div className="text-5xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-gold)] via-[var(--mlbb-teal)] to-[var(--mlbb-gold-soft)] mb-3">
            VICTORY
          </div>
          <motion.div
            className="text-2xl text-[var(--mlbb-teal)] font-rajdhani font-bold"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✓ PERFECT RUN ACHIEVED
          </motion.div>
        </div>

        <FramePanel tone="victory" className="mb-8 relative overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={goldShimmer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>
          <div className="text-center space-y-6">
            <div>
              <div className="text-[var(--mlbb-muted)] font-share-tech text-sm mb-2">CHAMPION</div>
              <div className="text-4xl font-orbitron font-bold text-[var(--mlbb-text)]">{playerName}</div>
            </div>

            <div className="border-t border-[rgba(245,196,81,0.3)] pt-6">
              <div className="text-[var(--mlbb-muted)] font-share-tech text-sm mb-2">FINAL SCORE</div>
              <motion.div
                className="text-6xl md:text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-gold)] to-[var(--mlbb-teal)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {totalRounds}/{totalRounds}
              </motion.div>
            </div>

            <div className="border-t border-[rgba(245,196,81,0.3)] pt-6">
              <div className="text-2xl text-[var(--mlbb-gold)] font-rajdhani font-bold">
                LEGENDARY MLBB MASTER
              </div>
              <div className="text-[var(--mlbb-text)] font-rajdhani mt-2">
                You’ve proven your knowledge of Mobile Legends!
              </div>
            </div>
          </div>
        </FramePanel>

        <div className="text-center">
          <NeonButton onClick={onPlayAgain} variant="primary" className="min-w-[250px]">
            PLAY AGAIN
          </NeonButton>
        </div>

        <motion.div
          className="text-center mt-8 text-[var(--mlbb-gold)]/80 font-share-tech text-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚡ LEGENDARY STATUS UNLOCKED ⚡
        </motion.div>
      </motion.div>
    </div>
  );
}
