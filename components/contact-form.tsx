"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Contact form. Currently a client-side handler with optimistic feedback —
 * structured so the submit can be wired to an API route (Resend, Formspree,
 * etc.) by replacing the body of `onSubmit`.
 */
export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      // TODO: POST `data` to an API route / email service.
      await new Promise((r) => setTimeout(r, 700));
      void data;
      toast.success("Thanks! Your note is on its way.", {
        description: "I'll get back to you within a couple of days.",
      });
      form.reset();
    } catch {
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="organization">Organization</Label>
        <Input id="organization" name="organization" autoComplete="organization" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">How can I help?</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your institution and what you're trying to build…"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="mt-2 w-fit rounded-full"
      >
        {submitting ? "Sending…" : "Send message"}
        <Send className="size-4" />
      </Button>
    </form>
  );
}
