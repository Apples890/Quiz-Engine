import { motion } from 'framer-motion';
import FramePanel from './ui/FramePanel';
import NeonButton from './ui/NeonButton';
import GlitchText from './ui/GlitchText';
import { screenShake } from '@/lib/animations';

interface GameOverProps {
  playerName: string;
  score: number;
  totalRounds: number;
  onRetry: () => void;
  onMainHub: () => void;
}

export default function GameOver({ playerName, score, totalRounds, onRetry, onMainHub }: GameOverProps) {
  return (
    <motion.div
      className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden"
      variants={screenShake}
      initial="shake"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,93,0.3),transparent_70%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
          <div className="w-full h-full bg-[linear-gradient(120deg,rgba(255,77,93,0.2),transparent_45%,rgba(98,214,232,0.1))]" />
        </div>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,93,0.35),transparent_70%)]"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlitchText className="text-6xl md:text-7xl font-orbitron font-black text-[var(--mlbb-danger)] mb-4" animate>
            DEFEATED
          </GlitchText>
          <div className="text-[var(--mlbb-gold)] font-share-tech text-lg">
            ⚠ INCORRECT ANSWER DETECTED ⚠
          </div>
        </motion.div>

        <FramePanel tone="danger" className="mb-8">
          <div className="text-center space-y-6">
            <div>
              <div className="text-[var(--mlbb-muted)] font-share-tech text-sm mb-2">PLAYER</div>
              <div className="text-3xl font-orbitron font-bold text-[var(--mlbb-text)]">{playerName}</div>
            </div>

            <div className="border-t border-[rgba(255,77,93,0.3)] pt-6">
              <div className="text-[var(--mlbb-muted)] font-share-tech text-sm mb-2">ROUNDS CLEARED</div>
              <div className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-danger)] to-[var(--mlbb-gold)]">
                {score}/{totalRounds}
              </div>
            </div>

            <div className="border-t border-[rgba(255,77,93,0.3)] pt-6">
              <div className="text-[var(--mlbb-muted)] font-share-tech text-sm mb-2">FINAL SCORE</div>
              <motion.div
                className="text-4xl font-orbitron font-black text-[var(--mlbb-danger)]"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {score}
              </motion.div>
            </div>
          </div>
        </FramePanel>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NeonButton onClick={onRetry} variant="primary">
            RETRY RUN
          </NeonButton>
          <NeonButton onClick={onMainHub} variant="secondary">
            MAIN HUB
          </NeonButton>
        </div>

        <motion.div
          className="text-center mt-8 text-[var(--mlbb-danger)]/80 font-share-tech text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          COMMS LINK DISENGAGED
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
