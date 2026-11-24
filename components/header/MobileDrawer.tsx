"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  MessageSquare,
} from "lucide-react";
import megaMenuData from "@/lib/mega_menu.json";
import { useApp } from "../context/AppContext";

export const MobileDrawer: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, setIsSearchModalOpen } = useApp();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedSubCol, setExpandedSubCol] = useState<string | null>(null);

  if (!isMobileMenuOpen) return null;

  const toggleMenu = (name: string) => {
    setExpandedMenu((prev) => (prev === name ? null : name));
    setExpandedSubCol(null);
  };

  const toggleSubCol = (title: string) => {
    setExpandedSubCol((prev) => (prev === title ? null : title));
  };

  // Filter out any location/cities categories
  const filteredCategories = megaMenuData.filter(
    (menu) =>
      !menu.name.toLowerCase().includes("city") &&
      !menu.name.toLowerCase().includes("cities") &&
      !menu.name.toLowerCase().includes("location")
  );

  return (
    <div
      onClick={() => setIsMobileMenuOpen(false)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/images/momento-logo.png"
              alt="Momento"
              width={140}
              height={60}
              unoptimized
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar in Drawer */}
        <div className="p-3 border-b border-gray-100 bg-gray-50/70">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchModalOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-left text-[13px] text-gray-500 shadow-xs"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span>Search decorations...</span>
          </button>
        </div>

        {/* Menu Category Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredCategories.map((menu) => {
            const isExpanded = expandedMenu === menu.name;
            return (
              <div key={menu.name} className="border-b border-gray-100/80 pb-1">
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-[14px] font-semibold text-gray-800 hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {menu.name}
                    {menu.badge && (
                      <span
                        style={{ backgroundColor: menu.badgeColor || "#f59e0b" }}
                        className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white uppercase"
                      >
                        {menu.badge}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>

                {/* Sub-columns */}
                {isExpanded && menu.columns && (
                  <div className="pl-4 pr-2 pb-2 space-y-2 pt-1">
                    {menu.columns.map((col, cIdx) => {
                      const isSubExpanded = expandedSubCol === col.title;
                      return (
                        <div key={cIdx} className="bg-gray-50/60 rounded-xl p-2.5">
                          <button
                            onClick={() => toggleSubCol(col.title)}
                            className="w-full flex items-center justify-between text-[13px] font-bold text-gray-900 text-left"
                          >
                            <span>{col.title}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                                isSubExpanded ? "rotate-180 text-brand-600" : ""
                              }`}
                            />
                          </button>

                          {isSubExpanded && (
                            <ul className="mt-2 space-y-1.5 pl-2 border-l border-brand-200">
                              {col.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-[12.5px] text-gray-600 hover:text-brand-600 block py-0.5"
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Strip (Only WhatsApp, number concealed) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80">
          <a
            href="https://wa.me/918151959023"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[13.5px] shadow-sm transition-colors active:scale-98"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
};
