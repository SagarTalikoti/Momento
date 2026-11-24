"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface TopCategoryItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

export const TopCategories: React.FC = () => {
  const categories: TopCategoryItem[] = [
    {
      id: "birthday-decor",
      title: "Birthday Decor",
      image: "/images/categories/birthday-decor.webp",
      href: "/category/birthday-decor",
    },
    {
      id: "kids-birthday",
      title: "Kids Birthday",
      image: "/images/categories/kids-birthday.webp",
      href: "/category/kids-birthday",
    },
    {
      id: "newborn-welcome",
      title: "Newborn Welcome",
      image: "/images/categories/newborn-welcome.webp",
      href: "/category/newborn-welcome",
    },
    {
      id: "baby-shower",
      title: "Baby Shower",
      image: "/images/categories/baby-shower.webp",
      href: "/category/baby-shower",
    },
    {
      id: "romantic",
      title: "Romantic",
      image: "/images/categories/romantic.webp",
      href: "/category/romantic",
    },
    {
      id: "wedding-decor",
      title: "Wedding Decor",
      image: "/images/categories/wedding-decor.webp",
      href: "/category/wedding-decor",
    },
  ];

  return (
    <section className="my-6 sm:my-8">
      {/* Section Header */}
      <div className="flex flex-col gap-1 items-start mb-4 sm:mb-6">
        <h2 className="text-[19px] sm:text-[25px] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
          Top Balloon Decoration Categories
        </h2>
        <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 my-0.5" />
        <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium">
          Trusted Decorators for All Events
        </p>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex flex-col items-center gap-2.5 text-center"
          >
            {/* Card Image Container */}
            <div className="relative w-full aspect-square rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-amber-100/60 bg-[#FFF7DE] group-hover:shadow-[0_8px_24px_-6px_rgba(142,44,143,0.22)] group-hover:-translate-y-1 transition-all duration-300">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>

            {/* Label */}
            <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-gray-800 leading-snug group-hover:text-brand-600 transition-colors">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
