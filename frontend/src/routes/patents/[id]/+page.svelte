<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import type { PageData } from './$types';
  import DetailedExpenseForm from './DetailedPatentForm.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import { Button } from '$lib/components/ui/button/index.js';

  export let data: PageData;
</script>

<main>
  <Resizable.PaneGroup direction="horizontal" class="rounded">
    <Resizable.Pane defaultSize={2 / 5}>
      {#await data.image}
        <div class="flex h-full w-full items-center justify-center gap-2">
          <LoaderCircle class="animate-spin" />
          <span>Loading image...</span>
        </div>
      {:then image}
        <div class="flex items-center justify-center">
          <img src={image} alt="Expense details" class="inline-block h-auto max-w-full" />
        </div>
      {:catch error}
        There was an error loading the Image. Please try again later.
      {/await}
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={3 / 5}>
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
