const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// If run on local machine
// import * as path from "path";
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");

const file = path.join(__dirname, "./data/all-states-history.csv");

const csv = fs.readFileSync(file, "utf-8");

const port = 3001;

app.get("/", (req, res) => {
  res.json(csv);
});

app.listen(port, () => {
  console.log(`This is running on port ${port}`);
});
