import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function POST() {
  const id = "1";
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
  });

  cookies().set({
    httpOnly: true,
    name: "token",
    secure: true,
    value: token,
    sameSite: "lax",
    maxAge: Number(process.env.JWT_EXPIRATION),
  });

  return Response.json({ success: "Cookie token has been set." });
}
