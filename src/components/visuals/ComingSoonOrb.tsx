import { BrandMark } from "@/components/ui/BrandMark";

export function ComingSoonOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 280 280" className="h-full w-full" aria-hidden="true" fill="none">
        <circle
          cx="140"
          cy="140"
          r="132"
          stroke="var(--muted)"
          strokeOpacity="0.3"
          strokeWidth="2"
        />

        {/* Tinted to match the orbiting dot, which runs on exactly this radius — it reads as its track. */}
        <circle
          cx="140"
          cy="140"
          r="108"
          stroke="var(--steel)"
          strokeOpacity="0.6"
          strokeWidth="2.5"
          strokeDasharray="4 8"
          className="orb-ring-cw"
        />

        <circle
          cx="140"
          cy="140"
          r="82"
          stroke="var(--accent)"
          strokeOpacity="0.9"
          strokeWidth="2.5"
          strokeDasharray="3 9"
          className="orb-ring-ccw"
        />

        <circle cx="140" cy="140" r="58" fill="var(--accent-soft)" className="orb-pulse" />

        {/* One animateMotion on the group keeps the core and its halo in lockstep. */}
        <g className="orb-orbit-dot">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path="M248,140 A108,108 0 1 1 32,140 A108,108 0 1 1 248,140"
          />
          <circle r="10" fill="var(--steel)" opacity="0.2" />
          <circle
            r="5"
            fill="var(--steel)"
            style={{ filter: "drop-shadow(0 0 8px var(--steel))" }}
          />
        </g>
      </svg>

      {/* Sits inside the innermost ring (r=58 of the 280 viewBox), centred on the same origin. */}
      <BrandMark
        size={128}
        className="absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
