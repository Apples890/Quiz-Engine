import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlitchText from './ui/GlitchText';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootLogs = [
      'INITIALIZING SYSTEM...',
      'LOADING MLBB QUIZ ENGINE v2.0',
      'SYNCING HERO DATABASE...',
      'CALIBRATING DIFFICULTY MATRIX...',
      'ESTABLISHING NEURAL LINK...',
      'SYSTEM READY'
    ];

    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, index * 400);
    });

    setTimeout(() => {
      onComplete();
    }, bootLogs.length * 400 + 800);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <GlitchText className="text-6xl font-orbitron font-black text-center mb-12 text-cyan-400" animate>
          MLBB QUIZ
        </GlitchText>

        <div className="bg-black/50 border border-cyan-400/30 p-8 font-mono text-sm">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-cyan-400 mb-2"
            >
              <span className="text-pink-500">&gt;</span> {log}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center text-cyan-400/60 text-sm font-share-tech"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LOADING...
        </motion.div>
      </motion.div>
    </div>
  );
}