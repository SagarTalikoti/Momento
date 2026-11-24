"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Gift,
  Copy,
  CalendarDays,
  Calendar,
  Zap,
  Plus,
} from "lucide-react";
import { ProductDetail } from "@/lib/products";
import { useApp } from "../context/AppContext";
import { validateIndianPincode } from "@/lib/pincodes";

interface ProductBookingPanelProps {
  product: ProductDetail;
}

interface AddOnItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  icon: string;
  image: string;
  category: string;
}

const ADD_ONS: AddOnItem[] = [
  {
    id: "cake",
    name: "Customized 500g Cake",
    subtitle: "Fresh Chocolate / Truffle",
    price: 499,
    icon: "🎂",
    image: "/images/addons/cake.webp",
    category: "Cake",
  },
  {
    id: "numbers",
    name: "Foil Number Balloons",
    subtitle: "Age 1 to 99 • Gold / Rose Gold",
    price: 199,
    icon: "🔢",
    image: "/images/addons/numbers.webp",
    category: "Foil",
  },
  {
    id: "poppers",
    name: "Party Poppers & Confetti",
    subtitle: "Pack of 2 party blasters",
    price: 149,
    icon: "🎉",
    image: "/images/addons/poppers.webp",
    category: "Party",
  },
  {
    id: "fairy-lights",
    name: "Warm Fairy Lights Curtain",
    subtitle: "Extra 20m warm lights",
    price: 299,
    icon: "💡",
    image: "/images/addons/fairy-lights.webp",
    category: "Lighting",
  },
];

// Standard Indian Time Slots (IST)
const INDIAN_STANDARD_TIME_SLOTS = [
  { id: "morning", label: "09:00 AM – 11:30 AM", period: "Morning Surprise" },
  { id: "afternoon", label: "12:00 PM – 02:30 PM", period: "Afternoon Setup" },
  { id: "evening", label: "03:30 PM – 06:00 PM", period: "Evening Party" },
  { id: "night", label: "06:30 PM – 09:00 PM", period: "Dinner & Celebration" },
  { id: "midnight", label: "11:00 PM – 11:59 PM", period: "Midnight Surprise" },
];

