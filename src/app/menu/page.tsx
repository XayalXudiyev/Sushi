import type { Metadata } from "next";
import { Suspense } from "react";
import MenuBrowser, { MenuFromParams } from "@/components/MenuBrowser";

export const metadata: Metadata = { title: "Menyu" };

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <p className="text-sm font-medium tracking-[0.3em] text-brand">メニュー</p>
      <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Menyu</h1>
      <p className="mt-2 max-w-lg text-muted">Rollar, nigiri, saşimi, setlər və içkilər — hamısı bir yerdə.</p>
      <div className="mt-6">
        {/* Fallback is the full menu, so the static HTML is complete before the query string is read. */}
        <Suspense fallback={<MenuBrowser />}>
          <MenuFromParams />
        </Suspense>
      </div>
    </div>
  );
}
