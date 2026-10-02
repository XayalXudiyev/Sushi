"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cart, useCart } from "@/lib/cart";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Ana səhifə" },
  { href: "/menu/", label: "Menyu" },
  { href: "/#aksiyalar", label: "Aksiyalar" },
  { href: "/#catdirilma", label: "Çatdırılma" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "bg-surface-2 text-cream" : "text-muted hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+994000000000" className="hidden text-sm text-muted transition-colors hover:text-cream lg:block">
            *0000
          </a>
          <Link href="/menu/" className="rounded-full px-3 py-2 text-sm text-muted hover:text-cream md:hidden">
            Menyu
          </Link>
          <button
            type="button"
            onClick={() => cart.setOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <CartIcon />
            <span className="hidden sm:inline">Səbət</span>
            {count > 0 && (
              <span
                key={count}
                className="grid min-w-5 animate-pop place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-brand"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
