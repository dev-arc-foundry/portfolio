import type { ReactNode } from "react";

type PaddingVariant = "default" | "loose";

const PADDING: Record<PaddingVariant, string> = {
  default: "py-20 md:py-28",
  loose: "pt-40 pb-24 md:pt-48 md:pb-32",
};

type SectionProps = {
  id: string;
  labelledBy: string;
  className?: string;
  padding?: PaddingVariant;
  background?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  labelledBy,
  className = "",
  padding = "default",
  background,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${PADDING[padding]} ${className}`}
    >
      {background}
      <div className="relative mx-auto max-w-6xl px-6">
        {children}
      </div>
    </section>
  );
}
