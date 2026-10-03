import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCards } from "@/components/projects/ProjectCards";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <Reveal><Eyebrow>Built in the Foundry</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 id="projects-heading" className="section-title mt-4">Current Projects</h2></Reveal>
      <Reveal delay={0.1} className="mt-10"><ProjectCards projects={projects} /></Reveal>
    </Section>
  );
}
