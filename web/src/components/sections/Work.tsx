"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/content/site";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trace } from "@/components/ui/Trace";
import { Reveal } from "@/components/ui/Reveal";

// Two-tone project wordmark. Splits the name into a lead + tail — on a space if
// present ("KRAMA OS" → "KRAMA" / " OS"), otherwise at the internal camelCase
// seam ("LedgerMind" → "Ledger" / "Mind") — rendering the lead in strong ink and
// the tail in champagne. All-caps names get positive tracking so the serif
// breathes; mixed-case names stay slightly tight. Premium wordmark, not a label.
function splitName(name: string): [string, string] {
  if (name.toLowerCase() === "context") return ["Con", "text"];
  const space = name.indexOf(" ");
  if (space !== -1) return [name.slice(0, space), name.slice(space)];
  const seam = name.slice(1).search(/[A-Z0-9]/);
  if (seam !== -1) return [name.slice(0, seam + 1), name.slice(seam + 1)];
  return [name, ""];
}

function ProjectName({
  name,
  wordmark,
}: {
  name: string;
  wordmark?: readonly [string, string];
}) {
  const [lead, tail] = wordmark ?? splitName(name);
  const caps = name === name.toUpperCase();
  return (
    <span className={caps ? "tracking-[0.03em]" : "tracking-[-0.015em]"}>
      <span className="text-[var(--color-heading)]">{lead}</span>
      {tail && (
        <span className="bg-gradient-to-r from-[#ff5e4f] to-[var(--color-accent)] bg-clip-text text-transparent">
          {tail}
        </span>
      )}
    </span>
  );
}

// §8 — Work has two ways to read the same three projects:
//   • Sequence (default) — a sticky "stacked deck". Each project is a
//     full spread that pins as you scroll; the next slides up and overlays it,
//     leaving a thin peek of the one behind, so the set reads as a deliberate
//     sequence rather than a card grid. Pure CSS sticky (see .work-stack in
//     globals.css); reduced motion falls back to a plain vertical list.
//   • Overview — every project at once, compact, for a fast scan or to jump
//     straight to a repo. The escape hatch from the immersive scroll.
type View = "sequence" | "overview";

