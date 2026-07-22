"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { BookNowButton } from "./BookNowButton";
import { site } from "@/lib/site";

const activitySlugs = ["surfing", "sailing", "fishing", "diving"] as const;

// Only routes with a full-bleed dark hero at the very top (home, activities)
// can start with a transparent/light-text header — everywhere else there's
// no dark backdrop behind it at scroll 0, so it must render condensed from
// the first frame or the nav becomes unreadable.
function hasHeroBackdrop(pathname: string) {
  return pathname === "/" || pathname.startsWith("/activities/");
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render
  // (rather than in an effect) avoids the extra commit-then-recommit pass.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const condensed = scrolled || !hasHeroBackdrop(pathname);

  const links: { href: "/" | "/about" | "/crew" | "/fleet" | "/packages" | "/reviews" | "/faq" | "/contact"; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/crew", label: t("crew") },
    { href: "/fleet", label: t("fleet") },
    { href: "/packages", label: t("packages") },
  ];

  // FAQ lives in the footer only — keeping it out of the header nav gives
  // the bar breathing room on narrower desktop widths.
  const trailingLinks: { href: "/reviews" | "/contact"; label: string }[] = [
    { href: "/reviews", label: t("reviews") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        condensed
          ? "bg-sea-900/95 border-b border-white/8 backdrop-blur"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo dark className="shrink-0" />
          <Image
            src="/surfnsail.png"
            alt={site.name}
            width={794}
            height={189}
            priority
            className="h-5 w-[84px] shrink-0 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium 2xl:gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-bone transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap text-bone transition-opacity hover:opacity-70"
            >
              {t("activities")}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full w-48 border border-white/10 bg-sea-800 py-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {activitySlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/activities/${slug}`}
                  className="block px-4 py-2 text-sm text-bone transition-colors hover:bg-white/5"
                >
                  {t(slug)}
                </Link>
              ))}
            </div>
          </div>

          {trailingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-bone transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <ThemeToggle dark />
          <LanguageSwitcher dark />
          <BookNowButton
            align="right"
            className="whitespace-nowrap bg-brand-400 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sea-900 transition-colors hover:bg-gold-light"
          >
            {t("bookNow")}
          </BookNowButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
          className="relative z-10 flex h-9 w-9 items-center justify-center text-bone xl:hidden"
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 top-0 h-[1.5px] w-6 origin-center rounded-full bg-current"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 rounded-full bg-current"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute bottom-0 left-0 h-[1.5px] w-6 origin-center rounded-full bg-current"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1 border-t border-bone/10 bg-sea-900 px-6 py-5 xl:hidden"
          >
            {[...links, ...trailingLinks].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-base text-bone hover:bg-white/5"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <p className="eyebrow px-2 pt-3 text-brand-600">{t("activities")}</p>
            {activitySlugs.map((slug, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: (links.length + trailingLinks.length + i) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/activities/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-base text-bone hover:bg-white/5"
                >
                  {t(slug)}
                </Link>
              </motion.div>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-bone/10 px-2 pt-4">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <BookNowButton
                align="right"
                onSelect={() => setMobileOpen(false)}
                className="bg-brand-400 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sea-900"
              >
                {t("bookNow")}
              </BookNowButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
