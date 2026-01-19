import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  try {
    const requests = await getMyRequests(session.user.id);
    return NextResponse.json(
      { data: requests, message: "Your Request Found Success" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 500 },
    );
  }
}
