"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { HireRoles } from "@/components/ui/HireRoles";
import { CollaborateCTA } from "@/components/sections/CollaborateCTA";
import { profile } from "@/content/site";

// Contact — the closing moment. Structured direct channels with instant tactile feedback.
export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.links.email);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      // Fallback for environments where clipboard API is restricted
      try {
        const el = document.createElement("textarea");
        el.value = profile.links.email;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } catch {
        // Silently continue to set visual feedback
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3200);
  };
  return (
    <section id="contact" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-12">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="flex items-center gap-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--color-heading)]">
              <span className="h-2 w-2 flex-none rounded-full bg-[var(--color-accent)]" />
              Establish <span className="text-[var(--color-accent)]">connection</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 max-w-[50ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[var(--color-body)]">
              Currently open to{" "}
              <span className="font-medium text-[var(--color-heading)]">Software Engineering, Backend, and Full-Stack</span>{" "}
              roles where systems architecture, data models, and high-performance execution matter.
            </p>
          </Reveal>

          {/* Role CTAs — pick a role, the form fills with a tailored scaffold. */}
          <Reveal delay={140}>
            <HireRoles />
          </Reveal>

          {/* Contact routes — real channels as tidy, hairline-divided rows. */}
          <Reveal delay={200}>
            <ul className="mt-8 max-w-2xl border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
              {/* Email channel: Direct Gmail Compose + 1-Click Copy Button */}
              <li className="border-b border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
                <div className="group flex items-center justify-between gap-3 py-4">
                  {/* Left: Direct link to Gmail Compose */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.links.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-accent flex min-w-0 flex-1 items-center gap-4 transition-colors"
                    title="Open Gmail Compose in new tab"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] text-[var(--color-accent)] transition-colors group-hover:border-[color-mix(in_srgb,var(--color-accent)_60%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]">
                      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                        <path d="M3 5.5h18v13H3zM3 6l9 6.5L21 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                        <span>Email</span>
                        <span className="font-mono text-[11px] lowercase tracking-normal text-[var(--color-accent)] opacity-75">
                          · opens in gmail
                        </span>
                      </span>
                      <span className="block truncate text-[15px] text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-accent)]">
                        {profile.links.email}
                      </span>
                    </span>
                  </a>

                  {/* Right Actions: 1-Click Copy Button + Open Gmail Button */}
                  <div className="flex flex-none items-center gap-2">
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address to clipboard"
                      title="Copy email address to clipboard"
                      className={`focus-accent flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium transition-all duration-150 select-none ${
                        copied
                          ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] text-[var(--color-accent)]"
                          : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-2)_80%,transparent)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-heading)]"
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" className="text-[var(--color-accent)]">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" fill="none" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.links.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compose in Gmail"
                      title="Open Gmail compose in new tab"
                      className="focus-accent flex items-center gap-1 rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-2.5 py-1.5 font-sans text-xs font-medium text-[var(--color-accent)] transition-all duration-150 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] hover:text-white"
                    >
                      <span className="hidden sm:inline">Gmail</span>
                      <svg viewBox="0 0 24 24" width={12} height={12} aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
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
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] text-[var(--color-accent)] transition-colors group-hover:border-[color-mix(in_srgb,var(--color-accent)_60%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]">
                      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                        <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                        Location
                      </span>
                      <span className="block truncate text-[15px] text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-text)]">
                        Bengaluru, Karnataka
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)] pr-1">
                    <span className="hidden sm:inline">Maps</span>
                    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
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
