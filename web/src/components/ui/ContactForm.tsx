"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";

// Contact form — posts to Web3Forms (no backend needed; works with static
// export). The access key is public by design: Web3Forms only ever delivers to
// the email verified against that key, so it can't be abused to send elsewhere.
// If the key is absent, the form gracefully falls back to composing a mailto:.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Role CTAs (HireRoles) prefill the form. The form lives in the opposite
  // column, so a silent fill reads as "nothing happened" — instead we bring the
  // form into view, pulse a copper ring so the change is unmistakable, then hand
  // focus to the message field with the caret at the end of the scaffold.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ subject?: string; message?: string }>).detail;
      if (detail?.subject) setSubject(detail.subject);
      if (detail?.message) setMessage(detail.message);

      const form = formRef.current;
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        form.classList.remove("form-prefill");
        // Reflow so the animation can retrigger on repeated clicks.
        void form.offsetWidth;
        form.classList.add("form-prefill");
      }

      // Let the smooth-scroll settle, then focus the message field.
      window.setTimeout(() => {
        const el = msgRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        el.setSelectionRange(el.value.length, el.value.length);
      }, 500);
    };
    window.addEventListener("prefill-contact", onPrefill as EventListener);
    return () => window.removeEventListener("prefill-contact", onPrefill as EventListener);
  }, []);

  const mailtoFallback = () => {
    const subj = encodeURIComponent(subject || `Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${profile.links.email}?subject=${subj}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // No key configured → keep the zero-config mailto path.
    if (!WEB3FORMS_KEY) {
      mailtoFallback();
      return;
    }

    // Honeypot — real users leave this empty; bots fill it.
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked;
    if (botcheck) return;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject: subject || `Portfolio message from ${name || "someone"}`,
          message,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  };

  const field =
    "w-full rounded-xl border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-base)_55%,transparent)] px-4 py-2.5 text-[15px] text-[var(--color-text)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text)_5%,transparent)] placeholder:text-[var(--color-muted)] transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-border)_100%,transparent)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]";
  const label = "mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]";

  const busy = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-[1.4rem] border border-[color-mix(in_srgb,var(--color-border)_75%,transparent)] bg-[linear-gradient(155deg,color-mix(in_srgb,var(--color-surface)_60%,transparent),color-mix(in_srgb,var(--color-base)_40%,transparent))] p-6 shadow-[0_1px_0_inset_color-mix(in_srgb,var(--color-text)_6%,transparent),0_24px_60px_-32px_rgba(0,0,0,0.6)] md:p-8"
    >
      {/* Copper hairline crowning the card — the section's single signature accent. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-accent)_70%,transparent),transparent)]"
      />

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-[var(--color-heading)]">
          <span className="h-[7px] w-[7px] flex-none rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]" />
          Send a message
        </h3>
      </div>

      {/* Honeypot — visually hidden, off the tab order; bots fill it, humans don't. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        suppressHydrationWarning
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Name</label>
          <input id="c-name" name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" suppressHydrationWarning className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" suppressHydrationWarning className={field} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-subject" className={label}>Subject</label>
        <input id="c-subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" suppressHydrationWarning className={field} />
      </div>
      <div className="mt-4">
        <label htmlFor="c-msg" className={label}>Message</label>
        <textarea id="c-msg" ref={msgRef} name="message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me more…" suppressHydrationWarning className={`${field} resize-none`} />
      </div>

      {/* Status — a confirmation panel on success, inline note on error. */}
      <div aria-live="polite">
        {status === "success" && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] p-4">
            <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] text-[var(--color-accent)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--color-heading)]">Message sent</span>
              <span className="mt-0.5 block text-sm text-[var(--color-body)]">
                Thanks for reaching out — I&rsquo;ll get back to you soon.
              </span>
            </span>
          </div>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-[color-mix(in_srgb,#e5484d_80%,var(--color-text))]">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={busy}
        suppressHydrationWarning
        style={{ color: "var(--color-text)" }}
        className="focus-accent group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] px-5 py-3 text-base font-semibold transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] hover:!text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send Message"}
        {busy ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--color-accent)" }} className="animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--color-accent)" }} className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}
