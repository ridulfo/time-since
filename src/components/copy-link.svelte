<script lang="ts">
  let { text, url } = $props<{ text: string; url: string }>();

  let hasCopied = $state(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    hasCopied = true;
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<a onclick={copyUrl}>
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
