import Image from "next/image";
import { team } from "@/data/team";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Monogram } from "@/components/ui/Monogram";
import { TiltCard } from "@/components/ui/TiltCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Team() {
  return (
    <Section id="team" labelledBy="team-heading">
      <SectionHeader
        id="team-heading"
        eyebrow="Team"
        title="Three engineers, no middle layer."
        description="Every project is scoped and built by the people doing the work. No account managers, no bench."
      />

      <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
        {team.map((member, index) => (
          <Reveal key={member.id} delay={index * 0.06}>
            <div className="flex h-full flex-col">
              <TiltCard className="aspect-square w-full">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={480}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Monogram name={member.name} seed={member.id} />
                )}
              </TiltCard>

              <h3 className="mt-5 text-lg font-medium tracking-tight">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-accent-ink">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <li
                    key={skill}
                    className="pill-teal px-3 py-1 text-xs"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              {(member.links.linkedin || member.links.github) && (
                <div className="mt-5 flex items-center gap-3">
                  {member.links.linkedin && (
                    <span className="text-muted" aria-hidden="true">
                      <LinkedinIcon className="h-4 w-4" />
                    </span>
                  )}
                  {member.links.github && (
                    <span className="text-muted" aria-hidden="true">
                      <GithubIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
