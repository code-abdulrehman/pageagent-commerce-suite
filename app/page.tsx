import Link from "next/link";
import { AgentPrompts } from "@/components/AgentPrompts";
import { ProductCard } from "@/components/ProductCard";
import { artwork } from "@/lib/image";
import { categories, getCatalog } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const catalog = await getCatalog();
  const featured = catalog.filter((product) => product.featured).slice(0, 5);

  return (
    <div>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">Everyday systems, made simpler</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Useful goods for the way life actually moves.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">Northstar is a working ecommerce demo: browse a multi-category catalog, place fictional orders, open support cases, and operate the back office.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Explore the catalog</Link>
              <Link href="/admin" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Open admin workspace</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
              <span>✓ PostgreSQL-ready</span><span>✓ Seeded catalog</span><span>✓ Customer service desk</span>
            </div>
          </div>
          <div className="relative min-h-[360px]">
            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-indigo-400/20" />
            <img src={artwork("desk", "Northstar collection")} alt="Abstract product collection artwork" className="relative h-full w-full rounded-[2rem] object-cover shadow-2xl" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 text-slate-950 shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Built-in workflow assistant</p>
              <p className="mt-1 font-semibold">Page Agent can operate the visible UI.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Shop by routine</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Designed around real life, not departments.</h2>
          </div>
          <p className="text-sm leading-6 text-slate-500">The seeded catalog spans work, travel, home, wellness, and technology—enough data to demonstrate search, filters, inventory, merchandising, and order operations.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link href={`/shop?category=${category.slug}`} key={category.slug} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lift">
              <img src={artwork(category.image, category.name)} alt="" className="aspect-square w-full rounded-2xl object-cover transition group-hover:scale-[1.02]" />
              <div className="px-2 pb-2 pt-4">
                <p className="font-semibold text-slate-950">{category.name}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <AgentPrompts />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <div><p className="text-sm font-semibold text-indigo-600">Popular right now</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">The Northstar edit</h2></div>
          <Link href="/shop" className="text-sm font-semibold text-slate-700 hover:underline">View all products →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-indigo-600 p-8 text-white md:grid-cols-[1.2fr_.8fr] md:p-12">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-200">Operations included</p><h2 className="mt-3 text-3xl font-semibold">A storefront is only half the system.</h2><p className="mt-4 max-w-xl leading-7 text-indigo-100">This starter includes orders, customer records, support tickets, product management views, demo authentication, seed scripts, and human approval points for sensitive operational actions.</p></div>
          <div className="grid content-center gap-3"><Link href="/admin/orders" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Manage orders</Link><Link href="/admin/support" className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white">Open support desk</Link></div>
        </div>
      </section>
    </div>
  );
}
