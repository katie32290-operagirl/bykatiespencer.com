// Longform essays ("Notes from the house"), listed at /writing and read at
// /writing/[slug].
//
// Format conventions for `body`:
//   • Blocks are separated by a blank line. Each block renders on its own,
//     so deliberately short single-line blocks keep their line-by-line pacing
//     instead of collapsing into a paragraph.
//   • A line containing only `---` marks a section break — rendered as a quiet
//     ornament + whitespace, never a literal rule.
//   • Inline emphasis: `**bold**` and `*italic*`. Straight apostrophes are
//     curled to typographic ’ at render time.

export type Note = {
  slug: string;
  /** Editorial category, shown as the mono kicker (e.g. "On craft"). */
  category: string;
  /** Human date label shown beside the category. */
  date: string;
  /** Small eyebrow above the title. */
  eyebrow: string;
  title: string;
  /** Optional italic subtitle set directly beneath the title. */
  subtitle?: string;
  /** Opening line — the card excerpt, and the standfirst when no subtitle. */
  lead: string;
  body: string;
};

export const notes: Note[] = [
  {
    slug: "sometimes-the-show-is-the-problem",
    category: "Audiences",
    date: "August 2026",
    eyebrow: "Writing",
    title: "Sometimes the Show Is the Problem",
    subtitle: "Marketing makes the promise. The experience has to keep it.",
    lead: "Nobody says this out loud at opera conferences: sometimes people don’t come back because the show was a dud.",
    body: `Nobody says this out loud at opera conferences:

Sometimes people don’t come back because the show was a dud.

We spend a lot of time in the performing arts talking about audiences. How do we attract new ones? How do we make people feel welcome? Is it ticket price? Is opera intimidating? Do people know what to wear? Are we programming the right repertoire?

Those are important questions.

But there are really two questions, and we only like one of them.

How do we get someone to take a chance on us?

And then:

Did we give them an experience worth coming back for?

We are much more comfortable with the first one.

People are willing to come.

[OPERA America's national research](https://www.operaamerica.org/industry-resources/2024/202411/understanding-opera-s-new-audiences-research-report/), built on more than 11,000 responses across 36 companies, should give the field some confidence.

New people are trying opera. Sixty percent of those new to opera said wanting to try something new played a role in getting them there. Many were curious enough to prepare: 34% listened to music from the opera before they came.

That doesn't sound like an audience that doesn't care. It sounds like an audience willing to take a chance on us.

Which changes the assignment.

We don't have to manufacture curiosity from nothing. We have to help curiosity overcome uncertainty.

---

***Gianni Schicchi* is basically *Knives Out* with Puccini.**

People who work in the arts forget how much invisible knowledge we carry around. We know what La bohème is. We know approximately what to wear. We know we don’t need Italian to follow it. We know when to clap, or at least know nobody is actually going to throw us out if we get it wrong.

A newcomer doesn't necessarily know any of that.

So the invitation matters.

For each production I marketed at Knoxville Opera, I kept coming back to one question:

Why should anyone care about this story?

For Gianni Schicchi, the answer wasn’t “because it’s Puccini.”

A wealthy man dies. His family discovers they hate the will. Everyone starts scheming over the inheritance. It's funny, it's messy, and it's about money and family members behaving terribly.

So we marketed it like Knives Out. Everyone knows that movie. Nobody needs it explained.

The synopsis became a lunch between Lauretta and her friend gossiping about what happened. Characters gave reality-TV-style confessionals. For people who wanted to go deeper, the artists sat down for a longer Behind the Music conversation.

We didn't make Puccini less sophisticated.

We gave people somewhere familiar to begin.

Over the course of my time at Knoxville Opera, first-time attendance per production increased 101%. Overall audiences grew 40%. Revenue per show increased 27%.

Those numbers reflect years of work across programming, marketing, development, audience experience, and organizational change. I would never attribute them to one campaign or one tactic.

But they did reinforce something I had already started to believe:

We make the leap unnecessarily large when we market unfamiliar art almost entirely through information that matters most to people who already know they want it.

Composer. Cast. Conductor. Dates. Ticket link.

All useful.

None of it necessarily answers the question a new audience member is actually asking:

*Why would I enjoy this?*

Getting better at answering that question can help earn a first ticket.

---

Then comes the part marketing can't fix.

We have to earn the second ticket.

When someone doesn't return, we have a long list of explanations available. Tickets are too expensive. Parking is difficult. Marketing didn't follow up. They didn't understand the piece. They aren't used to attending the performing arts.

Sometimes those explanations are true, and the research backs them up. In that same OPERA America study, 52% of new-to-opera attenders named ticket cost as something keeping them from coming more often. It was the top barrier.

So I want to be careful here.

Affordability is real, and I am not interested in waving it away.

But price and value are not the same question.

Fans at Taylor Swift's Eras Tour spent an average of roughly $1,300 per show once tickets, outfits, travel, food and merchandise were counted. Many spent far more than they originally planned.

Obviously, opera is not Taylor Swift.

That's not the comparison.

The comparison is what people are willing to spend when they believe an experience is worth it.

A $40 ticket can feel expensive when the experience disappoints you.

A $100 ticket can feel entirely worth it when you leave exhilarated.

So when someone doesn't come back, cost may be part of the answer.

But it can also become a very comfortable answer.

Because the alternative requires us to ask a harder question:

**Was the show actually good?**

Not important.

Not artistically ambitious.

Not something everyone worked incredibly hard on.

Good.

Did it move? Did the comedy land? Could you follow the story? Were the performances compelling? Did the production have something to say? Did the evening feel alive?

Did someone who gave us their money, arranged childcare, drove downtown, found parking and spent three hours with us leave thinking:

*I want to do that again.*

Sometimes the answer is no.

And there is a wrinkle in the audience data itself that makes this even more important.

OPERA America is candid about a limitation in the research. The survey went out by email, and as the report puts it, it was still more likely to capture the respondents who were already more highly affiliated, the ones who open emails and take time to respond. If someone attended once, hated it and stopped engaging with the organization entirely, they are also less likely to still be on that list.

*The people most disappointed by the experience may be the people we hear from least.*

---

**Why nobody says it.**

Here is the part that makes this hard, and it isn't cowardice.

In most organizations, the people closest to audience response are often the ones with the least standing to talk about the art.

Marketing and development staff hear it first.

We read the emails.

We watch the lobby at intermission.

We hear what patrons say on the way out.

We notice which subscribers quietly don't renew.

But we are also the people who are not supposed to have opinions about artistic quality, because that isn't our department, and because we need those working relationships intact next season.

So the feedback gets softened on its way up, or it doesn't travel at all.

Nobody lies. It just becomes: “Audiences found it challenging.”

I'm not suggesting marketing directors should start reviewing productions. I'm suggesting organizations need an honest internal language for when something simply didn't work.

A production can have extraordinary singers and still feel dramatically dead. A concept can be interesting and fail in the room. Something can be beautifully designed and still be boring. A production can simply be a dud.

That doesn't mean the artists are bad or the repertoire was a mistake.

It means one production didn't work.

And if we can't say that, we can't learn from it.

---

**Audience development can't stop at acquisition.**

Getting a first-time attendee through the door is not the same thing as building an audience.

Marketing can create context. It can reduce uncertainty. It can make something unfamiliar feel worth trying. It can make the invitation better.

But it can only get someone into the room.

So when a first-time attendee doesn't return, we should absolutely look at ticket price. We should look at parking and communications and welcome and follow-up.

And then we should keep looking.

Which productions brought new people back? Which didn't? What did audiences say? Where did the energy drop?

Sometimes the problem is the doorway.

Sometimes it's the experience on the other side.

If we want audiences to take a chance on us, we have to make that first leap easier. And once they do, we have to make the experience worth returning for.

**Marketing makes the promise.**

**The experience has to keep it.**`,
  },
  {
    slug: "what-opera-taught-me-about-building",
    category: "On craft",
    date: "July 2026",
    eyebrow: "Writing",
    title: "What Opera Taught Me About Building",
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
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
