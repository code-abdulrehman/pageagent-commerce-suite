import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getProduct } from "@/lib/store";
import { artwork } from "@/lib/image";
import { money } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const catalog = await getCatalog();
  const related = catalog.filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Link href="/shop" className="text-sm font-semibold text-slate-600 hover:underline">← Back to catalog</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4"><img src={artwork(product.images[0] || "tech", product.name)} alt={product.name} className="aspect-square w-full rounded-[1.5rem] object-cover" /></div>
        <div className="py-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">{product.categorySlug.replace("-", " ")}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-slate-950">{money(product.price)} {product.compareAt && <span className="ml-2 text-base font-medium text-slate-400 line-through">{money(product.compareAt)}</span>}</p>
          <p className="mt-4 text-sm text-amber-600">★ {product.rating.toFixed(1)} <span className="text-slate-400">from {product.reviewCount} verified demo reviews</span></p>
          <p className="mt-6 max-w-xl leading-7 text-slate-600">{product.description}</p>
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-sm font-semibold text-slate-950">Details</p><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{Object.entries(product.attributes).map(([key, value]) => <div key={key}><dt className="text-slate-400">{key}</dt><dd className="mt-1 font-medium text-slate-700">{value}</dd></div>)}</dl></div>
          <div className="mt-7 flex flex-wrap items-center gap-4"><AddToCartButton product={product} className="px-6 py-3" /><span className="text-sm text-slate-500">{product.inventory > 10 ? `${product.inventory} in stock` : `Only ${product.inventory} left`}</span></div>
          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-3"><span>✓ Free shipping over $75</span><span>✓ 30-day returns</span><span>✓ Support when you need it</span></div>
        </div>
      </div>
      {related.length > 0 && <section className="mt-20"><h2 className="text-2xl font-semibold tracking-tight text-slate-950">More from this collection</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  );
}
