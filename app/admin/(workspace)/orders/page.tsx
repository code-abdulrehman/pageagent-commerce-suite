import { AdminOrderBoard } from "@/components/AdminOrderBoard";
import { AgentPrompts } from "@/components/AgentPrompts";
import { getAdminSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const { orders } = await getAdminSnapshot();
  return <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><p className="text-sm font-semibold text-indigo-600">Fulfillment</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Orders</h1><p className="mt-2 text-sm text-slate-500">Use status changes to drive fulfillment, delivery, cancellation, and refund workflows.</p><div className="mt-7"><AdminOrderBoard initialOrders={orders} /></div><div className="mt-7 max-w-3xl"><AgentPrompts mode="admin" /></div></div>;
}
