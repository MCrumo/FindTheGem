<script lang="ts">
  import { FileSearch } from 'lucide-svelte';

  export let id: string | undefined | null;
</script>

<a href={`/patents/${id}`} target="_blank"> <FileSearch /> </a>