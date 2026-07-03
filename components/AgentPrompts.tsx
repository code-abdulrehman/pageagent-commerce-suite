"use client";

import { useState } from "react";

const customerPrompts = [
  "Search for the Aurora Insulated Bottle and add one to my cart.",
  "Show me travel products under $100.",
  "Open customer support and start a return request for order NTH-10428.",
  "Go to my cart and proceed to checkout."
];

const adminPrompts = [
  "Open the orders page and show orders awaiting fulfillment.",
  "Find order NTH-10428 and change its status to processing.",
  "Open support cases and find the high priority damaged item request.",
  "Go to products and show items with low inventory."
];

export function AgentPrompts({ mode = "shop" }: { mode?: "shop" | "admin" }) {
  const [copied, setCopied] = useState<string | null>(null);
  const prompts = mode === "admin" ? adminPrompts : customerPrompts;

  async function copy(prompt: string) {
    await navigator.clipboard?.writeText(prompt);
    setCopied(prompt);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6" aria-label="Page Agent prompts">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-lg text-white">✦</div>
        <div>
          <p className="font-semibold text-slate-950">Page Agent is ready in this page</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Use the floating agent panel to control visible interface elements with plain-English instructions.
            Sensitive actions in this demo still require a confirmation click.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {prompts.map((prompt) => (
          <button
            type="button"
            key={prompt}
            onClick={() => copy(prompt)}
            className="rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-100"
          >
            <span className="mr-2 text-indigo-500">↗</span>
            {copied === prompt ? "Copied — paste into Page Agent" : prompt}
          </button>
        ))}
      </div>
    </section>
  );
}
