<script lang="ts">
  import { router } from "./router.svelte";
  import TotalCalculator from "./pages/total-calculator.svelte";
  import Picker from "./pages/picker.svelte";
  import Display from "./pages/display.svelte";
  import About from "./pages/about.svelte";
  import Corner from "./components/corner.svelte";

  const routes = [
    { path: "/", component: Picker },
    { path: "/calculator", component: TotalCalculator },
    { path: "/about", component: About },
    { path: "/:time", component: Display },
  ];

  router.registerRoutes(routes);

  let CurrentComponent = $derived(router.getComponent(routes) || Picker);
</script>

<main>
  <CurrentComponent />
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
