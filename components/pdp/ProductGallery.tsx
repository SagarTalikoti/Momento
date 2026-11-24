"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Share2,
  Sparkles,
  Images,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { showToast } = useApp();

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const galleryImages = images && images.length > 0
    ? images
    : ["/images/simple-birthday-decoration-1785222854831-958593.webp"];

  const activeImage = galleryImages[selectedIdx] || galleryImages[0];

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 45) {
        // Swiped Left -> Next Image
        handleNext();
      } else if (deltaX < -45) {
        // Swiped Right -> Prev Image
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, galleryImages.length]);

  // Actual Web Share API with Clipboard Fallback
  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `${title} | Momento`,
      text: `Check out ${title} on Momento — Make Every Moment Special!`,
      url: shareUrl,
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        showToast("Shared successfully!");
        return;
      } catch (err: any) {
        if (err?.name === "AbortError") return; // User cancelled
      }
    }

    // Fallback: Copy link to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied to clipboard! Share it with friends & family.");
      } catch {
        showToast("Share link copied!");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* 1. Main Slider Image Container (Clickable to view full image) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Click card to view full screen image"
        className="group relative w-full aspect-[4/3] sm:aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <Image
          src={activeImage}
          alt={`${title} - Photo ${selectedIdx + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        {/* Click to expand hover indicator */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 text-white text-[12.5px] font-bold backdrop-blur-md shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
            <Maximize2 className="w-4 h-4 text-brand-300" /> Click to view image
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-700/95 backdrop-blur-sm text-white text-[11.5px] font-bold shadow-md">
            <Sparkles className="w-3 h-3 text-yellow-300" /> Most Booked
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold shadow-sm">
            Wall-Safe Setup
          </span>
        </div>

        {/* Top Right Action Button: Actual Share */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            aria-label="Share this celebration package"
            className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 hover:text-brand-600 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Share with friends & family"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Center: Slide Dots Indicator */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
            {galleryImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIdx === idx
                    ? "w-6 bg-white shadow-md"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Right: Slide Counter Button (Click opens Lightbox) */}
        <div className="absolute bottom-3.5 right-3.5 z-10">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="View all photos in full screen"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11.5px] font-semibold tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Images className="w-3.5 h-3.5 text-brand-300" />
            <span>
              {selectedIdx + 1} / {galleryImages.length} Photos
            </span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-0.5 px-0.5">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-xl overflow-hidden bg-gray-100 shrink-0 transition-all duration-200 border-2 cursor-pointer ${
                selectedIdx === idx
                  ? "border-brand-600 ring-2 ring-brand-600/30 shadow-md scale-[1.02]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 3. Full-Screen Photo Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Counter and Close */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
            <span className="text-[13px] sm:text-[14px] font-bold tracking-wide bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
              {selectedIdx + 1} / {galleryImages.length} Photos
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="w-11 h-11 rounded-full bg-white/25 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 border border-white/20"
              title="Close (Esc)"
              aria-label="Close image"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Large Image in Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[80vh] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={activeImage}
              alt={`${title} full view`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
            />
          </div>

          {/* Lightbox Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
