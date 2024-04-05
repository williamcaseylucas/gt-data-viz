# HW 4

### **Design Option 1 - Interactive visualization dashboard (multi-view)**

- [ ] Multiple views and rich interactivity
- [ ] Users can explore and analyze the data from multiple analytical perspectives
- [ ] Number of tasks should be performable

## Notes

- to run .ts
  - npx tsx ./src/getCsvData.ts

#### Points

1. Data: understand your data well
   1. What are the attributes?
   2. What are the relationships among these attributes?
   3. What insights can they provide?
2. Task: think about the kinds of questions someone might have about the data and the kinds of insights they’d want to take away
   from your visualization.
3. Visualization: think about what chart types better suits your data and tasks.
4. Interaction: what types of interactions can help you improve the usability/utility of the dashboard?
5. Layout: the size and arrangement of different views. How do you make different views work together?

#### Goals

- User tasks
  - List how your visualization is supposed to support them (using interaction and visualization components)
  - Map
    - hover with tool tip
    - y: positive (aggregate for month)
      - dims other circles when a single state is selected versus all being selected
  - Line Chart (Time Series View)
    - x: time
    - y: death / recovered visualized by button (per month)
      - can select all states or just one
  - Bar chart (Hospitalization View)
    - x: time
    - y: hospitalizedCurrently with death compared with non dead stacked in (different from recovered, they simply did not pass away that day)
  - Scatter plot (Testing View)
    - Show the relationship between testing and case detection.
    - x: time
    - y: (positive / negative) => totalTestResults
