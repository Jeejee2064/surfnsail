import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { SmartImage } from "@/components/SmartImage";
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
          title: "Quiénes Somos — Marius, Mireille y Jeremy | Surfnsail",
          description:
            "Conoce a Marius, Mireille y el capitán Jeremy, el equipo detrás de Surfnsail, charters de vela de lujo en Bocas del Toro, Panamá desde 2021.",
        }
      : {
          title: "Who We Are — Marius, Mireille & Jeremy | Surfnsail",
          description:
            "Meet Marius, Mireille and Captain Jeremy, the team behind Surfnsail, luxury sailing charters in Bocas del Toro, Panama since 2021.",
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

  const { aboutIntro, captainBoatNote, crew } = getAboutContent(locale);
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

      <PageIntro eyebrow={aboutIntro.eyebrow} title={aboutIntro.heading} />

      <section className="py-24 sm:py-32">
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

      <section className="bg-tint py-24 sm:py-32">
        <Container>
          <div className="space-y-20">
            {crew.map((member, i) => (
              <Reveal key={member.slug}>
                <div
                  className={`grid gap-10 lg:items-start ${
                    i % 2 === 1 ? "lg:grid-cols-[1fr_240px]" : "lg:grid-cols-[240px_1fr]"
                  }`}
                >
                  <div
                    className={`relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl lg:max-w-none ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <SmartImage
                      src={member.photo}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 240px, 220px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="font-display text-[length:var(--text-h2)] leading-tight tracking-tight text-ink">
                      {member.name}
                    </h2>
                    <p className="eyebrow mt-2 text-brand-600">{member.role}</p>
                    <div className="mt-6 space-y-4 whitespace-pre-line text-base leading-relaxed text-ink/70">
                      {member.bio.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
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
