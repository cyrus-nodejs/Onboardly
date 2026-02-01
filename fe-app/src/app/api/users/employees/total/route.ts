import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ totalEmployees: 0 }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.NEST_API_URL}/users/employees/total`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
