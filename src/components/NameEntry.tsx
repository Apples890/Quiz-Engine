import { motion } from 'framer-motion';
import { useState } from 'react';
import NeonButton from './ui/NeonButton';
import NeonPanel from './ui/NeonPanel';
import GlitchText from './ui/GlitchText';

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

export default function NameEntry({ onSubmit }: NameEntryProps) {
  const [name, setName] = useState('');
  const [showGlitch, setShowGlitch] = useState(false);

  const handleSubmit = () => {
    if (name.trim()) {
      setShowGlitch(true);
      setTimeout(() => {
        onSubmit(name.trim());
      }, 300);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/f7e4a09e-4991-46ba-a95f-8e89c48eea9a.png"
          alt="Neon Grid"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <NeonPanel glowColor="cyan">
          <GlitchText 
            className="text-4xl font-orbitron font-bold text-center mb-8 text-cyan-400"
            animate={showGlitch}
          >
            ENTER YOUR HANDLE
          </GlitchText>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="TYPE HERE..."
                maxLength={20}
                className="w-full bg-black/50 border-2 border-cyan-400 text-cyan-400 px-6 py-4 text-xl font-rajdhani font-semibold uppercase tracking-wider focus:outline-none focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all placeholder:text-cyan-400/30"
                autoFocus
              />
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-6 bg-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
            <div className="text-right text-cyan-400/50 text-sm mt-2 font-share-tech">
              {name.length}/20
            </div>
          </div>

          <NeonButton
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full"
          >
            INITIALIZE
          </NeonButton>

          <motion.div
            className="mt-6 text-center text-cyan-400/60 text-sm font-share-tech"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            READY PLAYER ONE?
          </motion.div>
        </NeonPanel>
      </motion.div>
    </div>
  );
}