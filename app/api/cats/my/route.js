import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getMyCats } from "@/backend/services/cat.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );
  }

  try {
    const cats = await getMyCats(session.user.id);
    return NextResponse.json(
      { message: "Your Cats Is Here", data: cats },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 500 },
    );
  }
}
