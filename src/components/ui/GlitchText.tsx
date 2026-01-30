import { motion } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps extends HTMLAttributes<HTMLSpanElement> {
  animate?: boolean;
}

export default function GlitchText({ className, children, animate = false, ...props }: GlitchTextProps) {
  return (
    <div className="relative inline-block" {...props}>
      <span className={cn('relative block', className)}>{children}</span>

      <span
        aria-hidden
        className={cn(
          'absolute inset-0 text-cyan-300 mix-blend-screen opacity-70',
          animate && 'animate-glitch-1'
        )}
      >
        {children}
      </span>

      <span
        aria-hidden
        className={cn(
          'absolute inset-0 text-pink-500 mix-blend-screen opacity-70',
          animate && 'animate-glitch-2'
        )}
      >
        {children}
      </span>

      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-yellow-400/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </div>
  );
}
