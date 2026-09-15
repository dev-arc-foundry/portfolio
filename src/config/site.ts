export type NavLink = {
  label: string;
  href: string;
};

/* Split so the hero and the OG card can accent the closing phrase without
   re-typing the sentence. `tagline` below is the flat form. */
const tagline = {
  lead: "Engineering the software behind ",
  accent: "ambitious ideas.",
};

export const siteConfig = {
  name: "DevArc Foundry",
  shortName: "DevArc",
  /** Display casing for the wordmark in the nav, footer and OG card. */
  wordmark: "DEVARC FOUNDRY",
  tagline: `${tagline.lead}${tagline.accent}`,
  taglineParts: tagline,
  description:
    "DevArc Foundry is a three-person software engineering studio building AI-first, data-driven products. Product engineering, agentic development, backend systems, and architecture — done with production rigor.",
  /** The one-line form, for surfaces with no room for the full description. */
  shortDescription:
    "A team of experienced software engineers building AI-first products, end to end.",
  url: "https://devarcfoundry.com",
  email: "devarcfoundry@gmail.com",
  social: {
    github: "https://github.com/devarcfoundry",
    linkedin: "https://linkedin.com/company/devarcfoundry",
  },
  nav: [
    { label: "What We Build", href: "#what-we-build" },
    { label: "Expertise", href: "#expertise" },
    { label: "Experience", href: "#experience" },
    { label: "Team", href: "#team" },
    { label: "Process", href: "#process" },
  ] satisfies NavLink[],
};

export type SiteConfig = typeof siteConfig;
