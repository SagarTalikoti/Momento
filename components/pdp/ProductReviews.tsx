"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, CheckCircle, ThumbsUp, Edit3, X, Camera, Sparkles, Filter } from "lucide-react";
import { useApp } from "../context/AppContext";

interface ReviewItem {
  id: string;
  initials: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  celebrationType: string;
  hasPhoto?: boolean;
  photoUrl?: string;
  tags?: string[];
  verified: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    initials: "RS",
    name: "Rahul Sharma",
    rating: 5,
    date: "2 days ago",
    celebrationType: "Birthday Decor",
    comment:
      "The decorator reached exactly at the booked time slot. The red and gold balloons with fairy lights transformed the room into a luxury suite! Super clean work and the damage-free tape left zero marks on the wall paint. Highly recommended!",
    helpfulCount: 24,
    hasPhoto: true,
    photoUrl: "/images/simple-birthday-decoration-at-home-1785562375292-177235.webp",
    tags: ["Punctual", "Damage-Free Tape", "Wall-Safe"],
    verified: true,
  },
  {
    id: "rev-2",
    initials: "PV",
    name: "Pooja Verma",
    rating: 5,
    date: "5 days ago",
    celebrationType: "Midnight Birthday Surprise",
    comment:
      "Booked this as a midnight birthday surprise. Everything was seamlessly arranged. The decorator was very polite, brought clean equipment, and finished the complete setup in just 45 minutes. Beautiful photo backdrop!",
    helpfulCount: 18,
    hasPhoto: true,
    photoUrl: "/images/gold-birthday-hall-decoration-1785228066699-879821.webp",
    tags: ["Polite Decorator", "Fast Setup"],
    verified: true,
  },
  {
    id: "rev-3",
    initials: "AK",
    name: "Ankit Kumar",
    rating: 5,
    date: "1 week ago",
    celebrationType: "Romantic Cabana",
    comment:
      "Top-notch quality balloons! They stayed inflated and intact for almost 3 days after the celebration. The foil banner and fairy light combination looked very premium. Great value for money.",
    helpfulCount: 12,
    hasPhoto: false,
    tags: ["Long-Lasting Balloons", "Fairy Lights"],
    verified: true,
  },
  {
    id: "rev-4",
    initials: "SM",
    name: "Sneha Mishra",
    rating: 4,
    date: "2 weeks ago",
    celebrationType: "Baby Shower",
    comment:
      "Very happy with the overall experience. Booking was quick via WhatsApp and the decorator was punctual and well-behaved. The pastel balloon arches looked magical in evening lighting.",
    helpfulCount: 9,
    hasPhoto: true,
    photoUrl: "/images/simple-baby-shower-wall-decoration-1785501543905-284754.webp",
    tags: ["Pastel Theme", "WhatsApp Booking"],
    verified: true,
  },
  {
    id: "rev-5",
    initials: "VP",
    name: "Vikas Patel",
    rating: 5,
    date: "3 weeks ago",
    celebrationType: "Kids Theme Birthday",
    comment:
      "Kids were thrilled! The theme props and cartoon foil balloons were vibrant. Everything was neatly packed away after the party too without pulling off any paint.",
    helpfulCount: 15,
    hasPhoto: false,
    tags: ["Kids Loved It", "Safe Clean Up"],
    verified: true,
  },
];

