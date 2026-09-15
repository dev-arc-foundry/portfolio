import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ComingSoonOrb } from "@/components/visuals/ComingSoonOrb";

export function Products() {
  return (
    <Section id="products" labelledBy="products-heading">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
            <ComingSoonOrb className="h-full w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <Eyebrow>Built in the Foundry</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            id="products-heading"
            className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-tight"
          >
            <span className="text-shimmer">Coming Soon</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="section-body mt-5 max-w-xl">
            We&apos;re building the next generation of tools for developers, researchers, and
            tech communities. Be the first to know when we launch.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot"
            />
            Stay tuned
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
