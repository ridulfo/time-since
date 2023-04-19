<script lang="ts">
  import { formatDuration, secondsSince } from "../date";
  import CopyLink from "./CopyLink.svelte";

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const startStr = urlParams.get("start");
  const startDate = new Date(parseInt(startStr) * 1000);
  const type = urlParams.get("type") === "workhours" ? "workHours" : "all";
  const workHoursStart = urlParams.get("workHoursStart");
  const workHoursEnd = urlParams.get("workHoursEnd");
  const hasWorkHours = workHoursStart && workHoursEnd;

  $: seconds = secondsSince(
    startDate,
    hasWorkHours ? { start: workHoursStart, end: workHoursEnd } : undefined
  );
  $: formattedDistance = formatDuration(seconds);
  $: window.document.title = formattedDistance;

  setInterval(() => {
    seconds = secondsSince(
      startDate,
      hasWorkHours ? { start: workHoursStart, end: workHoursEnd } : undefined
    );
  }, 750);
  $: hasCopied = false;
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    hasCopied = true;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => (window.location.hash = "")}>
  {#if seconds > 0}
    {type === "all" ? "Time" : "Work hours"} <u>since</u>
  {:else}
    {type === "all" ? "Time" : "Work hours"} <u>until</u>
  {/if}
</h1>
{#if title}
  <h4>{title}</h4>
{/if}
<h3>
  {formattedDistance}
</h3>
<span>
  <CopyLink text="copy url" url={window.location.href} />
  &nbsp;|&nbsp;
  <a href="/">reset</a>
</span>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
  }
  h4 {
    margin: 0;
  }
</style>
