# HW 4

### **Design Option 1 - Interactive visualization dashboard (multi-view)**

- [ ] Multiple views and rich interactivity
- [ ] Users can explore and analyze the data from multiple analytical perspectives
- [ ] Number of tasks should be performable

## Notes (to self)

- to run .ts
  - npx tsx ./src/getCsvData.ts

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
      - Positive covid cases are directly related to hospitalization, recovery, negative results, and death. All of these factors are heavily interconnected to each other. Those who died from COVID, for example, often were hospitalized in a similar way (which this viz shows with the line plot and scatter plot).
   3. What insights can they provide?
      - Viewers can see proportions of positive COVID cases on the map and then see how the top 10 states with the most COVID cases were effected in regards to death rate, hospitalization, and negative test result rate.
2. Task: think about the kinds of questions someone might have about the data and the kinds of insights they’d want to take away
   from your visualization.
3. Visualization: think about what chart types better suits your data and tasks.
4. Interaction: what types of interactions can help you improve the usability/utility of the dashboard?

   - Map exploration
   - Can span 1 - 10 top states for positive COVID cases
   - Can change month interval
   - Can scope to specific state
   - Can change year
   - Can hover over data to see tooltips and gain richer insights into data
   - Some data has transition effect when month intervals are changed which highlight to the user how the data is changing over time
5. Layout: the size and arrangement of different views. How do you make different views work together?

## For TA

- I am getting my csv data by grabbing it from a backend source, to run these in tandem please do the following
  - cd backend
  - npm install
  - cd ..
  - npm install
  - npm run dev (from root folder)

#### User tasks

* View information about positive COVID cases by state
  * This can be seen in the top toolbar where the aggregate positive, death, and recovery is displayed
* View information as to the top states with the most COVID deaths in the US
  * The line chart lets you visualize the top k states with the most deaths where k is a value between 1 and 10 (anything greater than this made the viz hard to understand)
* View information as to the top states with the most COVID hospitalizations in the US
  * The scatter plot lets you visualize the top k states with the most hospitalizations where k is a value between 1 and 10 (anything greater than this made the viz hard to understand)
* See a breakdown of how positive test results and negative test results compare to each other for the states with the most positive cases
  * The bar chart lets you visualize the top k states with the most positive COVID cases and compares those stats with the negative cases reported where k is a value between 1 and 10 (anything greater than this made the viz hard to understand)
* View COVID statistics for all states
  * The user can use the map and hover over any of the states to see positive covid case statistics for that month
  * They can also select a specific state from the dropdown to be zoomed into the state of interest
  * They can also be rezoomed back to the US as a whole by clicking "All Regions""
* View COVID statistics for the top k (1 - 10) )states based on the metric they are evaluating
  * The user can view a single state by just selecting one from the dropdown
  * The user can also click and drag on the slider to actively change all of the visualizations
* View COVID statistics for a specific state
  * The user can view a single state by just selecting one from the dropdown
  * The user can click and drag the slider to a value of 1 to see the top state relative to the statistic the viz is catered towards.
* View COVID statistics for 2020 or 2021
  * The user can change the year by just selecting 2020 or 2021 from the dropdown
* View more detailed information by hovering over data
  * The map, line plot, bar plot, and scatter plot all have rich tool tips that pop up when the user is hovering.

#### Breakdown of visualizations

- Visualizations
  - List how your visualization is supposed to support them (using interaction and visualization components)
  - General points
    - The user can filter the COVID data by month, year, and then state
    - If the user has "All Regions" selected, the summed aggregate for that month in that selected year is displayed in the top right for all positive cases, deaths, and recoveries from COVID-19
    - The slider is defaulted to a value of 5 and can be dragged to the left or right to select a range from 1 - 10. This slider value directly updates all of the visualizations (except for the map which shows all states). Lets say the slider value is defined as "k", then each visualization except for the map shows the top "k" states with the most deaths, positive vs negative cases (sorted by the states with the most postiive cases), and hospitalization rates
    - Note that some data in this data set was null for certain properties over the span of a whole month. This means some selections of intervals will show no data in some of the visualizations.
  - Map
    - hover with tool tip
    - y: positive (aggregate for month)

      - dims other circles when a single state is selected versus all being selected
    - ## What its supposed to do


      - When the viewer is viewing "All Regions", they will see a wholsitic view of the United States
      - When a bubble is hovered over, a tooltip appears showing the positive cases for that state (and the bubble is proportional to this value)
      - When the user changes from "All Regions" to a specific state, the map zooms into that particular state.
      - When the user selects "All Regions" after being zoomed in, they get zoomed out again.
  - Line Chart (Time Series View)
    - x: time
    - y: death / recovered visualized by button (per month)

      - can select all states or just one
    - go from May to June in 2020 with all selected regions to see transitions occur
    - or select one of the regions that are already shown to see transition
    - ## What its supposed to do


      - Shows the top k states of death rates from COVID for that given month and year
      - Has a tooltip showing detailed information
      - Colors are color coordinated with legend
  - Bar chart (Hospitalization View)
    - x: time
    - y: hospitalizedCurrently with death compared with non dead stacked in (different from recovered, they simply did not pass away that day)
    - ## What its supposed to do

      - Shows the top k states of positive covid cases and the positive vs negative testing rates for that given month and year are proportional to each other
      - Has a tooltip showing detailed information
      - Colors are color coordinated with legend
  - Scatter plot (Testing View)
    - Show the relationship between testing and case detection.
    - x: time
    - y: (positive / negative) => totalTestResults
    - ## What its supposed to do

      - Shows the top k states of hospitalization rates for that given month and year
      - Has a tooltip showing detailed information
      - Colors are color coordinated with legend
