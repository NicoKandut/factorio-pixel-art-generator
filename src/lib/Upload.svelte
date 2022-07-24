<script>
  import { createEventDispatcher } from "svelte/internal";

  const dispatch = createEventDispatcher();

  let input;
</script>

<div on:click={() => input?.click()}>
  <span class="material-icons">upload</span>
  <span class="hint">
    Click here to upload a picture or drag and drop a picture here
  </span>
  <input
    bind:this={input}
    type="file"
    accept="image/*"
    on:change={(e) => {
      /** @type {File | undefined} */
      const file = e.target.files?.[0];
      dispatch("upload", file);
    }}
  />
</div>

<style>
  div {
    cursor: pointer;
    border-radius: 3px;
    border: dashed 2px var(--text-color);
    height: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    opacity: 0.5;
    transition: opacity var(--transition-time) ease-out;
    user-select: none;
  }

  div:hover {
    opacity: 1;
  }

  .material-icons {
    font-size: 4rem;
  }

  .hint {
    text-align: center;
    padding-inline: var(--spacing-grid);
  }

  input {
    display: none;
  }
</style>
