import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getFaqContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

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
          title: "Preguntas Frecuentes | Surfnsail",
          description:
            "Respuestas a las preguntas más comunes sobre los charters de Surfnsail en Bocas del Toro: qué llevar, política de clima, comidas, niños y más.",
        }
      : {
          title: "Frequently Asked Questions | Surfnsail",
          description:
            "Answers to the most common questions about Surfnsail charters in Bocas del Toro: what to bring, weather policy, meals, kids and more.",
        };

  return buildMetadata({ locale, path: "/faq", ...copy });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { faqIntro, faq } = getFaqContent(locale);
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />

      <PageIntro eyebrow={faqIntro.eyebrow} title={faqIntro.heading} subtitle={faqIntro.body} />

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <FaqAccordion items={faq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
