import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    cat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// ❗ يمنع نفس اليوزر يعمل طلب مرتين لنفس القطة
adoptionRequestSchema.index({ user: 1, cat: 1 }, { unique: true });

export default mongoose.models.AdoptionRequest ||
  mongoose.model("AdoptionRequest", adoptionRequestSchema);
