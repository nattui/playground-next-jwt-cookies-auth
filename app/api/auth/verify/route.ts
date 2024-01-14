import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  // Get token from cookie
  const cookieStore = cookies();
  const cookieToken = cookieStore.get("token");
  if (!cookieToken) {
    return Response.json({ error: "Something went wrong." }, { status: 400 });
  }

  // Verify JWT token
  const token = cookieToken.value;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ success: "User is authenticated." });
  } catch (error) {
    return Response.json(
      { error: "There was a verification error." },
      { status: 400 }
    );
  }
}
