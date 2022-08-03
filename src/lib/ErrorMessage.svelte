<script>
  import Button from "./Button.svelte";
  import Section from "./Section.svelte";

  /** @type {Error} */
  export let error;

  /** @type {HTMLDialogElement}*/
  let dialog;

  $: title = error?.name;
  $: message = error?.message;

  $: {
    if (dialog !== undefined) {
      if (error !== undefined) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }
</script>

<dialog bind:this={dialog}>
  <Section {title}>
    <Button
      slot="actions"
      title="Close"
      icon="clear"
      on:click={() => {
        dialog.close()
      }}
    />
    <span slot="content">
      {message}
    </span>
  </Section>
</dialog>

<style>
  dialog {
    padding: unset;
    border: unset;
    height: auto;
    height: 20vh;
    width: 30vw;
    color: var(--text-color);
  }

  dialog::backdrop {
    background-color: black;
    opacity: 0.5;
  }
</style>
