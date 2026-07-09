import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/structured-data";

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
          title: "Contacto | Surfnsail",
          description:
            "Contáctanos para reservar tu charter en catamarán de lujo en Bocas del Toro, Panamá. WhatsApp, correo o formulario de consulta.",
        }
      : {
          title: "Contact | Surfnsail",
          description:
            "Get in touch to book your luxury catamaran charter in Bocas del Toro, Panama. WhatsApp, email or enquiry form.",
        };

  return buildMetadata({ locale, path: "/contact", ...copy });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Contact", path: "/contact" },
  ]);

  const copy =
    locale === "es"
      ? { eyebrow: "Contacto", heading: "Hablemos de tu charter" }
      : { eyebrow: "Contact", heading: "Let's plan your charter" };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
      />

      <PageIntro eyebrow={copy.eyebrow} title={copy.heading} />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div>
                <p className="eyebrow text-brand-600">{tFooter("contact")}</p>
                <ul className="mt-5 space-y-4 text-lg text-ink/80">
                  <li>{site.address.line}</li>
                  <li>
                    <a href={site.phoneHref} className="hover:text-brand-600">
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="hover:text-brand-600">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.whatsappHref} className="hover:text-brand-600">
                      {tCommon("whatsapp")}
                    </a>
                  </li>
                </ul>

                <div className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl">
                  <iframe
                    title="Bocas Marina location"
                    src={`https://www.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}&z=14&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
