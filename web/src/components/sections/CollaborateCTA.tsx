"use client";

import { useState } from "react";
import { SocialIcons } from "@/components/ui/SocialIcons";

// Compact collaborate prompt — lives at the foot of the Contact left column,
// beside the message form. Hovering reveals direct channels (LinkedIn, WhatsApp,
// X, Discord, GitHub); clicking pins them steady.
export function CollaborateCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const isSteady = isPinned;
  const isRevealed = isHovered || isPinned;

  return (
    <div className="mt-8 border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] pt-6">
      <div
        className="inline-flex max-w-full flex-wrap items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => setIsPinned((prev) => !prev)}
          aria-expanded={isRevealed}
          aria-pressed={isSteady}
          suppressHydrationWarning
          title={isSteady ? "Click to release steady view" : "Click to hold channels steady"}
          className={`focus-accent group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.95rem] font-semibold transition-all duration-300 ${
            isSteady
              ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] text-[var(--color-accent)] shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
              : isRevealed
              ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-[var(--color-text)]"
              : "border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)]"
          }`}
        >
          <span>Let&rsquo;s collaborate</span>
          {isSteady ? (
            <span
              aria-hidden="true"
              className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
            />
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ color: "var(--color-accent)" }}
              className={`transition-transform duration-300 ${
                isRevealed ? "translate-x-1" : "group-hover:translate-x-1"
              }`}
            >
              <path
                d="M5 12h13M12 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Direct channels: glide in on hover, hold steady on click */}
        <div
          className={`flex items-center gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed
              ? "pointer-events-auto max-w-[420px] translate-x-0 opacity-100"
              : "pointer-events-none max-w-0 -translate-x-3 overflow-hidden opacity-0"
          }`}
        >
          <SocialIcons variant="square" exclude={["gmail"]} />

          {isSteady && (
            <button
              type="button"
              onClick={() => {
                setIsPinned(false);
                setIsHovered(false);
              }}
              aria-label="Close channels"
              title="Close channels"
              className="focus-accent grid h-10 w-10 place-items-center rounded-lg border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] text-[var(--color-muted)] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] hover:text-[var(--color-text)]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
