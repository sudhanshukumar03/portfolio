import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trace } from "@/components/ui/Trace";
import { Reveal } from "@/components/ui/Reveal";
import { about, aboutMeta, education } from "@/content/site";

// §10 — two-column, unbalanced. Bio ~65%; the sidebar (~35%) is deliberately
// offset lower than the bio's top edge, not aligned to it.
export function About() {
  return (
    <section id="about" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-10 md:py-12">
      <Trace delay={600} inset={0} className="mb-6 hidden min-[900px]:block" />
      <Reveal>
        <SectionHeading title="A bit about me" accent="about me" />
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        {/* Bio — ~65% */}
        <Reveal as="div" delay={140} className="lg:col-span-8">
          <div className="max-w-[68ch] space-y-5 text-[clamp(1.025rem,1.35vw,1.15rem)] leading-[1.74]">
            <p className="text-[var(--color-body)]">{about.short}</p>
            {about.long.map((para) => (
              <p key={para.slice(0, 24)} className="text-[var(--color-body)]">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Sidebar — ~35%, offset lower than the bio top on desktop */}
        <Reveal as="aside" delay={260} className="lg:col-span-4 lg:mt-16">
          <dl className="space-y-6 border-l border-[var(--color-border)] pl-6">
            <MetaBlock label="Education">
              <p className="font-semibold text-[var(--color-text)]">{education.degree}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{education.school}</p>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">{education.detail}</p>
            </MetaBlock>

            <MetaBlock label="From">
              <p className="font-medium text-[var(--color-text)]">{aboutMeta.from}</p>
            </MetaBlock>

            <MetaBlock label="Interests">
              <p className="font-medium text-[var(--color-text)]">{aboutMeta.interests.join(", ")}</p>
            </MetaBlock>

            <MetaBlock label="Currently exploring">
              <p className="font-medium text-[var(--color-text)]">{aboutMeta.exploring.join(", ")}</p>
            </MetaBlock>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function MetaBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
        {label}
      </dt>
      <dd className="mt-2 leading-relaxed text-[15px]">{children}</dd>
    </div>
  );
}
