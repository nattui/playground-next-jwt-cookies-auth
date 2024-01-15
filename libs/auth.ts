import { api, origin } from "@/libs/constants";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const csrf = cookieStore.get("csrf")?.value ?? "";
  const response = await fetch(`${origin}${api.verify}`, {
    headers: {
      "x-token-csrf": csrf,
      Cookie: cookieStore.toString(),
    },
  });
  if (!response.ok) return;
  return await response.json();
}

export function verifyCsrf() {
  const headerList = headers();
  const headerCsrf = headerList.get("x-token-csrf");
  if (!headerCsrf) {
    return Response.json(
      { error: "CSRF token does not exist in header." },
      { status: 403 }
    );
  }

  const cookieCsrf = cookies().get("csrf");
  if (!cookieCsrf) {
    return Response.json(
      { error: "CSRF token does not exist in cookie." },
      { status: 403 }
    );
  }

  if (headerCsrf !== cookieCsrf.value) {
    return Response.json({ error: "CSRF token mismatch." }, { status: 403 });
  }
}

export interface Payload {
  exp: number;
  iat: number;
  id: string;
}

export function verifySession() {
  const cookieSession = cookies().get("session");
  if (!cookieSession) {
    return Response.json({ error: "Token does not exist." }, { status: 400 });
  }

  try {
    // Verify JWT token
    const session = cookieSession.value;
    const payload = jwt.verify(session, process.env.JWT_SECRET) as Payload;
    const user = { id: payload.id, time: Date.now(), random: Math.random() };
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Verification failed." }, { status: 400 });
  }
}
