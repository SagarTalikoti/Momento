"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cleanSlug } from "@/lib/products";

interface CategoryGridItem {
  href: string;
  image: string;
  alt: string;
  title: string;
}

interface CategoryGridProps {
  title: string;
  subtitle?: string;
  items: CategoryGridItem[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <section className="my-6 sm:my-9">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex flex-col gap-1.5 items-start">
          <h2 className="text-[18px] sm:text-[25px] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            {title}
          </h2>
          <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
          {subtitle && (
            <p className="text-[12px] text-gray-500 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {items.map((item, idx) => {
          const itemHref = item.href?.startsWith("/decor/")
            ? item.href
            : `/decor/${cleanSlug(item.href || item.title)}`;

          return (
            <Link
              key={idx}
              href={itemHref}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-[11.5px] sm:text-[12.5px] font-medium text-gray-700 text-center leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
