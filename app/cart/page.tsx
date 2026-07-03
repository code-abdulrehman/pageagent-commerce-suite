import { CartContents } from "@/components/CartContents";

export default function CartPage() {
  return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8"><p className="text-sm font-semibold text-indigo-600">Your bag</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Cart</h1><div className="mt-8"><CartContents /></div></div>;
}
