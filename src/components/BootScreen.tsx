import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlitchText from './ui/GlitchText';
import FramePanel from './ui/FramePanel';
import { cinematicSlideIn, goldShimmer } from '@/lib/animations';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootLogs = [
      'INITIALIZING ARENA HUD...',
      'LOADING MLBB HERO REGISTRY',
      'SYNCING MATCH INTEL...',
      'CALIBRATING STRATEGY MATRIX...',
      'ESTABLISHING TEAM LINK...',
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
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(245,196,81,0.05)_0%,transparent_40%,rgba(98,214,232,0.08)_100%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <div className="text-center mb-10">
          <GlitchText className="text-5xl md:text-6xl font-orbitron font-black text-center text-[var(--mlbb-gold)]" animate>
            MLBB QUIZ ARENA
          </GlitchText>
          <div className="text-sm uppercase tracking-[0.3em] text-[var(--mlbb-muted)] font-share-tech mt-3">
            HERO IDENTIFICATION SEQUENCE
          </div>
        </div>

        <FramePanel className="relative overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-70"
            variants={goldShimmer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-gold-sheen)]" />
          </motion.div>
          <div className="font-share-tech text-sm md:text-base space-y-3">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-[var(--mlbb-teal)]"
              >
                <span className="text-[var(--mlbb-gold)]">◆</span>
                {log}
                <motion.span
                  className="text-[var(--mlbb-gold)]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>
            ))}
          </div>
        </FramePanel>

        <motion.div
          className="mt-8 text-center text-[var(--mlbb-muted)] text-sm font-share-tech"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CONNECTING TO MATCH LOBBY...
        </motion.div>
      </motion.div>
    </div>
  );
}
