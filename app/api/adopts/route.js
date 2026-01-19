import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createRequest } from "@/backend/services/adopt.service";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  const { catId } = await req.json();

  try {
    const request = await createRequest(catId, session.user);
    return NextResponse.json(
      { data: request, message: "Success" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 400 },
    );
  }
}
