import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { LinkButton } from "@/components/Button";
import { SmartImage } from "@/components/SmartImage";
import { MasonryGallery } from "@/components/Gallery";
import { getFleetContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { vesselJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

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
          title: "Nuestra Flota — Aventura y Exta Sea | Surfnsail",
          description:
            "Conoce los dos catamaranes de Surfnsail en Bocas del Toro: Aventura, capitaneado por Marius, y Exta Sea, capitaneado por Jeremy. Especificaciones, comodidades y capacidad de cada uno.",
        }
      : {
          title: "Our Fleet — Aventura & Exta Sea | Surfnsail",
          description:
            "Meet Surfnsail's two catamarans in Bocas del Toro: Aventura, captained by Marius, and Exta Sea, captained by Jeremy. Specs, amenities and capacity for each vessel.",
        };

  return buildMetadata({ locale, path: "/fleet", ...copy });
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { fleetIntro, fleet } = getFleetContent(locale);
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Our Fleet", path: "/fleet" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {fleet.map((vessel) => (
        <script
          key={vessel.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vesselJsonLd(locale, vessel)) }}
        />
      ))}

      <PageIntro eyebrow={fleetIntro.eyebrow} title={fleetIntro.heading} subtitle={fleetIntro.body} />

      <div className="border-b border-ink/10 bg-tint-dark py-6">
        <Container>
          <Reveal className="flex flex-wrap items-center justify-center gap-3">
            {fleet.map((vessel) => (
              <a
                key={vessel.slug}
                href={`#${vessel.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:text-brand-600"
              >
                {vessel.name}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 2l6 3-6 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </Reveal>
        </Container>
      </div>

      {fleet.map((vessel, i) => (
        <section
          key={vessel.slug}
          id={vessel.slug}
          className={`scroll-mt-24 py-24 sm:py-32 ${i % 2 === 1 ? "bg-tint" : ""}`}
        >
          <Container>
            <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <SmartImage
                    src={vessel.heroImage}
                    alt={`${vessel.name}, ${vessel.tagline.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                {vessel.gallery.length > 0 && <MasonryGallery images={vessel.gallery} />}
              </Reveal>

              <Reveal delay={100} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Eyebrow>{vessel.makeModel}</Eyebrow>
                <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-ink">
                  {vessel.name}
                </h2>
                <p className="mt-3 text-lg text-ink/70">{vessel.tagline}</p>

                {vessel.pending && (
                  <p className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-sm text-ink/70">
                    {vessel.description[0]}
                  </p>
                )}

                {!vessel.pending && (
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
                    {vessel.description.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-6 sm:grid-cols-3">
                  {vessel.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="eyebrow text-ink/40">{spec.label}</dt>
                      <dd className="mt-1 text-sm font-medium text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                {vessel.amenities.length > 0 && (
                  <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-ink/10 pt-6 sm:grid-cols-2">
                    {vessel.amenities.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink/70">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <LinkButton href="/contact" variant="primary" className="mt-9">
                  {tCommon("requestToBook")}
                </LinkButton>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