export function Work() {
  const [view, setView] = useState<View>("sequence");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const handleOpenCaseStudy = (caseStudyId: string) => {
    const study = caseStudies[caseStudyId];
    if (study) setSelectedStudy(study);
  };

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <Trace delay={200} inset={0} className="mb-16 hidden min-[900px]:block" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="SELECTED WORK"
            title="Things I've built"
            accent="built"
            subtitle="Production systems, developer tools, and full-stack software built for real users."
          />
        </Reveal>
        <Reveal delay={120}>
          <ViewToggle view={view} onChange={setView} />
        </Reveal>
      </div>

      {view === "sequence" ? (
        <div className="work-stack mt-14">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="work-card-slot"
              style={{ ["--i" as string]: String(i) }}
            >
              <ProjectSpread
                project={p}
                position={i + 1}
                total={projects.length}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            </div>
          ))}
        </div>
      ) : (
        <Reveal delay={120}>
          <ProjectIndex projects={projects} onOpenCaseStudy={handleOpenCaseStudy} />
        </Reveal>
      )}

      <Reveal as="p" delay={120} className="mt-16 text-sm text-[var(--color-muted)]">
        More on{" "}
        <a
          href="https://github.com/sudhanshukumar03"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent link-underline inline-block text-[var(--color-body)] transition-colors hover:text-[var(--color-text)]"
        >
          GitHub
        </a>
        .
      </Reveal>

      {/* Deep-Dive Architecture Case Study Modal */}
      <CaseStudyModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
      />
    </section>
  );
}

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const base =
    "focus-accent inline-flex min-h-[44px] cursor-pointer items-center pb-1 text-sm font-medium tracking-wide transition-colors";
  return (
    <div
      role="tablist"
      aria-label="Project view"
      className="flex items-center gap-6 font-sans uppercase tracking-[0.1em]"
    >
      {(["sequence", "overview"] as const).map((v) => {
        const active = view === v;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(v)}
            suppressHydrationWarning
            className={`${base} ${
              active
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]"
                : "border-b-2 border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}

// A full project spread — the pinned panel in Sequence view. Text-forward,
// editorial: a ghost position numeral anchors the composition; name, tagline,
// summary and the build's real capabilities read down the left; the in-world
// preview, stack, and repo sit right.
function ProjectSpread({
  project,
  position,
  total,
  onOpenCaseStudy,
}: {
  project: Project;
  position: number;
  total: number;
  onOpenCaseStudy?: (caseStudyId: string) => void;
}) {
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--card-mx", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--card-my", `${(e.clientY - r.top).toFixed(1)}px`);
  };

  return (
    <article
      onMouseMove={onMouseMove}
      className="work-card group relative grid content-center overflow-hidden rounded-2xl border border-[var(--color-border)] border-t-[rgba(255,255,255,0.14)] bg-gradient-to-b from-[#161a24] to-[var(--color-surface)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_50px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 sm:p-8 md:p-10 lg:p-12"
    >
      {/* Interactive cursor spotlight border sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--card-mx, 50%) var(--card-my, 50%), color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-12">
        {/* Left — the read */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            <span aria-hidden="true" className="font-mono font-bold text-[#ff5244]">
              {project.index}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--color-border)]" />
            <span className="font-mono">
              {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.038em]">
            <ProjectName name={project.name} wordmark={project.wordmark} />
          </h3>
          <h4 className="mt-3.5 text-[clamp(1.05rem,1.4vw,1.22rem)] font-semibold leading-snug tracking-[-0.015em] text-[var(--color-heading)]">
            {project.tagline}
          </h4>
          <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.78] text-[var(--color-body)]">
            {project.summary}
          </p>

          <div className="mt-6 border-t border-[color-mix(in_srgb,var(--color-border)_60%,transparent)] pt-4">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Core Architecture &amp; Capabilities
            </span>
            <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {project.features.slice(0, 4).map((f) => {
                const dashIndex = f.indexOf(" — ");
                const lead = dashIndex !== -1 ? f.slice(0, dashIndex) : f;
                const detail = dashIndex !== -1 ? f.slice(dashIndex + 3) : "";
                return (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="flex-none font-mono text-[var(--color-accent)] select-none font-semibold"
                    >
                      -
                    </span>
                    <span className="text-[var(--color-body)]">
                      <strong className="font-semibold text-[var(--color-text)]">{lead}</strong>
                      {detail && <span className="text-[var(--color-secondary)]"> &mdash; {detail}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {project.note && (
            <p className="mt-5 max-w-[54ch] text-xs italic leading-relaxed text-[var(--color-muted)]">
              {project.note}
            </p>
          )}

          <div className="mt-8 hidden lg:block">
            <TagRow items={project.tech} />
            <ProjectLinks project={project} className="mt-6" onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>

        {/* Right — the preview + metadata on mobile */}
        <div className="flex flex-col lg:col-span-6">
          <ProjectPreview project={project} onOpenCaseStudy={onOpenCaseStudy} />
          <div className="lg:hidden">
            <TagRow items={project.tech} className="mt-6" />
            <ProjectLinks project={project} className="mt-6" onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>
      </div>
    </article>
  );
}

// Overview — every project at once. Quiet rows, real repos, no fabricated
// metrics; the fast-scan counterpart to the pinned sequence.
function ProjectIndex({
  projects,
  onOpenCaseStudy,
}: {
  projects: Project[];
  onOpenCaseStudy?: (caseStudyId: string) => void;
}) {
  return (
    <ul className="mt-14 border-t border-[var(--color-border)]">
      {projects.map((p) => (
        <li
          key={p.name}
          className="grid gap-4 border-b border-[var(--color-border)] py-8 md:grid-cols-12 md:items-baseline md:gap-8"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)] md:col-span-1">
            {p.index}
          </span>
          <div className="md:col-span-5">
            <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--color-heading)]">
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-body)]">{p.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <TagRow items={p.tech.slice(0, 5)} />
          </div>
          <div className="md:col-span-3 md:text-right">
            <ProjectLinks project={p} className="md:justify-end" onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </li>
      ))}
    </ul>
  );
}

// In-world preview frame — renders the project screenshot mockup with a subtle glass sheen.
function ProjectPreview({
  project,
  onOpenCaseStudy,
}: {
  project: Project;
  onOpenCaseStudy?: (caseStudyId: string) => void;
}) {
  const handleClick = () => {
    if (project.caseStudyId && onOpenCaseStudy) {
      onOpenCaseStudy(project.caseStudyId);
    }
  };

  if (project.image) {
    return (
      <div
        onClick={handleClick}
        role={project.caseStudyId ? "button" : undefined}
        tabIndex={project.caseStudyId ? 0 : undefined}
        onKeyDown={(e) => {
          if (project.caseStudyId && onOpenCaseStudy && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onOpenCaseStudy(project.caseStudyId);
          }
        }}
        className={`group/preview relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_35px_-8px_color-mix(in_srgb,var(--color-accent)_22%,transparent)] ${
          project.caseStudyId ? "cursor-pointer" : ""
        }`}
      >
        <Image
          src={project.image}
          alt={`Interface screenshot of ${project.name}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 45vw, 95vw"
          className="object-contain object-center transition-transform duration-500 ease-out group-hover/preview:scale-[1.01]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08]" />

        {project.caseStudyId && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3.5 opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[#0b0c0e]/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text)] shadow-lg backdrop-blur-sm">
              <span>Read Architecture Deep-Dive</span>
              <span className="text-[var(--color-accent)]">↗</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
            Preview
          </span>
          <span className="max-w-[80%] text-sm font-medium text-[var(--color-text)]">
            {project.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function TagRow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({
  project,
  className = "",
  onOpenCaseStudy,
}: {
  project: Project;
  className?: string;
  onOpenCaseStudy?: (caseStudyId: string) => void;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {project.caseStudyId && onOpenCaseStudy && (
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project.caseStudyId!)}
          className="focus-accent group/btn inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-text)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-accent)_26%,transparent)] hover:shadow-[0_4px_16px_-4px_color-mix(in_srgb,var(--color-accent)_50%,transparent)]"
        >
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>Architecture Breakdown</span>
        </button>
      )}

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent group/link inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-heading)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-secondary)] hover:text-[var(--color-text)]"
        >
          <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor" aria-hidden="true" className="text-[var(--color-muted)] transition-colors group-hover/link:text-[var(--color-text)]">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
          <span>Repository</span>
          <span aria-hidden="true" className="text-[var(--color-accent)] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}

      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent group/link inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500/20"
        >
          <span>Live Demo</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}
