"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/content/site";
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
      {tail && <span className="text-[var(--color-accent)]">{tail}</span>}
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

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <Trace delay={200} inset={0} className="mb-16 hidden min-[900px]:block" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading title="Things I've built" accent="built" />
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
              <ProjectSpread project={p} position={i + 1} total={projects.length} />
            </div>
          ))}
        </div>
      ) : (
        <Reveal delay={120}>
          <ProjectIndex projects={projects} />
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
}: {
  project: Project;
  position: number;
  total: number;
}) {
  return (
    <article className="work-card relative grid content-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_inset_rgba(255,255,255,0.08),0_24px_50px_-20px_rgba(0,0,0,0.6)] sm:p-8 md:p-10 lg:p-12">
      {/* Ghost architectural watermark numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-2 select-none font-display text-[clamp(4.5rem,9vw,8rem)] font-bold leading-none text-[var(--color-border)] opacity-25 sm:right-8 sm:top-4"
      >
        {project.index}
      </span>

      <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-12">
        {/* Left — the read */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">
            <span aria-hidden="true" className="font-mono font-semibold text-[var(--color-accent)]">
              {project.index}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--color-border)]" />
            <span className="font-mono">
              {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.05]">
            <ProjectName name={project.name} wordmark={project.wordmark} />
          </h3>
          <p className="mt-3 text-[clamp(1rem,1.35vw,1.15rem)] font-normal text-[var(--color-secondary)]">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-[var(--color-body)]">
            {project.summary}
          </p>

          <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[var(--color-secondary)]">
                <span aria-hidden="true" className="mt-1 leading-none text-[var(--color-accent)]">
                  —
                </span>
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          {project.note && (
            <p className="mt-5 max-w-[54ch] text-xs italic leading-relaxed text-[var(--color-muted)]">
              {project.note}
            </p>
          )}

          <div className="mt-8 hidden lg:block">
            <TagRow items={project.tech} />
            <ProjectLinks project={project} className="mt-6" />
          </div>
        </div>

        {/* Right — the preview + metadata on mobile */}
        <div className="flex flex-col lg:col-span-6">
          <ProjectPreview project={project} />
          <div className="lg:hidden">
            <TagRow items={project.tech} className="mt-6" />
            <ProjectLinks project={project} className="mt-6" />
          </div>
        </div>
      </div>
    </article>
  );
}

// Overview — every project at once. Quiet rows, real repos, no fabricated
// metrics; the fast-scan counterpart to the pinned sequence.
function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ul className="mt-14 border-t border-[var(--color-border)]">
      {projects.map((p) => (
        <li
          key={p.name}
          className="grid gap-4 border-b border-[var(--color-border)] py-8 md:grid-cols-12 md:items-baseline md:gap-8"
        >
          <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)] md:col-span-1">
            {p.index}
          </span>
          <div className="md:col-span-5">
            <h3 className="font-display text-xl font-semibold">
              <ProjectName name={p.name} wordmark={p.wordmark} />
            </h3>
            <p className="mt-1 text-sm text-[var(--color-body)]">{p.tagline}</p>
          </div>
          <div className="md:col-span-4">
            <TagRow items={p.tech.slice(0, 5)} />
          </div>
          <div className="md:col-span-2 md:text-right">
            <ProjectLinks project={p} className="md:justify-end" />
          </div>
        </li>
      ))}
    </ul>
  );
}

// In-world preview frame — renders the project screenshot mockup with a subtle glass sheen.
function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="group/preview relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl transition-all duration-300 hover:border-[var(--color-accent)]/50">
        <Image
          src={project.image}
          alt={`Interface screenshot of ${project.name}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 45vw, 95vw"
          className="object-contain object-center transition-transform duration-500 ease-out group-hover/preview:scale-[1.01]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08]" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)]">
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

function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent group/link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] underline-offset-4 hover:underline"
        >
          <span>Live demo</span>
          <span aria-hidden="true" className="text-[var(--color-accent)] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent group/link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-secondary)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
        >
          <span>View on GitHub</span>
          <span aria-hidden="true" className="text-[var(--color-accent)] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}
