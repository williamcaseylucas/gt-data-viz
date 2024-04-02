import * as d3 from "d3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const res = [];
const file = path.join(
  fileURLToPath(import.meta.url),
  "../data/all-states-history.csv"
);

const csv = fs.readFileSync(file, "utf-8");
const data = d3.csvParse(csv);

console.log("data", data);