export const ProductBookingPanel: React.FC<ProductBookingPanelProps> = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, setIsCartOpen, showToast } = useApp();

  // Compute Indian Standard Time (IST) for Today
  const todayIST = useMemo(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * 5.5);
  }, []);

  const todayIso = useMemo(() => todayIST.toISOString().split("T")[0], [todayIST]);

  // Generate 14 upcoming dates in IST
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(todayIST);
      d.setDate(todayIST.getDate() + i);
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString("en-IN", { month: "short" });
      const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
      const fullIso = d.toISOString().split("T")[0];

      let badge = "";
      if (i === 0) badge = "Today";
      else if (i === 1) badge = "Tomorrow";
      else if (i % 3 === 0) badge = "Fast";

      list.push({
        fullIso,
        dayNum,
        monthName,
        dayName,
        badge,
      });
    }
    return list;
  }, [todayIST]);

  // Date selection state (preset or custom)
  const [selectedDate, setSelectedDate] = useState(dates[0].fullIso);
  const [isCustomDateActive, setIsCustomDateActive] = useState(false);
  const [customDate, setCustomDate] = useState(todayIso);

  // Time slot selection state (preset or custom IST)
  const [selectedSlot, setSelectedSlot] = useState(INDIAN_STANDARD_TIME_SLOTS[2].label);
  const [isCustomTimeActive, setIsCustomTimeActive] = useState(false);
  const [customTime, setCustomTime] = useState("05:30 PM");

  // Pincode state: only validated when user clicks "Check", default 591201 verified initially
  const [pincode, setPincode] = useState("591201");
  const [isChecked, setIsChecked] = useState(true);
  const [isPinValid, setIsPinValid] = useState(true);

  // Selected add-ons set
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handlePincodeChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 6);
    setPincode(cleaned);
    setIsChecked(false); // Reset check state until user clicks Check
  };

  const handleCheckPincode = () => {
    const res = validateIndianPincode(pincode);
    setIsChecked(true);
    setIsPinValid(res.isValid);
    if (!res.isValid) {
      showToast(res.message || "Please enter a valid 6-digit Indian PIN code.");
    }
  };

  // Formatted date label for cart & WhatsApp
  const displayDateLabel = useMemo(() => {
    if (isCustomDateActive && customDate) {
      const parts = customDate.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          weekday: "short",
        });
      }
      return customDate;
    }
    const found = dates.find((d) => d.fullIso === selectedDate);
    return found ? `${found.dayNum} ${found.monthName} (${found.dayName})` : selectedDate;
  }, [isCustomDateActive, customDate, selectedDate, dates]);

  // Formatted time label for cart & WhatsApp
  const displayTimeLabel = useMemo(() => {
    if (isCustomTimeActive && customTime) {
      return `${customTime} (IST)`;
    }
    return `${selectedSlot} (IST)`;
  }, [isCustomTimeActive, customTime, selectedSlot]);

  // Check if an add-on is currently in the cart
  const isAddonInCart = (addonName: string) => {
    return cartItems.some((item) => item.title === addonName);
  };

  const isAddonSelected = (addon: AddOnItem) => {
    return selectedAddons.includes(addon.id) || isAddonInCart(addon.name);
  };

  // Calculate dynamic total price
  const addOnsTotal = useMemo(() => {
    let total = 0;
    ADD_ONS.forEach((addon) => {
      if (isAddonSelected(addon)) {
        total += addon.price;
      }
    });
    return total;
  }, [selectedAddons, cartItems]);

  const finalPrice = product.priceNum + addOnsTotal;

  const toggleAddon = (addon: AddOnItem) => {
    const isAdded = isAddonSelected(addon);
    if (isAdded) {
      setSelectedAddons((prev) => prev.filter((id) => id !== addon.id));
      removeFromCart(addon.name);
      showToast(`Removed "${addon.name}" from cart`);
    } else {
      setSelectedAddons((prev) => (prev.includes(addon.id) ? prev : [...prev, addon.id]));
      addToCart({
        title: addon.name,
        price: addon.price.toString(),
        image: addon.image,
        rating: "4.9",
        reviews: "500+",
      });
      showToast(`Added "${addon.name}" (+₹${addon.price}) to cart!`);
    }
  };

  const copyCoupon = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("MOMENTO200");
    }
    showToast("Coupon MOMENTO200 copied! Extra ₹200 OFF applied.");
  };

  const handleBookNow = () => {
    // 1. Add main package to cart
    addToCart({
      title: `${product.title} (${displayDateLabel}, ${displayTimeLabel})`,
      price: product.priceNum.toLocaleString("en-IN"),
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
    });

    // 2. Ensure all selected add-ons are in the cart
    selectedAddons.forEach((id) => {
      const addon = ADD_ONS.find((a) => a.id === id);
      if (addon && !cartItems.some((item) => item.title === addon.name)) {
        addToCart({
          title: addon.name,
          price: addon.price.toString(),
          image: addon.image,
          rating: "4.9",
          reviews: "500+",
        });
      }
    });

    // 3. Open Cart Drawer
    setIsCartOpen(true);
  };

  const handleWhatsApp = () => {
    const activeAddons = ADD_ONS.filter((addon) => isAddonSelected(addon));
    const addonNames = activeAddons.map((a) => `${a.name} (+₹${a.price})`).join(", ");
    const addonText = addonNames ? ` + Add-ons: [${addonNames}]` : "";
    const msg = `Hi Momento Team! I am interested in booking *${product.title}* on *${displayDateLabel}* at *${displayTimeLabel}*${addonText}. Total Amount: ₹${finalPrice.toLocaleString("en-IN")}. PIN: ${pincode}. Please confirm booking!`;
    const url = `https://wa.me/918151959023?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 text-gray-800">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/" className="hover:text-brand-600 transition-colors">
          {product.category || "Birthday Decoration"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* 2. Product Title */}
      <div>
        <h1 className="text-[22px] sm:text-[27px] font-heading font-extrabold text-gray-950 leading-snug">
          {product.title}
        </h1>

        {/* Rating & Review Counter Pill */}
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-[12px] font-bold">
            <Star className="w-3 h-3 fill-white text-white" />
            {product.rating || "4.8"}
          </span>
          <span className="text-[12px] text-gray-600 font-medium">
            ({product.reviews || "150+"} Verified Celebrations)
          </span>
        </div>
      </div>

      {/* 3. Pricing Section */}
      <div className="bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[26px] sm:text-[30px] font-heading font-extrabold text-gray-950">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-[15px] text-gray-400 line-through font-medium">
              ₹{product.originalPrice}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11.5px] font-extrabold border border-emerald-200">
              {product.discount}
            </span>
          )}
        </div>
        <span className="text-[11.5px] font-semibold text-emerald-800 bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-200/60">
          ✓ Inclusive of all Taxes &amp; Setup
        </span>
      </div>

      {/* 4. Availability Check Box: Proper Structure, Validated on Click, Only Right Tick Mark on Top Right, NO message */}
      <div className="relative rounded-2xl border border-gray-200/90 bg-white p-3.5 sm:p-4 shadow-sm transition-all">
        {/* Right Top Tick Mark ONLY (no message) */}
        {isChecked && isPinValid && (
          <div
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm animate-in zoom-in-75 duration-200"
            title="Service Available"
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}
        {isChecked && !isPinValid && (
          <div
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm animate-in zoom-in-75 duration-200"
            title="Invalid PIN Code"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        <div className="flex items-center gap-3 pr-10">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <span className="text-[13px] font-semibold text-gray-800 whitespace-nowrap">
              Check setup availability:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                maxLength={6}
                placeholder="Enter PIN"
                className={`w-28 px-3 py-1.5 text-center font-bold text-gray-900 border rounded-xl text-[13px] outline-none transition-all ${
                  isChecked && isPinValid
                    ? "border-emerald-500 bg-emerald-50/20"
                    : isChecked && !isPinValid
                    ? "border-red-400 bg-red-50/20"
                    : "border-gray-300 focus:border-brand-500 bg-white"
                }`}
              />
              <button
                type="button"
                onClick={handleCheckPincode}
                className="px-4 py-1.5 rounded-xl bg-gray-950 hover:bg-black text-white text-[12px] font-bold shadow-sm transition-transform active:scale-95"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Celebration Date Selector (Preset IST dates + Custom Date Selection) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <label className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-emerald-700" />
            Celebration Date (Indian Standard Time)
          </label>
          <span className="text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            {displayDateLabel}
          </span>
        </div>

        {/* Horizontal Dates Strip with Custom Date Pill */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide -mx-1 px-1 items-stretch">
          {dates.map((d) => {
            const isSelected = !isCustomDateActive && selectedDate === d.fullIso;
            return (
              <button
                key={d.fullIso}
                type="button"
                onClick={() => {
                  setIsCustomDateActive(false);
                  setSelectedDate(d.fullIso);
                }}
                className={`shrink-0 w-[68px] sm:w-[72px] py-2 px-1.5 rounded-2xl flex flex-col items-center justify-between transition-all duration-200 border relative ${
                  isSelected
                    ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30 scale-[1.02]"
                    : "bg-white text-gray-800 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30"
                }`}
              >
                {/* Optional Badge */}
                {d.badge && (
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full -mt-1 mb-1 leading-none ${
                      isSelected
                        ? "bg-amber-400 text-gray-950"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {d.badge}
                  </span>
                )}
                {!d.badge && <span className="h-3.5" />}

                {/* Month */}
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider leading-none ${
                    isSelected ? "text-emerald-200" : "text-gray-400"
                  }`}
                >
                  {d.monthName}
                </span>

                {/* Day Number */}
                <span className="text-[20px] font-heading font-extrabold leading-tight my-0.5">
                  {d.dayNum}
                </span>

                {/* Day Name */}
                <span
                  className={`text-[11px] font-semibold leading-none ${
                    isSelected ? "text-emerald-100" : "text-gray-500"
                  }`}
                >
                  {d.dayName}
                </span>
              </button>
            );
          })}

          {/* Custom Date Selection Pill */}
          <button
            type="button"
            onClick={() => setIsCustomDateActive(true)}
            className={`shrink-0 w-[95px] sm:w-[105px] py-2 px-2 rounded-2xl flex flex-col items-center justify-center text-center transition-all border relative cursor-pointer ${
              isCustomDateActive
                ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30 scale-[1.02]"
                : "bg-white text-gray-800 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30"
            }`}
          >
            <Calendar
              className={`w-5 h-5 mb-1 ${
                isCustomDateActive ? "text-amber-300" : "text-emerald-700"
              }`}
            />
            <span
              className={`text-[11px] font-bold leading-tight ${
                isCustomDateActive ? "text-white" : "text-gray-800"
              }`}
            >
              Custom Date
            </span>
            <span
              className={`text-[9.5px] mt-0.5 ${
                isCustomDateActive ? "text-emerald-200" : "text-gray-500"
              }`}
            >
              {isCustomDateActive ? "Active" : "Pick any day"}
            </span>
          </button>
        </div>

        {/* Dedicated Date Picker when Custom Date is active */}
        {isCustomDateActive && (
          <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[12.5px] font-bold text-gray-900">Custom Celebration Date</p>
                <p className="text-[11px] text-emerald-800">Pick any upcoming celebration day from the calendar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                min={todayIso}
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setIsCustomDateActive(true);
                }}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl border-2 border-emerald-600 bg-white text-gray-900 font-bold text-[13px] outline-none shadow-xs focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Arrival Time Slot Selector (Indian Standard Time - IST Slots + Custom Time) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <label className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-700" />
            Arrival Time Slot (Indian Standard Time - IST)
          </label>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            {displayTimeLabel}
          </span>
        </div>

        {/* Standard IST Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INDIAN_STANDARD_TIME_SLOTS.map((slot) => {
            const isSelected = !isCustomTimeActive && selectedSlot === slot.label;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => {
                  setIsCustomTimeActive(false);
                  setSelectedSlot(slot.label);
                }}
                className={`py-2 px-2.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-emerald-800 text-white border-emerald-900 shadow-sm font-bold"
                    : "bg-white text-gray-800 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/20 font-medium"
                }`}
              >
                <div className="text-[12px] font-bold leading-snug">{slot.label}</div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? "text-emerald-200" : "text-gray-500"
                  }`}
                >
                  {slot.period}
                </div>
              </button>
            );
          })}

          {/* Custom Time Selection Button */}
          <div
            className={`py-2 px-2.5 rounded-xl border transition-all flex flex-col justify-center ${
              isCustomTimeActive
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm font-bold"
                : "bg-white text-gray-800 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/20 font-medium"
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11.5px] font-bold leading-tight">
                Custom Time (IST)
              </span>
              <Clock
                className={`w-3.5 h-3.5 ${
                  isCustomTimeActive ? "text-amber-300" : "text-emerald-700"
                }`}
              />
            </div>
            <select
              value={customTime}
              onChange={(e) => {
                setCustomTime(e.target.value);
                setIsCustomTimeActive(true);
              }}
              onFocus={() => setIsCustomTimeActive(true)}
              className={`text-[11.5px] font-semibold bg-transparent outline-none rounded cursor-pointer ${
                isCustomTimeActive ? "text-amber-200 bg-emerald-900/60" : "text-gray-700"
              }`}
            >
              {[
                "08:00 AM",
                "08:30 AM",
                "09:30 AM",
                "10:30 AM",
                "11:30 AM",
                "12:30 PM",
                "01:30 PM",
                "02:30 PM",
                "03:30 PM",
                "04:30 PM",
                "05:00 PM",
                "05:30 PM",
                "06:00 PM",
                "06:30 PM",
                "07:00 PM",
                "07:30 PM",
                "08:00 PM",
                "08:30 PM",
                "09:00 PM",
                "09:30 PM",
                "10:00 PM",
                "10:30 PM",
                "11:00 PM",
                "11:30 PM",
              ].map((time) => (
                <option key={time} value={time} className="text-gray-900 bg-white">
                  {time} IST
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 italic">
          * All time slots are in Indian Standard Time (IST). Decorator will reach within your window.
        </p>
      </div>

      {/* 7. Promotional Coupon Offer Box */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-amber-950">
              Use code <span className="text-amber-800 underline decoration-dashed">MOMENTO200</span>
            </p>
            <p className="text-[11px] text-amber-800">
              Get flat ₹200 OFF on orders above ₹1,999
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={copyCoupon}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11.5px] font-bold shadow-sm transition-colors flex items-center gap-1"
        >
          <Copy className="w-3 h-3" /> Copy
        </button>
      </div>

      {/* 8. Dual Action CTA Buttons (WhatsApp & Book Now) */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[14px] shadow-[0_4px_14px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            {/* WhatsApp SVG Icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.953 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525s-.678-1.635-.929-2.241c-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.375s-1.054 1.03-1.054 2.51c0 1.48 1.079 2.91 1.23 3.11.15.2 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.25-.704.25-1.308.175-1.432-.075-.124-.276-.2-.577-.35z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.982-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.61 0-3.11-.47-4.38-1.28l-.31-.2-2.95.83.85-2.87-.2-.33A8.174 8.174 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
            </svg>
            <span>WhatsApp</span>
          </button>

          {/* Book Now Button */}
          <button
            type="button"
            onClick={handleBookNow}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold text-[14px] shadow-[0_4px_16px_rgba(142,44,143,0.35)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Book Now • ₹{finalPrice.toLocaleString("en-IN")}</span>
          </button>
        </div>

        {/* Guarantees Line */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 font-medium pt-1 text-center flex-wrap">
          <span>⚡ Instant Confirmation</span>
          <span>•</span>
          <span>🛡️ 100% Refund Guarantee</span>
          <span>•</span>
          <span>🧼 Sanitized Setup</span>
        </div>
      </div>

      {/* 9. Package Inclusions Checklist */}
      <div className="rounded-2xl border border-emerald-900/20 bg-emerald-50/40 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2.5">
          <h3 className="text-[14px] font-extrabold text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            What&apos;s Included in this package
          </h3>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            All-Inclusive
          </span>
        </div>

        <ul className="space-y-2 text-[12.5px] text-gray-700">
          {product.inclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2 border-t border-emerald-900/10 flex items-center justify-between text-[11.5px] text-gray-600 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>Setup time: <strong>{product.setupTime}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{product.safetyNote}</span>
          </div>
        </div>
      </div>

      {/* 10. Interactive Add-ons (Add more charm to your surprise) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[13.5px] sm:text-[14px] font-extrabold text-gray-900 flex items-center gap-1.5">
            <span>✨ Add more charm to your surprise</span>
          </h3>
          {selectedAddons.length > 0 && (
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200/60 px-2.5 py-0.5 rounded-full animate-in fade-in duration-150">
              {selectedAddons.length} added
            </span>
          )}
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADD_ONS.map((addon) => {
            const isAdded = isAddonSelected(addon);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon)}
                className={`relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
                  isAdded
                    ? "bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs"
                    : "bg-white border-gray-200 hover:border-brand-200 hover:bg-gray-50/40 shadow-xs"
                }`}
              >
                {/* Top: Icon + Title & Subtitle (No truncate, full text wraps naturally!) */}
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-brand-50/80 border border-brand-100 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    {addon.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-bold text-gray-950 leading-snug break-words">
                      {addon.name}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5 break-words">
                      {addon.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom: Price + Add to Cart Button */}
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gray-100/90">
                  <span className="text-[13px] font-extrabold text-brand-700">
                    +₹{addon.price}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAddon(addon);
                    }}
                    aria-pressed={isAdded}
                    className={`shrink-0 min-w-[76px] px-3 py-1.5 rounded-xl text-[11.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      isAdded
                        ? "bg-brand-600 text-white shadow-xs hover:bg-brand-700"
                        : "bg-brand-50 text-brand-700 border border-brand-200/80 hover:bg-brand-100"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 11. Trust & Quality Assurance (Momento Promise) */}
      <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[12.5px] font-bold text-gray-900">
            The Momento Promise
          </h4>
          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Quality Assured
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center py-1">
          <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
            <span className="block text-[15px] font-extrabold text-gray-900">
              10k+
            </span>
            <span className="text-[10.5px] text-gray-500">Celebrations</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
            <span className="block text-[15px] font-extrabold text-gray-900">
              98%
            </span>
            <span className="text-[10.5px] text-gray-500">On-Time Setup</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
            <span className="block text-[15px] font-extrabold text-gray-900">
              4.8★
            </span>
            <span className="text-[10.5px] text-gray-500">Top Rated</span>
          </div>
        </div>

        <div className="space-y-1.5 text-[11.5px] text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Damage-free removable masking tape protects walls</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Background-verified professional balloon artists</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Zero hidden fees or extra transport charges</span>
          </div>
        </div>
      </div>
    </div>
  );
};
