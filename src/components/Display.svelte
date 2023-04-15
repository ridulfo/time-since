<script lang="ts">
  import { formatDuration, secondsSince } from "../date";

  export let startDate: Date;
  export let title: string;
  $: formattedDistance = formatDuration(secondsSince(startDate));
  setInterval(() => {
    formattedDistance = formatDuration(secondsSince(startDate));
  }, 1000);
</script>

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
