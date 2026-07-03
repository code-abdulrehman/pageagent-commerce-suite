import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="text-sm font-semibold text-indigo-600">Restricted workspace</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Northstar operations.</h1><p className="mt-4 leading-7 text-slate-500">Manage products, orders, customers, and support cases with Page Agent available for natural-language UI assistance.</p><div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900"><p className="font-semibold">Demo administrator account</p><p className="mt-2">admin@northstar.demo</p><p>AdminDemo!2026</p><p className="mt-3 text-xs leading-5">Use a real identity provider, password policy, audit logging, and a unique secret before any deployment.</p></div><Link href="/login" className="mt-6 inline-block text-sm font-semibold text-slate-700 hover:underline">Customer sign in →</Link></div>
      <LoginForm adminOnly />
    </div>
  );
}
