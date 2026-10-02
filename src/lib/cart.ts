"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/data/menu";

type CartState = { items: Record<string, number>; open: boolean };

const STORAGE_KEY = "sushi-cart";
const EMPTY: CartState = { items: {}, open: false };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { items: JSON.parse(raw), open: false };
  } catch {
    // ignore: storage blocked or corrupt
  }
}

function set(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

export const cart = {
  add(slug: string, qty = 1) {
    const items = { ...state.items, [slug]: (state.items[slug] ?? 0) + qty };
    set({ ...state, items });
  },
  setQty(slug: string, qty: number) {
    const items = { ...state.items };
    if (qty <= 0) delete items[slug];
    else items[slug] = qty;
    set({ ...state, items });
  },
  clear() {
    set({ ...state, items: {} });
  },
  setOpen(open: boolean) {
    set({ ...state, open });
  },
};

export function useCart() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const lines = Object.entries(snap.items)
    .map(([slug, qty]) => ({ product: getProduct(slug), qty }))
    .filter((l): l is { product: Product; qty: number } => Boolean(l.product));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  return { lines, count, total, open: snap.open };
}
