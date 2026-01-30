import { motion } from 'framer-motion';
import { useState } from 'react';
import NeonButton from './ui/NeonButton';
import FramePanel from './ui/FramePanel';
import { cinematicSlideIn, lightSweep } from '@/lib/animations';

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

export default function NameEntry({ onSubmit }: NameEntryProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(140deg,rgba(245,196,81,0.08),transparent_55%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <FramePanel className="relative overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={lightSweep}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-[var(--mlbb-teal-sheen)]" />
          </motion.div>

          <div className="text-center mb-8">
            <div className="text-3xl font-orbitron font-bold text-[var(--mlbb-gold)]">
              HERO IDENTIFIED
            </div>
            <div className="text-sm font-share-tech text-[var(--mlbb-muted)] tracking-[0.2em] mt-2">
              ENTER YOUR IGN
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="TYPE YOUR NAME"
                maxLength={20}
                className="mlbb-focus-ring w-full bg-[rgba(7,12,28,0.7)] border border-[rgba(98,214,232,0.4)] text-[var(--mlbb-text)] px-6 py-4 text-xl font-rajdhani font-semibold uppercase tracking-wider focus:outline-none focus:border-[var(--mlbb-gold)] focus:shadow-[0_0_18px_rgba(245,196,81,0.35)] transition-all placeholder:text-[rgba(163,178,216,0.5)]"
                autoFocus
              />
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-6 bg-[var(--mlbb-gold)]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
            <div className="text-right text-[var(--mlbb-muted)] text-sm mt-2 font-share-tech">
              {name.length}/20
            </div>
          </div>

          <NeonButton onClick={handleSubmit} disabled={!name.trim()} className="w-full">
            ENTER ARENA
          </NeonButton>

          <motion.div
            className="mt-6 text-center text-[var(--mlbb-muted)] text-sm font-share-tech"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            READY FOR THE DRAFT?
          </motion.div>
        </FramePanel>
      </motion.div>
    </div>
  );
}
