<script lang="ts">
  import { link, useNavigate } from "svelte-navigator";
  const navigate = useNavigate();
  export let href = "";
</script>

<a use:link={navigate} {href}><slot /></a>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
  }
</style>
