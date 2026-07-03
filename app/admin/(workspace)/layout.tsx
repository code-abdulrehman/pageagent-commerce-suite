import { AdminNav } from "@/components/AdminNav";
import { requireAdmin } from "@/lib/guards";

export default async function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[250px_1fr]"><AdminNav name={admin.name} /><div className="min-w-0">{children}</div></div>;
}
