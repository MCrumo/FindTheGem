<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import { cn } from '$lib/utils';
  import TmpSearch from './TmpSearch.svelte';

  let selectedCategory: string = '';

  function triggerSearch() {
    console.log('selectedCategory', selectedCategory);
    window.open(encodeURI(`/search?category=${selectedCategory}`), "_blank");
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Advanced Search</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Select category</Dialog.Title>
      <Dialog.Description>Choose a category to find for the best coincidences.</Dialog.Description>
    </Dialog.Header>
    <div class="flex gap-4 py-4">
      <div class="grow">
        <TmpSearch bind:value={selectedCategory} />
      </div>
      <Button disabled={!selectedCategory} on:click={triggerSearch}>Search</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
