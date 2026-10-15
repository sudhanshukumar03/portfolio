import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trace } from "@/components/ui/Trace";
import { Reveal } from "@/components/ui/Reveal";
import { about, aboutMeta, education, profile } from "@/content/site";

// §10 — High-retention editorial layout.
// Bio (~65%): An elevated lede card, structured thematic narrative beats with
// distinct subheadings, and 3 core engineering principle cards.
// Sidebar (~35%): Elevated metadata rail with tactile chips and status badges.
export function About() {
  return (
    <section id="about" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-12 md:py-16">
      <Trace delay={600} inset={0} className="mb-8 hidden min-[900px]:block" />
      <Reveal>
        <SectionHeading
          eyebrow="03 // BACKGROUND & PHILOSOPHY"
          title="A bit about me"
          accent="about me"
          subtitle="Engineering systems that bridge structural reliability with human-centered product craft."
        />
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Bio — ~65% */}
        <Reveal as="div" delay={140} className="space-y-8 lg:col-span-8">
          {/* Editorial Lede Card — High-contrast hook that anchors the narrative */}
          <div className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-surface)_90%,transparent),color-mix(in_srgb,var(--color-surface-2)_75%,transparent))] p-6 sm:p-8 backdrop-blur-sm shadow-[0_1px_0_inset_rgba(255,255,255,0.08),0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
              <span>Core Trajectory</span>
            </div>
            <p className="mt-3.5 text-[clamp(1.15rem,1.55vw,1.32rem)] font-normal leading-[1.7] text-[var(--color-text)] text-pretty">
              I&rsquo;m an <strong className="font-semibold text-white">Electronics &amp; Communication Engineering</strong> student focused on <span className="font-semibold text-[var(--color-accent)]">software engineering, full-stack architecture</span>, and <span className="font-semibold text-[var(--color-accent)]">applied AI systems</span>. I build products engineered for <strong className="font-semibold text-white underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">reliability and scale</strong> &mdash; not just hackathon demos.
            </p>
          </div>

          {/* Thematic Narrative Beats — Distinct subheadings with rhythm */}
          <div className="space-y-8 pl-1">
            {/* Beat 01 */}
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] font-mono text-xs font-bold text-[var(--color-accent)] shadow-[0_0_10px_color-mix(in_srgb,var(--color-accent)_20%,transparent)]">
                  01
                </span>
                <span className="h-px w-6 bg-[var(--color-border)]" />
                <h3 className="font-display text-[1.28rem] sm:text-[1.42rem] font-bold tracking-tight text-white">
                  Deterministic Invariants Over Surface Hype
                </h3>
              </div>
              <p className="mt-3.5 max-w-[66ch] text-[15.5px] leading-[1.82] text-[var(--color-body)] text-pretty">
                My work sits at the intersection of <strong className="font-semibold text-white">systems engineering, thoughtful product design, and applied intelligence</strong>. Rather than assembling fragile demos, I focus on building software that holds up under real-world production traffic &mdash; enforcing <strong className="font-semibold text-white">strict type safety, clean relational schemas, and resilient error recovery</strong>.
              </p>
            </div>

            {/* Beat 02 */}
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] font-mono text-xs font-bold text-[var(--color-accent)] shadow-[0_0_10px_color-mix(in_srgb,var(--color-accent)_20%,transparent)]">
                  02
                </span>
                <span className="h-px w-6 bg-[var(--color-border)]" />
                <h3 className="font-display text-[1.28rem] sm:text-[1.42rem] font-bold tracking-tight text-white">
                  Applied AI With Architectural Grounding
                </h3>
              </div>
              <p className="mt-3.5 max-w-[66ch] text-[15.5px] leading-[1.82] text-[var(--color-body)] text-pretty">
                My core technical focus spans <strong className="font-semibold text-white">modern full-stack systems, backend services, relational data models, and generative AI pipelines</strong>. Through projects like <strong className="font-semibold text-[var(--color-accent)]">KRAMA OS</strong> and <strong className="font-semibold text-[var(--color-accent)]">LedgerMind</strong>, I engineer architectures that pair structured databases with intelligent automation &mdash; proving that deterministic guarantees and AI can seamlessly coexist.
              </p>
            </div>

            {/* Growth signpost */}
            <div className="flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[var(--color-surface)]/60 px-5 py-3.5 text-[14.5px] text-[var(--color-body)]">
              <span className="font-mono text-sm font-semibold text-[var(--color-accent)]">&rarr;</span>
              <span>Continuously learning, experimenting, and building toward becoming a stronger software engineer.</span>
            </div>
          </div>

          {/* 3 Core Engineering Pillars — Fast-scan architectural cards */}
          <div className="grid grid-cols-1 gap-3.5 pt-2 sm:grid-cols-3">
            <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))] hover:bg-[var(--color-surface-2)]">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">01 / Foundation</div>
              <div className="mt-1 font-display text-[15px] font-bold text-[var(--color-text)]">Reliability &amp; Scale</div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">Clean schemas, deterministic logic, and resilient error recovery.</p>
            </div>
            <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))] hover:bg-[var(--color-surface-2)]">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">02 / Applied AI</div>
              <div className="mt-1 font-display text-[15px] font-bold text-[var(--color-text)]">Pragmatic Systems</div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">LLM orchestration, RAG pipelines, and agentic workflows.</p>
            </div>
            <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))] hover:bg-[var(--color-surface-2)]">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">03 / Craft</div>
              <div className="mt-1 font-display text-[15px] font-bold text-[var(--color-text)]">Tactile Poise</div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">Intentional typography, fluid interactions, and high visual polish.</p>
            </div>
          </div>
        </Reveal>

        {/* Sidebar — ~35%, elevated metadata rail */}
        <Reveal as="aside" delay={260} className="lg:col-span-4">
          <div className="space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-sm shadow-[0_1px_0_inset_rgba(255,255,255,0.04)]">
            <div className="border-b border-[var(--color-border)] pb-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Telemetry &bull; Overview
              </span>
            </div>

            {/* Education */}
            <div>
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Education
              </dt>
              <dd className="mt-2">
                <p className="font-semibold text-[var(--color-text)]">{education.degree}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{education.school}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 font-mono text-[11.5px] font-semibold text-[var(--color-heading)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  {education.detail}
                </div>
              </dd>
            </div>

            {/* Origin & Location */}
            <div className="border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] pt-4">
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Location &amp; Origin
              </dt>
              <dd className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
                <svg className="h-4 w-4 flex-none text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{aboutMeta.from} &rarr; {profile.location}</span>
              </dd>
            </div>

            {/* Focus Interests */}
            <div className="border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] pt-4">
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Core Interests
              </dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {aboutMeta.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]"
                  >
                    {interest}
                  </span>
                ))}
              </dd>
            </div>

            {/* Currently Exploring */}
            <div className="border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] pt-4">
              <dt className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                <span>Active Research</span>
              </dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {aboutMeta.exploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[color-mix(in_srgb,var(--color-accent)_25%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-surface-2))] px-2.5 py-1 font-mono text-[11.5px] font-medium text-[var(--color-accent)]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

