function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function Monogram({ name, seed }: { name: string; seed: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hash = hashString(seed);
  const hueA = hash % 360;
  const hueB = (hueA + 42) % 360;

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center font-mono text-2xl font-medium text-white/90"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hueA} 45% 24%), hsl(${hueB} 55% 14%))`,
      }}
    >
      {initials}
    </div>
  );
}
