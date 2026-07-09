import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { ParallaxBand } from "@/components/ParallaxBand";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { LinkButton } from "@/components/Button";
import { SmartImage } from "@/components/SmartImage";
import { getHomeContent, getAboutContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { localBusinessJsonLd } from "@/lib/structured-data";

const PASSIONS = ["surfing", "sailing", "fishing", "diving"] as const;
const PASSION_IMAGES: Record<(typeof PASSIONS)[number], string> = {
  surfing: "/surfing-sunset-waves.jpg",
  sailing: "/undersails.jpeg",
  fishing: "/fishing.jpg",
  diving: "/diving.jpg",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "es"
      ? {
          title: "Charters de Catamarán de Lujo en Bocas del Toro, Panamá | Surfnsail",
          description:
            "Charters privados en catamarán en Bocas del Toro, Panamá. Viajes de navegación todo incluido, alquiler de yates de lujo y recorridos por las islas a bordo de Aventura y Exta Sea.",
        }
      : {
          title: "Luxury Catamaran Charters in Bocas del Toro, Panama | Surfnsail",
          description:
            "Private catamaran charters in Bocas del Toro, Panama. All-inclusive sailing trips, luxury yacht rental and island-hopping aboard Aventura & Exta Sea.",
        };

  return buildMetadata({ locale, path: "", ...copy, image: "/droneanchorage.jpeg" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Nav" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const home = getHomeContent(locale).home;
  const { crew: crewMembers } = getAboutContent(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
      />

      <Hero
        image="/droneanchorage.jpeg"
        imageAlt="Aerial view of a Surfnsail catamaran anchored off a white sand beach in turquoise water, Bocas del Toro"
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        priority
      >
        <LinkButton href="/contact" variant="primary">
          {home.hero.ctaPrimary}
        </LinkButton>
        <LinkButton href="/packages" variant="secondary">
          {home.hero.ctaSecondary}
        </LinkButton>
      </Hero>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>{home.intro.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-ink">
                {home.intro.heading}
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
                {home.intro.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <SmartImage
                  src="/chill.jpeg"
                  alt="A guest relaxing on the trampoline netting of a Surfnsail catamaran over turquoise water"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={home.whyChoose.eyebrow} heading={home.whyChoose.heading} />
            </Reveal>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {home.whyChoose.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 80}>
                  <div className="flex gap-5 border-t border-ink/10 pt-6">
                    <span className="font-display text-2xl text-brand-600/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ParallaxBand
        image="/bowclients.jpeg"
        imageAlt="Guests relaxing on the bow of a Surfnsail catamaran under sail"
        eyebrow={home.experiences.eyebrow}
        heading={home.experiences.heading}
        height="tall"
        align="center"
      />

      <section className="border-y border-ink/10 bg-tint py-14">
        <Container>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-8 text-center">
            {home.experiences.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="max-w-[220px]">
                <p className="font-display text-lg text-ink">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <SmartImage
                  src="/catamaran.jpeg"
                  alt="Aventura and Exta Sea catamarans"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <Eyebrow>{home.fleetTeaser.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-ink">
                {home.fleetTeaser.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">{home.fleetTeaser.body}</p>
              <LinkButton href="/fleet" variant="ghost" className="mt-8">
                {home.fleetTeaser.cta}
              </LinkButton>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-tint py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow={home.passions.eyebrow} heading={home.passions.heading} align="center" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASSIONS.map((slug, i) => (
              <Reveal key={slug} delay={i * 90} className={i % 2 === 1 ? "lg:mt-12" : ""}>
                <Link
                  href={`/activities/${slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <SmartImage
                    src={PASSION_IMAGES[slug]}
                    alt={t(slug)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-5 left-5 font-display text-2xl text-bone">
                    {t(slug)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow={home.crewTeaser.eyebrow} heading={home.crewTeaser.heading} body={home.crewTeaser.body} align="center" />
          <div className="mx-auto mt-16 grid max-w-xl gap-10 sm:grid-cols-2">
            {crewMembers.map((member, i) => (
              <Reveal key={member.slug} delay={i * 100}>
                <Link href="/about" className="group block text-center">
                  <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full">
                    <SmartImage
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="160px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 font-display text-xl text-ink">{member.name}</p>
                  <p className="text-sm text-ink/60">{member.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <LinkButton href="/about" variant="ghost">
              {home.crewTeaser.cta}
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-28 text-center text-bone sm:py-36">
        <SmartImage
          src="/sunset.webp"
          alt="Sunset over the water in Bocas del Toro"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-950/95 via-sea-950/75 to-sea-950/50" />
        <Container className="relative">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-display)] leading-[1.02] tracking-tight">
              {home.closingCta.heading}
            </h2>
            <LinkButton href="/contact" variant="primary" className="mt-9">
              {tCommon("bookNow")}
            </LinkButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
