import { AdminTicketBoard } from "@/components/AdminTicketBoard";
import { AgentPrompts } from "@/components/AgentPrompts";
import { getAdminSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const { tickets } = await getAdminSnapshot();
  return <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><p className="text-sm font-semibold text-indigo-600">Customer service</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Support cases</h1><p className="mt-2 text-sm text-slate-500">Triage requests, update a case state, and retain a human approval point before refunds, address edits, or other customer-impacting actions.</p><div className="mt-7"><AdminTicketBoard initialTickets={tickets} /></div><div className="mt-7 max-w-3xl"><AgentPrompts mode="admin" /></div></div>;
}
