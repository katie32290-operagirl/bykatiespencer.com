// A single longform essay, hosted at /writing.
//
// Format conventions for `body`:
//   • Blocks are separated by a blank line. Each block renders on its own,
//     so deliberately short single-line blocks keep their line-by-line pacing
//     instead of collapsing into a paragraph.
//   • A line containing only `---` marks a section break — rendered as a quiet
//     ornament + whitespace, never a literal rule.
//   • Inline emphasis: `**bold**` and `*italic*`. Straight apostrophes are
//     curled to typographic ’ at render time.

export const writing = {
  eyebrow: "Writing",
  title: "What Opera Taught Me About Building",
  // The opening line reads as a standfirst above the body.
  lead: "I spent fifteen years preparing to walk onto stages I couldn't fully see until the lights came up.",
  body: `It turns out opera is a strange place to learn how to build a company. You rehearse in fluorescent-lit studios with folding chairs standing in for castles and tape on the floor marking walls that don't exist yet. You spend weeks creating something enormous in conditions that look nothing like the final product. Then one day, the orchestra tunes, the house fills, the lights come up, and you find out whether all that invisible work holds together.

I thought I was learning how to perform.

It turns out I was learning how to build.

---

I'll never forget my first vocal jury in college.

If you've never been through one, it's essentially your final exam as a singer. The voice faculty sits scattered throughout the auditorium while you stand alone on stage under the lights and perform with your pianist.

I was singing an aria with a high note that came around twice.

The first time, I cracked.

My heart sank.

But I knew the phrase would come back again, and I remember thinking, *I've got another chance.*

When it did, I made the mistake so many young singers make.

I tried harder.

I pushed.

And I cracked even worse.

Walking off that stage was one of the most humbling moments of my education.

However, my problem wasn't effort.

It was technique.

Years later, that same high note became one of the easiest parts of the aria. Not because I became stronger. Because I became better. I learned to trust my technique instead of forcing the sound.

Technique is the discipline that allows difficult things to feel effortless.

The audience shouldn't hear how hard the note is.

The user shouldn't feel how hard the engineering was.

The products we admire most don't overwhelm us with complexity. They hide it.

I find myself returning to that lesson almost every day as I build my company.

---

Opera teaches another lesson, too.

A singer practices the same phrase forty times not because it's broken, but because it isn't right yet.

**Broken is obvious.**

**It demands attention.**

**Not-right-yet is quiet.**

**It lets you off the hook.**

You could leave it alone and no one in the rehearsal room would know.

But you would know.

And eventually, under pressure, whatever you ignored introduces itself.

The architecture decision that seemed good enough.

The onboarding flow you knew was confusing.

The edge case you decided could wait.

They're invisible.

Until they aren't.

Opera teaches you to be harder on yourself in rehearsal than your audience will ever need you to be on opening night.

Not because perfection is the goal.

Because craftsmanship is.

---

When you perform music that's three hundred years old, you're not exactly working with a blank canvas.

The notes are the notes.

The libretto is the libretto.

The composer isn't taking feedback.

I've come to realize the constraints aren't limiting creativity.

They direct it.

Mozart didn't write for imaginary singers. He wrote for real people with particular voices, strengths, and limitations. Those constraints shaped the music itself.

Building software isn't much different.

I've stopped waiting for better conditions.

That's never where the interesting work happens anyway.

---

There is no final version of an opera.

I've sung Cherubino in *The Marriage of Figaro* twice, a role I sometimes think Mozart wrote specifically to humble mezzos.

Every production was different.

Honestly, every performance was different.

Because the work is alive.

Every audience changes it.

Every cast changes it.

You learn to pay attention.

You adjust.

You stay curious.

Building a product asks the same thing.

You don't release it into a static world.

You release it into a living one.

People use it differently than you expected.

The performers I admired most weren't the ones who had every answer.

They were the ones who could hold a strong interpretation while remaining open to new information.

That's how I want to build.

With conviction and curiosity in equal measure.

---

I never expected opera to prepare me for building software.

I thought I was learning to sing.

Somewhere between rehearsal rooms and opening nights, I learned something I didn't yet have a name for.

The best work never asks you to notice how difficult it was to create.

It simply feels effortless.`,
} as const;
