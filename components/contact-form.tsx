"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const OPTIONS = ["Projects", "Advising", "Speaking", "Something else"];

const INBOX = "hello@bykatiespencer.com";
/** Web3Forms access key (publishable). Get one free at https://web3forms.com. */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const labelCls =
  "font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground";
const inputCls =
  "mt-2 w-full border-0 border-b border-border bg-transparent pb-2 text-lg text-foreground outline-none transition-colors focus:border-brand";

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
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* Honeypot — bots fill this, humans never see it */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <h2 className="font-serif text-3xl tracking-tight text-foreground">
        Tell me a little about it.
      </h2>

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
        <p className={labelCls}>How can we work together?</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {OPTIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              aria-pressed={selected.includes(o)}
              className={cn(
                "rounded-full border px-5 py-2 font-sans text-sm transition-colors",
                selected.includes(o)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground/50",
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-3 w-full rounded-xl border border-border bg-transparent p-4 text-foreground outline-none transition-colors focus:border-brand"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-fit rounded-full bg-foreground px-8 py-3.5 font-sans text-sm text-background transition-transform hover:scale-[1.03] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send it over"}
      </button>
    </form>
  );
}
