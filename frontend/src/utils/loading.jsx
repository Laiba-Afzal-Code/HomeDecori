// Modern Reusable Loading Components (Clean + Scalable)
// Optimized for HomeDecorim UI System

import React from "react";
import "./loading.css";

/* =========================
   1️⃣ Button Loader (Minimal + Smooth)
========================= */
export const ButtonLoader = ({ size = 18 }) => (
  <span
    className="loader-spinner"
    style={{ width: size, height: size }}
  />
);

/* =========================
   2️⃣ Full Page Loader (Premium Feel)
========================= */
export const PageLoader = ({ text = "Loading" }) => (
  <div className="page-loader">
    <div className="loader-ring"></div>

    <p className="loader-text">
      {text}
      <span className="loader-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  </div>
);

/* =========================
   3️⃣ Skeleton Loader (Blog / Cards)
========================= */
export const SkeletonPost = () => (
  <div className="skeleton-wrapper">
    <div className="skeleton title" />
    <div className="skeleton line" />
    <div className="skeleton line short" />
    <div className="skeleton line tiny" />
  </div>
);

/* =========================
   4️⃣ Inline Loader (Elegant)
========================= */
export const InlineLoader = ({ text = "Loading" }) => (
  <div className="inline-loader">
    <span className="loader-spinner small" />
    <span>{text}...</span>
  </div>
);