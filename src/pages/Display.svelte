<script lang="ts">
  import { useLocation, useNavigate, useParams } from "svelte-navigator";
  import CopyLink from "../components/CopyLink.svelte";
  import Link from "../components/Link.svelte";
  import { distance } from "../utils/date";
  import {
    dateFormat,
    dateFromFormat,
    formatDuration,
  } from "../utils/dateformat";

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ time: string }>();

  const instant = dateFromFormat($params.time);

  let title, to, splits: string[], formattedDistance, isPaused;
  $: {
    const search = new URLSearchParams($location.search);
    title = search.get("title");
    to = search.get("to");
    splits = search.getAll("splits");
    isPaused = to !== null;
  }
  const getSeconds = () => {
    const toDate = to ? dateFromFormat(to) : undefined;
    const parsedSplits = splits?.map((s) => dateFromFormat(s));
    return distance(instant, toDate, parsedSplits);
  };

  let seconds = getSeconds();
  $: {
    formattedDistance = formatDuration(seconds);
    window.document.title = formattedDistance;
  }

  setInterval(() => (seconds = getSeconds()), 500);

  const pauseResume = () => {
    const path = $location.pathname;
    const search = new URLSearchParams($location.search);
    // Pause
    if (!search.get("to")) {
      search.set("to", dateFormat(new Date()));
      navigate(`${path}?${search.toString()}`);
      return;
    }
    // Next pauses
    search.append("splits", search.get("to"));
    search.append("splits", dateFormat(new Date()));
    search.delete("to");
    navigate(`${path}?${search.toString()}`);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => (window.location.href = "/")}>
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
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={pauseResume}>
    <u>
      {#if isPaused}
        resume
      {:else}
        pause
      {/if}
    </u>
  </span>
  &nbsp;|&nbsp;
  <Link href="/">reset</Link>
</span>

<style>
  h4 {
    margin: 0;
  }
  span {
    color: #9a9a9a;
    font-size: small;
    cursor: pointer;
  }
</style>
