<script lang="ts">
  import SveltyPicker from "svelty-picker";

  let datetimeStr = "";
  let title = "";
  let workHours = false;
  const onSubmit = () => {
    const datetime = new Date(datetimeStr);
    const params = new URLSearchParams();
    params.set("start", Math.floor(datetime.getTime() / 1000).toString());
    params.set("title", title);
    if (workHours) params.set("type", "workhours");
    window.location.hash = `display`; // This needs to be set before the search params
    window.location.search = params.toString();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => (window.location.hash = "calculator")}>Time since</h1>
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
