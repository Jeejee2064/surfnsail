import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { LinkButton } from "@/components/Button";
import { PhotoGrid } from "@/components/Gallery";
import { getPackagesContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, packageOfferJsonLd } from "@/lib/structured-data";

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
          title: "Paquetes y Precios | Surfnsail",
          description:
            "Charters de día, charters nocturnos y travesías de varios días por Bocas del Toro: Escudo de Veraguas, Laguna Bluefield y los Cayos Zapatilla. Precios en USD.",
        }
      : {
          title: "Packages & Prices | Surfnsail",
          description:
            "Day charters, overnight charters and multi-day voyages through Bocas del Toro: Escudo de Veraguas, Laguna Bluefield and the Zapatilla Cays. Prices in USD.",
        };

  return buildMetadata({ locale, path: "/packages", ...copy });
}

function formatPrice(value: number | null) {
  if (value === null) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { packagesIntro, priceNotice, packages } = getPackagesContent(locale);
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Packages & Prices", path: "/packages" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {packages.map((pkg) => (
        <script
          key={pkg.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packageOfferJsonLd(locale, pkg)) }}
        />
      ))}

      <PageIntro eyebrow={packagesIntro.eyebrow} title={packagesIntro.heading} subtitle={packagesIntro.body} />

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mb-12 border border-white/10 bg-tint px-6 py-4 text-sm text-ink/70">
            {priceNotice}
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            {packages.map((pkg, i) => {
              const standard = formatPrice(pkg.priceStandard);
              const peak = formatPrice(pkg.pricePeak);
              return (
                <Reveal key={pkg.slug} delay={i * 60}>
                  <div id={pkg.slug} className="scroll-mt-24 flex h-full flex-col border border-white/10 bg-tint p-8">
                    <h2 className="font-display text-2xl text-ink">{pkg.name}</h2>
                    <p className="mt-1 text-sm text-ink/50">{pkg.duration}</p>

                    <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      {standard && (
                        <p className="font-display text-3xl text-brand-400">
                          {standard}
                          <span className="ml-1 text-sm font-sans text-ink/50">/ {pkg.unit}</span>
                        </p>
                      )}
                      {peak && (
                        <p className="text-sm text-ink/50">
                          {standard ? "· " : ""}
                          {peak} <span className="text-xs">peak</span>
                        </p>
                      )}
                    </div>

                    {pkg.destinations.length > 0 && (
                      <p className="mt-3 text-sm text-ink/60">{pkg.destinations.join(" · ")}</p>
                    )}

                    <ul className="mt-6 flex-1 space-y-2">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-xs uppercase tracking-wide text-ink/40">{pkg.bestSeason}</p>
                    {pkg.notes && <p className="mt-1 text-xs text-ink/50">{pkg.notes}</p>}

                    <LinkButton href="/contact" variant="primary" className="mt-8">
                      {tCommon("requestToBook")}
                    </LinkButton>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <PhotoGrid
              className="mt-20"
              images={[
                { src: "/cheers.jpg", alt: "Guests toasting drinks aboard a Surfnsail charter", width: 2200, height: 1365 },
                { src: "/food2.jpg", alt: "Fresh onboard meal served during a Surfnsail charter", width: 1440, height: 1440 },
                { src: "/food3.jpg", alt: "Onboard dining aboard a Surfnsail charter", width: 1440, height: 1440 },
                { src: "/clients.jpg", alt: "Guests enjoying a Surfnsail charter", width: 1000, height: 750 },
              ]}
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
