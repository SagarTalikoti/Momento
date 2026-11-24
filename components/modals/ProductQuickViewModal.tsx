"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Star, ShieldCheck, Clock, Calendar, Check, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartOpen } = useApp();
  const [selectedSlot, setSelectedSlot] = useState("Evening (4 PM - 7 PM)");
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });

  if (!quickViewProduct) return null;

  const timeSlots = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (1 PM - 4 PM)",
    "Evening (4 PM - 7 PM)",
    "Night Surprise (8 PM - 11 PM)",
  ];

  const handleBookNow = () => {
    addToCart(quickViewProduct);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[260px] md:min-h-full bg-gradient-to-br from-brand-50 to-brand-100">
          <Image
            src={quickViewProduct.image}
            alt={quickViewProduct.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="bg-brand-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Most Booked
            </span>
            {quickViewProduct.discount && (
              <span className="bg-green-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            {/* Title & Rating */}
            <h3 className="text-[18px] sm:text-[20px] font-extrabold text-gray-900 leading-snug">
              {quickViewProduct.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-700 text-white text-[12px] font-bold">
                <Star className="w-3 h-3 fill-white" />
                {quickViewProduct.rating || "4.8"}
              </span>
              <span className="text-[12px] text-gray-500">
                {quickViewProduct.reviews || "150+"} verified celebrations
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-gray-100">
              <span className="text-[24px] font-extrabold text-gray-900">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-[14px] text-gray-400 line-through">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
              <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                Inclusive of all taxes &amp; setup
              </span>
            </div>

            {/* Service Highlights */}
            <div className="mt-4 space-y-2 text-[12.5px] text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Setup duration: <strong>45 – 60 minutes</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Damage-free removable glue tape used for walls</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 text-[12px]">
              <p className="font-bold text-gray-800 mb-1.5">Package Inclusions:</p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-600" />
                  100+ High-quality metallic/pastel balloons
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-600" />
                  Occasion Foil Banner / Arch Frame
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-600" />
                  Fairy Rice Lights &amp; Decorative Ribbons
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-600" />
                  Professional verified decorator at your doorstep
                </li>
              </ul>
            </div>

            {/* Date & Slot selection */}
            <div className="mt-4 space-y-2">
              <label className="block text-[12px] font-bold text-gray-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-600" /> Celebration Date:
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 font-medium text-gray-800"
              />

              <label className="block text-[12px] font-bold text-gray-700 mt-2">
                Select Time Slot:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium border text-center transition-all ${
                      selectedSlot === slot
                        ? "bg-brand-50 border-brand-500 text-brand-700 font-bold"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-4 border-t border-gray-100 flex gap-2.5">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl border border-brand-500 text-brand-700 font-bold text-[13px] hover:bg-brand-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={handleBookNow}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-[13px] hover:from-brand-600 hover:to-brand-700 transition-all shadow-md shadow-brand-200 flex items-center justify-center gap-1.5"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
