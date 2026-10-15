"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { HireRoles } from "@/components/ui/HireRoles";
import { CollaborateCTA } from "@/components/sections/CollaborateCTA";
import { profile } from "@/content/site";

// Contact — the closing moment. Structured direct channels with instant tactile feedback.
const ROWS: { label: string; value: string; href: string; tint: string; icon: React.ReactNode }[] = [
  {
    label: "Email",
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
    tint: "var(--color-accent)",
    icon: (
      <path d="M3 5.5h18v13H3zM3 6l9 6.5L21 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Location",
    value: "Bengaluru, Karnataka",
    href: "https://maps.google.com/?q=Bengaluru,Karnataka",
    tint: "var(--color-accent)",
    icon: (
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

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
              {ROWS.map((r) => {
                const isEmail = r.label === "Email";
                return (
                  <li key={r.label} className="border-b border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
                    <a
                      href={r.href}
                      onClick={isEmail ? copyEmail : undefined}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ ["--rt" as string]: r.tint }}
                      className="focus-accent group flex items-center gap-4 py-4 transition-colors cursor-pointer"
                      title={isEmail ? "Click to copy email address" : undefined}
                    >
                      <span className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-[color-mix(in_srgb,var(--rt)_30%,transparent)] bg-[color-mix(in_srgb,var(--rt)_8%,transparent)] text-[var(--rt)] transition-colors group-hover:border-[color-mix(in_srgb,var(--rt)_60%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--rt)_14%,transparent)]">
                        <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                          {r.icon}
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                          <span>{r.label}</span>
                          {isEmail && (
                            <span
                              className={`font-mono text-[11px] lowercase tracking-normal font-medium transition-all duration-200 ${
                                copied
                                  ? "text-[var(--color-accent)] opacity-100"
                                  : "text-[var(--color-muted)] opacity-50 group-hover:opacity-100"
                              }`}
                            >
                              {copied ? "✓ copied to clipboard" : "· click to copy"}
                            </span>
                          )}
                        </span>
                        <span className="block truncate text-[15px] text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-text)]">
                          {r.value}
                        </span>
                      </span>
                      {isEmail ? (
                        <span className="flex-none font-mono text-[11px] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                          {copied ? (
                            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" className="text-[var(--color-accent)]">
                              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" className="text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" fill="none" />
                            </svg>
                          )}
                        </span>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          width={16}
                          height={16}
                          aria-hidden="true"
                          className="flex-none text-[var(--color-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
                        >
                          <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </a>
                  </li>
                );
              })}
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
