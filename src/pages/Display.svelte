<script lang="ts">
  import { useLocation, useNavigate, useParams } from "svelte-navigator";
  import CopyLink from "../components/CopyLink.svelte";
  import Link from "../components/Link.svelte";
  import { distance } from "../utils/date";
  import { dateFromFormat, formatDuration } from "../utils/dateformat";

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ time: string }>();

  const instant = dateFromFormat($params.time);

  const search = new URLSearchParams($location.search);
  const title = search.get("title");

  $: seconds = distance(instant);
  $: formattedDistance = formatDuration(seconds);
  $: window.document.title = formattedDistance;

  setInterval(() => {
    seconds = distance(instant);
  }, 750);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => navigate("/")}>
  Time
  {#if seconds < 0}
    <u>since</u>
  {:else}
    <u>until</u>
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
  <Link href="/">reset</Link>
</span>

<style>
  h4 {
    margin: 0;
  }
</style>
