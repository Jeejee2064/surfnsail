import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { LinkButton } from "@/components/Button";
import { SmartImage } from "@/components/SmartImage";
import { getActivitiesContent } from "@/lib/content";
import type { Activity } from "@/lib/content-types";

// Activities are one of only two page types (alongside home) that earn a
// full-screen photo hero — see brief: everywhere else uses the photo-less
// PageIntro. A single mid-article image breaks up the text column so each
// activity still reads like a short story rather than a spec sheet.
export async function ActivityBody({ locale, slug }: { locale: Locale; slug: Activity["slug"] }) {
  const { activities } = getActivitiesContent(locale);
  const activity = activities.find((a) => a.slug === slug)!;
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const midIndex = Math.ceil(activity.sections.length / 2);

  return (
    <>
      <Hero
        image={activity.heroImage}
        imageAlt={`${activity.title} — ${activity.subtitle}`}
        eyebrow="Activities"
        title={activity.title}
        subtitle={activity.subtitle}
        priority
      >
        <LinkButton href="/contact" variant="primary">
          {tCommon("requestToBook")}
        </LinkButton>
      </Hero>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink/70">
            <p>{activity.intro}</p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-14">
            {activity.sections.map((section, i) => (
              <Fragment key={section.heading}>
                <Reveal delay={i * 80}>
                  <h2 className="font-display text-[length:var(--text-h3)] font-semibold text-ink">{section.heading}</h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-ink/70">
                    {section.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </Reveal>
                {activity.midImage && i === midIndex - 1 && (
                  <Reveal className="relative aspect-[16/9] overflow-hidden">
                    <SmartImage
                      src={activity.midImage.src}
                      alt={activity.midImage.alt}
                      fill
                      sizes="(min-width: 1024px) 768px, 90vw"
                      className="object-cover"
                    />
                  </Reveal>
                )}
              </Fragment>
            ))}
          </div>

          <div className="mt-16 text-center">
            <LinkButton href="/contact" variant="primary">
              {tCommon("requestToBook")}
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
