import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-slate-950">Northstar Goods</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">A complete ecommerce demo built with Next.js, PostgreSQL, seeded operational data, and Page Agent.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Customer care</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-500">
            <Link href="/support">Help center</Link>
            <Link href="/account">Order lookup</Link>
            <Link href="/login">Demo sign in</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Demo controls</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-500">
            <Link href="/admin">Admin workspace</Link>
            <Link href="/shop">Catalog</Link>
            <span>English-only seed content</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
