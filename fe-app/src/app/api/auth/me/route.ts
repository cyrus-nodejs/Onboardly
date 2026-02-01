import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const result = await fetch(`${process.env.NEST_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await result.json();
  return NextResponse.json(user);
}
