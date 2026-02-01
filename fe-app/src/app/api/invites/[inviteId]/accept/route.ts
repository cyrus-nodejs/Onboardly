import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { inviteId: string } },
) {
  const { inviteId } = params;

  if (!inviteId) {
    return NextResponse.json(
      { message: " Invite Token not found!" },
      { status: 400 },
    );
  }

  const body = await req.json();

  const response = await fetch(
    `${process.env.NEST_API_URL}/invites/${inviteId}/accept`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json(
      { message: errorData?.message || "Failed to accept invite" },
      { status: response.status },
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
