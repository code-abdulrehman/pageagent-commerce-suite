"use client";

import Script from "next/script";

export function PageAgentLoader() {
  if (process.env.NEXT_PUBLIC_PAGE_AGENT_DEMO === "false") return null;
  return (
    <Script
      id="page-agent-demo"
      src="https://cdn.jsdelivr.net/npm/page-agent@1.10.0/dist/iife/page-agent.demo.js"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
