"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl text-[13px] font-semibold border border-gray-700 max-w-sm">
        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
