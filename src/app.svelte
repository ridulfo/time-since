<script lang="ts">
  import { Route, Router, createHistory } from "svelte-navigator";
  import { createHashSource } from "./hash-history";
  import TotalCalculator from "./pages/total-calculator.svelte";
  import Picker from "./pages/picker.svelte";
  import Display from "./pages/display.svelte";
  import About from "./pages/about.svelte";
  import Corner from "./components/corner.svelte";

  const hashHistory = createHistory(createHashSource());
</script>

<main>
  <Router history={hashHistory}>
    <Route path="/calculator" component={TotalCalculator} />
    <Route path="/about" component={About} />
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
