"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const DEFAULT_LINK = "text-sm text-muted transition-colors hover:text-text";

type NavLinksProps = {
  /** Applied to every link. Defaults to the nav/footer treatment. */
  className?: string;
  onNavigate?: () => void;
};

/* Shared by the header, footer, and collapsed menu. Homepage fragments stay
   native anchors; other routes link back to the corresponding home sections. */
export function NavLinks({ className = DEFAULT_LINK, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {siteConfig.nav.map((item) => (
        <a key={item.href} href={pathname === "/" ? item.href : `/${item.href}`} onClick={onNavigate} className={className}>
          {item.label}
        </a>
      ))}
    </>
  );
}
