import Link from "next/link";
import { formatPrice, type Product } from "@/data/menu";
import AddToCart from "./AddToCart";
import ArtTile from "./ArtTile";
import TagBadge from "./TagBadge";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const href = `/menu/${product.slug}/`;
  return (
    <article
      className="group flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-brand/10"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <Link href={href} className="relative block aspect-[4/3]" tabIndex={-1} aria-hidden="true">
        <ArtTile
          art={product.art}
          className="h-full w-full"
          artClassName="p-5 transition-transform duration-500 ease-out group-hover:scale-[1.07] group-hover:-rotate-2"
        />
        {product.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug">
            <Link href={href} className="transition-colors hover:text-salmon">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-xs text-gold">★ {product.rating.toFixed(1)}</span>
        </div>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="text-xs text-muted">
              {product.weight} {product.category === "drinks" ? "ml" : "q"}
              {product.pieces ? ` · ${product.pieces} əd.` : ""}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-sm text-muted line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
          </div>
          <AddToCart slug={product.slug} />
        </div>
      </div>
    </article>
  );
}
