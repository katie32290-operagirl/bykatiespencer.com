"use client";

import { useEffect, useState } from "react";

/**
 * Renders the contact email without leaving a scrapeable `mailto:` in the
 * static HTML. Server output (and first hydration pass) shows an obfuscated
 * string; once mounted it becomes a real mailto link.
 */
export function MailLink({
  style,
  className,
  subject,
  label,
}: {
  style?: React.CSSProperties;
  className?: string;
  subject?: string;
  label?: string;
}) {
  const user = "hello";
  const domain = "bykatiespencer.com";
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <span style={style} className={className}>
        {label ?? `${user} [at] ${domain}`}
      </span>
    );
  }
  const href = `mailto:${user}@${domain}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a href={href} style={style} className={className}>
      {label ?? `${user}@${domain}`}
    </a>
  );
}
