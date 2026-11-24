import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getSimilarProducts,
  getTrendingProducts,
} from "@/lib/products";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductBookingPanel } from "@/components/pdp/ProductBookingPanel";
import { ProductReviews } from "@/components/pdp/ProductReviews";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ShieldCheck, Sparkles, Clock, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Decoration at Home | Momento",
    };
  }

  return {
    title: `${product.title} – Balloon Decoration at Home | Momento`,
    description: `Book ${product.title} starting from ₹${product.price}. Professional balloon decorators at your doorstep, damage-free wall tape, and same-day setup available.`,
    openGraph: {
      title: `${product.title} – Momento`,
      description: `Book ${product.title} from ₹${product.price} with Momento.`,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const similarProducts = getSimilarProducts(product.category, product.slug, 8);
  const trendingProducts = getTrendingProducts(product.slug, 8);

  const similarCards = similarProducts.map((p) => ({
    title: p.title,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    image: p.image,
    rating: p.rating,
    reviews: p.reviews,
    href: `/decor/${p.slug}`,
    alt: p.alt || p.title,
  }));

  const trendingCards = trendingProducts.map((p) => ({
    title: p.title,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    image: p.image,
    rating: p.rating,
    reviews: p.reviews,
    href: `/decor/${p.slug}`,
    alt: p.alt || p.title,
  }));

  return (
    <div className="py-4 sm:py-6 pb-20 lg:pb-8 space-y-8">
      {/* 1. Main 2-Column Product Detail Layout (Sticky left gallery while right info scrolls) */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        {/* Left Column: Gallery (Stays sticky on desktop until right column finishes scrolling) */}
        <div className="lg:col-span-6 relative">
          <div className="lg:sticky lg:top-[92px] z-10 space-y-4">
            <ProductGallery images={product.gallery} title={product.title} />
          </div>
        </div>

        {/* Right Column: Booking Configuration Panel */}
        <div className="lg:col-span-6">
          <ProductBookingPanel product={product} />
        </div>
      </div>

      {/* 2. Verified Reviews & Ratings Breakdown */}
      <ProductReviews />

      {/* 3. Similar Packages Carousel */}
      {similarCards.length > 0 && (
        <ProductCarousel
          title="Similar Packages"
          subtitle="More customer favorites for this celebration"
          cards={similarCards}
        />
      )}

      {/* 4. Trending Decorations Carousel */}
      {trendingCards.length > 0 && (
        <ProductCarousel
          title="Trending Decorations"
          subtitle="Top picked balloon setups across categories"
          cards={trendingCards}
        />
      )}
    </div>
  );
}
