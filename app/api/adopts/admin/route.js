import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getAllRequests } from "@/backend/services/adopt.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  try {
    const requests = await getAllRequests(session.user);
    return NextResponse.json(
      { data: requests, message: "Success" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 403 },
    );
  }
}
