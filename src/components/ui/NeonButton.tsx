import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--mlbb-royal-light)] via-[var(--mlbb-royal)] to-[var(--mlbb-navy)] text-[var(--mlbb-text)] border border-[rgba(98,214,232,0.35)] shadow-[var(--mlbb-shadow-soft)] hover:shadow-[0_0_28px_rgba(98,214,232,0.45)]',
  secondary:
    'border border-[rgba(245,196,81,0.5)] text-[var(--mlbb-gold)] bg-[rgba(9,15,34,0.7)] hover:bg-[rgba(245,196,81,0.15)] hover:text-[var(--mlbb-gold-soft)]',
};

export default function NeonButton({ variant = 'primary', className, children, ...props }: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'mlbb-focus-ring relative overflow-hidden px-6 py-3 uppercase tracking-widest font-rajdhani font-bold transition-all duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,rgba(245,196,81,0.2),transparent_55%)]" aria-hidden />
      <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-[var(--mlbb-gold-sheen)] blur-sm opacity-70" aria-hidden />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
