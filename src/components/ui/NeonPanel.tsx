import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface NeonPanelProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: 'cyan' | 'pink' | 'yellow';
}

const glowMap: Record<NonNullable<NeonPanelProps['glowColor']>, string> = {
  cyan: 'shadow-[0_0_25px_rgba(0,240,255,0.5)] border-cyan-400/50',
  pink: 'shadow-[0_0_25px_rgba(255,0,110,0.5)] border-pink-500/50',
  yellow: 'shadow-[0_0_25px_rgba(255,190,11,0.5)] border-yellow-400/50',
};

export default function NeonPanel({ glowColor = 'cyan', className, children, ...props }: NeonPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border bg-black/40 backdrop-blur-sm p-6 md:p-8',
        glowMap[glowColor],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
