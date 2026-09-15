import { philosophy } from "@/data/philosophy";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <Section id="philosophy" labelledBy="philosophy-heading" className="bg-surface-2">
      <SectionHeader
        id="philosophy-heading"
        eyebrow="Engineering Philosophy"
        title="How we actually work."
        align="center"
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {philosophy.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 0.06}>
            <div>
              <span className="font-mono text-3xl text-accent-ink">{principle.index}</span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{principle.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
