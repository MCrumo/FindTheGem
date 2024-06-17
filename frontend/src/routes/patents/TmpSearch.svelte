<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils';

  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  export let value: string;

  // List of categories to choose from.
  const categories = [
    'Multilevel antenna',
    'Multiband antenna',
    'Miniature antenna',
    'Min patch antenna',
    'Dual-polarized antenna',
    'Multifrequency antenna',
    'Loaded antenna',
    'Unknown antenna',
    'Multihole antenna',
    'Notched-fed antenna',
    'Microstrip patch antenna',
    'Tunable antenna',
    'Wireless device antenna',
    'Slot antenna',
    'Virtual antenna'
  ];
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      class={cn('w-full', !value && 'text-muted-foreground')}
    >
      {value || 'Show'}</Button
    >
  </DropdownMenu.Trigger>
  <DropdownMenu.Content fitViewport overlap class="w-56">
    {#each categories as category}
      <DropdownMenu.Item
        on:click={() => {
          console.log('category', category);
          value = category;
        }}
      >
        <span>{category}</span>
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
