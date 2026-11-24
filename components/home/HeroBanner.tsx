"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const HeroBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<HTMLDivElement>(null);

  // Pure GPU-accelerated scroll-linked gentle zoom (zero React re-renders for buttery 120fps)
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !animatedRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the banner is within the viewport, calculate smooth progress [0, 1]
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const totalTravel = windowHeight + rect.height;
        const currentProgress = (windowHeight - rect.top) / totalTravel;
        const clamped = Math.max(0, Math.min(1, currentProgress));
        const scale = 1.0 + clamped * 0.035;
        const translateY = (clamped - 0.5) * 6;
        animatedRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative -mx-1 sm:mx-0 my-2 sm:my-5 overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-100/80 shadow-[0_4px_20px_-4px_rgba(109,40,217,0.12)] bg-[#F8F3FF] select-none"
    >
      {/* Scroll-Linked Animated Wrapper */}
      <div
        ref={animatedRef}
        style={{
          transform: "translate3d(0, 0px, 0) scale(1)",
          willChange: "transform",
        }}
        className="relative w-full overflow-hidden"
      >
        <Link
          href="/category/birthday-decor"
          aria-label="Make Every Occasion Truly Special — Explore Momento Decorations"
          className="block relative w-full aspect-[1024/341] overflow-hidden group cursor-pointer"
        >
          {/* HD Ultra Single Unified Banner with Perfectly Blended Background */}
          <picture className="w-full h-full block">
            <source
              srcSet="/images/momento-hero-banner-ultra.webp 2x, /images/momento-hero-banner-hd.webp 1x"
              type="image/webp"
            />
            <Image
              src="/images/momento-hero-banner-hd.webp"
              alt="Make Every Occasion Truly Special — Premium Decoration for Birthdays, Weddings, Anniversaries & More"
              fill
              priority
              unoptimized
              quality={98}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out"
            />
          </picture>
        </Link>
      </div>
    </div>
  );
};
