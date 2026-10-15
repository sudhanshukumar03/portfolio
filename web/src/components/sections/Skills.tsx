import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trace } from "@/components/ui/Trace";
import { Reveal } from "@/components/ui/Reveal";
import { SkillCard } from "@/components/ui/SkillCard";
import { skills } from "@/content/site";

// §9 — Skills as a composed web section, not a spec table. First the signal: the
// core stack, rendered as confident copper-tinted keys. Then the depth: the full
// toolkit as a grid of soft surface cards — each category gets a copper icon
// tile, a display-font title, and its tools as quiet chips. Monochrome + a single
// copper accent throughout; no brand logos to fight the palette.

// Line icons per category — currentColor, inherit the copper tile tint.
const groupIcon: Record<string, React.ReactNode> = {
  "Frontend": (
    <path d="M3 5.5h18v13H3zM3 9h18M6 6.9h.01M8.4 6.9h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Libraries & UI": (
    <path d="M12 3l9 4.8-9 4.8-9-4.8L12 3zM3 12.2l9 4.8 9-4.8M3 16.4l9 4.8 9-4.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Backend": (
    <path d="M3 5h18v5H3zM3 14h18v5H3zM7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Databases": (
    <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Artificial Intelligence": (
    <path d="M12 2.6h.01M12 3.4V6M8 6h8a3 3 0 0 1 3 3v3.4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM5 10.2H3.6M19 10.2h1.4M9.4 10.9h.01M14.6 10.9h.01M9.6 13h4.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "DevOps & Deployment": (
    <path d="M12 3l8 4.3v9L12 20.6 4 16.3v-9L12 3zM4 7.3l8 4.3 8-4.3M12 11.6V20" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

// A quiet, premium color per category — mid-tones (not neon) so each icon tile
// gets its own identity while staying legible on dark card surfaces.
const groupTint: Record<string, string> = {
  "Frontend": "#4f7cd4",
  "Libraries & UI": "#8a6fd1",
  "Backend": "#4ca373",
  "Databases": "#3fa6a1",
  "Artificial Intelligence": "#c56a86",
  "DevOps & Deployment": "#d08a42",
};

export function Skills() {
  return (
    <section id="skills" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-6 md:py-8">
      <Trace delay={400} inset={0} className="mb-6 hidden min-[900px]:block" />
      <Reveal>
        <SectionHeading
          eyebrow="02 // TECHNICAL ARSENAL"
          title="Tools I work with"
          accent="work with"
          subtitle="Battle-tested production technologies &amp; frameworks &mdash; from typed UI components down to database storage engines."
        />
      </Reveal>


      {/* Depth — the full toolkit as composed, living category cards. */}
      <div className="skills-grid mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.label} delay={160 + gi * 60}>
            <SkillCard label={group.label} items={group.items} icon={groupIcon[group.label]} tint={groupTint[group.label]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
