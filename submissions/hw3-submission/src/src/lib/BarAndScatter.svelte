<script lang="ts">
  import Bar from "./Bar.svelte";
  import Line from "./Line.svelte";
</script>

<div>
  <Bar />
  <Line dropDown={false} useStore={true}/>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
