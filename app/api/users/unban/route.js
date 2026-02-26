import { NextResponse } from "next/server";
import { unbanUser } from "@/backend/services/user.service";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { userId } = await req.json();

    const result = await unbanUser(userId);
    return NextResponse.json(
      { message: "User unbanned successfully", data: result },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
