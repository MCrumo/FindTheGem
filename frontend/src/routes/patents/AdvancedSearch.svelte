<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import { GemIcon, LoaderCircle } from 'lucide-svelte';
  import TmpSearch from './TmpSearch.svelte';
  import { Gem } from 'lucide-svelte';

  let selectedCategory: string = '';
  let open = false;
  let status: 'idle' | 'loading';

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function triggerSearch() {
    status = 'loading';
    await delay(10000);
    window.open(`/patents/search?category=${selectedCategory}`, '_blank');
    status = 'idle';
    selectedCategory = '';
    open = false;
  }
</script>

<Dialog.Root {open}>
  <Dialog.Trigger class={buttonVariants({ variant: 'default' })}
    ><GemIcon /> Advanced Search</Dialog.Trigger
  >
  <Dialog.Content class="overflow-y-auto">
    {#if status === 'loading'}
      <Dialog.Header>
        <Dialog.Title>Advanced Search: Querying database</Dialog.Title>
      </Dialog.Header>
      <div class="flex h-full w-full items-center justify-center gap-2">
        <LoaderCircle class="animate-spin" />
        <span>Performing an AI-powered search, please wait.</span>
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
