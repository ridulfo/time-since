<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { dateFormat, dateFormatDatetimeLocale } from "../utils/dateformat";
  import Link from "../components/link.svelte";

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
  <input class="input" id="title" bind:value={title} />
  <label for="datetime">Choose a date and time</label>
  <div style="display: flex; gap: 1rem;">
    <input
      class="input"
      type="datetime-local"
      id="datetime"
      bind:value={datetimeStr}
    />
    <button
      class="button"
      on:click={() => (datetimeStr = dateFormatDatetimeLocale(new Date()))}
    >
      Now
    </button>
  </div>
  <button class="button" on:click={onSubmit}>Go!</button>
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

  .input {
    padding: 5px 10px;
    width: 100%;
    outline: none;
    background: #ffffff;
    color: #000000;
    border: 1px solid #c4d1eb;
    border-radius: 5px;
    box-shadow: 3px 3px 2px 0px #e2e2e2;
    transition: 0.3s ease;
  }

  input:focus {
    background: #f2f2f2;
    border: 1px solid #5a7ec7;
    border-radius: 10px;
  }

  .button {
    background: white;
    border: 1px solid #c4d1eb;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
  }
</style>
