"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/content/site";

// Contact form — posts to Web3Forms (no backend needed; works with static
// export). The access key is public by design: Web3Forms only ever delivers to
// the email verified against that key, so it can't be abused to send elsewhere.
// If the key is absent, the form gracefully falls back to composing a mailto:.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

// Personal / free consumer webmail domains
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "yahoo.ca",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.com.br",
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "outlook.com",
  "outlook.in",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "yandex.ru",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "gmx.de",
  "fastmail.com",
  "rediffmail.com",
  "inbox.com",
  "tutanota.com",
  "tutamail.com",
  "web.de",
  "free.fr",
]);

// Disposable / burner email domains
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "sharklasers.com",
  "mailinator.com",
  "yopmail.com",
  "trashmail.com",
  "throwawaymail.com",
  "dispostable.com",
  "fakeinbox.com",
  "mohmal.com",
  "burnermail.io",
  "dropmail.me",
  "mytemp.email",
  "getairmail.com",
  "crazymailing.com",
  "maildrop.cc",
  "getnada.com",
  "tempail.com",
]);

const KNOWN_COMPANY_NAMES: Record<string, string> = {
  "google.com": "Google",
  "microsoft.com": "Microsoft",
  "apple.com": "Apple",
  "meta.com": "Meta",
  "amazon.com": "Amazon",
  "amazon.co.uk": "Amazon",
  "amazon.in": "Amazon",
  "netflix.com": "Netflix",
  "uber.com": "Uber",
  "stripe.com": "Stripe",
  "openai.com": "OpenAI",
  "anthropic.com": "Anthropic",
  "vercel.com": "Vercel",
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "figma.com": "Figma",
  "airbnb.com": "Airbnb",
  "coinbase.com": "Coinbase",
  "twitter.com": "X (Twitter)",
  "x.com": "X",
  "linkedin.com": "LinkedIn",
  "salesforce.com": "Salesforce",
  "adobe.com": "Adobe",
  "spotify.com": "Spotify",
  "datadog.com": "Datadog",
  "cloudflare.com": "Cloudflare",
  "snowflake.com": "Snowflake",
  "palantir.com": "Palantir",
  "atlassian.com": "Atlassian",
  "dropbox.com": "Dropbox",
  "shopify.com": "Shopify",
  "huggingface.co": "Hugging Face",
};

export type EmailValidation = {
  isValid: boolean;
  status: "empty" | "invalid_format" | "disposable" | "personal" | "verified_work";
  domain?: string;
  companyName?: string;
  message?: string;
};

function getCompanyNameFromDomain(domain: string): string {
  const lower = domain.toLowerCase();
  if (KNOWN_COMPANY_NAMES[lower]) return KNOWN_COMPANY_NAMES[lower];
  const parts = lower.split(".");
  let main = parts[0];
  if (parts.length > 2 && ["co", "com", "org", "net", "gov", "edu"].includes(parts[parts.length - 2])) {
    main = parts[parts.length - 3] || parts[0];
  }
  return main.charAt(0).toUpperCase() + main.slice(1);
}

