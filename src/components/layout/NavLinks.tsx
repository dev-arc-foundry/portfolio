import { siteConfig } from "@/config/site";

const DEFAULT_LINK = "text-sm text-muted transition-colors hover:text-text";

type NavLinksProps = {
  /** Applied to every link. Defaults to the nav/footer treatment. */
  className?: string;
  onNavigate?: () => void;
};

/*
 * The link set itself, without a landmark — the nav bar, the footer and the
 * mobile panel each wrap it in their own labelled <nav>.
 */
export function NavLinks({ className = DEFAULT_LINK, onNavigate }: NavLinksProps) {
  return (
    <>
      {siteConfig.nav.map((item) => (
        <a key={item.href} href={item.href} onClick={onNavigate} className={className}>
          {item.label}
        </a>
      ))}
    </>
  );
}
