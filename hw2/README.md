# HW 2 - D3

### Ensure you have the following for each

1. The well-designed chart
2. Necessary axes, legends for reading the chart
3. Proper titles and text to help guide the viewer (and us) as to what you are trying to show
4. (Can add storytelling components -> adding annotations, highlighting parts of your visualization to make your point stand out)

### Bar Chart

- [ ] You will need to do some data aggregation to distill interesting insights from the data. To receive full credit, do not simply show a single item's value as a bar (e.g., each bar is the temperature of a specific day, and there are as many bars as days/records in the data). Instead, show some form of aggregation (e.g., averages for a month, etc.)
- [ ] As a starting point, take a look at [d3.rollup**Links to an external site.**](https://observablehq.com/@d3/d3-group) (formerly [d3.nest**Links to an external site.**](https://observablehq.com/@d3/d3v6-migration-guide) in v4). It provides a nice approach for you to aggregate data values. Since we did not cover this concept in class, you are not required (but encouraged) to use it. You can use other ways (write a JS function, pre-process the data, etc.) to wrangle your data into proper shape. However, some form of aggregation is required.

### Scatter

- [ ] You will need to choose at least two numeric variables to display. To receive full credit, do not simply put dots on your screen. Instead, experiment with the size, opacity, color, and other encodings of the circles to demonstrate some interesting patterns/trends. Use solid visualization design principles.
- [ ] Again, you have to freedom to manipulate your data by any means that you are comfortable with.

#### Line Chart

- [ ] Line graphs are often used to display temporal/sequential data, so you will likely need to use `d3.timeParse()` and `d3.scaleTime()`. You will need to pick a dataset that has sequential/temporal attributes (e.g., date).
- [ ] Keep a balance between only showing one line vs. showing too many lines that make your graph messy/not insightful. If you are already proficient with JS & D3, we encourage you to try an [area chart**Links to an external site.**](https://d3-graph-gallery.com/area.html), but that’s not required.
