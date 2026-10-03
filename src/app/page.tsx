import { Seam } from "@/components/ui/Seam";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Philosophy } from "@/components/sections/Philosophy";
import { Team } from "@/components/sections/Team";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Seam />
      <Positioning />
      <Seam />
      <WhatWeBuild />
      <Expertise />
      <Experience />
      <Seam />
      <Philosophy />
      <Seam />
      <Team />
      <Projects />
      <Process />
      <Seam />
      <ContactCta />
      <Seam />
    </main>
  );
}
