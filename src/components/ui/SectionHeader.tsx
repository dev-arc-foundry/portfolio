import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Anything that follows the description — Experience uses it for its pill. */
  children?: ReactNode;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="section-title mt-4">
        {title}
      </h2>
      {description && <p className="section-body mt-4">{description}</p>}
      {children}
    </div>
  );
}
