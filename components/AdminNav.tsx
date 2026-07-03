"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  ["/admin", "Overview"],
  ["/admin/products", "Products"],
  ["/admin/orders", "Orders"],
  ["/admin/customers", "Customers"],
  ["/admin/support", "Support"]
] as const;

export function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();
  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-5 py-6 sm:px-7">
        <div className="flex items-center justify-between gap-4"><Link href="/admin" className="flex items-center gap-3 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-500">N</span><span>Northstar Ops</span></Link><Link href="/" className="text-xs font-medium text-slate-400 hover:text-white">View store ↗</Link></div>
        <nav className="mt-8 flex gap-2 overflow-x-auto lg:grid" aria-label="Administration navigation">
          {links.map(([href, label]) => <Link key={href} href={href} className={clsx("whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition", pathname === href ? "bg-white text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white")}>{label}</Link>)}
        </nav>
        <div className="mt-8 hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:block"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Signed in</p><p className="mt-2 text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-slate-400">Administrator</p><form action="/api/auth/logout" method="post"><button className="mt-4 text-xs font-semibold text-indigo-300 hover:text-indigo-200">Sign out</button></form></div>
      </div>
    </aside>
  );
}
