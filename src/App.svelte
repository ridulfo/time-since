<script lang="ts">
  import { Router, Route, Link, createHistory } from "svelte-navigator";

  import { onMount } from "svelte";
  import Display from "./components/Display.svelte";
  import Picker from "./components/Picker.svelte";
  import TotalCalculator from "./components/TotalCalculator.svelte";
  import Corner from "./components/Corner.svelte";
  import { createHashSource } from "./hash-history";
  let hash = window.location.hash;

  const hashHistory = createHistory(createHashSource());
</script>

<main>
  <Router history={hashHistory}>
    <Route path="/calculator" component={TotalCalculator} />
    <Route path="/" component={Picker} />
    <Route path="/:time" component={Display} />
  </Router>
</main>
<Corner />

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
