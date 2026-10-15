import { profile } from "@/content/site";
import { Trace } from "@/components/ui/Trace";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { HeroPortrait } from "@/components/sections/HeroPortrait";

// Hero — PCB system, refined. A copper duotone portrait (#0E1512 → #C97C3D)
// integrates into the substrate on the right and stacks above the text below
// 900px. The name anchors; hierarchy tightens name → role → statement →
// metadata → CTAs → social. Content rises in on load (staggered); the portrait
// drifts with a subtle parallax. CTAs stay unfilled — a copper-underlined
// primary and a quiet secondary carry the hierarchy.
export function Hero() {
  return (
    <section id="hero" aria-label="Intro" className="relative min-h-svh overflow-hidden">
      {/* Duotone filter — three-point copper grade with a real midtone so the
          figure keeps dimension (a flat two-stop map reads dead). Shadows sink
          to substrate #0e1512, midtones warm to copper, highlights lift to a
          bright warm copper — depth, not a flat orange silhouette. */}
      <svg aria-hidden="true" className="pointer-events-none absolute -left-px -top-px h-px w-px overflow-hidden opacity-0" width="1" height="1">
        <defs>
          <filter id="duotone" x="-5%" y="-5%" width="110%" height="110%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0    0    0    1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.043 0.545 0.968" />
              <feFuncG type="table" tableValues="0.066 0.345 0.741" />
              <feFuncB type="table" tableValues="0.055 0.216 0.506" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto flex min-h-svh w-full max-w-[1400px] flex-col px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-[900px]:block">
        {/* Portrait — desktop: contained on the right with matching gutter */}
        <div className="relative mx-auto mt-16 h-[34vh] w-[66%] max-w-[240px] shrink-0 overflow-hidden min-[900px]:absolute min-[900px]:right-4 sm:min-[900px]:right-6 md:min-[900px]:right-8 lg:min-[900px]:right-10 xl:min-[900px]:right-12 min-[900px]:top-1/2 min-[900px]:z-0 min-[900px]:mx-0 min-[900px]:mt-0 min-[900px]:h-[82%] min-[900px]:max-h-[760px] min-[900px]:w-[44%] min-[900px]:max-w-none min-[900px]:-translate-y-1/2">
          <HeroPortrait alt={`Portrait of ${profile.name}, ${profile.role}`} />
        </div>

        {/* Text column — left-anchored to the gutter and top-aligned below nav */}
        <div className="relative z-10 flex w-full flex-1 flex-col justify-start pb-16 pt-10 md:pt-24 min-[900px]:min-h-svh min-[900px]:max-w-[58%] min-[900px]:justify-center min-[900px]:py-24">
          <div className="max-w-2xl min-[900px]:pt-8">
            {/* Availability status — a live green "signal" dot (solid core +
                an expanding glow ring) is the universal "open to work" cue.
                Reduced motion keeps the dot and its glow, drops the ping. */}
            <div
              className="rise flex items-center gap-2.5"
              style={{ ["--rise-delay" as string]: "0ms" }}
            >
              <span className="status-dot" aria-hidden="true" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap text-[var(--color-secondary)]">
                {profile.status}
              </span>
            </div>

            {/* Anchor headline — a real positioning claim, not a one-word job
                title. Two lines, display weight; the copper hairline under
                "end to end" is the only accent, tying the claim to the trace
                system. */}
            <h1
              className="rise mt-7 max-w-[22ch] font-display text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.005em] text-[var(--color-text)]"
              style={{ ["--rise-delay" as string]: "120ms" }}
            >
              Full-stack &amp; AI,
              <br />
              <span className="text-[var(--color-accent)]">end-to-end.</span>
            </h1>

            {/* Positioning statement — first-person, confident, no filler.
                Identity, then what he does (design + build), landing on the one
                thing that matters to a hiring reader: it survives real users. */}
            <p
              className="rise mt-6 max-w-[52ch] text-[clamp(1.05rem,1.35vw,1.25rem)] font-normal leading-relaxed text-[var(--color-body)]"
              style={{ ["--rise-delay" as string]: "220ms" }}
            >
              I&rsquo;m{" "}
              <span className="font-medium text-[var(--color-text)]">{profile.name}</span>{" "}
              &mdash; I design and build software that&rsquo;s{" "}
              <span className="font-medium text-[var(--color-heading)]">fast, reliable, and ready for the real world.</span>
            </p>

            {/* CTAs — a matched pair of pill actions, same size and shape so they
                read as one cluster. Primary (View work) carries a copper border +
                copper text as the signature; secondary (Résumé) sits quieter on a
                neutral border. Both unfilled, per the no-fill CTA rule. */}
            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={{ ["--rise-delay" as string]: "400ms" }}
            >
              <a
                href="#work"
                style={{ color: "var(--color-text)" }}
                className="focus-accent group relative inline-flex min-w-[10.5rem] items-center justify-center gap-2 overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] px-5 py-2.5 text-base font-semibold shadow-[0_6px_18px_-10px_color-mix(in_srgb,var(--color-accent)_55%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)] hover:shadow-[0_14px_30px_-10px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
              >
                {/* Sheen sweep — a soft gloss crosses the button on hover. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_42%,color-mix(in_srgb,#ffffff_30%,transparent)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                />
                <span className="relative inline-flex items-center gap-2">
                  View work
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ color: "var(--color-accent)" }}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <ResumeButton href={profile.links.resume} />
            </div>
          </div>
        </div>
      </div>

      {/* Opening trace — matches the container gutters */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Trace delay={0} />
      </div>
    </section>
  );
}
