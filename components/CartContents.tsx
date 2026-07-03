"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { artwork } from "@/lib/image";
import { money } from "@/lib/format";

export function CartContents() {
  const { lines, subtotal, update, remove } = useCart();
  const shipping = subtotal >= 7500 ? 0 : 950;
  const tax = Math.round(subtotal * 0.0825);

  if (!lines.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-slate-950">Your cart is empty.</p>
        <p className="mt-2 text-sm text-slate-500">Browse the catalog to add your first item.</p>
        <Link href="/shop" className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr]">
      <div className="rounded-3xl border border-slate-200 bg-white">
        {lines.map((line, index) => (
          <div key={line.product.id} className={`flex gap-4 p-5 ${index ? "border-t border-slate-100" : ""}`}>
            <img src={artwork(line.product.images[0] || "tech", line.product.name)} alt="" className="h-24 w-28 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <Link href={`/product/${line.product.slug}`} className="font-semibold text-slate-950 hover:underline">{line.product.name}</Link>
              <p className="mt-1 text-sm text-slate-500">{line.product.sku}</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">{money(line.product.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <label className="sr-only" htmlFor={`quantity-${line.product.id}`}>Quantity</label>
                <select
                  id={`quantity-${line.product.id}`}
                  value={line.quantity}
                  onChange={(event) => update(line.product.id, Number(event.target.value))}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm"
                >
                  {Array.from({ length: Math.min(line.product.inventory, 10) }, (_, i) => i + 1).map((qty) => <option key={qty}>{qty}</option>)}
                </select>
                <button type="button" onClick={() => remove(line.product.id)} className="text-sm font-medium text-rose-600 hover:underline">Remove</button>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-950">{money(line.product.price * line.quantity)}</p>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-6 grid gap-3 text-sm text-slate-300">
          <p className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></p>
          <p className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></p>
          <p className="flex justify-between"><span>Estimated tax</span><span>{money(tax)}</span></p>
          <div className="mt-2 flex justify-between border-t border-white/15 pt-4 text-base font-semibold text-white"><span>Total</span><span>{money(subtotal + shipping + tax)}</span></div>
        </div>
        <Link href="/checkout" className="mt-6 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950">Secure checkout</Link>
        <p className="mt-4 text-xs leading-5 text-slate-400">Demo checkout: no card data is collected or processed.</p>
      </aside>
    </div>
  );
}
