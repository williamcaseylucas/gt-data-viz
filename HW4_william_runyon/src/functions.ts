import * as d3 from "d3";

export const getKStates = (k, filtered_array, original_array) => {
  let sorted_counts = d3.sort(filtered_array, (row) => row[1]);
  const data_by_state = [];

  let top_k_states = new Set();
  sorted_counts
    .slice(1)
    .slice(-k)
    .forEach((val, _) => top_k_states.add(val[0]));
  // console.log("get_k_states", sorted_counts);

  let i = 0;
  const states_to_index = {};
  top_k_states.forEach((state) => {
    // @ts-ignore
    states_to_index[state] = i;
    i += 1;
  });

  // console.log('top_10_states', top_10_states);
  // @ts-ignore
  original_array.forEach((vals, state) => {
    if (top_k_states.has(state)) {
      data_by_state.push([state, vals]);
    }
  });

  return data_by_state;
};
