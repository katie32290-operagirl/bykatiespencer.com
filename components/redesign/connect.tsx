import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS, BOOK_URL } from "./chrome";
import { ContactFormRedesign } from "./contact-form";
import { MailLink } from "./mail-link";

const INFO: [string, string][] = [
  ["Based in", "Knoxville, TN"],
  ["Reply within", "A couple days"],
  ["Elsewhere", "GreenRoom · Instagram · LinkedIn"],
];

export function ConnectRedesign() {
  return (
    <Shell ground="terra">
      <Nav ground="terra" active="Connect" />
      <GiantTitle ground="terra" size="min(19vw,230px)">Connect.</GiantTitle>

      {/* hero — terracotta */}
      <div className={`${PAD} pb-[clamp(56px,9vw,90px)] pt-[clamp(48px,6vw,64px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.cream }}>Connect</div>
        <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,60px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 820, margin: "26px auto 0" }}>
          Let&rsquo;s start a conversation.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: C.cream, maxWidth: 560, margin: "22px auto 0" }}>
          Big ideas start with real conversations. I&rsquo;d love to hear what you&rsquo;re working on.
        </p>
        <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: C.ox, maxWidth: 560, margin: "18px auto 0" }}>
          Twenty minutes, on a call: a season, a story, or whatever you&rsquo;re making. Not a sales pitch, and not for everyone, but if that sounds like you, let&rsquo;s talk.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 16, color: C.cream, background: C.ox, padding: "15px 32px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
            Book 20 minutes &rarr;
          </a>
          <span style={{ fontSize: 15, color: C.ox }}>or write first, below</span>
        </div>
      </div>

      {/* details + form — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[400px_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/on/katie-connect.jpg" alt="Katie Spencer, downtown Knoxville" className="block w-full object-cover" style={{ height: "clamp(380px,52vw,480px)", objectPosition: "center 25%" }} />
            <div className="mt-7" style={{ borderTop: `1.5px solid ${C.ox}` }}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 py-3.5" style={{ borderBottom: `1.5px solid ${C.ox}`, fontSize: 16, color: C.ox }}>
                <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>Prefer email?</span>
                <MailLink style={{ color: C.ox, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70" />
              </div>
              {INFO.map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-3 py-3.5" style={{ borderBottom: `1.5px solid ${C.ox}`, fontSize: 16, color: C.ox }}>
                  <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 16, fontStyle: "italic", color: C.ox, marginTop: 18 }}>Working with mission-driven teams everywhere.</div>
          </div>
          <ContactFormRedesign />
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
