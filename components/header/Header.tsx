"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "../context/AppContext";
import {
  Menu,
  Search,
  ShoppingBag,
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    setIsSearchModalOpen,
    setIsCartOpen,
    setIsMobileMenuOpen,
    cartItems,
  } = useApp();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="Header-module__5oas6a__header">
      {/* Main Header Bar */}
      <div className="Header-module__5oas6a__main">
        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="Header-module__5oas6a__iconButton Header-module__5oas6a__menuButton"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="Header-module__5oas6a__brand">
          <Link
            href="/"
            aria-label="Momento — Make Every Moment Special"
            className="flex items-center justify-start w-fit select-none"
          >
            <Image
              src="/images/momento-logo.png"
              alt="Momento — Make Every Moment Special"
              width={280}
              height={120}
              priority
              unoptimized
              className="h-[52px] sm:h-[62px] lg:h-[72px] w-auto object-contain"
            />
          </Link>
          <span>Make Every Moment Special.</span>
        </div>

        {/* Desktop Search Button / Trigger */}
        <button
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
          className="Header-module__5oas6a__search Header-module__5oas6a__desktopSearch"
          aria-label="Find your next celebration. Search decorations"
        >
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <span>Find your next celebration</span>
          <kbd aria-hidden="true">Ctrl K</kbd>
        </button>

        {/* Header Actions */}
        <div className="Header-module__5oas6a__actions items-center">
          {/* WhatsApp */}
          <a
            href="https://wa.me/918151959023"
            target="_blank"
            rel="noopener noreferrer"
            className="Header-module__5oas6a__iconButton hover:bg-emerald-50 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <svg
              className="w-5 h-5 fill-current text-[#25D366]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.953 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525s-.678-1.635-.929-2.241c-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.375s-1.054 1.03-1.054 2.51c0 1.48 1.079 2.91 1.23 3.11.15.2 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.25-.704.25-1.308.175-1.432-.075-.124-.276-.2-.577-.35z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.982-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.61 0-3.11-.47-4.38-1.28l-.31-.2-2.95.83.85-2.87-.2-.33A8.174 8.174 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
            </svg>
            <span className="text-[10px] font-bold text-gray-700">WhatsApp</span>
          </a>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="Header-module__5oas6a__iconButton !bg-transparent hover:!bg-gray-100/70 text-gray-700 transition-colors relative"
            aria-label={`Cart with ${totalCartCount} items`}
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[11px] font-black text-brand-600 leading-none select-none">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-700 mt-0.5">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Row (Shown on Mobile screens) */}
      <div className="Header-module__5oas6a__mobileTools lg:hidden pb-2.5 px-3">
        <div className="Header-module__5oas6a__searchRow">
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="Header-module__5oas6a__search w-full"
            aria-label="Search all decorations"
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Search all decorations...</span>
          </button>
        </div>
      </div>
    </header>
  );
};
