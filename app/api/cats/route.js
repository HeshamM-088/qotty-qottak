import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import Cat from "@/backend/models/cat.model";
import User from "@/backend/models/user.model";
import { createCat, getAllCats } from "@/backend/services/cat.service";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized", data: null },
      { status: 401 },
    );

  const formData = await req.formData();

  const name = formData.get("name");
  const age = formData.get("age");
  const gender = formData.get("gender");
  const vaccinated = formData.get("vaccinated") === "true";
  const images = formData.getAll("images");

  await connectDB();

  const user = await User.findOne({ email: session.user.email });

  // رفع الصور على Cloudinary
  const uploadedImages = [];
  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "cats" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    uploadedImages.push(uploadResult.secure_url);
  }

  // نمرر البيانات الجاهزة للـ service
  const cat = await createCat(
    { name, age, gender, vaccinated, images: uploadedImages },
    session.user,
  );

  return NextResponse.json(
    { message: "Cat Created Success", data: cat },
    { status: 201 },
  );
}

export async function GET() {
  try {
    const cat = await getAllCats();
    return NextResponse.json(
      { data: cat, message: "Cats Found Success" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 404 },
    );
  }
}
