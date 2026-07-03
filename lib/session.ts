import crypto from "crypto";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

const COOKIE_NAME = "northstar_session";
const SECRET = process.env.SESSION_SECRET || "development-only-change-me";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function createSessionValue(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function parseSessionValue(value?: string | null): SessionUser | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.exp || decoded.exp < Date.now()) return null;
    return { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role as Role };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return parseSessionValue(store.get(COOKIE_NAME)?.value);
}

export function sessionCookie(value: string) {
  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  };
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  };
}
