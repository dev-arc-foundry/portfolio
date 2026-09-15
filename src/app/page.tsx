import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Seam } from "@/components/ui/Seam";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Philosophy } from "@/components/sections/Philosophy";
import { Team } from "@/components/sections/Team";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Nav />
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
        <Products />
        <Process />
        <Seam />
        <ContactCta />
        <Seam />
      </main>
      <Footer />
    </>
  );
}
