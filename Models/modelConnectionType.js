const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectionTypeSchema = Schema({
  id: String,
  FormalName: String,
  Title: String,
});

module.exports = mongoose.model("ConnectionType", connectionTypeSchema);
