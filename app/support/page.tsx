import { AgentPrompts } from "@/components/AgentPrompts";
import { SupportForm } from "@/components/SupportForm";

const answers = [
  ["Where is my order?", "Use your order number to ask the support team for tracking and status updates."],
  ["Can I make a return?", "Most unused items can be returned within 30 days. Submit a ticket and an agent will review the request."],
  ["Can I change an address?", "Contact us promptly with the order number. Changes are possible before fulfillment begins."],
  ["How does the demo work?", "Orders, payment states, and service cases are fictional. No payment information is collected."]
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="max-w-3xl"><p className="text-sm font-semibold text-indigo-600">Customer service</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Answers when you need them.</h1><p className="mt-3 leading-7 text-slate-500">Search the common tasks below or send the customer-service desk a detailed request. The admin workspace contains the corresponding support inbox.</p></div>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><SupportForm /><div className="grid content-start gap-4">{answers.map(([question, answer]) => <details key={question} className="rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-semibold text-slate-950">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-500">{answer}</p></details>)}</div></div>
      <div className="mt-10 max-w-3xl"><AgentPrompts /></div>
    </div>
  );
}
