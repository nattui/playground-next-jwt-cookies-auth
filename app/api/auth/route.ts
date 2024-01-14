import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const id = "1";
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
  });

  const cookieStore = cookies();
  cookieStore.set({
    httpOnly: true,
    name: "token",
    secure: true,
    value: token,
    sameSite: "lax",
    maxAge: Number(process.env.JWT_EXPIRATION),
  });

  return Response.json({ cat: "meow" });
}
