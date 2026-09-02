import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";
import { ContactFormRedesign } from "./contact-form";

const INFO: [string, string][] = [
  ["Prefer email?", "hello@bykatiespencer.com"],
  ["Based in", "Knoxville, TN"],
  ["Reply within", "A couple days"],
  ["Elsewhere", "GreenRoom · Instagram · LinkedIn"],
];

export function ConnectRedesign() {
  return (
    <Shell ground="terra">
      <Nav ground="terra" active="Connect" />
      <GiantTitle ground="terra" size="min(19vw,230px)">Connect</GiantTitle>

      {/* hero — terracotta */}
      <div className={`${PAD} pb-[clamp(56px,9vw,90px)] pt-[clamp(48px,6vw,64px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.cream }}>Connect</div>
        <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,60px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 820, margin: "26px auto 0" }}>
          Let&rsquo;s start a conversation.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: C.cream, maxWidth: 560, margin: "22px auto 0" }}>
          Big ideas start with real conversations. I&rsquo;d love to hear what you&rsquo;re working on.
        </p>
      </div>

      {/* details + form — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[400px_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/on/cafe-shoot.jpg" alt="Katie Spencer on set in Knoxville" className="block w-full object-cover" style={{ height: "clamp(280px,38vw,320px)" }} />
            <div className="mt-7" style={{ borderTop: `1.5px solid ${C.ox}` }}>
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
