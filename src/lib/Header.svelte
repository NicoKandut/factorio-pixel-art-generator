<header>
  <h1>Factorio Pixel Art Generator</h1>
  <span class="version">v1.0.0</span>
  <a
    title="Changelog"
    class="material-icons"
    href="https://github.com/NicoKandut/factorio-solar-art/blob/main/CHANGELOG.md"
    target="_newtab">feed</a
  >
  <a
    title="Github Repository"
    class="material-icons"
    href="https://github.com/NicoKandut/factorio-pixel-art-generator"
    target="_newtab"
  >
    <svg
      height="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      data-view-component="true"
      style={"fill: currentcolor; minWidth: 16px;"}
    >
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg></a
  >
  <a
    title="Discord Server"
    class="material-icons"
    href="https://discord.gg/jPf45KS54t"
    target="_newtab">discord</a
  >
  <a
    title="Solar Art Generator"
    href="https://nicokandut.github.io/factorio-solar-art/"
    target="_newtab"
  >
    <img src="/solar_panel.png" alt="Solar Art Generator" />
  </a>
</header>

<style>
  header {
    grid-area: 1/1/2/3;
    display: flex;
    align-items: center;
    gap: var(--spacing-grid);
  }

  h1 {
    margin: 0;
    font-weight: normal;
  }

  .version {
    flex-grow: 1;
    opacity: 0.5;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    height: 24px;
    width: 24px;
    line-height: 24px;
    text-align: center;
    color: white;
    background-color: var(--section-color);
    transition: filter var(--transition-time) ease-out;
    box-shadow: var(--shadow-edge);
  }

  img {
    height: 16px;
    width: 16px;
  }
</style>
