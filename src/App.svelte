<script lang="ts">
  import { Route, Router, useNavigate } from "svelte-navigator";

  import Display from "./components/Display.svelte";
  import Picker from "./components/Picker.svelte";
  import TotalCalculator from "./components/TotalCalculator.svelte";
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <Router>
    <Route path="/calculator" component={TotalCalculator} />
    <Route path="/" component={Picker} />
    <Route path="/:display" component={Display} />
  </Router>
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
