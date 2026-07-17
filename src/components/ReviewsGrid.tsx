"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { Review } from "@/lib/content-types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand-600" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.9l6-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewsGridProps {
  reviews: Review[];
  locale: string;
  perPage?: number;
}

export function ReviewsGrid({ reviews, locale, perPage = 6 }: ReviewsGridProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(reviews.length / perPage));
  const start = (page - 1) * perPage;
  const visible = reviews.slice(start, start + perPage);

  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2">
        {visible.map((review, i) => (
          <Reveal key={`${review.name}-${review.date}`} delay={i * 60}>
            <div className="flex h-full flex-col border border-white/10 bg-tint p-8">
              {typeof review.rating === "number" && <Stars rating={review.rating} />}
              {review.title && (
                <p className={`font-display text-lg font-semibold text-ink ${typeof review.rating === "number" ? "mt-4" : ""}`}>
                  {review.title}
                </p>
              )}
              <p
                className={`flex-1 whitespace-pre-line font-display text-lg italic leading-relaxed text-ink/75 ${
                  review.title || typeof review.rating === "number" ? "mt-2" : ""
                }`}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-ink/10 pt-4">
                <p className="font-medium text-ink">{review.name}</p>
                <p className="text-xs text-ink/50">
                  {new Date(review.date).toLocaleDateString(locale === "es" ? "es-PA" : "en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"
          >
            {locale === "es" ? "Anterior" : "Previous"}
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={`h-10 w-10 border text-sm font-semibold transition-colors ${
                page === i + 1
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink/15 text-ink hover:border-brand-600 hover:text-brand-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"
          >
            {locale === "es" ? "Siguiente" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
