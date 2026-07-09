import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
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

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand-600" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.9l6-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
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

      <PageIntro eyebrow={reviewsIntro.eyebrow} title={reviewsIntro.heading} subtitle={reviewsIntro.body} />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {reviews.map((review, i) => (
              <Reveal key={`${review.name}-${review.date}`} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-bone p-8">
                  <Stars rating={review.rating} />
                  <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink/75">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-6 border-t border-ink/10 pt-4">
                    <p className="font-medium text-ink">{review.name}</p>
                    <p className="text-xs text-ink/50">
                      {new Date(review.date).toLocaleDateString(locale === "es" ? "es-PA" : "en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
