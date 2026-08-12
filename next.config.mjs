import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Set by `npm run build:static` (see scripts/build-static.sh) for the
// cPanel static-file export. Regular `next build` (Vercel) leaves this
// unset and keeps the full server: /api/contact and src/proxy.ts locale
// routing both need a Node server and are dropped from the static build.
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // No image-optimization server on static/cPanel hosting.
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  ...(isStaticExport
    ? {
        output: "export",
        // Apache-friendly: /about/ -> /about/index.html, matches directory-style hosting.
        trailingSlash: true,
      }
    : {}),
};

export default withNextIntl(nextConfig);
