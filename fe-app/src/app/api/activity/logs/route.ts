import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ activityLogs: [] }, { status: 401 });
  }
  const response = await fetch(`${process.env.NEST_API_URL}/activity/logs`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ activityLogs: [] }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
