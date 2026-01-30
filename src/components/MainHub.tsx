import { motion } from 'framer-motion';
import NeonButton from './ui/NeonButton';
import GlitchText from './ui/GlitchText';
import { audioSystem } from '@/lib/audioSystem';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

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
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/93680123-01bb-462d-b894-4974334da6e9.png"
          alt="Cyberpunk City"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-4 text-cyan-400/80 font-share-tech text-lg"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          WELCOME, {playerName}
        </motion.div>

        <GlitchText className="text-7xl md:text-8xl font-orbitron font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400">
          MLBB
        </GlitchText>

        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-pink-500 mb-8"
          animate={{ 
            textShadow: [
              '0 0 20px rgba(255,0,110,0.5)',
              '0 0 40px rgba(255,0,110,0.8)',
              '0 0 20px rgba(255,0,110,0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ULTIMATE QUIZ
        </motion.h2>

        <div className="mb-12 space-y-3">
          <motion.div 
            className="text-yellow-400 font-rajdhani font-bold text-2xl tracking-wider"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚡ EXTREME EDITION ⚡
          </motion.div>
          <div className="text-cyan-400 font-rajdhani text-xl">
            6 ROUNDS • SUDDEN DEATH • SHUFFLE ENABLED
          </div>
          <div className="text-pink-500 font-rajdhani text-lg">
            ONE WRONG ANSWER = GAME OVER
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <NeonButton onClick={onStart} variant="primary" className="min-w-[200px]">
            START RUN
          </NeonButton>
          
          <motion.button
            onClick={toggleSound}
            className="border-2 border-cyan-400 text-cyan-400 p-4 hover:bg-cyan-400 hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
        </div>

        <motion.div
          className="text-cyan-400/60 font-share-tech text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          PRESS START WHEN READY
        </motion.div>
      </motion.div>
    </div>
  );
}