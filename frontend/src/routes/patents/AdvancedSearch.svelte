<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import { cn } from '$lib/utils';
  import { LoaderCircle } from 'lucide-svelte';
  import TmpSearch from './TmpSearch.svelte';
  import SmallDataTable from './search/SmallDataTable.svelte';
  import type Patent from '$lib/domain/patent';
  import { writable, type Writable } from 'svelte/store';

  export let data: Writable<Patent[]>;

  let selectedCategory: string = '';
  let status: 'idle' | 'loading' | 'results';

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function resetOnClose(open: boolean) {
    if (!open) {
      selectedCategory = '';
      status = 'results';
    }
  }

  async function triggerSearch() {
    status = 'loading';
    await delay(1000);
    status = 'results';
  }
</script>

<Dialog.Root onOpenChange={resetOnClose}>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Advanced Search</Dialog.Trigger>
  <Dialog.Content class="overflow-y-auto">
    {#if status === 'loading'}
      <Dialog.Header>
        <Dialog.Title>Advanced Search: Querying database</Dialog.Title>
      </Dialog.Header>
      <div class="flex h-full w-full items-center justify-center gap-2">
        <LoaderCircle class="animate-spin" />
        <span>Performing an AI-powered search, please wait.</span>
      </div>
    {:else if status === 'results'}
      <Dialog.Header>
        <Dialog.Title>Advanced Search: Results</Dialog.Title>
      </Dialog.Header>
      <div class="">
        <Label>Results</Label>
        <div class="">
          <SmallDataTable {data}/>
        </div>
      </div>
    {:else}
      <Dialog.Header>
        <Dialog.Title>Advanced Search: Choose category</Dialog.Title>
        <Dialog.Description>
          Choose a category to find for the best coincidences.
        </Dialog.Description>
      </Dialog.Header>
      <div class="flex gap-4 py-4">
        <div class="grow">
          <TmpSearch bind:value={selectedCategory} />
        </div>
        <Button disabled={!selectedCategory} on:click={triggerSearch}>Search</Button>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>
