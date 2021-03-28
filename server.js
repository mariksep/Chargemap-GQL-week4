"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/stations", require("./routes"));

app.get("/", (req, res) => {
  console.log("get /");
  res.send("Hello to demo node and mongo, try /station route 🔋 🔌 🚗");
});

db.on("connected", () => {
  app.listen(3000, () => {
    console.log("express server started on port 3000");
  });
});
