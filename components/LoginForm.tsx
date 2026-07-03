"use client";

import { FormEvent, useState } from "react";

export function LoginForm({ adminOnly = false }: { adminOnly?: boolean }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password"), adminOnly })
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Could not sign in.");
      setLoading(false);
      return;
    }
    window.location.assign(result.redirectTo || (adminOnly ? "/admin" : "/account"));
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <label className="field-label">Email<input className="field-input" type="email" name="email" defaultValue={adminOnly ? "admin@northstar.demo" : "avery@example.com"} required /></label>
      <label className="field-label mt-5">Password<input className="field-input" type="password" name="password" defaultValue={adminOnly ? "AdminDemo!2026" : "CustomerDemo!2026"} required /></label>
      {error && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button disabled={loading} className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:bg-slate-400">{loading ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
