import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { getReviewsContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, reviewsJsonLd } from "@/lib/structured-data";

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
          title: "Reseñas de Huéspedes | Surfnsail",
          description:
            "Lee lo que dicen nuestros huéspedes sobre sus charters en catamarán de lujo con Surfnsail en Bocas del Toro, Panamá.",
        }
      : {
          title: "Guest Reviews | Surfnsail",
          description:
            "Read what our guests say about their luxury catamaran charters with Surfnsail in Bocas del Toro, Panama.",
        };

  return buildMetadata({ locale, path: "/reviews", ...copy });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { reviewsIntro, reviews } = getReviewsContent(locale);
  const aventuraReviews = reviews.filter((r) => r.boat === "aventura");
  const extaSeaReviews = reviews.filter((r) => r.boat === "exta-sea");
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Reviews", path: "/reviews" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd(reviews)) }}
      />

      <PageIntro eyebrow={reviewsIntro.eyebrow} title={reviewsIntro.heading} subtitle={reviewsIntro.body} compact />

      <section className="pb-16 pt-12 sm:pt-16">
        <Container>
          <Reveal>
            <Eyebrow>Aventura</Eyebrow>
            <p className="mt-2 text-sm text-ink/50">
              {locale === "es" ? "Capitaneado por Marius" : "Captained by Marius"}
            </p>
          </Reveal>
          <div className="mt-8">
            <ReviewsGrid reviews={aventuraReviews} locale={locale} perPage={6} />
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Exta Sea</Eyebrow>
            <p className="mt-2 text-sm text-ink/50">
              {locale === "es" ? "Capitaneado por Jeremy" : "Captained by Jeremy"}
            </p>
          </Reveal>
          <div className="mt-8">
            <ReviewsGrid reviews={extaSeaReviews} locale={locale} perPage={6} />
          </div>
        </Container>
      </section>
    </>
  );
}
