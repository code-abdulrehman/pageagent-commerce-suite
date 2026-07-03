"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { money } from "@/lib/format";

export function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const [state, setState] = useState<"ready" | "submitting" | "done" | "error">("ready");
  const [orderNumber, setOrderNumber] = useState("");

  const totals = useMemo(() => {
    const shipping = subtotal >= 7500 ? 0 : 950;
    const tax = Math.round(subtotal * 0.0825);
    return { shipping, tax, total: subtotal + shipping + tax };
  }, [subtotal]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lines.length) return;
    const form = new FormData(event.currentTarget);
    setState("submitting");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.get("name"),
            email: form.get("email"),
            line1: form.get("line1"),
            line2: form.get("line2"),
            city: form.get("city"),
            state: form.get("state"),
            zip: form.get("zip"),
            country: form.get("country")
          },
          lines
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Checkout failed");
      setOrderNumber(result.orderNumber);
      clear();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-2xl text-white">✓</div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-950">Order confirmed</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Your demonstration order <strong>{orderNumber}</strong> was created. A real payment provider is intentionally not connected to this starter.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop" className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">Continue shopping</Link>
          <Link href="/support" className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900">Get support</Link>
        </div>
      </div>
    );
  }

  if (!lines.length) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-semibold">Your cart is empty.</p><Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:underline">Return to shop</Link></div>;
  }

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.45fr_.75fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Secure checkout</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">Shipping details</h1>
          <p className="mt-2 text-sm text-slate-500">This is a no-payment demo checkout. Only fictional order data is stored.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="field-label sm:col-span-2">Full name<input required name="name" defaultValue="Taylor Morgan" className="field-input" /></label>
          <label className="field-label sm:col-span-2">Email address<input required type="email" name="email" defaultValue="taylor@example.com" className="field-input" /></label>
          <label className="field-label sm:col-span-2">Address<input required name="line1" defaultValue="800 Pine Street" className="field-input" /></label>
          <label className="field-label sm:col-span-2">Apartment, suite, etc. (optional)<input name="line2" className="field-input" /></label>
          <label className="field-label">City<input required name="city" defaultValue="Seattle" className="field-input" /></label>
          <label className="field-label">State or region<input required name="state" defaultValue="WA" className="field-input" /></label>
          <label className="field-label">Postal code<input required name="zip" defaultValue="98101" className="field-input" /></label>
          <label className="field-label">Country<select name="country" defaultValue="United States" className="field-input"><option>United States</option><option>Canada</option><option>United Kingdom</option></select></label>
        </div>
        {state === "error" && <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">Something went wrong. Check that the app and database are running, then try again.</p>}
        <button disabled={state === "submitting"} className="mt-8 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-400">
          {state === "submitting" ? "Creating order…" : `Place demo order · ${money(totals.total)}`}
        </button>
      </div>
      <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white">
        <h2 className="text-lg font-semibold">Review</h2>
        <div className="mt-5 grid gap-4">
          {lines.map((line) => <div key={line.product.id} className="flex justify-between gap-4 text-sm"><span className="text-slate-300">{line.quantity} × {line.product.name}</span><span>{money(line.product.price * line.quantity)}</span></div>)}
        </div>
        <div className="mt-5 grid gap-3 border-t border-white/15 pt-5 text-sm text-slate-300">
          <p className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></p>
          <p className="flex justify-between"><span>Shipping</span><span>{totals.shipping ? money(totals.shipping) : "Free"}</span></p>
          <p className="flex justify-between"><span>Tax</span><span>{money(totals.tax)}</span></p>
          <p className="flex justify-between pt-2 text-base font-semibold text-white"><span>Total</span><span>{money(totals.total)}</span></p>
        </div>
      </aside>
    </form>
  );
}
