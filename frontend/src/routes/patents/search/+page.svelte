<script lang="ts">
    import type { PageData } from './$types';
    import DataTable from './SmallDataTable.svelte'
    
    export let data: PageData;
</script>

<main>
    <DataTable data={data.patents} category={data.category}/>
</main>