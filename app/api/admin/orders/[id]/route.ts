import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const schema = z.object({ status: z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  try {
    const { id } = await params;
    const { status } = schema.parse(await request.json());
    const updated = await db.order.update({
      where: { id },
      data: {
        status,
        paymentStatus: status === "REFUNDED" ? "REFUNDED" : undefined,
        events: { create: { type: "status_changed", message: `Order status changed to ${status.replace("_", " ").toLowerCase()} by ${session.email}.` } }
      }
    });
    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch {
    return NextResponse.json({ error: "Order update failed." }, { status:400 });
  }
}
