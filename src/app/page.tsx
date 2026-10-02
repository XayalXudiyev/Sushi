import Link from "next/link";
import ArtTile from "@/components/ArtTile";
import ProductCard from "@/components/ProductCard";
import SushiArt from "@/components/SushiArt";
import { categories, getProduct, products } from "@/data/menu";

const hits = products.filter((p) => p.tags.includes("hit") && p.category !== "sets").slice(0, 4);
const promoSet = getProduct("set-tokio")!;

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <SectionTitle kicker="カテゴリー" title="Kateqoriyalar" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/menu/?kateqoriya=${c.id}`}
              className="group animate-fade-up overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ArtTile art={c.art} className="aspect-square" artClassName="p-4 transition-transform duration-500 group-hover:scale-110" />
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold">{c.name}</span>
                <span className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle kicker="人気" title="Ən çox sifariş edilənlər" />
          <Link href="/menu/" className="hidden shrink-0 text-sm font-semibold text-salmon hover:underline sm:block">
            Bütün menyu →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hits.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section id="aksiyalar" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-20">
        <div className="relative grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand-dark to-[#7a1410] md:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center gap-4 p-8 sm:p-12">
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">Həftənin təklifi</span>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {promoSet.name} <br />
              <span className="text-gold">−13% endirim</span>
            </h2>
            <p className="max-w-sm text-white/80">{promoSet.pieces} ədəd, böyük şirkət üçün. Rollar, nigiri və qunkan bir qutuda.</p>
            <div className="flex items-center gap-4">
              <Link href={`/menu/${promoSet.slug}/`} className="rounded-full bg-white px-6 py-3 font-semibold text-brand transition-transform hover:scale-105">
                Sifariş et
              </Link>
              <span className="text-white/60 line-through">{promoSet.oldPrice?.toFixed(2)} ₼</span>
              <span className="text-2xl font-bold">{promoSet.price.toFixed(2)} ₼</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center p-6">
            <div className="absolute size-80 rounded-full bg-white/10 blur-2xl" />
            <SushiArt art={promoSet.art} className="relative w-full max-w-sm animate-float" />
          </div>
        </div>
      </section>

      <section id="catdirilma" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-20">
        <SectionTitle kicker="配達" title="Necə işləyir?" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { icon: "📱", title: "Seç", text: "Menyudan istədiyini səbətə at. Filter və axtarış kömək edəcək." },
            { icon: "🔪", title: "Hazırlayırıq", text: "Aşpazlarımız sifarişi elə həmin an təzə məhsullardan hazırlayır." },
            { icon: "🛵", title: "Çatdırırıq", text: "Orta hesabla 35 dəqiqəyə qapında. 40 ₼-dan yuxarı pulsuz." },
          ].map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-display text-4xl font-bold text-white/5">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Hero() {
  const heroRoll = getProduct("drakon")!;
  const heroNigiri = getProduct("nigiri-qizilbaliq")!;
  const heroGunkan = getProduct("qunkan-tobiko")!;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-salmon/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            İndi açıqdır · 11:00 – 23:00
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Təzə suşi <br />
            qapına <span className="text-brand">35 dəqiqəyə</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">Hər gün təzə balıq, əl ilə hazırlanan rollar və sürətli çatdırılma. Sadəcə seç — qalanı bizdən.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu/" className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark">
              Menyuya bax
            </Link>
            <Link href="/menu/?kateqoriya=sets" className="rounded-full border border-line px-7 py-3.5 font-semibold transition-colors hover:bg-surface">
              Setlər
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              ["4.9★", "Reytinq"],
              ["35 dəq", "Çatdırılma"],
              ["25+", "Məhsul"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-bold">{v}</dd>
                <dd className="text-xs text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md animate-fade-up [animation-delay:150ms]">
          <div className="absolute inset-6 rounded-full border border-line bg-surface shadow-2xl shadow-black/50" />
          <div className="absolute inset-12 rounded-full border border-dashed border-white/10" />
          <SushiArt art={heroRoll.art} className="absolute inset-10 animate-float" />
          <div className="absolute -left-2 top-6 w-32 animate-float rounded-3xl border border-line bg-surface/90 p-2 shadow-xl backdrop-blur [animation-delay:-2s] sm:w-36">
            <ArtTile art={heroNigiri.art} className="aspect-square rounded-2xl" artClassName="p-2" />
            <p className="px-1 pt-1.5 text-xs font-semibold">{heroNigiri.name}</p>
          </div>
          <div className="absolute -right-2 bottom-4 w-32 animate-float rounded-3xl border border-line bg-surface/90 p-2 shadow-xl backdrop-blur [animation-delay:-4s] sm:w-36">
            <ArtTile art={heroGunkan.art} className="aspect-square rounded-2xl" artClassName="p-2" />
            <p className="px-1 pt-1.5 text-xs font-semibold">{heroGunkan.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-medium tracking-[0.3em] text-brand">{kicker}</p>
      <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
    </div>
  );
}
