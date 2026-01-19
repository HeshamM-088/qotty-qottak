import connectDB from "@/lib/connectDB";
import AdoptionRequest from "../models/adopt.model";
import {
  isAuthenticated,
  isOwnerOnly,
  isOwnerOrAdmin,
  isAdmin,
} from "../utils/permissions";

// owner: get my requests
export async function getMyRequests(userId) {
  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  return AdoptionRequest.find({ user: userId })
    .populate("cat")
    .sort({ createdAt: -1 })
    .lean();
}

// admin: get all requests
export async function getAllRequests(user) {
  if (!isAdmin(user)) throw new Error("Forbidden");

  await connectDB();

  return AdoptionRequest.find()
    .populate("cat user")
    .sort({ createdAt: -1 })
    .lean();
}

// admin: get single request
export async function getRequestById(requestId, user) {
  if (!isAdmin(user)) throw new Error("Forbidden");

  await connectDB();

  const request = await AdoptionRequest.findById(requestId)
    .populate("cat user")
    .lean();
  if (!request) throw new Error("Request not found");

  return request;
}

// logged user: create new adoption request
export async function createRequest(catId, user) {
  if (!isAuthenticated(user)) throw new Error("Unauthorized");

  await connectDB();

  return AdoptionRequest.create({
    user: user.id,
    cat: catId,
    status: "pending",
  });
}

// owner or admin
export async function updateRequest(requestId, data, user) {
  if (!isAuthenticated(user)) throw new Error("Unauthorized");

  await connectDB();

  const request = await AdoptionRequest.findById(requestId);
  if (!request) throw new Error("Request not found");

  if (!isOwnerOrAdmin(request.user, user)) {
    throw new Error("Forbidden");
  }

  Object.assign(request, data);
  return request.save();
}

// owner or admin
export async function deleteRequest(requestId, user) {
  if (!isAuthenticated(user)) throw new Error("Unauthorized");

  await connectDB();

  const request = await AdoptionRequest.findById(requestId);
  if (!request) throw new Error("Request not found");

  if (!isOwnerOrAdmin(request.user, user)) {
    throw new Error("Forbidden");
  }

  await request.deleteOne();
  return true;
}
