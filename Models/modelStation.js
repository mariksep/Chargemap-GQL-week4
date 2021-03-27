const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stationsSchema = new Schema({
  id: String,
  title: String,
  town: String,
  address: String,
  stateorprovince: String,
  postcode: Number,
  Location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  Connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Connections",
    },
  ],
});

module.exports = mongoose.model("station", stationsSchema);
