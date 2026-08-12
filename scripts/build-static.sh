#!/usr/bin/env bash
# Builds a pure static export (HTML/CSS/JS) for upload to cPanel/shared hosting.
#
# Why a script and not just `next build`: this repo also has a real
# Next.js server route (src/app/api/contact) and a proxy (src/proxy.ts,
# next-intl locale routing). Neither can exist in a static export — Next.js
# refuses to build a POST route handler under `output: "export"`, and a
# proxy/middleware simply never runs without a server. So this script
# temporarily moves the api/ directory out of the tree for the build, then
# puts it back — it never touches git history, just the working directory.
set -euo pipefail
cd "$(dirname "$0")/.."

API_DIR="src/app/api"
API_STASH="$(mktemp -d)/api"

if [ ! -f .env.local ] || ! grep -q "^NEXT_PUBLIC_CONTACT_API_URL=" .env.local; then
  echo "warning: NEXT_PUBLIC_CONTACT_API_URL is not set in .env.local" >&2
  echo "         The contact form will try to POST to a relative /api/contact," >&2
  echo "         which won't exist on static hosting. Set it to wherever" >&2
  echo "         /api/contact is actually deployed (e.g. your Vercel URL)." >&2
fi

cleanup() {
  if [ -d "$API_STASH" ]; then
    rm -rf "$API_DIR"
    mv "$API_STASH" "$API_DIR"
  fi
}
trap cleanup EXIT

mv "$API_DIR" "$API_STASH"

STATIC_EXPORT=1 npx next build

# Static host for `/`: src/proxy.ts (locale routing) doesn't run without a
# server, so bounce the bare domain straight to the default locale.
cat > out/index.html <<'HTML'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="refresh" content="0; url=/en/" />
<title>Surfnsail</title>
</head>
<body>
<p>Redirecting to <a href="/en/">surfnsail.com.pa/en/</a>…</p>
<script>location.replace("/en/");</script>
</body>
</html>
HTML

echo ""
echo "Static export ready in ./out — upload its contents to your cPanel public_html."
