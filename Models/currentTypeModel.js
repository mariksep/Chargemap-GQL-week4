import mongoose from "mongoose";

const currentTypeSchema = new mongoose.Schema({
  id: String,
  Description: String,
  Title: String,
});

export default mongoose.model("CurrentType", currentTypeSchema);
