import * as d3 from "d3";
import { CSVTypes } from "./interfaces";

const getData = async () => {
  const res = await fetch("http://localhost:3001");
  const csv = await res.text();

  const data = d3.csvParse(
    csv,
    (row) =>
      <CSVTypes>{
        ...d3.autoType(row),
      }
  );

  return data;
};

const csv_data = getData();
export default csv_data;
