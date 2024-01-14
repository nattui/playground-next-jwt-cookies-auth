import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface Payload {
  exp: number;
  iat: number;
  id: string;
}

export function GET() {
  // Get token from cookie
  const cookieStore = cookies();
  const cookieSession = cookieStore.get("session");
  if (!cookieSession) {
    return Response.json({ error: "Session does not exist." }, { status: 400 });
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
