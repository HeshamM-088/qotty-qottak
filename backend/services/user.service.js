import connectDB from "@/lib/connectDB";
import User from "../models/user.model";
import { isAuthenticated, isOwnerOrAdmin } from "../utils/permissions";
import { NextResponse } from "next/server";

/* ============================= */
/*        GET CURRENT USER       */
/* ============================= */

export async function getCurrentUser(userId) {
  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  const user = await User.findById(userId).lean();
  if (!user) throw new Error("User not found");

  return JSON.parse(JSON.stringify(user));
}

/* ============================= */
/*         ADMIN ONLY            */
/* ============================= */

export async function getAllUsersAdmin(currentUser) {
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Forbidden");
  }

  await connectDB();

  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json(
    { message: "Users fetched successfully", data: users },
    { status: 200 },
  );
}

/* ============================= */
/*          GET USER BY ID       */
/* ============================= */

export async function getUserById(userId) {
  await connectDB();

  const user = await User.findById(userId).lean();

  if (!user) {
    return NextResponse.json(
      { message: "User not found", data: null },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 },
  );
}

/* ============================= */
/*        UPDATE USER            */
/* ============================= */

export async function updateUser(userId, data, currentUser) {
  if (!isAuthenticated(currentUser)) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!isOwnerOrAdmin(user._id, currentUser)) {
    throw new Error("Forbidden");
  }

  Object.assign(user, data);
  return user.save();
}

/* ============================= */
/*          BAN USER             */
/* ============================= */

export async function banUser(userId, days, reason, currentUser) {
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Forbidden");
  }

  await connectDB();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const banDate = new Date();
  banDate.setDate(banDate.getDate() + days);

  user.isBanned = true;
  user.bannedUntil = banDate;
  user.banReason = reason || "Violation of platform rules";

  return user.save();
}

/* ============================= */
/*          UNBAN USER           */
/* ============================= */

export async function unbanUser(userId, currentUser) {
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Forbidden");
  }

  await connectDB();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isBanned = false;
  user.bannedUntil = null;
  user.banReason = null;

  return user.save();
}

/* ============================= */
/*   GOOGLE LOGIN (UPSERT)       */
/* ============================= */

export async function upsertUserFromGoogle(profile) {
  await connectDB();

  const existingUser = await User.findOne({ email: profile.email });

  if (existingUser) {
    existingUser.name = profile.name;
    existingUser.image = profile.image;
    await existingUser.save();
    return existingUser;
  }

  return User.create({
    name: profile.name,
    email: profile.email,
    image: profile.image,
    role: "user",
    isBanned: false,
  });
}
