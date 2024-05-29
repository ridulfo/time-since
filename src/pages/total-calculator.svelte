<script lang="ts">
  import { link, useNavigate } from "svelte-navigator";

  let text = "";
  $: total = "0";

  const onInput = () => {
    // Limit each line to 9 characters
    text = text
      .split("\n")
      .map((line) => (line.length > 9 ? line.substring(0, 9) : line))
      .join("\n");
    total = calcTotal() || "0";
  };

  const calcTotal = () => {
    try {
      const lines = text.split("\n");
      const times = lines.map((line) => {
        if (line.length !== 9) return 0;
        const [start, end] = line.split(" ");
        const startHour = parseInt(start.substring(0, 2));
        const startMinute = parseInt(start.substring(2, 4));
        const endHour = parseInt(end.substring(0, 2));
        const endMinute = parseInt(end.substring(2, 4));
        return (endHour - startHour) * 60 + (endMinute - startMinute);
      });
      const total = times.reduce((a, b) => a + b, 0);
      const hours = Math.floor(total / 60);
      const minutes = total % 60;
      if (total < 0) throw new Error("Invalid time range");
      return `${hours} hours and ${minutes} minutes`;
    } catch (error) {}
  };
  const navigate = useNavigate();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => navigate("/")}>Time since</h1>
<p>
  Enter times in the format <code>HHMM HHMM</code>
</p>
<textarea
  bind:value={text}
  on:input={onInput}
  cols="8"
  rows="10"
  wrap="hard"
  placeholder="1000 1200
.
.
.
1800 1900"
/>
<p>Total Time: {total}</p>

<style>
  textarea {
    resize: none;
    font-family: monospace;
    font-size: large;
    text-align: center;
  }
</style>
