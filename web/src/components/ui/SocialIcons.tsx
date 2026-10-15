import { profile } from "@/content/site";

// Inline brand SVGs — no icon-font dependency. currentColor so they inherit
// the muted → text hover shift (no accent on these small targets).
const icons = {
  github: (
    <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  ),
  x: (
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z" />
  ),
  gmail: (
    <path d="M1.5 5.5A1.5 1.5 0 0 1 3 4h18a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 21 20H3a1.5 1.5 0 0 1-1.5-1.5v-13Zm2.1.5L12 12.02 20.4 6H3.6ZM20.5 7.4l-8 5.72a1 1 0 0 1-1 0L3.5 7.4V18h17V7.4Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  ),
  whatsapp: (
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.35 9.35 0 0 1 2.75 6.65c0 5.18-4.22 9.41-9.4 9.41Zm8-17.4A11.36 11.36 0 0 0 12.04.75C5.8.75.72 5.83.72 12.06c0 2 .52 3.95 1.52 5.67L.62 23.25l5.65-1.48a11.32 11.32 0 0 0 5.76 1.47h.01c6.24 0 11.32-5.08 11.32-11.31 0-3.03-1.18-5.87-3.32-8.01Z" />
  ),
  discord: (
    <path d="M20.32 4.37A19.8 19.8 0 0 0 15.44 2.9a.07.07 0 0 0-.08.03c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.5 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.22-1.99a.08.08 0 0 0-.04-.11c-.65-.25-1.27-.55-1.87-.89a.08.08 0 0 1-.01-.13c.13-.09.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.92 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.24.2.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
  ),
} as const;

type Item = { key: keyof typeof icons; label: string; href: string; brand: string };

// `brand` = each mark's real color, revealed on hover/focus. GitHub and X are
// monochrome brands, so they resolve to the theme's text color (visible in both
// themes); the rest use their official brand hex.
const ITEMS: Item[] = [
  { key: "github", label: "GitHub", href: profile.links.github, brand: "var(--color-text)" },
  { key: "x", label: "X", href: profile.links.x, brand: "var(--color-text)" },
  { key: "linkedin", label: "LinkedIn", href: profile.links.linkedin, brand: "#0A66C2" },
  { key: "whatsapp", label: "WhatsApp", href: profile.links.whatsapp, brand: "#25D366" },
  { key: "discord", label: "Discord", href: profile.links.discord, brand: "#5865F2" },
  { key: "gmail", label: "Email", href: `mailto:${profile.links.email}`, brand: "#EA4335" },
];

export function SocialIcons({
  className = "",
  variant = "plain",
  exclude = [],
}: {
  className?: string;
  variant?: "plain" | "square";
  exclude?: (keyof typeof icons)[];
}) {
  const square = variant === "square";
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {ITEMS.filter(({ key }) => !exclude.includes(key)).map(({ key, label, href, brand }) => (
        <li key={key}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            title={label}
            style={{ ["--brand" as string]: brand }}
            className={
              square
                ? "social-icon social-icon--square focus-accent grid h-11 w-11 place-items-center rounded-lg border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] text-[var(--color-secondary)] transition-all duration-200 hover:-translate-y-0.5"
                : "social-icon focus-accent inline-flex p-2 text-[var(--color-secondary)] transition-all duration-200 hover:-translate-y-0.5"
            }
          >
            <svg
              viewBox="0 0 24 24"
              width={square ? 18 : 20}
              height={square ? 18 : 20}
              fill="currentColor"
              aria-hidden="true"
            >
              {icons[key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
