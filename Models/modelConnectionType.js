import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connectionTypeSchema = Schema({
  _id: String,
  FormalName: String,
  Title: String,
});

export default mongoose.model("ConnectionType", connectionTypeSchema);
