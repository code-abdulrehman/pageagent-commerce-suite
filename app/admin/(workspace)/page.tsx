import Link from "next/link";
import { adminMetrics } from "@/lib/mock-data";
import { money, dateTime } from "@/lib/format";
import { getAdminSnapshot } from "@/lib/store";
import { AgentPrompts } from "@/components/AgentPrompts";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const snapshot = await getAdminSnapshot();
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <p className="text-sm font-semibold text-indigo-600">Operations dashboard</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Good morning, team.</h1><p className="mt-2 text-sm text-slate-500">A single place to understand sales, fulfillment, customer relationships, and support pressure.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{adminMetrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{metric.label}</p><p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{metric.value}</p><p className="mt-2 text-sm font-medium text-emerald-600">{metric.change}</p></div>)}</div>
      <div className="mt-7 grid gap-7 xl:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Recent orders</h2><p className="mt-1 text-sm text-slate-500">Live data when PostgreSQL is connected.</p></div><Link href="/admin/orders" className="text-sm font-semibold text-indigo-600 hover:underline">All orders →</Link></div><div className="mt-5 divide-y divide-slate-100">{snapshot.orders.slice(0, 5).map((order) => <div key={order.id} className="flex items-center justify-between gap-4 py-4"><div><p className="font-semibold text-slate-950">{order.number}</p><p className="mt-1 text-sm text-slate-500">{order.customer} · {dateTime(order.createdAt)}</p></div><div className="text-right"><p className="font-semibold">{money(order.total)}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">{order.status.replace("_", " ")}</p></div></div>)}</div></section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Needs attention</h2><Link href="/admin/support" className="text-sm font-semibold text-indigo-600 hover:underline">Support →</Link></div><div className="mt-5 grid gap-3">{snapshot.tickets.filter((ticket) => ticket.status !== "RESOLVED").slice(0, 4).map((ticket) => <div key={ticket.id} className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between gap-3"><p className="text-sm font-semibold text-slate-950">{ticket.number}</p><span className="text-xs font-semibold uppercase tracking-wider text-rose-600">{ticket.priority}</span></div><p className="mt-2 text-sm text-slate-600">{ticket.subject}</p></div>)}</div></section>
      </div>
      <div className="mt-7 max-w-3xl"><AgentPrompts mode="admin" /></div>
    </div>
  );
}
