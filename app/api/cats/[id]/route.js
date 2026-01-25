import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  deleteCat,
  getCatById,
  updateCat,
} from "@/backend/services/cat.service";
import User from "@/backend/models/user.model";

export async function GET(req, { params }) {
  try {
    const cat = await getCatById(params.id);
    return cat;
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 404 },
    );
  }
}

export async function PUT(req, { params }) {
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
  const images = formData.getAll("images"); // ممكن يكون فارغ لو مش عايز تحديث الصور

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  let uploadedImages = [];
  if (images.length > 0) {
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
  }

  // نجهز البيانات للـ service
  const updateData = {
    name,
    age,
    gender,
    vaccinated,
    ...(uploadedImages.length > 0 && { images: uploadedImages }), // نحدث الصور فقط لو فيه صور جديدة
  };

  try {
    const updatedCat = await updateCat(params.id, updateData, session.user);
    return NextResponse.json(
      { message: "Cat Updated Success", data: updatedCat },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 403 },
    );
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
    await deleteCat(params.id, session.user);
    return NextResponse.json(
      { message: "Cat deleted successfully", data: null },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, data: null },
      { status: 403 },
    );
  }
}
