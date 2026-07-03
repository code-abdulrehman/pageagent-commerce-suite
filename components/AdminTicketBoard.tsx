"use client";

import { useMemo, useState } from "react";
import { dateTime } from "@/lib/format";

type TicketRow = { id: string; number: string; customer: string; email: string; subject: string; category: string; priority: string; status: string; createdAt: string; orderNumber?: string | null };
const statuses = ["OPEN", "IN_PROGRESS", "WAITING_ON_CUSTOMER", "RESOLVED"];

export function AdminTicketBoard({ initialTickets }: { initialTickets: TicketRow[] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState("ACTIVE");
  const [notice, setNotice] = useState("");
  const visible = useMemo(() => tickets.filter((ticket) => filter === "ALL" || (filter === "ACTIVE" ? ticket.status !== "RESOLVED" : ticket.status === filter)), [filter, tickets]);

  async function update(ticket: TicketRow, status: string) {
    const confirmed = window.confirm(`Mark ${ticket.number} as ${status.replaceAll("_", " ")}?`);
    if (!confirmed) return;
    const response = await fetch(`/api/admin/tickets/${ticket.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, message: status === "RESOLVED" ? "Case resolved by administrator." : undefined }) });
    if (!response.ok) {
      setNotice("The ticket update was not saved. Confirm PostgreSQL is running.");
      return;
    }
    setTickets((current) => current.map((item) => item.id === ticket.id ? { ...item, status } : item));
    setNotice(`${ticket.number} updated.`);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold">Customer service desk</h2><p className="mt-1 text-sm text-slate-500">Resolve tickets with a clear, human-reviewed workflow.</p></div><select value={filter} onChange={(e) => setFilter(e.target.value)} className="field-input mt-0 w-48"><option value="ACTIVE">Active cases</option><option value="ALL">All cases</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
      {notice && <p className="mx-5 mt-5 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-800">{notice}</p>}
      <div className="divide-y divide-slate-100">{visible.map((ticket) => <article key={ticket.id} className="grid gap-4 p-5 lg:grid-cols-[1.2fr_.55fr_.55fr_auto] lg:items-center"><div><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-slate-950">{ticket.number}</p><span className={`status-pill ${ticket.priority === "HIGH" || ticket.priority === "URGENT" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"}`}>{ticket.priority}</span></div><p className="mt-2 text-sm font-medium text-slate-800">{ticket.subject}</p><p className="mt-1 text-xs text-slate-500">{ticket.customer} · {ticket.email} {ticket.orderNumber ? `· ${ticket.orderNumber}` : ""}</p></div><p className="text-sm text-slate-600">{ticket.category}<br /><span className="text-xs text-slate-400">{dateTime(ticket.createdAt)}</span></p><span className="status-pill h-fit w-fit bg-indigo-50 text-indigo-700">{ticket.status.replaceAll("_", " ")}</span><select aria-label={`Update ${ticket.number}`} value={ticket.status} onChange={(e) => update(ticket, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-medium text-slate-700">{statuses.map((status) => <option key={status}>{status}</option>)}</select></article>)}</div>
    </section>
  );
}
