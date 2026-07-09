import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

// Keep Vercel preview deployments out of search indexes: production is the
// only environment allowed to be indexed.
const isProduction = process.env.VERCEL_ENV === "production";

export default function proxy(request: NextRequest) {
  const response = handleI18n(request);
  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
