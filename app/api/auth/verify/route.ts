import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Get token from cookie
  const cookieToken = request.cookies.get("token");
  if (!cookieToken) {
    return Response.json({ error: "Something went wrong." }, { status: 400 });
  }

  // Verify JWT token
  const token = cookieToken.value;
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const user = { id: 2, time: Date.now(), random: Math.random() };

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { error: "There was a verification error." },
      { status: 400 }
    );
  }
}
