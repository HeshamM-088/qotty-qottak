import { NextResponse } from "next/server";
import { banUser } from "@/backend/services/user.service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { userId, bannedUntil } = await req.json();

    const result = await banUser(userId, new Date(bannedUntil));
    return NextResponse.json(
      { message: "User banned successfully", data: result },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
