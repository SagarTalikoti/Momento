"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { cleanSlug } from "@/lib/products";

interface CardProps {
  href?: string;
  image: string;
  alt?: string;
  title: string;
  rating?: string;
  reviews?: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  cards: CardProps[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  viewAllHref,
  cards,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useApp();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="my-6 sm:my-9">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3">
        <div className="flex flex-col gap-1.5 items-start">
          <h2 className="text-[18px] sm:text-[25px] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            {title}
          </h2>
          <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
          {subtitle && (
            <p className="text-[12px] sm:text-[13px] text-gray-500 max-w-xl leading-relaxed mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-[12.5px] sm:text-[13px] font-bold text-brand-600 hover:text-brand-700 hover:underline"
            >
              View all
            </Link>
          )}

          {/* Left / Right Buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label={`Previous ${title}`}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label={`Next ${title}`}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={`${title} carousel`}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1 scroll-pl-1"
      >
        {cards.map((card, idx) => {
          const productHref = card.href?.startsWith("/decor/")
            ? card.href
            : `/decor/${cleanSlug(card.href || card.title)}`;

          return (
            <div
              key={idx}
              className="snap-start shrink-0 w-[46%] sm:w-[220px] md:w-[240px]"
            >
              <Link
                href={productHref}
                data-catalog-card="true"
                className="group block bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]
                hover:shadow-[0_14px_34px_-10px_rgba(124,58,237,0.24)] hover:-translate-y-0.5
                transition-all duration-300 overflow-hidden cursor-pointer relative"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">
                  <Image
                    src={card.image}
                    alt={card.alt || card.title}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 280px"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                  />

                  {/* Quick Add overlay button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(card);
                    }}
                    title="Add to cart"
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/95 text-brand-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-600 hover:text-white z-10"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Info */}
                <div data-card-info="true" className="px-3 pt-2.5 pb-3">
                  <h3 className="text-[12.5px] sm:text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.6em] group-hover:text-brand-700 transition-colors">
                    {card.title}
                  </h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-green-700 shrink-0">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                      <span className="text-[10.5px] font-bold text-white leading-none">
                        {card.rating || "4.8"}
                      </span>
                    </span>
                    <span className="text-[11px] text-gray-600 leading-none">
                      {card.reviews || "25"} reviews
                    </span>
                  </div>

                  {/* Pricing & Discount */}
                  <div className="mt-2 flex items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1.5 min-w-0">
                      <span className="text-[15.5px] font-bold text-gray-900 tracking-tight">
                        ₹{card.price}
                      </span>
                      {card.originalPrice && (
                        <span className="text-[11px] text-gray-500 line-through">
                          ₹{card.originalPrice}
                        </span>
                      )}
                    </div>
                    {card.discount && (
                      <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-md shrink-0">
                        {card.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
