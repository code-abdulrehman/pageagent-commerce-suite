import { getAdminSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const { customers } = await getAdminSnapshot();
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <p className="text-sm font-semibold text-indigo-600">Relationships</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Customers</h1><p className="mt-2 text-sm text-slate-500">A simple customer directory for order history, service context, and future CRM integrations.</p>
      <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Orders</th><th className="px-5 py-3">Lifetime value</th><th className="px-5 py-3">Customer since</th><th className="px-5 py-3">Segment</th></tr></thead><tbody className="divide-y divide-slate-100">{customers.map((customer) => <tr key={customer.email}><td className="px-5 py-4"><p className="font-semibold text-slate-950">{customer.name}</p><p className="mt-1 text-xs text-slate-500">{customer.email}</p></td><td className="px-5 py-4 font-medium">{customer.orders}</td><td className="px-5 py-4 font-semibold">{customer.total}</td><td className="px-5 py-4 text-slate-600">{customer.since}</td><td className="px-5 py-4"><span className="status-pill bg-indigo-50 text-indigo-700">{customer.status}</span></td></tr>)}</tbody></table></div></section>
      <div className="mt-7 rounded-3xl bg-indigo-50 p-6 text-sm leading-6 text-slate-700"><p className="font-semibold text-slate-950">Production note</p><p className="mt-2">Connect customer lifecycle metrics, consent preferences, delivery addresses, and a dedicated CRM before treating this view as a production customer profile system.</p></div>
    </div>
  );
}
