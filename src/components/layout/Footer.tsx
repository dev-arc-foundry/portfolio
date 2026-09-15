import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { NavLinks } from "./NavLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-mono text-sm font-medium tracking-tight">
              {siteConfig.wordmark}
            </span>
            <p className="mt-2 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-muted" aria-hidden="true">
              <GithubIcon className="h-5 w-5" />
            </span>
            <span className="text-muted" aria-hidden="true">
              <LinkedinIcon className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 font-mono text-xs text-muted">
          <span>© {year} {siteConfig.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
