<script lang="ts">
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { Slider } from '$lib/components/ui/slider/index';
  import { Input } from '$lib/components/ui/input/index.js';

  import { Document, Page } from 'svelte-pdfjs';
  import Label from '$lib/components/ui/label/label.svelte';

  let scale = [1];
  let num = 1;
  let filename = 'DE20023881.pdf';
  let max_pages = 1;
  let renderTextLayer = true;
</script>

<section class="settings m-4 flex">
  <div class="w-1/2">
    <Label class="m-2" for="scale">Page:</Label>
    <input class="w-[70px]" type="number" bind:value={num} step=1 min=1 max={max_pages} on:change={(e) => console.log(num)}/>
    of {max_pages}
  </div>
  <div class="flex w-1/2">
    <Label class="m-2" for="scale">Scale:</Label>
    <Slider id="scale" bind:value={scale} min={0.25} max={4} step={0.25} />
  </div>
</section>

{#if browser}
  <!-- {base}/ isn't neceassary if your app lives at the root of your host. 
	---- However we're serving this demo through github pages so the pdfs will
	---- be at /svelte-pdfjs/filename.pdf
	-->
  <Document
    file="{base}/{filename}"
    loadOptions={{ docBaseUrl: base }}
    on:loadsuccess={(e) => {
      max_pages = e.detail.numPages;
      num = Math.min(num, max_pages);
    }}
    on:loaderror={(e) => alert(e.detail + '')}
  >
    <div>
      <Page scale={scale[0]} {num} {renderTextLayer} />
    </div>
  </Document>
{/if}

<style>
  div {
    display: grid;
    place-items: center;
  }
</style>
