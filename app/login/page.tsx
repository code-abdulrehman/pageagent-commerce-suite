import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="text-sm font-semibold text-indigo-600">Customer sign in</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Keep your orders close.</h1><p className="mt-4 leading-7 text-slate-500">Use the seeded customer account to access order history and support workflows.</p><div className="mt-8 rounded-2xl bg-indigo-50 p-5 text-sm text-slate-700"><p className="font-semibold text-slate-950">Customer demo account</p><p className="mt-2">avery@example.com</p><p>CustomerDemo!2026</p></div><Link href="/admin/login" className="mt-6 inline-block text-sm font-semibold text-slate-700 hover:underline">Administrator sign in →</Link></div>
      <LoginForm />
    </div>
  );
}
