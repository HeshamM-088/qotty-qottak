import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import User from "@/backend/models/user.model";

export async function getAuthUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email });

  return user;
}

export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }

  return { user };
}

export async function requireAdmin() {
  const user = await getAuthUser();

  if (!user || user.role !== "admin") {
    return {
      error: "Forbidden",
      status: 403,
    };
  }

  return { user };
}
