"use client";

import React, { useRef } from "react";
import reviewsData from "@/lib/reviews_data.json";
import { ChevronLeft, ChevronRight, Star, BadgeCheck, Quote } from "lucide-react";

export const CustomerReviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section aria-label="Customer Reviews" className="my-8 sm:my-12">
      <div className="flex items-end justify-between mb-4 sm:mb-6 gap-3">
        <div className="min-w-0">
          {/* Star rating summary pill */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full pl-2.5 pr-3 py-1 mb-2.5">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-[12.5px] font-extrabold text-gray-900">4.9</span>
            <span className="text-[11px] text-gray-600">· 10,000+ happy celebrations</span>
          </div>

          <div className="flex flex-col gap-1.5 items-start">
            <h2 className="text-[18px] sm:text-[25px] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Customer Reviews
            </h2>
            <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous reviews"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next reviews"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reviews Track */}
      <div
        ref={scrollRef}
        data-review-track="true"
        tabIndex={0}
        role="region"
        aria-label="Customer reviews carousel"
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3 -mx-1 px-1 scroll-pl-1 focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        {reviewsData.map((review, idx) => (
          <div
            key={idx}
            className="snap-start shrink-0 w-[268px] sm:w-[300px]"
          >
            <article className="flex flex-col gap-3 h-full bg-white border border-gray-100 rounded-3xl p-4 sm:p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_26px_-10px_rgba(0,0,0,0.16)] transition-shadow">
              <div className="flex items-center gap-2.5">
                {/* Initials Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[12px] font-bold shrink-0 shadow-sm shadow-brand-200/50">
                  {review.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[12.5px] font-bold text-gray-900 truncate">
                      {review.name}
                    </p>
                    <BadgeCheck className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  </div>
                  <p className="text-[10.5px] text-gray-600 truncate">
                    Verified Booking
                  </p>
                </div>

                <Quote className="w-5 h-5 text-brand-100 shrink-0 -scale-x-100" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
                {review.rating < 5 && (
                  <Star className="w-3.5 h-3.5 fill-gray-200 text-gray-200" />
                )}
              </div>

              {/* Review Text */}
              <p className="text-[12.5px] text-gray-600 leading-relaxed line-clamp-4 flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
