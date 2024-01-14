import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface Payload {
  exp: number;
  iat: number;
  id: string;
}

export function GET() {
  // Get token from cookie
  const cookieToken = cookies().get("token");
  if (!cookieToken) {
    return Response.json({ error: "Token does not exist." }, { status: 400 });
  }

  try {
    // Verify JWT token
    const token = cookieToken.value;
    const payload = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    const user = { id: payload.id, time: Date.now(), random: Math.random() };
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Verification failed." }, { status: 400 });
  }
}
