import Link from "next/link";
import { ProductSeed } from "@/lib/types";
import { artwork } from "@/lib/image";
import { money } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: ProductSeed }) {
  const imageKey = product.images[0] || "tech";
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden rounded-2xl bg-slate-100">
        <img src={artwork(imageKey, product.name)} alt="" className="aspect-[1.15/1] w-full object-cover transition duration-300 group-hover:scale-105" />
      </Link>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{product.categorySlug.replace("-", " ")}</p>
            <Link href={`/product/${product.slug}`} className="mt-1 block font-semibold text-slate-950 hover:underline">{product.name}</Link>
          </div>
          <span className="shrink-0 text-sm font-semibold text-slate-950">{money(product.price)}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm text-amber-600">★ {product.rating.toFixed(1)} <span className="text-slate-400">({product.reviewCount})</span></span>
          <AddToCartButton product={product} className="px-3 py-2 text-xs" />
        </div>
      </div>
    </article>
  );
}
