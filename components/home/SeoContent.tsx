"use client";

import React from "react";
import {
  Clock,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  BadgeDollarSign,
  Users,
} from "lucide-react";

export const SeoContent: React.FC = () => {
  const pricePackages = [
    {
      name: "Basic Balloon Decoration",
      price: "₹999 – ₹1,499",
      included: "Wall balloons, ribbons, simple home setup",
    },
    {
      name: "Birthday Balloon Decoration",
      price: "₹1,499 – ₹2,499",
      included: "Foil balloons, backdrop, Happy Birthday setup",
    },
    {
      name: "Theme Balloon Decoration",
      price: "₹2,499 – ₹3,999",
      included: "Balloon arch, kids or colour theme, backdrop",
    },
    {
      name: "Canopy / Cabana Decoration",
      price: "₹4,499 – ₹10,999",
      included: "Romantic setup with lights, draping, balloons",
    },
    {
      name: "Premium Decoration",
      price: "₹10,999+",
      included: "LED name, custom backdrop, premium props",
    },
  ];

  const atAGlance = [
    { label: "Starting Price", value: "₹999" },
    { label: "Coverage", value: "Pan-India Doorstep Service" },
    { label: "Booking Mode", value: "Instant Online Booking at Momento" },
    { label: "Same-Day Booking", value: "Available across India (book 2–3 hrs prior)" },
    { label: "Setup Time", value: "30 to 90 minutes depending on package" },
    { label: "Materials", value: "Everything brought by our certified decorator" },
    {
      label: "Key Services",
      value:
        "Balloon decoration, Birthday, Anniversary, Baby shower, Kids theme, Surprise, Office, Wedding",
    },
  ];

  const reasons = [
    {
      title: "Verified Professional Decorators",
      desc: "Background-checked, trained, and certified decorators who arrive on time with complete materials.",
      icon: <Users className="w-5 h-5 text-brand-600" />,
    },
    {
      title: "Fixed & Transparent Pricing",
      desc: "No hidden charges or last-minute surprises. What you see is what you pay, starting from ₹999.",
      icon: <BadgeDollarSign className="w-5 h-5 text-brand-600" />,
    },
    {
      title: "Damage-Free Setup",
      desc: "We use high-grade removable glue drops and paper tape designed to protect your home's wall paint.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
    },
    {
      title: "On-Time Completion",
      desc: "Decorations are finished smoothly within 45 to 90 minutes before your guests arrive.",
      icon: <Clock className="w-5 h-5 text-brand-600" />,
    },
    {
      title: "Same-Day Bookings",
      desc: "Forgot to plan ahead? We accept same-day decoration bookings across all serviced destinations.",
      icon: <CalendarCheck className="w-5 h-5 text-brand-600" />,
    },
    {
      title: "100% Customized Designs",
      desc: "Choose balloon colors, personalized name foils, neon lights, and themes to match your vibe.",
      icon: <Sparkles className="w-5 h-5 text-brand-600" />,
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Choose Your Theme",
      desc: "Browse 500+ curated designs for birthday, anniversary, kids parties, or baby showers.",
    },
    {
      step: "02",
      title: "Select Date & Time",
      desc: "Pick your preferred setup date and 2-hour arrival slot convenient for your schedule.",
    },
    {
      step: "03",
      title: "Enter Venue & Details",
      desc: "Provide your home or venue address and confirm booking with secure online payment.",
    },
    {
      step: "04",
      title: "Enjoy the Party!",
      desc: "Our decorator arrives with all balloons, lights, and gear. You sit back and celebrate!",
    },
  ];

  return (
    <div className="my-10 sm:my-14 border-t border-gray-100 pt-8 sm:pt-12 text-gray-800">
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <h2 className="text-[22px] sm:text-[30px] font-heading font-extrabold text-gray-900 leading-tight">
          Balloon Decoration at Home Across India – Momento
        </h2>
        <p className="text-[13.5px] sm:text-[14.5px] text-gray-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
          From simple balloon bouquets to grand milestone setups, Momento has brought joy to over 10,000+ celebrations with doorstep decorator service starting at just ₹999.
        </p>
      </div>

      <div className="space-y-10 max-w-5xl mx-auto">
        {/* At a Glance Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5 sm:p-7">
          <h3 className="text-[17px] sm:text-[19px] font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            At a Glance – Momento Decoration Service
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] sm:text-[13.5px]">
              <tbody>
                {atAGlance.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 ${
                      idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-gray-900 w-1/3 sm:w-1/4">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5 sm:p-7">
          <h3 className="text-[17px] sm:text-[19px] font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BadgeDollarSign className="w-5 h-5 text-brand-600" />
            Balloon Decoration Price in India
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] sm:text-[13.5px]">
              <thead>
                <tr className="bg-brand-50/80 text-brand-900 border-b border-brand-100">
                  <th className="py-3 px-4 font-bold">Package Type</th>
                  <th className="py-3 px-4 font-bold">Price Range</th>
                  <th className="py-3 px-4 font-bold">What&apos;s Included</th>
                </tr>
              </thead>
              <tbody>
                {pricePackages.map((pkg, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900">{pkg.name}</td>
                    <td className="py-3 px-4 font-bold text-brand-700">{pkg.price}</td>
                    <td className="py-3 px-4 text-gray-600">{pkg.included}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Families Choose Momento */}
        <div>
          <h3 className="text-[18px] sm:text-[22px] font-heading font-extrabold text-gray-900 mb-6 text-center">
            Why Families Choose Momento Over Local Decorators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map((r, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-brand-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
                    {r.icon}
                  </div>
                  <h4 className="text-[14.5px] font-bold text-gray-900 mb-1.5">
                    {r.title}
                  </h4>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Book in 4 Easy Steps */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-50/60 to-purple-50/40 border border-brand-100/60">
          <h3 className="text-[18px] sm:text-[22px] font-heading font-extrabold text-gray-900 mb-6 text-center">
            How to Book Balloon Decoration Online
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
              >
                <span className="text-[28px] font-black text-brand-100 absolute top-2 right-3 select-none">
                  {s.step}
                </span>
                <h4 className="text-[14.5px] font-bold text-gray-900 mb-1 relative z-10">
                  {s.title}
                </h4>
                <p className="text-[12.5px] text-gray-600 leading-relaxed relative z-10">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
