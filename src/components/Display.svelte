<script lang="ts">
  import { formatDuration, secondsSince } from "../date";

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const startStr = urlParams.get("start");
  const startDate = new Date(parseInt(startStr) * 1000);
  $: seconds = secondsSince(startDate);
  $: formattedDistance = formatDuration(seconds);
  setInterval(() => {
    seconds = secondsSince(startDate);
  }, 750);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => (window.location.hash = "")}>
  {#if seconds > 0}
    Time <u>since</u>
  {:else}
    Time <u>until</u>
  {/if}
</h1>
{#if title}
  <h4>{title}</h4>
{/if}
<h3>
  {formattedDistance}
</h3>
<a href="/">Reset</a>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
  }
  h4 {
    margin: 0;
  }
</style>
