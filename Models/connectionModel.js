const mongoose = require("mongoose");

const connectionsSchema = new mongoose.Schema({
  ConnectionTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConnectionType",
  },
  CurrentTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CurrentType",
  },
  LevelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
  },
  Quantity: Number,
});

module.exports = mongoose.model("Connections", connectionsSchema);
