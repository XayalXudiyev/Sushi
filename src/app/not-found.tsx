import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-32 text-center">
      <div className="text-6xl">🍣</div>
      <h1 className="font-display text-3xl font-bold">404</h1>
      <p className="text-muted">Bu səhifə artıq yeyilib. Menyuya qayıdın.</p>
      <Link href="/menu/" className="rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
        Menyu
      </Link>
    </div>
  );
}
