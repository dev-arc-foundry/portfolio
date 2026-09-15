import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS = ["AI", "Data", "Product Engineering", "Backend Systems"];

export function Positioning() {
  return (
    <Section id="positioning" labelledBy="positioning-heading" className="bg-surface-2">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            id="positioning-heading"
            className="section-title"
          >
            Data &amp; AI First. <span className="text-accent-ink">Engineering Always.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="section-body mx-auto mt-6 max-w-xl">
            We care about architecture, scalability, performance, reliability, and
            maintainability — not just shipping features. The systems we build are meant
            to still make sense a year after we hand them off.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {PILLARS.map((pillar, index) => (
              <span key={pillar} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-line-strong">
                    ·
                  </span>
                )}
                <span>{pillar}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
