import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function POST() {
  // TODO: Fake auth and returns user id
  const id = "1";
  const session = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
  });

  const cookieStore = cookies();
  const defaults = {
    httpOnly: true,
    maxAge: Number(process.env.JWT_EXPIRATION),
    path: "/",
    priority: "high" as "high" | "low" | "medium" | undefined,
    sameSite: "lax" as boolean | "lax" | "strict" | "none" | undefined,
    secure: true,
  };
  cookieStore.set({ ...defaults, name: "session", value: session });

  return Response.json({ success: "Cookie token has been set." });
}
