<script lang="ts">
  import { formatDuration, secondsSince } from "../date";
  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const startStr = urlParams.get("start");
  const startDate = new Date(parseInt(startStr) * 1000);

  $: formattedDistance = formatDuration(secondsSince(startDate));
  setInterval(() => {
    formattedDistance = formatDuration(secondsSince(startDate));
  }, 1000);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => navigate("/calculator")}>Time since</h1>
{#if title}
  <h3>{title}</h3>
{/if}
<p>
  {formattedDistance}
</p>
<a href="/">Reset</a>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
  }
  h3 {
    margin-bottom: 0;
  }
</style>
