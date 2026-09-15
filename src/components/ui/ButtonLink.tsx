import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-accent text-on-accent hover:opacity-90"
      : "border border-line-strong text-text hover:border-accent hover:text-accent-ink";

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  /*
   * Same-page fragments stay plain anchors. next/link routes "#team" through the router,
   * which no-ops once the URL is already /#team — so scrolling away and clicking the same
   * button again does nothing. Native fragment navigation re-scrolls every time. There is
   * no route to change or prefetch here anyway; the nav bar already uses plain anchors,
   * which is why only the buttons were flaky.
   */
  const isFragment = href.startsWith("#");

  if (isExternal || isFragment) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
