<script lang="ts">
  import { onMount } from "svelte";
  import Display from "./components/Display.svelte";
  import Picker from "./components/Picker.svelte";
  import TotalCalculator from "./components/TotalCalculator.svelte";
  let hash = window.location.hash;

  // Reactive hash change
  onMount(() => {
    const handleHashChange = (event) => {
      hash = window.location.hash;
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  });
</script>

<main>
  {#if hash === "#calculator"}
    <TotalCalculator />
  {:else if hash === "#display"}
    <Display />
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
