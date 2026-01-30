import { motion } from 'framer-motion';
import NeonPanel from './ui/NeonPanel';
import NeonButton from './ui/NeonButton';
import GlitchText from './ui/GlitchText';

interface VictoryProps {
  playerName: string;
  totalRounds: number;
  onPlayAgain: () => void;
}

export default function Victory({ playerName, totalRounds, onPlayAgain }: VictoryProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Victory background */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/7ac5bad4-dbd0-43c6-82d1-097104b980df.png"
          alt="Victory"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.div>
          
          <GlitchText className="text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 mb-4">
            RUN COMPLETE
          </GlitchText>
          
          <motion.div
            className="text-2xl text-green-400 font-rajdhani font-bold"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✓ PERFECT SCORE ACHIEVED
          </motion.div>
        </motion.div>

        <NeonPanel glowColor="cyan" className="mb-8">
          <div className="text-center space-y-6">
            <div>
              <div className="text-cyan-400/80 font-share-tech text-sm mb-2">
                CHAMPION
              </div>
              <div className="text-4xl font-orbitron font-bold text-white">
                {playerName}
              </div>
            </div>

            <div className="border-t border-cyan-500/30 pt-6">
              <div className="text-cyan-400/80 font-share-tech text-sm mb-2">
                FINAL SCORE
              </div>
              <motion.div
                className="text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    '0 0 20px rgba(255,190,11,0.5)',
                    '0 0 40px rgba(255,190,11,0.8)',
                    '0 0 20px rgba(255,190,11,0.5)',
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {totalRounds}/{totalRounds}
              </motion.div>
            </div>

            <div className="border-t border-cyan-500/30 pt-6">
              <div className="text-2xl text-pink-500 font-rajdhani font-bold">
                LEGENDARY MLBB MASTER
              </div>
              <div className="text-cyan-400 font-rajdhani mt-2">
                You've proven your knowledge of Mobile Legends!
              </div>
            </div>
          </div>
        </NeonPanel>

        <div className="text-center">
          <NeonButton onClick={onPlayAgain} variant="primary" className="min-w-[250px]">
            PLAY AGAIN
          </NeonButton>
        </div>

        <motion.div
          className="text-center mt-8 text-yellow-400/80 font-share-tech text-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚡ LEGENDARY STATUS UNLOCKED ⚡
        </motion.div>
      </motion.div>
    </div>
  );
}