<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import SveltyPicker from "svelty-picker";
  import { dateFormat } from "../utils/dateformat";
  import Link from "../components/Link.svelte";
  import Tip from "../components/Tip.svelte";

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
<h1>Time since</h1>
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
</div>

<span>
  <Link href="/about">About</Link>
  &nbsp;|&nbsp;
  <Link href="/calculator">Calculator</Link>
</span>

<style>
  .picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  span {
    margin-top: 1rem;
  }
</style>
