import { defineRouting } from "next-intl/routing";

// localePrefix 'always': every URL is locale-prefixed (/en/..., /es/...).
// Chosen over 'as-needed' for unambiguous, self-referencing canonicals and
// simpler hreflang/x-default generation across the whole site.
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
