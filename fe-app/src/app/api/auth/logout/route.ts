import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Already logged out" });
  }

  await fetch(`${process.env.NEST_API_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const response = NextResponse.json({ message: "Logged out successfully" });
  cookieStore.delete({ name: "access_token", path: "/" });
  cookieStore.delete({ name: "refresh_token", path: "/" });

  return response;
}
