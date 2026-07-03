"use client";

import { FormEvent, useState } from "react";

export function SupportForm() {
  const [status, setStatus] = useState<"ready" | "sending" | "sent" | "error">("ready");
  const [ticket, setTicket] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), orderNumber: form.get("orderNumber"),
          category: form.get("category"), priority: form.get("priority"), subject: form.get("subject"), message: form.get("message")
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error();
      setTicket(result.ticketNumber);
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-slate-950">Contact customer service</h2>
      <p className="mt-2 text-sm text-slate-500">Create a support ticket for a delivery, order, return, or product question.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="field-label">Your name<input name="name" defaultValue="Avery Daniels" required className="field-input" /></label>
        <label className="field-label">Email address<input name="email" type="email" defaultValue="avery@example.com" required className="field-input" /></label>
        <label className="field-label">Order number (optional)<input name="orderNumber" placeholder="NTH-10428" className="field-input" /></label>
        <label className="field-label">Topic<select name="category" defaultValue="Return or refund" className="field-input"><option>Shipping</option><option>Return or refund</option><option>Order change</option><option>Product question</option><option>Other</option></select></label>
        <label className="field-label">Priority<select name="priority" defaultValue="NORMAL" className="field-input"><option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option></select></label>
        <label className="field-label">Subject<input name="subject" defaultValue="Help with my order" required className="field-input" /></label>
        <label className="field-label sm:col-span-2">How can we help?<textarea name="message" required rows={5} defaultValue="I would like help with my order." className="field-input resize-y" /></label>
      </div>
      {status === "sent" && <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Thanks — ticket <strong>{ticket}</strong> has been created.</p>}
      {status === "error" && <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">We could not create the ticket. Ensure your demo database is running and try again.</p>}
      <button disabled={status === "sending"} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-400">{status === "sending" ? "Sending…" : "Send to customer service"}</button>
    </form>
  );
}
