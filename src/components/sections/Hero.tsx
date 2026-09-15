import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackground } from "@/components/ui/GridBackground";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SystemSchematic } from "@/components/visuals/SystemSchematic";

export function Hero() {
  return (
    <Section
      id="hero"
      labelledBy="hero-heading"
      padding="loose"
      className="overflow-hidden"
      background={<GridBackground />}
    >
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <Eyebrow>Data &amp; AI First · Engineering Always</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.03em]"
            >
              {siteConfig.taglineParts.lead}
              <span className="text-accent-ink">{siteConfig.taglineParts.accent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="section-body mt-6 max-w-xl">
              We&apos;re a team of experienced software engineers building AI-first
              products end to end — web and mobile applications, backend services, and
              the distributed systems underneath them. We think in architecture and ship
              in production.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="#contact">Start a Project</ButtonLink>
              <ButtonLink href="#team" variant="ghost">
                Meet the Team
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              3 engineers · 5+ years professional experience · web · mobile · backend ·
              distributed systems
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="lg:pl-6">
          <SystemSchematic className="h-auto w-full" />
        </Reveal>
      </div>
    </Section>
  );
}
