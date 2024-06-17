<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import { FileSearch } from 'lucide-svelte';

  export let id: string;
</script>

<a href={`/patents/${id}`} target="_blank"> <FileSearch /> </a>