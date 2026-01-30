import { motion } from 'framer-motion';
import { QuizRound } from '@/data/quizData';
import FramePanel from './ui/FramePanel';
import NeonButton from './ui/NeonButton';
import { cinematicSlideIn, energyBurst, goldShimmer, lightSweep } from '@/lib/animations';

interface AnswerRevealProps {
  round: QuizRound;
  onNext: () => void;
}

export default function AnswerReveal({ round, onNext }: AnswerRevealProps) {
  const hasImage = Boolean(round.imageUrl);

  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(120deg,rgba(245,196,81,0.1),transparent_55%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl"
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

        <FramePanel className="mb-8 relative overflow-hidden" tone="victory">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={goldShimmer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            <motion.div
              className="relative rounded-xl overflow-hidden mlbb-image-frame"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mlbb-image-aspect" />
              {hasImage ? (
                <img
                  src={round.imageUrl}
                  alt={round.heroName}
                  loading="lazy"
                  className="mlbb-image"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="mlbb-image-fallback" style={{ display: hasImage ? 'none' : 'flex' }}>
                <div className="text-center text-sm text-[var(--mlbb-muted)] font-share-tech">
                  ARTWORK UNAVAILABLE
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 mlbb-light-sweep" aria-hidden />
            </motion.div>

            <motion.div
              className="flex flex-col justify-center gap-2 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <motion.div
                className="text-sm text-[var(--mlbb-muted)] font-share-tech"
                variants={lightSweep}
                initial="hidden"
                animate="visible"
              >
                ANSWER: {round.correctAnswer}
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--mlbb-gold)] to-[var(--mlbb-teal)] leading-tight"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                {round.heroName}
              </motion.h2>

              <motion.div
                className="text-lg text-[var(--mlbb-text)] font-rajdhani italic leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                "{round.heroSubtitle}"
              </motion.div>

              <motion.div
                className="mt-2 mlbb-protip-card"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.25 }}
              >
                <div className="text-[var(--mlbb-gold)] font-rajdhani font-semibold text-sm mb-1 flex items-center gap-2">
                  <span className="text-base">💡</span> PRO TIP
                </div>
                <div className="text-[var(--mlbb-text)] font-rajdhani text-base leading-relaxed">
                  {round.proTip}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </FramePanel>

        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
          <NeonButton onClick={onNext} variant="primary">
            NEXT ROUND →
          </NeonButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
