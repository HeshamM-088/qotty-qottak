import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
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
  const city = formData.get("city");
  const age = formData.get("age");
  const ageUnit = formData.get("ageUnit");
  const gender = formData.get("gender");
  const vaccinated = formData.get("vaccinated") === "true";
  const images = formData.getAll("images");
  const vaccinationImages = formData.getAll("vaccinationImages");
  const description = formData.get("description");

  if (images.length > 3) {
    return NextResponse.json(
      { message: "Maximum 3 cat images allowed", data: null },
      { status: 400 },
    );
  }

  if (vaccinated && vaccinationImages.length > 2) {
    return NextResponse.json(
      { message: "Maximum 2 vaccination images allowed", data: null },
      { status: 400 },
    );
  }

  await connectDB();

  const uploadToCloudinary = async (file, folder) => {
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        })
        .end(buffer);
    });
  };

  const uploadedCatImages = [];
  for (const img of images) {
    uploadedCatImages.push(await uploadToCloudinary(img, "cats"));
  }

  const uploadedVaccinationImages = [];
  if (vaccinated) {
    for (const img of vaccinationImages) {
      uploadedVaccinationImages.push(
        await uploadToCloudinary(img, "vaccinations"),
      );
    }
  }

  const cat = await createCat(
    {
      name,
      city,
      age,
      ageUnit,
      gender,
      vaccinated,
      images: uploadedCatImages,
      vaccinationImages: vaccinated ? uploadedVaccinationImages : [],
      description,
      status: "pending",
    },
    session.user,
  );

  return NextResponse.json({ message: "Cat Created Success" }, { status: 201 });
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
