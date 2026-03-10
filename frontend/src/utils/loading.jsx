// Redesigned Reusable Loading Components (Modern, Consistent UI)
// Works for full app, auth pages, blog pages

import React from "react";

/* =========================
   1️⃣ Button Loader
========================= */
export const ButtonLoader = ({ size = 18 }) => (
  <span
    className="inline-block rounded-full animate-spin"
    style={{
      width: size,
      height: size,
      border: "2px solid rgba(255,255,255,0.4)",
      borderTopColor: "#fff",
    }}
  />
);

/* =========================
   2️⃣ Full Page Loader (3 Dots Blink)
========================= */
export const PageLoader = ({ text = "Loading" }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="dots-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p className="mt-4 text-sm text-gray-500 tracking-wide">{text}</p>

    <style>{`
      .dots-loader {
        display: flex;
        gap: 10px;
      }

      .dots-loader span {
        width: 14px;
        height: 14px;
        background: #2563eb;
        border-radius: 50%;
        animation: dots 1.4s infinite ease-in-out both;
      }

      .dots-loader span:nth-child(1) { animation-delay: -0.32s; }
      .dots-loader span:nth-child(2) { animation-delay: -0.16s; }

      @keyframes dots {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
    `}</style>
  </div>
);

/* =========================
   3️⃣ Skeleton Loader (Blog / Cards)
========================= */
export const SkeletonPost = () => (
  <div className="space-y-4">
    <div className="h-6 w-3/4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
    <div className="h-4 w-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
    <div className="h-4 w-5/6 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
    <div className="h-4 w-2/3 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
  </div>
);

/* =========================
   4️⃣ Inline Loader
========================= */
export const InlineLoader = ({ text = "Loading" }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span
      className="inline-block w-4 h-4 rounded-full animate-spin"
      style={{
        border: "2px solid rgba(0,0,0,0.3)",
        borderTopColor: "#2563eb",
      }}
    />
    {text}...
  </div>
);
