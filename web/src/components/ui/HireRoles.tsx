"use client";

// Role CTAs — the conversion hinge of the Contact section. A hirer picks the
// role they're hiring for; the message form fills with a tailored, EDITABLE
// scaffold (subject + a short template with blanks they complete) and focus
// jumps to the message field. Not a canned paragraph sent "from" them — a
// guided start they finish in their own words.
type Role = { label: string; subject: string; message: string; tint: string; icon: React.ReactNode };

const ROLES: Role[] = [
  {
    label: "Frontend",
    subject: "Frontend Developer opportunity",
    tint: "var(--color-accent)",
    message:
      "Hi Sudhanshu,\n\nWe're hiring for a Frontend Developer role and your work stood out. A few details:\n\n• Company: \n• Focus: React / Next.js, TypeScript, UI\n• Location / type: \n\nWould love to talk — when are you free?",
    icon: (
      <path d="M3 5.5h18v13H3zM3 9h18M6 6.9h.01M8.4 6.9h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Backend",
    subject: "Backend Developer opportunity",
    tint: "var(--color-accent)",
    message:
      "Hi Sudhanshu,\n\nWe're looking for a Backend Developer and your projects caught our eye. A few details:\n\n• Company: \n• Focus: Node.js / NestJS, APIs, PostgreSQL\n• Location / type: \n\nWould love to talk — when are you free?",
    icon: (
      <path d="M3 5h18v5H3zM3 14h18v5H3zM7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "DevOps",
    subject: "DevOps Engineer opportunity",
    tint: "var(--color-accent)",
    message:
      "Hi Sudhanshu,\n\nWe have a DevOps Engineer opening and thought you'd be a great fit. A few details:\n\n• Company: \n• Focus: Docker, CI/CD, deployment\n• Location / type: \n\nWould love to talk — when are you free?",
    icon: (
      <path d="M12 3l8 4.3v9L12 20.6 4 16.3v-9L12 3zM4 7.3l8 4.3 8-4.3M12 11.6V20" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "AI Engineer",
    subject: "AI Engineer opportunity",
    tint: "var(--color-accent)",
    message:
      "Hi Sudhanshu,\n\nWe're building with AI and are hiring an AI Engineer — your RAG / LLM work is exactly what we need. A few details:\n\n• Company: \n• Focus: RAG, LangChain, LLM systems\n• Location / type: \n\nWould love to talk — when are you free?",
    icon: (
      <path d="M12 2.6h.01M12 3.4V6M8 6h8a3 3 0 0 1 3 3v3.4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM5 10.2H3.6M19 10.2h1.4M9.4 10.9h.01M14.6 10.9h.01M9.6 13h4.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function HireRoles() {
  const hire = (role: Role) => {
    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: { subject: role.subject, message: role.message },
      }),
    );
    // The form (opposite column) owns the scroll + pulse + focus response.
  };

  return (
    <div className="mt-8">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
        Hiring for a role?
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {ROLES.map((role) => (
          <button
            key={role.label}
            type="button"
            onClick={() => hire(role)}
            suppressHydrationWarning
            style={{ color: "var(--color-heading)", ["--rt" as string]: role.tint }}
            className="focus-accent group inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--rt)_35%,transparent)] bg-[color-mix(in_srgb,var(--rt)_8%,transparent)] px-3.5 py-2 text-[13px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--rt)] hover:bg-[color-mix(in_srgb,var(--rt)_15%,transparent)]"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true" style={{ color: "var(--rt)" }}>
              {role.icon}
            </svg>
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
