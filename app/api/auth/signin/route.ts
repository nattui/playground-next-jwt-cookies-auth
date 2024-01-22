import { secret } from "@/libs/auth";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

interface Cookies {
  priority: "high" | "low" | "medium" | undefined;
  sameSite: boolean | "lax" | "strict" | "none" | undefined;
}

export async function POST() {
  const csrf = nanoid();

  // TODO: Fake auth and returns user id
  const id = "1";

  let session;
  try {
    session = await new SignJWT({ id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong." }, { status: 400 });
  }

  const cookieStore = cookies();
  const defaults = {
    httpOnly: true,
    maxAge: Number(process.env.JWT_EXPIRATION),
    path: "/",
    priority: "high" as Cookies["priority"],
    sameSite: "lax" as Cookies["sameSite"],
    secure: true,
  };
  cookieStore.set({ ...defaults, name: "csrf", value: csrf });
  cookieStore.set({ ...defaults, name: "session", value: session });

  return Response.json({ success: "Cookie tokens has been set." });
}
