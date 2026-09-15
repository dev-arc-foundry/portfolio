import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { GridBackground } from "@/components/ui/GridBackground";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Let's build something",
  )}`;

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      className="overflow-hidden"
      background={<GridBackground />}
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2
              id="contact-heading"
              className="section-title"
            >
              Have something worth building?
            </h2>
            <p className="section-body mx-auto mt-4 max-w-md">
              Tell us what you&apos;re working on. We&apos;ll figure out the technology.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={mailto}>Start a Conversation</ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
