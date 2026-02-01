import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await fetch(`${process.env.NEST_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }

  const data = await result.json();

  const response = NextResponse.json({ user: data.user });
  response.cookies.set("access_token", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  response.cookies.set("refresh_token", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
