import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import Cat from "@/backend/models/cat.model";
import mongoose from "mongoose";

export async function PATCH(req, context) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const params = await context.params;
  const id = params.id;

  console.log("STATUS ROUTE HIT:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Cat ID" }, { status: 400 });
  }

  const { status, rejectionReason } = await req.json();

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json(
      { message: "Invalid status value" },
      { status: 400 },
    );
  }

  await connectDB();
  const cat = await Cat.findById(params.id);

  if (!cat)
    return NextResponse.json({ message: "Cat not found" }, { status: 404 });

  if (cat.status !== "pending") {
    return NextResponse.json(
      { message: "Only pending cats can be reviewed" },
      { status: 400 },
    );
  }

  if (status === "approved") {
    cat.status = "available";
  }

  if (status === "rejected") {
    cat.status = "rejected";
    cat.rejectionReason = rejectionReason || "";
  }

  cat.reviewedBy = session.user.id;
  cat.reviewedAt = new Date();

  await cat.save();

  return NextResponse.json(
    {
      message:
        status === "approved"
          ? "Cat approved and now available"
          : "Cat rejected",
      data: cat,
    },
    { status: 200 },
  );
}
