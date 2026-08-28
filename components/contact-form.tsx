"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const OPTIONS = ["Narratives", "Advising", "Speaking", "Something else"];

const INBOX = "hello@bykatiespencer.com";
/** Web3Forms access key (publishable). Get one free at https://web3forms.com. */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const labelCls =
  "font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint";
const inputCls =
  "mt-2 w-full rounded-[2px] border border-line bg-paper-bright px-3.5 py-3 font-sans text-base text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/25";
const textareaCls =
  "mt-2 w-full rounded-[2px] border border-line bg-paper-bright p-3.5 font-sans text-base text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/25";

/**
 * Connect form. Client-side handler with optimistic feedback — swap the body of
 * `onSubmit` for a POST to an API route / email service when ready.
 */
export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (o: string) =>
    setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const interested = selected.join(", ") || "—";

    // Fallback until the email service is configured: open the visitor's mail
    // client with the note pre-filled to hello@bykatiespencer.com.
    if (!ACCESS_KEY) {
      const body = `Name: ${fd.name}\nEmail: ${fd.email}\nOrganization: ${
        fd.organization || "—"
      }\nInterested in: ${interested}\n\n${fd.message}`;
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(
        `New note from ${fd.name}`,
      )}&body=${encodeURIComponent(body)}`;
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New note from ${fd.name} — bykatiespencer.com`,
          from_name: "bykatiespencer.com",
          replyto: fd.email,
          botcheck: fd.botcheck ?? "",
          Name: fd.name,
          Email: fd.email,
          Organization: fd.organization || "—",
          "Interested in": interested,
          Message: fd.message,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      toast.success("Thanks! Your note is on its way.", {
        description: "I'll get back to you within a couple of days.",
      });
      form.reset();
      setSelected([]);
    } catch {
      toast.error("Something went wrong.", {
        description: `Please email ${INBOX} directly.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      {/* Honeypot — bots fill this, humans never see it */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      {/* The RSVP card — a clean note left at the stage door. Tape on the
          corners, paper grain, near-square. Fields stay upright and legible. */}
      <div
        className="relative flex flex-col gap-8 rounded-[2px] border border-line bg-paper-bright p-[clamp(22px,3.4vw,44px)]"
        style={{
          backgroundImage: "var(--paper-grain)",
          boxShadow: "var(--shadow-paper)",
        }}
      >
        <span className="ks-tape absolute -top-3 left-9 z-[2]" />
        <span className="ks-tape absolute -top-3 right-9 z-[2] [transform:rotate(3deg)]" />

        <div>
          <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-red">
            <span className="text-gold">&#10022;</span> Stage door &middot; leave a note
          </p>
          <h2 className="mt-3 font-serif text-[clamp(28px,3vw,38px)] leading-[1.08] text-foreground">
            Tell me what you&rsquo;re working on.
          </h2>
        </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className={labelCls}>
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
          className={inputCls}
        />
      </div>

      <div>
        <p className={labelCls}>What brings you here?</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {OPTIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              aria-pressed={selected.includes(o)}
              className={cn(
                "rounded-[2px] border px-4 py-2 font-accent text-[11px] uppercase tracking-[0.12em] transition-colors",
                selected.includes(o)
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-foreground hover:border-foreground/60",
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          What&rsquo;s on your mind?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={textareaCls}
        />
      </div>

      {/* Submit — a ticket stub torn from the card */}
      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-fit items-stretch self-start rounded-[2px] [transform:rotate(-1deg)] transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)] disabled:opacity-60"
        style={{ boxShadow: "0 8px 20px rgba(22,17,13,.28)" }}
      >
        <span className="flex items-center border border-r-0 border-ink bg-paper-deep px-3 py-3.5 font-accent text-[11px] uppercase tracking-[0.13em] text-ink [border-right:1px_dashed_var(--ink)]">
          Admit one
        </span>
        <span className="flex items-center border border-l-0 border-ink bg-ink px-7 py-3.5 font-accent text-[13px] uppercase leading-none tracking-[0.13em] text-paper">
          {submitting ? "Sending…" : "Send it over"}
        </span>
      </button>
      </div>
    </form>
  );
}
