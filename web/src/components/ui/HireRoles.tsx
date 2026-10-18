"use client";

import { useState } from "react";

// Role CTAs — the conversion hinge of the Contact section. Selecting a role
// generates a formal, executive-tier (10/10 quality) reachout message in the contact
// form with an animated AI-generation typing effect, tailored to Sudhanshu's actual
// engineering skills and systems experience.
type Role = {
  label: string;
  subject: string;
  message: string;
  tint: string;
  icon: React.ReactNode;
};

const ROLES: Role[] = [
  {
    label: "Frontend",
    subject: "Frontend Engineer Opportunity — [Company Name]",
    tint: "#4f7cd4",
    message: `Dear Sudhanshu,

We have an opening for a Frontend Engineer at [Company Name] and were impressed by your React and TypeScript work.

Would you be open to a brief 15-minute call this week?

Best regards,
[Your Name] · [Company Name]`,
    icon: (
      <path d="M3 5.5h18v13H3zM3 9h18M6 6.9h.01M8.4 6.9h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Backend",
    subject: "Backend Systems Engineer Opportunity — [Company Name]",
    tint: "#4ca373",
    message: `Dear Sudhanshu,

We have an opening for a Backend Engineer at [Company Name] and were impressed by your Node.js and PostgreSQL work.

Would you be open to a brief 15-minute call this week?

Best regards,
[Your Name] · [Company Name]`,
    icon: (
      <path d="M3 5h18v5H3zM3 14h18v5H3zM7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "DevOps",
    subject: "DevOps Engineer Opportunity — [Company Name]",
    tint: "#d08a42",
    message: `Dear Sudhanshu,

We have an opening for a DevOps Engineer at [Company Name] and were impressed by your Docker and CI/CD projects.

Would you be open to a brief 15-minute call this week?

Best regards,
[Your Name] · [Company Name]`,
    icon: (
      <path d="M12 3l8 4.3v9L12 20.6 4 16.3v-9L12 3zM4 7.3l8 4.3 8-4.3M12 11.6V20" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "AI Engineer",
    subject: "AI Systems Engineer Opportunity — [Company Name]",
    tint: "#c56a86",
    message: `Dear Sudhanshu,

We have an opening for an AI Systems Engineer at [Company Name] and were impressed by your RAG and LLM projects.

Would you be open to a brief 15-minute call this week?

Best regards,
[Your Name] · [Company Name]`,
    icon: (
      <path d="M12 2.6h.01M12 3.4V6M8 6h8a3 3 0 0 1 3 3v3.4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM5 10.2H3.6M19 10.2h1.4M9.4 10.9h.01M14.6 10.9h.01M9.6 13h4.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function HireRoles() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const hire = (role: Role) => {
    setSelectedRole(role.label);
    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: { subject: role.subject, message: role.message, role: role.label },
      }),
    );
  };

  return (
    <div className="mt-8">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
        Hiring for a role?
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {ROLES.map((role) => {
          const isSelected = selectedRole === role.label;
          return (
            <button
              key={role.label}
              type="button"
              onClick={() => hire(role)}
              aria-pressed={isSelected}
              suppressHydrationWarning
              style={{ color: "var(--color-heading)", ["--rt" as string]: role.tint }}
              className={`focus-accent group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? "border-[var(--rt)] bg-[color-mix(in_srgb,var(--rt)_22%,transparent)] shadow-[0_0_16px_color-mix(in_srgb,var(--rt)_35%,transparent)]"
                  : "border-[color-mix(in_srgb,var(--rt)_35%,transparent)] bg-[color-mix(in_srgb,var(--rt)_8%,transparent)] hover:border-[var(--rt)] hover:bg-[color-mix(in_srgb,var(--rt)_15%,transparent)]"
              }`}
            >
              <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true" style={{ color: "var(--rt)" }}>
                {role.icon}
              </svg>
              <span>{role.label}</span>
              {isSelected && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--rt)] shadow-[0_0_6px_var(--rt)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
