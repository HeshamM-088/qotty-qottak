import { egyptGovernorates } from "@/lib/egyptGovernorates";
import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      enum: egyptGovernorates,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
    },

    ageUnit: {
      type: String,
      enum: ["أيام", "شهور", "سنين"],
      required: true,
    },

    gender: {
      type: String,
      enum: ["ذكر", "أنثى"],
      required: true,
    },

    vaccinated: {
      type: Boolean,
      required: true,
    },

    images: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length <= 3, "Max 3 images allowed"],
    },

    vaccinationImages: {
      type: [String],
      validate: [(arr) => arr.length <= 2, "Max 2 vaccination images allowed"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cat || mongoose.model("Cat", catSchema);
