import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { inviteId: string } },
) {
  const response = await fetch(
    `${process.env.NEST_API_URL}/invites/${params.inviteId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
