import { experienceDomains } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeader
        id="experience-heading"
        eyebrow="Engineering Experience"
        title="Problems our engineers have solved in production."
      >
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Professional experience gained through years of industry experience.
        </p>
      </SectionHeader>

      <div className="grid gap-x-12 border-t border-line md:grid-cols-2">
        {experienceDomains.map((domain, index) => (
          <Reveal key={domain.title} delay={(index % 6) * 0.05}>
            <div className="flex gap-4 border-b border-line py-5">
              <span className="font-mono text-xs text-muted">{domain.index}</span>
              <div>
                <h3 className="text-base font-medium tracking-tight">{domain.title}</h3>
                <p className="mt-1 text-sm text-muted">{domain.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
