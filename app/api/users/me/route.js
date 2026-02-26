import { NextResponse } from "next/server";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { message: "Success", data: session.user },
    { status: 200 },
  );
}
