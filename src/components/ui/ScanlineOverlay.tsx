export default function ScanlineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-soft-light opacity-30">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px]" />
      <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
    </div>
  );
}
