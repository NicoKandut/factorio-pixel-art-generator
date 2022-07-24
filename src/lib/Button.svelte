<script>
  import { createEventDispatcher } from "svelte";

  export let icon;
  export let title;

  const dispatch = createEventDispatcher();
</script>

<button {title} class="material-icons" on:click={() => dispatch("click")}>
  {icon}
</button>

<style>
  button {
    font-size: 16px;
    height: 24px;
    width: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0;
    color: white;
    background-color: var(--section-color);
    border: none;
    box-shadow: var(--shadow-edge);

    transition: background-color var(--transition-time) cubic-bezier();
  }

  button:hover {
    background-color: var(--section-color-hover);
  }

  button:active {
    background-color: var(--section-color-active);
  }
</style>
