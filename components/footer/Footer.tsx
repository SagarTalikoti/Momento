"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

export const Footer: React.FC = () => {
  const trustBadges = [
    {
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-400" />,
      title: "4.8/5 Rating",
      subtitle: "10,000+ Happy Celebrations",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      title: "100% Safe Setup",
      subtitle: "Damage-free wall friendly tape",
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand-600" />,
      title: "Pan India Network",
      subtitle: "Verified local decorator teams",
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Same Day Setup",
      subtitle: "Bookings accepted 2-3 hrs prior",
    },
  ];

  const occasions = [
    { title: "Birthday Balloon Decoration", href: "/pages/birthday-decorations.html" },
    { title: "Kids Theme Birthday", href: "/pages/kids-theme-decorations.html" },
    { title: "Anniversary Decoration", href: "/pages/anniversary-decorations.html" },
    { title: "Baby Shower Packages", href: "/pages/baby-shower-decorations.html" },
    { title: "Welcome Baby Decor", href: "/pages/welcome-baby-decorations.html" },
    { title: "Romantic Canopy & Room", href: "/pages/romantic-decorations.html" },
    { title: "Car Boot Surprise", href: "/pages/car-boot-decorations.html" },
    { title: "Balloon Bouquets", href: "/pages/balloon-bouquets.html" },
    { title: "Festival & Party Decor", href: "/pages/ceremony-decorations.html" },
  ];

  const services = [
    { title: "Room Decorations", href: "/pages/birthday-decorations.html" },
    { title: "Stage & Backdrop Setups", href: "/pages/ceremony-decorations.html" },
    { title: "Surprise Gift Boxes", href: "/pages/balloon-bouquets.html" },
    { title: "Candle Light Dinners", href: "/pages/romantic-decorations.html" },
    { title: "Kids Activity & Magicians", href: "/pages/kids-activities.html" },
    { title: "First Night Celebrations", href: "/pages/anniversary-decorations.html" },
    { title: "Corporate Event Decor", href: "/pages/corporate-decorations.html" },
  ];

  const company = [
    { title: "About Us", href: "/pages/about-us.html" },
    { title: "Contact Us", href: "/pages/contact-us.html" },
    { title: "Blog & Ideas", href: "/pages/blog.html" },
    { title: "Franchise Enquiry", href: "/pages/franchise.html" },
    { title: "Partner With Us", href: "/pages/partner.html" },
    { title: "Cancellation & Refund", href: "/pages/cancellation-refund.html" },
    { title: "Privacy Policy", href: "/pages/privacy-policy.html" },
    { title: "Terms & Conditions", href: "/pages/terms-conditions.html" },
  ];

  return (
    <footer className="bd-defer-footer mt-12 sm:mt-16 border-t border-gray-200 bg-white">
      {/* Trust Strip */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-50/70 to-white Footer-module__PC9gYa__trustStrip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-4 lg:divide-x lg:divide-gray-100">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 lg:justify-center lg:px-2"
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50/60 flex items-center justify-center shrink-0 border border-amber-100/40">
                {badge.icon}
              </span>
              <div>
                <p className="text-[13px] sm:text-[13.5px] font-extrabold text-gray-900 leading-tight">
                  {badge.title}
                </p>
                <p className="text-[11px] sm:text-[11.5px] text-gray-500 mt-0.5">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/momento-logo.png"
                alt="Momento"
                width={180}
                height={75}
                unoptimized
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] text-gray-600 leading-relaxed max-w-sm">
              Momento is India&apos;s leading online celebration and balloon decoration company. Making birthdays, anniversaries, and milestones unforgettable with professional doorstep decorator services.
            </p>
            <div className="space-y-1.5 text-[12.5px] text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <span>+91 8151959023 (WhatsApp &amp; Call)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span>care@momento.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com/momento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/momento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/momento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/momento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-600 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="text-[14px] font-extrabold text-gray-900 mb-3.5">
              Celebration Types
            </h4>
            <ul className="space-y-2 text-[12.5px] text-gray-600">
              {occasions.map((o) => (
                <li key={o.title}>
                  <Link href={o.href} className="hover:text-brand-600 transition-colors">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[14px] font-extrabold text-gray-900 mb-3.5">
              Popular Services
            </h4>
            <ul className="space-y-2 text-[12.5px] text-gray-600">
              {services.map((s) => (
                <li key={s.title}>
                  <Link href={s.href} className="hover:text-brand-600 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-[14px] font-extrabold text-gray-900 mb-3.5">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-[12.5px] text-gray-600">
              {company.map((c) => (
                <li key={c.title}>
                  <Link href={c.href} className="hover:text-brand-600 transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-gray-100 bg-gray-50/80 pt-6 pb-20 lg:pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[12px] text-gray-500">
          <p>© {new Date().getFullYear()} Momento. All Rights Reserved. Make Every Moment Special. Made with <Heart className="w-3.5 h-3.5 inline text-red-500 fill-red-500 mx-0.5" /> for celebrations across India.</p>
          <div className="flex items-center gap-4 text-gray-500">
            <span>100% Safe Payments</span>
            <span>•</span>
            <span>UPI / Cards / NetBanking</span>
            <span>•</span>
            <span>Verified Decorators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
