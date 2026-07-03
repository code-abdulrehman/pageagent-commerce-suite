import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const schema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "WAITING_ON_CUSTOMER", "RESOLVED"]),
  message: z.string().min(3).optional()
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  try {
    const { id } = await params;
    const input = schema.parse(await request.json());
    const updated = await db.supportTicket.update({
      where: { id },
      data: {
        status: input.status,
        messages: input.message ? { create: { authorId: session.id, body: input.message, internal: true } } : undefined
      }
    });
    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch {
    return NextResponse.json({ error: "Ticket update failed." }, { status: 400 });
  }
}
