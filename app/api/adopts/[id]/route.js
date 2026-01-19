import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  deleteRequest,
  getRequestById,
  updateRequest,
} from "@/backend/services/adopt.service";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  const body = await req.json();

  try {
    const updated = await updateRequest(params.id, body, session.user);
    return NextResponse.json(
      { data: updated, message: "Success" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  try {
    await deleteRequest(params.id, session.user);
    return NextResponse.json(
      { message: "Request deleted successfully", data: null },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  try {
    const request = await getRequestById(params.id, session.user);
    return NextResponse.json(
      { data: request, message: "Success" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 404 });
  }
}
