"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import clsx from "clsx";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Customer service" },
  { href: "/account", label: "Account" }
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm text-white">N</span>
          <span>Northstar Goods</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={clsx(
              "text-sm font-medium transition",
              pathname === link.href || (link.href === "/shop" && pathname.startsWith("/product"))
                ? "text-slate-950"
                : "text-slate-500 hover:text-slate-950"
            )}>{link.label}</Link>
          ))}
          <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-950">Admin</Link>
        </nav>
        <Link href="/cart" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Cart <span className="ml-1 rounded-full bg-white/15 px-1.5 py-0.5 text-xs">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}
