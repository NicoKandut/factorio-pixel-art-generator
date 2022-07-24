<script>
  export let title;
</script>

<section>
  <div class="title">
    <span>{title}</span>
    <div class="spacer" />
    <slot name="actions" />
  </div>
  <div class="content">
    <slot name="content" />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    padding: var(--gap);
    background-color: var(--section-color);
    box-shadow: var(--shadow-elevation), var(--shadow-edge);
    contain: strict;
  }

  .title {
    display: flex;
    width: 100%;
    align-items: center;
    gap: var(--spacing-inline);
    height: var(--line-height);
    color: inherit;
    font-size: var(--font-size-title);
    line-height: var(--line-height);
    vertical-align: center;
    color: var(--weird-cream);
    user-select: none;
  }

  .spacer {
    flex-grow: 1;
    background-image: linear-gradient(
      to right,
      var(--riffle-light),
      var(--riffle-light) 2px,
      transparent 2px,
      transparent
    );
    background-size: 4px 100%;
    height: 100%;
    filter: var(--shadow-riffle);
  }

  .content {
    height: 100%;
    background-color: var(--inset-color);
    box-shadow: var(--shadow-cutout);
    padding: var(--gap);
    overflow: hidden;
  }
</style>
