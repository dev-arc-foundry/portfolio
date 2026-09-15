import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";

export function WhatWeBuild() {
  return (
    <Section id="what-we-build" labelledBy="what-we-build-heading">
      <SectionHeader
        id="what-we-build-heading"
        eyebrow="What We Build"
        title="Four kinds of hard problems."
        description="Most engagements land in one of these — often more than one at once."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.title} delay={index * 0.06}>
              <SpotlightCard className="h-full p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted">{service.index}</span>
                  <Icon className="h-5 w-5 text-accent-ink" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.thesis}</p>
                <ul className="mt-6 border-t border-line">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="border-b border-line py-3 text-sm text-text"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
