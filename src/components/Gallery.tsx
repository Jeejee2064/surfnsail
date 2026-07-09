"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { SmartImage } from "./SmartImage";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Server Components can't hand a render-prop function to a Client Component
// (it isn't serializable across the boundary), so each gallery layout below
// is a single self-contained client component: it owns the thumbnail grid
// *and* the fullscreen overlay, and only ever receives plain data as props.
function useLightbox(length: number) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + length) % length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, length]);

  return { index, open: setIndex, close: () => setIndex(null) };
}

// SSR renders `false`; the client subscribes to nothing and snapshots
// `true`, so this flips right after hydration without a setState-in-effect.
const subscribeNoop = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

function LightboxOverlay({
  images,
  index,
  onClose,
  onStep,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
}) {
  const mounted = useIsMounted();
  const active = index !== null ? images[index] : null;
  if (!mounted) return null;

  // Rendered via a portal straight onto <body>: several ancestors up the
  // tree (Reveal, Hero, ParallaxBand) animate with a CSS transform, and any
  // transformed ancestor becomes the containing block for `position: fixed`
  // descendants — without the portal this overlay gets trapped inside that
  // ancestor's box instead of covering the real viewport.
  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sea-950/97 p-4 backdrop-blur-sm sm:p-10"
          onClick={onClose}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="92vw"
                className="max-h-[88vh] max-w-[92vw] w-auto h-auto rounded-sm object-contain shadow-2xl shadow-black/50"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone sm:right-8 sm:top-8"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(-1);
                }}
                aria-label="Previous"
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone sm:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(1);
                }}
                aria-label="Next"
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone sm:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-sm italic text-bone/70">
                {(index ?? 0) + 1} / {images.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Variable-height grid that keeps each photo's own aspect ratio (no forced
// square crop) — used for the fleet vessel galleries.
export function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const { index, open, close } = useLightbox(images.length);
  const step = (delta: 1 | -1) => open((i) => (i === null ? i : (i + delta + images.length) % images.length));

  return (
    <>
      <div className="mt-4 columns-2 gap-3 sm:columns-3 lg:columns-2 xl:columns-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            className="mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg transition-opacity hover:opacity-90"
          >
            <SmartImage src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 20vw, 45vw" />
          </button>
        ))}
      </div>
      <LightboxOverlay images={images} index={index} onClose={close} onStep={step} />
    </>
  );
}

// Uniform square thumbnail strip — used for smaller supporting photo sets
// (e.g. the packages "what's included" strip).
export function PhotoGrid({ images, className = "" }: { images: GalleryImage[]; className?: string }) {
  const { index, open, close } = useLightbox(images.length);
  const step = (delta: 1 | -1) => open((i) => (i === null ? i : (i + delta + images.length) % images.length));

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-xl transition-opacity hover:opacity-90"
          >
            <SmartImage src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 20vw, 45vw" className="object-cover" />
          </button>
        ))}
      </div>
      <LightboxOverlay images={images} index={index} onClose={close} onStep={step} />
    </>
  );
}
