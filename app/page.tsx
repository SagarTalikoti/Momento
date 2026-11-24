"use client";

import React from "react";
import siteData from "@/lib/site_data.json";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TopCategories } from "@/components/home/TopCategories";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { SeoContent } from "@/components/home/SeoContent";
import { FaqSection } from "@/components/home/FaqSection";
import { InquiryForm } from "@/components/home/InquiryForm";

export default function HomePage() {
  const birthdayCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("birthday")
  );
  const anniversaryCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("anniversary")
  );
  const newbornCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("newborn") || c.title.toLowerCase().includes("welcome")
  );
  const bouquetCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("bouquet")
  );
  const babyShowerCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("baby shower")
  );
  const carBootCarousel = siteData.carousels.find(
    (c) => c.title.toLowerCase().includes("car boot")
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-12">
      {/* 1. Hero Promotional Banner Carousel */}
      <HeroBanner />

      {/* 2. Top Balloon Decoration Categories */}
      <TopCategories />

      {/* 3. Birthday Balloon Decoration Carousel */}
      {birthdayCarousel && (
        <ProductCarousel
          title={birthdayCarousel.title}
          subtitle={birthdayCarousel.subtitle}
          viewAllHref={birthdayCarousel.viewAllHref}
          cards={birthdayCarousel.cards}
        />
      )}

      {/* 4. Kids Special Visual Grid */}
      {siteData.kidsSpecial && siteData.kidsSpecial.length > 0 && (
        <CategoryGrid
          title="Kids Special"
          subtitle="Trending themes for little champions"
          items={siteData.kidsSpecial}
        />
      )}

      {/* 5. Romantic Anniversary Decoration Carousel */}
      {anniversaryCarousel && (
        <ProductCarousel
          title={anniversaryCarousel.title}
          subtitle={anniversaryCarousel.subtitle}
          viewAllHref={anniversaryCarousel.viewAllHref}
          cards={anniversaryCarousel.cards}
        />
      )}

      {/* 7. Romantic Decor Visual Grid */}
      {siteData.romanticDecor && siteData.romanticDecor.length > 0 && (
        <CategoryGrid
          title="Romantic Decor"
          subtitle="Decoration For Couple Celebration"
          items={siteData.romanticDecor}
        />
      )}

      {/* 8. Newborn Welcome Decor Carousel */}
      {newbornCarousel && (
        <ProductCarousel
          title={newbornCarousel.title}
          subtitle={newbornCarousel.subtitle}
          viewAllHref={newbornCarousel.viewAllHref}
          cards={newbornCarousel.cards}
        />
      )}

      {/* 9. Customized Balloon Bouquet Carousel */}
      {bouquetCarousel && (
        <ProductCarousel
          title={bouquetCarousel.title}
          subtitle={bouquetCarousel.subtitle}
          viewAllHref={bouquetCarousel.viewAllHref}
          cards={bouquetCarousel.cards}
        />
      )}

      {/* 10. Baby Shower Packages Carousel */}
      {babyShowerCarousel && (
        <ProductCarousel
          title={babyShowerCarousel.title}
          subtitle={babyShowerCarousel.subtitle}
          viewAllHref={babyShowerCarousel.viewAllHref}
          cards={babyShowerCarousel.cards}
        />
      )}

      {/* 11. Car Boot Surprise Decorations Carousel */}
      {carBootCarousel && (
        <ProductCarousel
          title={carBootCarousel.title}
          subtitle={carBootCarousel.subtitle}
          viewAllHref={carBootCarousel.viewAllHref}
          cards={carBootCarousel.cards}
        />
      )}

      {/* 12. Customer Reviews Carousel */}
      <CustomerReviews />

      {/* 13. SEO Content, Tables, Features & 100+ Cities */}
      <SeoContent />

      {/* 14. Frequently Asked Questions */}
      <FaqSection />

      {/* 15. Send Us Inquiry Lead Form */}
      <InquiryForm />
    </div>
  );
}
