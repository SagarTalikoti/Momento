import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  TOP_CATEGORIES,
  getCategoryMeta,
  getProductsByCategory,
} from "@/lib/products";
import { CategoryProductGrid } from "@/components/category/CategoryProductGrid";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return TOP_CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = getCategoryMeta(params.slug);
  return {
    title: `${meta.headline} | Momento`,
    description: meta.subtitle,
    openGraph: {
      title: `${meta.headline} | Momento`,
      description: meta.subtitle,
      images: [
        {
          url: meta.image,
          alt: meta.headline,
        },
      ],
    },
  };
}

export default function CategoryListingPage({ params }: PageProps) {
  const meta = getCategoryMeta(params.slug);
  const products = getProductsByCategory(params.slug);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div className="py-4 sm:py-6 pb-20 lg:pb-8 space-y-6 sm:space-y-8">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold">{meta.title}</span>
      </nav>

      {/* 2. Category Hero Banner */}
      <h1 className="sr-only">{meta.headline} — Momento</h1>
      <HeroBanner />

      {/* 3. Product Cards Grid (with Filter Tabs) */}
      <CategoryProductGrid products={products} categoryTitle={meta.title} />
    </div>
  );
}
