import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { getAboutContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

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
          title: "Nuestra Historia — Cómo Empezó Todo | Surfnsail",
          description:
            "Cómo Marius y Mireille navegaron desde Ciudad del Cabo hasta Bocas del Toro, Panamá, y fundaron Surfnsail en 2021.",
        }
      : {
          title: "Our Story — Where It All Began | Surfnsail",
          description:
            "How Marius and Mireille sailed from Cape Town to Bocas del Toro, Panama, and founded Surfnsail in 2021.",
        };

  return buildMetadata({ locale, path: "/about", ...copy });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { aboutIntro, captainBoatNote } = getAboutContent(locale);
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageIntro eyebrow={aboutIntro.eyebrow} title={aboutIntro.heading} compact />

      <section className="pb-24 pt-12 sm:pb-32 sm:pt-16">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="space-y-4 text-lg leading-relaxed text-ink/70">
              {aboutIntro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="eyebrow mt-6 text-brand-600">{captainBoatNote}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
