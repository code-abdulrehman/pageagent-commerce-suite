import Link from "next/link";
import { getSession } from "@/lib/session";
import { mockOrders } from "@/lib/mock-data";
import { dateTime, money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) {
    return <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><div className="rounded-3xl border border-slate-200 bg-white p-10 text-center"><p className="text-lg font-semibold text-slate-950">Sign in to view your account.</p><p className="mt-2 text-sm text-slate-500">The demo includes a seeded customer account with sample orders.</p><Link href="/login" className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Customer sign in</Link></div></div>;
  }
  const orders = mockOrders.filter((order) => order.email === session.email || session.role === "ADMIN").slice(0, 4);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-sm font-semibold text-indigo-600">Account</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Hello, {session.name.split(" ")[0]}.</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <section className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-sm text-slate-400">Signed in as</p><p className="mt-2 font-semibold">{session.email}</p><p className="mt-5 text-sm leading-6 text-slate-300">Need help with an order? Customer service can locate an order by its number and guide a return or delivery question.</p><Link href="/support" className="mt-6 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Contact customer service</Link></section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-950">Recent orders</h2><div className="mt-5 grid gap-4">{orders.length ? orders.map((order) => <div key={order.number} className="rounded-2xl border border-slate-100 p-4 sm:flex sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-950">{order.number}</p><p className="mt-1 text-sm text-slate-500">{dateTime(order.createdAt)} · {order.items} item{order.items === 1 ? "" : "s"}</p></div><div className="mt-3 sm:mt-0 sm:text-right"><p className="font-semibold">{money(order.total)}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">{order.status.replace("_", " ")}</p></div></div>) : <p className="text-sm text-slate-500">No sample orders are assigned to this account.</p>}</div></section>
      </div>
    </div>
  );
}
