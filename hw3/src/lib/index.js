export const bar_margin = { top: 30, right: 30, bottom: 70, left: 60 },
  bar_width = 1000 - bar_margin.left - bar_margin.right,
  bar_height = 350 - bar_margin.top - bar_margin.bottom;

export const scatter_margin = { top: 30, right: 30, bottom: 70, left: 60 },
  scatter_width = 1000 - scatter_margin.left - scatter_margin.right,
  scatter_height = 550 - scatter_margin.top - scatter_margin.bottom;

export const line_margin = { top: 30, right: 30, bottom: 70, left: 60 },
  // 1000 - line_margin.left - line_margin.right
  line_width = 800,
  line_height = 550 - line_margin.top - line_margin.bottom;

import { writable } from "svelte/store";
export const states_of_interest = writable();
