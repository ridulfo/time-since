<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import SveltyPicker from "svelty-picker";
  import { dateFormat } from "../date";

  const navigate = useNavigate();

  let datetimeStr = "";
  let title = "";
  let workHours = false;
  let workHoursStart = "";
  let workHoursEnd = "";
  const onSubmit = () => {
    const datetime = new Date(datetimeStr);
    const search = new URLSearchParams();
    if (title) search.set("title", title);
    if (workHours) search.set("type", "workhours");
    if (workHoursStart) search.set("workHoursStart", workHoursStart);
    if (workHoursEnd) search.set("workHoursEnd", workHoursEnd);
    navigate(`/${dateFormat(datetime)}?${search.toString()}`);
  };
  const defaultStartWorkHours = new Date();
  defaultStartWorkHours.setHours(8, 0, 0, 0);
  const defaultEndWorkHours = new Date();
  defaultEndWorkHours.setHours(16, 30, 0, 0);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => navigate("calculator")}>Time since</h1>
<div class="picker-container">
  <label for="title">Choose title</label>
  <input id="title" bind:value={title} />
  <label for="datetime">Choose a date</label>
  <SveltyPicker
    format="yyyy-mm-dd hh:ii"
    bind:value={datetimeStr}
    initialDate={new Date()}
  />
  <span>
    <label for="workHours">Work hours only</label>
    <input type="checkbox" bind:checked={workHours} />
  </span>
  {#if workHours}
    <i class="tip">Only works for future dates at the moment</i>

    <label for="workHoursStart">Work hours start</label>
    <SveltyPicker
      format="hh:ii"
      bind:value={workHoursStart}
      initialDate={defaultStartWorkHours}
    />
    <label for="workHoursEnd">Work hours end</label>
    <SveltyPicker
      format="hh:ii"
      bind:value={workHoursEnd}
      initialDate={defaultEndWorkHours}
    />
  {/if}
  <button on:click={onSubmit}>Go!</button>
  <i class="tip">By the way, click title to get to the calculator</i>
</div>

<style>
  .picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .tip {
    font-size: xx-small;
    color: #666;
  }
</style>
