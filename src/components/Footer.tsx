import Link from "next/link";
import { categories } from "@/data/menu";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted">Təzə suşi, sürətli çatdırılma. Hər gün 11:00 – 23:00.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Menyu</h4>
          <ul className="space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/menu/?kateqoriya=${c.id}`} className="hover:text-cream">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Əlaqə</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>*0000</li>
            <li>hello@nori.az</li>
            <li>Bakı, Nizami küç. 00</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Çatdırılma</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>40 ₼-dan yuxarı — pulsuz</li>
            <li>Orta vaxt — 35 dəq.</li>
            <li>Nağd və ya kartla</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} NORI Sushi · Demo layihə — şəkillər və qiymətlər nümunədir</div>
    </footer>
  );
}
