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
import { getCrewContent } from "@/lib/content";
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
          title: "Conoce al Equipo | Surfnsail",
          description:
            "Conoce al equipo detrás de Surfnsail: Marius, Mireille, los capitanes Maga y Jeremy, la chef Genna y la anfitriona Daniela — charters de vela de lujo en Bocas del Toro, Panamá.",
        }
      : {
          title: "Meet the Crew | Surfnsail",
          description:
            "Meet the team behind Surfnsail: Marius, Mireille, captains Maga and Jeremy, chef Genna and host Daniela — luxury sailing charters in Bocas del Toro, Panama.",
        };

  return buildMetadata({ locale, path: "/crew", ...copy });
}

export default async function CrewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const { crewIntro, crew } = getCrewContent(locale);
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Crew", path: "/crew" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageIntro eyebrow={crewIntro.eyebrow} title={crewIntro.heading} compact />

      <section className="pb-24 pt-12 sm:pb-32 sm:pt-16">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="space-y-4 text-lg leading-relaxed text-ink/70">
              {crewIntro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
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
                    className={`relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden lg:max-w-none ${
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
                    <h2 className="font-display text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-ink">
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
