import * as d3 from "d3";
import { CSVTypes } from "./interfaces";

const getData = async () => {
  const file = await fetch("http://localhost:3001");
  const csv = await file.json();

  // const csv = fs.readFileSync(file, "utf-8");
  const data = d3.csvParse(
    csv,
    (row) =>
      <CSVTypes>{
        ...d3.autoType(row),
      }
  );

  return data;
};

const data = getData();

export default data;
