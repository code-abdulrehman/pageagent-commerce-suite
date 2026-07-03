"use client";

import { useMemo, useState } from "react";
import { money, dateTime } from "@/lib/format";

type OrderRow = {
  id: string; number: string; customer: string; email: string; total: number; status: string; paymentStatus: string; createdAt: string; items: number; destination: string;
};

const statuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export function AdminOrderBoard({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const visible = useMemo(() => orders.filter((order) => {
    const q = `${order.number} ${order.customer} ${order.email}`.toLowerCase();
    return (filter === "ALL" || order.status === filter) && q.includes(query.toLowerCase());
  }), [filter, orders, query]);

  async function changeStatus(order: OrderRow, status: string) {
    const confirmed = window.confirm(`Change ${order.number} to ${status.replace("_", " ")}? This action is recorded in the demo database.`);
    if (!confirmed) return;
    const response = await fetch(`/api/admin/orders/${order.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) {
      setNotice("The update was not saved. Confirm PostgreSQL is running, then try again.");
      return;
    }
    setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status } : item));
    setNotice(`${order.number} is now ${status.replace("_", " ").toLowerCase()}.`);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div><h2 className="text-lg font-semibold">Order management</h2><p className="mt-1 text-sm text-slate-500">Search, inspect, and move orders through fulfillment.</p></div>
        <div className="flex flex-wrap gap-2"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Order, customer, email" className="field-input mt-0 w-52" /><select value={filter} onChange={(e) => setFilter(e.target.value)} className="field-input mt-0 w-40"><option value="ALL">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
      </div>
      {notice && <p className="mx-5 mt-5 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-800">{notice}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3 font-semibold">Order</th><th className="px-5 py-3 font-semibold">Customer</th><th className="px-5 py-3 font-semibold">Placed</th><th className="px-5 py-3 font-semibold">Total</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Action</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{visible.map((order) => <tr key={order.id}><td className="px-5 py-4"><p className="font-semibold text-slate-950">{order.number}</p><p className="mt-1 text-xs text-slate-500">{order.items} item{order.items === 1 ? "" : "s"} · {order.destination}</p></td><td className="px-5 py-4"><p className="font-medium text-slate-800">{order.customer}</p><p className="mt-1 text-xs text-slate-500">{order.email}</p></td><td className="px-5 py-4 text-slate-600">{dateTime(order.createdAt)}</td><td className="px-5 py-4 font-semibold text-slate-900">{money(order.total)}</td><td className="px-5 py-4"><span className="status-pill bg-indigo-50 text-indigo-700">{order.status.replace("_", " ")}</span></td><td className="px-5 py-4"><select aria-label={`Update status for ${order.number}`} value={order.status} onChange={(e) => changeStatus(order, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
