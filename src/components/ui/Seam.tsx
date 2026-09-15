export function Seam({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, var(--accent), transparent)",
        opacity: 0.5,
      }}
    />
  );
}
