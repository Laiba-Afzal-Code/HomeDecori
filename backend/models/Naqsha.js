import mongoose from "mongoose";

const naqshaSchema = new mongoose.Schema({
  plotType: {
    type: String,
    enum: ["residential", "commercial", "office", "farmhouse"],
    required: true,
  },
  width: Number,
  length: Number,
  marla: Number,
  floors: Number,
  requirements: {
    bedrooms: Number,
    bathrooms: Number,
    kitchens: Number,
    offices: Number,
  },
  generatedPlan: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Naqsha", naqshaSchema);