import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function POST() {
  const csrf = crypto.randomBytes(64).toString("hex");

  const id = "1";
  const session = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
  });

  const cookieStore = cookies();
  const defaults = {
    httpOnly: true,
    maxAge: Number(process.env.JWT_EXPIRATION),
    priority: "high" as "high" | "low" | "medium" | undefined,
    sameSite: "lax" as boolean | "lax" | "strict" | "none" | undefined,
    secure: true,
  };
  cookieStore.set({ ...defaults, name: "csrf", value: csrf });
  cookieStore.set({ ...defaults, name: "session", value: session });

  return Response.json({ success: "Cookie tokens has been set." });
}
