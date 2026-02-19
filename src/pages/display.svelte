<script lang="ts">
  import { router } from "../router.svelte";
  import CopyLink from "../components/copy-link.svelte";
  import Link from "../components/link.svelte";
  import { distance, workingDistance } from "../utils/date";
  import {
    dateFormat,
    dateFromFormat,
    formatDuration,
    parseHHMM,
  } from "../utils/dateformat";

  const instant = $derived(dateFromFormat(router.params.time || ""));

  const search = $derived(new URLSearchParams(router.search));
  const title = $derived(search.get("title"));
  const to = $derived(search.get("to"));
  const splits = $derived(search.getAll("splits"));
  const type = $derived(search.get("type"));
  const isPaused = $derived(to !== null);

  const getSeconds = () => {
    const toDate = to ? dateFromFormat(to) : undefined;
    const parsedSplits = splits?.map((s) => dateFromFormat(s));
    if (type === "workhours") {
      const startMinutes = search.get("workdaystart") ? parseHHMM(search.get("workdaystart")!) : 480;
      const endMinutes = search.get("workdayend") ? parseHHMM(search.get("workdayend")!) : 990;
      return workingDistance(instant, toDate, parsedSplits, { startMinutes, endMinutes });
    }
    return distance(instant, toDate, parsedSplits);
  };

  let seconds = $state(getSeconds());
  const formattedDistance = $derived(formatDuration(seconds));

  $effect(() => {
    window.document.title = formattedDistance;
  });

  setInterval(() => (seconds = getSeconds()), 500);

  const pauseResume = () => {
    const path = router.path;
    const currentSearch = new URLSearchParams(router.search);
    // Pause
    if (!currentSearch.get("to")) {
      currentSearch.set("to", dateFormat(new Date()));
      router.navigate(`${path}?${currentSearch.toString()}`);
      return;
    }
    // Resume
    currentSearch.append("splits", currentSearch.get("to")!);
    currentSearch.append("splits", dateFormat(new Date()));
    currentSearch.delete("to");
    router.navigate(`${path}?${currentSearch.toString()}`);
  };

  const header = $derived(`Time <u>${seconds < 0 ? "since" : "until"}</u>`);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<h1 onclick={() => (window.location.href = "/")}>
  {@html header}
</h1>
{#if title}
  <h2>{title}</h2>
{/if}
<div class="distance">
  <svg preserveAspectRatio="none" viewBox="0 0 115 30" width="100%">
      <text x="0" y="50%" textLength="115" lengthAdjust="spacing">
      {formattedDistance}
    </text>
  </svg>
</div>
<span class="controls">
  <CopyLink text="copy url" url={window.location.href} />
  &nbsp;|&nbsp;
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span onclick={pauseResume}>
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
  h1 {
    font-size: min(48px, 5vw);
    margin: 10% 0 5px 0;
  }
  h2 {
    font-weight: 600;
    font-size: min(92px, 10vw);
    margin: min(40px, -2vw) 0 0 0;
  }
  .distance {
    font-weight: 800;
    width: 90dvw;
    display: flex;
    justify-content: center;
  }
  .controls {
    color: #9a9a9a;
    font-size: small;
    cursor: pointer;
  }
</style>
