"use client";

import { FormEvent, useMemo, useState } from "react";
import { ProductSeed } from "@/lib/types";
import { money } from "@/lib/format";

export function AdminProductManager({ initialProducts }: { initialProducts: ProductSeed[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const visible = useMemo(() => products.filter((product) => `${product.name} ${product.sku} ${product.categorySlug}`.toLowerCase().includes(search.toLowerCase())), [products, search]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"), sku: form.get("sku"), categorySlug: form.get("categorySlug"), price: Number(form.get("price")) * 100,
      inventory: Number(form.get("inventory")), description: form.get("description"), imageKey: "tech"
    };
    const response = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) {
      setNotice(result.error || "Product was not created. Confirm PostgreSQL is running.");
      return;
    }
    setProducts((current) => [result.product, ...current]);
    event.currentTarget.reset();
    setNotice(`${result.product.name} added to the catalog.`);
  }

  return (
    <div className="grid gap-7 xl:grid-cols-[1fr_.55fr]">
      <section className="rounded-3xl border border-slate-200 bg-white"><div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold">Product catalog</h2><p className="mt-1 text-sm text-slate-500">{products.length} active and seeded products</p></div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SKU or product" className="field-input mt-0 w-full sm:w-56" /></div><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Price</th><th className="px-5 py-3">Inventory</th></tr></thead><tbody className="divide-y divide-slate-100">{visible.map((product) => <tr key={product.id}><td className="px-5 py-4"><p className="font-semibold text-slate-950">{product.name}</p><p className="mt-1 text-xs text-slate-500">{product.sku}</p></td><td className="px-5 py-4 capitalize text-slate-600">{product.categorySlug.replace("-", " ")}</td><td className="px-5 py-4 font-semibold">{money(product.price)}</td><td className="px-5 py-4"><span className={`status-pill ${product.inventory < 15 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{product.inventory} units</span></td></tr>)}</tbody></table></div></section>
      <form onSubmit={create} className="h-fit rounded-3xl bg-slate-950 p-6 text-white"><p className="text-sm font-semibold text-indigo-300">Catalog control</p><h2 className="mt-2 text-xl font-semibold">Add a product</h2><p className="mt-2 text-sm leading-6 text-slate-300">Creates a product record in PostgreSQL. This workflow intentionally does not include image uploads or tax configuration.</p><div className="mt-6 grid gap-4"><label className="text-sm font-medium">Product name<input required name="name" className="field-input border-white/15 bg-white text-slate-900" /></label><label className="text-sm font-medium">SKU<input required name="sku" placeholder="NTH-TEC-100" className="field-input border-white/15 bg-white text-slate-900" /></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Price (USD)<input required type="number" min="1" step="0.01" name="price" className="field-input border-white/15 bg-white text-slate-900" /></label><label className="text-sm font-medium">Inventory<input required type="number" min="0" name="inventory" defaultValue="20" className="field-input border-white/15 bg-white text-slate-900" /></label></div><label className="text-sm font-medium">Category<select name="categorySlug" defaultValue="tech" className="field-input border-white/15 bg-white text-slate-900"><option value="desk-work">Desk & Work</option><option value="travel">Travel</option><option value="home">Home</option><option value="wellness">Wellness</option><option value="tech">Tech</option></select></label><label className="text-sm font-medium">Description<textarea required rows={3} name="description" className="field-input resize-y border-white/15 bg-white text-slate-900" /></label></div>{notice && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm text-indigo-100">{notice}</p>}<button className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Create product</button></form>
    </div>
  );
}
