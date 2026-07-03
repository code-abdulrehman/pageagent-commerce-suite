import { AdminProductManager } from "@/components/AdminProductManager";
import { AgentPrompts } from "@/components/AgentPrompts";
import { getAdminSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { products } = await getAdminSnapshot();
  return <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><p className="text-sm font-semibold text-indigo-600">Catalog</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Products and inventory</h1><p className="mt-2 text-sm text-slate-500">Manage the products customers discover on the storefront.</p><div className="mt-7"><AdminProductManager initialProducts={products} /></div><div className="mt-7 max-w-3xl"><AgentPrompts mode="admin" /></div></div>;
}
