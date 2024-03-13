<script lang="ts">
  import Line from "./lib/Line.svelte";
  import BarAndScatter from "./lib/BarAndScatter.svelte";
  import Scatter from "./lib/Scatter.svelte";
</script>

<svelte:head>
  <title>Info Viz - HW3</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<div class="main">
  <div class="card">
    <!-- Drop down color reconfiguration -->
    <h1>Drop down / Color reconfiguration</h1>
    <Line dropDown={true} useStore={false} />
    <p>
      By clicking the dropdown to the side, you can change which data property
      is displayed for California, Colorado, Florida, Georgia, and Indiana. You
      can see which datum is being represented by the column name
    </p>
  </div>

  <div class="card">
    <!-- Connect / Brushing and Linking (will use Bar and Scatter)-->
    <h1>Connect / Brushing and Linking</h1>
    <BarAndScatter />
    <p>
      When you click and drag across the brush for the bar chart, you can change
      what is displayed in the line chart on the side. You can just to just see
      statistics for total crime rate for one state, a few states, or all states
      based on the width of the brush.
    </p>
  </div>

  <div class="card">
    <!-- Hovering / Clicking -->
    <h1>Hovering / Clicking</h1>
    <Scatter />
    <p>
      When you hover over a datum, you will see a tooltip detailing the
      population and year for that specific point.
    </p>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  p {
    font-size: 1.5rem;
  }
</style>
