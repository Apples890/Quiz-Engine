import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]',
  secondary:
    'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black',
};

export default function NeonButton({ variant = 'primary', className, children, ...props }: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative px-6 py-3 uppercase tracking-widest font-rajdhani font-bold transition-all duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 blur-md opacity-40 bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400" aria-hidden />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
