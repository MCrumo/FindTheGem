<script lang="ts">
  import { Badge } from '$lib/components/ui/badge/index';

  export let tags: string[];
</script>

<div class="flex flex-auto flex-col gap-2">
  {#each tags as tag}
    <Badge variant="secondary" class="text-center">{tag}</Badge>
  {/each}
</div>
