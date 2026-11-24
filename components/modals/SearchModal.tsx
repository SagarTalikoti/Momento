"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  X,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Tag,
  ChevronDown,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, ProductDetail } from "@/lib/products";

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, addToCart } = useApp();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allProducts = useMemo(() => getAllProducts(), []);

  // Close sort dropdown when clicking outside
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

  // Global Ctrl+K / Cmd+K and ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === "Escape" && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  // Lock body scroll and focus input when modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchModalOpen]);

  // Comprehensive filtered and sorted results
  const filteredProducts = useMemo(() => {
    let list = allProducts;
    const q = query.toLowerCase().trim();

    // 1. Text Search Filter (Title, Category, Inclusions, Description)
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.inclusions && p.inclusions.some((inc) => inc.toLowerCase().includes(q)))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        const cat = p.category.toLowerCase();
        if (selectedCategory === "birthday") return cat.includes("birthday") && !cat.includes("kids");
        if (selectedCategory === "kids") return cat.includes("kids");
        if (selectedCategory === "romantic") return cat.includes("romantic") || cat.includes("anniversary");
        if (selectedCategory === "welcome") return cat.includes("welcome") || cat.includes("newborn");
        if (selectedCategory === "shower") return cat.includes("shower");
        return true;
      });
    }

    // 3. Price Filter
    if (selectedPriceRange === "under2500") {
      list = list.filter((p) => p.priceNum <= 2500);
    } else if (selectedPriceRange === "2500-5000") {
      list = list.filter((p) => p.priceNum > 2500 && p.priceNum <= 5000);
    } else if (selectedPriceRange === "above5000") {
      list = list.filter((p) => p.priceNum > 5000);
    }

    // 4. Sorting
    const sorted = [...list];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.priceNum - a.priceNum);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => parseFloat(b.rating || "4.8") - parseFloat(a.rating || "4.8"));
    }

    return sorted;
  }, [allProducts, query, selectedCategory, selectedPriceRange, sortBy]);

  if (!isSearchModalOpen) return null;

  const popularTags = [
    "Simple Birthday",
    "Cabana Decor",
    "Anniversary Surprise",
    "Kids Theme",
    "Baby Shower",
    "Newborn Welcome",
    "Rose Gold",
    "Fairy Lights",
  ];

  return (
    <div
      onClick={() => setIsSearchModalOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-6 pt-3 sm:pt-14 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[94vh] sm:h-[85vh] max-h-[850px] animate-in zoom-in-95 duration-200"
      >
        {/* 1. Search Input Bar */}
        <div className="flex items-center px-3.5 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white shrink-0 gap-2.5 sm:gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search decorations, birthday, anniversary, cabana..."
            className="flex-1 text-[14px] sm:text-[16px] font-medium outline-none text-gray-900 placeholder:text-gray-400 bg-transparent min-w-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Filter Bar: Category & Sort */}
        <div className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide shrink-0 text-[12px]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: "all", label: "All Decor" },
              { id: "birthday", label: "Birthday" },
              { id: "kids", label: "Kids" },
              { id: "romantic", label: "Romantic" },
              { id: "shower", label: "Baby Shower" },
              { id: "welcome", label: "Newborn" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Custom Sort Dropdown */}
          <div className="relative shrink-0 pl-1" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-expanded={isSortOpen}
              className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-brand-300 rounded-lg px-2.5 py-1 text-[11px] sm:text-[11.5px] font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600 hidden sm:inline" />
              <span>
                {sortBy === "relevance"
                  ? "Recommended"
                  : sortBy === "price-asc"
                  ? "Price: Low to High"
                  : sortBy === "price-desc"
                  ? "Price: High to Low"
                  : "Highest Rated"}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                  isSortOpen ? "rotate-180 text-brand-600" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 w-44 bg-white rounded-xl shadow-xl border border-purple-100 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {[
                  { value: "relevance", label: "Recommended" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                ].map((opt) => {
                  const isSelected = sortBy === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.value as any);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[11.5px] flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-purple-50 text-brand-700 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 3. Modal Body: Quick Tags & Search Results */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-6 space-y-4">
          {/* Popular Search Tags */}
          {!query && (
            <div className="space-y-2 pb-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-brand-500" /> Trending Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[12px] sm:text-[12.5px] text-gray-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-colors cursor-pointer"
                  >
                    <Search className="w-3 h-3 text-gray-400" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count & Quick Price Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-[11.5px] sm:text-[12px] text-gray-500">
            <span>
              Found <strong>{filteredProducts.length}</strong> celebrations
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide">
              {[
                { id: "all", label: "All Prices" },
                { id: "under2500", label: "< ₹2.5k" },
                { id: "2500-5000", label: "₹2.5k - ₹5k" },
                { id: "above5000", label: "> ₹5k" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedPriceRange(pill.id)}
                  className={`px-2 py-0.5 rounded text-[10.5px] sm:text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                    selectedPriceRange === pill.id
                      ? "bg-gray-800 text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-2">
              <p className="text-base font-bold text-gray-800">
                No decorations found for &quot;{query}&quot;
              </p>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Try searching for <strong>Birthday</strong>, <strong>Anniversary</strong>, or <strong>Cabana</strong>
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                }}
                className="mt-3 px-4 py-1.5 rounded-xl bg-brand-600 text-white text-[12.5px] font-bold shadow-sm cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {filteredProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/decor/${item.slug}`}
                  onClick={() => setIsSearchModalOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-100 hover:border-brand-300 hover:bg-brand-50/30 transition-all text-left group bg-white shadow-xs"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block truncate">
                      {item.category}
                    </span>
                    <h4 className="text-[12.5px] sm:text-[13px] font-bold text-gray-900 truncate group-hover:text-brand-700 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
                      <span className="text-[13px] sm:text-[13.5px] font-extrabold text-gray-950">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10.5px] sm:text-[11px] text-gray-400 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                        {item.rating || "4.8"}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
