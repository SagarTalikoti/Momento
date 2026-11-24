"use client";

import React, { useState } from "react";
import { User, Phone, MessageSquare, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

const WHATSAPP_PHONE = "918151959023";

export const InquiryForm: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [lastWaUrl, setLastWaUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");
    const trimmedQuery = query.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (trimmedQuery.length < 5) {
      setError("Please describe your celebration request.");
      return;
    }

    setError("");
    setLoading(true);

    // Format WhatsApp message with all inquiry details
    const waMessage = [
      `*New Custom Celebration Inquiry - Momento*`,
      ``,
      `*Name:* ${trimmedName}`,
      `*Contact Number:* ${phone.trim()}`,
      `*Query / Requirements:*`,
      `${trimmedQuery}`,
      ``,
      `_Sent via Momento Online Inquiry Form_`,
    ].join("\n");

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;
    setLastWaUrl(waUrl);

    showToast("Opening WhatsApp with your inquiry...");

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section className="my-10 sm:my-14 max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
      <div className="text-center mb-6">
        <h2 className="text-[20px] sm:text-[24px] font-extrabold text-slate-900 tracking-tight">
          Send Us Inquiry
        </h2>
        <p className="text-[13.5px] text-slate-500 mt-1">
          Have a custom celebration request? We are here to help!
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-[17px] font-extrabold text-gray-900">Inquiry Sent to WhatsApp!</h3>
            <p className="text-[13px] text-gray-600 max-w-xs mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Your inquiry has been forwarded to our decoration coordinator on WhatsApp.
            </p>
          </div>

          {lastWaUrl && (
            <div className="pt-2">
              <a
                href={lastWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName("");
                setPhone("");
                setQuery("");
                setLastWaUrl("");
              }}
              className="text-[12px] font-bold text-brand-600 hover:underline pt-2 cursor-pointer"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 font-medium">
              {error}
            </p>
          )}

          {/* Name input */}
          <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-200 rounded-xl px-3.5 py-3 focus-within:bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            <User className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              required
              className="w-full text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none bg-transparent font-medium"
            />
          </div>

          {/* Phone input */}
          <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-200 rounded-xl px-3.5 py-3 focus-within:bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="tel"
              inputMode="tel"
              placeholder="Phone number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
              required
              className="w-full text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none bg-transparent font-medium"
            />
          </div>

          {/* Query textarea */}
          <div className="flex items-start gap-2.5 bg-gray-50/80 border border-gray-200 rounded-xl px-3.5 py-3 focus-within:bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <textarea
              placeholder="Your query * (e.g. 1st Birthday decor, balloon color customization, surprise setup)"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={2000}
              required
              className="w-full text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none bg-transparent resize-none leading-relaxed font-medium"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[14px] font-bold shadow-md shadow-brand-500/25 disabled:opacity-70 active:scale-[0.99] transition-all cursor-pointer"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            We typically reply within a few hours · Your details are kept private.
          </p>
        </form>
      )}
    </section>
  );
};
