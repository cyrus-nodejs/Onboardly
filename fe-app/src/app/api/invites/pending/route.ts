import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ pendingInvite: [] }, { status: 401 });
  }
  const response = await fetch(`${process.env.NEST_API_URL}/invites/pending`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
