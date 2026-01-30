import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface FramePanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'victory' | 'danger';
}

const toneStyles: Record<NonNullable<FramePanelProps['tone']>, string> = {
  default: 'border-[var(--mlbb-border)] shadow-[var(--mlbb-shadow-soft)]',
  victory: 'border-[rgba(245,196,81,0.45)] shadow-[0_0_28px_rgba(245,196,81,0.4)]',
  danger: 'border-[rgba(255,77,93,0.4)] shadow-[0_0_26px_rgba(255,77,93,0.35)]'
};

export default function FramePanel({ tone = 'default', className, children, ...props }: FramePanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-[var(--mlbb-panel)]/90 px-6 py-7 md:px-8 md:py-8 text-[var(--mlbb-text)]',
        toneStyles[tone],
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[rgba(245,196,81,0.25)]" />
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-[rgba(98,214,232,0.12)] shadow-[inset_0_0_20px_rgba(98,214,232,0.2)]" />
      <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.12),transparent_55%)]" />

      <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[rgba(245,196,81,0.6)]" />
      <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-[rgba(245,196,81,0.6)]" />
      <span className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 border-b-2 border-l-2 border-[rgba(245,196,81,0.6)]" />
      <span className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-b-2 border-r-2 border-[rgba(245,196,81,0.6)]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
