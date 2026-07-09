import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { ActivityBody } from "@/components/ActivityBody";
import { buildMetadata } from "@/lib/metadata";
import { activityMetadata } from "@/lib/activity-metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const SLUG = "diving" as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = activityMetadata[SLUG][locale === "es" ? "es" : "en"];
  return buildMetadata({ locale, path: `/activities/${SLUG}`, ...copy });
}

export default async function DivingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "" },
    { name: "Activities", path: "/activities" },
    { name: "Diving", path: `/activities/${SLUG}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ActivityBody locale={locale} slug={SLUG} />
    </>
  );
}
