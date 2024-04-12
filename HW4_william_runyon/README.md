# HW 4

### **Design Option 1 - Interactive visualization dashboard (multi-view)**

- [ ] Multiple views and rich interactivity
- [ ] Users can explore and analyze the data from multiple analytical perspectives
- [ ] Number of tasks should be performable

## Notes (for self)

- to run .ts
  - npx tsx ./src/getCsvData.ts

## TODO

- [ ] update state name with each chart
- [ ] add x and y label to each chart
- [ ] finish README doc

## For TA

- I am getting my csv data by grabbing it from a backend source, to run these in tandem please do the following
  - cd backend
  - npm install
  - cd ..
  - npm install
  - npm run dev (from root folder)

#### Points

1. Data: understand your data well
   1. What are the attributes?
   - The attributes used in this project consist of
     - For the top tool bar that shows positive, died, and recovered
       - recovered
       - deathIncrease
       - positiveIncrease
     - The map
       - latitude and longitude of each state (supplemented by scraping web page online)
       - positiveIncrease
       - state
     - The line chart
       - deathIncrease
       - date
       - state (for grouping)
     - The bar chart
       - positiveIncrease
       - negativeIncrease
       - positiveSum (generated value)
       - negativeSum (generated value)
       - state (for grouping)
     - The scatter plot
       - hospitalizedCurrently
       - state (for grouping)
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
    - go from May to June in 2020 with all selected regions to see transitions occur
    - or select one of the regions that are already shown to see transition
  - Bar chart (Hospitalization View)
    - x: time
    - y: hospitalizedCurrently with death compared with non dead stacked in (different from recovered, they simply did not pass away that day)
  - Scatter plot (Testing View)
    - Show the relationship between testing and case detection.
    - x: time
    - y: (positive / negative) => totalTestResults

### AR -> Mar -> 2020 -> Regions
