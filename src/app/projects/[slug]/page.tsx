import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getProject, projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: project.title, description: project.description, url, siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title: project.title, description: project.description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main" key={project.slug} className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-text"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to projects</Link>
      <Reveal className="mt-10">
        <Eyebrow>Current Projects</Eyebrow>
        <h1 className="mt-4 max-w-5xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-tight wrap-break-word">{project.title}</h1>
      </Reveal>
      <Reveal delay={0.06}><p className="section-body mt-6 max-w-2xl">{project.description}</p></Reveal>
      <Reveal delay={0.12} className="mt-8">
        {project.technologies.length ? (
          <ul className="flex flex-wrap gap-3" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology} className="pill-teal max-w-full px-4 py-2 text-base wrap-break-word">{technology}</li>)}
          </ul>
        ) : <p className="text-sm text-muted">Tech stack details to be added</p>}
      </Reveal>
      <ProjectGallery key={project.slug} images={project.images} title={project.title} />
    </main>
  );
}
