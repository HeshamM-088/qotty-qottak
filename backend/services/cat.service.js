import connectDB from "@/lib/connectDB";
import Cat from "../models/cat.model";
import {
  isOwnerOnly,
  isAuthenticated,
  isOwnerOrAdmin,
} from "../utils/permissions";
import { NextResponse } from "next/server";

// owner only
export async function getMyCats(userId) {
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  return JSON.parse(
    JSON.stringify(
      await Cat.find({ owner: userId }).sort({ createdAt: -1 }).lean(),
    ),
  );
}

// for admin only
export async function getAllCatsAdmin() {
  await connectDB();
  const cats = await Cat.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ message: "Success", data: cats }, { status: 200 });
}

// public
export async function getAllCats() {
  await connectDB();
  const cats = Cat.find({ status: "available" }).sort({ createdAt: -1 }).lean();

  if (!cats) throw new Error("Cats not found");

  return cats;
}

// public
export async function getCatById(catId) {
  await connectDB();
  const cat = await Cat.findById(catId).lean();
  if (!cat) {
    return NextResponse.json(
      { message: "Cat Not Found Success", data: null },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Cat Found Success", data: cat },
    { status: 200 },
  );
}

// logged user
export async function createCat(data, user) {
  if (!isAuthenticated(user)) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  return Cat.create({
    ...data,
    owner: user.id,
    status: data.status || "pending",
  });
}

// owner and admin
export async function updateCat(catId, data, user) {
  if (!isAuthenticated(user)) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const cat = await Cat.findById(catId);
  if (!cat) throw new Error("Cat not found");

  if (!isOwnerOrAdmin(cat.owner, user)) {
    throw new Error("Forbidden");
  }

  Object.assign(cat, data);
  return cat.save();
}

// owner and admin
export async function deleteCat(catId, user) {
  if (!isAuthenticated(user)) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const cat = await Cat.findById(catId);
  if (!cat) throw new Error("Cat not found");

  if (!isOwnerOnly(cat.owner, user)) {
    throw new Error("Forbidden");
  }

  await cat.deleteOne();
  return true;
}
