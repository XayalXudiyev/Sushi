"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/menu";
import { cart, useCart } from "@/lib/cart";
import ArtTile from "./ArtTile";

const FREE_DELIVERY = 40;
const DELIVERY_FEE = 3;

export default function CartDrawer() {
  const { lines, total, open } = useCart();
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const delivery = total === 0 || total >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  const progress = Math.min(100, (total / FREE_DELIVERY) * 100);

  function close() {
    cart.setOpen(false);
    setOrdered(false);
  }

  function checkout() {
    cart.clear();
    setOrdered(true);
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Səbət">
      <div className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in flex-col border-l border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Səbət</h2>
          <button type="button" onClick={close} className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-cream" aria-label="Bağla">
            ✕
          </button>
        </div>

        {ordered ? (
          <div className="flex flex-1 animate-fade-up flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400">✓</div>
            <h3 className="font-display text-xl font-semibold">Sifariş qəbul edildi!</h3>
            <p className="text-sm text-muted">Bu demo versiyadır — real sifariş göndərilmədi. Kuryer təxminən 35 dəqiqəyə çatardı 🙂</p>
            <button type="button" onClick={close} className="mt-2 rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
              Davam et
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="text-5xl">🍣</div>
            <h3 className="font-display text-lg font-semibold">Səbət boşdur</h3>
            <p className="text-sm text-muted">Menyudan bir neçə dadlı şey seçin.</p>
            <Link href="/menu/" onClick={close} className="mt-2 rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
              Menyuya keç
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-3">
              <p className="text-xs text-muted">
                {delivery === 0 ? "🎉 Pulsuz çatdırılma aktivdir" : `Pulsuz çatdırılmaya ${formatPrice(FREE_DELIVERY - total)} qaldı`}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-gradient-to-r from-brand to-salmon transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex animate-fade-up items-center gap-3 py-4">
                  <ArtTile art={product.art} className="size-16 shrink-0 rounded-2xl" artClassName="p-1.5" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-sm text-muted">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-line">
                    <button type="button" onClick={() => cart.setQty(product.slug, qty - 1)} className="grid size-8 place-items-center text-muted hover:text-cream" aria-label="Azalt">
                      −
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                    <button type="button" onClick={() => cart.setQty(product.slug, qty + 1)} className="grid size-8 place-items-center text-muted hover:text-cream" aria-label="Artır">
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-line p-5">
              <Row label="Məhsullar" value={formatPrice(total)} />
              <Row label="Çatdırılma" value={delivery === 0 ? "Pulsuz" : formatPrice(delivery)} />
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Cəmi</span>
                <span>{formatPrice(total + delivery)}</span>
              </div>
              <button type="button" onClick={checkout} className="mt-3 w-full rounded-full bg-brand py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark active:scale-[0.99]">
                Sifarişi rəsmiləşdir
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm text-muted">
      <span>{label}</span>
      <span className="text-cream">{value}</span>
    </div>
  );
}
