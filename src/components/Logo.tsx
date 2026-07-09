import Image from "next/image";
import { site } from "@/lib/site";

// Sail mark, drawn in navy on transparent (cropped from
// public/customcolor_icon_transparent_background.png). On dark/hero
// backdrops it's flipped to white via a CSS filter instead of a second export.
export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt={site.name}
      width={874}
      height={777}
      priority
      className={`h-9 w-auto object-contain ${dark ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
