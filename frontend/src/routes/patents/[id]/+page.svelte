<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import type { PageData } from './$types';
  import DetailedExpenseForm from './DetailedPatentForm.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import PdfViewer from './PDFViewer.svelte';
  export let data: PageData;

  async function checkFileExists(path: string) {
    try {
      const response = await fetch(path);
      console.log(response);
      console.log(path);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
</script>

<main>
  <Resizable.PaneGroup direction="horizontal" class="rounded">
    <Resizable.Pane defaultSize={1 / 2}>
      {#await data.pdf}
        <div class="flex h-full w-full items-center justify-center gap-2">
          <LoaderCircle class="animate-spin" />
          <span>Loading image...</span>
        </div>
      {:then path}
        {#await checkFileExists(path)}
          <div class="flex h-full w-full items-center justify-center gap-2">
            <LoaderCircle class="animate-spin" />
            <span>Loading image...</span>
          </div>
        {:then exists}
          {#if exists}
            <PdfViewer filename={path} />
          {:else}
            <p>This PDF is not available at the moment.</p>
          {/if}
        {:catch _}
          Something unexpected happened. Please try again later.
        {/await}
      {:catch _}
        Something unexpected happened. Please try again later.
      {/await}
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={1 / 2}>
      <div class="p-4">
        <h1 class="text-lg font-extrabold">
          Patent details for <strong>{data.form.data.applicationNumber}</strong>
        </h1>
        <Separator />
        <DetailedExpenseForm data={data.form} />
      </div>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</main>
