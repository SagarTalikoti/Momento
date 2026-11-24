"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  Tag,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, showToast } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsCartOpen]);

  if (!isCartOpen) return null;

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const p = parseInt(item.price.replace(/,/g, ""), 10) || 0;
    return acc + p * item.quantity;
  }, 0);

  const discountAmount = discountApplied ? 200 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "WELCOME200" || code === "MOMENTO200" || code === "SANTA" || code === "CELEBRATE") {
      setDiscountApplied(true);
      showToast("Coupon applied! ₹200 discount added");
    } else {
      showToast("Invalid coupon code. Try MOMENTO200 or WELCOME200");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Build comprehensive order details message for WhatsApp
    const lines: string[] = [
      "🎉 *NEW CELEBRATION BOOKING REQUEST* 🎉",
      "----------------------------------------",
      "📦 *ORDER PACKAGES & ITEMS:*",
    ];

    cartItems.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.title}*`);
      lines.push(`   • Quantity: ${item.quantity}`);
      lines.push(`   • Price: ₹${item.price}`);
    });

    lines.push("----------------------------------------");
    lines.push(`💰 *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`);
    if (discountApplied) {
      lines.push(
        `🎟️ *Coupon Discount:* -₹${discountAmount} (${promoCode.toUpperCase() || "MOMENTO200"})`
      );
    }
    lines.push("🚚 *Decorator Doorstep Setup:* FREE (Included)");
    lines.push("🧼 *Sanitized Wall-Safe Materials:* Included");
    lines.push(`✨ *TOTAL PAYABLE:* ₹${finalTotal.toLocaleString("en-IN")}`);
    lines.push("----------------------------------------");

    lines.push("🛡️ *Request:* Please confirm decorator arrival slot and booking confirmation!");
    lines.push("----------------------------------------");
    lines.push("Sent via Momento Online Booking");

    const message = lines.join("\n");
    const whatsappUrl = `https://wa.me/918151959023?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCartOpen(false);
      window.open(whatsappUrl, "_blank");
    }, 400);
  };

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      {/* Drawer Shell (Full width on mobile, max-w-md on desktop) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full max-h-[100dvh] overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* 1. Header (Sticky Top) */}
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] sm:text-[17px] font-extrabold text-gray-950 leading-tight">
                Celebration Cart
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center px-4 py-8">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-3.5 shadow-sm">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-[16px] font-extrabold text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-[12.5px] text-gray-500 max-w-xs mb-5 leading-relaxed">
                Add balloon decorations, birthday packages, or surprises to make your special day unforgettable!
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-[13px] transition-all shadow-md shadow-brand-200 active:scale-95 cursor-pointer"
              >
                Explore Decorations
              </button>
            </div>
          ) : (
            <>
              {/* Item Cards List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-3 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all shadow-sm"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[12.5px] sm:text-[13px] font-bold text-gray-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-[13.5px] font-extrabold text-gray-950">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.title, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-brand-600 active:bg-gray-200 rounded-l-lg transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[12px] font-bold text-gray-900 w-6 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.title, 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-brand-600 active:bg-gray-200 rounded-r-lg transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.title)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="pt-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:bg-white focus-within:border-brand-500">
                    <Tag className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon (e.g. MOMENTO200)"
                      className="w-full text-[12px] bg-transparent outline-none uppercase font-bold text-gray-800 placeholder:normal-case placeholder:font-normal placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gray-950 hover:bg-black text-white text-[12px] font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] font-semibold text-green-700 mt-1 flex items-center gap-1">
                    ✓ &quot;{promoCode.toUpperCase() || "MOMENTO200"}&quot; applied! ₹200 saved.
                  </p>
                )}
              </form>

              {/* Trust badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50/70 border border-green-100 text-green-800 text-[11.5px]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-green-600" />
                <span>Free professional doorstep setup &amp; wall-safe tape guarantee</span>
              </div>
            </>
          )}
        </div>

        {/* 3. Sticky Bottom Bill & Checkout (Fully Mobile-Responsive) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/95 backdrop-blur-md space-y-3 shrink-0">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-[12.5px] text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Decorator Setup</span>
                <span className="text-green-700 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Wall Safety &amp; Tape</span>
                <span className="text-gray-500">Included</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-[15.5px] font-extrabold text-gray-950">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Proceed to Booking via WhatsApp CTA Button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {/* WhatsApp SVG Icon */}
              <svg
                className="w-5 h-5 fill-current shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.953 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525s-.678-1.635-.929-2.241c-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.375s-1.054 1.03-1.054 2.51c0 1.48 1.079 2.91 1.23 3.11.15.2 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.25-.704.25-1.308.175-1.432-.075-.124-.276-.2-.577-.35z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.982-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.61 0-3.11-.47-4.38-1.28l-.31-.2-2.95.83.85-2.87-.2-.33A8.174 8.174 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
              </svg>
              <span>
                {isCheckingOut
                  ? "Redirecting to WhatsApp..."
                  : `Proceed to Booking via WhatsApp (₹${finalTotal.toLocaleString("en-IN")})`}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <p className="text-[11px] text-gray-500 text-center font-medium">
              Redirects to WhatsApp with your celebration order summary
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
