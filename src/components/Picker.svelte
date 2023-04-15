<script lang="ts">
  import SveltyPicker from "svelty-picker";

  let datetimeStr = "";
  let title = "";
  const onSubmit = () => {
    const datetime = new Date(datetimeStr);
    const params = new URLSearchParams(location.search);
    params.set("start", Math.floor(datetime.getTime() / 1000).toString());
    params.set("title", title);
    location.search = params.toString();
  };
</script>

<div class="picker-container">
  <label for="title">Choose title</label>
  <input id="title" bind:value={title} />
  <label for="datetime">Choose a date</label>
  <SveltyPicker
    format="yyyy-mm-dd hh:ii"
    bind:value={datetimeStr}
    initialDate={new Date()}
  />
  <button on:click={onSubmit}>Submit</button>
</div>

<style>
  .picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
