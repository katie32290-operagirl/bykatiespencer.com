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
    slug: "masters-in-opera-built-a-crm-anyway",
    category: "On building",
    date: "October 2026",
    eyebrow: "Notes",
    title: "I Have a Master’s in Opera. I Built a CRM Anyway",
    subtitle: "Maybe being non-technical is the point.",
    lead: "The first time I watched a real relationship with a donor slip through the cracks, nobody stopped caring.",
    body: `The first time I watched a real relationship with a donor slip through the cracks, nobody stopped caring.

I cared. I knew this person. I knew what performances they had come to. I remembered conversations we’d had in the lobby. I probably knew who they sat with and whether they preferred the gala or would rather be invited to something smaller.

But some of that information was in the database. Some was in my inbox. Some was in a spreadsheet. And a lot of it was just in my head.

Meanwhile, I was also doing the rest of my job.

And in the arts, “the rest of my job” could mean building a gala seating chart, figuring out sponsor tables, getting the weekly email out, checking subscription sales, writing copy for the next production, answering a board member, working through a sponsor deadline, meeting with the city about an upcoming festival, solving something for the box office, and suddenly remembering that the artists need to know what to wear for media day when they arrive and I still haven’t sent them that email.

I have run a festival with four stages and sixty vendors while also carrying donor relationships.

And the crazy thing is, that is not an unfathomable workload in arts administration.

So the donor I genuinely cared about would sometimes fall out of the front of my brain.

Then three months later I’d need to call because we were launching a campaign.

And suddenly I was in the exact position I never wanted to be in: reaching out when I needed money.

It looked transactional.

Worse, I knew it looked transactional.

The frustrating part was that it wasn’t true.

I did care about that person. I wanted to know how they were doing. How the renovation was going. How their mother’s move went. I wanted to call when I didn’t need anything.

I just also had hard deadlines attached to very real things that actually had to get done.

And there were only so many hours in the day.

That tension is probably the earliest version of GreenRoom.

Not, “How do we raise more money?”

How do we build systems that help people actually take care of people when the people doing the caring are also doing five jobs?

---

**The software wasn’t built for the way we worked**

If you’ve worked inside a small or midsize arts organization, you already know the system.

And by “system,” I mostly mean a collection of systems held together by human beings.

The donor database.

The ticketing platform.

Mailchimp.

The spreadsheet.

The other spreadsheet.

The spreadsheet called something like FINAL_GalaSeating_v3_REALFINAL.xlsx that everyone is terrified to touch.

The Google Drive folder.

Someone’s inbox.

The report only one person knows how to run.

A sticky note stuck to the monitor.

And then there is the most important database of all:

Susan knows.

Whatever the question is, Susan probably knows.

Who always buys four tickets but never subscribes? Susan knows.

Which donor hates phone calls but will talk to you for twenty minutes at intermission? Susan knows.

Which patron has been attending since before half the staff was born? Susan knows.

Then Susan retires.

And suddenly the organization discovers that fifteen years of institutional knowledge was never actually institutional.

It belonged to Susan.

That problem fascinated me because it happened everywhere.

There are sophisticated systems in the arts. Some of them are incredibly powerful. But a lot of them assume you have the staff, money, time, and technical infrastructure to operate them the way they were intended.

Many arts organizations do not.

The reality I knew was a development director doing marketing. A marketing director helping with front of house. An executive director reviewing a grant at 9:30 p.m. A box office person who knows every patron by name and keeps half the organization running through sheer memory.

You’re selling subscriptions while planning a fundraiser while the artistic team needs something while somebody asks if the newsletter went out.

The answer is usually: “I know. I’m doing it.”

That is the environment the software has to survive.

---

**Fundraising is a relationship business**

Here is the thing I think software gets wrong when it starts with the database instead of the person:

The database is not the point.

The relationship is the point.

A $5,000 gift is not just a $5,000 gift.

It might be someone who has been sitting in the same section for fifteen years. It might be the woman who brings a friend to every opening night. It might be the person who first gave $100, then sponsored a table, then joined the board. It might be someone whose spouse died last year, which is probably something you should remember before sending an invitation addressed to both of them.

Those things matter.

They are not “soft data.” They are the relationship.

And if you work in development, you know the strange guilt of having all of that information somewhere and still not being able to use it well.

I had the information. What I didn’t have was the mental bandwidth to constantly assemble it.

Before a donor meeting, I didn’t want to spend twenty minutes checking the CRM, then the ticketing system, then my email, then a spreadsheet, trying to reconstruct a human being.

I wanted the system to say:

Here’s Kim. She’s been coming for eight years. She gave last December. She attended the last two productions. You had coffee in March. Her husband had surgery. You told her you’d send information about the education program. Call her.

That isn’t replacing relationship-building. That is what makes relationship-building possible when the person doing it is buried under administration.

**A CRM should remember enough that the human being using it gets to be more human. Not less.**

---

**Then I realized fundraising wasn’t really the problem**

Once I started looking at development this way, I couldn’t unsee the rest of the organization.

The donor record was fragmented because the whole organization was fragmented.

Marketing knew what emails someone opened. Ticketing knew what they bought. Development knew what they gave. The box office knew where they liked to sit. Someone else knew they sponsored a gala table.

And maybe that same person had been a subscriber, donor, volunteer, sponsor, and board prospect over ten years.

To the organization, that is one person. To the software, they might as well be five different people.

The same thing was happening everywhere else. Artist contracts over here. Travel over there. Rehearsal schedules in another document. Patron communications somewhere else. Seating charts somewhere else. Programs somewhere else.

And because small arts organizations rarely have enough staff, the burden of connecting all of it falls on the people.

That is why people burn out.

Not because they don’t love the art. Usually they love it so much they are willing to tolerate an insane amount of administrative nonsense to keep making it happen.

I know I did.

But eventually I started asking a different question.

What would software look like if it actually understood an arts organization?

Not a sales company with “arts” terminology layered on top. An arts organization.

One where a ticket buyer can become a subscriber, donor, sponsor, volunteer, board member, or all five. One where development and marketing are talking about the same person. One where the person running the organization does not need fourteen tabs open to understand what is happening. One where changing something in the spreadsheet doesn’t require someone to say: “Did we change it in the database too?”

That question became GreenRoom.

---

**There was just one catch.**

I am not a developer.

I have a master’s degree in vocal performance. I went to school to sing opera.

There was no class at Manhattan School of Music called “How to Build a SaaS Company Because You Have Finally Had Enough of Your CRM.”

I did not know how to code.

But eventually I got tired of waiting for someone else to solve it.

And something shifted for me.

To this day, I still have moments where I think: What on earth do I think I’m doing? The imposter syndrome is very real.

But lately I’ve started wondering if I’ve been looking at the whole thing backward.

Maybe knowing how to build the software was never the only valuable expertise. Maybe knowing exactly why the existing software failed was expertise too.

Because I wasn’t guessing. I had actually done the work: built campaigns, managed donor portfolios, marketed seasons, run subscriptions, produced fundraising events, built seating charts and sponsor tables, handled guest hospitality. I had worked inside that strange overlap between audience development, fundraising, marketing, ticketing, and producing where small arts organizations actually live.

I knew what it felt like to stare at a spreadsheet late at night and think: I know the answer. I just need to remember where it lives.

I knew what information I wanted five minutes before a donor walked into the room.

I knew the particular insanity of knowing your organization technically possessed the information you needed while also knowing it might take you half an hour to find it.

I knew what the software needed to understand. I just didn’t know how to build it yet.

Those are different problems.

So I found a developer I trust. And I started learning.

Not how to become a software engineer. That still isn’t my job.

And somewhere along the way, the thing I thought was my weakness started to look a lot more like the reason this works.

---

**Maybe being non-technical is the point**

I am deeply uninterested in technology for technology’s sake.

I don’t care if something is impressive under the hood if the executive director cannot figure out how to use it. I don’t care how sophisticated a workflow is if the result is six more clicks for someone who already has too much to do.

And I am not interested in teaching arts administrators how to think like software. The software should understand how they already work.

That is the filter I bring to GreenRoom precisely because I did not come from software.

My test is much less complicated.

*Does this help?*

Can the development director walk into a donor meeting more prepared? Can the marketing person stop exporting lists and reconciling duplicates? Can the box office person find what they need without keeping half of it in their head? Can the executive director come out of a rehearsal, a board meeting, or whatever fire she was putting out and understand what happened while she was gone?

Can we help a three-person team spend less time buried in administration and more time doing the work only they can do?

That is what I care about.

Because arts administration is not the point. The *art* is the point.

Administration serves the art.

Every hour we can give back matters. Every repetitive task we can remove matters. Every piece of information someone doesn’t have to manually chase matters.

Not because efficiency is inherently noble. Because that hour can go back into the relationship, the audience, the artist, the stage.

It matters.

---

GreenRoom is the CRM I wish I’d had, built for the way arts organizations actually work. If this sounded like your life, come see it: [greenroomcrm.com](https://greenroomcrm.com).`,
  },
  {
    slug: "sometimes-the-show-is-the-problem",
    category: "Audiences",
    date: "August 2026",
    eyebrow: "Notes",
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
    eyebrow: "Notes",
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
