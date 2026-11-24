"use client";

import { useEffect } from "react";

// Top critical package images to pre-warm in background during idle time
const CRITICAL_IMAGES = [
  "/images/simple-birthday-decoration-at-home-1785562375292-177235.webp",
  "/images/simple-birthday-decoration-1785222854831-958593.webp",
  "/images/de3c853c-f969-4706-a549-69e17774e648.webp",
  "/images/6b732124-5506-4ca6-bb0c-40d7340ac0f4.webp",
  "/images/simple-hall-decoration-1785216516633-781870.webp",
  "/images/gold-birthday-hall-decoration-1785228066699-879821.webp",
  "/images/0dfa57d9-92a6-4438-8bcb-aea593cd4bcb.webp",
  "/images/4bd1aa38-f46f-40db-b261-9c4fb2d58815.webp",
  "/images/momento-hero-banner-ultra.webp",
  "/images/momento-hero-banner-hd.webp"
];

export const SpeedOptimizer: React.FC = () => {
  useEffect(() => {
    // Run during browser idle time so main thread is 100% free for user interaction
    const warmUp = () => {
      CRITICAL_IMAGES.forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(warmUp, { timeout: 1500 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(warmUp, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};
