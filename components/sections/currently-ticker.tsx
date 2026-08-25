/** A slim teal band — what's happening right now, at a glance. */
export function CurrentlyTicker() {
  return (
    <section className="bg-olive">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-5 font-sans text-[11px] uppercase tracking-[0.16em] text-cream/70 sm:text-xs">
        <span className="text-pink">Currently &mdash;</span>
        <span>
          Building GreenRoom <span className="text-pink">&bull;</span> 2026
        </span>
        <span>Building Narratives</span>
        <span>Writing</span>
        <span>Speaking</span>
        <span>Collaborating</span>
      </div>
    </section>
  );
}
