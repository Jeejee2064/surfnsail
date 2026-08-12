import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { bodoni, cormorant, inter, yellowtail } from "@/lib/fonts";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Analytics } from "@/components/Analytics";
import { organizationJsonLd } from "@/lib/structured-data";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  openGraph: {
    siteName: site.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${bodoni.variable} ${cormorant.variable} ${inter.variable} ${yellowtail.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-page text-ink">
        {/* Reads the theme cookie and sets data-theme before hydration, so the
            correct palette renders on first paint with no flash — same effect
            as the old server-side cookie read, but works on static export too. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);if(m&&m[1]==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCta />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
