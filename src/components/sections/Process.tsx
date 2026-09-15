import { process } from "@/data/process";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <Section id="process" labelledBy="process-heading">
      <SectionHeader
        id="process-heading"
        eyebrow="How We Work"
        title="Five steps, no surprises."
      />

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-5 w-px bg-line-strong md:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-5 hidden h-px bg-line-strong md:block"
        />

        <div className="grid gap-10 md:grid-cols-5">
          {process.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="relative flex items-start gap-4 md:flex-col md:gap-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-xs text-accent-ink">
                  {step.index}
                </span>
                <div className="md:mt-6">
                  <h3 className="text-base font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