function validateWorkEmail(email: string): EmailValidation {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return { isValid: false, status: "empty" };
  }

  // Syntax check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const match = trimmed.match(emailRegex);
  if (!match) {
    return {
      isValid: false,
      status: "invalid_format",
      message: "Please enter a valid email format (e.g. name@company.com)",
    };
  }

  const domain = match[1];

  // Disposable check
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      status: "disposable",
      domain,
      message: "Disposable or burner email addresses are not accepted.",
    };
  }

  // Personal webmail check
  if (PERSONAL_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      status: "personal",
      domain,
      message: `Work email required. Personal email (@${domain}) is not accepted for recruiter outreach.`,
    };
  }

  const companyName = getCompanyNameFromDomain(domain);

  return {
    isValid: true,
    status: "verified_work",
    domain,
    companyName,
    message: `Verified work domain: ${domain}`,
  };
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);
  const [detectedCompany, setDetectedCompany] = useState("");
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetMessageRef = useRef<string>("");

  const emailValidation = useMemo(() => validateWorkEmail(email), [email]);

  const onEmailChange = (newVal: string) => {
    setEmail(newVal);
    const result = validateWorkEmail(newVal);
    if (result.status === "verified_work" && result.companyName) {
      const newCompany = result.companyName;
      const targets = [detectedCompany, "[Company Name]"].filter(Boolean);
      targets.forEach((target) => {
        setSubject((prev) => prev.split(target).join(newCompany));
        setMessage((prev) => prev.split(target).join(newCompany));
      });
      setDetectedCompany(newCompany);
    }
  };

  const stopGeneration = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsGenerating(false);
  };

  const skipGeneration = () => {
    stopGeneration();
    const targetText = targetMessageRef.current;
    setMessage(targetText);
    setGenerationDone(true);
    setTimeout(() => {
      const el = msgRef.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      el.setSelectionRange(0, 0);
      el.scrollTop = 0;
    }, 40);
  };

  // Role CTAs (HireRoles) prefill the form with a formal, 10/10 reachout draft.
  // The message streams in with an animated typing effect (like an AI-generated
  // message) and brings the form into clear view with a highlight ring.
  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ subject?: string; message?: string; role?: string }>).detail;

      // Stop any existing typing stream
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }

      setDetectedCompany("");
      if (detail?.subject) setSubject(detail.subject);

      const targetText = detail?.message || "";
      targetMessageRef.current = targetText;

      const form = formRef.current;
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        form.classList.remove("form-prefill");
        // Reflow so the animation can retrigger on repeated clicks.
        void form.offsetWidth;
        form.classList.add("form-prefill");
      }

      if (!targetText) return;

      const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setMessage(targetText);
        setGenerationDone(true);
        setTimeout(() => {
          const el = msgRef.current;
          if (el) {
            el.focus({ preventScroll: true });
            const firstBracket = targetText.indexOf("[");
            if (firstBracket !== -1) {
              const endBracket = targetText.indexOf("]", firstBracket);
              if (endBracket !== -1) {
                el.setSelectionRange(firstBracket, endBracket + 1);
              } else {
                el.setSelectionRange(0, 0);
              }
            } else {
              el.setSelectionRange(0, 0);
            }
            el.scrollTop = 0;
          }
        }, 300);
        return;
      }

      // Initialize generative typewriter stream
      setMessage("");
      setIsGenerating(true);
      setGenerationDone(false);

      let currentIndex = 0;
      const totalLen = targetText.length;
      // Stream in brisk chunks so concise message finishes in ~1.0-1.2s
      const chunkSize = Math.max(3, Math.ceil(totalLen / 65));

      delayTimer = setTimeout(() => {
        typingTimerRef.current = setInterval(() => {
          currentIndex += chunkSize;
          if (currentIndex >= totalLen) {
            setMessage(targetText);
            if (typingTimerRef.current) {
              clearInterval(typingTimerRef.current);
              typingTimerRef.current = null;
            }
            setIsGenerating(false);
            setGenerationDone(true);

            // Auto-focus at the beginning of the reachout message
            setTimeout(() => {
              const el = msgRef.current;
              if (!el) return;
              el.focus({ preventScroll: true });
              el.setSelectionRange(0, 0);
              el.scrollTop = 0;
            }, 60);
          } else {
            setMessage(targetText.slice(0, currentIndex));
            if (msgRef.current && msgRef.current.scrollHeight > msgRef.current.clientHeight) {
              msgRef.current.scrollTop = msgRef.current.scrollHeight;
            }
          }
        }, 16);
      }, 180);
    };

    window.addEventListener("prefill-contact", onPrefill as EventListener);
    return () => {
      window.removeEventListener("prefill-contact", onPrefill as EventListener);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  const mailSubject = encodeURIComponent(subject || (name ? `Portfolio message from ${name}` : "Portfolio inquiry"));
  const mailBody = encodeURIComponent(
    message ? `${message}${name || email ? `\n\n— ${name}${email ? ` (${email})` : ""}` : ""}` : ""
  );
  const mailtoUrl = `mailto:${profile.links.email}?subject=${mailSubject}&body=${mailBody}`;

  const mailtoFallback = () => {
    window.location.href = mailtoUrl;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailValidation.isValid) {
      setStatus("error");
      setError(
        emailValidation.message ||
          "A valid company work email address is required."
      );
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

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
      let data: { success?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        // Non-JSON response
      }

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setError(data.message || "Couldn't send via web form right now. You can send directly via email below.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the form service. You can send directly via email below.");
    }
  };

  const field =
    "w-full rounded-xl border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-base)_55%,transparent)] px-4 py-2.5 text-[15px] text-[var(--color-text)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text)_5%,transparent)] placeholder:text-[var(--color-muted)] transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-border)_100%,transparent)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]";
  const labelBase = "font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]";
  const label = `mb-2 block ${labelBase}`;

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
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
          Work Email Verified
        </span>
      </div>

      {/* Honeypot — visually hidden, off the tab order; bots fill it, humans don't. */}
      <input
        type="checkbox"
        id="c-botcheck"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        aria-label="Bot verification check"
        suppressHydrationWarning
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Name</label>
          <input id="c-name" name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" suppressHydrationWarning className={field} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="c-email" className={labelBase}>
              Work Email
            </label>
            {emailValidation.status === "verified_work" && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#4ca373]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Verified Domain
              </span>
            )}
          </div>
          <input
            id="c-email"
            ref={emailRef}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="recruiter@company.com"
            suppressHydrationWarning
            className={`${field} ${
              emailValidation.status === "verified_work"
                ? "!border-[#4ca373] !ring-2 !ring-[#4ca373]/25"
                : email && !emailValidation.isValid
                ? "!border-[#e5a04d] !ring-2 !ring-[#e5a04d]/25"
                : ""
            }`}
          />
          {email && !emailValidation.isValid && (
            <div className="mt-1.5 flex items-start gap-1.5 text-[11px] font-mono text-[#e5a04d]">
              <svg className="mt-0.5 flex-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{emailValidation.message}</span>
            </div>
          )}
          {emailValidation.status === "verified_work" && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-[#4ca373]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verified corporate domain ({emailValidation.domain})</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-subject" className={label}>Subject</label>
        <input id="c-subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" suppressHydrationWarning className={field} />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <label htmlFor="c-msg" className={labelBase}>
            Message
          </label>
          {isGenerating && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--color-accent)] animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                Generating formal reachout…
              </span>
              <button
                type="button"
                onClick={skipGeneration}
                className="focus-accent font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
              >
                Skip
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <textarea
            id="c-msg"
            ref={msgRef}
            name="message"
            required
            rows={8}
            value={message}
            onChange={(e) => {
              if (isGenerating) stopGeneration();
              setMessage(e.target.value);
            }}
            placeholder="Tell me more…"
            suppressHydrationWarning
            className={`${field} min-h-[270px] font-sans text-[14px] leading-relaxed resize-y`}
          />
          {isGenerating && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-base)_85%,transparent)] px-2 py-1 font-mono text-[10px] text-[var(--color-accent)] shadow-sm backdrop-blur-sm"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
              Typing…
            </span>
          )}
        </div>
      </div>

      {/* Status — a confirmation panel on success, actionable fallback on error. */}
      <div aria-live="polite">
        {status === "success" && (
          <div className="mt-5 flex items-start justify-between gap-3 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] text-[var(--color-accent)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <span className="block text-sm font-semibold text-[var(--color-heading)]">Message delivered</span>
                <span className="mt-0.5 block text-sm text-[var(--color-body)]">
                  Thanks for reaching out — I&rsquo;ll get back to you shortly.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="focus-accent text-xs font-mono font-medium text-[var(--color-muted)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
            >
              Reset
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="mt-5 rounded-xl border border-[color-mix(in_srgb,#e5484d_40%,transparent)] bg-[color-mix(in_srgb,#e5484d_8%,transparent)] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,#e5484d_20%,transparent)] text-[#e5484d]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--color-heading)]">
                  Form delivery notice
                </span>
                <p className="mt-0.5 text-xs text-[var(--color-muted)]">{error}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.links.email}&su=${encodeURIComponent(subject || `Portfolio message from ${name || "someone"}`)}&body=${encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-accent inline-flex items-center gap-1.5 rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <span>Open in Gmail</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    onClick={mailtoFallback}
                    className="focus-accent inline-flex items-center gap-1.5 rounded-lg border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_50%,transparent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-text)]"
                  >
                    <span>Send via Mail App</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={busy || (email.length > 0 && !emailValidation.isValid)}
        suppressHydrationWarning
        style={{ color: "var(--color-text)" }}
        className="focus-accent group relative overflow-hidden mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-5 py-3 text-base font-semibold shadow-[0_4px_18px_-8px_color-mix(in_srgb,var(--color-accent)_40%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] hover:shadow-[0_12px_28px_-8px_color-mix(in_srgb,var(--color-accent)_65%,transparent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {/* Sheen sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_42%,color-mix(in_srgb,#ffffff_25%,transparent)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
        />
        <span className="relative inline-flex items-center gap-2">
          {busy ? (
            "Sending…"
          ) : email && !emailValidation.isValid ? (
            "Verified Work Email Required"
          ) : (
            <>
              <span>Send Message</span>
              {emailValidation.status === "verified_work" && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ca373]" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              )}
            </>
          )}
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
        </span>
      </button>
    </form>
  );
}
