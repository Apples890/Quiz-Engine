import { motion } from 'framer-motion';
import { QuizRound } from '@/data/quizData';
import NeonPanel from './ui/NeonPanel';
import NeonButton from './ui/NeonButton';
import GlitchText from './ui/GlitchText';

interface AnswerRevealProps {
  round: QuizRound;
  onNext: () => void;
}

export default function AnswerReveal({ round, onNext }: AnswerRevealProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/f7e4a09e-4991-46ba-a95f-8e89c48eea9a.png"
          alt="Neon Grid"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlitchText className="text-6xl font-orbitron font-black text-green-400 mb-4">
            ✓ CORRECT
          </GlitchText>
          <div className="text-cyan-400 font-share-tech text-lg">
            ACCESS GRANTED
          </div>
        </motion.div>

        <NeonPanel glowColor="cyan" className="mb-6">
          <div className="text-center">
            <motion.div
              className="text-sm text-cyan-400/80 font-share-tech mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ANSWER: {round.correctAnswer}
            </motion.div>
            
            <motion.h2
              className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {round.heroName}
            </motion.h2>
            
            <motion.div
              className="text-xl text-pink-500 font-rajdhani italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              "{round.heroSubtitle}"
            </motion.div>
          </div>
        </NeonPanel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <NeonPanel glowColor="yellow" className="mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <div className="text-yellow-400 font-rajdhani font-bold text-lg mb-2">
                  PRO TIP:
                </div>
                <div className="text-white font-rajdhani text-base leading-relaxed">
                  {round.proTip}
                </div>
              </div>
            </div>
          </NeonPanel>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <NeonButton onClick={onNext} variant="primary">
            NEXT ROUND →
          </NeonButton>
        </motion.div>
      </motion.div>
    </div>
  );
}