"use client";

import { useState } from "react";
import { cart } from "@/lib/cart";

export default function AddToCart({ slug, size = "sm" }: { slug: string; size?: "sm" | "lg" }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  function add() {
    cart.add(slug, size === "lg" ? qty : 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  if (size === "sm") {
    return (
      <button
        type="button"
        onClick={add}
        aria-label="Səbətə at"
        className={`grid size-10 shrink-0 place-items-center rounded-full text-white transition-all duration-300 active:scale-90 ${
          added ? "bg-emerald-500" : "bg-brand hover:bg-brand-dark"
        }`}
      >
        {added ? <Check /> : <Plus />}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-line bg-surface">
        <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center text-lg text-muted hover:text-cream" aria-label="Azalt">
          −
        </button>
        <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
        <button type="button" onClick={() => setQty((q) => q + 1)} className="grid size-11 place-items-center text-lg text-muted hover:text-cream" aria-label="Artır">
          +
        </button>
      </div>
      <button
        type="button"
        onClick={add}
        className={`flex h-11 items-center gap-2 rounded-full px-6 font-semibold text-white transition-all duration-300 active:scale-95 ${
          added ? "bg-emerald-500" : "bg-brand hover:bg-brand-dark"
        }`}
      >
        {added ? <Check /> : <Plus />}
        {added ? "Əlavə olundu" : "Səbətə at"}
      </button>
    </div>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}
