import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Preview/staging deployments are kept out of search indexes via the
// X-Robots-Tag header set in src/proxy.ts; this file governs crawling.
const isProduction = process.env.VERCEL_ENV === "production";

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
