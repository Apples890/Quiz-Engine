import { motion } from 'framer-motion';
import NeonPanel from './ui/NeonPanel';
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
      className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden"
      variants={screenShake}
      initial="shake"
    >
      {/* Glitch overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/20162957-fc84-41de-8707-48dafdccb6b8.png"
          alt="Glitch"
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
      </div>

      {/* Red vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,0,64,0.3)_100%)]" />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlitchText className="text-7xl font-orbitron font-black text-red-500 mb-4" animate>
            SYSTEM FAILURE
          </GlitchText>
          <div className="text-yellow-400 font-share-tech text-xl">
            ⚠ INCORRECT ANSWER DETECTED ⚠
          </div>
        </motion.div>

        <NeonPanel glowColor="pink" className="mb-8">
          <div className="text-center space-y-6">
            <div>
              <div className="text-cyan-400/80 font-share-tech text-sm mb-2">
                PLAYER
              </div>
              <div className="text-3xl font-orbitron font-bold text-white">
                {playerName}
              </div>
            </div>

            <div className="border-t border-pink-500/30 pt-6">
              <div className="text-cyan-400/80 font-share-tech text-sm mb-2">
                ROUNDS CLEARED
              </div>
              <div className="text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                {score}/{totalRounds}
              </div>
            </div>

            <div className="border-t border-pink-500/30 pt-6">
              <div className="text-cyan-400/80 font-share-tech text-sm mb-2">
                FINAL SCORE
              </div>
              <motion.div
                className="text-5xl font-orbitron font-black text-pink-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {score}
              </motion.div>
            </div>
          </div>
        </NeonPanel>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NeonButton onClick={onRetry} variant="primary">
            RETRY RUN
          </NeonButton>
          <NeonButton onClick={onMainHub} variant="secondary">
            MAIN HUB
          </NeonButton>
        </div>

        <motion.div
          className="text-center mt-8 text-red-500/60 font-share-tech text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          CONNECTION TERMINATED
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
