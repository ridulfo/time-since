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
  <h4>To date</h4>
  <code>/20230422-161300?to=20230422-171300</code><br />
  will return the time since the to date; 1h.
  <h4>Splits</h4>
  <code>/20230423-084900 ? splits=20230423-085000 & splits=20230423-085010</code
  ><br />
  Adding splits allows you to "pause" the counter. In this example, the counter will
  have started at 08:49, ran for 1 minute, and then paused for 10 seconds. The counter
  will now be counting up.
  <h4>Work hours</h4>
  <code>/20230422-161300?type=workhours</code><br />
  will return the time since that date, but only count working hours (weekdays,
  08:00–16:30 by default).<br /><br />
  <code
    >/20230422-161300?type=workhours&workdaystart=0900&workdayend=1700</code
  ><br />
  Optionally, you can specify the start and end of the work day. The default is
  0800 and 1630.
</content>

<style>
  content {
    max-width: 500px;
    padding: 30px;
  }
</style>
