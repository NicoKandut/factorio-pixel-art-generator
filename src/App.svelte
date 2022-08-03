<script>
  import Button from "./lib/Button.svelte";
  import ErrorMessage from "./lib/ErrorMessage.svelte";
  import Header from "./lib/Header.svelte";
  import Section from "./lib/Section.svelte";
  import Upload from "./lib/Upload.svelte";

  /** @type {any} */
  let module;

  /** @type {File | undefined} */
  let file;

  /** @type {string | undefined} */
  let previewUrl;

  /** @type {string | undefined} */
  let importString;

  const TILES_PER_PIXEL = 1;

  /** @type {(in_ptr: number,out_ptr: number, width: number, height: number, tiles_per_pixel: number, mode: number) => string}*/
  let process;

  /** @type {Error} */
  let error;

  /** @type {number} */
  let mode;

  const MODE = {
    GRAYSCALE: 0,
    COLORED: 1,
  };

  async function initModule() {
    const res = await fetch("./out.js");
    const blob = await res.blob();
    const code = await blob.text();
    module = await Function(
      '"use strict"; ' + code.replace("var Module = ", "return")
    )()();
    process = module.cwrap("process", "string", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);

    window.module = module;
  }

  initModule();

  /**
   * @param {File} from
   */
  async function processFile(from) {
    performance.mark("start");

    let buffer_from;
    let buffer_to;

    try {
      const img = await createImageBitmap(from);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      buffer_from = module._create_buffer(img.width, img.height);
      buffer_to = module._create_buffer(
        img.width * TILES_PER_PIXEL,
        img.height * TILES_PER_PIXEL
      );

      module.HEAP8.set(imageData.data, buffer_from);

      performance.mark("proc-start");
      importString = process(
        buffer_from,
        buffer_to,
        img.width,
        img.height,
        TILES_PER_PIXEL,
        mode
      );
      performance.mark("proc-end");

      const canvas2 = document.createElement("canvas");
      const ctx2 = canvas2.getContext("2d");

      canvas2.width = img.width * TILES_PER_PIXEL;
      canvas2.height = img.height * TILES_PER_PIXEL;

      const data = module.HEAPU8.subarray(
        buffer_to,
        buffer_to + canvas2.width * canvas2.height * 4
      );
      const previewData = ctx2.createImageData(
        img.width * TILES_PER_PIXEL,
        img.height * TILES_PER_PIXEL
      );
      previewData.data.set(data);
      ctx2.putImageData(previewData, 0, 0);

      previewUrl = canvas2.toDataURL("image/png");

      performance.mark("end");

      printPerformanceStatistics();
    } catch (e) {
      error = e;
    } finally {
      module._destroy_buffer(buffer_from);
      module._destroy_buffer(buffer_to);
    }
  }

  $: {
    if (file) {
      processFile(file);
      mode = mode;
    }
  }

  async function copy() {
    // todo: guard this with capability check
    if (importString === undefined) {
      return;
    }

    try {
      await navigator.clipboard.writeText(importString);
    } catch (e) {
      console.error("Unexpected error while copying:", e);
    }
  }

  async function download() {
    // todo: guard this with capability check
    if (importString === undefined) {
      return;
    }

    const fileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
      suggestedName: "generated blueprint",
    });

    const writableStream = await fileHandle.createWritable();
    await writableStream.write(importString);
    await writableStream.close();
  }

  function printPerformanceStatistics() {
    const totalTime = performance
      .measure("total time", "start", "end")
      .duration.toFixed(0);
    const prepTime = performance
      .measure("preparation time", "start", "proc-start")
      .duration.toFixed(0);
    const procTime = performance
      .measure("processing time", "proc-start", "proc-end")
      .duration.toFixed(0);
    const endTime = performance
      .measure("processing time", "proc-end", "end")
      .duration.toFixed(0);

    const label = `[js] Done. Took ${totalTime} ms total.`;
    console.group(label);
    console.info("Preparation", prepTime, "ms");
    console.info("Processing", procTime, "ms");
    console.info("End", endTime, "ms");
    console.groupEnd();
  }
</script>

<main>
  <Header />
  <Section title="Settings">
    <div slot="content">
      <label>
        <span>Mode</span>
        <select bind:value={mode}>
          <option value={MODE.GRAYSCALE}>Grayscale</option>
          <option value={MODE.COLORED}>[MOD] Concrete Tints</option>
        </select>
      </label>
    </div>
  </Section>
  <Section title="Source">
    <svelte:fragment slot="actions">
      {#if file !== undefined}
        <Button
          title="Clear"
          icon="clear"
          on:click={() => {
            file = undefined;
            previewUrl = undefined;
          }}
        />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="content">
      {#if file === undefined}
        <Upload
          on:upload={(e) => {
            file = e.detail;
          }}
        />
      {:else}
        <img src={URL.createObjectURL(file)} alt={file.name} />
      {/if}
    </svelte:fragment>
  </Section>
  <Section title="Preview">
    <svelte:fragment slot="actions">
      {#if previewUrl}
        <Button
          title="Copy blueprint to clipboard"
          icon="content_copy"
          on:click={copy}
        />
        <Button
          title="Download Blueprint"
          icon="download"
          on:click={download}
        />
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="content">
      {#if previewUrl}
        <img src={previewUrl} alt="Preview" />
      {/if}
    </svelte:fragment>
  </Section>
</main>

<ErrorMessage {error} />

<style>
  :global(:root) {
    font-family: Titillium Web;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --spacing-inline: 0.5rem;
    --spacing-grid: 1rem;
    --gap: 12px;
    --rounding: 3px;
    --line-strength: 1px;
    --line-height: 24px;
    --font-size-title: 18px;
    --transition-time: 0.1s;
    --shadow-cutout: inset 0 0 3px 0 #000, 0 -2px 2px -1px #000,
      -2px 0 2px -2px #0f0d0c, 2px 0 2px -2px #0f0d0c, 0 2px 2px -2px #ebe6e4;
    --shadow-edge: inset 3px 0 2px -2px #201815, inset 0 3px 2px -2px #8f8c8b,
      inset -3px 0 2px -2px #201815, inset 0 -3px 3px -3px #000,
      0 0 3px 0 #201815;
    --shadow-riffle: drop-shadow(0px 1px 1px var(--bg-color));
    --shadow-elevation: 0 3px 5px 0 #201815;
    --bg-color: #242324;
    --text-color: white;
    --section-color: #313031;
    --section-color-hover: #414041;
    --section-color-active: #212021;
    --inset-color: #403f40;
    --bg-light: #8e8e8e;
    --weird-cream: #ffe6c0;
    --accent-color: #ff9f00;
    --riffle-light: #393839;
    --riffle-dark: #2b2b2b;
    --info: #80cdee;
    --positive: #5eb663;
    --good: #7ec762;
    --fair: #b2dd6d;
    --bad: #e4ca5a;
    --negative: #fd5959;
    --ground: #8c693a;
  }

  main {
    height: 100%;
    max-height: 100vh;
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr;
    gap: var(--spacing-grid);
    padding: var(--spacing-grid);
    box-sizing: border-box;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
    background-color: var(--ground);
    border-radius: var(--rounding);
    flex-grow: 0;
  }
</style>
