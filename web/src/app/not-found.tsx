import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        404 // NOT FOUND
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-[var(--color-heading)]">
        Page does not exist
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        The route you requested could not be located.
      </p>
      <Link
        href="/"
        className="focus-accent mt-6 inline-flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_50%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)]"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
