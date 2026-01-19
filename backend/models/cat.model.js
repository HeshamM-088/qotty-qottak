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
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    ageUnit: {
      type: String,
      enum: ["days", "months", "years"],
      default: "months",
    },

    gender: {
      type: String,
      enum: ["ذكر", "أنثى"],
      required: true,
    },

    vaccinated: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      trim: true,
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
