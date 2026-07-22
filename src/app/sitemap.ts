import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

const paths = [
  "",
  "/about",
  "/crew",
  "/fleet",
  "/packages",
  "/activities/surfing",
  "/activities/sailing",
  "/activities/fishing",
  "/activities/diving",
  "/reviews",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${site.url}/${locale}${path}`])
      ),
    },
  }));
}
