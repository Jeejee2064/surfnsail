import Image from "next/image";

// Client photos land in public/ with descriptive filenames (see brief §6).
// Exta Sea (the second boat) and a couple of crew portraits haven't arrived
// yet — those still render as a labeled placeholder instead of a broken
// image, so dropping in the rest later is a one-line change (add the path
// here).
const AVAILABLE_IMAGES = new Set([
  "/drone-sail.jpeg",
  "/chill.jpeg",
  "/catamaran.jpeg",
  "/catamaran2.jpeg",
  "/drone.JPG",
  "/escudo.jpg",
  "/droneanchorage.jpeg",
  "/skipper.jpeg",
  "/skipper2.jpeg",
  "/skipper3.jpeg",
  "/outdoorsalonbackboat.jpeg",
  "/outdoorsalonbackboat2.jpeg",
  "/livingroomsailboat.jpeg",
  "/livingroomsailboat2.jpeg",
  "/inside.jpeg",
  "/bathroom.jpeg",
  "/fridgewashingmachine.jpeg",
  "/deck.jpeg",
  "/deck2.jpeg",
  "/undersails.jpeg",
  "/sailing.jpg",
  "/fishing.jpg",
  "/fishing.jpeg",
  "/fishing2.jpeg",
  "/fishing-sunset.jpeg",
  "/diving.jpg",
  "/surfing-sunset-waves.jpg",
  "/clientschilling.jpeg",
  "/coupleclients.jpeg",
  "/bowclients.jpeg",
  "/cheers.jpg",
  "/clients.jpg",
  "/food.jpeg",
  "/food2.jpg",
  "/food3.jpg",
  "/sunset.webp",
  "/surf.jpeg",
  "/jeremy.jpeg",
  "/mariusmireille.jpg",
  "/marius-swart.jpeg",
  "/mireille-robinson.jpeg",
  "/genna.jpeg",
  "/daniela.jpg",
  "/maga.jpeg",
  "/cabin.jpeg",
  "/cabin2.jpeg",
  "/aventura/cabin.jpeg",
  "/aventura/cabin2.jpg",
  "/aventura/interior.jpg",
  "/aventura/interior2.jpeg",
  "/aventura/interior3.jpeg",
  "/aventura/salon.jpg",
  "/aventura/toilet.jpg",
  "/gallery/anchor-bay-aerial.jpg",
  "/gallery/reef-islands-aerial.jpg",
  "/gallery/rainbow-sail.jpg",
  "/gallery/sunset-sail-silhouette.jpg",
  "/gallery/bow-toast.jpg",
  "/gallery/wahoo-catch.jpg",
  "/gallery/grilling-catch.jpg",
  "/gallery/cabin-cheers.jpg",
  "/gallery/sunset-bow-group.jpg",
  "/gallery/mangrove-anchorage.jpg",
]);

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

// Two render modes: `fill` (absolute, crops to a container via object-cover —
// for hero/banner slots where the container dictates the shape) or intrinsic
// `width`/`height` (image keeps its own aspect ratio, scales via w-full
// h-auto — for galleries where forcing every photo into the same box would
// crop content). Next/Image lazy-loads by default; only `priority` opts an
// above-the-fold image out of that.
export function SmartImage({ src, alt, fill, width, height, sizes, priority, className = "" }: SmartImageProps) {
  if (AVAILABLE_IMAGES.has(src)) {
    if (fill) {
      return (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={`h-auto w-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-sea-800 to-sea-950 ${
        fill ? "absolute inset-0" : ""
      } ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="px-6 text-center text-xs uppercase tracking-[0.2em] text-sand-100/40">
        Photo pending — {src.replace(/^\/images\//, "")}
      </span>
    </div>
  );
}
