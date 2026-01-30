import { motion } from 'framer-motion';
import { QuizRound } from '@/data/quizData';
import FramePanel from './ui/FramePanel';
import NeonButton from './ui/NeonButton';
import { cinematicSlideIn, energyBurst, goldShimmer } from '@/lib/animations';

interface AnswerRevealProps {
  round: QuizRound;
  onNext: () => void;
}

export default function AnswerReveal({ round, onNext }: AnswerRevealProps) {
  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(120deg,rgba(245,196,81,0.1),transparent_55%)]" />
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
            <div className="h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(245,196,81,0.35),transparent_70%)]" />
          </motion.div>
          <div className="text-5xl md:text-6xl font-orbitron font-black text-[var(--mlbb-gold)] mb-3">
            ✓ CORRECT
          </div>
          <div className="text-[var(--mlbb-teal)] font-share-tech text-lg">
            HERO IDENTIFIED
          </div>
        </div>

        <FramePanel className="mb-6 relative overflow-hidden" tone="victory">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={goldShimmer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>
          <div className="text-center">
            <motion.div
              className="text-sm text-[var(--mlbb-muted)] font-share-tech mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ANSWER: {round.correctAnswer}
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-gold)] to-[var(--mlbb-teal)] mb-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {round.heroName}
            </motion.h2>

            <motion.div
              className="text-lg text-[var(--mlbb-text)] font-rajdhani italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              "{round.heroSubtitle}"
            </motion.div>
          </div>
        </FramePanel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <FramePanel className="mb-8">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <div className="text-[var(--mlbb-gold)] font-rajdhani font-bold text-lg mb-2">
                  PRO TIP
                </div>
                <div className="text-[var(--mlbb-text)] font-rajdhani text-base leading-relaxed">
                  {round.proTip}
                </div>
              </div>
            </div>
          </FramePanel>
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <NeonButton onClick={onNext} variant="primary">
            NEXT ROUND →
          </NeonButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
