<script lang="ts">
  export let text;
  export let url;
  $: hasCopied = false;
  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    hasCopied = true;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<a on:click={copyUrl}>
  {#if hasCopied}
    copied!
  {:else}
    {text}
  {/if}
</a>

<style>
  a {
    color: #9a9a9a;
    font-size: small;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