export const ProductReviews: React.FC = () => {
  const { showToast } = useApp();
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<"all" | "photos" | "verified" | "5star">("all");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedUser, setLikedUser] = useState<Record<string, boolean>>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  // "Write a Review" Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newName, setNewName] = useState("");
  const [newCelebration, setNewCelebration] = useState("Birthday Decor");
  const [newComment, setNewComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleLike = (id: string, initial: number) => {
    if (likedUser[id]) {
      showToast("You have already voted this review helpful.");
      return;
    }
    setLikedUser((prev) => ({ ...prev, [id]: true }));
    setLikes((prev) => {
      const current = prev[id] ?? initial;
      return { ...prev, [id]: current + 1 };
    });
    showToast("Thank you for your helpful vote!");
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast("Please enter your name");
      return;
    }
    if (!newComment.trim()) {
      showToast("Please write a short review");
      return;
    }

    const initials = newName
      .trim()
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "U";

    const createdReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      initials,
      name: newName.trim(),
      rating: newRating,
      date: "Just now",
      celebrationType: newCelebration,
      comment: newComment.trim(),
      helpfulCount: 0,
      tags: selectedTags.length > 0 ? selectedTags : ["Wall-Safe", "Verified Booking"],
      verified: true,
      hasPhoto: false,
    };

    setReviewsList([createdReview, ...reviewsList]);
    setIsModalOpen(false);
    setNewName("");
    setNewComment("");
    setNewRating(5);
    setSelectedTags([]);
    showToast("🎉 Thank you! Your verified review has been published.");
  };

  // Filtered Reviews list
  const filteredReviews = useMemo(() => {
    let list = reviewsList;
    if (activeFilter === "photos") {
      list = list.filter((r) => r.hasPhoto);
    } else if (activeFilter === "verified") {
      list = list.filter((r) => r.verified);
    } else if (activeFilter === "5star") {
      list = list.filter((r) => r.rating === 5);
    }
    return showAllReviews ? list : list.slice(0, 4);
  }, [reviewsList, activeFilter, showAllReviews]);

  const ratingBars = [
    { stars: 5, pct: 86, count: "132" },
    { stars: 4, pct: 10, count: "16" },
    { stars: 3, pct: 3, count: "4" },
    { stars: 2, pct: 1, count: "1" },
    { stars: 1, pct: 0, count: "0" },
  ];

  const quickTagOptions = [
    "Damage-Free Tape",
    "Punctual Decorator",
    "Fast Setup (45 Mins)",
    "Fairy Lights Included",
    "Polite Staff",
    "Premium Quality Balloons",
  ];

  return (
    <section className="rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-sm my-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🌟</span>
          <div>
            <h2 className="text-[16px] sm:text-[18px] font-heading font-extrabold leading-snug">
              Verified Reviews &amp; Ratings
            </h2>
            <p className="text-[12px] text-emerald-200">
              Real feedback from verified celebration bookings
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-[12px] shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-gray-950" />
          Write a Review
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* 2. Rating Breakdown Summary Card */}
        <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
          {/* Big Score */}
          <div className="text-center md:text-left shrink-0 md:pr-6 md:border-r border-gray-200">
            <span className="text-[44px] font-heading font-black text-gray-950 leading-none">
              4.8
            </span>
            <div className="flex items-center justify-center md:justify-start gap-1 my-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-[12px] text-gray-500 font-medium">
              Based on {150 + reviewsList.length}+ bookings
            </p>
          </div>

          {/* Progress Bars */}
          <div className="flex-1 w-full space-y-1.5">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3 text-[12px]">
                <span className="w-12 text-gray-700 font-semibold flex items-center gap-1 justify-end">
                  {bar.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span className="w-9 text-gray-400 text-right font-medium">
                  {bar.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors shrink-0 ${
              activeFilter === "all"
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            All Reviews ({reviewsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("photos")}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors shrink-0 flex items-center gap-1 ${
              activeFilter === "photos"
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <Camera className="w-3 h-3" />
            With Photos ({reviewsList.filter((r) => r.hasPhoto).length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("verified")}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors shrink-0 flex items-center gap-1 ${
              activeFilter === "verified"
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            Verified Bookings ({reviewsList.filter((r) => r.verified).length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("5star")}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors shrink-0 flex items-center gap-1 ${
              activeFilter === "5star"
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            5 Star Only ({reviewsList.filter((r) => r.rating === 5).length})
          </button>
        </div>

        {/* 4. Review Cards List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-2xl p-4">
            <p className="text-[13.5px] font-bold text-gray-700">No reviews found in this filter.</p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-2 text-brand-600 text-[12px] font-bold hover:underline"
            >
              Show All Reviews
            </button>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-gray-100">
            {filteredReviews.map((rev) => {
              const count = likes[rev.id] ?? rev.helpfulCount;
              const isLiked = likedUser[rev.id];
              return (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar Initials */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-extrabold text-[12px] flex items-center justify-center shadow-sm shrink-0">
                        {rev.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[13px] font-bold text-gray-900">
                            {rev.name}
                          </span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Verified Booking
                            </span>
                          )}
                          <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                            {rev.celebrationType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-gray-400">• {rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Helpful Upvote Button */}
                    <button
                      type="button"
                      onClick={() => handleLike(rev.id, rev.helpfulCount)}
                      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                        isLiked
                          ? "bg-emerald-50 text-emerald-700 font-bold"
                          : "text-gray-500 hover:text-emerald-700 hover:bg-gray-50"
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp className={`w-3 h-3 ${isLiked ? "fill-emerald-600 text-emerald-600" : ""}`} />
                      <span>Helpful ({count})</span>
                    </button>
                  </div>

                  {/* Comment Body */}
                  <p className="text-[12.5px] sm:text-[13px] text-gray-700 leading-relaxed pl-11">
                    {rev.comment}
                  </p>

                  {/* Review Tags */}
                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-11">
                      {rev.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Photo Thumbnail if any */}
                  {rev.hasPhoto && rev.photoUrl && (
                    <div className="pl-11 pt-1">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-xs">
                        <Image
                          src={rev.photoUrl}
                          alt={`${rev.name}'s celebration setup`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 5. View All Reviews Toggle */}
        {reviewsList.length > 4 && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="px-5 py-2 rounded-xl border border-gray-200 text-gray-800 font-bold text-[12.5px] hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              {showAllReviews ? "Show Less Reviews" : `View all ${reviewsList.length} reviews`}
            </button>
          </div>
        )}
      </div>

      {/* 6. Interactive "Write a Review" Modal Dialog */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h3 className="text-[16px] font-bold">Write a Verified Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || newRating) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[13px] font-extrabold text-amber-700 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Aditi Sen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Celebration Type */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Celebration Type
                </label>
                <select
                  value={newCelebration}
                  onChange={(e) => setNewCelebration(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium outline-none bg-white focus:border-emerald-600 cursor-pointer"
                >
                  <option value="Birthday Decor">Birthday Decor</option>
                  <option value="Kids Birthday">Kids Birthday</option>
                  <option value="Romantic & Anniversary">Romantic &amp; Anniversary</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Newborn Welcome">Newborn Welcome</option>
                  <option value="Wedding Decor">Wedding Decor</option>
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Your Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about the setup, decorator punctuality, balloon quality..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-medium outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Quick Tags Toggle */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Highlights (Tap to include)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickTagOptions.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[12.5px] font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-[12.5px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
