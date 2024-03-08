<script lang="ts">
  import Line from "./lib/Line.svelte";

  import BarAndScatter from "./lib/BarAndScatter.svelte";
  import Scatter from "./lib/Scatter.svelte";
</script>

<div>
  <div class="card">
    <!-- Drop down color reconfiguration -->
    <h1>Drop down / Color reconfiguration</h1>
    <Line />
  </div>

  <div class="card">
    <!-- Connect / Brushing and Linking (will use Bar and Scatter)-->
    <h1>Connect / Brushing and Linking</h1>
    <BarAndScatter />
  </div>

  <div class="card">
    <!-- Hovering / Clicking -->
    <h1>Hovering / Clicking</h1>
    <Scatter />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
