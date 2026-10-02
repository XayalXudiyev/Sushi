import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ArtTile from "@/components/ArtTile";
import ProductCard from "@/components/ProductCard";
import TagBadge from "@/components/TagBadge";
import { categories, formatPrice, getProduct, products } from "@/data/menu";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const unit = product.category === "drinks" ? "ml" : "q";

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <nav className="flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/menu/" className="hover:text-cream">
          Menyu
        </Link>
        <span>/</span>
        <Link href={`/menu/?kateqoriya=${category.id}`} className="hover:text-cream">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-cream">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="animate-fade-up">
          <ArtTile art={product.art} className="aspect-square rounded-[2rem] border border-line" artClassName="animate-float p-10" />
        </div>

        <div className="flex animate-fade-up flex-col gap-5 [animation-delay:100ms]">
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
          )}
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-sm text-gold">
              ★ {product.rating.toFixed(1)} <span className="text-muted">· 120+ rəy</span>
            </p>
          </div>
          <p className="text-lg text-muted">{product.description}</p>

          <dl className="grid grid-cols-3 gap-3">
            <Stat label="Çəki" value={`${product.weight} ${unit}`} />
            <Stat label="Ədəd" value={product.pieces ? `${product.pieces}` : "—"} />
            <Stat label="Kateqoriya" value={category.name} />
          </dl>

          <div>
            <h2 className="mb-2 text-sm font-semibold">Tərkibi</h2>
            <ul className="flex flex-wrap gap-2">
              {product.ingredients.map((i) => (
                <li key={i} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-muted line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
            <AddToCart slug={product.slug} size="lg" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-20">
          <h2 className="font-display text-2xl font-bold">Bunu da bəyənə bilərsiniz</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-semibold">{value}</dd>
    </div>
  );
}
