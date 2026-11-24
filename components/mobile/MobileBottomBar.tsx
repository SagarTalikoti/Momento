"use client";

import React from "react";
import Link from "next/link";
import { Home, Phone } from "lucide-react";

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/90 py-1.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 items-center max-w-sm mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-1 text-gray-700 hover:text-brand-600 active:scale-95 transition-all"
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-gray-700" />
          <span className="text-[11px] font-bold mt-0.5 text-gray-800">Home</span>
        </Link>

        {/* 2. WhatsApp (Center Action) */}
        <a
          href="https://wa.me/918151959023"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-0.5 text-emerald-600 active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
            <svg
              className="w-4.5 h-4.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.953 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525s-.678-1.635-.929-2.241c-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.375s-1.054 1.03-1.054 2.51c0 1.48 1.079 2.91 1.23 3.11.15.2 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.25-.704.25-1.308.175-1.432-.075-.124-.276-.2-.577-.35z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.982-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.61 0-3.11-.47-4.38-1.28l-.31-.2-2.95.83.85-2.87-.2-.33A8.174 8.174 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
            </svg>
          </div>
          <span className="text-[10.5px] font-extrabold mt-0.5 text-emerald-600">WhatsApp</span>
        </a>

        {/* 3. Call Us */}
        <a
          href="tel:+918151959023"
          className="flex flex-col items-center justify-center py-1 text-gray-700 hover:text-brand-600 active:scale-95 transition-all"
          aria-label="Call Us"
        >
          <Phone className="w-5 h-5 text-gray-700" />
          <span className="text-[11px] font-bold mt-0.5 text-gray-800">Call Us</span>
        </a>
      </div>
    </div>
  );
};
