import * as d3 from "d3";
import { CSVTypes } from "./interfaces";
import { csv_data_as_json } from "./data/csv_data";

const getData = async () => {
  // const res = await fetch("http://localhost:3001");
  // const csv = await res.text();

  // const data = d3.csvParse(
  //   csv,
  //   (row) =>
  //     <CSVTypes>{
  //       ...d3.autoType(row),
  //     }
  // );

  const data = d3.csvParse(
    csv_data_as_json.data,
    (row) =>
      <CSVTypes>{
        ...d3.autoType(row),
      }
  );

  return data;
};

const csv_data = getData();
export default csv_data;
