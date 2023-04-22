<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import SveltyPicker from "svelty-picker";
  import { dateFormat } from "../utils/dateformat";

  const navigate = useNavigate();

  let datetimeStr = "";
  let title = "";
  const onSubmit = () => {
    const datetime = new Date(datetimeStr);
    const search = new URLSearchParams();
    if (title) search.set("title", title);
    navigate(`/${dateFormat(datetime)}?${search.toString()}`);
  };
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
