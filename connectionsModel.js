const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  Town: String,
  address: String,
  StateOrProvince: String,
  Postcode: Number,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  connections: {
    connectionType: [
      { type: mongoose.Schema.Types.ObjectId, ref: "connectionType" },
    ],
    currentType: [{ type: mongoose.Schema.Types.ObjectId, ref: "currentType" }],
    levelType: [{ type: mongoose.Schema.Types.ObjectId, ref: "levelType" }],
  },
});

const connectionTypeSchema = Schema({
  id: Number,
  FormalName: String,
  Title: String,
});
const currentTypeSchema = Schema({
  id: Number,
  FormalName: String,
  Title: String,
});
const levelType = Schema({
  id: Number,
  FormalName: String,
  Title: String,
  IsFastChargeCapable: Boolean,
});

module.exports = mongoose.model("levelType", levelType);

module.exports = mongoose.model("currentType", currentTypeSchema);

module.exports = mongoose.model("connectionType", connectionTypeSchema);

module.exports = mongoose.model("station", stationSchema);
