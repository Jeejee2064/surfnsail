import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

interface BuildMetadataArgs {
  locale: string;
  path: string; // e.g. "" for home, "/fleet", "/activities/surfing"
  title: string;
  description: string;
  image?: string;
}

export function buildMetadata({ locale, path, title, description, image }: BuildMetadataArgs): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${site.url}/${loc}${path}`])
  );
  languages["x-default"] = `${site.url}/${routing.defaultLocale}${path}`;

  const ogImage = image ?? "/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/${locale}${path}`,
      siteName: site.name,
      locale: locale === "es" ? "es_PA" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
