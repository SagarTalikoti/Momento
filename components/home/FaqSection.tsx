"use client";

import React, { useState } from "react";
import extraData from "@/lib/extra_data.json";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-label="Frequently Asked Questions" className="my-10 sm:my-14">
      {/* Header */}
      <div className="flex flex-col gap-1.5 mb-6 sm:mb-8 items-center text-center">
        <h2 className="text-[18px] sm:text-[25px] font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
          Frequently Asked Questions
        </h2>
        <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
        <p className="text-[12.5px] sm:text-[13px] text-gray-500 max-w-xl leading-relaxed">
          Everything you need to know about booking balloon decoration with Momento
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
        {extraData.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-brand-50/40 border-brand-200 shadow-sm"
                  : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-[14px] sm:text-[14.5px] font-bold text-gray-900 gap-3 cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-[13px] sm:text-[13.5px] text-gray-600 leading-relaxed border-t border-brand-100/50 animate-in fade-in duration-200"
                >
                  <p className="pt-2">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
