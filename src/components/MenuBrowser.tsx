"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories, products, tagLabels, type CategoryId, type Tag } from "@/data/menu";
import ProductCard from "./ProductCard";

type Sort = "popular" | "price-asc" | "price-desc";
type CategoryFilter = CategoryId | "all";

const sortLabels: Record<Sort, string> = {
  popular: "Populyar",
  "price-asc": "Əvvəlcə ucuz",
  "price-desc": "Əvvəlcə bahalı",
};

const allTags = Object.keys(tagLabels) as Tag[];

/** Lowercase and strip Azerbaijani diacritics so "qizilbaliq" finds "Qızılbalıq". */
function normalize(s: string) {
  return s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .trim();
}

const searchIndex = new Map(
  products.map((p) => [p.slug, normalize([p.name, p.description, ...p.ingredients].join(" "))]),
);

function isCategory(value: string | null): value is CategoryId {
  return categories.some((c) => c.id === value);
}

/** Reads ?kateqoriya= from the URL. Must be rendered inside <Suspense> for static export. */
export function MenuFromParams() {
  const param = useSearchParams().get("kateqoriya");
  const initial = isCategory(param) ? param : "all";
  return <MenuBrowser key={initial} initialCategory={initial} />;
}

export default function MenuBrowser({ initialCategory = "all" }: { initialCategory?: CategoryFilter }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sort, setSort] = useState<Sort>("popular");

  const q = normalize(query);
  const results = products
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => tags.every((t) => p.tags.includes(t)))
    .filter((p) => !q || q.split(/\s+/).every((word) => searchIndex.get(p.slug)!.includes(word)))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.rating - a.rating;
    });

  const hasFilters = query !== "" || category !== "all" || tags.length > 0;

  function toggleTag(tag: Tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function reset() {
    setQuery("");
    setCategory("all");
    setTags([]);
  }

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-ink/85 px-4 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Axtarış</span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rol, balıq və ya tərkib axtar…"
              className="h-12 w-full rounded-full border border-line bg-surface pl-12 pr-4 text-cream outline-none transition-colors placeholder:text-muted focus:border-brand"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Sıralama</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-surface pl-5 pr-10 text-sm outline-none transition-colors focus:border-brand sm:w-48"
            >
              {(Object.keys(sortLabels) as Sort[]).map((s) => (
                <option key={s} value={s}>
                  {sortLabels[s]}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">▼</span>
          </label>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            Hamısı <Count n={products.length} />
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.name} <Count n={products.filter((p) => p.category === c.id).length} />
            </Chip>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              aria-pressed={tags.includes(t)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                tags.includes(t) ? "border-salmon bg-salmon/15 text-salmon" : "border-line text-muted hover:border-white/20 hover:text-cream"
              }`}
            >
              {tagLabels[t]}
            </button>
          ))}
          {hasFilters && (
            <button type="button" onClick={reset} className="ml-auto animate-fade-in text-xs text-muted underline-offset-4 hover:text-cream hover:underline">
              Filterləri sıfırla
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} məhsul tapıldı
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex animate-fade-up flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
          <div className="text-5xl">🥢</div>
          <h3 className="font-display text-lg font-semibold">Heç nə tapılmadı</h3>
          <p className="max-w-sm text-sm text-muted">Başqa söz yoxlayın və ya filterləri sıfırlayın.</p>
          <button type="button" onClick={reset} className="mt-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            Sıfırla
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active ? "bg-brand text-white shadow-lg shadow-brand/25" : "bg-surface text-muted hover:bg-surface-2 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ n }: { n: number }) {
  return <span className="text-xs opacity-60">{n}</span>;
}
