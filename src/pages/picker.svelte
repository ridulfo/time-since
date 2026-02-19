<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { dateFormat, dateFormatDatetimeLocale } from "../utils/dateformat";
  import Link from "../components/link.svelte";

  const navigate = useNavigate();

  let datetimeStr = dateFormatDatetimeLocale(new Date());
  let title = "";
  let workHoursMode = false;
  let workdayStart = "08:00";
  let workdayEnd = "16:30";

  const onSubmit = () => {
    const datetime = new Date(datetimeStr);
    const search = new URLSearchParams();
    if (title) search.set("title", title);
    if (workHoursMode) {
      search.set("type", "workhours");
      const startHHMM = workdayStart.replace(":", "");
      const endHHMM = workdayEnd.replace(":", "");
      if (startHHMM !== "0800") search.set("workdaystart", startHHMM);
      if (endHHMM !== "1630") search.set("workdayend", endHHMM);
    }
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
  <label class="checkbox-label">
    <input type="checkbox" bind:checked={workHoursMode} />
    Work hours only
  </label>
  {#if workHoursMode}
    <div class="workhours-inputs">
      <label>
        Start
        <input class="input" type="time" bind:value={workdayStart} />
      </label>
      <label>
        End
        <input class="input" type="time" bind:value={workdayEnd} />
      </label>
    </div>
  {/if}
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

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .workhours-inputs {
    display: flex;
    gap: 1rem;
  }

  .workhours-inputs label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .button {
    background: white;
    border: 1px solid #c4d1eb;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
  }
</style>
