<script lang="ts">
  import Display from "./components/Display.svelte";
  import Picker from "./components/Picker.svelte";

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const startStr = urlParams.get("start");
  const startDate = new Date(parseInt(startStr) * 1000);
</script>

<main>
  <h1>Time since</h1>
  {#if startStr}
    <Display {title} {startDate} />
  {:else}
    <Picker />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.5;
  }
</style>
