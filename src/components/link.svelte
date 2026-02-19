<script lang="ts">
  import { router } from "../router.svelte";

  let { href = "", children } = $props();

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    router.navigate(href);
  }
</script>

<a {href} onclick={handleClick}>{@render children()}</a>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
  }
</style>
