"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ShieldCheck, Sparkles, Filter, Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, Maximize2 } from "lucide-react";
import { ProductDetail } from "@/lib/products";
import { useApp } from "../context/AppContext";

interface CategoryProductGridProps {
  products: ProductDetail[];
  categoryTitle: string;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured Packages" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;

export const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({
  products,
  categoryTitle,
}) => {
  const { addToCart, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "budget" | "mid" | "premium" | "top">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [imageModalProduct, setImageModalProduct] = useState<{ title: string; image: string } | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setImageModalProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen]);

  const filteredProducts = useMemo(() => {
    let list = products;
    const q = searchQuery.toLowerCase().trim();

    // 1. In-category search filter
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.inclusions && p.inclusions.some((inc) => inc.toLowerCase().includes(q)))
      );
    }

    // 2. Price / Rating Filter
    if (activeFilter === "budget") {
      list = list.filter((p) => p.priceNum <= 2500);
    } else if (activeFilter === "mid") {
      list = list.filter((p) => p.priceNum > 2500 && p.priceNum <= 5000);
    } else if (activeFilter === "premium") {
      list = list.filter((p) => p.priceNum > 5000);
    } else if (activeFilter === "top") {
      list = list.filter((p) => parseFloat(p.rating || "4.8") >= 4.8);
    }

    // 3. Sort Order
    const sorted = [...list];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.priceNum - a.priceNum);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => parseFloat(b.rating || "4.8") - parseFloat(a.rating || "4.8"));
    }

    return sorted;
  }, [products, searchQuery, activeFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="space-y-5">
      {/* 1. Category Search & Sort Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* In-category Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${categoryTitle} (e.g. cabana, balloons, gold)...`}
            className="w-full pl-9 pr-9 py-2 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-[13px] font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative shrink-0 w-full sm:w-auto" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-expanded={isSortOpen}
            aria-haspopup="listbox"
            className="flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-100 border border-gray-200 hover:border-brand-300 rounded-xl text-[12.5px] font-semibold text-gray-800 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span className="text-gray-500 text-[11.5px] hidden sm:inline">Sort:</span>
              <span className="font-bold text-gray-900">
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Featured Packages"}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                isSortOpen ? "rotate-180 text-brand-600" : ""
              }`}
            />
          </button>

          {/* Floating Dropdown Menu */}
          {isSortOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-1.5 z-40 w-56 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl shadow-purple-950/10 border border-purple-100 p-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-[12.5px] flex items-center justify-between rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-purple-50 text-brand-700 font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 2. Filter Pills Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 ${
              activeFilter === "all"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("budget")}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 ${
              activeFilter === "budget"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Under ₹2,500
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("mid")}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 ${
              activeFilter === "mid"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ₹2,500 – ₹5,000
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("premium")}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 ${
              activeFilter === "premium"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Above ₹5,000
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("top")}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 ${
              activeFilter === "top"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Top Rated (4.8+ ★)
          </button>
        </div>

        <span className="text-[12px] text-gray-500 font-medium">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} packages
        </span>
      </div>

      {/* 3. Responsive Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
          <p className="text-[15px] font-bold text-gray-800">
            No packages match your search or filter criteria
          </p>
          <p className="text-[12.5px] text-gray-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the price filters to browse all packages.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[12.5px] font-bold shadow-sm transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.map((product, idx) => (
            <Link
              key={product.slug}
              href={`/decor/${product.slug}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] 
              hover:shadow-[0_14px_34px_-10px_rgba(124,58,237,0.22)] hover:-translate-y-1 
              transition-all duration-300 overflow-hidden cursor-pointer relative flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">
                <Image
                  src={product.image}
                  alt={product.alt || product.title}
                  fill
                  loading={idx < 6 ? "eager" : "lazy"}
                  priority={idx < 4}
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top Badge */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.discount && (
                    <span className="bg-emerald-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* View Image Button on Card */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImageModalProduct({
                      title: product.title,
                      image: product.image,
                    });
                  }}
                  title="View full image"
                  aria-label={`View ${product.title} image`}
                  className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black text-white shadow-md flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Quick Add Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({
                      title: product.title,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      rating: product.rating,
                      reviews: product.reviews,
                    });
                    showToast(`Added "${product.title}" to cart!`);
                  }}
                  title="Quick add to cart"
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/95 text-brand-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-600 hover:text-white z-10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Card Info */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[12.5px] sm:text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-700 text-white leading-none">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                      <span className="text-[10.5px] font-bold">
                        {product.rating || "4.8"}
                      </span>
                    </span>
                    <span className="text-[11px] text-gray-500 leading-none">
                      {product.reviews || "150+"} reviews
                    </span>
                  </div>
                </div>

                {/* Pricing & Wall-Safe Badge */}
                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[15px] sm:text-[16px] font-extrabold text-gray-950 tracking-tight">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                    Wall-Safe
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Full-Screen Image View Modal with Cross Close Symbol */}
      {imageModalProduct && (
        <div
          onClick={() => setImageModalProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Title and Close Cross */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
            <span className="text-[13px] sm:text-[14px] font-bold tracking-wide bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg truncate max-w-md">
              {imageModalProduct.title}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImageModalProduct(null);
              }}
              className="w-11 h-11 rounded-full bg-white/25 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 border border-white/20"
              title="Close image (Esc)"
              aria-label="Close image view"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Large Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[82vh] aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-black/40"
          >
            <Image
              src={imageModalProduct.image}
              alt={imageModalProduct.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
