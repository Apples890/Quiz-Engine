import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { QuizRound } from '@/data/quizData';
import GlitchText from './ui/GlitchText';

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
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-cyan-400/80 font-share-tech text-xl mb-4"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ROUND LOADING...
        </motion.div>

        <GlitchText className="text-8xl font-orbitron font-black text-cyan-400 mb-4" animate>
          {roundNumber}/{totalRounds}
        </GlitchText>

        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-pink-500 mb-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {round.title}
        </motion.h2>

        <motion.div
          className="text-yellow-400 text-3xl mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          DIFFICULTY: {round.difficulty}
        </motion.div>

        <motion.div
          className="inline-block border-2 border-cyan-400 px-8 py-3 text-cyan-400 font-rajdhani font-semibold text-lg"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(0,240,255,0.3)',
              '0 0 40px rgba(0,240,255,0.6)',
              '0 0 20px rgba(0,240,255,0.3)',
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          PREPARE YOURSELF
        </motion.div>
      </motion.div>
    </div>
  );
}