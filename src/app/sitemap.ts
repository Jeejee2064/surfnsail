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

// Required for `output: "export"`: bakes the sitemap in at build time
// (lastModified becomes the build date) instead of per-request.
export const dynamic = "force-static";

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
