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
<h1 on:click={() => navigate("/")}>Time since</h1>
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
