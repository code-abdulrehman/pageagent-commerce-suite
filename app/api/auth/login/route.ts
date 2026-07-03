import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSessionValue, sessionCookie } from "@/lib/session";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  adminOnly: z.boolean().optional()
});

export async function POST(request: Request) {
  try {
    const input = bodySchema.parse(await request.json());
    const user = await db.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    if (input.adminOnly && user.role !== "ADMIN") {
      return NextResponse.json({ error: "This account does not have administrator access." }, { status: 403 });
    }
    const response = NextResponse.json({
      redirectTo: user.role === "ADMIN" ? "/admin" : "/account"
    });
    response.cookies.set(sessionCookie(createSessionValue({ id: user.id, name: user.name, email: user.email, role: user.role })));
    return response;
  } catch {
    return NextResponse.json({ error: "Sign-in is temporarily unavailable. Confirm PostgreSQL is running." }, { status: 503 });
  }
}
