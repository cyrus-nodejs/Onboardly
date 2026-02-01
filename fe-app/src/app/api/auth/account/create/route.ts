import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const NEST_API_URL = process.env.NEST_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await fetch(`${NEST_API_URL}/auth/account/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      const errorData = await result.json();
      return NextResponse.json(
        { error: errorData.message || "Account creation failed" },
        { status: result.status },
      );
    }

    const data = await result.json();
    const response = NextResponse.json({ user: data.user });

    const cookieStore = cookies();
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set("access_token", data.accessToken, {
      httpOnly: true,
      secure,
      sameSite: secure ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    cookieStore.set("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: secure ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
