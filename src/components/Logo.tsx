import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="NORI Sushi — ana səhifə">
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-lg font-bold text-white transition-transform duration-300 group-hover:-rotate-6">
        寿
      </span>
      <span className="font-display text-lg font-bold tracking-wide">
        NORI<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
