const NODES = [
  { label: "CLIENT", cx: 70, cy: 50 },
  { label: "EDGE", cx: 200, cy: 50 },
  { label: "API", cx: 330, cy: 50 },
  { label: "QUEUE", cx: 460, cy: 50 },
  { label: "WORKERS", cx: 590, cy: 50 },
  { label: "POSTGRES", cx: 200, cy: 250 },
  { label: "MONGODB", cx: 330, cy: 250 },
  { label: "REDIS", cx: 460, cy: 250 },
  { label: "KAFKA", cx: 590, cy: 250 },
];

/* Wiring. Node rects are painted after these, so segments that run under a box are hidden. */
const WIRES = [
  "M70,50 H590", // client -> edge -> api -> queue -> workers
  "M330,50 V150 H200 V250", // api -> storage bus -> postgres
  "M330,150 V250", // storage bus -> mongodb
  "M460,50 V250", // queue -> redis
  "M590,50 V250", // workers -> kafka
];

/* The storage bus tee, the one fan-out that isn't hidden under a node box. */
const JUNCTION = { cx: 330, cy: 150 };

/*
 * One pulse per branch, all starting at CLIENT and diverging at API. keyPoints pins the
 * shared prefix (70 -> 330, i.e. 260 units) to the same slice of the timeline on every
 * path, so the dots travel as one and split at the same instant instead of drifting apart.
 */
const SPLIT_AT = 0.36;
const FLOWS = [
  { path: "M70,50 H330 V150 H200 V250", split: 260 / 590 }, // postgres
  { path: "M70,50 H330 V250", split: 260 / 460 }, // mongodb
  { path: "M70,50 H460 V250", split: 260 / 590 }, // redis
  { path: "M70,50 H590 V250", split: 260 / 720 }, // kafka
];

export function SystemSchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 660 300"
      className={className}
      role="img"
      aria-label="Simplified system architecture diagram: a request travels from client through edge to the API, which fans out to Postgres and MongoDB for storage while a parallel path runs through a queue and workers backed by Redis and Kafka."
    >
      <g fill="none" stroke="var(--line-strong)" strokeWidth={1.5}>
        {WIRES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <circle cx={JUNCTION.cx} cy={JUNCTION.cy} r={3} fill="var(--line-strong)" />

      {NODES.map((node) => (
        <g key={node.label} className="group">
          <rect
            x={node.cx - 50}
            y={node.cy - 28}
            width={100}
            height={56}
            rx={6}
            fill="var(--surface)"
            stroke="var(--green-ink)"
            strokeWidth={1.5}
            className="transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_6px_var(--green-ink))]"
          />
          <text
            x={node.cx}
            y={node.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_6px_var(--green-ink))]"
            fontSize={11}
            letterSpacing="0.02em"
            fill="var(--muted)"
          >
            {node.label}
          </text>
        </g>
      ))}

      {FLOWS.map((flow) => (
        <circle
          key={flow.path}
          r={5}
          fill="var(--accent)"
          className="schematic-pulse-dot"
          style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
        >
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            path={flow.path}
            calcMode="linear"
            keyTimes={`0;${SPLIT_AT};1`}
            keyPoints={`0;${flow.split.toFixed(4)};1`}
          />
        </circle>
      ))}
    </svg>
  );
}
