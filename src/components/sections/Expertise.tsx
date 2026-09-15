import { expertise } from "@/data/expertise";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Expertise() {
  return (
    <Section id="expertise" labelledBy="expertise-heading">
      <SectionHeader
        id="expertise-heading"
        eyebrow="Engineering Expertise"
        title="What we actually work with."
      />

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((column, index) => (
          <Reveal key={column.label} delay={index * 0.06}>
            <div>
              <h3 className="font-mono text-sm font-medium uppercase tracking-[0.14em] text-text">
                {column.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="pill-teal px-4 py-2 text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
