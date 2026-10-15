"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { HireRoles } from "@/components/ui/HireRoles";
import { CollaborateCTA } from "@/components/sections/CollaborateCTA";
import { profile } from "@/content/site";

// Contact — the closing moment. Structured direct channels with instant tactile feedback.
export function Contact() {
  return (
    <section id="contact" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-12">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        <div>
          <Reveal>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                <span>04 // INITIATE DIALOGUE</span>
              </div>
              <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.038em] text-[var(--color-heading)]">
                Establish <span className="text-[var(--color-accent)]">connection</span>
              </h2>
              <p className="max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.18rem)] leading-[1.72] text-[var(--color-body)]">
                Currently open to{" "}
                <strong className="font-semibold text-white">Software Engineering, Backend, and Full-Stack</strong>{" "}
                roles where systems architecture, data models, and high-performance execution matter.
              </p>
            </div>
          </Reveal>

          {/* Role CTAs — pick a role, the form fills with a tailored scaffold. */}
          <Reveal delay={140}>
            <HireRoles />
          </Reveal>

          {/* Contact routes — real channels as tidy, hairline-divided rows. */}
          <Reveal delay={200}>
            <ul className="mt-8 max-w-2xl border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
              {/* Email channel */}
              <li className="border-b border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.links.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-accent group flex items-center justify-between gap-4 py-4 transition-colors"
                  title="Open Gmail Compose in new tab"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      style={{ ["--rt" as string]: "#4f7cd4" }}
                      className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-[color-mix(in_srgb,var(--rt)_30%,transparent)] bg-[color-mix(in_srgb,var(--rt)_8%,transparent)] text-[var(--rt)] transition-colors group-hover:border-[color-mix(in_srgb,var(--rt)_60%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--rt)_14%,transparent)]"
                    >
                      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                        <path d="M3 5.5h18v13H3zM3 6l9 6.5L21 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                        Email
                      </span>
                      <span className="block truncate text-[15.5px] font-medium tracking-[-0.01em] text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-accent)]">
                        {profile.links.email}
                      </span>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="flex-none text-[var(--color-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
                  >
                    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>

              {/* Location channel */}
              <li className="border-b border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
                <a
                  href="https://maps.google.com/?q=Bengaluru,Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-accent group flex items-center justify-between gap-4 py-4 transition-colors"
                  title="Open location on Google Maps"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      style={{ ["--rt" as string]: "#4ca373" }}
                      className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-[color-mix(in_srgb,var(--rt)_30%,transparent)] bg-[color-mix(in_srgb,var(--rt)_8%,transparent)] text-[var(--rt)] transition-colors group-hover:border-[color-mix(in_srgb,var(--rt)_60%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--rt)_14%,transparent)]"
                    >
                      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                        <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                        Location
                      </span>
                      <span className="block truncate text-[15.5px] font-medium tracking-[-0.01em] text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-text)]">
                        Bengaluru, Karnataka
                      </span>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="flex-none text-[var(--color-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
                  >
                    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Compact collaborate prompt — below the address rows, left of the form. */}
          <Reveal delay={400}>
            <CollaborateCTA />
          </Reveal>
        </div>

        {/* Right — the message form (mailto-backed, no server needed) */}
        <Reveal delay={160}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
