import mongoose from "mongoose";

const levelTypeSchema = new mongoose.Schema({
  id: String,
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

export default mongoose.model("Level", levelTypeSchema);
