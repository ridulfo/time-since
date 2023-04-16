<script lang="ts">
  import { formatDuration, secondsSince } from "../date";
  import CopyLink from "./CopyLink.svelte";

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const startStr = urlParams.get("start");
  const startDate = new Date(parseInt(startStr) * 1000);
  $: seconds = secondsSince(startDate);
  $: formattedDistance = formatDuration(seconds);
  $: window.document.title = formattedDistance;
  setInterval(() => {
    seconds = secondsSince(startDate);
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
