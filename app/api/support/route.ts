import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  orderNumber: z.string().max(30).optional().nullable(),
  category: z.string().min(2),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]).default("NORMAL"),
  subject: z.string().min(4),
  message: z.string().min(10)
});

function ticketNumber() {
  return `CS-${Math.floor(100 + Math.random() * 899)}`;
}

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const customer = await db.user.upsert({
      where: { email: input.email.toLowerCase() },
      update: { name: input.name },
      create: { name: input.name, email: input.email.toLowerCase(), passwordHash: await bcrypt.hash(`support-${Date.now()}`, 12), role: "CUSTOMER" }
    });
    let number = ticketNumber();
    while (await db.supportTicket.findUnique({ where: { number }, select: { id: true } })) number = ticketNumber();
    await db.supportTicket.create({
      data: {
        number, subject: input.subject, message: input.message, category: input.category, priority: input.priority,
        customerId: customer.id, orderNumber: input.orderNumber || null,
        messages: { create: { authorId: customer.id, body: input.message, internal: false } }
      }
    });
    return NextResponse.json({ ticketNumber: number }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create the support ticket." }, { status: 400 });
  }
}
