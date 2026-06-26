import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { VideoEmbed } from "@/components/video-embed";
import { featuredVideos, shortVideos, campaignAssets } from "@/content/campaigns";

const aspectClass: Record<string, string> = {
  poster: "aspect-[11/17]",
  wide: "aspect-[16/10]",
  video: "aspect-video",
};

function Caption({
  title,
  label,
  href,
}: {
  title: string;
  label: string;
  href?: string;
}) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <span className="font-serif text-xl font-medium">{title}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 text-eyebrow hover:text-foreground"
        >
          {label}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : (
        <span className="text-eyebrow">{label}</span>
      )}
    </figcaption>
  );
}

export function CampaignWork({ showHeading = true }: { showHeading?: boolean }) {
  const posters = campaignAssets.filter((a) => a.aspect === "poster");
  const wide = campaignAssets.filter((a) => a.aspect !== "poster");

  return (
    <Section className="border-y border-border/60 bg-card">
      <Container>
        {showHeading && (
          <Reveal>
            <SectionHeading
              eyebrow="Selected campaign work"
              title="A look at the work itself"
              lead="Campaigns, films, and design for Knoxville Opera, from social video to event creative direction."
              className="mb-12"
            />
          </Reveal>
        )}

        {/* Lead film, full width */}
        {featuredVideos[0] && (
          <Reveal>
            <figure>
              <VideoEmbed
                youtube={featuredVideos[0].youtube}
                vimeo={featuredVideos[0].vimeo}
                title={featuredVideos[0].title}
              />
              <Caption
                title={featuredVideos[0].title}
                label={featuredVideos[0].label}
              />
            </figure>
          </Reveal>
        )}

        {/* Remaining films, 2-up */}
        <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
          {featuredVideos.slice(1).map((v) => (
            <StaggerItem key={v.youtube ?? v.vimeo}>
              <figure>
                <VideoEmbed youtube={v.youtube} vimeo={v.vimeo} title={v.title} />
                <Caption title={v.title} label={v.label} />
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Vertical (Instagram / Shorts) videos */}
        {shortVideos.length > 0 && (
          <Stagger className="mt-6 flex flex-wrap gap-6">
            {shortVideos.map((v) => (
              <StaggerItem
                key={v.youtube ?? v.vimeo}
                className="w-full max-w-[260px]"
              >
                <figure>
                  <VideoEmbed
                    youtube={v.youtube}
                    vimeo={v.vimeo}
                    title={v.title}
                    portrait
                  />
                  <Caption title={v.title} label={v.label} />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* Poster / program assets */}
        {posters.length > 0 && (
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {posters.map((a) => (
              <StaggerItem key={a.src}>
                <figure>
                  <a
                    href={a.href ?? a.src!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div
                      className={`relative ${aspectClass[a.aspect ?? "poster"]} overflow-hidden rounded-2xl border border-border transition-colors group-hover:border-foreground/20`}
                    >
                      <Image
                        src={a.src!}
                        alt={a.alt ?? a.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </a>
                  <Caption title={a.title} label={a.label} href={a.href} />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* Wide assets */}
        {wide.map((a) => (
          <Reveal key={a.src} className="mt-6">
            <figure>
              <div
                className={`relative ${aspectClass[a.aspect ?? "wide"]} overflow-hidden rounded-2xl border border-border`}
              >
                <Image
                  src={a.src!}
                  alt={a.alt ?? a.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
              <Caption title={a.title} label={a.label} href={a.href} />
            </figure>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
