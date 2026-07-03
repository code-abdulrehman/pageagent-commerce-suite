"use client";

import { useMemo, useState } from "react";
import { CategorySeed, ProductSeed } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ShopExperience({ products, categories }: { products: ProductSeed[]; categories: CategorySeed[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.description} ${product.sku}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || product.categorySlug === category;
      return matchesQuery && matchesCategory;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, products, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="max-w-2xl"><p className="text-sm font-semibold text-indigo-600">Catalog</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Products built for useful days.</h1><p className="mt-3 text-slate-500">Browse all seeded items. The filter and search controls are intentionally simple and agent-friendly.</p></div>
      <div className="mt-9 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 lg:grid-cols-[1.4fr_.8fr_.6fr]">
        <label className="sr-only" htmlFor="product-search">Search products</label>
        <input id="product-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, material, or SKU" className="field-input mt-0" />
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="field-input mt-0"><option value="all">All categories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)} className="field-input mt-0"><option value="featured">Featured</option><option value="rating">Best rated</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
      </div>
      <div className="mt-5 flex items-center justify-between"><p className="text-sm text-slate-500">{visible.length} product{visible.length === 1 ? "" : "s"}</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); setSort("featured"); }} className="text-sm font-semibold text-slate-700 hover:underline">Clear filters</button></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </div>
  );
}
