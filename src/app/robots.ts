import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Preview/staging deployments are kept out of search indexes via the
// X-Robots-Tag header set in src/proxy.ts; this file governs crawling.
// STATIC_EXPORT builds (cPanel) don't run on Vercel and are always the
// real production content, so they count as production too.
const isProduction = process.env.VERCEL_ENV === "production" || process.env.STATIC_EXPORT === "1";

// Required for `output: "export"`: this only reads env vars set at build
// time, so it's safe to generate once during the build rather than per-request.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
