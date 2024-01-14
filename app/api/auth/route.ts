import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  console.log("::::::::::::::::::::::::::::::");
  console.log("::::::::::::::::::::::::::::::");
  console.log("::::::::::::::::::::::::::::::");

  const JWT_EXPIRATION = 30 * 24 * 60 * 60; // 30 days in seconds
  const JWT_SECRET =
    "0a2b8715c713df95ed39e68aa58d91c2bda8c97c48a7f976d6323c64be6bad53";
  const token = jwt.sign({ id: "1" }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  const cookieStore = cookies();
  cookieStore.set({
    httpOnly: true,
    name: "token",
    secure: true,
    value: token,
    sameSite: "lax",
    maxAge: JWT_EXPIRATION,
  });

  return Response.json({ cat: "meow" });
}
