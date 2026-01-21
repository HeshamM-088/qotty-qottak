import connectDB from "@/lib/connectDB";
import Cat from "../models/cat.model";
import {
  isOwnerOnly,
  isAuthenticated,
  isOwnerOrAdmin,
} from "../utils/permissions";

// owner only
export async function getMyCats(userId) {
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  return Cat.find({ owner: userId }).sort({ createdAt: -1 }).lean();
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
  if (!cat) throw new Error("Cat not found");

  return cat;
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
