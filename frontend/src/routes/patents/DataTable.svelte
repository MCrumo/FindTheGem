<script lang="ts">
  import Patent from '$lib/domain/patent';
  import {
    createTable,
    Render,
    Subscribe,
    createRender,
    DataBodyCell
  } from 'svelte-headless-table';
  import { writable } from 'svelte/store';
  import * as Table from '$lib/components/ui/table';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Label } from '$lib/components/ui/label';
  import { cn } from '$lib/utils';
  import { Input } from '$lib/components/ui/input';
  import DataTableActions from '$lib/components/shared/DataTableActions.svelte';
  import { headers } from '$lib/stores';
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addHiddenColumns
  } from 'svelte-headless-table/plugins';
  import { Button } from '$lib/components/ui/button';
  import * as Popover from '$lib/components/ui/popover';
  import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
  import ChevronDown from 'lucide-svelte/icons/chevron-down';
  import { Gem } from 'lucide-svelte';
  import CalendarIcon from 'lucide-svelte/icons/calendar';
  import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
  import { Calendar } from '$lib/components/ui/calendar';
  import { format, parseISO } from 'date-fns';
  import { es } from 'date-fns/locale';

  import {
    type InitialLayout,
    type TableOptions,
    createTableConfig,
    compareNatural
  } from '$lib/components/shared/tableConfig';
  import MultiBadgeDataCell from '$lib/components/shared/MultiBadgeDataCell.svelte';
  import AdvancedSearch from './AdvancedSearch.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  export let data: Patent[];
  export let initialLayout: Partial<InitialLayout> = { hiddenColumns: ['score'] };
  export let tableOptions: Partial<TableOptions> = {
    freeTextFilter: true,
    temporalFilter: false,
    updateHiddenColumns: true
  };

  const { resolvedInitialLayout, resolvedTableOptions } = createTableConfig(
    initialLayout,
    tableOptions
  );

  const FORMATS = [
    'yyyy-MM-dd',
    'yy-MM-dd',
    'yyyy/MM/dd',
    'yy/MM/dd',
    'dd-MM-yyyy',
    'dd-MM-yy',
    'dd/MM/yyyy',
    'dd/MM/yy'
  ];

  function checkDateCoincidence(dateString: string, coincidence: string): boolean {
    const date = parseISO(dateString);

    const monthName = format(date, 'MMMM', { locale: es });

    for (let i = 0; i < FORMATS.length; i++) {
      const formattedDate = format(date, FORMATS[i]);
      if (formattedDate.includes(coincidence)) {
        return true;
      }
    }

    if (monthName.includes(coincidence)) {
      return true;
    }

    return false;
  }

  const isHidden = (field: string) => !resolvedInitialLayout.hiddenColumns.includes(field);
  const hiddenColumns: string[] = Object.keys($headers).filter(isHidden);
  console.log(hiddenColumns);

  const table = createTable(writable(data), {
    page: addPagination(),
    sort: addSortBy({
      initialSortKeys: initialLayout.sortKeys,
      toggleOrder: ['asc', 'desc']
    }),
    // TODO improve filter so it detects dates in various formats
    filter: addTableFilter({
      fn: ({ filterValue, value }) => {
        if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return checkDateCoincidence(value, filterValue);
        }
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
    }),
    hide: addHiddenColumns({
      initialHiddenColumnIds: hiddenColumns
    })
  });

  const columns = table.createColumns([
    table.column({
      accessor: (row) => row.publicationNumber,
      header: 'Actions',
      id: 'actions',
      cell: (accessor) => {
        return createRender(DataTableActions, { id: accessor.value });
      },
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: 'applicationNumber',
      header: $headers.applicationNumber,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'publicationNumber',
      header: $headers.publicationNumber,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'title',
      header: $headers.title,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'status',
      header: $headers.status,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'country',
      header: $headers.country,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'grantDate',
      header: $headers.expirationDate,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'expirationDate',
      header: $headers.expirationDate,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'sizeFamily',
      header: $headers.sizeFamily,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    }),
    table.column({
      accessor: 'numberCitations',
      header: $headers.numberCitations,
      plugins: {
        sort: {
          compareFn: compareNatural
        }
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
    table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;

  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const df = new DateFormatter(Intl.DateTimeFormat().resolvedOptions().locale, {
    dateStyle: 'long'
  });

  // TODO add filtering by date ranges
  let dateStart: DateValue | undefined = undefined;
  let dateEnd: DateValue | undefined = undefined;
</script>

<div class="flex flex-row gap-4">
  <div class="mb-2 flex flex-col-reverse">
    <Button id="advanced-search" class="default gap-1">
      <Gem></Gem>
      <div>Advanced Search</div>
    </Button>
  </div>
  <AdvancedSearch />
  {#if resolvedTableOptions.freeTextFilter}
    <div class="flex flex-col">
      <Label>
        Coincidence search:
        <Input placeholder="By any column..." class="my-2" type="text" bind:value={$filterValue} />
      </Label>
    </div>
  {/if}
  {#if resolvedTableOptions.temporalFilter}
    <div class="text-muted-foreground flex flex-row gap-2">
      <div class="flex flex-col gap-2">
        <Label for="date-start">Fecha de inicio:</Label>
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button
              id="date-start"
              variant="outline"
              class={cn(
                'justify-start text-left font-normal',
                !dateStart && 'text-muted-foreground'
              )}
              builders={[builder]}
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {dateStart ? df.format(dateStart.toDate(getLocalTimeZone())) : 'Pick a date'}
            </Button>
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0">
            <Calendar bind:value={dateStart} initialFocus />
          </Popover.Content>
        </Popover.Root>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="date-end">Fecha de fin:</Label>
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button
              id="date-end"
              variant="outline"
              class={cn('justify-start text-left font-normal', !dateEnd && 'text-muted-foreground')}
              builders={[builder]}
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {dateEnd ? df.format(dateEnd.toDate(getLocalTimeZone())) : 'Pick a date'}
            </Button>
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0">
            <Calendar bind:value={dateEnd} initialFocus />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  {/if}
  {#if resolvedTableOptions.updateHiddenColumns}
    <div>
      <div class="flex flex-col gap-2">
        <Label for="columns">Hide/show:</Label>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button variant="outline" class="ml-auto" builders={[builder]}>
              Columns <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {#each flatColumns as col}
              {#if hiddenColumns.includes(col.id)}
                <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                  {col.header}
                </DropdownMenu.CheckboxItem>
              {/if}
            {/each}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  {/if}
</div>
<div>
  <Table.Root {...$tableAttrs} class="h-full w-full">
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                <Table.Head {...attrs}>
                  <div class="text-center">
                    {#if cell.id === 'actions'}
                      <Render of={cell.render()} />
                    {:else}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown class={'ml-2 h-4 w-4'} />
                      </Button>
                    {/if}
                  </div>
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row class="bg-background" {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <div class="text-center">
                    <Render of={cell.render()} />
                  </div>
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
