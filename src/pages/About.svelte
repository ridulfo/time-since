<script lang="ts">
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1 on:click={() => navigate("/")}>Time since</h1>
<content>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h2>About</h2>
  <p>
    Welcome to our website, where time is not just a concept but a tangible
    entity waiting to be explored. Our website offers a REST API that allows you
    to delve into the mysteries of time by inputting a date and search
    parameters. Once you do, you can visualize the time since or until that date
    in various ways, unlocking the secrets of the past, present, and future all
    in one place.
  </p>
  <h3>Usage</h3>
  <h4>Default</h4>
  <code>/20230422-161300</code><br />
  will visualize the time since that date in seconds. The date is formatted as YYYYMMDD-HHMMSS.
  <h4>End date</h4>
  <code>/20230422-161300?end=20230422-171300</code><br />
  will return the time since the end date; 1h.
  <h4>Coming soon (?)</h4>
  <code>/20230422-161300?type=workhours</code><br />
  will return the time since that date, but only count the work hours.<br /><br
  />
  <code
    >/20230422-161300?type=workhours & workdaystart=0800 & workdayend=1600</code
  ><br />
  Optionally, you can specify the start of the work day. The default is 0800 and
  1630. will return the time since that date, but only count the work hours
</content>

<style>
  content {
    max-width: 500px;
    padding: 30px;
  }
</style>
