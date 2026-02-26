import { NextResponse } from "next/server";
import { getAllUsersAdmin } from "@/backend/services/user.service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized", data: [] },
        { status: 401 },
      );
    }

    const currentUser = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };

    return await getAllUsersAdmin(currentUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Forbidden", data: [] },
      { status: 403 },
    );
  }
}
