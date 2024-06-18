<script lang="ts">
    import type { PageData } from './$types';
    import DataTable from './DataTable.svelte';
    
    export let data: PageData;
</script>

<main>
    <DataTable data={data.patents} />
</main>